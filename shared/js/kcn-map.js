/* ============================================
   KCN sub-page — zoomed location map
   Reads data-lat / data-lng / data-name from
   <div class="kcn-map"> and drops a single pin.
   ============================================ */

(function () {
  'use strict';

  const el = document.querySelector('.kcn-map');
  if (!el || typeof L === 'undefined') return;

  const lat = parseFloat(el.dataset.lat);
  const lng = parseFloat(el.dataset.lng);
  const name = el.dataset.name || 'Industrial Park';
  const province = el.dataset.province || '';

  if (Number.isNaN(lat) || Number.isNaN(lng)) return;

  const map = L.map(el, {
    center: [lat, lng],
    zoom: 11,
    scrollWheelZoom: false,
    zoomControl: true,
  });

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {
      attribution: '© OpenStreetMap, © CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }
  ).addTo(map);

  const pin = L.divIcon({
    className: 'asp-pin-wrapper',
    html: `<div class="asp-pin"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const marker = L.marker([lat, lng], { icon: pin }).addTo(map);
  marker.bindPopup(
    `<div class="popup-title">${name}</div>
     <div class="popup-meta">${province}</div>`,
    { closeButton: false, offset: [0, -6] }
  ).openPopup();
})();
