import type { TargetLanguage } from './types';

const TRAD_ONLY =
  '國語體學時間長門開關車東們說什麼後萬點個書臺灣華讀寫聽權利現實網絡與爲專業處發現經過聯繫體驗選擇講義';
const SIMP_ONLY =
  '国语体学时间长门开关车东们说什么是后万点个书台湾华读写听权利现实网络与为专业处发现经过联系体验选择讲义';

type LatinLang = 'en' | 'fr' | 'de' | 'es' | 'pt';

const STOPWORDS: Record<LatinLang, string[]> = {
  en: [
    'the', 'is', 'are', 'was', 'were', 'and', 'of', 'to', 'in', 'that', 'it',
    'for', 'with', 'as', 'on', 'this', 'be', 'by', 'from', 'or', 'an', 'at',
    'not', 'you', 'we', 'have', 'has', 'will', 'can',
  ],
  fr: [
    'le', 'la', 'les', 'de', 'des', 'et', 'est', 'en', 'un', 'une', 'du',
    'dans', 'que', 'qui', 'pour', 'par', 'sur', 'avec', 'au', 'ce', 'il',
    'ne', 'pas', 'plus', 'vous', 'nous', 'très', 'être', 'mais',
  ],
  de: [
    'der', 'die', 'das', 'und', 'ist', 'ein', 'eine', 'nicht', 'mit', 'sich',
    'auf', 'für', 'den', 'dem', 'zu', 'von', 'im', 'auch', 'als', 'nach',
    'über', 'ich', 'sie', 'wir', 'nicht', 'noch', 'werden',
  ],
  es: [
    'el', 'la', 'los', 'las', 'de', 'del', 'que', 'en', 'un', 'una', 'y',
    'es', 'por', 'con', 'para', 'no', 'se', 'al', 'lo', 'como', 'más', 'pero',
    'muy', 'está', 'son', 'este',
  ],
  pt: [
    'o', 'a', 'os', 'as', 'de', 'do', 'da', 'dos', 'das', 'que', 'em', 'um',
    'uma', 'não', 'para', 'com', 'por', 'mais', 'ao', 'se', 'como', 'também',
    'você', 'está', 'são', 'isso',
  ],
};

function countIn(text: string, re: RegExp): number {
  return (text.match(re) ?? []).length;
}

function countChars(text: string, set: string): number {
  let n = 0;
  for (const ch of text) {
    if (set.includes(ch)) n++;
  }
  return n;
}

function detectLatin(text: string): TargetLanguage | null {
  const tokens = text.toLowerCase().match(/[\p{L}]+/gu) ?? [];
  if (tokens.length < 3) return null;
  const scores: Record<LatinLang, number> = {
    en: 0,
    fr: 0,
    de: 0,
    es: 0,
    pt: 0,
  };
  for (const token of tokens) {
    (Object.keys(scores) as LatinLang[]).forEach((lang) => {
      if (STOPWORDS[lang].includes(token)) scores[lang]++;
    });
  }
  const ranked = (Object.keys(scores) as LatinLang[]).map(
    (lang) => [lang, scores[lang]] as const,
  );
  ranked.sort((a, b) => b[1] - a[1]);
  const [top, topScore] = ranked[0];
  const secondScore = ranked[1][1];
  if (topScore < 2 || topScore < secondScore * 1.3) return null;
  return top;
}

export function langFamily(code: TargetLanguage): string {
  return code === 'zh-TW' ? 'zh' : code;
}

// 启发式语言识别：仅在置信度足够时返回结果，拿不准返回 null（调用方保持可用状态）
export function detectLanguage(text: string): TargetLanguage | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const han = countIn(trimmed, /[\u4e00-\u9fff]/g);
  const kana = countIn(trimmed, /[\u3040-\u30ff]/g);
  const hangul = countIn(trimmed, /[\uac00-\ud7af]/g);
  const cyrillic = countIn(trimmed, /[\u0400-\u04ff]/g);
  const latin = countIn(trimmed, /[a-zA-Z]/g);
  const total = han + kana + hangul + cyrillic + latin;
  if (total < 3) return null;

  if (kana >= 2 || (kana > 0 && kana >= han * 0.15)) return 'ja';
  if (hangul >= 2 || hangul >= total * 0.3) return 'ko';
  if (han >= total * 0.5) {
    const trad = countChars(trimmed, TRAD_ONLY);
    const simp = countChars(trimmed, SIMP_ONLY);
    return trad > simp ? 'zh-TW' : 'zh';
  }
  if (cyrillic >= total * 0.5) return 'ru';
  if (latin >= total * 0.5) return detectLatin(trimmed);
  return null;
}
