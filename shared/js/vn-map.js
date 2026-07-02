/* ============================================
   Vietnam map with 4 KCN project pins (Leaflet)
   ============================================ */

(function () {
  'use strict';

  const mapEl = document.getElementById('vn-map');
  if (!mapEl || typeof L === 'undefined') return;

  // 4 KCN project locations (approximate coordinates)
  const PROJECTS = [
    {
      id: 'quang-yen',
      name: 'Quang Yen Industrial Park',
      province: 'Quang Ninh',
      area: '1,192 ha',
      status: 'Master planning',
      lat: 20.943,
      lng: 106.831,
    },
    {
      id: 'diem-thuy',
      name: 'Diem Thuy Industrial Park',
      province: 'Thai Nguyen',
      area: '350 ha',
      status: 'Operational',
      lat: 21.448,
      lng: 105.965,
    },
    {
      id: 'hiep-cuong',
      name: 'Hiep Cuong Industrial Park',
      province: 'Hung Yen',
      area: '410 ha',
      status: 'Under construction',
      lat: 20.832,
      lng: 106.157,
    },
    {
      id: 'canh-thuy',
      name: 'Canh Thuy Industrial Park',
      province: 'Bac Ninh',
      area: '280 ha',
      status: 'Master planning',
      lat: 21.218,
      lng: 106.197,
    },
  ];

  // Bound to Northern Vietnam
  const map = L.map(mapEl, {
    center: [21.0, 106.0],
    zoom: 7,
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: true,
  });

  // CartoDB light + monochrome — keeps editorial mood
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
    {
      attribution: '© OpenStreetMap, © CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }
  ).addTo(map);

  // Add custom label layer on top
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
    {
      attribution: '',
      subdomains: 'abcd',
      maxZoom: 19,
      pane: 'overlayPane',
    }
  ).addTo(map);

  PROJECTS.forEach((p, i) => {
    const pin = L.divIcon({
      className: 'asp-pin-wrapper',
      html: `<div class="asp-pin" data-project="${p.id}" title="${p.name}"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    const marker = L.marker([p.lat, p.lng], { icon: pin }).addTo(map);
    marker.bindPopup(
      `<div class="popup-title">${p.name}</div>
       <div class="popup-meta">${p.province} · ${p.area} · ${p.status}</div>`,
      { closeButton: false, offset: [0, -6] }
    );

    marker.on('mouseover', function () {
      this.openPopup();
    });
  });

  // Sync hover state with project list rows
  document.querySelectorAll('.project-row').forEach((row, i) => {
    const project = PROJECTS[i];
    if (!project) return;
    row.addEventListener('mouseenter', () => {
      map.setView([project.lat, project.lng], 8, { animate: true });
    });
  });

  // Reset on map mouseleave
  mapEl.addEventListener('mouseleave', () => {
    map.setView([21.0, 106.0], 7, { animate: true });
  });
})();
