import { sendToActiveTab } from '../shared/messaging';
import { applyI18n, t } from '../shared/i18n';
import { getProvider } from '../shared/providers';
import { getSettings } from '../shared/storage';

applyI18n();
const title = t('popupTitle');
if (title) document.title = title;

const keyStatus = document.getElementById('key-status') as HTMLSpanElement;
const msg = document.getElementById('msg') as HTMLParagraphElement;
const btnTranslate = document.getElementById('btn-translate') as HTMLButtonElement;
const btnRestore = document.getElementById('btn-restore') as HTMLButtonElement;
const btnOptions = document.getElementById('btn-options') as HTMLButtonElement;

function setMsg(text: string, kind: 'ok' | 'err' | '' = ''): void {
  msg.textContent = text;
  msg.className = `msg ${kind}`.trim();
}

async function refreshKeyStatus(): Promise<void> {
  try {
    const settings = await getSettings();
    const provider = getProvider(settings.provider);
    if (!provider.needsKey) {
      keyStatus.textContent = t('stLocalMode', provider.name) || provider.name;
      keyStatus.className = 'wt-badge ok';
    } else if (settings.apiKey?.trim()) {
      keyStatus.textContent = t('stKeyOk');
      keyStatus.className = 'wt-badge ok';
    } else {
      keyStatus.textContent = t('stKeyMissing');
      keyStatus.className = 'wt-badge warn';
      setMsg(t('msgSetKeyShort'));
    }
  } catch {
    keyStatus.textContent = t('stUnknown');
    keyStatus.className = 'wt-badge';
  }
}

btnOptions.addEventListener('click', () => {
  void chrome.runtime.openOptionsPage();
});

btnTranslate.addEventListener('click', async () => {
  btnTranslate.disabled = true;
  setMsg(t('msgTranslatingPage'));
  try {
    const res = await sendToActiveTab({ type: 'FULL_PAGE_TRANSLATE' });
    if (!res) {
      setMsg(t('msgNoPageTab'), 'err');
      return;
    }
    if (!res.ok) {
      setMsg(res.error, 'err');
      if (res.code === 'MISSING_API_KEY') {
        void chrome.runtime.openOptionsPage();
      }
      return;
    }
    setMsg(t('msgPageStarted'), 'ok');
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    setMsg(t('msgInjectFailed', detail) || detail, 'err');
  } finally {
    btnTranslate.disabled = false;
  }
});

btnRestore.addEventListener('click', async () => {
  btnRestore.disabled = true;
  setMsg(t('msgRestoring'));
  try {
    const res = await sendToActiveTab({ type: 'FULL_PAGE_RESTORE' });
    if (!res?.ok) {
      setMsg(res && !res.ok ? res.error : t('msgRestoreFailed'), 'err');
      return;
    }
    setMsg(t('msgRestoreRequested'), 'ok');
  } catch (err) {
    setMsg(err instanceof Error ? err.message : t('msgRestoreFailed'), 'err');
  } finally {
    btnRestore.disabled = false;
  }
});

void refreshKeyStatus();
