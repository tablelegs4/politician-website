import { getThemeFromUrl, type ThemeType } from '../config/theme';

/**
 * 現在のテーマを取得
 */
export const getCurrentTheme = (): ThemeType => {
  return getThemeFromUrl();
};

/**
 * テーマに応じたコンポーネントパスを取得
 */
export const getThemedComponentPath = (theme: ThemeType, componentName: string): string => {
  return `../themes/${theme}/${componentName}`;
};

/**
 * テーマに応じたレイアウトパスを取得
 */
export const getThemedLayoutPath = (theme: ThemeType, layoutName: string): string => {
  return `../themes/${theme}/layouts/${layoutName}`;
};
