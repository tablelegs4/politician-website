# テーマ切り替えガイド

このサイトでは、複数のデザインテーマを簡単に切り替えられる仕組みを採用しています。

## 利用可能なテーマ

### 1. Default（デフォルト）テーマ
- **特徴**: 標準的な2カラムレイアウト
- **デザイン**: シンプルで読みやすい、堅実なデザイン
- **適用ページ**: トップページ、プロフィール、政策

### 2. Modern（モダン）テーマ
- **特徴**: モダンでスタイリッシュなデザイン
- **デザイン**: グラデーション、カード型レイアウト、大きめの余白
- **適用ページ**: トップページ、プロフィール、政策

## テーマの切り替え方法

### 簡単な方法（推奨）

`src/config/theme.ts` ファイルを開き、`CURRENT_THEME` の値を変更するだけです。

```typescript
// デフォルトテーマを使用する場合
export const CURRENT_THEME: ThemeType = 'default';

// モダンテーマを使用する場合
export const CURRENT_THEME: ThemeType = 'modern';
```

変更後、開発サーバーを再起動してください:

```bash
npm run dev
```

## ディレクトリ構造

```
src/
├── config/
│   └── theme.ts              # テーマ設定ファイル（ここで切り替え）
├── themes/
│   ├── default/              # デフォルトテーマ
│   │   ├── pages/
│   │   │   ├── HomePage.astro
│   │   │   ├── ProfilePage.astro
│   │   │   └── PolicyPage.astro
│   │   └── styles/
│   │       └── theme.css
│   └── modern/               # モダンテーマ
│       ├── pages/
│       │   ├── HomePage.astro
│       │   ├── ProfilePage.astro
│       │   └── PolicyPage.astro
│       └── styles/
│           └── theme.css
└── pages/
    ├── index.astro           # テーマを読み込むエントリーポイント
    ├── profile/
    │   └── index.astro
    └── policy/
        └── index.astro
```

## 新しいテーマの追加方法

1. `src/themes/` ディレクトリに新しいテーマフォルダを作成
   ```
   src/themes/your-theme/
   ├── pages/
   │   ├── HomePage.astro
   │   ├── ProfilePage.astro
   │   └── PolicyPage.astro
   └── styles/
       └── theme.css
   ```

2. `src/config/theme.ts` に新しいテーマを追加
   ```typescript
   export const THEMES = {
     default: 'default',
     modern: 'modern',
     yourTheme: 'your-theme',  // 追加
   } as const;
   ```

3. 各ページファイル（`src/pages/`）に条件分岐を追加
   ```typescript
   const HomePage = CURRENT_THEME === 'your-theme'
     ? (await import('../themes/your-theme/pages/HomePage.astro')).default
     : CURRENT_THEME === 'modern'
       ? (await import('../themes/modern/pages/HomePage.astro')).default
       : (await import('../themes/default/pages/HomePage.astro')).default;
   ```

## カスタマイズのポイント

### テーマ別スタイルの管理

各テーマの `styles/theme.css` ファイルで、テーマ固有のスタイルを定義できます。
CSS変数を使用することで、色やフォントを一元管理できます。

```css
:root {
  --theme-primary: #1a5490;
  --theme-accent: #2980b9;
  --theme-text: #2c3e50;
  /* ... */
}
```

### 共通スタイルの利用

すべてのテーマで共通して使用されるスタイルは `src/styles/global.css` に定義されています。
テーマ固有のスタイルは各テーマの `theme.css` で上書きできます。

## トラブルシューティング

### テーマが切り替わらない

1. `src/config/theme.ts` の `CURRENT_THEME` の値を確認
2. 開発サーバーを再起動 (`npm run dev`)
3. ブラウザのキャッシュをクリア

### スタイルが正しく適用されない

1. 各ページファイルで `themeStyles` が正しくインポートされているか確認
2. CSS変数が正しく定義されているか確認
3. ブラウザの開発者ツールでスタイルの適用状況を確認

## 本番環境へのデプロイ

テーマを切り替えた後は、必ずビルドしてから本番環境にデプロイしてください:

```bash
npm run build
```

ビルドが成功したら、`dist/` ディレクトリの内容をデプロイします。

## まとめ

- テーマの切り替えは `src/config/theme.ts` の1行を変更するだけ
- 各テーマは独立したコンポーネントとスタイルを持つ
- 新しいテーマの追加も簡単
- カスタマイズしやすい構造
