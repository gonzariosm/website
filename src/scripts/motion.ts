// Scroll-driven motion with GSAP. Everything here is progressive enhancement:
// with reduced motion (or if this module fails) all content stays visible.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// One-shot entrances use IntersectionObserver, not precomputed ScrollTrigger
// positions: the browser reports real visibility, so jumps (nav links, fast
// flicks on phones) and layout changes (opening a project, the skills list)
// can never leave an element hidden. ScrollTrigger keeps the scrubbed effects.
let observers: IntersectionObserver[] = [];

function whenVisible(targets: Element[], play: (els: Element[]) => void, rootMargin = '0px 0px -10% 0px') {
  if (!targets.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      const entering = entries.filter((e) => e.isIntersecting).map((e) => e.target);
      if (!entering.length) return;
      for (const el of entering) io.unobserve(el);
      play(entering);
    },
    { rootMargin },
  );
  for (const t of targets) io.observe(t);
  observers.push(io);
}

/** Scrubbed triggers depend on layout: recompute them when the page height changes. */
function refreshOnLayoutChange() {
  let timer = 0;
  let lastHeight = document.documentElement.scrollHeight;
  const ro = new ResizeObserver(() => {
    const height = document.documentElement.scrollHeight;
    if (height === lastHeight) return;
    lastHeight = height;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
  });
  ro.observe(document.body);
  return () => {
    ro.disconnect();
    window.clearTimeout(timer);
  };
}

export function initMotion() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 961px)', () => {
    heroScroll();
  });

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // The hero entrance is pure CSS (global.css), so it never waits for this module.
    reveals();
    statement();
    badgeDrop();
    skillsTiles();
    timeline();
    counters();
    const stopRefresh = refreshOnLayoutChange();
    // If the preference changes mid-visit, stop observing and leave every
    // counter at its final value.
    return () => {
      for (const o of observers) o.disconnect();
      observers = [];
      stopRefresh();
      finalCounters();
    };
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('[data-reveal]', { clearProps: 'all', opacity: 1 });
    document.querySelectorAll<HTMLElement>('.statement__word').forEach((w) => (w.style.opacity = '1'));
    finalCounters();
  });
}

function heroScroll() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  const trigger = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('[data-hero-word]', { yPercent: 35, xPercent: -6, ease: 'none', scrollTrigger: trigger });
  gsap.to('[data-hero-copy]', { y: -60, opacity: 0, ease: 'none', scrollTrigger: { ...trigger, end: '60% top' } });
  // Explicit start values: the CSS entrance may still be running when this is
  // created, and GSAP would otherwise capture a mid-animation transform.
  gsap.fromTo('[data-hero-stage]', { y: 0, scale: 1 }, { y: -40, scale: 1.04, ease: 'none', scrollTrigger: trigger });
}

function reveals() {
  whenVisible(gsap.utils.toArray<Element>('[data-reveal]'), (els) =>
    gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07, overwrite: true }),
  );
}

function statement() {
  const words = gsap.utils.toArray<HTMLElement>('.statement__word');
  if (!words.length) return;
  gsap.set(words, { transition: 'none' });
  ScrollTrigger.create({
    trigger: '[data-statement]',
    start: 'top top',
    end: '+=110%',
    pin: true,
    scrub: true,
    onUpdate: (self) => {
      const lit = self.progress * words.length;
      words.forEach((w, i) => {
        const o = gsap.utils.clamp(0.14, 1, 0.14 + (lit - i) * 0.86);
        w.style.opacity = String(o);
      });
    },
  });
}

function badgeDrop() {
  const badge = document.querySelector<HTMLElement>('[data-badge]');
  const hang = badge?.querySelector('[data-badge-hang]');
  if (!badge || !hang) return;
  const drop = gsap.fromTo(
    hang,
    { yPercent: -45, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.6,
      ease: 'back.out(1.4)',
      paused: true,
      onStart: () => badge.dispatchEvent(new Event('badge:drop')),
    },
  );
  whenVisible([badge], () => drop.play());
}

function skillsTiles() {
  const grid = document.querySelector('[data-skills-grid]');
  if (!grid) return;
  const tiles = gsap.fromTo(
    grid.querySelectorAll('.tile'),
    { opacity: 0, y: 24, rotateX: -35 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: { each: 0.025, grid: 'auto', from: 'start' },
      clearProps: 'transform,opacity',
      paused: true,
    },
  );
  whenVisible([grid], () => tiles.play());
}

function timeline() {
  const wrap = document.querySelector('[data-timeline]');
  const fill = document.querySelector('[data-timeline-fill]');
  if (!wrap || !fill) return;
  gsap.to(fill, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: wrap, start: 'top 60%', end: 'bottom 60%', scrub: true },
  });
  gsap.utils.toArray<HTMLElement>('[data-timeline-item]').forEach((item) => {
    const year = item.querySelector('.timeline__year:not(.is-repeat)');
    const card = item.querySelector('.timeline__card');
    const dot = item.querySelector('.timeline__dot');
    const tl = gsap.timeline({ paused: true });
    if (year) tl.fromTo(year, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, 0);
    if (card) tl.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' }, 0.08);
    if (dot) tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.8, ease: 'back.out(3)' }, 0.1);
    whenVisible([item], () => tl.play());
  });
}

function finalCounters() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    el.textContent = new Intl.NumberFormat(el.dataset.locale ?? 'en-US').format(Number(el.dataset.count));
  });
}

function counters() {
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const nf = new Intl.NumberFormat(el.dataset.locale ?? 'en-US');
    const state = { v: 0 };
    el.textContent = nf.format(0);
    const count = gsap.to(state, {
      v: target,
      duration: target > 100 ? 2.2 : 1.4,
      ease: 'expo.out',
      paused: true,
      onUpdate: () => {
        el.textContent = nf.format(Math.round(state.v));
      },
    });
    whenVisible([el], () => count.play());
  });
}
