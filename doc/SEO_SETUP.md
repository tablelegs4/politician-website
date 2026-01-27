# SEO・OGP設定ガイド

このドキュメントでは、サイトのSEO（検索エンジン最適化）とOGP（ソーシャルメディア共有）の設定方法を説明します。

## 設定ファイルの場所

すべての設定は `src/data/site.json` で管理されています。

## 必須設定項目

### 1. OGP画像

**ファイルパス**: `public/images/ogp.jpg`

- **推奨サイズ**: 1200×630ピクセル
- **ファイル形式**: JPG, PNG
- **最大サイズ**: 5MB以下
- **用途**: Twitter、Facebook、LINEなどでリンクを共有した際に表示される画像

```json
"ogp": {
  "image": "/images/ogp.jpg",
  "imageWidth": "1200",
  "imageHeight": "630",
  "imageAlt": "山田太郎 公式サイト OGP画像"
}
```

### 2. SEOキーワード

検索エンジンで引っかかりやすくするためのキーワードを設定します。

```json
"seo": {
  "keywords": [
    "山田太郎",
    "国民民主党",
    "〇〇県",
    "〇〇区",
    "経済成長",
    "政治家",
    "選挙",
    "地域活動",
    "市政",
    "県政"
  ]
}
```

**設定のポイント**:
- 候補者名、地域名、政党名は必須
- 主要政策に関連するキーワード（例：経済成長、教育、子育て）
- 地域の市町村名
- 5〜15個程度が適切

### 3. メタディスクリプション

Google検索結果に表示される説明文です。

```json
"seo": {
  "metaDescription": "〇〇県〇〇区選出の山田太郎公式サイト。経済成長で暮らしを豊かに、手取りを上げて明るく元気な暮らしを実現します。政策、活動報告、プロフィール、お問い合わせはこちら。"
}
```

**設定のポイント**:
- 120〜160文字が最適
- 地域名、候補者名、主要メッセージを含める
- サイトの内容が一目でわかるように
- 検索結果でクリックしたくなる文章に

## Twitter設定

Twitterで共有された際の表示を最適化します。

```json
"twitter": {
  "site": "@your_account",
  "creator": "@your_account",
  "cardType": "summary_large_image"
}
```

**設定方法**:
1. `site`: 組織・政党のTwitterアカウント（@から始まる）
2. `creator`: 候補者本人のTwitterアカウント
3. `cardType`: `summary_large_image`（大きな画像）または`summary`（小さな画像）

## 構造化データ（JSON-LD）

Google検索結果でリッチスニペット（著者情報、組織情報など）を表示させるための設定です。

```json
"jsonLd": {
  "enabled": true,
  "type": "Person",
  "additionalTypes": ["Politician"],
  "jobTitle": "衆議院議員",
  "affiliation": {
    "name": "国民民主党",
    "url": "https://www.dpfp.or.jp/"
  },
  "areaServed": {
    "type": "AdministrativeArea",
    "name": "〇〇県〇〇区"
  }
}
```

**設定項目**:
- `jobTitle`: 現職の場合は「衆議院議員」「参議院議員」「〇〇県議会議員」など
- `areaServed.name`: 選挙区名（例：「東京都1区」「北海道比例区」）

## Google Search Console設定

サイトを検索エンジンに登録し、検索パフォーマンスを確認できます。

1. [Google Search Console](https://search.google.com/search-console) にアクセス
2. サイトを登録し、確認コードを取得
3. `site.json`に設定:

```json
"seo": {
  "googleSiteVerification": "ここに確認コード"
}
```

## Bing Webmaster Tools設定

Bingの検索エンジンにサイトを登録します。

1. [Bing Webmaster Tools](https://www.bing.com/webmasters) にアクセス
2. サイトを登録し、確認コードを取得
3. `site.json`に設定:

```json
"seo": {
  "bingSiteVerification": "ここに確認コード"
}
```

## robots.txt

検索エンジンのクローラーに対する指示を記述しています。

**ファイルパス**: `public/robots.txt`

通常は変更不要ですが、特定のページをクロール対象外にしたい場合は以下のように追記できます:

```
Disallow: /private/
Disallow: /admin/
```

## サイトマップ

サイトの構造を検索エンジンに伝えるXMLファイルです。

- Astroが自動生成します（`@astrojs/sitemap`）
- `astro.config.mjs`でサイトURLを設定してください
- 生成されたサイトマップは`/sitemap-index.xml`でアクセス可能

## 確認方法

### OGP画像の確認
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 構造化データの確認
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

### SEO全般の確認
- [PageSpeed Insights](https://pagespeed.web.dev/)
- Google Search Consoleのパフォーマンスレポート

## チェックリスト

サイト公開前に以下を確認してください:

- [ ] OGP画像（`public/images/ogp.jpg`）を1200×630pxで用意
- [ ] プロフィール画像（`public/images/profile.jpg`）を用意
- [ ] `site.json`のすべての`〇〇`を実際の情報に置き換え
- [ ] SEOキーワードを地域・政策に合わせて設定
- [ ] メタディスクリプションを120〜160文字で作成
- [ ] TwitterアカウントのIDを設定
- [ ] `.env`ファイルで`PUBLIC_SITE_URL`を本番URLに設定
- [ ] `robots.txt`のサイトマップURLを本番URLに更新
- [ ] Google Search Consoleにサイトを登録
- [ ] OGP画像の表示をデバッグツールで確認

## トラブルシューティング

### OGP画像が更新されない

ソーシャルメディアのキャッシュが原因です。以下のツールでキャッシュをクリアしてください:

- Facebook: [Sharing Debugger](https://developers.facebook.com/tools/debug/)で「Scrape Again」
- Twitter: 24時間程度待つか、URLパラメータを変えて共有（例：`?v=2`）

### 検索結果に表示されない

- サイト公開後、検索エンジンに反映されるまで数日〜数週間かかります
- Google Search Consoleで「URL検査」を使って手動でインデックス登録をリクエストできます
- `robots.txt`で誤ってブロックしていないか確認

### 構造化データが認識されない

- [Google Rich Results Test](https://search.google.com/test/rich-results)でエラーを確認
- `site.json`の`jsonLd.enabled`が`true`になっているか確認
- 必須フィールドが空になっていないか確認
