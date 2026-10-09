# website

Source code for Gonzalo Ríos' personal website: a scroll-driven, voice-narrated CV.

The site is bilingual (English at `/`, Spanish at `/es/`), fully usable with a screen reader and keyboard, and exposes a Markdown version of every page (`/index.md`, `/es/index.md`).

## Stack

- [Astro](https://astro.build) 7, static output, built-in i18n routing.
- [GSAP](https://gsap.com) + ScrollTrigger for scroll-driven motion (progressive enhancement; everything works with `prefers-reduced-motion`).
- Self-hosted fonts via Fontsource: Geist, Geist Mono and Instrument Serif.
- Voice narration recorded with ElevenLabs (Opus/WebM with MP3 fallback, plus word timings for captions).

## Commands

Requires Node.js 22.12 or newer.

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `http://localhost:4321` |
| `npm run build` | Build the static site into `dist/` |
| `SITE_URL=https://… npm run build` | Build with another base URL (canonical, hreflang, `og:image`), e.g. to test social previews through a tunnel. Defaults to `https://gonzalorios.cl` |
| `public/og/<locale>.jpg` | Open Graph / Twitter cards (1200×630 JPEG, per locale), built from the private repo with `node scripts/build-og.mjs` |
| `npm run preview` | Serve `dist/` locally with the headers from `public/_headers` (UTF-8 charsets, as in production). Accepts `-- --port <n> --host <ip>` |
| `npm run check` | Type-check Astro and TypeScript files |
| `npm run cv` | Build, compile the LaTeX CVs to PDF with Tectonic (`brew install tectonic`) into `public/cv/`, and build again. Run after any content change; the build warns when a PDF is stale |

## Project layout

| Path | Contents |
|---|---|
| `src/content/site.ts` | All copy (EN/ES) — the single source for HTML, Markdown and `llms.txt` |
| `src/content/narration.json` | Voice narration scripts per locale and section |
| `src/components/` | Page sections (Hero, About, Skills, Work, Experience, Achievements, Contact) and the voice player |
| `src/scripts/` | Client code: `voice.ts` (narration, captions, lip-sync), `interactions.ts`, `motion.ts` |
| `src/pages/` | Routes: `/`, `/es/`, Markdown twins, `sitemap.xml`, `robots.txt`, `llms.txt`, `404` |
| `public/audio/<locale>/` | Generated narration: `<clip>.webm`, `<clip>.mp3`, `<clip>.json` (word timings) |
| `public/avatar/` | Generated avatar layers: `figure`, `talk` (mouth), `blink` (eyes) and `face` (badge photo) WebP files, built from private sources |
| `src/content/resume.ts` | CV-only details (ISO dates, highlights, education) used by JSON Resume, LaTeX and PDF |
| `public/cv/` | Compiled PDF CVs per locale and `manifest.json` (hash of the LaTeX each PDF came from) |

## Deploy (Cloudflare Workers)

The site is an assets-only Cloudflare Worker (`wrangler.jsonc`): Cloudflare serves `dist/` and applies `public/_headers` (security headers, UTF-8 content types, caching). There is no server code and no runtime secret.

| Command | What it does |
|---|---|
| `npx wrangler login` | One-time browser login; the OAuth token stays in your user profile, never in the repo |
| `npm run deploy` | Build and deploy to production |
| `npm run deploy:preview` | Build and upload a preview version (preview URL, production untouched) |

Production deploys are meant to come from **Workers Builds** (Cloudflare's Git integration) on every push to `main`, with build command `npm run build` and deploy command `npx wrangler deploy`, so no API token lives in GitHub.

Security: `integrations/csp-headers.mjs` hashes every inline script and style after the build and appends a strict Content-Security-Policy header to `dist/_headers` (including `frame-ancestors 'none'`); `public/_headers` adds HSTS, Permissions-Policy, COOP, `X-Frame-Options` and nosniff. With npm 11+, `.npmrc` (`strict-allow-scripts`) and `allowScripts` in `package.json` let only `esbuild`, `workerd` and `fsevents` run install scripts; the Workers Builds image uses npm 10, where the lockfile and exact pins are the controls.

## Voice narration

Audio files are generated outside this repo, so the ElevenLabs key never touches it. After changing `src/content/narration.json`, regenerate from the private workspace root:

```bash
node scripts/generate-voice.mjs          # only clips whose text changed
node scripts/generate-voice.mjs --force  # everything
```

Narration never autoplays: visitors start it from the "Hear my intro" or "Listen to this section" buttons. Captions are shown word by word in the player.

## Standards

- **Accessibility:** WCAG 2.2 AA; zero axe-core violations in both languages and color schemes.
- **Encoding:** UTF-8 everywhere. The static build does not carry response headers, so `public/_headers` declares UTF-8 content types for HTML, Markdown, `robots.txt`, `llms.txt` and the sitemap (honoured by Cloudflare Pages and Netlify). Any other host must be configured to send the same headers.
- **SEO:** canonical URLs, `hreflang` (`en`, `es`, `x-default`), JSON-LD `Person`, `sitemap.xml`, `robots.txt`, `llms.txt`.
