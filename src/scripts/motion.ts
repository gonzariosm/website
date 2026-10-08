// Scroll-driven motion with GSAP. Everything here is progressive enhancement:
// with reduced motion (or if this module fails) all content stays visible.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMotion() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 961px)', () => {
    heroScroll();
  });

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    heroIntro();
    reveals();
    statement();
    badgeDrop();
    skillsTiles();
    timeline();
    counters();
    // If the preference changes mid-visit, leave every counter at its final value.
    return () => finalCounters();
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('[data-reveal], [data-hero-line], .hero__word span, [data-hero-stage]', { clearProps: 'all', opacity: 1 });
    document.querySelectorAll<HTMLElement>('.statement__word').forEach((w) => (w.style.opacity = '1'));
    finalCounters();
  });
}

function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.fromTo(
    '.hero__word span',
    { yPercent: 60, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 1.6, stagger: 0.05 },
    0,
  )
    .fromTo('[data-hero-stage]', { y: 80, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 1.6 }, 0.15)
    .fromTo(
      '.hero__mask > [data-hero-line]',
      { yPercent: 110, y: 0 },
      { yPercent: 0, y: 0, opacity: 1, duration: 1.3, stagger: 0.1 },
      0.35,
    )
    .fromTo(
      '[data-hero-line]:not(.hero__mask > *)',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.08 },
      0.5,
    );
}

function heroScroll() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  const trigger = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('[data-hero-word]', { yPercent: 35, xPercent: -6, ease: 'none', scrollTrigger: trigger });
  gsap.to('[data-hero-copy]', { y: -60, opacity: 0, ease: 'none', scrollTrigger: { ...trigger, end: '60% top' } });
  gsap.to('[data-hero-stage]', { y: -40, scale: 1.04, ease: 'none', scrollTrigger: trigger });
}

function reveals() {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07, overwrite: true }),
  });
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
  gsap.fromTo(
    hang,
    { yPercent: -45, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.6,
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: badge, start: 'top 80%', once: true },
      onStart: () => badge.dispatchEvent(new Event('badge:drop')),
    },
  );
}

function skillsTiles() {
  const grid = document.querySelector('[data-skills-grid]');
  if (!grid) return;
  gsap.fromTo(
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
      scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
    },
  );
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
    const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 80%', once: true } });
    if (year) tl.fromTo(year, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, 0);
    if (card) tl.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' }, 0.08);
    if (dot) tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.8, ease: 'back.out(3)' }, 0.1);
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
    gsap.to(state, {
      v: target,
      duration: target > 100 ? 2.2 : 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = nf.format(Math.round(state.v));
      },
    });
  });
}
