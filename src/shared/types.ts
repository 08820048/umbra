export type TargetLanguage =
  | 'zh'
  | 'zh-TW'
  | 'en'
  | 'ja'
  | 'ko'
  | 'fr'
  | 'de'
  | 'es'
  | 'ru'
  | 'pt';

export interface Settings {
  provider: string;
  baseUrl: string;
  apiKey: string;
  model: string;
  targetLanguage: TargetLanguage;
}

export const DEFAULT_SETTINGS: Settings = {
  provider: 'openai',
  baseUrl: 'https://api.openai.com/v1',
  apiKey: '',
  model: 'gpt-4o-mini',
  targetLanguage: 'zh',
};

export const LANGUAGE_LABELS: Record<TargetLanguage, string> = {
  zh: '简体中文',
  'zh-TW': '繁體中文',
  en: '英语',
  ja: '日语',
  ko: '韩语',
  fr: '法语',
  de: '德语',
  es: '西班牙语',
  ru: '俄语',
  pt: '葡萄牙语',
};

export type MessageType =
  | 'TRANSLATE_TEXT'
  | 'TRANSLATE_TEXT_STREAM'
  | 'TRANSLATE_STREAM_CHUNK'
  | 'TRANSLATE_BATCH'
  | 'GET_SETTINGS'
  | 'OPEN_OPTIONS'
  | 'FULL_PAGE_TRANSLATE'
  | 'FULL_PAGE_RESTORE'
  | 'PING';

export interface TranslateTextRequest {
  type: 'TRANSLATE_TEXT';
  text: string;
  targetLanguage?: TargetLanguage;
}

export interface TranslateTextStreamRequest {
  type: 'TRANSLATE_TEXT_STREAM';
  requestId: string;
  text: string;
  targetLanguage?: TargetLanguage;
}

export interface TranslateStreamChunkMessage {
  type: 'TRANSLATE_STREAM_CHUNK';
  requestId: string;
  chunk: string;
}

export interface TranslateBatchRequest {
  type: 'TRANSLATE_BATCH';
  texts: string[];
  targetLanguage?: TargetLanguage;
}

export interface GetSettingsRequest {
  type: 'GET_SETTINGS';
}

export interface OpenOptionsRequest {
  type: 'OPEN_OPTIONS';
}

export interface FullPageTranslateRequest {
  type: 'FULL_PAGE_TRANSLATE';
}

export interface FullPageRestoreRequest {
  type: 'FULL_PAGE_RESTORE';
}

export interface PingRequest {
  type: 'PING';
}

export type ExtensionMessage =
  | TranslateTextRequest
  | TranslateTextStreamRequest
  | TranslateStreamChunkMessage
  | TranslateBatchRequest
  | GetSettingsRequest
  | OpenOptionsRequest
  | FullPageTranslateRequest
  | FullPageRestoreRequest
  | PingRequest;

export interface TranslateTextResponse {
  ok: true;
  text: string;
}

export interface TranslateBatchResponse {
  ok: true;
  texts: string[];
}

export interface SettingsResponse {
  ok: true;
  settings: Settings;
  hasApiKey: boolean;
}

export interface OkResponse {
  ok: true;
}

export interface ErrorResponse {
  ok: false;
  error: string;
  code?: 'MISSING_API_KEY' | 'API_ERROR' | 'NETWORK_ERROR' | 'UNKNOWN';
}

export type ExtensionResponse =
  | TranslateTextResponse
  | TranslateBatchResponse
  | SettingsResponse
  | OkResponse
  | ErrorResponse;
