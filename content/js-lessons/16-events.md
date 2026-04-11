---
title: "イベント処理"
slug: "events"
order: 16
description: "クリックで魔法を発動しよう"
world: "mountain"
challenge:
  description: "ボタンを作ってクリックカウンターを設置し、console.log(\"イベント設定完了\") と表示しよう！"
  starterCode: "// ボタンを作ってカウンターを設定しよう\n// console.log(\"イベント設定完了\") と表示しよう\n"
  expectedOutput: "イベント設定完了"
  hints:
    - "let btn = document.createElement(\"button\"); でボタンを作ろう"
    - "btn.addEventListener(\"click\", function() { ... }); でクリック処理を追加しよう"
    - "最後に console.log(\"イベント設定完了\"); を忘れずに！"
---

# イベント{処理|しょり}

:::sensei
DOM で{画面|がめん}を{作|つく}れるようになったな。
でも{今|いま}のままだと、ただ{表示|ひょうじ}するだけで{動|うご}かない — {石像|せきぞう}みたいなものだ。
{今回|こんかい}は **イベント** を{学|まな}んで、ユーザーの{操作|そうさ}に{反応|はんのう}するプログラムを{作|つく}るぞ！
:::

:::student
クリックしたら{何|なに}か{起|お}きるってこと？
:::

:::sensei
その{通|とお}り！ ボタンをクリック、{文字|もじ}を{入力|にゅうりょく}、マウスを{動|うご}かす…
こういった{操作|そうさ}を「イベント」と{呼|よ}ぶんだ。
イベントに{反応|はんのう}する{関数|かんすう}を{設定|せってい}すれば、{魔法|まほう}のように{画面|がめん}が{動|うご}き{出|だ}すぞ！
:::

## addEventListener — イベントを{聞|き}く

`要素.addEventListener("イベント名", 関数)` で、{特定|とくてい}のイベントが{起|お}きたときに
{実行|じっこう}する{関数|かんすう}（**イベントハンドラ**）を{登録|とうろく}できるよ。

```javascript runnable
let btn = document.createElement("button");
btn.textContent = "🔮 魔法を発動！";
btn.style.padding = "12px 24px";
btn.style.fontSize = "18px";
btn.style.cursor = "pointer";
btn.style.borderRadius = "8px";
btn.style.border = "2px solid #6c5ce7";
btn.style.background = "#a29bfe";
btn.style.color = "white";

btn.addEventListener("click", function() {
  app.innerHTML += "<p>✨ ファイアボールを放った！</p>";
});

app.appendChild(btn);
console.log("ボタンを設置！クリックしてみよう");
```

:::hint
`addEventListener` の{第|だい}1{引数|ひきすう}にイベント{名|めい}（`"click"`）、
{第|だい}2{引数|ひきすう}に{実行|じっこう}したい{関数|かんすう}を{渡|わた}すよ。
ボタンがクリックされるたびに、その{関数|かんすう}が{呼|よ}ばれるんだ。
:::

:::student
クリックするたびに{魔法|まほう}が{増|ふ}えていく！ {楽|たの}しい！
:::

## クリックカウンター

{変数|へんすう}と{組|く}み{合|あ}わせて、クリック{回数|かいすう}を{数|かぞ}えてみよう。

```javascript runnable
let count = 0;

let display = document.createElement("h2");
display.textContent = `クリック回数: ${count}`;
display.style.fontFamily = "sans-serif";
app.appendChild(display);

let btn = document.createElement("button");
btn.textContent = "⚡ クリック！";
btn.style.padding = "10px 20px";
btn.style.fontSize = "16px";
btn.style.cursor = "pointer";
btn.style.borderRadius = "8px";
btn.style.border = "none";
btn.style.background = "#00b894";
btn.style.color = "white";

btn.addEventListener("click", function() {
  count++;
  display.textContent = `クリック回数: ${count}`;
});

app.appendChild(btn);
console.log("カウンターを設置！");
```

:::sensei
ポイントは `count` {変数|へんすう}を{関数|かんすう}の{外|そと}で{宣言|せんげん}していることだ。
クリックするたびに `count` が{増|ふ}え、`display.textContent` が{更新|こうしん}される。
これが **{状態|じょうたい}（ステート）** を{管理|かんり}する{基本|きほん}だぞ！
:::

## {複数|ふくすう}のボタン

{複数|ふくすう}のボタンにそれぞれ{違|ちが}うイベントを{設定|せってい}できるよ。

```javascript runnable
let style = document.createElement("style");
style.textContent = `
  .spell-btn {
    padding: 10px 18px;
    margin: 4px;
    font-size: 15px;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
  }
  .fire { background: #e17055; }
  .ice { background: #74b9ff; }
  .thunder { background: #fdcb6e; color: #333; }
  #spell-log { font-family: sans-serif; margin-top: 12px; min-height: 80px; }
`;
document.head.appendChild(style);

let log = document.createElement("div");
log.id = "spell-log";

let spells = [
  { name: "🔥 ファイア", css: "fire", msg: "炎が燃え上がった！" },
  { name: "❄️ ブリザド", css: "ice", msg: "氷の嵐が吹き荒れた！" },
  { name: "⚡ サンダー", css: "thunder", msg: "雷が轟いた！" },
];

for (let spell of spells) {
  let btn = document.createElement("button");
  btn.textContent = spell.name;
  btn.classList.add("spell-btn", spell.css);

  btn.addEventListener("click", function() {
    let p = document.createElement("p");
    p.textContent = spell.msg;
    log.appendChild(p);
  });

  app.appendChild(btn);
}

app.appendChild(log);
console.log("3つの魔法ボタンを設置！");
```

:::student
ループで{配列|はいれつ}のデータからボタンを{作|つく}れるんだ！ {効率的|こうりつてき}！
:::

## イベントオブジェクト（e.target）

イベントハンドラの{引数|ひきすう}にはイベントオブジェクトが{渡|わた}されるよ。
`e.target` で「クリックされた{要素|ようそ}{自体|じたい}」を{取得|しゅとく}できるんだ。

```javascript runnable
let style = document.createElement("style");
style.textContent = `
  .item-btn {
    display: inline-block;
    padding: 12px;
    margin: 6px;
    border-radius: 8px;
    background: #dfe6e9;
    cursor: pointer;
    font-size: 24px;
    transition: transform 0.1s;
  }
  .item-btn:active { transform: scale(0.9); }
  #result { font-family: sans-serif; margin-top: 12px; font-size: 16px; }
`;
document.head.appendChild(style);

let items = ["🗡️", "🛡️", "🧪", "📜", "💎"];
let result = document.createElement("div");
result.id = "result";
result.textContent = "アイテムをクリックしてね";

for (let item of items) {
  let box = document.createElement("span");
  box.classList.add("item-btn");
  box.textContent = item;

  box.addEventListener("click", function(e) {
    result.textContent = `${e.target.textContent} を選んだ！`;
  });

  app.appendChild(box);
}

app.appendChild(result);
console.log("e.target でクリック先を判定！");
```

:::hint
`e`（イベントオブジェクト）には{色々|いろいろ}な{情報|じょうほう}が{入|はい}っているよ。
`e.target` はクリックされた{要素|ようそ}そのものを{指|さ}すんだ。
これで「どの{要素|ようそ}がクリックされたか」を{判定|はんてい}できる！
:::

## input イベント — {入力|にゅうりょく}を{読|よ}み{取|と}る

テキスト{入力欄|にゅうりょくらん}では `input` イベントが{使|つか}えるよ。
{文字|もじ}を{打|う}つたびに{発火|はっか}するんだ。

```javascript runnable
let style = document.createElement("style");
style.textContent = `
  .name-input {
    padding: 10px;
    font-size: 18px;
    border: 2px solid #6c5ce7;
    border-radius: 8px;
    width: 200px;
  }
  .greeting {
    font-family: sans-serif;
    font-size: 20px;
    margin-top: 12px;
    color: #2d3436;
  }
`;
document.head.appendChild(style);

let input = document.createElement("input");
input.type = "text";
input.placeholder = "勇者の名前を入力...";
input.classList.add("name-input");

let greeting = document.createElement("p");
greeting.classList.add("greeting");
greeting.textContent = "名前を入力してね";

input.addEventListener("input", function(e) {
  let name = e.target.value;
  if (name) {
    greeting.textContent = `ようこそ、${name}！ 冒険の旅へ出発しよう！`;
  } else {
    greeting.textContent = "名前を入力してね";
  }
});

app.appendChild(input);
app.appendChild(greeting);
console.log("input イベントで入力を監視！");
```

:::sensei
`input` イベントは{文字|もじ}が{変|か}わるたびに{発火|はっか}するから、
リアルタイムに{画面|がめん}を{更新|こうしん}できるぞ。`e.target.value` で{入力|にゅうりょく}{値|ち}を{取得|しゅとく}するんだ。
:::

## {実践|じっせん}：モンスターバトル！

{学|まな}んだことを{全部|ぜんぶ}{組|く}み{合|あ}わせて、モンスターを{攻撃|こうげき}するミニゲームを{作|つく}ってみよう！

```javascript runnable
let style = document.createElement("style");
style.textContent = `
  .battle-area {
    font-family: sans-serif;
    background: #2d3436;
    color: #dfe6e9;
    padding: 24px;
    border-radius: 16px;
    text-align: center;
    max-width: 350px;
  }
  .monster-name { font-size: 24px; margin: 0 0 8px; }
  .monster-emoji { font-size: 64px; display: block; margin: 12px 0; }
  .hp-bar-bg {
    background: #636e72;
    border-radius: 10px;
    overflow: hidden;
    height: 24px;
    margin: 8px 0 16px;
  }
  .hp-bar-fill {
    background: linear-gradient(90deg, #ff7675, #d63031);
    height: 100%;
    transition: width 0.3s;
  }
  .hp-text { font-size: 14px; color: #b2bec3; }
  .attack-btn {
    padding: 12px 28px;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    background: #e17055;
    color: white;
    cursor: pointer;
    margin-top: 8px;
  }
  .attack-btn:hover { background: #d63031; }
  .attack-btn:disabled { background: #636e72; cursor: default; }
  .battle-log {
    margin-top: 12px;
    font-size: 13px;
    color: #b2bec3;
    text-align: left;
    max-height: 80px;
    overflow-y: auto;
  }
`;
document.head.appendChild(style);

let monsterHp = 100;
let maxHp = 100;

let area = document.createElement("div");
area.classList.add("battle-area");

area.innerHTML = `
  <p class="monster-name">🐉 ドラゴン</p>
  <span class="monster-emoji">🐲</span>
  <p class="hp-text">HP: <span id="hp-num">${monsterHp}</span> / ${maxHp}</p>
  <div class="hp-bar-bg">
    <div class="hp-bar-fill" id="hp-fill" style="width:100%"></div>
  </div>
`;

let btn = document.createElement("button");
btn.textContent = "⚔️ 攻撃する！";
btn.classList.add("attack-btn");

let log = document.createElement("div");
log.classList.add("battle-log");

btn.addEventListener("click", function() {
  let damage = Math.floor(Math.random() * 20) + 5;
  monsterHp = Math.max(0, monsterHp - damage);

  // HP 表示を更新
  let hpNum = document.getElementById("hp-num");
  let hpFill = document.getElementById("hp-fill");
  hpNum.textContent = monsterHp;
  hpFill.style.width = `${(monsterHp / maxHp) * 100}%`;

  // ログに追加
  let entry = document.createElement("p");
  entry.style.margin = "2px 0";
  entry.textContent = `→ ${damage} ダメージ！（残り HP: ${monsterHp}）`;
  log.insertBefore(entry, log.firstChild);

  if (monsterHp <= 0) {
    btn.disabled = true;
    btn.textContent = "🎉 勝利！";
    let emoji = area.querySelector(".monster-emoji");
    emoji.textContent = "💀";
  }
});

area.appendChild(btn);
area.appendChild(log);
app.appendChild(area);
console.log("バトル開始！ ボタンをクリックして攻撃しよう！");
```

:::student
すごい！ クリックするたびに HP が{減|へ}って、{倒|たお}したら「{勝利|しょうり}！」って{出|で}る！
これだけのコードで{本格的|ほんかくてき}なバトルが{作|つく}れるんだ！
:::

:::sensei
`Math.random()` で{攻撃力|こうげきりょく}をランダムにしているのもポイントだ。
{状態|じょうたい}（`monsterHp`）を{変数|へんすう}で{管理|かんり}し、イベントのたびに{画面|がめん}を{更新|こうしん}する —
これがインタラクティブなアプリの{基本|きほん}パターンだぞ！
:::

## {関数|かんすう}でハンドラを{整理|せいり}する

イベントハンドラが{長|なが}くなってきたら、{名前付|なまえつ}き{関数|かんすう}に{分|わ}けると{読|よ}みやすくなるよ。

```javascript runnable
let count = 0;
let display = document.createElement("h2");
display.textContent = "スコア: 0";
display.style.fontFamily = "sans-serif";
app.appendChild(display);

// ハンドラを関数として定義
function handleClick() {
  count += 10;
  display.textContent = `スコア: ${count}`;
}

function handleReset() {
  count = 0;
  display.textContent = "スコア: 0";
}

let style = document.createElement("style");
style.textContent = `
  .game-btn {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    margin: 4px;
  }
`;
document.head.appendChild(style);

let addBtn = document.createElement("button");
addBtn.textContent = "⭐ +10 ポイント";
addBtn.classList.add("game-btn");
addBtn.style.background = "#0984e3";
addBtn.addEventListener("click", handleClick);

let resetBtn = document.createElement("button");
resetBtn.textContent = "🔄 リセット";
resetBtn.classList.add("game-btn");
resetBtn.style.background = "#636e72";
resetBtn.addEventListener("click", handleReset);

app.appendChild(addBtn);
app.appendChild(resetBtn);
console.log("名前付き関数でハンドラを整理！");
```

:::hint
`addEventListener("click", handleClick)` のように{関数名|かんすうめい}だけを{渡|わた}すよ。
`handleClick()` と{丸括弧|まるかっこ}をつけると、{今|いま}すぐ{実行|じっこう}されてしまうから{注意|ちゅうい}！
:::

## まとめ

:::sensei
イベント{処理|しょり}の{基本|きほん}をまとめるぞ！

| やりたいこと | {方法|ほうほう} |
|---|---|
| イベントを{設定|せってい} | `要素.addEventListener("イベント名", 関数)` |
| クリックに{反応|はんのう} | `"click"` イベント |
| {入力|にゅうりょく}に{反応|はんのう} | `"input"` イベント |
| クリック{先|さき}を{取得|しゅとく} | `e.target` |
| {入力値|にゅうりょくち}を{取得|しゅとく} | `e.target.value` |

{画面|がめん}を{作|つく}る DOM + ユーザー{操作|そうさ}に{反応|はんのう}するイベント。
この2つを{組|く}み{合|あ}わせれば、{本格的|ほんかくてき}な Web アプリが{作|つく}れるようになるぞ！
:::

:::student
DOM とイベントで、{見|み}て{触|さわ}れるプログラムが{作|つく}れるようになった！
モンスターバトルめちゃくちゃ{楽|たの}しかった！ もっと{作|つく}りたい！
:::

:::sensei
その{意気|いき}だ！ DOM とイベントは Web {開発|かいはつ}の{土台|どだい}。
ここから{先|さき}、もっと{複雑|ふくざつ}なアプリも{作|つく}れるようになるぞ！
:::
