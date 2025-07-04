// modules/interactive-map.js

const inactiveColor = '#DBDBDB';
const svgUrl = '../../assets/img/interactive-map.svg';

export function setupInteractiveMap() {
  const interactiveMapContainer = document.getElementById(
    'interactive-map-container'
  );

  fetch(svgUrl)
    .then((res) => res.text())
    .then((svgText) => {
      interactiveMapContainer.innerHTML = svgText;
      initializeInteractiveMap(interactiveMapContainer);
    })
    .catch((err) => {
      console.error('Error al cargar el mapa SVG:', err);
      interactiveMapContainer.innerHTML = '<p>Error loading SVG map.</p>';
    });

  document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
      .inactive * {
        fill: ${inactiveColor} !important;
        transition: fill 0.3s ease;
      }
      g[class*='-tower'] * {
        transition: fill 0.3s ease;
      }
    </style>`
  );
}

function initializeInteractiveMap(container) {
  const svgElement = container.querySelector('svg');
  const modelGroups = svgElement.querySelectorAll('[class*="-tower"]');

  function resetColors() {
    modelGroups.forEach((group) => {
      group.classList.remove('inactive');
    });
  }

  function highlightGroupById(groupId) {
    modelGroups.forEach((group) => {
      if (group.id === groupId) {
        group.classList.remove('inactive');
      } else {
        group.classList.add('inactive');
      }
    });
  }

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset Map';
  resetBtn.classList.add('reset-map-btn');
  resetBtn.setAttribute('data-i18n', 'map.reset');
  resetBtn.addEventListener('click', () => {
    resetColors();
    document
      .querySelectorAll('.tower, .model, .submodel')
      .forEach((el) => el.classList.remove('is-open'));
  });
  document.querySelector('.map-selector').appendChild(resetBtn);

  const accordion = document.querySelector('.map-selector');

  accordion.querySelectorAll('.tower-header').forEach((header) => {
    header.addEventListener('click', () => {
      const tower = header.parentElement;
      document
        .querySelectorAll('.tower')
        .forEach((t) => t.classList.toggle('is-open', t === tower));
    });
  });

  accordion.querySelectorAll('.model-header').forEach((header) => {
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      const model = header.parentElement;
      const tower = model.closest('.tower');
      tower.classList.add('is-open');

      tower.querySelectorAll('.model').forEach((m) => {
        if (m !== model) m.classList.remove('is-open');
      });

      model.classList.toggle('is-open');
      const groupId = header.dataset.target;
      if (groupId) {
        highlightGroupById(groupId);
      }
    });
  });

  accordion.querySelectorAll('.submodel-header').forEach((header) => {
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      const submodel = header.parentElement;
      const groupId = header.dataset.target;

      const model = submodel.closest('.model');
      model.classList.add('is-open');
      const tower = submodel.closest('.tower');
      tower.classList.add('is-open');

      model.querySelectorAll('.submodel').forEach((s) => {
        if (s !== submodel) s.classList.remove('is-open');
      });

      submodel.classList.toggle('is-open');
      highlightGroupById(groupId);
    });
  });
}
