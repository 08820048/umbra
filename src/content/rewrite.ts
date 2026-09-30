import { sendMessage } from '../shared/messaging';
import { t } from '../shared/i18n';
import { LANGUAGE_LABELS, TargetLanguage } from '../shared/types';

const PANEL_ID = 'web-translator-rewrite-panel';
const FONT_SERIF =
  'Charter, Georgia, Palatino, "TsangerJinKai02", "Source Han Serif SC", "Songti SC", "SimSun", serif';

let panelEl: HTMLElement | null = null;
let pendingRange: Range | null = null;
let pendingSource = '';
let selectedLang: TargetLanguage = 'zh';

function ensureStyles(): void {
  if (document.getElementById('web-translator-rewrite-style')) return;
  const style = document.createElement('style');
  style.id = 'web-translator-rewrite-style';
  style.textContent = `
    #${PANEL_ID} {
      position: fixed;
      z-index: 2147483647;
      width: 340px;
      background: #f5f4ed;
      color: #141413;
      border: 1px solid #e8e6dc;
      border-radius: 8px;
      box-shadow: 0 12px 32px rgba(20,20,19,.2);
      padding: 14px;
      box-sizing: border-box;
      font: 13px/1.6 ${FONT_SERIF};
      letter-spacing: .05em;
    }
    #${PANEL_ID} .rw-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    #${PANEL_ID} .rw-title {
      color: #1b365d;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: .18em;
    }
    #${PANEL_ID} .rw-close {
      background: transparent;
      border: none;
      color: #6b6a64;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      padding: 0 2px;
    }
    #${PANEL_ID} .rw-close:hover { color: #141413; }
    #${PANEL_ID} .rw-label {
      font-size: 11px;
      color: #6b6a64;
      letter-spacing: .15em;
      margin-bottom: 4px;
    }
    #${PANEL_ID} .rw-source,
    #${PANEL_ID} .rw-result {
      background: #f0eee6;
      border: 1px solid #e8e6dc;
      border-radius: 6px;
      padding: 8px 10px;
      max-height: 110px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-word;
      color: #3d3d3a;
      font-size: 12px;
      min-height: 34px;
    }
    #${PANEL_ID} .rw-result.error { color: #b03a32; }
    #${PANEL_ID} .rw-block { margin-bottom: 10px; }
    #${PANEL_ID} .rw-lang {
      position: relative;
      margin-bottom: 8px;
    }
    #${PANEL_ID} .rw-lang-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 7px 10px;
      border: 1px solid #e8e6dc;
      border-radius: 6px;
      background: #faf9f5;
      color: #141413;
      font: 500 12px/1.4 ${FONT_SERIF};
      letter-spacing: .05em;
      cursor: pointer;
    }
    #${PANEL_ID} .rw-lang-trigger[aria-expanded="true"] {
      border-color: #1b365d;
      box-shadow: 0 0 0 3px #eef2f7;
    }
    #${PANEL_ID} .rw-lang-menu {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      z-index: 2;
      background: #faf9f5;
      border: 1px solid #e8e6dc;
      border-radius: 6px;
      box-shadow: 0 10px 24px rgba(20,20,19,.16);
      padding: 4px;
      max-height: 180px;
      overflow-y: auto;
    }
    #${PANEL_ID} .rw-lang-option {
      display: block;
      width: 100%;
      text-align: left;
      padding: 6px 8px;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: #3d3d3a;
      font: 400 12px/1.4 ${FONT_SERIF};
      cursor: pointer;
    }
    #${PANEL_ID} .rw-lang-option:hover { background: #f0eee6; }
    #${PANEL_ID} .rw-lang-option.selected {
      background: #eef2f7;
      color: #1b365d;
      font-weight: 500;
    }
    #${PANEL_ID} .rw-actions {
      display: flex;
      gap: 8px;
    }
    #${PANEL_ID} .rw-btn {
      appearance: none;
      border: none;
      cursor: pointer;
      flex: 1;
      padding: 8px 12px;
      border-radius: 999px;
      background: #1b365d;
      color: #faf9f5;
      font: 500 12px/1.4 ${FONT_SERIF};
      letter-spacing: .08em;
    }
    #${PANEL_ID} .rw-btn:hover { background: #2d5a8a; }
    #${PANEL_ID} .rw-btn:disabled { opacity: .55; cursor: not-allowed; }
    #${PANEL_ID} .rw-btn.confirm { background: #2f7d52; }
    #${PANEL_ID} .rw-btn.confirm:hover { background: #3a9563; }
    #${PANEL_ID} .rw-btn[hidden] { display: none !important; }
  `;
  document.documentElement.appendChild(style);
}

function langLabel(code: TargetLanguage): string {
  return `${t(`lang_${code.replace('-', '')}`) || LANGUAGE_LABELS[code]} (${code})`;
}

function createLangPicker(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'rw-lang';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'rw-lang-trigger';
  trigger.setAttribute('aria-expanded', 'false');
  const label = document.createElement('span');
  const chevron = document.createElement('span');
  chevron.textContent = '▾';
  trigger.append(label, chevron);

  const menu = document.createElement('div');
  menu.className = 'rw-lang-menu';
  menu.hidden = true;

  const renderLabel = (): void => {
    label.textContent = langLabel(selectedLang);
  };

  const close = (): void => {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    document.removeEventListener('mousedown', onOutside, true);
  };

  const onOutside = (e: MouseEvent): void => {
    if (!wrap.contains(e.target as Node)) close();
  };

  (Object.keys(LANGUAGE_LABELS) as TargetLanguage[]).forEach((code) => {
    const opt = document.createElement('button');
    opt.type = 'button';
    opt.className = 'rw-lang-option';
    opt.textContent = langLabel(code);
    opt.addEventListener('mousedown', (e) => e.preventDefault());
    opt.addEventListener('click', () => {
      selectedLang = code;
      renderLabel();
      close();
    });
    menu.appendChild(opt);
  });

  trigger.addEventListener('click', () => {
    if (menu.hidden) {
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      document.addEventListener('mousedown', onOutside, true);
    } else {
      close();
    }
  });

  renderLabel();
  wrap.append(trigger, menu);
  return wrap;
}

function setResult(text: string, isError = false): void {
  const result = panelEl?.querySelector<HTMLElement>('.rw-result');
  if (!result) return;
  result.textContent = text;
  result.classList.toggle('error', isError);
}

function replacePendingRange(text: string): boolean {
  const range = pendingRange;
  if (!range || !range.startContainer.isConnected) return false;
  try {
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    return true;
  } catch {
    return false;
  }
}

export function showRewritePanel(
  source: string,
  selRange: Range | null,
  anchor: DOMRect,
): void {
  ensureStyles();
  closeRewritePanel();

  pendingSource = source;
  pendingRange = selRange ? selRange.cloneRange() : null;

  const panel = document.createElement('div');
  panel.id = PANEL_ID;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-live', 'polite');

  const head = document.createElement('div');
  head.className = 'rw-head';
  const title = document.createElement('span');
  title.className = 'rw-title';
  title.textContent = t('rwTitle') || 'Rewrite';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'rw-close';
  close.setAttribute('aria-label', t('bubbleClose'));
  close.textContent = '×';
  close.addEventListener('click', () => closeRewritePanel());
  head.append(title, close);

  const sourceBlock = document.createElement('div');
  sourceBlock.className = 'rw-block';
  const sourceLabel = document.createElement('div');
  sourceLabel.className = 'rw-label';
  sourceLabel.textContent = t('rwSourceLabel') || 'Source';
  const sourceBody = document.createElement('div');
  sourceBody.className = 'rw-source';
  sourceBody.textContent = source;
  sourceBlock.append(sourceLabel, sourceBody);

  const resultBlock = document.createElement('div');
  resultBlock.className = 'rw-block';
  const resultLabel = document.createElement('div');
  resultLabel.className = 'rw-label';
  resultLabel.textContent = t('rwResultLabel') || 'Result';
  const resultBody = document.createElement('div');
  resultBody.className = 'rw-result';
  resultBlock.append(resultLabel, resultBody);

  const langPicker = createLangPicker();
  const langLabelRow = document.createElement('div');
  langLabelRow.className = 'rw-label';
  langLabelRow.textContent = t('rwLangLabel') || 'Rewrite as';

  const actions = document.createElement('div');
  actions.className = 'rw-actions';
  const startBtn = document.createElement('button');
  startBtn.type = 'button';
  startBtn.className = 'rw-btn';
  startBtn.textContent = t('rwStart') || 'Rewrite';
  const confirmBtn = document.createElement('button');
  confirmBtn.type = 'button';
  confirmBtn.className = 'rw-btn confirm';
  confirmBtn.textContent = t('rwConfirm') || 'Confirm & replace';
  confirmBtn.hidden = true;
  actions.append(startBtn, confirmBtn);

  startBtn.addEventListener('click', () => {
    void (async () => {
      startBtn.disabled = true;
      confirmBtn.hidden = true;
      setResult(t('rwLoading') || '…');
      try {
        const res = await sendMessage({
          type: 'TRANSLATE_TEXT',
          text: pendingSource,
          targetLanguage: selectedLang,
        });
        if (!res.ok) {
          setResult(res.error, true);
          return;
        }
        if ('text' in res) {
          setResult(res.text);
          confirmBtn.hidden = false;
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setResult(
          msg.includes('Extension context invalidated')
            ? t('errRefreshPage') || msg
            : msg,
          true,
        );
      } finally {
        startBtn.disabled = false;
      }
    })();
  });

  confirmBtn.addEventListener('click', () => {
    const result = panelEl?.querySelector<HTMLElement>('.rw-result');
    const text = result?.textContent ?? '';
    if (!text || !replacePendingRange(text)) {
      setResult(t('rwReplaceFail'), true);
      return;
    }
    closeRewritePanel();
  });

  panel.append(
    head,
    sourceBlock,
    langLabelRow,
    langPicker,
    resultBlock,
    actions,
  );
  document.documentElement.appendChild(panel);
  panelEl = panel;

  const w = panel.offsetWidth;
  const h = panel.offsetHeight;
  let left = anchor.left + anchor.width / 2 - w / 2;
  let top = anchor.top - h - 8;
  if (top < 8) top = Math.min(anchor.bottom + 8, window.innerHeight - h - 8);
  if (left < 8) left = 8;
  if (left + w > window.innerWidth - 8) left = window.innerWidth - w - 8;
  panel.style.left = `${Math.round(left)}px`;
  panel.style.top = `${Math.round(Math.max(8, top))}px`;

  void (async () => {
    try {
      const res = await sendMessage({ type: 'GET_SETTINGS' });
      if (res.ok && 'settings' in res) {
        selectedLang = res.settings.targetLanguage;
        const labelEl = panel.querySelector<HTMLElement>('.rw-lang-trigger span');
        if (labelEl) labelEl.textContent = langLabel(selectedLang);
      }
    } catch {
      // 保留默认语言
    }
  })();
}

export function closeRewritePanel(): void {
  panelEl?.remove();
  panelEl = null;
  pendingRange = null;
  pendingSource = '';
}

export function isInsideRewritePanel(target: EventTarget | null): boolean {
  if (!(target instanceof Node)) return false;
  return Boolean(panelEl?.contains(target));
}
