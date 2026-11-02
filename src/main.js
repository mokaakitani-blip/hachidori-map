// 初期化
import config from '../config.js';
import { initTracking, track, trackPageView } from './track.js';
import { createMap } from './map.js';
import { createCard } from './card.js';
import { createFilter } from './filter.js';
import { showToast, setupOnboarding, setupFeedback } from './ui.js';

const MESSAGES = {
  empty: 'このあたりには、まだハチドリのお店がないみたいです',
  locateFailed: '現在地が取得できませんでした。地図を動かしてさがしてみてくださいね',
};

async function loadStores() {
  const res = await fetch(config.storesUrl, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`stores.json: ${res.status}`);
  return res.json();
}

async function main() {
  initTracking(config);
  trackPageView();
  setupOnboarding();
  setupFeedback(config.feedbackUrl, track);

  let card;
  const map = createMap(document.getElementById('map'), config, {
    onPinClick(store) {
      track('pin_click', { store_id: store.id });
      map.setActive(store.id);
      card.open(store);
      map.reveal(store);
    },
    onEmptyView: () => showToast(MESSAGES.empty),
  });
  card = createCard({
    sheetEl: document.getElementById('sheet'),
    backdropEl: document.getElementById('sheet-backdrop'),
    track,
    onClose: () => map.setActive(null),
  });

  createFilter(document.getElementById('filter'), {
    onChange(genre) {
      track('filter_select', { genre });
      card.close();
      map.filter(genre);
    },
  });

  const locateBtn = document.getElementById('locate');
  locateBtn.addEventListener('click', async () => {
    locateBtn.disabled = true;
    const result = await map.locate();
    locateBtn.disabled = false;
    track('locate_click', { granted: result === 'ok', result });
    if (result !== 'ok') showToast(MESSAGES.locateFailed);
  });

  try {
    map.setStores(await loadStores());
  } catch (err) {
    console.error(err);
    document.getElementById('map-error').hidden = false;
  }
}

main();
