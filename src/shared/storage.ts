import { getProvider, matchProviderByBaseUrl, CUSTOM_PROVIDER_ID } from './providers';
import { DEFAULT_SETTINGS, Settings } from './types';

const STORAGE_KEY = 'webTranslatorSettings';

export async function getSettings(): Promise<Settings> {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const stored = result[STORAGE_KEY] as Partial<Settings> | undefined;
  const merged: Settings = {
    ...DEFAULT_SETTINGS,
    ...stored,
  };
  if (stored && !stored.provider) {
    merged.provider =
      matchProviderByBaseUrl(stored.baseUrl ?? '')?.id ?? CUSTOM_PROVIDER_ID;
  }
  return merged;
}

export async function saveSettings(settings: Settings): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEY]: settings });
}

export async function hasApiKey(): Promise<boolean> {
  const settings = await getSettings();
  if (!getProvider(settings.provider).needsKey) return true;
  return Boolean(settings.apiKey && settings.apiKey.trim());
}
