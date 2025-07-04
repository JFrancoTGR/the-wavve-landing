// modules/experiences-map.js

const mapContainer = document.getElementById('map-container');
const zoomScale = 1.75;

function zoomTo(xPercent, yPercent) {
  const offsetX = 50 - xPercent;
  const offsetY = 50 - yPercent;
  mapContainer.style.transform = `scale(${zoomScale}) translate(${offsetX}%, ${offsetY}%)`;
}

export function setupExperiencesMap() {
  document.querySelectorAll('.map-links-grid a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const x = parseFloat(link.dataset.x);
      const y = parseFloat(link.dataset.y);

      if (!isNaN(x) && !isNaN(y)) {
        document
          .querySelectorAll('.map-link-underline')
          .forEach((el) => el.classList.remove('active'));

        const label = link.querySelector('.map-link-underline');
        if (label) label.classList.add('active');

        zoomTo(x, y);
      }
    });
  });

  const resetBtn = document.getElementById('reset-map');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      mapContainer.style.transform = 'scale(1) translate(0, 0)';
      document
        .querySelectorAll('.map-link-underline')
        .forEach((el) => el.classList.remove('active'));
    });
  }
}
