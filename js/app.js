// === CRÍTICO: Header y traducción ===
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

  let scriptsReady = 0;

  function checkAndInit() {
    if (scriptsReady === 2) {
      console.log(
        '[LazyLoad] Swiper & GLightbox scripts ready, initializing...'
      );
      import('./modules/swiper-sliders.js')
        .then(({ initSlidersAndLightbox }) => initSlidersAndLightbox())
        .catch(console.error);
    }
  }

  const sliderSections = document.querySelectorAll('.swiper');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const swiperStyle = document.createElement('link');
          swiperStyle.rel = 'stylesheet';
          swiperStyle.href =
            'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
          swiperStyle.onload = () => {
            const swiperScript = document.createElement('script');
            swiperScript.src =
              'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
            swiperScript.async = true;
            swiperScript.onload = () => {
              scriptsReady++;
              checkAndInit();
            };
            document.head.appendChild(swiperScript);
          };
          document.head.appendChild(swiperStyle);

          const glightboxStyle = document.createElement('link');
          glightboxStyle.rel = 'stylesheet';
          glightboxStyle.href =
            'https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css';
          glightboxStyle.onload = () => {
            const glightboxScript = document.createElement('script');
            glightboxScript.src =
              'https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js';
            glightboxScript.async = true;
            glightboxScript.onload = () => {
              scriptsReady++;
              checkAndInit();
            };
            document.head.appendChild(glightboxScript);
          };
          document.head.appendChild(glightboxStyle);
          observer.disconnect();
        }
      });
    },
    { rootMargin: '50px' }
  );

  sliderSections.forEach((section) => observer.observe(section));

  // Sliders y lightbox
  import('./modules/sliders.js')
    .then(({ setupSlider4 }) => {
      setupSlider4();
    })
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
