# 画像ファイル配置ガイド

このディレクトリには、サイトで使用する画像ファイルを配置します。

## 必要な画像ファイル

### 1. ロゴ・シンボル
- **ファイル名**: `logo.png` または `logo.svg`
- **推奨サイズ**: 200x200px程度（SVGの場合はサイズ制限なし）
- **用途**: サイトヘッダー、TOPページなど
- **形式**: PNG（透過背景推奨）またはSVG

### 2. ヒーロー画像（メインビジュアル）

#### デフォルトテーマ用
- **ファイル名**: `hero-default.jpg`
- **推奨サイズ**: 1920x1080px
- **用途**: デフォルトテーマのTOPページ背景

#### モダンテーマ用
- **ファイル名**: `hero-modern.jpg`
- **推奨サイズ**: 1920x1080px
- **用途**: モダンテーマのヒーローセクション背景

### 3. 活動写真（複数枚）
- **ディレクトリ**: `activities/`
- **ファイル名**: `activity-01.jpg`, `activity-02.jpg`, `activity-03.jpg`（3枚以上）
- **推奨サイズ**: 800x600px程度
- **用途**: 活動写真ギャラリー
- **形式**: JPEG

## 画像の最適化

### 推奨事項
1. **ファイルサイズ**: 各画像は1MB以下に圧縮
2. **形式**:
   - 写真: JPEG (品質80-85%)
   - ロゴ・アイコン: PNG または SVG
   - 可能であればWebPに変換
3. **解像度**: Retina対応の場合は2倍サイズで用意

### 最適化ツール
- [TinyPNG](https://tinypng.com/) - PNG/JPEG圧縮
- [Squoosh](https://squoosh.app/) - WebP変換
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG最適化

## プレースホルダー画像

実際の画像が用意できるまで、以下のプレースホルダーを使用できます:

```
ヒーロー画像: https://via.placeholder.com/1920x1080/043e80/ffffff?text=Hero+Image
活動写真: https://via.placeholder.com/800x600/f5b500/ffffff?text=Activity+Photo
ロゴ: https://via.placeholder.com/200x200/043e80/ffffff?text=Logo
```

## 著作権・肖像権について

- 使用する画像は必ず使用権を確認してください
- 人物が写っている場合は肖像権の許可を取得してください
- 商用利用可能な素材を使用するか、オリジナル撮影を推奨

## 現在の画像設定

画像パスは `src/config/theme.ts` で管理されています:

```typescript
export const THEME_IMAGES = {
  default: {
    hero: '/images/hero-default.jpg',
    logo: '/images/logo.png',
  },
  modern: {
    hero: '/images/hero-modern.jpg',
    logo: '/images/logo.png',
  },
}

export const SITE_IMAGES = {
  activities: [
    { src: '/images/activities/activity-01.jpg', alt: '地域活動の様子' },
    { src: '/images/activities/activity-02.jpg', alt: '街頭演説の様子' },
    { src: '/images/activities/activity-03.jpg', alt: '住民との対話' },
  ],
}
```

## トラブルシューティング

### 画像が表示されない場合
1. ファイル名が設定と一致しているか確認
2. ファイルパスが正しいか確認（大文字小文字を区別）
3. 開発サーバーを再起動
4. ブラウザのキャッシュをクリア

### 画像が大きすぎる場合
1. 画像圧縮ツールで最適化
2. 適切な解像度にリサイズ
3. WebP形式への変換を検討
