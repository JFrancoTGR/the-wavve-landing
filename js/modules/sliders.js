// modules/sliders.js

// === UTILS ===
function cloneSlides(slides, container, count = 2) {
  for (let i = 0; i < count; i++) {
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      clone.dataset.clone = 'true';
      container.appendChild(clone);
    });
  }
}

export { cloneSlides };

// === EXPORTACIÓN DE FUNCIONES COMPLETAS ===

export function setupSlider4() {
  const track = document.getElementById('slider4');
  const slides = Array.from(track.children);
  const width = slides[0].offsetWidth;
  const gap = 20;
  cloneSlides(slides, track, 2);
  const totalWidth = (width + gap) * track.children.length;
  let pos = 0;
  const speed = 1.1;
  let raf;

  function animate() {
    pos -= speed;
    if (Math.abs(pos) >= totalWidth / 3) pos = 0;
    track.style.transform = `translateX(${pos}px)`;
    raf = requestAnimationFrame(animate);
  }

  const container = document.querySelector('.custom-slider-4');
  container.addEventListener('mouseenter', () => cancelAnimationFrame(raf));
  container.addEventListener('mouseleave', animate);
  animate();
}
