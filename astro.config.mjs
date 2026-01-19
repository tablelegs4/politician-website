import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tablelegs4.github.io',
  base: '/politician-website',
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
