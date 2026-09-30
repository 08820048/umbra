import { getSettings, saveSettings } from '../shared/storage';
import {
  CUSTOM_MODEL_ID,
  CUSTOM_PROVIDER_ID,
  getProvider,
  PROVIDERS,
  ProviderPreset,
} from '../shared/providers';
import {
  DEFAULT_SETTINGS,
  LANGUAGE_LABELS,
  Settings,
  TargetLanguage,
} from '../shared/types';
import { sendMessage } from '../shared/messaging';
import { applyI18n, t } from '../shared/i18n';
import { createDropdown, DropdownOption } from '../shared/dropdown';
import {
  makeSelectCheck,
  placeSelectIndicator,
  watchSelectIndicator,
} from '../shared/selectList';

applyI18n();
const pageTitle = t('optionsTitle');
if (pageTitle) document.title = pageTitle;

const form = document.getElementById('settings-form') as HTMLFormElement;
const providerList = document.getElementById('provider-list') as HTMLDivElement;
const panelTitle = document.getElementById('panel-title') as HTMLHeadingElement;
const panelDesc = document.getElementById('panel-desc') as HTMLParagraphElement;
const baseUrlEl = document.getElementById('baseUrl') as HTMLInputElement;
const baseUrlHint = document.getElementById('baseUrl-hint') as HTMLElement;
const modelCustomEl = document.getElementById('modelCustom') as HTMLInputElement;
const apiKeyField = document.getElementById('apiKey-field') as HTMLLabelElement;
const apiKeyEl = document.getElementById('apiKey') as HTMLInputElement;
const keyHint = document.getElementById('key-hint') as HTMLElement;
const statusEl = document.getElementById('status') as HTMLParagraphElement;
const testBtn = document.getElementById('test-btn') as HTMLButtonElement;
const autoTranslateEl = document.getElementById(
  'autoTranslate',
) as HTMLInputElement;
const streamingEl = document.getElementById('streaming') as HTMLInputElement;

const modelDropdown = createDropdown();
(document.getElementById('model-dropdown') as HTMLElement).append(modelDropdown.el);

const langDropdown = createDropdown();
(document.getElementById('lang-dropdown') as HTMLElement).append(langDropdown.el);

let selectedProviderId = 'openai';
const remoteModelCache = new Map<string, string[]>();

function setStatus(text: string, kind: 'ok' | 'err' | '' = ''): void {
  statusEl.textContent = text;
  statusEl.className = `status ${kind}`.trim();
}

function syncProviderSelection(animate: boolean): void {
  providerList.querySelectorAll<HTMLButtonElement>('.provider-item').forEach((item) => {
    item.classList.toggle('is-selected', item.dataset.provider === selectedProviderId);
  });
  const active = providerList.querySelector<HTMLElement>('.provider-item.is-selected');
  if (active) placeSelectIndicator(providerList, active, animate);
}

function renderProviderList(): void {
  providerList.replaceChildren();
  PROVIDERS.forEach((p) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'provider-item wt-select-item';
    item.dataset.provider = p.id;
    const name = document.createElement('span');
    name.textContent = t(`provName_${p.id}`) || p.name;
    item.append(name, makeSelectCheck());
    item.addEventListener('click', () => {
      if (selectedProviderId === p.id) return;
      selectedProviderId = p.id;
      syncProviderSelection(true);
      applyProvider(p, '');
      const shown = t(`provName_${p.id}`) || p.name;
      setStatus(
        p.needsKey
          ? t('stProviderNeedsKey', shown)
          : t('stProviderNoKey', shown),
      );
    });
    providerList.appendChild(item);
  });
  syncProviderSelection(false);
  watchSelectIndicator(providerList, '.provider-item.is-selected');
}

function toDropdownOptions(models: string[]): DropdownOption[] {
  return [
    ...models.map((id) => ({ id, label: id })),
    { id: CUSTOM_MODEL_ID, label: t('ddCustomModel') || 'Custom model…' },
  ];
}

function applyModelOptions(
  options: DropdownOption[],
  selectedModel: string,
  provider: ProviderPreset,
): void {
  modelDropdown.setOptions(options);
  const preferred =
    selectedModel && selectedModel !== CUSTOM_MODEL_ID
      ? selectedModel
      : provider.defaultModel;
  if (preferred && options.some((o) => o.id === preferred)) {
    modelDropdown.setValue(preferred);
    modelCustomEl.hidden = true;
    modelCustomEl.value = '';
  } else if (preferred) {
    modelDropdown.setValue(CUSTOM_MODEL_ID);
    modelCustomEl.hidden = false;
    modelCustomEl.value = preferred;
  } else {
    modelDropdown.setValue(options[0]?.id ?? CUSTOM_MODEL_ID);
    modelCustomEl.hidden = modelDropdown.getValue() !== CUSTOM_MODEL_ID;
    modelCustomEl.value = '';
  }
}

function currentModelValue(): string {
  if (modelDropdown.el.hidden) return modelCustomEl.value.trim();
  if (modelDropdown.getValue() === CUSTOM_MODEL_ID) return modelCustomEl.value.trim();
  return modelDropdown.getValue();
}

async function loadRemoteModels(provider: ProviderPreset): Promise<void> {
  if (!provider.modelsEndpoint) return;
  const cached = remoteModelCache.get(provider.id);
  if (cached) {
    applyModelOptions(toDropdownOptions(cached), currentModelValue(), provider);
    return;
  }
  modelDropdown.setPlaceholder(t('ddLoading') || '…');
  try {
    const res = await fetch(provider.modelsEndpoint);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as { data?: { id: string; name?: string }[] };
    const models = (json.data ?? [])
      .map((m) => m.id)
      .filter((id): id is string => Boolean(id));
    remoteModelCache.set(provider.id, models);
    if (selectedProviderId === provider.id) {
      applyModelOptions(toDropdownOptions(models), currentModelValue(), provider);
    }
  } catch {
    if (selectedProviderId === provider.id) {
      modelDropdown.setPlaceholder(t('ddLoadFailed') || '…');
    }
  }
}

function applyProvider(provider: ProviderPreset, selectedModel: string): void {
  panelTitle.textContent = t(`provName_${provider.id}`) || provider.name;
  panelDesc.textContent = t(`provDesc_${provider.id}`) || '';
  baseUrlEl.value = provider.baseUrl;
  baseUrlEl.disabled = provider.id !== CUSTOM_PROVIDER_ID;
  baseUrlEl.placeholder = provider.baseUrl || 'https://api.example.com/v1';
  baseUrlHint.textContent =
    provider.id === CUSTOM_PROVIDER_ID
      ? t('hintEndpointCustom')
      : t('hintEndpoint', provider.baseUrl);

  keyHint.textContent = t(`provHint_${provider.id}`) || '';
  apiKeyField.hidden = !provider.needsKey;
  apiKeyEl.placeholder = provider.keyPlaceholder ?? 'sk-...';

  if (provider.models.length === 0 && !provider.modelsEndpoint) {
    modelDropdown.el.hidden = true;
    modelCustomEl.hidden = false;
    modelCustomEl.value = selectedModel;
    return;
  }

  modelDropdown.el.hidden = false;
  applyModelOptions(toDropdownOptions(provider.models), selectedModel, provider);
  if (provider.modelsEndpoint) {
    void loadRemoteModels(provider);
  }
}

modelDropdown.onChange((id) => {
  const isCustom = id === CUSTOM_MODEL_ID;
  modelCustomEl.hidden = !isCustom;
  if (isCustom) {
    modelCustomEl.focus();
  } else {
    modelCustomEl.value = '';
  }
});

function initNav(): void {
  const nav = document.querySelector<HTMLElement>('.settings-nav');
  if (!nav) return;
  const navItems =
    nav.querySelectorAll<HTMLButtonElement>('.settings-nav-item');
  const sync = (animate: boolean): void => {
    const active = nav.querySelector<HTMLElement>('.settings-nav-item.is-selected');
    if (active) placeSelectIndicator(nav, active, animate);
  };
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (item.classList.contains('is-selected')) return;
      navItems.forEach((i) => i.classList.toggle('is-selected', i === item));
      sync(true);
      document
        .querySelectorAll<HTMLElement>('.settings-section')
        .forEach((section) => {
          section.hidden = section.id !== `section-${item.dataset.section}`;
        });
    });
  });
  sync(false);
  watchSelectIndicator(nav, '.settings-nav-item.is-selected');
}
initNav();

function fillLanguages(selected: TargetLanguage): void {
  const options = (Object.keys(LANGUAGE_LABELS) as TargetLanguage[]).map(
    (code) => ({
      id: code,
      label: `${t(`lang_${code.replace('-', '')}`) || LANGUAGE_LABELS[code]} (${code})`,
    }),
  );
  langDropdown.setOptions(options);
  langDropdown.setValue(selected);
}

async function load(): Promise<void> {
  let settings: Settings = { ...DEFAULT_SETTINGS };
  try {
    settings = await getSettings();
  } catch {
    // 非扩展环境（预览/调试）无 chrome API，使用默认值渲染
  }
  selectedProviderId = getProvider(settings.provider || 'openai').id;
  renderProviderList();
  const provider = getProvider(selectedProviderId);
  applyProvider(provider, settings.model || provider.defaultModel);
  if (provider.id === CUSTOM_PROVIDER_ID && settings.baseUrl) {
    baseUrlEl.value = settings.baseUrl;
  }
  apiKeyEl.value = settings.apiKey || '';
  autoTranslateEl.checked = Boolean(settings.autoTranslateOnSelect);
  streamingEl.checked = settings.streamingEnabled !== false;
  fillLanguages(settings.targetLanguage || 'zh');
}

function readForm(): Settings {
  const provider = getProvider(selectedProviderId);
  const model = modelDropdown.el.hidden
    ? modelCustomEl.value.trim()
    : modelDropdown.getValue() === CUSTOM_MODEL_ID
      ? modelCustomEl.value.trim()
      : modelDropdown.getValue();
  return {
    provider: provider.id,
    baseUrl:
      (provider.id === CUSTOM_PROVIDER_ID
        ? baseUrlEl.value.trim()
        : provider.baseUrl) || DEFAULT_SETTINGS.baseUrl,
    apiKey: apiKeyEl.value.trim(),
    model: model || provider.defaultModel || DEFAULT_SETTINGS.model,
    targetLanguage: (langDropdown.getValue() as TargetLanguage) || 'zh',
    autoTranslateOnSelect: autoTranslateEl.checked,
    streamingEnabled: streamingEl.checked,
  };
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const settings = readForm();
    if (settings.provider === CUSTOM_PROVIDER_ID && !baseUrlEl.value.trim()) {
      setStatus(t('stNeedBaseUrl'), 'err');
      return;
    }
    setStatus(t('stSaving'));
    await saveSettings(settings);
    setStatus(t('stSaved'), 'ok');
  } catch (err) {
    console.error('保存设置失败：', err);
    setStatus(err instanceof Error ? err.message : String(err), 'err');
  }
});

testBtn.addEventListener('click', async () => {
  try {
    const settings = readForm();
    setStatus(t('stTesting'));
    await saveSettings(settings);
    const res = await sendMessage({
      type: 'TRANSLATE_TEXT',
      text: 'Hello, world!',
    });
    if (!res.ok) {
      setStatus(res.error, 'err');
      return;
    }
    if ('text' in res) {
      setStatus(t('stTestOk', res.text), 'ok');
    }
  } catch (err) {
    console.error('测试翻译失败：', err);
    setStatus(err instanceof Error ? err.message : t('stTestFailed'), 'err');
  }
});

void load();
