// modules/google-map.js

export function initSelector() {
  $('.js-category-open').on('click', function () {
    const e = $(this);
    const a = e.next('.category-selector__hide');
    a.is(':visible')
      ? (a.slideUp(), e.removeClass('active'))
      : ($('.category-selector__hide').slideUp(),
        $('.js-category-open').removeClass('active'),
        a.slideDown(),
        e.addClass('active'));
  });

  $('.js-selector-open').on('click', function () {
    $('.category-selector').addClass('active');
  });

  $('.js-selector-close').on('click', function () {
    $('.category-selector').removeClass('active');
  });
}

export function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 32.4526064, lng: -117.1101493 },
    zoom: 10,
    styles: [
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.icon',
        stylers: [{ color: '#adea2a' }],
      },
      {
        featureType: 'administrative.neighborhood',
        elementType: 'geometry.fill',
        stylers: [{ color: '#ea3229' }, { visibility: 'off' }],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{ color: '#f9efe4' }],
      },
      {
        featureType: 'landscape.man_made',
        elementType: 'geometry.fill',
        stylers: [{ visibility: 'simplified' }],
      },
      {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [{ color: '#849d8d' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [{ color: '#765c7a' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{ color: '#849d8d' }],
      },
      {
        featureType: 'poi.sports_complex',
        elementType: 'geometry.fill',
        stylers: [{ color: '#849d8d' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [{ color: '#d6d6d6' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#000000' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.stroke',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road.local',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{ color: '#023854' }],
      },
    ],
  });

  const places = [
    {
      idName: 'the-wavve',
      name: 'The Wavve',
      lat: 32.450628,
      lng: -117.110264,
      category: 'index',
    },
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

  const categoryStyles = {
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

  const infowindow = new google.maps.InfoWindow();
  const markers = places.map((place) => {
    const marker = new google.maps.Marker({
      position: { lat: place.lat, lng: place.lng },
      map,
      title: place.name,
      category: place.category,
      id: place.idName,
      icon: categoryStyles[place.category],
    });

    marker.addListener('mouseover', () => {
      infowindow.setContent(`<span>${place.name}</span>`);
      infowindow.open(map, marker);
    });
    marker.addListener('mouseout', () => {
      infowindow.close();
    });
    return marker;
  });

  $('[data-zone]').on('click', function () {
    const id = $(this).data('zone');
    const place = places.find((p) => p.idName === id);
    if (place) {
      map.setCenter({ lat: place.lat, lng: place.lng });
      map.setZoom(15);
    }
  });

  $('.js-all').on('click', function () {
    markers.forEach((marker) => {
      marker.setMap(map);
    });
    map.setCenter({ lat: 32.4526064, lng: -117.1101493 });
    map.setZoom(13);
  });
}
