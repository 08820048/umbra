/** 单选列表的弹簧高亮。约定见 docs/设计规约.md。 */

export function placeSelectIndicator(
  list: HTMLElement,
  active: HTMLElement,
  animate: boolean,
): void {
  const indicator = ensureIndicator(list);
  if (!animate) indicator.style.transition = 'none';
  indicator.style.width = `${active.offsetWidth}px`;
  indicator.style.height = `${active.offsetHeight}px`;
  indicator.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
  if (animate) {
    list.dataset.springing = '1';
    window.setTimeout(() => {
      delete list.dataset.springing;
    }, 500);
  } else {
    void indicator.offsetWidth;
    indicator.style.transition = '';
  }
  indicator.classList.add('placed');
}

export function watchSelectIndicator(list: HTMLElement, activeSelector: string): void {
  const sync = (): void => {
    if (list.dataset.springing) return;
    const active = list.querySelector<HTMLElement>(activeSelector);
    if (active) placeSelectIndicator(list, active, false);
  };
  new ResizeObserver(sync).observe(list);
}

export function makeSelectCheck(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'wt-check');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2.5');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M20 6 9 17l-5-5');
  svg.appendChild(path);
  return svg;
}

function ensureIndicator(list: HTMLElement): HTMLElement {
  let indicator = list.querySelector<HTMLElement>(':scope > .wt-select-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'wt-select-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    list.prepend(indicator);
  }
  return indicator;
}
