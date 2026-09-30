import { sendMessage } from '../shared/messaging';
import { t } from '../shared/i18n';
import { detectLanguage, langFamily } from '../shared/langDetect';
import type { Settings, TargetLanguage } from '../shared/types';
import type {
  ErrorResponse,
  ExtensionMessage,
  TranslateTextResponse,
} from '../shared/types';
import {
  dismissBubble,
  isInsideBubble,
  showBubble,
  type BubbleOptions,
} from './bubble';
import {
  hideSelectionToolbar,
  isInsideToolbar,
  showSelectionToolbar,
} from './toolbar';
import {
  closeRewritePanel,
  isInsideRewritePanel,
  showRewritePanel,
} from './rewrite';
import {
  isPageTranslated,
  restorePage,
  translatePage,
} from './pageTranslate';

let lastMouseUp: { x: number; y: number } | null = null;
let translatingSelection = false;
let pageBusy = false;

interface StreamState {
  requestId: string;
  text: string;
  shown: number;
  timer: number | null;
  finalText: string | null;
  opts: BubbleOptions;
}
let streamState: StreamState | null = null;

function stopStreamTimer(state: StreamState): void {
  if (state.timer !== null) {
    window.clearInterval(state.timer);
    state.timer = null;
  }
}

// 平滑追赶动画：chunks 成批到达时逐帧渐显，避免整段直接砸出来
function startStreamAnimation(state: StreamState): void {
  if (state.timer !== null) return;
  state.timer = window.setInterval(() => {
    if (streamState !== state) {
      stopStreamTimer(state);
      return;
    }
    const target = state.finalText ?? state.text;
    if (state.shown < target.length) {
      const step = Math.max(3, Math.ceil((target.length - state.shown) * 0.18));
      state.shown = Math.min(target.length, state.shown + step);
      showBubble('stream', target.slice(0, state.shown), state.opts);
    } else if (state.finalText !== null) {
      stopStreamTimer(state);
      streamState = null;
      showBubble('result', state.finalText, state.opts);
    }
  }, 40);
}

function clearStreamState(state: StreamState | null): void {
  if (!state) return;
  stopStreamTimer(state);
  if (streamState === state) streamState = null;
}

function openOptions(): void {
  sendMessage({ type: 'OPEN_OPTIONS' }).catch((err) => {
    showBubble('error', friendlyError(err), {
      x: window.innerWidth - 40,
      y: 24,
    });
  });
}

function friendlyError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes('Extension context invalidated')) {
    return t('errRefreshPage') || msg;
  }
  return msg;
}

async function translateSelectionAt(
  text: string,
  x: number,
  y: number,
): Promise<void> {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length > 5000) return;
  if (translatingSelection) return;
  translatingSelection = true;
  hideSelectionToolbar();

  const requestId = Math.random().toString(36).slice(2);
  const opts: BubbleOptions = {
    x,
    y,
    onOpenOptions: openOptions,
    onRetry: () => {
      void translateSelectionAt(trimmed, x, y);
    },
    onDismiss: () => {
      if (streamState?.requestId === requestId) clearStreamState(streamState);
    },
  };

  showBubble('loading', '', opts);

  try {
    const streaming = await isStreamingEnabled();

    if (!streaming) {
      const res = await sendMessage({
        type: 'TRANSLATE_TEXT',
        text: trimmed,
      });
      if (!res.ok) {
        showBubble(
          res.code === 'MISSING_API_KEY' ? 'missing-key' : 'error',
          res.error,
          opts,
        );
        return;
      }
      if ('text' in res) showBubble('result', res.text, opts);
      return;
    }

    const state: StreamState = {
      requestId,
      text: '',
      shown: 0,
      timer: null,
      finalText: null,
      opts,
    };
    streamState = state;

    const res = (await sendMessage({
      type: 'TRANSLATE_TEXT_STREAM',
      requestId,
      text: trimmed,
    })) as TranslateTextResponse | ErrorResponse;

    if (!res.ok) {
      clearStreamState(state);
      showBubble(
        res.code === 'MISSING_API_KEY' ? 'missing-key' : 'error',
        res.error,
        opts,
      );
      return;
    }

    const finalText = 'text' in res && res.text ? res.text : state.text;
    if (streamState === state) {
      // 交给动画平滑播完（含不支持 SSE 的接口一次性返回的情况）
      state.finalText = finalText;
      startStreamAnimation(state);
    } else {
      showBubble('result', finalText, opts);
    }
  } catch (err) {
    if (streamState?.requestId === requestId) clearStreamState(streamState);
    showBubble('error', friendlyError(err), opts);
  } finally {
    translatingSelection = false;
  }
}

function getSelectionText(): string {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed) return '';
  return sel.toString();
}

function getSelectionRect(): DOMRect | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || !sel.toString().trim()) return null;
  return sel.getRangeAt(0).getBoundingClientRect();
}

function getSelectionRange(): Range | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || !sel.toString().trim()) return null;
  return sel.getRangeAt(0).cloneRange();
}

async function getSettingsSafe(): Promise<Settings | null> {
  try {
    const res = await sendMessage({ type: 'GET_SETTINGS' });
    return res.ok && 'settings' in res ? res.settings : null;
  } catch {
    return null;
  }
}

async function isStreamingEnabled(): Promise<boolean> {
  try {
    const res = await sendMessage({ type: 'GET_SETTINGS' });
    return res.ok && 'settings' in res
      ? res.settings.streamingEnabled !== false
      : true;
  } catch {
    return true;
  }
}

function isSameLanguage(text: string, target: TargetLanguage | undefined): boolean {
  if (!target) return false;
  const detected = detectLanguage(text);
  return detected !== null && langFamily(detected) === langFamily(target);
}

function onMouseUp(e: MouseEvent): void {
  if (e.button !== 0) return;
  if (isInsideBubble(e.target)) return;
  if (isInsideToolbar(e.target)) return;
  if (isInsideRewritePanel(e.target)) return;

  lastMouseUp = { x: e.clientX, y: e.clientY };

  // Defer so selection is finalized
  setTimeout(() => {
    void (async () => {
      const text = getSelectionText();
      if (!text.trim() || !lastMouseUp) {
        hideSelectionToolbar();
        return;
      }
      const rect = getSelectionRect();
      const selRange = getSelectionRange();
      if (!rect) return;
      const { x, y } = lastMouseUp;
      const settings = await getSettingsSafe();
      const sameLang = isSameLanguage(text, settings?.targetLanguage);
      if (settings?.autoTranslateOnSelect) {
        hideSelectionToolbar();
        closeRewritePanel();
        if (!sameLang) void translateSelectionAt(text, x, y);
        return;
      }
      closeRewritePanel();
      showSelectionToolbar(rect, {
        onTranslate: () => {
          void translateSelectionAt(text, x, y);
        },
        onRewrite: () => {
          showRewritePanel(text, selRange, rect);
        },
        onOpenSettings: openOptions,
        translateDisabled: sameLang,
      });
    })();
  }, 10);
}

function onKeyDown(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    hideSelectionToolbar();
    closeRewritePanel();
    dismissBubble();
  }
}

function onPointerDown(e: MouseEvent): void {
  if (isInsideToolbar(e.target)) return;
  if (isInsideBubble(e.target)) return;
  if (isInsideRewritePanel(e.target)) return;
  closeRewritePanel();
  // Outside click dismisses bubble unless user is selecting
  const text = getSelectionText();
  if (!text.trim()) {
    hideSelectionToolbar();
    dismissBubble();
  }
}

async function handleFullPageTranslate(): Promise<void> {
  if (pageBusy) return;
  pageBusy = true;

  const toastX = Math.min(window.innerWidth - 40, window.innerWidth - 200);
  const toastY = 24;

  showBubble('loading', '', {
    x: toastX,
    y: toastY,
    onOpenOptions: openOptions,
  });

  try {
    const result = await translatePage(async (texts) => {
      const res = await sendMessage({
        type: 'TRANSLATE_BATCH',
        texts,
      });
      if (!res.ok) {
        const err = new Error(res.error);
        (err as Error & { code?: string }).code = res.code;
        throw err;
      }
      if (!('texts' in res)) {
        throw new Error(t('msgInvalidBatch'));
      }
      return res.texts;
    });

    showBubble(
      'result',
      t('pageTranslateDone', String(result.translated)),
      { x: toastX, y: toastY, onOpenOptions: openOptions },
    );
  } catch (err) {
    const message = friendlyError(err);
    const code = (err as Error & { code?: string }).code;
    if (code === 'MISSING_API_KEY') {
      showBubble('missing-key', message, {
        x: toastX,
        y: toastY,
        onOpenOptions: openOptions,
      });
    } else {
      showBubble('error', message, {
        x: toastX,
        y: toastY,
        onOpenOptions: openOptions,
        onRetry: () => {
          void handleFullPageTranslate();
        },
      });
    }
  } finally {
    pageBusy = false;
  }
}

function handleFullPageRestore(): void {
  const count = restorePage();
  const toastX = Math.min(window.innerWidth - 40, window.innerWidth - 200);
  showBubble(
    'result',
    count > 0 ? t('bubbleRestored', String(count)) : t('bubbleNothing'),
    {
      x: toastX,
      y: 24,
      onOpenOptions: openOptions,
    },
  );
}

chrome.runtime.onMessage.addListener((message: ExtensionMessage & { text?: string }, _sender, sendResponse) => {
  const type = (message as { type: string }).type;

  if (type === 'FULL_PAGE_TRANSLATE') {
    void handleFullPageTranslate().then(() =>
      sendResponse({ ok: true, translated: isPageTranslated() }),
    );
    return true;
  }

  if (type === 'FULL_PAGE_RESTORE') {
    handleFullPageRestore();
    sendResponse({ ok: true });
    return false;
  }

  if (type === 'TRANSLATE_SELECTION_FROM_MENU') {
    const text = (message as { text?: string }).text || getSelectionText();
    const x = lastMouseUp?.x ?? window.innerWidth / 2;
    const y = lastMouseUp?.y ?? 80;
    hideSelectionToolbar();
    void translateSelectionAt(text, x, y);
    sendResponse({ ok: true });
    return false;
  }

  if (type === 'TRANSLATE_STREAM_CHUNK') {
    const { requestId, chunk } = message as {
      requestId: string;
      chunk: string;
    };
    if (streamState && streamState.requestId === requestId) {
      streamState.text += chunk;
      startStreamAnimation(streamState);
    }
    sendResponse({ ok: true });
    return false;
  }

  if (type === 'PING') {
    sendResponse({ ok: true });
    return false;
  }

  return false;
});

document.addEventListener('mouseup', onMouseUp, true);
document.addEventListener('keydown', onKeyDown, true);
document.addEventListener('mousedown', onPointerDown, true);
window.addEventListener('scroll', hideSelectionToolbar, true);
window.addEventListener('resize', hideSelectionToolbar);
