import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // 実際のURLに変更すること
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
