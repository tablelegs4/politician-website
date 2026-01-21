import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 環境変数から設定を取得（デフォルト値: カスタムドメイン前提）
const siteUrl = process.env.PUBLIC_SITE_URL || 'https://example.com';
const basePath = process.env.PUBLIC_BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'never', // CSSを外部ファイルとして保持
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
