// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // SITE_URL lets a preview (e.g. a tunnel) build absolute URLs such as og:image
  // that point at itself; production uses the real domain.
  site: process.env.SITE_URL ?? 'https://gonzalorios.cl',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  devToolbar: { enabled: false },
});
