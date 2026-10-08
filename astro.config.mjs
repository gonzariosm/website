// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gonzalorios.cl',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  devToolbar: { enabled: false },
});
