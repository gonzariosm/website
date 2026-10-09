// @ts-check
import { defineConfig } from 'astro/config';
import cspHeaders from './integrations/csp-headers.mjs';

export default defineConfig({
  // SITE_URL lets a preview (e.g. a tunnel) build absolute URLs such as og:image
  // that point at itself; production uses the real domain.
  site: process.env.SITE_URL ?? 'https://gonzalorios.cl',
  trailingSlash: 'ignore',
  // Inline all CSS (≈15 KB): no render-blocking stylesheet requests, and the
  // fonts are discovered with the HTML. The CSP integration hashes the <style>s.
  build: { format: 'directory', inlineStylesheets: 'always' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  devToolbar: { enabled: false },
  // The Content-Security-Policy is sent as an HTTP header built from the
  // generated HTML (hashes of every inline script/style); see the integration.
  integrations: [
    cspHeaders({
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "media-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        'upgrade-insecure-requests',
      ],
    }),
  ],
});
