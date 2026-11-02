// 計測。すべてのイベントは track() を通す
// v0: debug 時は console に出す。config.js に GA4 測定IDがあれば gtag にも送る
import { storage } from './storage.js';

let config = { debug: true, ga4MeasurementId: '' };

export function initTracking(cfg) {
  config = cfg;
  if (cfg.ga4MeasurementId) loadGtag(cfg.ga4MeasurementId);
}

export function track(eventName, params = {}) {
  if (config.debug) console.log('[track]', eventName, params);
  if (config.ga4MeasurementId && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

// page_view を送る。再訪判定は端末内に保存した初回訪問日時で行う（個人は特定しない）
export function trackPageView() {
  const now = Date.now();
  const firstVisitAt = storage.get('firstVisitAt', null);
  if (!firstVisitAt) storage.set('firstVisitAt', now);

  const ref = new URLSearchParams(location.search).get('ref') || '(none)';
  track('page_view', {
    ref,
    visit_type: firstVisitAt ? 'return' : 'first',
    days_since_first_visit: firstVisitAt ? Math.floor((now - firstVisitAt) / 86400000) : 0,
  });
}

function loadGtag(id) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // page_view は ref・再訪判定を付けて自前で送るので、自動送信は止める
  window.gtag('config', id, { send_page_view: false });
}
