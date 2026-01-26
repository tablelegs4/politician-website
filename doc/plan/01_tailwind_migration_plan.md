# Tailwind CSS 移行計画

## 概要

既存CSSをTailwindユーティリティクラスに段階的に移行し、レスポンシブ対応を統一する。

## ステータス: ✅ 完了 (2026-01-27)

**Phase 1-3, 5が完了。Phase 4（Modernテーマ）は削除済み。**

## 移行前の状態

| ファイル | 行数 | メディアクエリ | 優先度 |
|----------|------|---------------|--------|
| `src/themes/default/styles/theme.css` | 562 | 24件 | 最高 |
| `src/themes/modern/styles/theme.css` | 454 | 15件 | 高 |
| `src/styles/global.css` | 450 | 7件 | 中 |
| `src/components/Header.astro` | 215 | 7件 | 高 |
| `src/layouts/Layout.astro` | 160 | 1件 | 低 |

**合計: 約1,800行のCSS、46件のメディアクエリ**

## 移行後の状態

| ファイル | 移行前 | 移行後 | メディアクエリ削減 | ステータス |
|----------|--------|--------|-------------------|-----------|
| `src/themes/default/styles/theme.css` | 562行 | 275行 | 24件 → 1件 | ✅ 完了 |
| `src/themes/modern/` | 454行 | - | - | ❌ 削除 |
| `src/components/Header.astro` | 215行 | 0行 | 7件 → 0件 | ✅ 完了 |
| `src/layouts/Layout.astro` | 160行 | 約20行 | 1件 → 0件 | ✅ 完了 |

**削減: 約1,000行のCSS、約45件のメディアクエリを削減**

## 移行方針

### アプローチ: ハイブリッド移行

1. **@apply による段階的置換** - 既存クラス名を維持しつつ中身をTailwindに
2. **新規コードはユーティリティクラス** - HTMLに直接Tailwindクラスを使用
3. **複雑なスタイルは維持** - clip-path、複雑なアニメーションなど

### 重要な制約（Tailwind v4）

**Astroコンポーネント内`<style>`ブロックでの@apply使用に制限あり**:
- `text-white`, `bg-white`などの基本色クラスが認識されない
- カスタムカラー(`text-primary`など)も同様
- 対策: Astroコンポーネント内スタイルは従来のCSSを維持
- `global.css`などのグローバルCSSでは@applyが正常動作

## フェーズ別計画

### Phase 1: 基盤整備（global.css）

**対象ファイル**: `src/styles/global.css`

**作業内容**:
1. `@theme` にカラーパレット追加（secondary, gray系）
2. リセットCSSをTailwind preflight活用に切り替え
3. 共通ユーティリティ（.container, .btn, .card）を`@apply`で書き換え

**Before**:
```css
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #043e80;
  color: #fff;
  border-radius: 4px;
}
```

**After**:
```css
.btn {
  @apply inline-block px-6 py-3 bg-primary text-white rounded;
}
```

### Phase 2: ヘッダー・レイアウト ✅

**対象ファイル**:
- `src/components/Header.astro`
- `src/layouts/Layout.astro`

**作業内容**:

1. ✅ Header: SP/PCのナビゲーション切り替えをTailwindユーティリティクラスで実装
2. ✅ Layout: 文字サイズ切り替えボタンをTailwindユーティリティクラスで実装

**実施結果**:

- Header.astro: 213行のstyleブロックを削除、全てTailwindクラスに移行
- Layout.astro: 75行の大部分をTailwindクラスに移行（文字サイズ変更の:globalスタイルのみ残存）
- メディアクエリ: 4件 → 0件（全て`md:`、`max-md:`プレフィックスに置換）
- **Phase 2完了 (2026-01-27)**

### Phase 3: テーマCSS（Default） ✅

**対象ファイル**: `src/themes/default/styles/theme.css`

**作業内容**:
1. ✅ 5種類のヒーローレイアウトを`@apply`で書き換え
2. ✅ セクション・カード系スタイルの移行
3. ✅ 信頼要素の移行

**実施結果**:

- theme.css: 562行 → 275行（約51%削減）
- メディアクエリ: 24件 → 1件（hero-layout-5のclip-pathのみ従来CSS維持）
- 全てのヒーローレイアウト（TOP1-5）を`@apply`で書き換え
- ロゴ、信頼要素などの共通スタイルも移行完了
- **Phase 3完了 (2026-01-27)**

### Phase 4: テーマCSS（Modern） ❌ 削除

**決定事項**:
- Modernテーマは将来的な拡張性を考慮して削除
- 新しいテーマが必要な場合は、Tailwind化されたDefaultテーマをコピーして作成する方針

**削除内容**:
- `src/themes/modern/` ディレクトリ全体を削除
- `src/config/theme.ts` からmodern関連の設定を削除
- 各ページからmodernテーマへの動的インポートを削除

### Phase 5: ページ固有スタイル ✅

**対象ファイル**:
- `src/themes/default/pages/HomePage.astro`
- `src/themes/default/pages/ProfilePage.astro`
- `src/themes/default/pages/PolicyPage.astro`

**実施結果**:
- ✅ 全ページで`<style>`ブロックなし（Phase 2以前に完了済み）
- ✅ インラインスタイルなし
- **Phase 5完了 (確認のみ)**

## 統一ブレークポイント

```
xs:  480px   超小型スマホ
sm:  640px   スマホ
md:  768px   タブレット（メイン境界）
lg:  1024px  小型PC
xl:  1200px  デスクトップ
```

## 統一カラーパレット

```css
@theme {
  --color-primary: #043e80;
  --color-primary-dark: #032f5e;
  --color-secondary: #f5b500;
  --color-text: #333;
  --color-text-light: #666;
  --color-bg-light: #f8f9fa;
  --color-border: #e0e0e0;
}
```

## 修正対象ファイル一覧

1. `src/styles/global.css` - @theme拡張、@apply導入
2. `src/components/Header.astro` - スタイルブロック書き換え
3. `src/layouts/Layout.astro` - スタイルブロック書き換え
4. `src/themes/default/styles/theme.css` - 全面書き換え
5. `src/themes/modern/styles/theme.css` - 全面書き換え
6. `src/themes/default/pages/HomePage.astro` - スタイル削除/移行
7. `src/themes/default/pages/PolicyPage.astro` - スタイル移行
8. `src/themes/default/pages/ProfilePage.astro` - スタイル移行

## 検証方法

各フェーズ完了後:
1. `npm run build` でビルドエラーがないことを確認
2. `npm run preview` でローカルプレビュー
3. 以下のブレークポイントで表示確認:
   - 375px（iPhone SE）
   - 768px（iPad）
   - 1200px（デスクトップ）
4. 両テーマ（default/modern）で動作確認

## 見積もり

| フェーズ | 作業内容 | 規模 |
|---------|---------|------|
| Phase 1 | global.css基盤 | 小 |
| Phase 2 | Header/Layout | 小 |
| Phase 3 | Default theme | 大 |
| Phase 4 | Modern theme | 中 |
| Phase 5 | ページ固有 | 中 |
