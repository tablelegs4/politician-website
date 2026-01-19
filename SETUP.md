# セットアップ・運用ガイド

## 初期セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:4321` にアクセスして確認できます。

### 3. ビルド

```bash
npm run build
```

静的ファイルが `dist/` ディレクトリに生成されます。

### 4. ビルド結果のプレビュー

```bash
npm run preview
```

---

## カスタマイズ方法

### サイト情報の変更

#### サイト名・政治家名の変更

以下のファイルで「山田太郎」を検索して、実際の氏名に変更してください：

- `src/components/Header.astro` - ヘッダーのサイトタイトル
- `src/components/Footer.astro` - フッターのコピーライト
- `src/layouts/Layout.astro` - ページタイトル、OGP設定

#### サイトURLの変更

`astro.config.mjs` の `site` を実際のURLに変更：

```js
export default defineConfig({
  site: 'https://your-actual-domain.com', // ここを変更
  // ...
});
```

---

## コンテンツ更新手順

### ニュース（お知らせ）の追加

1. `src/content/news/` ディレクトリに新しいMarkdownファイルを作成
2. ファイル名形式: `YYYY-MM-DD-slug.md`（例: `2026-01-20-new-policy.md`）
3. フロントマター（記事のメタデータ）を記述

**テンプレート例：**

```md
---
title: お知らせのタイトル
date: 2026-01-20
description: 一覧ページに表示される説明文（100文字程度）
tags: ["お知らせ", "政策"]
draft: false
---

ここに本文をMarkdown形式で記述します。

## 見出し2

- リスト項目1
- リスト項目2

段落は空行で区切ります。
```

4. ファイルを保存すると、自動的にニュース一覧と詳細ページが生成されます

**下書きとして保存する場合：**

```yaml
draft: true  # trueにすると公開されません
```

---

## 画像の管理

### OGP画像（SNSシェア時の画像）の差し替え

1. `public/og-image.jpg` を差し替え
2. 推奨サイズ: 1200x630px
3. ファイル形式: JPG または PNG

### Favicon（サイトアイコン）の差し替え

以下のファイルを実際の画像に差し替えてください：

- `public/favicon.ico` - 標準favicon（16x16, 32x32）
- `public/apple-touch-icon.png` - iOS用アイコン（180x180px）

### 記事内で画像を使う

1. `public/images/` ディレクトリに画像を配置（ディレクトリは必要に応じて作成）
2. Markdown内で以下のように参照：

```md
![画像の説明](/images/photo.jpg)
```

---

## プロフィール・政策の編集

### プロフィールページ

`src/pages/profile/index.astro` を編集

- 基本情報（氏名、生年月日、出身地など）
- 経歴
- 政治信条

### 政策ページ

`src/pages/policy/index.astro` を編集

- `policies` 配列内の項目を追加・編集・削除

```astro
const policies = [
  {
    title: '政策タイトル',
    description: '政策の詳細説明文...',
  },
  // 追加・編集
];
```

---

## デプロイ（公開）

### Cloudflare Pagesへのデプロイ

1. Cloudflare Pagesにログイン
2. GitHubリポジトリを接続
3. ビルド設定：
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 18以上

4. デプロイ実行

### その他の静的ホスティング

`dist/` ディレクトリの内容をそのままアップロードするだけで公開できます。

対応サービス例：
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

---

## トラブルシューティング

### ビルドエラーが出る

```bash
# キャッシュをクリアして再ビルド
rm -rf node_modules .astro dist
npm install
npm run build
```

### 日付の形式が正しくない

ニュース記事のフロントマターの `date` は必ず `YYYY-MM-DD` 形式で記述してください：

```yaml
date: 2026-01-20  # 正しい
date: 2026/01/20  # エラー
```

### OGP画像が更新されない

SNS側でキャッシュされている可能性があります。以下のツールでキャッシュをクリア：

- Facebook: [シェアデバッガー](https://developers.facebook.com/tools/debug/)
- Twitter: [Card Validator](https://cards-dev.twitter.com/validator)

---

## ファイル構成

```
politician-website/
├── src/
│   ├── pages/              # ページファイル（ルーティング）
│   │   ├── index.astro     # トップページ
│   │   ├── profile/
│   │   ├── policy/
│   │   ├── news/
│   │   ├── contact/
│   │   └── privacy/
│   ├── layouts/
│   │   └── Layout.astro    # 共通レイアウト
│   ├── components/         # 再利用可能なコンポーネント
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── config.ts       # Content Collections設定
│   │   └── news/           # ニュース記事（Markdown）
│   └── styles/
│       └── global.css      # グローバルCSS
├── public/                 # 静的ファイル（画像、favicon等）
├── dist/                   # ビルド出力（自動生成）
├── astro.config.mjs        # Astro設定
├── package.json
└── tsconfig.json
```

---

## 重要な注意事項

### JavaScriptについて

本サイトは **JavaScriptゼロ** で構築されています。

- クライアントサイドJSは一切含まれません
- すべて静的HTMLとCSSのみで動作
- SPメニューは `<details>/<summary>` で実装（JSなし）

新機能を追加する際も、この方針を維持してください。

### パフォーマンス

- 画像は必ず最適化してから配置（WebP/AVIF推奨）
- 不要なCSSは追加しない（`global.css` を編集）

### SEO

各ページの `<Layout>` コンポーネントで以下を必ず設定：

```astro
<Layout
  title="ページタイトル"
  description="ページの説明文（120文字程度）"
>
```

---

## サポート

不明点があれば、リポジトリのIssueで質問してください。
