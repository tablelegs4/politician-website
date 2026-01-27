/**
 * テーマ設定
<<<<<<< HEAD
 *
 * 現在はdefaultテーマのみ利用可能
 * 将来的にテーマを追加する場合は、defaultテーマをコピーして新規作成することを推奨
=======
>>>>>>> bdf00d5 (変更：モダンテーマのページとスタイルを削除し、デフォルトテーマに統一。テーマ設定を簡素化し、CSS変数を導入してスタイルの一貫性を向上。レスポンシブデザインの最適化を実施。)
 */

export const THEMES = {
  default: 'default',
} as const;

export type ThemeType = typeof THEMES[keyof typeof THEMES];

/**
 * デフォルトテーマ
 */
export const DEFAULT_THEME: ThemeType = 'default';

/**
 * URLパラメータからテーマを取得する関数
 * @param url - 現在のURL
<<<<<<< HEAD
 * @returns テーマ名（現在はdefaultのみ）
 */
export function getThemeFromUrl(url: URL): ThemeType {
  const themeParam = url.searchParams.get('theme');
  if (themeParam === 'default') {
    return themeParam;
  }
=======
 * @returns テーマ名（default のみ）
 */
export function getThemeFromUrl(url: URL): ThemeType {
>>>>>>> bdf00d5 (変更：モダンテーマのページとスタイルを削除し、デフォルトテーマに統一。テーマ設定を簡素化し、CSS変数を導入してスタイルの一貫性を向上。レスポンシブデザインの最適化を実施。)
  return DEFAULT_THEME;
}

/**
 * サイト共通のテーマカラー
 */
export const THEME_COLORS = {
  primary: '#043e80',    // ブルー
  secondary: '#f5b500',  // イエロー
} as const;

/**
 * ベースパスを取得する関数
 */
const getBaseUrl = () => {
  if (typeof import.meta.env !== 'undefined' && import.meta.env.BASE_URL) {
    return import.meta.env.BASE_URL;
  }
  return '/';
};

/**
 * 画像パスを生成する関数
 */
const getImagePath = (path: string) => {
  const base = getBaseUrl();
  // baseが'/'で終わっている場合は重複を避ける
  return base.endsWith('/') ? `${base}${path.replace(/^\//, '')}` : `${base}${path}`;
};

/**
 * テーマごとの画像設定
 */
export const THEME_IMAGES = {
  default: {
    hero: getImagePath('/images/hero-default.jpg'),
    logo: getImagePath('/images/logo.png'),
  },
} as const;

/**
 * サイト共通の画像（活動写真など）
 */
export const SITE_IMAGES = {
  activities: [
    { src: getImagePath('/images/activities/activity-01.jpg'), alt: '地域活動の様子' },
    { src: getImagePath('/images/activities/activity-02.jpg'), alt: '街頭演説の様子' },
    { src: getImagePath('/images/activities/activity-03.jpg'), alt: '住民との対話' },
  ],
} as const;

/**
 * テーマごとの設定
 */
export const THEME_CONFIG = {
  default: {
    name: 'デフォルトテーマ',
    description: '標準的な2カラムレイアウト',
  },
} as const;
