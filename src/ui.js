// トースト・初回モーダル・ご意見ボタン
import { storage } from './storage.js';

let toastTimer = null;

export function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast.classList.contains('is-visible') && toast.textContent === message) {
    clearTimeout(toastTimer);
  } else {
    toast.textContent = message;
    toast.classList.add('is-visible');
  }
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3600);
}

// 初回だけ表示。閉じたら記録して再表示しない
export function setupOnboarding() {
  if (storage.get('onboarded', false)) return;
  const modal = document.getElementById('onboarding');
  const button = modal.querySelector('[data-close]');
  modal.hidden = false;
  button.focus();
  button.addEventListener('click', () => {
    storage.set('onboarded', true);
    modal.hidden = true;
  }, { once: true });
}

// URL が未設定（または http(s) 以外）のときはボタンを出さない
export function setupFeedback(url, track) {
  const link = document.getElementById('feedback');
  if (!/^https?:\/\//.test(url || '')) return;
  link.href = url;
  link.hidden = false;
  link.addEventListener('click', () => track('feedback_click'));
}
