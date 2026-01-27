# site.json 設定リファレンス

`src/data/site.json`の各項目の詳細説明です。

## 基本情報

### siteName
サイトの名称。ブラウザのタブやOGPに表示されます。

```json
"siteName": "山田太郎 公式サイト"
```

### siteDescription
サイト全体の説明。トップページのメタディスクリプションとして使用されます。

```json
"siteDescription": "すべての住民が安心して暮らせる社会の実現を目指して"
```

## politician（政治家情報）

### name
政治家の氏名（漢字表記）

```json
"name": "山田太郎"
```

### nameReading
氏名の読み仮名（ひらがな）

```json
"nameReading": "やまだ たろう"
```

### title
肩書き（任意）。例：「衆議院議員」「〇〇県議会議員」

```json
"title": "衆議院議員"
```

### position
現在の役職（任意）。例：「国民民主党 政務調査会長」

```json
"position": "国民民主党 政務調査会長"
```

### office
事務所名（任意）

```json
"office": "山田太郎事務所"
```

## ogp（OGP設定）

SNSでリンクを共有した際の表示を制御します。

### title
OGPタイトル。通常は`siteName`と同じ。

```json
"title": "山田太郎 公式サイト"
```

### description
OGP説明文。地域や主要メッセージを含めると効果的。

```json
"description": "〇〇県〇区 山田太郎 公式サイト 〇〇市、〇〇市、〇〇市"
```

### image
OGP画像のパス（1200×630px推奨）

```json
"image": "/images/ogp.jpg"
```

### faceImage
プロフィール画像のパス（正方形推奨）

```json
"faceImage": "/images/profile.jpg"
```

### imageWidth / imageHeight
OGP画像のサイズ（ピクセル）

```json
"imageWidth": "1200",
"imageHeight": "630"
```

### imageAlt
OGP画像の代替テキスト（視覚障害者向け）

```json
"imageAlt": "山田太郎 公式サイト OGP画像"
```

## seo（SEO設定）

### keywords
検索キーワード（配列形式）。5〜15個程度が適切。

```json
"keywords": [
  "山田太郎",
  "国民民主党",
  "東京都",
  "1区",
  "経済成長",
  "政治家"
]
```

**推奨キーワード**:
- 候補者名（漢字・ひらがな）
- 政党名
- 選挙区（都道府県・区・市町村名）
- 主要政策キーワード
- 「衆議院議員」「参議院議員」など役職

### metaDescription
検索結果に表示される説明文（120〜160文字推奨）

```json
"metaDescription": "東京都1区選出の山田太郎公式サイト。経済成長で暮らしを豊かに、手取りを上げて明るく元気な暮らしを実現します。政策、活動報告、プロフィール、お問い合わせはこちら。"
```

### author
コンテンツの著者名

```json
"author": "山田太郎"
```

### robots
検索エンジンのクロール指示

```json
"robots": "index, follow"
```

- `index, follow`: すべてのページをインデックス（推奨）
- `noindex, nofollow`: 検索結果に表示しない

### googleSiteVerification
Google Search Console の確認コード

```json
"googleSiteVerification": "abcdefghijklmnopqrstuvwxyz123456"
```

[Google Search Console](https://search.google.com/search-console)で取得

### bingSiteVerification
Bing Webmaster Tools の確認コード

```json
"bingSiteVerification": "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456"
```

[Bing Webmaster Tools](https://www.bing.com/webmasters)で取得

## twitter（Twitter Card設定）

### site
組織・政党のTwitterアカウント（@付き）

```json
"site": "@dpfp_jp"
```

### creator
候補者本人のTwitterアカウント（@付き）

```json
"creator": "@yamada_taro"
```

### cardType
Twitterカードのタイプ

```json
"cardType": "summary_large_image"
```

- `summary_large_image`: 大きな画像（推奨）
- `summary`: 小さな正方形画像

## jsonLd（構造化データ）

Google検索結果でのリッチスニペット表示用。

### enabled
構造化データの出力を有効化

```json
"enabled": true
```

### type
Schema.orgのタイプ

```json
"type": "Person"
```

### additionalTypes
追加のタイプ（配列）

```json
"additionalTypes": ["Politician"]
```

### jobTitle
職業・肩書き

```json
"jobTitle": "衆議院議員"
```

### affiliation
所属組織（政党）

```json
"affiliation": {
  "name": "国民民主党",
  "url": "https://www.dpfp.or.jp/"
}
```

### areaServed
担当地域

```json
"areaServed": {
  "type": "AdministrativeArea",
  "name": "東京都1区"
}
```

## analytics（アクセス解析）

### ga4MeasurementId
Google Analytics 4 の測定ID

```json
"ga4MeasurementId": "G-XXXXXXXXXX"
```

[Google Analytics](https://analytics.google.com/)で取得

## locale（言語・地域）

### primary
主要言語・地域コード

```json
"primary": "ja_JP"
```

### alternate
代替言語（多言語サイトの場合）

```json
"alternate": ["en_US"]
```

通常は空配列`[]`のまま

## verification（検証方法）

将来的な拡張用。現在は空配列。

```json
"verification": {
  "methods": []
}
```

## 設定の優先順位

同じ内容の設定項目がある場合の優先順位：

1. ページ個別の設定（各.astroファイルで指定）
2. `seo.metaDescription`（SEO専用の説明文）
3. `siteDescription`（サイト全体の説明）

例：
- トップページ: `seo.metaDescription`を使用
- 政策ページ: 個別に設定した説明文を使用
- その他のページ: `siteDescription`をフォールバック

## 必須項目チェックリスト

最低限以下の項目は設定してください：

- [ ] `siteName`
- [ ] `siteDescription`
- [ ] `politician.name`
- [ ] `politician.nameReading`
- [ ] `ogp.image`（画像ファイルも用意）
- [ ] `ogp.description`
- [ ] `seo.keywords`（最低5個）
- [ ] `seo.metaDescription`
- [ ] `twitter.site` または `twitter.creator`（Twitterアカウントがある場合）
- [ ] `analytics.ga4MeasurementId`（Google Analyticsを使う場合）

## 推奨設定

より効果的なSEOのために：

- [ ] `seo.googleSiteVerification`（Google Search Console登録）
- [ ] `jsonLd.enabled = true`（構造化データ有効化）
- [ ] `jsonLd.jobTitle`（現職の場合）
- [ ] `jsonLd.areaServed.name`（選挙区名）
- [ ] `ogp.imageAlt`（アクセシビリティ向上）

## 例：完全設定サンプル

```json
{
  "siteName": "山田太郎 公式サイト",
  "siteDescription": "すべての住民が安心して暮らせる社会の実現を目指して",
  "politician": {
    "name": "山田太郎",
    "nameReading": "やまだ たろう",
    "title": "衆議院議員",
    "position": "国民民主党 政務調査会長",
    "office": "山田太郎国会事務所"
  },
  "ogp": {
    "title": "山田太郎 公式サイト",
    "description": "東京都1区 山田太郎 公式サイト 千代田区、中央区、港区",
    "image": "/images/ogp.jpg",
    "faceImage": "/images/profile.jpg",
    "imageWidth": "1200",
    "imageHeight": "630",
    "imageAlt": "山田太郎 公式サイト - 経済成長で暮らしを豊かに"
  },
  "seo": {
    "keywords": [
      "山田太郎",
      "やまだたろう",
      "国民民主党",
      "東京都",
      "1区",
      "千代田区",
      "中央区",
      "港区",
      "経済成長",
      "衆議院議員",
      "政治家",
      "選挙"
    ],
    "metaDescription": "東京都1区（千代田区・中央区・港区）選出の衆議院議員 山田太郎公式サイト。経済成長で暮らしを豊かに、手取りを上げて明るく元気な暮らしを実現します。政策、活動報告、プロフィール、お問い合わせはこちら。",
    "author": "山田太郎",
    "robots": "index, follow",
    "googleSiteVerification": "your-verification-code-here",
    "bingSiteVerification": "your-bing-code-here"
  },
  "twitter": {
    "site": "@dpfp_jp",
    "creator": "@yamada_taro",
    "cardType": "summary_large_image"
  },
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
      "name": "東京都1区"
    }
  },
  "analytics": {
    "ga4MeasurementId": "G-XXXXXXXXXX"
  },
  "locale": {
    "primary": "ja_JP",
    "alternate": []
  },
  "verification": {
    "methods": []
  }
}
```
