// 背景地図。OpenFreeMap（無料・キー不要）のベクター地図を、ハチドリ電力の配色と日本語表記に塗り替えて使う
// 読み込めないときは OpenStreetMap の標準タイルに切り替える

const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron';

// レイヤーID → 塗り替える色
const COLORS = {
  background: { 'background-color': '#F7F6EF' },
  landuse_residential: { 'fill-color': '#F1F0E8' },
  park: { 'fill-color': '#E3EFD9' },
  landcover_wood: { 'fill-color': '#DCEBD2' },
  water: { 'fill-color': '#BFE3DE' },
  waterway: { 'line-color': '#A9D8D1' },
  building: { 'fill-color': '#ECEAE1', 'fill-outline-color': '#E0DDD2' },
  boundary_2: { 'line-color': '#9DBDB8' },
  boundary_3: { 'line-color': '#B9CFCB' },
  boundary_disputed: { 'line-color': '#B9CFCB' },
  water_name_point_label: { 'text-color': '#2D7F78' },
  water_name_line_label: { 'text-color': '#2D7F78' },
  waterway_line_label: { 'text-color': '#4E9C95' },
};

// 地名は日本語を優先し、なければ現地の表記
const NAME_JA = ['coalesce', ['get', 'name:ja'], ['get', 'name']];

function restyle(style) {
  style.layers = style.layers
    // 道路番号の看板は情報が多すぎるので出さない
    .filter((layer) => !layer.id.includes('shield'))
    .map((layer) => {
      if (COLORS[layer.id]) layer.paint = { ...layer.paint, ...COLORS[layer.id] };
      if (layer.type === 'symbol' && layer.layout?.['text-field'] && !layer.id.includes('highway')) {
        layer.layout['text-field'] = NAME_JA;
        if (layer.id.startsWith('label_country') || layer.id === 'label_state') {
          // 国名・都道府県名は主張しすぎないよう薄く
          layer.paint = { ...layer.paint, 'text-color': '#7C8A88', 'text-halo-color': '#F7F6EF', 'text-halo-width': 1.2 };
        } else if (!layer.id.startsWith('water')) {
          layer.paint = { ...layer.paint, 'text-color': '#3A4544', 'text-halo-color': '#FFFFFF', 'text-halo-width': 1.4 };
        }
      }
      return layer;
    });
  return style;
}

function addOsmTiles(map) {
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

export async function addBasemap(map) {
  try {
    if (!L.maplibreGL || !window.maplibregl) throw new Error('maplibre unavailable');
    const res = await fetch(STYLE_URL);
    if (!res.ok) throw new Error(`style ${res.status}`);
    L.maplibreGL({
      style: restyle(await res.json()),
      attribution: '<a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a> &copy; <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
    }).addTo(map);
  } catch (e) {
    console.warn('[basemap] fallback to OSM tiles:', e);
    addOsmTiles(map);
  }
}
