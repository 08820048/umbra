import type { ExtensionMessage, ExtensionResponse } from './types';
import { t } from './i18n';

export function sendMessage<T extends ExtensionResponse = ExtensionResponse>(
  message: ExtensionMessage,
): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(message, (response: T) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        resolve(response);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function sendToActiveTab(
  message: ExtensionMessage,
): Promise<ExtensionResponse | undefined> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    return { ok: false, error: t('errNoTab'), code: 'UNKNOWN' };
  }
  return chrome.tabs.sendMessage(tab.id, message);
}
