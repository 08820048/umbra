import { getSettings, hasApiKey } from '../shared/storage';
import { t } from '../shared/i18n';
import {
  translateBatch,
  translateText,
  translateTextStream,
} from '../providers/openaiCompatible';
import type {
  ErrorResponse,
  ExtensionMessage,
  ExtensionResponse,
} from '../shared/types';

function errorResponse(
  error: string,
  code: ErrorResponse['code'] = 'UNKNOWN',
): ErrorResponse {
  return { ok: false, error, code };
}

function toErrorResponse(err: unknown): ErrorResponse {
  if (err instanceof Error) {
    const code = (err as Error & { code?: ErrorResponse['code'] }).code;
    return errorResponse(err.message, code || 'UNKNOWN');
  }
  return errorResponse(String(err));
}

async function handleMessage(
  message: ExtensionMessage,
  sender: chrome.runtime.MessageSender,
): Promise<ExtensionResponse> {
  switch (message.type) {
    case 'PING':
      return { ok: true };

    case 'OPEN_OPTIONS':
      await chrome.runtime.openOptionsPage();
      return { ok: true };

    case 'GET_SETTINGS': {
      const settings = await getSettings();
      return {
        ok: true,
        settings: { ...settings, apiKey: settings.apiKey ? '***' : '' },
        hasApiKey: await hasApiKey(),
      };
    }

    case 'TRANSLATE_TEXT': {
      if (!(await hasApiKey())) {
        return errorResponse(t('msgSetKey'), 'MISSING_API_KEY');
      }
      try {
        const settings = await getSettings();
        const text = await translateText(
          settings,
          message.text,
          message.targetLanguage,
        );
        return { ok: true, text };
      } catch (err) {
        return toErrorResponse(err);
      }
    }

    case 'TRANSLATE_TEXT_STREAM': {
      if (!(await hasApiKey())) {
        return errorResponse(t('msgSetKey'), 'MISSING_API_KEY');
      }
      const tabId = sender.tab?.id;
      try {
        const settings = await getSettings();
        const text = await translateTextStream(
          settings,
          message.text,
          message.targetLanguage,
          (chunk) => {
            if (tabId == null) return;
            void chrome.tabs
              .sendMessage(tabId, {
                type: 'TRANSLATE_STREAM_CHUNK',
                requestId: message.requestId,
                chunk,
              })
              .catch(() => {
                // content script 可能已关闭
              });
          },
        );
        return { ok: true, text };
      } catch (err) {
        return toErrorResponse(err);
      }
    }

    case 'TRANSLATE_BATCH': {
      if (!(await hasApiKey())) {
        return errorResponse(t('msgSetKey'), 'MISSING_API_KEY');
      }
      try {
        const settings = await getSettings();
        const texts = await translateBatch(
          settings,
          message.texts,
          message.targetLanguage,
        );
        return { ok: true, texts };
      } catch (err) {
        return toErrorResponse(err);
      }
    }

    case 'FULL_PAGE_TRANSLATE':
    case 'FULL_PAGE_RESTORE':
      // Handled by content script via tab messaging from popup
      return { ok: true };

    default:
      return errorResponse(t('errUnknownMessage'));
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message as ExtensionMessage, sender)
    .then(sendResponse)
    .catch((err) => sendResponse(toErrorResponse(err)));
  return true;
});

chrome.runtime.onInstalled.addListener(() => {
  try {
    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        id: 'web-translator-selection',
        title: t('menuTranslateSelection'),
        contexts: ['selection'],
      });
      chrome.contextMenus.create({
        id: 'web-translator-page',
        title: t('menuTranslatePage'),
        contexts: ['page'],
      });
      chrome.contextMenus.create({
        id: 'web-translator-restore',
        title: t('menuRestore'),
        contexts: ['page'],
      });
    });
  } catch {
    // contextMenus may be unavailable in some contexts
  }
});

chrome.contextMenus?.onClicked.addListener(async (info, tab) => {
  if (!tab?.id) return;

  if (info.menuItemId === 'web-translator-selection' && info.selectionText) {
    try {
      await chrome.tabs.sendMessage(tab.id, {
        type: 'TRANSLATE_SELECTION_FROM_MENU',
        text: info.selectionText,
      });
    } catch {
      // content script may not be ready
    }
    return;
  }

  if (info.menuItemId === 'web-translator-page') {
    try {
      await chrome.tabs.sendMessage(tab.id, { type: 'FULL_PAGE_TRANSLATE' });
    } catch {
      // ignore
    }
    return;
  }

  if (info.menuItemId === 'web-translator-restore') {
    try {
      await chrome.tabs.sendMessage(tab.id, { type: 'FULL_PAGE_RESTORE' });
    } catch {
      // ignore
    }
  }
});
