export interface ProviderPreset {
  id: string;
  name: string;
  baseUrl: string;
  models: string[];
  defaultModel: string;
  needsKey: boolean;
  keyPlaceholder?: string;
  modelsEndpoint?: string;
}

export const CUSTOM_PROVIDER_ID = 'custom';
export const CUSTOM_MODEL_ID = '__custom__';

export const PROVIDERS: ProviderPreset[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: [
      'gpt-6-astra',
      'gpt-6-sol',
      'gpt-6-luna',
      'gpt-5.6-sol',
      'gpt-5.6-luna',
    ],
    defaultModel: 'gpt-6-luna',
    needsKey: true,
    keyPlaceholder: 'sk-...',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com',
    models: ['deepseek-flash', 'deepseek-v4-pro'],
    defaultModel: 'deepseek-flash',
    needsKey: true,
    keyPlaceholder: 'sk-...',
  },
  {
    id: 'moonshot',
    name: 'Kimi (Moonshot)',
    baseUrl: 'https://api.moonshot.cn/v1',
    models: ['kimi-k3', 'kimi-k2.7-code-highspeed', 'kimi-k2.6'],
    defaultModel: 'kimi-k3',
    needsKey: true,
    keyPlaceholder: 'sk-...',
  },
  {
    id: 'zhipu',
    name: '智谱 GLM',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    models: ['glm-5.3', 'glm-5.3-flash', 'glm-5.3-flashx', 'glm-5.2', 'glm-5.1'],
    defaultModel: 'glm-5.3-flash',
    needsKey: true,
    keyPlaceholder: 'API Key',
  },
  {
    id: 'qwen',
    name: '通义千问',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    models: ['qwen3.8-max', 'qwen3.8-max-0902', 'qwen-plus', 'qwen-flash', 'qwen3-max'],
    defaultModel: 'qwen-flash',
    needsKey: true,
    keyPlaceholder: 'sk-...',
  },
  {
    id: 'ollama',
    name: 'Ollama',
    baseUrl: 'http://localhost:11434/v1',
    models: ['qwen3.8', 'qwen3.8:27b', 'qwen3.8-flash-next', 'gemma4', 'glm-5.3:cloud'],
    defaultModel: 'qwen3.8',
    needsKey: false,
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    models: [
      'openai/gpt-6-astra',
      'openai/gpt-6-sol',
      'openai/gpt-6-luna',
      'google/gemini-3.8-flash',
      'deepseek/deepseek-v4.1-flash',
    ],
    defaultModel: 'openai/gpt-6-luna',
    needsKey: true,
    keyPlaceholder: 'sk-or-...',
    modelsEndpoint: 'https://openrouter.ai/api/v1/models',
  },
  {
    id: CUSTOM_PROVIDER_ID,
    name: '自定义',
    baseUrl: '',
    models: [],
    defaultModel: '',
    needsKey: true,
    keyPlaceholder: 'sk-...',
  },
];

const CUSTOM_PRESET: ProviderPreset = PROVIDERS[PROVIDERS.length - 1];

export function getProvider(id: string): ProviderPreset {
  return PROVIDERS.find((p) => p.id === id) ?? CUSTOM_PRESET;
}

export function matchProviderByBaseUrl(baseUrl: string): ProviderPreset | undefined {
  const strip = (url: string) =>
    url.trim().replace(/\/+$/, '').replace(/\/v1$/, '');
  const normalized = strip(baseUrl);
  return PROVIDERS.find(
    (p) => p.id !== CUSTOM_PROVIDER_ID && strip(p.baseUrl) === normalized,
  );
}
