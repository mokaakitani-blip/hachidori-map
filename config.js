// ハチドリさんのお店マップ v0 の設定
// 公開前に差し替えるのはこのファイルだけで済むようにしています。
export default {
  // 「ご意見を送る」の送り先（Googleフォーム等）。空文字のときはボタンを表示しない
  feedbackUrl: '',

  // GA4 の測定ID（例: 'G-XXXXXXXXXX'）。空文字のときは GA4 に送らない
  ga4MeasurementId: '',

  // true のとき track() のイベントを console に出す（開発用）
  debug: true,

  // 初期表示。お店が画面に収まらない場合は、自動で全店が見える縮尺に広げる
  initialView: {
    center: [34.8, 134.5],
    zoom: 5,
  },

  // 「現在地のまわりを見る」で移動したときのズーム
  locateZoom: 12,

  // お店データ。差し替えるときはこのファイルを入れ替える
  storesUrl: './data/stores.json',
};
