// Voice narration: one shared <audio>, word-synced captions and an amplitude
// signal that drives the avatar's lip-sync (--level / --talk on [data-avatar]).

interface Word {
  w: string;
  s: number;
  e: number;
}
interface ClipData {
  text: string;
  duration: number;
  words: Word[];
}

const MAX_CHUNK_WORDS = 12;

/** Splits words into caption chunks at sentence ends, or when a chunk would exceed maxChars. */
function chunk(words: Word[], maxChars: number): Word[][] {
  const chunks: Word[][] = [];
  let current: Word[] = [];
  let length = 0;
  for (const word of words) {
    if (current.length && length + word.w.length + 1 > maxChars) {
      chunks.push(current);
      current = [];
      length = 0;
    }
    current.push(word);
    length += word.w.length + 1;
    if (/[.!?…]$/.test(word.w) || current.length >= MAX_CHUNK_WORDS) {
      chunks.push(current);
      current = [];
      length = 0;
    }
  }
  if (current.length) chunks.push(current);
  return chunks;
}

export function initVoice() {
  const player = document.querySelector<HTMLElement>('[data-player]');
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-voice-clip]')];
  if (!player || buttons.length === 0) return;

  const locale = player.dataset.locale ?? 'en';
  const toggle = player.querySelector<HTMLButtonElement>('[data-player-toggle]')!;
  const close = player.querySelector<HTMLButtonElement>('[data-player-close]')!;
  const titleEl = player.querySelector<HTMLElement>('[data-player-title]')!;
  const captionEl = player.querySelector<HTMLElement>('[data-player-caption]')!;
  const progressEl = player.querySelector<HTMLElement>('[data-player-progress]')!;
  const statusEl = document.querySelector<HTMLElement>('[data-player-status]')!;
  const avatars = [...document.querySelectorAll<SVGElement>('[data-avatar]')];

  const audio = new Audio();
  audio.preload = 'none';
  const ext = audio.canPlayType('audio/webm; codecs="opus"') ? 'webm' : 'mp3';
  const cache = new Map<string, ClipData>();

  let currentClip: string | null = null;
  let currentButton: HTMLButtonElement | null = null;
  let chunks: Word[][] = [];
  let chunkIndex = -1;
  let raf = 0;
  let hideTimer = 0;
  let endTimer = 0;
  let generation = 0;
  let loading = false;

  // Web Audio analyser, created lazily inside a user gesture.
  let ctx: AudioContext | null = null;
  let analyser: AnalyserNode | null = null;
  let samples: Uint8Array<ArrayBuffer> | null = null;
  let level = 0;

  function ensureAnalyser() {
    if (ctx || typeof AudioContext === 'undefined') return;
    try {
      ctx = new AudioContext();
      const source = ctx.createMediaElementSource(audio);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      samples = new Uint8Array(new ArrayBuffer(analyser.fftSize));
      source.connect(analyser);
      analyser.connect(ctx.destination);
    } catch {
      ctx = null;
      analyser = null;
    }
  }

  function setAvatar(talk: number, lvl: number) {
    for (const a of avatars) {
      a.style.setProperty('--talk', String(talk));
      a.style.setProperty('--level', lvl.toFixed(3));
    }
  }

  function readLevel(): number {
    if (!analyser || !samples) {
      // Fallback: pseudo-random mouth movement while a word is being spoken.
      return audio.paused ? 0 : 0.35 + Math.random() * 0.4;
    }
    analyser.getByteTimeDomainData(samples);
    let sum = 0;
    for (const v of samples) {
      const x = (v - 128) / 128;
      sum += x * x;
    }
    const rms = Math.sqrt(sum / samples.length);
    return Math.min(1, rms * 5.5);
  }

  function renderChunk(index: number) {
    if (index === chunkIndex) return;
    chunkIndex = index;
    captionEl.replaceChildren(
      ...(chunks[index] ?? []).flatMap((word, i) => {
        const span = document.createElement('span');
        span.className = 'w';
        span.textContent = word.w;
        return i === 0 ? [span] : [document.createTextNode(' '), span];
      }),
    );
  }

  function tick() {
    const t = audio.currentTime;
    const duration = audio.duration || cache.get(currentClip ?? '')?.duration || 1;
    progressEl.style.transform = `scaleX(${Math.min(1, t / duration)})`;

    const index = chunks.findIndex((c) => t < (c.at(-1)?.e ?? 0) + 0.15);
    renderChunk(index === -1 ? chunks.length - 1 : index);
    const spans = captionEl.querySelectorAll('.w');
    (chunks[chunkIndex] ?? []).forEach((word, i) => spans[i]?.classList.toggle('is-spoken', t >= word.s));

    const target = readLevel();
    level += (target - level) * (target > level ? 0.55 : 0.25);
    setAvatar(audio.paused ? 0 : 1, audio.paused ? 0 : level);

    if (!audio.paused) raf = requestAnimationFrame(tick);
  }

  function syncButtons() {
    for (const b of buttons) {
      b.setAttribute('aria-pressed', String(b.dataset.voiceClip === currentClip && !audio.paused));
    }
    const paused = audio.paused;
    player!.classList.toggle('is-paused', paused);
    toggle.setAttribute('aria-label', paused ? player!.dataset.labelPlay! : player!.dataset.labelPause!);
  }

  function showPlayer() {
    window.clearTimeout(hideTimer);
    if (!player!.hidden) {
      player!.classList.remove('is-entering');
      return;
    }
    player!.hidden = false;
    player!.classList.add('is-entering');
    requestAnimationFrame(() => requestAnimationFrame(() => player!.classList.remove('is-entering')));
  }

  function hidePlayer() {
    player!.classList.add('is-entering');
    hideTimer = window.setTimeout(() => {
      player!.hidden = true;
      player!.classList.remove('is-entering');
    }, 400);
  }

  function maxChars(): number {
    const width = captionEl.clientWidth || player!.clientWidth - 120 || 320;
    return Math.max(32, Math.min(90, Math.floor((width / 8.6) * 2)));
  }

  function announceError(button: HTMLButtonElement) {
    const message = player!.dataset.labelUnavailable ?? '';
    statusEl.textContent = message;
    const label = button.querySelector<HTMLElement>('.listen__label');
    if (!label) return;
    const original = label.textContent;
    label.textContent = message;
    window.setTimeout(() => (label.textContent = original), 3500);
  }

  /** Audio is cached as immutable, so URLs carry the clip's content hash. */
  function clipUrl(clip: string, extension: string, version?: string): string {
    return `/audio/${locale}/${clip}.${extension}${version ? `?v=${version}` : ''}`;
  }

  async function load(clip: string, version?: string): Promise<ClipData> {
    const cached = cache.get(clip);
    if (cached) return cached;
    const res = await fetch(clipUrl(clip, 'json', version));
    if (!res.ok) throw new Error(`clip ${clip}: ${res.status}`);
    const data = (await res.json()) as ClipData;
    cache.set(clip, data);
    return data;
  }

  async function play(clip: string, button: HTMLButtonElement) {
    ensureAnalyser();
    void ctx?.resume();
    window.clearTimeout(endTimer);

    if (clip === currentClip) {
      if (loading) return; // ignore repeated clicks while the clip is still loading
      if (audio.paused) await audio.play().catch(() => undefined);
      else audio.pause();
      return;
    }

    const request = ++generation;
    audio.pause();
    currentClip = clip;
    currentButton = button;
    loading = true;
    try {
      const data = await load(clip, button.dataset.voiceVersion);
      if (request !== generation) return;
      titleEl.textContent = button.dataset.voiceTitle ?? '';
      audio.src = clipUrl(clip, ext, button.dataset.voiceVersion);
      showPlayer();
      chunks = chunk(data.words, maxChars());
      chunkIndex = -1;
      renderChunk(0);
      await audio.play();
      if (request !== generation) return;
      statusEl.textContent = `${player!.dataset.labelPlay}: ${titleEl.textContent}`;
    } catch {
      if (request !== generation) return;
      announceError(button);
      stop();
    } finally {
      if (request === generation) loading = false;
    }
  }

  function stop() {
    generation++;
    loading = false;
    window.clearTimeout(endTimer);
    if (player!.contains(document.activeElement)) currentButton?.focus();
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    currentClip = null;
    currentButton = null;
    cancelAnimationFrame(raf);
    setAvatar(0, 0);
    syncButtons();
    hidePlayer();
  }

  audio.addEventListener('play', () => {
    window.clearTimeout(endTimer);
    syncButtons();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  });
  audio.addEventListener('pause', () => {
    syncButtons();
    setAvatar(0, 0);
  });
  audio.addEventListener('ended', () => {
    const finished = generation;
    progressEl.style.transform = 'scaleX(1)';
    window.clearTimeout(endTimer);
    endTimer = window.setTimeout(() => {
      if (generation === finished && audio.paused) stop();
    }, 900);
  });

  for (const b of buttons) {
    b.addEventListener('click', () => void play(b.dataset.voiceClip!, b));
  }
  toggle.addEventListener('click', () => {
    if (!currentClip) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  });
  close.addEventListener('click', () => stop());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentClip) {
      const returnTo = currentButton;
      stop();
      returnTo?.focus();
    }
  });
}
