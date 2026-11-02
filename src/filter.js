// ジャンル絞り込みチップ（単一選択）
import { GENRES, icon } from './genres.js';

export function createFilter(el, { onChange }) {
  const options = [{ id: 'all', label: 'すべて' }, ...GENRES];
  el.innerHTML = options.map((o) => `
    <button type="button" class="chip" data-genre="${o.id}" aria-pressed="${o.id === 'all'}"${o.color ? ` style="--chip:${o.color};--chip-fg:${o.fg}"` : ''}>
      ${icon(o.id)}<span>${o.label}</span>
    </button>`).join('');

  el.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip || chip.getAttribute('aria-pressed') === 'true') return;
    el.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    onChange(chip.dataset.genre);
  });
}
