---
title: "DOM入門"
slug: "dom-basics"
order: 15
description: "画面を自由にあやつろう"
world: "mountain"
challenge:
  description: "app.innerHTML で <h1>冒険スタート！</h1> を表示し、console.log(\"準備完了\") と表示しよう！"
  starterCode: "// app に h1 タグを表示しよう\n// console.log で \"準備完了\" と表示しよう\n"
  expectedOutput: "準備完了"
  hints:
    - "app.innerHTML = \"<h1>冒険スタート！</h1>\"; で HTML を表示できるよ"
    - "console.log(\"準備完了\"); で出力しよう"
    - "app は最初から使えるグローバル変数だよ"
---

# DOM{入門|にゅうもん}

:::sensei
{今回|こんかい}は **DOM（ドム）** を{学|まな}ぶよ！
DOM とは **Document Object Model** — つまり、{画面|がめん}に{表示|ひょうじ}されている HTML を
JavaScript から{操作|そうさ}するための{仕組|しく}みだ。
{剣|けん}や{魔法|まほう}で{敵|てき}を{倒|たお}すように、DOM を{使|つか}えば{画面|がめん}を{自由自在|じゆうじざい}に{変|か}えられるぞ！
:::

:::student
{画面|がめん}を JavaScript で{変|か}えられるの？ すごい！
:::

:::sensei
そう！ ここには `app` という{特別|とくべつ}な{要素|ようそ}が{用意|ようい}されている。
`app` に HTML を{入|い}れれば、{右|みぎ}のプレビューに{表示|ひょうじ}されるんだ。
{冒険者|ぼうけんしゃ}のステータスカードだって{作|つく}れるぞ！
:::

## innerHTML — HTML を{直接|ちょくせつ}{書|か}き{込|こ}む

`app.innerHTML` に HTML {文字列|もじれつ}を{代入|だいにゅう}すると、{画面|がめん}にそのまま{表示|ひょうじ}されるよ。

```javascript runnable
app.innerHTML = "<h1>勇者の冒険</h1>";
console.log("画面に h1 を表示したよ！");
```

:::hint
`app` はこの{実行環境|じっこうかんきょう}に{最初|さいしょ}から{用意|ようい}されている `<div>` {要素|ようそ}だよ。
`innerHTML` に HTML を{入|い}れると、その{中身|なかみ}がまるごと{書|か}き{換|か}わるんだ。
:::

もっと{複雑|ふくざつ}な HTML も{入|い}れられるよ。

```javascript runnable
app.innerHTML = `
  <h2>🗡️ パーティー紹介</h2>
  <p><strong>勇者アキラ</strong> — レベル 12</p>
  <p><strong>魔法使いミサキ</strong> — レベル 10</p>
  <p><strong>僧侶タクミ</strong> — レベル 11</p>
`;
console.log("パーティー紹介を表示！");
```

:::student
テンプレートリテラル（バッククォート）を{使|つか}えば{複数行|ふくすうぎょう}の HTML も{書|か}きやすいね！
:::

## document.createElement — {要素|ようそ}を{作|つく}る

`innerHTML` は{便利|べんり}だけど、もっと{細|こま}かく{操作|そうさ}したいときは
`document.createElement` で{要素|ようそ}を1つずつ{作|つく}るんだ。

```javascript runnable
// h1 要素を作る
let title = document.createElement("h1");
title.textContent = "冒険の書";

// p 要素を作る
let message = document.createElement("p");
message.textContent = "セーブデータをロードしますか？";

// app に追加
app.appendChild(title);
app.appendChild(message);

console.log("createElement で要素を作ったよ！");
```

:::hint
`document.createElement("タグ名")` で{新|あたら}しい HTML {要素|ようそ}を{作|つく}れるよ。
でも{作|つく}っただけでは{画面|がめん}に{出|で}ない — `app.appendChild(要素)` で{追加|ついか}する{必要|ひつよう}があるんだ。
:::

:::sensei
`innerHTML` は「{一気|いっき}に{書|か}き{換|か}える」、
`createElement` + `appendChild` は「1つずつ{組|く}み{立|た}てる」イメージだ。
{場面|ばめん}に{応|おう}じて{使|つか}い{分|わ}けよう！
:::

## textContent — テキストを{変|か}える

{要素|ようそ}の{中|なか}のテキストだけを{変|か}えたいときは `textContent` を{使|つか}うよ。

```javascript runnable
let status = document.createElement("h2");
status.textContent = "HP: 100";
app.appendChild(status);

// テキストを変更！
status.textContent = "HP: 75（ダメージを受けた！）";

console.log("textContent でテキストを変更！");
```

:::student
`textContent` を{上書|うわが}きすると、{前|まえ}のテキストが{消|き}えて{新|あたら}しいのに{変|か}わるんだね。
:::

## style — {見|み}た{目|め}を{変|か}える

{要素|ようそ}の `.style` プロパティで CSS を JavaScript から{直接|ちょくせつ}{変|か}えられるよ。

```javascript runnable
let hpBar = document.createElement("div");
hpBar.textContent = "HP: 80 / 100";
hpBar.style.backgroundColor = "#4CAF50";
hpBar.style.color = "white";
hpBar.style.padding = "12px 20px";
hpBar.style.borderRadius = "8px";
hpBar.style.fontWeight = "bold";
hpBar.style.fontSize = "18px";
hpBar.style.textAlign = "center";

app.appendChild(hpBar);

console.log("スタイルを設定！");
```

:::hint
CSS では `background-color` と{書|か}くけど、JavaScript では **キャメルケース** で
`backgroundColor` と{書|か}くよ。ハイフンを{消|け}して{次|つぎ}の{文字|もじ}を{大文字|おおもじ}にするんだ！
:::

:::sensei
`font-size` → `fontSize`、`border-radius` → `borderRadius` のように{変換|へんかん}するぞ。
これは JavaScript ではハイフンが「{引|ひ}き{算|ざん}」と{間違|まちが}えられるからだ！
:::

## CSS クラスを{追加|ついか}・{削除|さくじょ}する

`style` で1つずつ{設定|せってい}するのが{面倒|めんどう}なときは、CSS クラスを{使|つか}おう。
`classList.add()` と `classList.remove()` で{操作|そうさ}できるよ。

```javascript runnable
// まず style タグで CSS を定義
let styleTag = document.createElement("style");
styleTag.textContent = `
  .hero-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 12px;
    font-family: sans-serif;
    max-width: 250px;
  }
  .hero-card h3 { margin: 0 0 8px 0; font-size: 20px; }
  .hero-card p { margin: 4px 0; font-size: 14px; }
  .shining { box-shadow: 0 0 20px gold; }
`;
document.head.appendChild(styleTag);

// カードを作る
let card = document.createElement("div");
card.classList.add("hero-card");
card.innerHTML = `
  <h3>⚔️ 勇者アキラ</h3>
  <p>レベル: 12</p>
  <p>HP: 100 / 100</p>
  <p>職業: 剣士</p>
`;
app.appendChild(card);

// 光るエフェクトを追加！
card.classList.add("shining");

console.log("クラス:", [...card.classList].join(", "));
```

:::student
`classList.add` で CSS クラスをつけて、{見|み}た{目|め}をガラッと{変|か}えられるんだ！
:::

## {勇者|ゆうしゃ}ステータスカードを{作|つく}ろう！

{学|まな}んだことを{組|く}み{合|あ}わせて、かっこいいステータスカードを{作|つく}ってみよう！

```javascript runnable
// CSS を追加
let style = document.createElement("style");
style.textContent = `
  .status-card {
    background: #1a1a2e;
    color: #eee;
    padding: 24px;
    border-radius: 16px;
    font-family: sans-serif;
    max-width: 300px;
    border: 2px solid #e94560;
  }
  .status-card h2 { color: #e94560; margin: 0 0 16px 0; }
  .stat-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid #333;
  }
  .stat-label { color: #aaa; }
  .stat-value { color: #0f3460; font-weight: bold; color: #e94560; }
  .hp-bar {
    background: #333;
    border-radius: 8px;
    overflow: hidden;
    height: 20px;
    margin-top: 12px;
  }
  .hp-fill {
    background: linear-gradient(90deg, #e94560, #ff6b6b);
    height: 100%;
    transition: width 0.3s;
  }
`;
document.head.appendChild(style);

// ステータスデータ
let hero = {
  name: "勇者アキラ",
  level: 12,
  hp: 85,
  maxHp: 100,
  attack: 45,
  defense: 30,
  magic: 20
};

// カードを組み立てる
let card = document.createElement("div");
card.classList.add("status-card");

let title = document.createElement("h2");
title.textContent = `⚔️ ${hero.name}`;
card.appendChild(title);

// ステータス行を作る関数
function addStat(label, value) {
  let row = document.createElement("div");
  row.classList.add("stat-row");
  row.innerHTML = `
    <span class="stat-label">${label}</span>
    <span class="stat-value">${value}</span>
  `;
  card.appendChild(row);
}

addStat("レベル", hero.level);
addStat("こうげき", hero.attack);
addStat("ぼうぎょ", hero.defense);
addStat("まほう", hero.magic);

// HP バー
let hpSection = document.createElement("div");
hpSection.innerHTML = `<div style="margin-top:12px; font-size:14px; color:#aaa;">
  HP: ${hero.hp} / ${hero.maxHp}
</div>`;
let hpBar = document.createElement("div");
hpBar.classList.add("hp-bar");
let hpFill = document.createElement("div");
hpFill.classList.add("hp-fill");
hpFill.style.width = `${(hero.hp / hero.maxHp) * 100}%`;
hpBar.appendChild(hpFill);
hpSection.appendChild(hpBar);
card.appendChild(hpSection);

app.appendChild(card);
console.log(`${hero.name} のステータスカード完成！`);
```

:::sensei
{関数|かんすう}を{作|つく}って{繰|く}り{返|かえ}しの{作業|さぎょう}をまとめるのがポイントだ。
`addStat` {関数|かんすう}で{何行|なんぎょう}もの DOM {操作|そうさ}を1{行|ぎょう}で{呼|よ}び{出|だ}せるようにしたぞ！
:::

## リストを{作|つく}る

`<ul>` と `<li>` で{アイテムリスト|あいてむりすと}を{作|つく}ってみよう。

```javascript runnable
let items = ["ポーション ×3", "エリクサー ×1", "テント ×2", "聖水 ×5", "毒消し草 ×4"];

let title = document.createElement("h2");
title.textContent = "🎒 持ち物リスト";
title.style.fontFamily = "sans-serif";
app.appendChild(title);

let list = document.createElement("ul");
list.style.fontFamily = "sans-serif";
list.style.fontSize = "16px";
list.style.lineHeight = "2";

for (let item of items) {
  let li = document.createElement("li");
  li.textContent = item;
  list.appendChild(li);
}

app.appendChild(list);
console.log(`アイテム数: ${items.length}`);
```

:::student
`for...of` ループで{配列|はいれつ}の{各|かく}アイテムを `<li>` に{変|か}えて{追加|ついか}していくんだね！
:::

## テーブルを{作|つく}る

{仲間|なかま}の{情報|じょうほう}をテーブルで{表示|ひょうじ}してみよう。

```javascript runnable
let style = document.createElement("style");
style.textContent = `
  .rpg-table {
    border-collapse: collapse;
    font-family: sans-serif;
    width: 100%;
    max-width: 400px;
  }
  .rpg-table th {
    background: #2d3436;
    color: #dfe6e9;
    padding: 10px;
    text-align: left;
  }
  .rpg-table td {
    padding: 8px 10px;
    border-bottom: 1px solid #ddd;
  }
  .rpg-table tr:nth-child(even) { background: #f5f5f5; }
`;
document.head.appendChild(style);

let party = [
  { name: "アキラ", job: "剣士", lv: 12, hp: 100 },
  { name: "ミサキ", job: "魔法使い", lv: 10, hp: 65 },
  { name: "タクミ", job: "僧侶", lv: 11, hp: 80 },
  { name: "リナ", job: "盗賊", lv: 9, hp: 70 },
];

let table = document.createElement("table");
table.classList.add("rpg-table");

// ヘッダー
table.innerHTML = `<tr>
  <th>名前</th><th>職業</th><th>Lv</th><th>HP</th>
</tr>`;

// データ行を追加
for (let member of party) {
  let row = document.createElement("tr");
  row.innerHTML = `
    <td>${member.name}</td>
    <td>${member.job}</td>
    <td>${member.lv}</td>
    <td>${member.hp}</td>
  `;
  table.appendChild(row);
}

app.appendChild(table);

for (let m of party) {
  console.log(`${m.name}（${m.job}）Lv.${m.lv}`);
}
```

:::sensei
`innerHTML` と `createElement` を{組|く}み{合|あ}わせるのも OK だ。
ヘッダー{部分|ぶぶん}は `innerHTML` で{一気|いっき}に、データ{行|ぎょう}はループで{追加|ついか} — {柔軟|じゅうなん}に{使|つか}い{分|わ}けよう！
:::

## まとめ

:::sensei
{今回|こんかい}{学|まな}んだ DOM {操作|そうさ}をまとめるぞ！

| やりたいこと | {方法|ほうほう} |
|---|---|
| HTML を{一気|いっき}に{書|か}く | `app.innerHTML = "..."` |
| {要素|ようそ}を{作|つく}る | `document.createElement("タグ名")` |
| {要素|ようそ}を{追加|ついか}する | `親.appendChild(子)` |
| テキストを{変|か}える | `要素.textContent = "..."` |
| {見|み}た{目|め}を{変|か}える | `要素.style.プロパティ = "値"` |
| クラスを{追加|ついか} | `要素.classList.add("クラス名")` |
| クラスを{削除|さくじょ} | `要素.classList.remove("クラス名")` |

DOM を{使|つか}いこなせば、{画面|がめん}に{何|なん}でも{表示|ひょうじ}できるようになるぞ！
:::

:::student
ステータスカードやテーブルまで{作|つく}れるなんて、もう{本当|ほんとう}の Web ページみたいだ！
{次|つぎ}はクリックとかのイベントを{学|まな}びたい！
:::

:::sensei
そうだな！ {次回|じかい}は **イベント{処理|しょり}** — ボタンをクリックしたら{魔法|まほう}が{発動|はつどう}する、
そんなインタラクティブな{仕組|しく}みを{学|まな}ぶぞ！
:::
