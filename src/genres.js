// ジャンル定義とアイコン。色だけで伝えないよう、必ずアイコン＋文字とセットで使う
// 色はハチドリ電力の公式サイト（hachidori-denryoku.jp）の配色から取っている
export const GENRES = [
  { id: 'cafe', label: 'カフェ・飲食', color: '#EFE432', fg: '#000000' },
  { id: 'sweets', label: 'スイーツ', color: '#F4978E', fg: '#000000' },
  { id: 'grocery', label: '食料品・八百屋', color: '#9ACD5B', fg: '#000000' },
  { id: 'goods', label: '雑貨・アパレル', color: '#47A79D', fg: '#000000' },
  { id: 'stay', label: '宿', color: '#9CCBE8', fg: '#000000' },
  { id: 'salon', label: '美容・サロン', color: '#B5E1D8', fg: '#000000' },
  { id: 'other', label: 'その他', color: '#DCC7A8', fg: '#000000' },
];

// ジャンルのアイコン。黒い太線＋白・黄・オレンジ・コーラル・茶のベタ塗りのイラスト調（32×32）
const INK = '#1A1A1A';
const W = '#FFFFFF';
const CREAM = '#FDF4E4';
const Y = '#FAD560';
const CORAL = '#E57967';
const ORANGE = '#F89541';
const LEAF = '#5CB05F';
const TAN = '#E2B27C';
const BROWN = '#AD7645';
const GRAY = '#D6D6D3';
const GENRE_ICONS = {
  // 4つの区画（ひとつだけ黄色）
  all: `<rect x="5" y="5" width="9.5" height="9.5" rx="2" fill="${Y}"/><rect x="17.5" y="5" width="9.5" height="9.5" rx="2" fill="${W}"/>
    <rect x="5" y="17.5" width="9.5" height="9.5" rx="2" fill="${W}"/><rect x="17.5" y="17.5" width="9.5" height="9.5" rx="2" fill="${W}"/>`,
  // 湯気の立つコーヒーカップとソーサー
  cafe: `<path d="M12 3.5c-1.3 1.3 1.3 2.6 0 3.9M16.5 3.5c-1.3 1.3 1.3 2.6 0 3.9"/>
    <ellipse cx="15" cy="26" rx="11.5" ry="2.6" fill="${W}"/>
    <path d="M23.5 13.5h1a3.3 3.3 0 0 1 0 6.6h-2"/>
    <path d="M6.5 10.5h17v6.5a7 7 0 0 1-7 7h-3a7 7 0 0 1-7-7z" fill="${W}"/>`,
  // いちごのショートケーキ
  sweets: `<path d="M4.5 17.5 21 11.5l6.5 4v11h-23z" fill="${CREAM}"/>
    <path d="M4.5 21h23v3h-23z" fill="${CORAL}"/>
    <path d="M16.5 12.5c-.4-2.6 1-4.6 3.2-4.9s3.9 1.4 4 3.6c-.6 1.5-2 2.6-3.6 3.1-1.6-.2-3-.9-3.6-1.8z" fill="${CORAL}"/>
    <path d="M19.5 7.6c.2-1.4 1-2.4 2.3-2.9"/>`,
  // 野菜とにんじんの入ったかご
  grocery: `<path d="M8 15.5c-2.3-.8-3-3.6-1.2-5.2.7-2.6 3.8-3 5.2-.8 2.2.4 2.8 3.4 1.2 5.2" fill="${LEAF}"/>
    <path d="M16.5 15.5 22 7a2.2 2.2 0 0 1 3.7 2.3l-3 6.2" fill="${ORANGE}"/>
    <path d="M24.2 6.4 25 3M25.8 7.6l2.8-1.8"/>
    <path d="M4.5 15.5h23v3.2h-23z" fill="${TAN}"/>
    <path d="M6 18.7h20l-1.6 8.3H7.6z" fill="${TAN}"/>
    <path d="M12 21.5v2.8M16 21.5v2.8M20 21.5v2.8"/>`,
  // 値札の付いたトートバッグ（雑貨・アパレル）
  goods: `<path d="M11 13V8.5a5 5 0 0 1 10 0V13"/>
    <path d="M5.5 12.5h21v13a2 2 0 0 1-2 2h-17a2 2 0 0 1-2-2z" fill="${CREAM}"/>
    <path d="M21 19.5l3.6-2.2 3.6 1.7v6.2l-3.6 2.2-3.6-1.7z" fill="${Y}"/>
    <circle cx="24.6" cy="20.3" r=".6" fill="${INK}"/>`,
  // 木のヘッドボードと布団のベッド（宿）
  stay: `<path d="M6 16V8a1.5 1.5 0 0 1 1.5-1.5h17A1.5 1.5 0 0 1 26 8v8" fill="${BROWN}"/>
    <rect x="9" y="10.5" width="14" height="5" rx="2" fill="${W}"/>
    <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16h19a2.5 2.5 0 0 1 2.5 2.5V25H4z" fill="${W}"/>
    <path d="M4 20h24v5H4z" fill="${CORAL}"/>
    <path d="M6 25v2.5M26 25v2.5"/>`,
  // はさみ（美容・サロン）
  salon: `<path d="M14.8 16.2 22.5 3.5l1.8 1.1-7.4 12.6z" fill="${GRAY}"/>
    <path d="M17.2 16.2 9.5 3.5 7.7 4.6l7.4 12.6z" fill="${GRAY}"/>
    <path d="M12.6 20.8 15.6 16.4M19.4 20.8l-3-4.4"/>
    <circle cx="10" cy="24" r="4" fill="${W}"/><circle cx="22" cy="24" r="4" fill="${W}"/>
    <circle cx="16" cy="14.6" r="1" fill="${INK}"/>`,
  // 紅白の日よけテントのお店（その他）
  other: `<path d="M6.5 13.5v14h19v-14" fill="${W}"/>
    <rect x="9" y="17.5" width="7" height="4.5" rx=".6" fill="${GRAY}"/>
    <path d="M19 27.5v-9.5h4.5v9.5" fill="${BROWN}"/>
    <path d="M7 4.5h18l2.5 5v1.6a2.3 2.3 0 0 1-4.6 0 2.3 2.3 0 0 1-4.6 0 2.3 2.3 0 0 1-4.6 0 2.3 2.3 0 0 1-4.6 0 2.3 2.3 0 0 1-4.6 0V9.5z" fill="${W}"/>
    <path d="M11.5 4.5 10.2 9.5v1.6a2.3 2.3 0 0 0 4.6 0V9.5l.5-5zM20.5 4.5l1 5v1.6a2.3 2.3 0 0 0 4.6 0V9.5L25 4.5z" fill="${CORAL}"/>
    <path d="M4.5 9.5h23"/>`,
};

const ICONS = {
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7.2 4.5 4.5 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  place: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19l7-7"/>',
  star: '<path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9z"/>',
  bookmark: '<path d="M18 21l-6-4.5L6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/>',
  drop: '<path d="M12 2.5S5 11 5 15.5A7 7 0 0 0 12 22a7 7 0 0 0 7-6.5C19 11 12 2.5 12 2.5z"/>',
  phone: '<path d="M21 16.5v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.7 2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7 9.4a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1z"/>',
  external: '<path d="M14 5h5v5"/><path d="M19 5l-8 8"/><path d="M18 14v5H5V6h5"/>',
};

export function icon(name, className = 'icon') {
  if (GENRE_ICONS[name]) {
    return `<svg class="${className} icon--genre" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><g fill="none" style="stroke:var(--icon-ink, ${INK})" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${GENRE_ICONS[name]}</g></svg>`;
  }
  return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] ?? ''}</svg>`;
}

export function genreOf(id) {
  return GENRES.find((g) => g.id === id) ?? GENRES[GENRES.length - 1];
}
