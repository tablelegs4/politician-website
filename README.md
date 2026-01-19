# politician-website

政治家公式HPのベーステンプレート
Astroで構築された静的サイト。高速・安全・SEO最適化。

## ライセンス

### コード・構造・テンプレート: MIT License

本リポジトリの **コード・フレームワーク構造・デザインテンプレート** は
[MIT License](LICENSE) の下で公開されています。

フォーク、改変、再配布、商用利用を自由に行うことができます。
他の政治家・団体が自由に流用・発展させることを目的としています。

### コンテンツ: ライセンス対象外

以下は **MIT Licenseの適用対象外** です：

- 実在の政治家の氏名・肩書
- プロフィール文章
- 写真・ロゴ・イラスト等の画像素材
- 政策内容・声明文・ニュース記事などのテキストコンテンツ

**重要：** 本リポジトリをフォーク・利用する場合は、上記コンテンツを **必ず差し替えてください**。

### 免責事項

本テンプレートの利用により生じたいかなる損害についても、開発者は責任を負いません。
また、本リポジトリは特定の政治家・政党・団体を支持・推薦するものではありません。

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 特徴

### 超軽量・高速
- **JavaScriptゼロ** - クライアントサイドJSは一切使用せず、純粋なHTML/CSSのみで構築
- 静的サイト生成（SSG）により、サーバーレスポンスが不要
- 最小限の依存パッケージ

### レスポンシブデザイン
- SP/PCで明確に異なるレイアウト（CSSメディアクエリで完全制御）
- SPはハンバーガーメニュー（`<details>/<summary>`でJSなし実装）
- PCは常時表示ナビゲーション + 2カラムレイアウト

### SEO最適化
- OGP / Twitter Card 完全対応
- sitemap.xml 自動生成
- robots.txt 設定済み
- セマンティックHTML / 見出し階層管理

### 簡単な更新
- ニュース記事はMarkdownで管理（Content Collections）
- `src/content/news/` にファイルを追加するだけで自動反映
- 画像は `public/` に配置

### アクセシビリティ
- 適切な見出し階層
- alt属性、aria-label対応
- フォーカス可視化
- 高コントラスト配色

## 技術スタック

- [Astro](https://astro.build/) v5 - 静的サイトジェネレーター
- TypeScript - 型安全な開発
- 素のCSS - フレームワークなし（軽量化優先）
- Content Collections - Markdown管理

## ページ構成

- `/` - トップページ
- `/profile/` - プロフィール
- `/policy/` - 政策
- `/news/` - お知らせ一覧
- `/news/[slug]/` - お知らせ詳細
- `/contact/` - お問い合わせ
- `/privacy/` - プライバシーポリシー

## クイックスタート

詳細な運用・カスタマイズ方法は **[SETUP.md](SETUP.md)** を参照してください。

### ニュース記事を追加する

1. `src/content/news/` に新しいMarkdownファイルを作成

```md
---
title: お知らせのタイトル
date: 2026-01-20
description: 説明文
tags: ["お知らせ"]
---

本文をここに記述します。
```

2. ビルドすると自動的にページが生成されます

### 画像を差し替える

- **OGP画像**: `public/og-image.jpg` を差し替え（1200x630px推奨）
- **Favicon**: `public/favicon.ico`, `public/apple-touch-icon.png`

### サイト名を変更する

以下のファイルで「山田太郎」を検索して置換：
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/layouts/Layout.astro`

## デプロイ

### Cloudflare Pages（推奨）

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 18+

### その他の静的ホスティング

`dist/` ディレクトリをそのままアップロードするだけで動作します。

対応サービス：Netlify, Vercel, GitHub Pages, AWS S3, Firebase Hosting など

## プロジェクト構成

```
politician-website/
├── src/
│   ├── pages/          # ページ（ルーティング）
│   ├── layouts/        # 共通レイアウト
│   ├── components/     # コンポーネント
│   ├── content/        # Markdownコンテンツ
│   └── styles/         # CSS
├── public/             # 静的ファイル
├── dist/               # ビルド出力
└── astro.config.mjs    # Astro設定
```

## 開発方針

### 禁止事項
- クライアントサイドJavaScript（アニメーション、SPA化など）
- 不要なnpm依存の追加
- 過度な装飾・複雑化

### 推奨事項
- 最小限の実装
- 読みやすさ優先
- アクセシビリティ重視
- パフォーマンス最優先
