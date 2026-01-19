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
