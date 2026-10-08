import { initVoice } from './voice';
import { initNav, initSkills, initDeck, initBadge, initCopyEmail, initMagnetic, initAvatarGaze } from './interactions';

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

// Interactions first: they must work even if the motion module fails.
for (const init of [initNav, initSkills, initDeck, initBadge, initCopyEmail, initMagnetic, initAvatarGaze, initVoice]) {
  try {
    init();
  } catch (err) {
    console.error(err);
  }
}

import('./motion')
  .then(({ initMotion }) => {
    initMotion();
    window.__motionReady = true;
  })
  .catch(() => document.documentElement.classList.add('reveal-all'));
