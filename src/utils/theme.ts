import { CURRENT_THEME, type ThemeType } from '../config/theme';

/**
 * 現在のテーマを取得
 */
export const getCurrentTheme = (): ThemeType => {
  return CURRENT_THEME;
};

/**
 * テーマに応じたコンポーネントパスを取得
 */
export const getThemedComponentPath = (componentName: string): string => {
  return `../themes/${CURRENT_THEME}/${componentName}`;
};

/**
 * テーマに応じたレイアウトパスを取得
 */
export const getThemedLayoutPath = (layoutName: string): string => {
  return `../themes/${CURRENT_THEME}/layouts/${layoutName}`;
};
