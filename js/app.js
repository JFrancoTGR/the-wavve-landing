// === CRÍTICO: Header y traducción ===

const hero = document.querySelector('.hero-bg');

if (hero) {
  console.log('[DEBUG] Hero element found');

  function swapToHighRes() {
    const highRes = hero.dataset.highres;
    console.log('[DEBUG] Will load high-res:', highRes);

    const imgHigh = new Image();
    imgHigh.src = highRes;
    imgHigh.decoding = 'async';

    imgHigh.onload = function () {
      console.log('[DEBUG] High-res loaded, swapping...');
      hero.src = highRes;
      hero.classList.add('loaded');
    };

    imgHigh.onerror = function () {
      console.error('[ERROR] High-res failed to load');
    };
  }

  if (hero.complete) {
    console.log('[DEBUG] Placeholder already complete');
    swapToHighRes();
  } else {
    hero.addEventListener('load', function () {
      console.log('[DEBUG] Placeholder loaded');
      swapToHighRes();
    });
  }
}

import {
  handleHeaderOnScroll,
  setupMobileHeaderMenu,
} from './modules/header.js';

import {
  setupLanguageSwitcher,
  applyTranslations,
  translateElement,
  currentLanguage,
} from './modules/i18n.js';

window.addEventListener('scroll', handleHeaderOnScroll);
setupMobileHeaderMenu();

setupLanguageSwitcher();
applyTranslations(currentLanguage);

// === DIFERIR: resto al terminar de cargar ===
window.addEventListener('load', () => {
  // Mapa de experiencias
  import('./modules/experiences-map.js')
    .then(({ setupExperiencesMap }) => setupExperiencesMap())
    .catch(console.error);

  // Swipers

  import('./modules/swiper-sliders.js')
    .then(({ initSlidersAndLightbox }) => initSlidersAndLightbox())
    .catch(console.error);

  // Video modal
  import('./modules/video-modal.js')
    .then(({ setupVideoModal }) => setupVideoModal())
    .catch(console.error);

  // FAQs (ahora depende del módulo de traducción ya cargado)
  import('./modules/faqs.js')
    .then(({ setupFaqs }) =>
      setupFaqs({
        translateElement,
        applyTranslations,
        currentLanguage,
      })
    )
    .catch(console.error);

  // Mapa interactivo SVG
  import('./modules/interactive-map.js')
    .then(({ setupInteractiveMap }) => setupInteractiveMap())
    .catch(console.error);
});
