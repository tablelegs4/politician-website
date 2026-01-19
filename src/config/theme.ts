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

/**
 * サイト共通のテーマカラー
 */
export const THEME_COLORS = {
  primary: '#043e80',    // ブルー
  secondary: '#f5b500',  // ゴールド
} as const;

/**
 * テーマごとの画像設定
 */
export const THEME_IMAGES = {
  default: {
    hero: '/images/hero-default.jpg',
    logo: '/images/logo.png',
  },
  modern: {
    hero: '/images/hero-modern.jpg',
    logo: '/images/logo.png',
  },
} as const;

/**
 * サイト共通の画像（活動写真など）
 */
export const SITE_IMAGES = {
  activities: [
    { src: '/images/activities/activity-01.jpg', alt: '地域活動の様子' },
    { src: '/images/activities/activity-02.jpg', alt: '街頭演説の様子' },
    { src: '/images/activities/activity-03.jpg', alt: '住民との対話' },
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
