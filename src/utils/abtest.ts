/**
 * ABテスト ユーティリティ
 *
 * TOPページのコンテンツ並び順を3パターンでテストし、
 * GA4でパターン別の滞在率を計測するための機能
 */

// ABテストのパターン定義
export type ABTestPattern = 'A' | 'B' | 'C';

// セクションの識別子
export type SectionId =
  | 'policy'      // 重点政策
  | 'message'     // 魂のメッセージ
  | 'profile'     // プロフィール（モバイル用）
  | 'activity'    // 活動報告
  | 'consultation' // 相談誘導CTA
  | 'faq'         // FAQ
  | 'support';    // 支援のお願い

// 各パターンのセクション順序を定義
// Hero（ファーストビュー）と公式SNSは固定のため含めない
// ABテスト対象: 重点政策・魂のメッセージ・プロフィールの順序
export const PATTERN_ORDERS: Record<ABTestPattern, SectionId[]> = {
  // パターン1: 重点政策 → 魂のメッセージ → プロフィール（現在の順序）
  A: ['policy', 'message', 'profile', 'activity', 'consultation', 'faq', 'support'],

  // パターン2: 魂のメッセージ → 重点政策 → プロフィール
  B: ['message', 'policy', 'profile', 'activity', 'consultation', 'faq', 'support'],

  // パターン3: プロフィール → 魂のメッセージ → 重点政策
  C: ['profile', 'message', 'policy', 'activity', 'consultation', 'faq', 'support'],
};

// パターンの説明（GA4レポート用）
export const PATTERN_DESCRIPTIONS: Record<ABTestPattern, string> = {
  A: 'パターン1: 政策→メッセージ→プロフィール',
  B: 'パターン2: メッセージ→政策→プロフィール',
  C: 'パターン3: プロフィール→メッセージ→政策',
};

// LocalStorageのキー
const STORAGE_KEY = 'homepage_ab_pattern';

/**
 * ABテストパターンを取得
 * - 既存のパターンがあればそれを返す（ユーザー一貫性のため）
 * - なければランダムに割り当ててLocalStorageに保存
 */
export function getABTestPattern(): ABTestPattern {
  // クライアントサイドでのみ実行
  if (typeof window === 'undefined') {
    return 'A'; // SSR時はデフォルトパターン
  }

  // 既存のパターンを確認
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && isValidPattern(stored)) {
    return stored as ABTestPattern;
  }

  // 新規割り当て（均等確率）
  const patterns: ABTestPattern[] = ['A', 'B', 'C'];
  const randomIndex = Math.floor(Math.random() * patterns.length);
  const pattern = patterns[randomIndex];

  // LocalStorageに保存
  localStorage.setItem(STORAGE_KEY, pattern);

  return pattern;
}

/**
 * パターンの妥当性チェック
 */
function isValidPattern(value: string): value is ABTestPattern {
  return ['A', 'B', 'C'].includes(value);
}

/**
 * GA4にカスタムディメンションを送信
 * ページビュー時にパターン情報を付与
 */
export function sendABTestEventToGA4(pattern: ABTestPattern): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  // カスタムディメンションとしてパターンを送信
  // GA4管理画面で「ab_test_pattern」をカスタムディメンションとして登録する必要あり
  window.gtag('event', 'ab_test_view', {
    ab_test_name: 'homepage_content_order',
    ab_test_pattern: pattern,
    ab_test_description: PATTERN_DESCRIPTIONS[pattern],
  });

  // ユーザープロパティとしても設定（セッション横断分析用）
  window.gtag('set', 'user_properties', {
    ab_test_pattern: pattern,
  });
}

/**
 * セクションの表示順序を取得
 */
export function getSectionOrder(pattern: ABTestPattern): SectionId[] {
  return PATTERN_ORDERS[pattern];
}

/**
 * 特定のセクションがどの位置にあるかを取得（0始まり）
 */
export function getSectionPosition(pattern: ABTestPattern, sectionId: SectionId): number {
  return PATTERN_ORDERS[pattern].indexOf(sectionId);
}

// gtagの型定義
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
