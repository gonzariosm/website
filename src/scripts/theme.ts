// Theme preference: system (default, follows the OS), light or dark. The
// choice lives in localStorage['theme'] and becomes data-theme on <html>; the
// inline bootstrap in Base.astro applies it before first paint. Switching
// crossfades the page with a View Transition, or tweens colors where those are
// unsupported, and is instant under prefers-reduced-motion.

type Pref = 'system' | 'light' | 'dark';
type Copy = Record<'button' | 'changed' | Pref, string>;

const KEY = 'theme';
const FADE_MS = 600;
const root = document.documentElement;
const darkQuery = matchMedia('(prefers-color-scheme: dark)');
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

const current = (): Pref => (root.dataset.theme === 'light' || root.dataset.theme === 'dark' ? root.dataset.theme : 'system');
const systemTheme = (): 'light' | 'dark' => (darkQuery.matches ? 'dark' : 'light');

// From system, the first press always changes what you see; then the other
// explicit theme; then back to system.
function next(pref: Pref): Pref {
  const opposite = systemTheme() === 'dark' ? 'light' : 'dark';
  if (pref === 'system') return opposite;
  return pref === opposite ? systemTheme() : 'system';
}

function store(pref: Pref) {
  try {
    if (pref === 'system') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, pref);
  } catch {
    // Storage blocked: the choice still applies to this page view.
  }
}

// The browser chrome color. Each meta carries both palette colors; the
// media-scoped ones follow the OS, an explicit choice overrides both.
function apply(pref: Pref) {
  if (pref === 'system') delete root.dataset.theme;
  else root.dataset.theme = pref;
  for (const m of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    const scheme = pref === 'system' ? (m.media.includes('dark') ? 'dark' : 'light') : pref;
    m.content = m.dataset[scheme]!;
  }
}

// The preference to show once a pending View Transition runs its update, so
// a newer choice (e.g. from another tab) is never overwritten by an older one.
let wanted: Pref = current();

function switchTo(onDone: () => void) {
  if (reducedMotion()) {
    apply(wanted);
    onDone();
    return;
  }
  if (document.startViewTransition) {
    document.startViewTransition(() => apply(wanted)).finished.finally(onDone);
    return;
  }
  root.classList.add('theme-fading');
  apply(wanted);
  setTimeout(() => {
    root.classList.remove('theme-fading');
    onDone();
  }, FADE_MS);
}

export function initTheme() {
  const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  const status = document.querySelector<HTMLElement>('[data-theme-status]');
  if (!button) return;
  const copy: Copy = JSON.parse(button.dataset.copy!);
  const fill = (template: string, pref: Pref) =>
    template.replace('{current}', copy[pref]).replace('{next}', copy[next(pref)]);

  const label = () => button.setAttribute('aria-label', fill(copy.button, wanted));
  let busy = false;

  label();
  button.addEventListener('click', () => {
    if (busy) return;
    busy = true;
    wanted = next(wanted);
    store(wanted);
    switchTo(() => (busy = false));
    label();
    if (status) status.textContent = fill(copy.changed, wanted);
  });

  // "Next" depends on the OS theme; a system choice repaints by itself.
  darkQuery.addEventListener('change', label);

  // Another tab changed the preference.
  addEventListener('storage', (e) => {
    if (e.key !== KEY && e.key !== null) return;
    const v = e.newValue;
    wanted = v === 'light' || v === 'dark' ? v : 'system';
    apply(wanted);
    label();
  });
}
