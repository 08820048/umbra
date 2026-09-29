const ATTR_ORIGINAL = 'data-wt-original';
const ATTR_MARK = 'data-wt-translated';
const SKIP_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'TEXTAREA',
  'INPUT',
  'SELECT',
  'OPTION',
  'CODE',
  'PRE',
  'KBD',
  'SAMP',
  'SVG',
  'MATH',
  'IFRAME',
  'CANVAS',
  'VIDEO',
  'AUDIO',
]);

export interface TextNodeRef {
  node: Text;
  text: string;
}

function shouldSkip(el: Element | null): boolean {
  if (!el) return true;
  if (SKIP_TAGS.has(el.tagName)) return true;
  if (el.id === 'web-translator-bubble') return true;
  if (el.closest?.('#web-translator-bubble')) return true;
  const role = el.getAttribute?.('role');
  if (role === 'textbox' || (el instanceof HTMLElement && el.isContentEditable)) return true;
  return false;
}

export function collectTextNodes(root: Node = document.body): TextNodeRef[] {
  if (!root) return [];
  const results: TextNodeRef[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.nodeValue || '';
      if (!text.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (shouldSkip(parent)) return NodeFilter.FILTER_REJECT;
      // Skip very short punctuation-only nodes
      if (!/[\p{L}\p{N}]/u.test(text)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let current: Node | null;
  while ((current = walker.nextNode())) {
    const textNode = current as Text;
    results.push({ node: textNode, text: textNode.nodeValue || '' });
  }
  return results;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

export async function translatePage(
  translateBatch: (texts: string[]) => Promise<string[]>,
  onProgress?: (done: number, total: number) => void,
): Promise<{ translated: number; skipped: number }> {
  restorePage();

  const nodes = collectTextNodes();
  if (nodes.length === 0) {
    return { translated: 0, skipped: 0 };
  }

  // Deduplicate identical texts within a batch window to save tokens
  const batches = chunk(nodes, 20);
  let done = 0;
  let translated = 0;

  for (const batch of batches) {
    const texts = batch.map((b) => b.text);
    let results: string[];
    try {
      results = await translateBatch(texts);
    } catch (err) {
      throw err;
    }

    for (let i = 0; i < batch.length; i++) {
      const item = batch[i];
      const translatedText = results[i];
      if (
        !item.node.isConnected ||
        typeof translatedText !== 'string' ||
        translatedText === item.text
      ) {
        done++;
        continue;
      }
      const parent = item.node.parentElement;
      if (parent && !parent.hasAttribute(ATTR_ORIGINAL)) {
        // Store original on a wrapper marker via sibling attribute on parent for first text
      }
      // Store original on the text node via a marker element attribute on parent
      if (parent) {
        if (!parent.hasAttribute(ATTR_MARK)) {
          parent.setAttribute(ATTR_MARK, '1');
        }
      }
      // Keep original in a WeakMap-like via data on a comment? Use Map keyed by node.
      storeOriginal(item.node, item.text);
      item.node.nodeValue = translatedText;
      translated++;
      done++;
    }
    onProgress?.(done, nodes.length);
  }

  return { translated, skipped: nodes.length - translated };
}

const originalMap = new WeakMap<Text, string>();
const trackedNodes = new Set<Text>();

function storeOriginal(node: Text, original: string): void {
  if (!originalMap.has(node)) {
    originalMap.set(node, original);
    trackedNodes.add(node);
  }
}

export function restorePage(): number {
  let restored = 0;
  for (const node of Array.from(trackedNodes)) {
    const original = originalMap.get(node);
    if (original !== undefined && node.isConnected) {
      node.nodeValue = original;
      restored++;
    }
    originalMap.delete(node);
    trackedNodes.delete(node);
  }
  document.querySelectorAll(`[${ATTR_MARK}]`).forEach((el) => {
    el.removeAttribute(ATTR_MARK);
    el.removeAttribute(ATTR_ORIGINAL);
  });
  return restored;
}

export function isPageTranslated(): boolean {
  return trackedNodes.size > 0;
}
