// 地図・ピン（Leaflet。背景地図は basemap.js）
import { genreOf, icon } from './genres.js';
import { addBasemap } from './basemap.js';

const WIDE = '(min-width: 768px)';

export function createMap(el, config, { onPinClick, onEmptyView }) {
  const map = L.map(el, {
    zoomControl: false,
    zoomSnap: 0.5,
    minZoom: 4,
    maxZoom: 18,
  }).setView(config.initialView.center, config.initialView.zoom);

  L.control.zoom({ position: 'topleft', zoomInTitle: '拡大', zoomOutTitle: '縮小' }).addTo(map);
  addBasemap(map);

  // 数字でまとめず、どの縮尺でもお店ごとにピンを出す
  const pins = L.layerGroup().addTo(map);
  const showPins = (list) => list.forEach((e) => pins.addLayer(e.marker));

  let entries = [];
  let currentGenre = 'all';
  let activeId = null;
  let meMarker = null;

  const visibleEntries = () => entries.filter((e) => currentGenre === 'all' || e.store.genre === currentGenre);

  function countInView() {
    const bounds = map.getBounds();
    return visibleEntries().filter((e) => bounds.contains(e.marker.getLatLng())).length;
  }

  function checkEmpty() {
    if (entries.length && countInView() === 0) onEmptyView();
  }
  map.on('moveend', checkEmpty);

  function createMarker(store) {
    const genre = genreOf(store.genre);
    const marker = L.marker([store.lat, store.lng], {
      icon: L.divIcon({
        className: 'hd-marker',
        html: `<span class="pin" style="--ring:${genre.color};--ring-fg:${genre.fg};--icon-ink:${genre.fg}">${icon(genre.id)}</span>`,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      }),
      title: store.name,
      keyboard: true,
      riseOnHover: true,
    });
    marker.on('add', () => {
      const markerEl = marker.getElement();
      markerEl?.setAttribute('aria-label', `${store.name}の詳細を開く`);
      markerEl?.classList.toggle('is-active', store.id === activeId);
    });
    marker.on('click', () => onPinClick(store));
    return { store, marker };
  }

  return {
    setStores(stores) {
      entries = stores.map(createMarker);
      showPins(entries);

      // 初期表示は、画面の大きさに合わせて全店がちょうど収まる縮尺にする
      const bounds = L.latLngBounds(stores.map((s) => [s.lat, s.lng]));
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [36, 36], maxZoom: config.initialView.zoom + 1, animate: false });
      }
    },

    filter(genre) {
      currentGenre = genre;
      pins.clearLayers();
      const matched = visibleEntries();
      // いまの画面に該当店がなければ、該当店が見える範囲まで移動する
      if (matched.length && countInView() === 0) {
        map.fitBounds(L.latLngBounds(matched.map((e) => e.marker.getLatLng())), {
          padding: [48, 48], maxZoom: 10, animate: false,
        });
      }
      showPins(matched);
    },

    setActive(id) {
      activeId = id;
      entries.forEach((e) => e.marker.getElement()?.classList.toggle('is-active', e.store.id === id));
    },

    // カードに隠れないよう、ピンを見える位置まで寄せる
    reveal(store) {
      const point = map.latLngToContainerPoint([store.lat, store.lng]);
      const size = map.getSize();
      if (window.matchMedia(WIDE).matches) {
        const visibleWidth = size.x - 400;
        if (point.x > visibleWidth - 40) map.panBy([point.x - visibleWidth / 2, 0]);
      } else if (point.y > size.y * 0.25) {
        map.panBy([0, point.y - 72]);
      }
    },

    // 現在地へ移動。結果を 'ok' / 'denied' / 'unavailable' / 'timeout' / 'unsupported' で返す
    locate() {
      return new Promise((resolve) => {
        if (!('geolocation' in navigator)) return resolve('unsupported');
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const latlng = [pos.coords.latitude, pos.coords.longitude];
            if (meMarker) {
              meMarker.setLatLng(latlng);
            } else {
              meMarker = L.circleMarker(latlng, {
                radius: 8, color: '#FFFFFF', weight: 3, fillColor: '#2360A7', fillOpacity: 1, interactive: false,
              }).addTo(map);
            }
            map.flyTo(latlng, config.locateZoom, { duration: 0.8 });
            resolve('ok');
          },
          (err) => resolve({ 1: 'denied', 2: 'unavailable', 3: 'timeout' }[err.code] || 'unavailable'),
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
        );
      });
    },
  };
}
