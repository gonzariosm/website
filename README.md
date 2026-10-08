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
| `npm run preview` | Serve `dist/` locally with the headers from `public/_headers` (UTF-8 charsets, as in production). Accepts `-- --port <n> --host <ip>` |
| `npm run check` | Type-check Astro and TypeScript files |

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
