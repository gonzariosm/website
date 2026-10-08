// UI behaviour that works with or without motion: navigation state, skills
// table, project deck, badge flip/swing and email copy.

const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initNav() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const indicator = document.querySelector<HTMLElement>('[data-nav-indicator]');
  const pill = document.querySelector<HTMLElement>('.pill');
  const progress = document.querySelector<HTMLElement>('[data-progress]');
  const sections = links
    .map((l) => document.getElementById(l.dataset.navLink!))
    .filter((s): s is HTMLElement => Boolean(s));
  let active: string | null = null;

  function moveIndicator(link: HTMLAnchorElement | undefined) {
    if (!indicator) return;
    if (!link) {
      indicator.style.opacity = '0';
      return;
    }
    indicator.style.opacity = '1';
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    if (pill && pill.scrollWidth > pill.clientWidth) {
      const target = link.offsetLeft - (pill.clientWidth - link.offsetWidth) / 2;
      pill.scrollTo({ left: target, behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
  }

  function update() {
    const y = window.innerHeight * 0.4;
    let current: string | null = null;
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= y) current = s.id;
    }
    if (current !== active) {
      active = current;
      for (const l of links) {
        if (l.dataset.navLink === current) l.setAttribute('aria-current', 'true');
        else l.removeAttribute('aria-current');
      }
      moveIndicator(links.find((l) => l.dataset.navLink === current));
    }
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    }
  }

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    moveIndicator(links.find((l) => l.dataset.navLink === active));
    update();
  });
  update();
}

export function initSkills() {
  const filters = [...document.querySelectorAll<HTMLButtonElement>('.skills__filter')];
  const tiles = [...document.querySelectorAll<HTMLButtonElement>('[data-tile]')];
  const detail = document.querySelector<HTMLElement>('[data-skills-detail]');
  if (!detail || tiles.length === 0) return;

  const num = detail.querySelector<HTMLElement>('[data-detail-num]')!;
  const sym = detail.querySelector<HTMLElement>('[data-detail-sym]')!;
  const name = detail.querySelector<HTMLElement>('[data-detail-name]')!;
  const family = detail.querySelector<HTMLElement>('[data-detail-family]')!;
  const note = detail.querySelector<HTMLElement>('[data-detail-note]')!;
  const card = detail.querySelector<HTMLElement>('.detail__card')!;

  function show(tile: HTMLButtonElement) {
    const index = tiles.indexOf(tile);
    num.textContent = String(index + 1).padStart(2, '0');
    sym.textContent = tile.dataset.symbol ?? '';
    name.textContent = tile.dataset.name ?? '';
    family.textContent = tile.dataset.familyLabel ?? '';
    note.textContent = tile.dataset.note ?? '';
    if (!reducedMotion()) {
      card.animate(
        [
          { opacity: 0.4, transform: 'translateY(6px) scale(0.985)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 380, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      );
    }
  }

  function select(tile: HTMLButtonElement) {
    for (const t of tiles) t.setAttribute('aria-pressed', String(t === tile));
    show(tile);
  }

  for (const tile of tiles) {
    tile.addEventListener('click', () => select(tile));
    tile.addEventListener('pointerenter', () => {
      if (finePointer()) select(tile);
    });
  }

  for (const f of filters) {
    f.addEventListener('click', () => {
      const fam = f.dataset.family;
      for (const other of filters) other.setAttribute('aria-pressed', String(other === f));
      for (const t of tiles) t.classList.toggle('is-dim', fam !== 'all' && t.dataset.family !== fam);
      const first = tiles.find((t) => fam === 'all' || t.dataset.family === fam);
      if (first && fam !== 'all') select(first);
    });
  }
}

export function initDeck() {
  const deck = document.querySelector<HTMLElement>('[data-deck]');
  const panels = [...document.querySelectorAll<HTMLElement>('[data-panel]')];
  if (!deck || panels.length === 0) return;
  let hoverTimer = 0;

  function open(panel: HTMLElement) {
    for (const p of panels) {
      const isOpen = p === panel;
      p.classList.toggle('is-open', isOpen);
      p.querySelector('[data-panel-toggle]')?.setAttribute('aria-expanded', String(isOpen));
    }
  }

  const desktop = () => matchMedia('(min-width: 961px)').matches;

  open(panels[0]!);
  deck.classList.add('is-ready');

  for (const panel of panels) {
    const toggle = panel.querySelector<HTMLButtonElement>('[data-panel-toggle]')!;
    toggle.addEventListener('click', () => {
      if (!desktop() && panel.classList.contains('is-open')) {
        panel.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        return;
      }
      open(panel);
    });
    panel.addEventListener('pointerenter', () => {
      if (!finePointer() || !desktop() || panel.classList.contains('is-open')) return;
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(() => open(panel), 220);
    });
    panel.addEventListener('pointerleave', () => window.clearTimeout(hoverTimer));
  }
}

export function initBadge() {
  const badge = document.querySelector<HTMLElement>('[data-badge]');
  if (!badge) return;
  const hang = badge.querySelector<HTMLElement>('[data-badge-hang]')!;
  const card = badge.querySelector<HTMLElement>('[data-badge-card]')!;
  const front = badge.querySelector<HTMLElement>('[data-badge-front]')!;
  const back = badge.querySelector<HTMLElement>('[data-badge-back]')!;
  const flip = badge.querySelector<HTMLButtonElement>('[data-badge-flip]')!;
  const flipLabel = flip.querySelector<HTMLElement>('[data-badge-flip-label]')!;

  flip.hidden = false;
  badge.classList.add('is-ready');
  back.setAttribute('aria-hidden', 'true');
  back.inert = true;

  function setFlipped(flipped: boolean) {
    card.classList.toggle('is-flipped', flipped);
    flip.setAttribute('aria-pressed', String(flipped));
    flipLabel.textContent = (flipped ? flip.dataset.labelBack : flip.dataset.labelFront) ?? '';
    front.setAttribute('aria-hidden', String(flipped));
    back.setAttribute('aria-hidden', String(!flipped));
    front.inert = flipped;
    back.inert = !flipped;
  }

  flip.addEventListener('click', () => setFlipped(!card.classList.contains('is-flipped')));
  card.addEventListener('click', () => setFlipped(!card.classList.contains('is-flipped')));

  if (reducedMotion()) return;

  // Damped spring: the badge swings with horizontal pointer velocity.
  let angle = 0;
  let velocity = 0;
  let lastX: number | null = null;
  let running = false;
  let visible = false;

  const io = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
  });
  io.observe(badge);

  function step() {
    velocity += -0.06 * angle;
    velocity *= 0.9;
    angle += velocity;
    hang.style.rotate = `${angle.toFixed(3)}deg`;
    if (Math.abs(angle) > 0.01 || Math.abs(velocity) > 0.01) requestAnimationFrame(step);
    else {
      running = false;
      hang.style.rotate = '';
    }
  }

  window.addEventListener(
    'pointermove',
    (e) => {
      if (!visible || e.pointerType !== 'mouse') return;
      if (lastX !== null) {
        const dx = e.clientX - lastX;
        velocity += Math.max(-1.2, Math.min(1.2, dx * 0.035));
        if (!running) {
          running = true;
          requestAnimationFrame(step);
        }
      }
      lastX = e.clientX;
    },
    { passive: true },
  );

  badge.addEventListener('badge:drop', () => {
    velocity += 3;
    if (!running) {
      running = true;
      requestAnimationFrame(step);
    }
  });
}

export function initCopyEmail() {
  const button = document.querySelector<HTMLButtonElement>('[data-copy-email]');
  const status = document.querySelector<HTMLElement>('[data-copy-status]');
  if (!button || !navigator.clipboard) return;
  const label = button.querySelector<HTMLElement>('[data-copy-label]')!;
  const original = label.textContent ?? '';
  button.hidden = false;
  let timer = 0;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copyEmail ?? '');
      label.textContent = button.dataset.copiedLabel ?? '';
      if (status) status.textContent = button.dataset.copiedLabel ?? '';
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        label.textContent = original;
        if (status) status.textContent = '';
      }, 2400);
    } catch {
      /* clipboard denied: the mailto link remains available */
    }
  });
}

export function initMagnetic() {
  if (reducedMotion() || !finePointer()) return;
  for (const el of document.querySelectorAll<HTMLElement>('[data-magnetic]')) {
    const icon = el.querySelector<HTMLElement>('.contact__email-icon');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
      if (icon) icon.style.translate = `${x * 10}px ${y * 10}px`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
      if (icon) icon.style.translate = '';
    });
    el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
  }
}

export function initAvatarGaze() {
  if (reducedMotion() || !finePointer()) return;
  const face = document.querySelector<HTMLElement>('[data-avatar-face]');
  if (!face) return;
  let raf = 0;
  window.addEventListener(
    'pointermove',
    (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        face.style.transform = `rotateY(${(x * 9).toFixed(2)}deg) rotateX(${(-y * 3).toFixed(2)}deg)`;
      });
    },
    { passive: true },
  );
}
