import { t } from './i18n';

export interface DropdownOption {
  id: string;
  label: string;
}

export interface Dropdown {
  el: HTMLElement;
  getValue(): string;
  setValue(id: string): void;
  setOptions(options: DropdownOption[]): void;
  setPlaceholder(text: string): void;
  onChange(handler: (id: string) => void): void;
}

export function createDropdown(): Dropdown {
  const el = document.createElement('div');
  el.className = 'wt-dropdown';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'wt-dropdown-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  const label = document.createElement('span');
  label.className = 'wt-dropdown-label';
  const chevron = document.createElement('span');
  chevron.className = 'wt-dropdown-chevron';
  chevron.textContent = '▾';
  trigger.append(label, chevron);

  const menu = document.createElement('div');
  menu.className = 'wt-dropdown-menu';
  menu.hidden = true;

  const search = document.createElement('input');
  search.className = 'wt-dropdown-search';
  search.type = 'text';
  search.placeholder = t('ddSearch') || 'Search…';
  search.hidden = true;

  const optionsEl = document.createElement('div');
  optionsEl.className = 'wt-dropdown-options';
  menu.append(search, optionsEl);

  el.append(trigger, menu);

  let options: DropdownOption[] = [];
  let value = '';
  let placeholder = t('ddPlaceholder') || 'Select…';
  let handler: ((id: string) => void) | null = null;

  function renderLabel(): void {
    const found = options.find((o) => o.id === value);
    label.textContent = found ? found.label : placeholder;
    label.classList.toggle('wt-dropdown-placeholder', !found);
  }

  function renderOptions(filter = ''): void {
    optionsEl.innerHTML = '';
    const keyword = filter.trim().toLowerCase();
    const shown = keyword
      ? options.filter(
          (o) =>
            o.label.toLowerCase().includes(keyword) ||
            o.id.toLowerCase().includes(keyword),
        )
      : options;
    if (shown.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'wt-dropdown-empty';
      empty.textContent = t('ddEmpty') || 'No matches';
      optionsEl.appendChild(empty);
      return;
    }
    shown.forEach((o) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'wt-dropdown-option' + (o.id === value ? ' selected' : '');
      btn.textContent = o.label;
      btn.addEventListener('click', () => {
        value = o.id;
        renderLabel();
        close();
        handler?.(o.id);
      });
      optionsEl.appendChild(btn);
    });
  }

  function onOutside(e: MouseEvent): void {
    if (!el.contains(e.target as Node)) close();
  }

  function onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      close();
      trigger.focus();
    }
  }

  function open(): void {
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    search.hidden = options.length < 12;
    search.value = '';
    renderOptions();
    if (!search.hidden) search.focus();
    document.addEventListener('mousedown', onOutside, true);
    document.addEventListener('keydown', onKeydown, true);
  }

  function close(): void {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    document.removeEventListener('mousedown', onOutside, true);
    document.removeEventListener('keydown', onKeydown, true);
  }

  trigger.addEventListener('click', () => {
    if (menu.hidden) open();
    else close();
  });
  search.addEventListener('input', () => renderOptions(search.value));

  renderLabel();

  return {
    el,
    getValue: () => value,
    setValue(id: string): void {
      value = id;
      renderLabel();
    },
    setOptions(next: DropdownOption[]): void {
      options = next;
      renderLabel();
      if (!menu.hidden) renderOptions(search.value);
    },
    setPlaceholder(text: string): void {
      placeholder = text;
      renderLabel();
    },
    onChange(h: (id: string) => void): void {
      handler = h;
    },
  };
}
