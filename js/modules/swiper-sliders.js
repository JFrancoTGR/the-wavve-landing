// swiper-sliders.js

export function initSlidersAndLightbox() {
  const experiencesSwiper = new Swiper('.experiences-swiper', {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    grabCursor: true,
    pagination: {
      el: '.experiences-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.experiences-next',
      prevEl: '.experiences-prev',
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  const residencesSwiper = new Swiper('.residences-swiper', {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    grabCursor: true,
    pagination: {
      el: '.residences-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.residences-next',
      prevEl: '.residences-prev',
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  const viewsSwiper = new Swiper('.views-swiper', {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    pagination: {
      el: '.views-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.views-next',
      prevEl: '.views-prev',
    },
  });

  const caption3 = document.getElementById('caption3');

  // función para actualizar
  function updateCaption() {
    const activeSlide = viewsSwiper.slides[viewsSwiper.activeIndex];
    if (activeSlide && activeSlide.dataset.title) {
      caption3.textContent = activeSlide.dataset.title;
    } else {
      caption3.textContent = ''; // fallback
    }
  }

  // inicializar caption al cargar
  viewsSwiper.on('init', updateCaption);

  // actualizar caption en cambios
  viewsSwiper.on('slideChange', updateCaption);

  // forzar init para primer caption
  viewsSwiper.init();

  // Experiences
  const experiencesLightbox = GLightbox({
    selector: '[data-glightbox="gallery-experiences"]',
  });

  // Residences
  const residencesLightbox = GLightbox({
    selector: '[data-glightbox="gallery-residences"]',
  });

  // Views
  const viewsLightbox = GLightbox({
    selector: '[data-glightbox="gallery-views"]',
  });
}
