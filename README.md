# ハチドリさんのお店マップ v0（モック）

ハチドリ電力を使っているお店を地図で見られるマップの試作版です。
表示しているお店はすべて架空のサンプルデータです。

## 動かし方

ビルド不要の静的サイトです（HTML / CSS / バニラJS の ES Modules）。
`data/stores.json` を fetch するため、ファイルを直接開くのではなく、ローカルサーバー経由で開いてください。

```sh
npx serve .
# または
python -m http.server 8080
```

## 設定（config.js）

| キー | 内容 |
| --- | --- |
| `feedbackUrl` | 「ご意見を送る」の送り先（Googleフォーム等）。空ならボタン非表示 |
| `ga4MeasurementId` | GA4 の測定ID。空なら GA4 に送らない |
| `debug` | `true` のとき計測イベントを console に出す |
| `initialView` | 初期表示の中心座標とズーム（全店が収まらない画面では自動で広げる） |
| `locateZoom` | 「現在地のまわりを見る」で移動したときのズーム |
| `storesUrl` | お店データのパス |

## お店データの差し替え

`data/stores.json` を入れ替えるだけで差し替えられます。スキーマは要件定義書 8章のとおりです。
`isSample: true` のお店にはカードに「サンプル」バッジが付きます。

詳細カード用に、次の項目を任意で追加しています（空・未指定ならその欄は表示しません）。

| キー | 型 | 内容 |
| --- | --- | --- |
| `description` | string | お店の紹介文 |
| `rating` / `reviews` | number | ★評価と件数。`isSample: true` のお店は「サンプルの評価です」と表示 |
| `wantCount` | number | 「◯人が行ってみたい」の人数（v0 はダミー値＋自分が押した分） |
| `tags` | string[] | 特徴タグ（例：Wi-Fiあり） |
| `ecoTags` | string[] | エコの取り組み（ミント色のタグで表示） |
| `story` | string | 「なぜハチドリ電力を選んだのか」の本文。`reason` は見出し下の引用として使う |
| `articles` | `{ kind, source, title, lead, url, thumbnail }[]` | ハチドリ電力のインタビュー記事（`kind: "interview"` のものだけ表示）。写真・リード文（`lead`）付きのカードで出す。`url` が null のものはリンクなしのカードになる |
`photo` を指定する場合は `public/img/` に画像を置き、`"./public/img/xxx.jpg"` のように書いてください。

## 計測イベント

すべて `src/track.js` の `track()` を通ります。

| イベント | タイミング | パラメータ |
| --- | --- | --- |
| `page_view` | ページ表示 | `ref`（URLの `?ref=`）、`visit_type`（first / return）、`days_since_first_visit` |
| `pin_click` | ピンをタップ | `store_id` |
| `card_view` | 詳細カードが開いた | `store_id` |
| `filter_select` | ジャンルを選んだ | `genre` |
| `want_to_go_on` / `want_to_go_off` | 行ってみたい／取り消し | `store_id` |
| `article_click` | 記事を読む | `store_id` |
| `feedback_click` | ご意見を送る | ― |
| `locate_click` | 現在地ボタン | `granted`（true / false）、`result`（ok / denied / unavailable / timeout / unsupported） |

端末内（localStorage）に保存しているのは、初回訪問日時・初回モーダルを閉じたか・行ってみたいを押したお店IDだけです。

## 公開

GitHub Pages / Netlify / Vercel などに、このフォルダをそのまま置けば公開できます。
背景の地図は [OpenFreeMap](https://openfreemap.org)（無料・APIキー不要・商用利用可）のベクター地図を使い、`src/basemap.js` でハチドリ電力の配色と日本語の地名に塗り替えています。色を変えたいときは同ファイルの `COLORS` を編集してください。
OpenFreeMap が読み込めないときは、OpenStreetMap の標準タイルに自動で切り替わります（こちらは大量アクセス向けではありません）。
