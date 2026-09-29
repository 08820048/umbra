export function t(key: string, subs?: string | string[]): string {
  try {
    return chrome.i18n.getMessage(key, subs) || '';
  } catch {
    return '';
  }
}

export function applyI18n(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const v = t(el.dataset.i18n || '');
    if (v) el.textContent = v;
  });
  root
    .querySelectorAll<HTMLInputElement>('[data-i18n-placeholder]')
    .forEach((el) => {
      const v = t(el.dataset.i18nPlaceholder || '');
      if (v) el.placeholder = v;
    });
}
