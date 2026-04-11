---
title: "アロー関数とコールバック"
slug: "arrow-functions"
order: 9
description: "もっとスマートに書こう"
world: "town"
challenge:
  description: "配列 [1,2,3,4,5] から偶数だけ取り出して表示しよう"
  starterCode: "let numbers = [1, 2, 3, 4, 5];\n// filter で偶数だけ取り出して表示しよう\n"
  expectedOutput: "2,4"
  hints:
    - "numbers.filter() を使おう"
    - "n % 2 === 0 で偶数かどうか判定できるよ"
    - "console.log(numbers.filter(n => n % 2 === 0).join(\",\")); で表示しよう"
---

# アロー{関数|かんすう}とコールバック ー もっとスマートに{書|か}こう

:::sensei
{前|まえ}のレッスンで{関数|かんすう}を{学|まな}んだよね。
{今日|きょう}はもっと{短|みじか}くスッキリ{書|か}ける「アロー{関数|かんすう}」と、
{関数|かんすう}を{別|べつ}の{関数|かんすう}に{渡|わた}す「コールバック」を{学|まな}ぶよ！
:::

:::student
{関数|かんすう}をもっと{短|みじか}く{書|か}けるの？
:::

:::sensei
`=>` という{矢印|やじるし}（アロー）を使うんだ。
{見|み}た{目|め}もカッコよくなるよ！
:::

## アロー{関数|かんすう}の{基本|きほん}

`function` の{代|か}わりに `=>` を使う{書|か}き{方|かた}だよ。

```javascript runnable
// 普通の関数
let greetOld = function(name) {
  return `ようこそ、${name}！`;
};

// アロー関数
let greetNew = (name) => {
  return `ようこそ、${name}！`;
};

console.log(greetOld("ゆうしゃ"));
console.log(greetNew("まほうつかい"));
```

:::hint
アロー{関数|かんすう}は `function` を{消|け}して、`()` と `{}` の{間|あいだ}に `=>` を{入|い}れるイメージだよ。
:::

## {省略|しょうりゃく}できるルール

アロー{関数|かんすう}にはスッキリ{書|か}くためのルールがあるよ。

```javascript runnable
// パラメータが1つなら () を省略できる
let double = n => {
  return n * 2;
};

// 1行で return するなら {} と return を省略できる（暗黙のreturn）
let triple = n => n * 3;

// パラメータが0個や2個以上なら () が必要
let rollDice = () => Math.floor(Math.random() * 6) + 1;
let add = (a, b) => a + b;

console.log(double(5));
console.log(triple(5));
console.log(rollDice());
console.log(add(3, 7));
```

:::student
`n => n * 2` ってすごく{短|みじか}い！
{一行|いちぎょう}で{書|か}けるんだね！
:::

:::sensei
{処理|しょり}が{一行|いちぎょう}のときは `{}` と `return` を{省略|しょうりゃく}できるんだ。
これを「{暗黙|あんもく}のリターン」というよ。
:::

## コールバック{関数|かんすう}とは？

{関数|かんすう}を{別|べつ}の{関数|かんすう}に{渡|わた}すこと、これが「コールバック」だよ。

```javascript runnable
function doAction(actionName, callback) {
  console.log(`${actionName}を実行中...`);
  callback();
  console.log(`${actionName}完了！`);
}

doAction("攻撃", () => {
  console.log("スライムに25ダメージ！");
});

doAction("回復", () => {
  console.log("HPが30回復した！");
});
```

:::hint
コールバックは「あとで{呼|よ}び{出|だ}して」と{関数|かんすう}を{渡|わた}すこと。
{渡|わた}された{側|がわ}が{好|す}きなタイミングで{実行|じっこう}するんだ。
:::

## setTimeout のしくみ（{考|かんが}え{方|かた}だけ）

JavaScriptには「{何秒後|なんびょうご}かに{実行|じっこう}する」`setTimeout` という{機能|きのう}があるよ。
これもコールバックの{仲間|なかま}なんだ。

```javascript runnable
// setTimeout の「考え方」を再現してみよう
// （実際の setTimeout は非同期で動くけど、ここでは仕組みを理解しよう）

function simulateDelay(actionName, callback) {
  console.log(`${actionName}の詠唱を開始...`);
  // 実際の setTimeout ではここで待ち時間がある
  callback();
}

simulateDelay("ファイア", () => {
  console.log("ファイアが発動した！30ダメージ！");
});

simulateDelay("ケアル", () => {
  console.log("ケアルが発動した！HPが50回復！");
});
```

:::sensei
`setTimeout(callback, 1000)` と{書|か}くと1{秒後|びょうご}にコールバックが{実行|じっこう}されるよ。
{今|いま}は「{関数|かんすう}を{渡|わた}して{後|あと}で{実行|じっこう}してもらう」という{考|かんが}え{方|かた}を{覚|おぼ}えておこう！
:::

## forEach: {配列|はいれつ}の{各要素|かくようそ}に{処理|しょり}する

`forEach` は{配列|はいれつ}の{全要素|ぜんようそ}に{対|たい}してコールバック{関数|かんすう}を{実行|じっこう}するよ。

```javascript runnable
let party = ["ゆうしゃ", "まほうつかい", "せんし", "そうりょ"];

party.forEach((member) => {
  console.log(`${member}が戦闘態勢に入った！`);
});
```

:::student
for ループの{代|か}わりにforEachが使えるんだね！
:::

```javascript runnable
// インデックス（番号）も使える
let enemies = ["スライム", "ゴブリン", "オーク"];

enemies.forEach((enemy, index) => {
  console.log(`${index + 1}番目の敵: ${enemy}`);
});
```

## map: {配列|はいれつ}を{変換|へんかん}する

`map` は{各要素|かくようそ}を{変換|へんかん}して{新|あたら}しい{配列|はいれつ}を{作|つく}るよ。

```javascript runnable
let prices = [100, 200, 350, 500];

// 全部2割引にする
let discounted = prices.map(price => Math.floor(price * 0.8));
console.log(`元の値段: ${prices}`);
console.log(`2割引: ${discounted}`);
```

```javascript runnable
let members = ["ゆうしゃ", "まほうつかい", "せんし"];

// 全員にレベル情報をつける
let withLevel = members.map(name => `${name} Lv.5`);
console.log(withLevel.join(", "));
```

:::sensei
`map` は{元|もと}の{配列|はいれつ}を{変|か}えずに、{新|あたら}しい{配列|はいれつ}を{返|かえ}すよ。
{元|もと}のデータを{安全|あんぜん}に{保|たも}ったまま{変換|へんかん}できるんだ。
:::

## filter: {条件|じょうけん}で{絞|しぼ}り{込|こ}む

`filter` は{条件|じょうけん}に{合|あ}う{要素|ようそ}だけを{取|と}り{出|だ}すよ。

```javascript runnable
let monsters = [
  { name: "スライム", hp: 30 },
  { name: "ドラゴン", hp: 500 },
  { name: "ゴブリン", hp: 50 },
  { name: "魔王", hp: 999 },
  { name: "コウモリ", hp: 15 }
];

// HPが100以上の強いモンスターだけ取り出す
let strongMonsters = monsters.filter(m => m.hp >= 100);

strongMonsters.forEach(m => {
  console.log(`強敵: ${m.name}（HP: ${m.hp}）`);
});
```

:::student
`filter` で{条件|じょうけん}に{合|あ}うものだけ{残|のこ}せるんだ！
{強|つよ}い{敵|てき}だけ{選|えら}び{出|だ}すみたいだね。
:::

## map と filter を{組|く}み{合|あ}わせる

メソッドチェーンで{組|く}み{合|あ}わせると{強力|きょうりょく}だよ！

```javascript runnable
let items = [
  { name: "ポーション", price: 50, type: "回復" },
  { name: "エーテル", price: 100, type: "回復" },
  { name: "鉄の剣", price: 300, type: "武器" },
  { name: "皮の盾", price: 200, type: "防具" },
  { name: "万能薬", price: 500, type: "回復" }
];

// 回復アイテムだけ取り出して、名前と値段を表示
let healingItems = items
  .filter(item => item.type === "回復")
  .map(item => `${item.name}（${item.price}G）`);

console.log("回復アイテム一覧:");
healingItems.forEach(text => console.log(`  ${text}`));
```

:::sensei
`filter` で{絞|しぼ}り{込|こ}んでから `map` で{変換|へんかん}する。
この{組|く}み{合|あ}わせはとてもよく使うパターンだよ！
:::

## {実践|じっせん}：{冒険|ぼうけん}パーティの{分析|ぶんせき}

```javascript runnable
let party = [
  { name: "ゆうしゃ", hp: 100, role: "前衛" },
  { name: "せんし", hp: 120, role: "前衛" },
  { name: "まほうつかい", hp: 60, role: "後衛" },
  { name: "そうりょ", hp: 80, role: "後衛" }
];

// 前衛メンバーだけ取り出す
let frontLine = party
  .filter(m => m.role === "前衛")
  .map(m => m.name);
console.log(`前衛: ${frontLine.join(", ")}`);

// 後衛メンバーだけ取り出す
let backLine = party
  .filter(m => m.role === "後衛")
  .map(m => m.name);
console.log(`後衛: ${backLine.join(", ")}`);

// HPの合計を計算
let totalHp = party.map(m => m.hp);
let sum = 0;
totalHp.forEach(hp => { sum = sum + hp; });
console.log(`パーティ合計HP: ${sum}`);
```

:::sensei
アロー{関数|かんすう}、コールバック、`forEach`、`map`、`filter`...
たくさん{学|まな}んだね！これらは{現代|げんだい}のJavaScriptでとても{大切|たいせつ}な{技術|ぎじゅつ}だよ。
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::
