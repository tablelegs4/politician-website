/**
 * テーマ設定
 *
 * 使用するテーマを変更する場合は、CURRENT_THEME の値を変更してください。
 * 利用可能なテーマ: 'default', 'modern'
 */

export const THEMES = {
  default: 'default',
  modern: 'modern',
} as const;

export type ThemeType = typeof THEMES[keyof typeof THEMES];

/**
 * 現在使用中のテーマ
 * ここを変更するだけでサイト全体のテーマが切り替わります
 */
export const CURRENT_THEME: ThemeType = 'default';
// export const CURRENT_THEME: ThemeType = 'modern';

/**
 * サイト共通のテーマカラー
 */
export const THEME_COLORS = {
  primary: '#043e80',    // ブルー
  secondary: '#f5b500',  // ゴールド
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
  modern: {
    hero: getImagePath('/images/hero-modern.jpg'),
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
  modern: {
    name: 'モダンテーマ',
    description: 'モダンでスタイリッシュなデザイン',
  },
} as const;
