# GitHub Pages デプロイ前セキュリティチェックリスト

## ✅ 公開して問題ない情報

以下の情報はGitHub Pagesで公開されても問題ありません：

- [ ] 候補者の氏名・ふりがな
- [ ] 政党名
- [ ] 選挙区・地域名
- [ ] 公式な肩書き・役職
- [ ] 政策内容
- [ ] 活動報告
- [ ] **事務所**の住所・電話番号・メールアドレス
- [ ] 公開SNSアカウントのURL
- [ ] Google Analytics 測定ID（`G-XXXXXXXXXX`）
- [ ] OGP画像・プロフィール画像のパス
- [ ] SEOキーワード・メタディスクリプション

## ⚠️ 注意が必要な情報

### 1. Google Site Verification（検証コード）

**現在の設定**: `src/data/site.json`の`seo.googleSiteVerification`

#### 安全な設定方法

**方法A: メタタグ方式（推奨）**

1. Google Search Consoleで「HTMLタグ」を選択
2. 表示されるメタタグから`content="..."`の値**のみ**をコピー
   ```html
   <meta name="google-site-verification" content="abc123def456..." />
   ```
3. `site.json`に設定
   ```json
   "googleSiteVerification": "abc123def456..."
   ```

この値は公開されても問題ありません（HTMLに埋め込まれるため）。

**方法B: HTMLファイル方式**

1. Google Search Consoleで「HTMLファイル」を選択
2. ダウンロードしたファイルを`public/`直下に配置
3. `site.json`では空文字列のまま
   ```json
   "googleSiteVerification": ""
   ```

### 2. 連絡先情報

**`src/data/site.json`の`contact`セクション**

```json
"contact": {
  "email": "",
  "phone": "",
  "address": "東京都○○区○○ 1-2-3",
  "postalCode": "100-0001"
}
```

#### ✅ 記載してよい情報
- 公式事務所の住所
- 事務所の電話番号
- 事務所の代表メールアドレス

#### ❌ 絶対に記載してはいけない情報
- **個人の自宅住所**
- **私用の携帯電話番号**
- **個人のプライベートメールアドレス**
- **家族の連絡先**

#### 推奨対応
- メールアドレスはGoogleフォームなどの問い合わせフォームURLで代替
  ```json
  "formUrl": "https://forms.gle/xxxxxxx"
  ```
- 直接のメールアドレスを記載する場合、スパム対策されたものを使用

### 3. APIキー・シークレット

以下は**絶対に**`site.json`やGitHubに含めないでください：

- ❌ Google Analytics の管理用APIキー
- ❌ データベース接続情報
- ❌ 外部サービスのシークレットキー
- ❌ パスワード

**注意**: Google Analytics の測定ID（`G-XXXXXXXXXX`）は公開OK（APIキーではない）

### 4. Twitter/SNSアカウント

```json
"twitter": {
  "site": "@",
  "creator": "@"
}
```

#### 設定ルール
- 公開アカウントのみ記載
- 鍵アカウント（非公開）は記載しない
- `@`のみの場合は空文字列`""`に変更推奨

### 5. Bing Site Verification

```json
"bingSiteVerification": ""
```

Google Site Verificationと同様、メタタグの`content`値のみを記載。公開OK。

## 🔒 GitHub リポジトリの公開設定

### パブリックリポジトリの場合

- `site.json`の全内容が誰でも閲覧可能
- コミット履歴も全て公開される
- **過去に記載した機密情報は履歴から削除が必要**

### プライベートリポジトリの場合

- リポジトリ自体は非公開
- ただし、GitHub Pagesでデプロイされたサイトは公開される
- サイトのHTMLソースコードは誰でも見られる

## 📋 デプロイ前チェックリスト

以下を確認してからデプロイしてください：

### site.json の確認

- [ ] `contact.email` - 事務所の公開用メールアドレスか？
- [ ] `contact.phone` - 事務所の公開用電話番号か？
- [ ] `contact.address` - 事務所の住所か？（自宅ではない）
- [ ] `twitter.site` / `twitter.creator` - 公開アカウントか？
- [ ] `seo.googleSiteVerification` - 正しい形式か？（`content`値のみ）
- [ ] すべての`〇〇`プレースホルダーを実際の情報に置き換えたか？

### 画像ファイルの確認

- [ ] `public/images/ogp.jpg` - 公開してよい画像か？
- [ ] `public/images/profile.jpg` - 公開してよい画像か？
- [ ] 画像に個人情報（住所が写った背景など）が含まれていないか？

### その他

- [ ] `.env`ファイルがGitに含まれていないか？（`.gitignore`で除外されているか）
- [ ] `README.md`に機密情報が含まれていないか？
- [ ] コミット履歴に機密情報が含まれていないか？

## 🚨 機密情報を誤ってコミットした場合

### 対処方法

1. **ファイルを削除・修正**
   ```bash
   # site.jsonから機密情報を削除
   # その後コミット
   git add src/data/site.json
   git commit -m "Remove sensitive information"
   ```

2. **過去の履歴から完全削除**（重要）
   ```bash
   # git filter-branchまたはBFG Repo-Cleanerを使用
   # 詳細: https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
   ```

3. **リポジトリを一度削除して作り直す**（最も確実）
   - GitHubのリポジトリを削除
   - ローカルで新しいリポジトリを初期化
   - 機密情報を削除してから再プッシュ

## 📚 参考情報

### Google Search Console の設定

- [Google Search Console](https://search.google.com/search-console)
- 所有権の確認方法: HTMLタグ方式またはHTMLファイル方式

### GitHub Pages のセキュリティ

- [GitHub Docs - セキュリティのベストプラクティス](https://docs.github.com/ja/code-security)
- プライベートリポジトリでもGitHub Pagesは公開される点に注意

### スパム対策

- 問い合わせフォーム（Googleフォーム等）の利用を推奨
- メールアドレスを直接記載する場合、画像化やJavaScriptでのエンコードも検討

## ✅ 結論

**site.jsonは基本的に公開してOK**ですが、以下を必ず確認：

1. 連絡先は**事務所**の情報のみ（個人情報は含めない）
2. Google Site Verificationは正しい形式
3. すべてのSNSアカウントは公開アカウント
4. プレースホルダー（`〇〇`）をすべて置き換え

上記を守れば、GitHub Pagesへのデプロイは安全です。
