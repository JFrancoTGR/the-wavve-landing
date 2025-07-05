// === google-maps-lazy.js ===

const mapStyles = [
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.icon',
    stylers: [
      {
        color: '#adea2a',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ea3229',
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f9efe4',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#849d8d',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
      {
        color: '#765c7a',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#849d8d',
      },
    ],
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#849d8d',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#d6d6d6',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#023854',
      },
    ],
  },
];

function initSelector() {
  const toggles = document.querySelectorAll('.js-category-open');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const submenu = toggle.nextElementSibling;

      if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
        toggle.classList.remove('active');
      } else {
        document
          .querySelectorAll('.category-selector__hide')
          .forEach((el) => (el.style.display = 'none'));
        document
          .querySelectorAll('.js-category-open')
          .forEach((el) => el.classList.remove('active'));
        submenu.style.display = 'block';
        toggle.classList.add('active');
      }
    });
  });

  document.querySelector('.js-selector-open')?.addEventListener('click', () => {
    document.querySelector('.category-selector')?.classList.add('active');
  });

  document
    .querySelector('.js-selector-close')
    ?.addEventListener('click', () => {
      document.querySelector('.category-selector')?.classList.remove('active');
    });
}

function initMap() {
  const markerIcons = {
    urban: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#5a8a8d',
      fillOpacity: 1,
      strokeWeight: 5,
      strokeColor: '#fff',
      scale: 15,
    },
    coastal: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#533c57',
      fillOpacity: 1,
      strokeWeight: 5,
      strokeColor: '#fff',
      scale: 15,
    },
    tourism: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#023854',
      fillOpacity: 1,
      strokeWeight: 5,
      strokeColor: '#fff',
      scale: 15,
    },
    index: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#56c7c1',
      fillOpacity: 1,
      strokeWeight: 5,
      strokeColor: '#fff',
      scale: 15,
    },
  };

  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 32.450628, lng: -117.110264 },
    zoom: 10,
    mapTypeControl: false,
    styles: mapStyles,
  });

  const locations = [
    // TheWave residences
    {
      idName: 'the-wavve',
      name: 'The Wavve',
      lat: 32.450628,
      lng: -117.110264,
      category: 'index',
    },

    // Urban Areas & Connectivity
    {
      idName: 'downtown-tijuana',
      name: 'Downtown Tijuana',
      lat: 32.5320936,
      lng: -117.0352732,
      category: 'urban',
    },
    {
      idName: 'san-ysidro-international-bridge',
      name: 'San Ysidro International Bridge',
      lat: 32.5439,
      lng: -117.0331,
      category: 'urban',
    },
    {
      idName: 'san-diego-downtown',
      name: 'San Diego Downtown',
      lat: 32.7157412,
      lng: -117.1610752,
      category: 'urban',
    },
    {
      idName: 'tijuana-airport',
      name: 'Tijuana Airport',
      lat: 32.5408452,
      lng: -116.9690532,
      category: 'urban',
    },

    // Coastal Towns & Beaches
    {
      idName: 'playas-de-tijuana',
      name: 'Playas de Tijuana',
      lat: 32.51977,
      lng: -117.116187,
      category: 'coastal',
    },
    {
      idName: 'rosarito',
      name: 'Rosarito',
      lat: 32.3661011,
      lng: -117.0617553,
      category: 'coastal',
    },
    {
      idName: 'ensenada',
      name: 'Ensenada',
      lat: 31.8557021,
      lng: -116.6057392,
      category: 'coastal',
    },
    {
      idName: 'puerto-nuevo',
      name: 'Puerto Nuevo',
      lat: 32.242901,
      lng: -116.9340954,
      category: 'coastal',
    },

    // Tourism & Experiences
    {
      idName: 'valle-de-guadalupe',
      name: 'Valle de Guadalupe',
      lat: 32.095412,
      lng: -116.5729,
      category: 'tourism',
    },
    {
      idName: 'eos-beach-club',
      name: 'Eos Beach Club',
      lat: 32.4023493,
      lng: -117.091113,
      category: 'tourism',
    },
    {
      idName: 'mi-casa-supper-club',
      name: 'Mi Casa Supper Club',
      lat: 32.422459,
      lng: -117.0973274,
      category: 'tourism',
    },
    {
      idName: 'casa-nagu',
      name: 'Casa Nagu',
      lat: 32.4170437,
      lng: -117.0447798,
      category: 'tourism',
    },
    {
      idName: 'encanto-restaurante',
      name: 'Encanto Restaurante',
      lat: 32.1796868,
      lng: -116.9095932,
      category: 'tourism',
    },
    {
      idName: 'los-portales-de-garcia',
      name: 'Los Portales de García',
      lat: 32.1795126,
      lng: -116.9092851,
      category: 'tourism',
    },
  ];

  const markers = {};
locations.forEach((loc) => {
  const isWavve = loc.idName === 'the-wavve';

  const marker = new google.maps.Marker({
    position: { lat: loc.lat, lng: loc.lng },
    map,
    title: loc.name,
    icon: isWavve
      ? {
          url: 'assets/ico/ico-pin-map.svg', // Ruta a tu SVG
          scaledSize: new google.maps.Size(35, 35),   // Tamaño del ícono
          anchor: new google.maps.Point(24, 48),      // Ancla al centro base
        }
      : markerIcons[loc.category] || null,
  });

  markers[loc.idName] = marker;
});


  document.querySelector('.js-all')?.addEventListener('click', () => {
    document
      .querySelectorAll('[data-zone]')
      .forEach((el) => el.classList.remove('active'));
    map.setZoom(10);
    map.panTo({ lat: 32.450628, lng: -117.110264 });
  });

  document.querySelectorAll('[data-zone]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-zone');
      document
        .querySelectorAll('[data-zone]')
        .forEach((el) => el.classList.remove('active'));
      btn.classList.add('active');
      if (markers[id]) {
        map.panTo(markers[id].getPosition());
        map.setZoom(15);
      }
    });
  });

  initSelector();
}

const observer = new IntersectionObserver(
  (entries, obs) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/google-maps.css';
    document.head.appendChild(link);
    if (entries[0].isIntersecting) {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&callback=initMap&loading=async';
      script.async = true;
      window.initMap = initMap;
      document.head.appendChild(script);
      obs.disconnect();
    }
  },
  { threshold: 0.01 }
);

const mapWrapper = document.querySelector('#location');
if (mapWrapper) {
  observer.observe(mapWrapper);
}
