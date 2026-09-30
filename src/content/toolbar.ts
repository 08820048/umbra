import { t } from '../shared/i18n';

const TOOLBAR_ID = 'web-translator-selection-toolbar';

let toolbarEl: HTMLElement | null = null;

function ensureStyles(): void {
  if (document.getElementById('web-translator-selection-toolbar-style')) return;
  const style = document.createElement('style');
  style.id = 'web-translator-selection-toolbar-style';
  // Kami 风格滑词工具条（小圆角），样式限定在工具条内
  style.textContent = `
    #${TOOLBAR_ID} {
      position: fixed;
      z-index: 2147483647;
      display: flex;
      gap: 4px;
      padding: 4px;
      background: #f5f4ed;
      border: 1px solid #e8e6dc;
      border-radius: 8px;
      box-shadow: 0 6px 20px rgba(20,20,19,.18);
      box-sizing: border-box;
    }
    #${TOOLBAR_ID} .wt-toolbar-btn {
      appearance: none;
      border: none;
      cursor: pointer;
      padding: 5px 12px;
      border-radius: 6px;
      background: #1b365d;
      color: #faf9f5;
      font: 500 12px/1.4 Charter, Georgia, Palatino, "TsangerJinKai02", "Source Han Serif SC", "Songti SC", "SimSun", serif;
      letter-spacing: .08em;
      white-space: nowrap;
    }
    #${TOOLBAR_ID} .wt-toolbar-btn:hover { background: #2d5a8a; }
    #${TOOLBAR_ID} .wt-toolbar-btn.secondary {
      background: #e8e6dc;
      color: #3d3d3a;
    }
    #${TOOLBAR_ID} .wt-toolbar-btn.secondary:hover { background: #e5e3d8; }
    #${TOOLBAR_ID} .wt-toolbar-btn.icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 8px;
      margin-left: auto;
    }
    #${TOOLBAR_ID} .wt-toolbar-btn.icon svg {
      display: block;
      width: 14px;
      height: 14px;
    }
  `;
  document.documentElement.appendChild(style);
}

export interface SelectionToolbarActions {
  onTranslate: () => void;
  onRewrite: () => void;
  onOpenSettings: () => void;
}

function makeButton(
  label: string,
  secondary: boolean,
  onClick: () => void,
): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = secondary ? 'wt-toolbar-btn secondary' : 'wt-toolbar-btn';
  btn.textContent = label;
  // mousedown 阻止默认行为，避免点击时丢失选区
  btn.addEventListener('mousedown', (e) => e.preventDefault());
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    hideSelectionToolbar();
    onClick();
  });
  return btn;
}

// lucide icons: cog
function makeSettingsButton(onClick: () => void): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'wt-toolbar-btn secondary icon';
  btn.setAttribute('aria-label', t('actOpenOptions') || 'Settings');
  btn.title = t('actOpenOptions') || 'Settings';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  const paths = [
    'M11 10.27 7 3.34',
    'm11 13.73-4 6.93',
    'M12 22v-2',
    'M12 2v2',
    'M14 12h8',
    'm17 20.66-1-1.73',
    'm17 3.34-1 1.73',
    'M2 12h2',
    'm20.66 17-1.73-1',
    'm20.66 7-1.73 1',
    'm3.34 17 1.73-1',
    'm3.34 7 1.73 1',
  ];
  paths.forEach((d) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
  });
  [2, 8].forEach((r) => {
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle',
    );
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', String(r));
    svg.appendChild(circle);
  });
  btn.appendChild(svg);

  btn.addEventListener('mousedown', (e) => e.preventDefault());
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    hideSelectionToolbar();
    onClick();
  });
  return btn;
}

export function showSelectionToolbar(
  rect: DOMRect,
  actions: SelectionToolbarActions,
): void {
  ensureStyles();
  hideSelectionToolbar();

  const el = document.createElement('div');
  el.id = TOOLBAR_ID;
  el.setAttribute('role', 'toolbar');
  el.append(
    makeButton(t('toolbarTranslate') || 'Translate', false, actions.onTranslate),
    makeButton(t('toolbarRewrite') || 'Translate to', true, actions.onRewrite),
    makeSettingsButton(actions.onOpenSettings),
  );

  document.documentElement.appendChild(el);
  toolbarEl = el;

  const w = el.offsetWidth;
  const h = el.offsetHeight;
  let left = rect.left + rect.width / 2 - w / 2;
  let top = rect.top - h - 8;
  if (top < 8) top = rect.bottom + 8;
  if (left < 8) left = 8;
  if (left + w > window.innerWidth - 8) left = window.innerWidth - w - 8;
  el.style.left = `${Math.round(left)}px`;
  el.style.top = `${Math.round(top)}px`;
}

export function hideSelectionToolbar(): void {
  toolbarEl?.remove();
  toolbarEl = null;
}

export function isInsideToolbar(target: EventTarget | null): boolean {
  if (!(target instanceof Node)) return false;
  return Boolean(toolbarEl?.contains(target));
}
