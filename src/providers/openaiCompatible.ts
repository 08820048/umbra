import { getProvider } from '../shared/providers';
import { t } from '../shared/i18n';
import type { Settings, TargetLanguage } from '../shared/types';
import { LANGUAGE_LABELS } from '../shared/types';

function requireApiKey(settings: Settings): void {
  if (getProvider(settings.provider).needsKey && !settings.apiKey?.trim()) {
    const err = new Error(t('msgSetKey'));
    (err as Error & { code: string }).code = 'MISSING_API_KEY';
    throw err;
  }
}

function normalizeBaseUrl(baseUrl: string): string {
  let url = baseUrl.trim().replace(/\/+$/, '');
  if (url.endsWith('/chat/completions')) {
    return url.slice(0, -'/chat/completions'.length);
  }
  return url;
}

function buildEndpoint(baseUrl: string): string {
  return `${normalizeBaseUrl(baseUrl)}/chat/completions`;
}

function languageName(code: TargetLanguage): string {
  return LANGUAGE_LABELS[code] || code;
}

function buildSystemPrompt(target: TargetLanguage): string {
  const lang = languageName(target);
  return [
    `You are a professional translator.`,
    `Translate the user's text into ${lang} (${target}).`,
    `Detect the source language automatically.`,
    `Return ONLY the translated text.`,
    `Do not add explanations, quotes, labels, or markdown.`,
    `Preserve meaning, tone, and basic formatting (line breaks).`,
    `If the text is already in the target language, return it unchanged.`,
  ].join(' ');
}

function buildBatchSystemPrompt(target: TargetLanguage): string {
  const lang = languageName(target);
  return [
    `You are a professional translator.`,
    `You will receive a JSON array of strings.`,
    `Translate each string into ${lang} (${target}).`,
    `Detect source language automatically.`,
    `Return ONLY a valid JSON array of translated strings, same length and order.`,
    `No markdown fences, no explanations.`,
  ].join(' ');
}

async function callChatCompletions(
  settings: Settings,
  system: string,
  user: string,
): Promise<string> {
  requireApiKey(settings);

  const endpoint = buildEndpoint(settings.baseUrl || 'https://api.openai.com/v1');
  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(settings.apiKey?.trim()
          ? { Authorization: `Bearer ${settings.apiKey.trim()}` }
          : {}),
      },
      body: JSON.stringify({
        model: settings.model || 'gpt-4o-mini',
        temperature: 0.2,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });
  } catch (e) {
    const err = new Error(
      e instanceof Error ? t('errNetwork', e.message) : t('errNetworkPlain'),
    );
    (err as Error & { code: string }).code = 'NETWORK_ERROR';
    throw err;
  }

  if (!response.ok) {
    let detail = '';
    try {
      const data = (await response.json()) as {
        error?: { message?: string };
      };
      detail = data?.error?.message || '';
    } catch {
      try {
        detail = await response.text();
      } catch {
        detail = '';
      }
    }
    const err = new Error(
      detail
        ? `API 错误 (${response.status}): ${detail}`
        : `API 错误 (${response.status})`,
    );
    (err as Error & { code: string }).code = 'API_ERROR';
    throw err;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    const err = new Error(t('errEmpty'));
    (err as Error & { code: string }).code = 'API_ERROR';
    throw err;
  }
  return content;
}

export async function translateText(
  settings: Settings,
  text: string,
  targetLanguage?: TargetLanguage,
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return '';
  const target = targetLanguage || settings.targetLanguage || 'zh';
  return callChatCompletions(settings, buildSystemPrompt(target), trimmed);
}

export async function translateTextStream(
  settings: Settings,
  text: string,
  targetLanguage: TargetLanguage | undefined,
  onDelta: (chunk: string) => void,
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return '';
  const target = targetLanguage || settings.targetLanguage || 'zh';

  try {
    return await callChatCompletionsStream(
      settings,
      buildSystemPrompt(target),
      trimmed,
      onDelta,
    );
  } catch (err) {
    // Fallback：某些兼容服务不支持流式，退回一次性请求
    const code = (err as Error & { code?: string }).code;
    if (code === 'STREAM_UNSUPPORTED' || code === 'STREAM_ERROR') {
      const text = await callChatCompletions(
        settings,
        buildSystemPrompt(target),
        trimmed,
      );
      onDelta(text);
      return text;
    }
    throw err;
  }
}

async function callChatCompletionsStream(
  settings: Settings,
  system: string,
  user: string,
  onDelta: (chunk: string) => void,
): Promise<string> {
  requireApiKey(settings);

  const endpoint = buildEndpoint(settings.baseUrl || 'https://api.openai.com/v1');
  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(settings.apiKey?.trim()
          ? { Authorization: `Bearer ${settings.apiKey.trim()}` }
          : {}),
      },
      body: JSON.stringify({
        model: settings.model || 'gpt-4o-mini',
        temperature: 0.2,
        stream: true,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });
  } catch (e) {
    const err = new Error(
      e instanceof Error ? t('errNetwork', e.message) : t('errNetworkPlain'),
    );
    (err as Error & { code: string }).code = 'NETWORK_ERROR';
    throw err;
  }

  if (!response.ok) {
    throw await apiErrorFromResponse(response);
  }

  // 某些服务忽略 stream 参数，直接返回普通 JSON
  const contentType = response.headers.get('content-type') || '';
  const isSSE = contentType.includes('text/event-stream');
  if (!isSSE) {
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data?.choices?.[0]?.message?.content?.trim();
    if (!content) {
      const err = new Error(t('errEmpty'));
      (err as Error & { code: string }).code = 'API_ERROR';
      throw err;
    }
    onDelta(content);
    return content;
  }

  if (!response.body) {
    const err = new Error(t('errNoStream'));
    (err as Error & { code: string }).code = 'STREAM_UNSUPPORTED';
    throw err;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let full = '';
  let sawDelta = false;

  const consume = (chunk: string) => {
    buffer += chunk;
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine.startsWith('data:')) continue;
      const data = trimmedLine.slice(5).trim();
      if (data === '[DONE]') continue;
      try {
        const json = JSON.parse(data) as {
          choices?: Array<{ delta?: { content?: string } }>;
        };
        const delta = json?.choices?.[0]?.delta?.content;
        if (typeof delta === 'string' && delta) {
          full += delta;
          sawDelta = true;
          onDelta(delta);
        }
      } catch {
        // 忽略无法解析的行
      }
    }
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      consume(decoder.decode(value, { stream: true }));
    }
    consume(decoder.decode());
  } catch (e) {
    const err = new Error(
      e instanceof Error ? t('errStreamRead', e.message) : t('errStreamReadPlain'),
    );
    (err as Error & { code: string }).code = 'STREAM_ERROR';
    throw err;
  }

  if (!sawDelta && !full) {
    const err = new Error(t('errEmpty'));
    (err as Error & { code: string }).code = 'API_ERROR';
    throw err;
  }
  return full;
}

async function apiErrorFromResponse(response: Response): Promise<Error> {
  let detail = '';
  try {
    const data = (await response.json()) as {
      error?: { message?: string };
    };
    detail = data?.error?.message || '';
  } catch {
    try {
      detail = await response.text();
    } catch {
      detail = '';
    }
  }
  const err = new Error(
    detail
      ? `API 错误 (${response.status}): ${detail}`
      : `API 错误 (${response.status})`,
  );
  (err as Error & { code: string }).code = 'API_ERROR';
  return err;
}

export async function translateBatch(
  settings: Settings,
  texts: string[],
  targetLanguage?: TargetLanguage,
): Promise<string[]> {
  if (texts.length === 0) return [];
  if (texts.length === 1) {
    const one = await translateText(settings, texts[0], targetLanguage);
    return [one];
  }

  const target = targetLanguage || settings.targetLanguage || 'zh';
  const payload = JSON.stringify(texts);
  const raw = await callChatCompletions(
    settings,
    buildBatchSystemPrompt(target),
    payload,
  );

  let parsed: unknown;
  try {
    const cleaned = raw
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
    parsed = JSON.parse(cleaned);
  } catch {
    // Fallback: translate one by one
    const results: string[] = [];
    for (const t of texts) {
      results.push(await translateText(settings, t, target));
    }
    return results;
  }

  if (!Array.isArray(parsed) || parsed.length !== texts.length) {
    const results: string[] = [];
    for (const t of texts) {
      results.push(await translateText(settings, t, target));
    }
    return results;
  }

  return parsed.map((item, i) =>
    typeof item === 'string' ? item : texts[i],
  );
}
