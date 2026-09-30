import { t } from '../shared/i18n';

const BUBBLE_ID = 'web-translator-bubble';

export type BubbleState =
  | 'loading'
  | 'stream'
  | 'result'
  | 'error'
  | 'missing-key';

export interface BubbleOptions {
  x: number;
  y: number;
  onOpenOptions?: () => void;
  onRetry?: () => void;
  onDismiss?: () => void;
}

let timerId: number | null = null;
let timerStart = 0;
let currentBubble: HTMLElement | null = null;
let currentState: BubbleState | null = null;
let onDismissCb: (() => void) | null = null;

function stopTimer(): void {
  if (timerId !== null) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function startTimer(el: HTMLElement): void {
  stopTimer();
  timerStart = performance.now();
  const timerEl = el.querySelector<HTMLElement>('.wt-timer');
  if (!timerEl) return;
  timerId = window.setInterval(() => {
    const secs = ((performance.now() - timerStart) / 1000).toFixed(1);
    timerEl.textContent = `${secs}s`;
  }, 100);
}

function makeCursor(): HTMLElement {
  const cursor = document.createElement('span');
  cursor.className = 'wt-cursor';
  return cursor;
}

function ensureStyles(): void {
  if (document.getElementById('web-translator-bubble-style')) return;
  const style = document.createElement('style');
  style.id = 'web-translator-bubble-style';
  // Kami 风格（暖纸底、墨蓝点缀、衬线字体），恒为浅色，样式全部限定在气泡内
  style.textContent = `
    #${BUBBLE_ID} {
      position: fixed;
      z-index: 2147483647;
      max-width: 360px;
      min-width: 160px;
      background: #f5f4ed;
      color: #141413;
      border: 1px solid #e8e6dc;
      border-radius: 10px;
      box-shadow: 0 10px 28px rgba(20,20,19,.16);
      font: 13px/1.65 Charter, Georgia, Palatino, "TsangerJinKai02", "Source Han Serif SC", "Songti SC", "SimSun", serif;
      letter-spacing: .05em;
      padding: 12px 14px;
      box-sizing: border-box;
    }
    #${BUBBLE_ID} .wt-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      color: #1b365d;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .18em;
    }
    #${BUBBLE_ID} .wt-timer {
      margin-left: auto;
      color: #6b6a64;
      font-weight: 400;
      letter-spacing: .05em;
      font-variant-numeric: tabular-nums;
    }
    #${BUBBLE_ID} .wt-close {
      background: transparent;
      border: none;
      color: #6b6a64;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      padding: 0 2px;
    }
    #${BUBBLE_ID} .wt-close:hover { color: #141413; }
    #${BUBBLE_ID} .wt-body {
      white-space: pre-wrap;
      word-break: break-word;
      color: #3d3d3a;
    }
    #${BUBBLE_ID} .wt-loading {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #504e49;
    }
    #${BUBBLE_ID} .wt-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(27,54,93,.18);
      border-top-color: #1b365d;
      border-radius: 50%;
      animation: wt-spin .7s linear infinite;
    }
    @keyframes wt-spin { to { transform: rotate(360deg); } }
    #${BUBBLE_ID} .wt-cursor {
      display: inline-block;
      width: 2px;
      height: 1em;
      margin-left: 2px;
      vertical-align: text-bottom;
      background: #1b365d;
      animation: wt-blink 1s steps(2) infinite;
    }
    @keyframes wt-blink { 50% { opacity: 0; } }
    #${BUBBLE_ID} .wt-error { color: #b03a32; }
    #${BUBBLE_ID} .wt-actions {
      margin-top: 10px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    #${BUBBLE_ID} .wt-btn {
      appearance: none;
      border: none;
      border-radius: 999px;
      padding: 5px 14px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: .05em;
      cursor: pointer;
      background: #1b365d;
      color: #faf9f5;
    }
    #${BUBBLE_ID} .wt-btn.secondary {
      background: #e8e6dc;
      color: #3d3d3a;
    }
    #${BUBBLE_ID} .wt-btn:hover { background: #2d5a8a; }
    #${BUBBLE_ID} .wt-btn.secondary:hover { background: #e5e3d8; }
  `;
  document.documentElement.appendChild(style);
}

function clampPosition(el: HTMLElement, x: number, y: number): void {
  const pad = 8;
  const rect = el.getBoundingClientRect();
  let left = x;
  let top = y + 12;
  if (left + rect.width > window.innerWidth - pad) {
    left = window.innerWidth - rect.width - pad;
  }
  if (left < pad) left = pad;
  if (top + rect.height > window.innerHeight - pad) {
    top = y - rect.height - 12;
  }
  if (top < pad) top = pad;
  el.style.left = `${Math.round(left)}px`;
  el.style.top = `${Math.round(top)}px`;
}

export function dismissBubble(): void {
  stopTimer();
  currentBubble?.remove();
  currentBubble = null;
  currentState = null;
  if (onDismissCb) {
    const cb = onDismissCb;
    onDismissCb = null;
    cb();
  }
}

export function showBubble(
  state: BubbleState,
  content: string,
  options: BubbleOptions,
): HTMLElement {
  ensureStyles();

  // 流式增量更新：复用现有气泡，避免每次 chunk 重建导致闪烁、计时重置
  if (state === 'stream' && currentState === 'stream' && currentBubble) {
    const body = currentBubble.querySelector<HTMLElement>('.wt-body');
    if (body) {
      body.textContent = '';
      body.append(document.createTextNode(content), makeCursor());
    }
    clampPosition(currentBubble, options.x, options.y);
    return currentBubble;
  }

  stopTimer();
  // 内部状态重建（loading/stream/result 间切换）不是用户关闭，
  // 不应触发 onDismiss 回调，否则会误清正在进行的流式状态
  onDismissCb = null;
  dismissBubble();

  const el = document.createElement('div');
  el.id = BUBBLE_ID;
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-live', 'polite');

  const header = document.createElement('div');
  header.className = 'wt-header';
  const title = document.createElement('span');
  title.textContent =
    state === 'loading' || state === 'stream'
      ? t('bubbleTranslating')
      : state === 'error' || state === 'missing-key'
        ? t('bubbleFailed')
        : t('bubbleResult');
  header.append(title);

  if (state === 'loading' || state === 'stream') {
    const timer = document.createElement('span');
    timer.className = 'wt-timer';
    timer.textContent = '0.0s';
    header.append(timer);
  }

  const close = document.createElement('button');
  close.className = 'wt-close';
  close.type = 'button';
  close.setAttribute('aria-label', t('bubbleClose'));
  close.textContent = '×';
  close.addEventListener('click', (e) => {
    e.stopPropagation();
    dismissBubble();
  });
  header.append(close);

  const body = document.createElement('div');
  body.className = 'wt-body';

  if (state === 'loading') {
    body.innerHTML = `<div class="wt-loading"><span class="wt-spinner"></span><span>${t('bubbleWorking')}</span></div>`;
  } else if (state === 'stream') {
    body.append(document.createTextNode(content), makeCursor());
  } else if (state === 'missing-key') {
    body.innerHTML = `<div class="wt-error">${t('bubbleNoKey')}</div>`;
    const actions = document.createElement('div');
    actions.className = 'wt-actions';
    const btn = document.createElement('button');
    btn.className = 'wt-btn';
    btn.type = 'button';
    btn.textContent = t('actOpenOptions');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      options.onOpenOptions?.();
    });
    actions.appendChild(btn);
    body.appendChild(actions);
  } else if (state === 'error') {
    const err = document.createElement('div');
    err.className = 'wt-error';
    err.textContent = content || t('bubbleFailed');
    body.appendChild(err);
    const actions = document.createElement('div');
    actions.className = 'wt-actions';
    if (options.onRetry) {
      const retry = document.createElement('button');
      retry.className = 'wt-btn';
      retry.type = 'button';
      retry.textContent = t('bubbleRetry');
      retry.addEventListener('click', (e) => {
        e.stopPropagation();
        options.onRetry?.();
      });
      actions.appendChild(retry);
    }
    const open = document.createElement('button');
    open.className = 'wt-btn secondary';
    open.type = 'button';
    open.textContent = t('actOpenOptions');
    open.addEventListener('click', (e) => {
      e.stopPropagation();
      options.onOpenOptions?.();
    });
    actions.appendChild(open);
    body.appendChild(actions);
  } else {
    body.textContent = content;
  }

  el.append(header, body);
  document.documentElement.appendChild(el);
  clampPosition(el, options.x, options.y);

  currentBubble = el;
  currentState = state;
  onDismissCb = options.onDismiss ?? null;

  if (state === 'loading' || state === 'stream') {
    startTimer(el);
  }

  // Re-clamp after content paints
  requestAnimationFrame(() => clampPosition(el, options.x, options.y));

  return el;
}

export function isInsideBubble(target: EventTarget | null): boolean {
  if (!(target instanceof Node)) return false;
  return Boolean(document.getElementById(BUBBLE_ID)?.contains(target));
}
