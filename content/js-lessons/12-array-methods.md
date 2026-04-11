---
title: "配列メソッド"
slug: "array-methods"
order: 12
description: "データを自在にあやつろう"
world: "mountain"
challenge:
  description: "[10, 25, 30, 5, 15] から 10以上を filter して reduce で合計しよう！"
  starterCode: "let values = [10, 25, 30, 5, 15];\n// filter と reduce を使おう\n"
  expectedOutput: "80"
  hints:
    - "values.filter(v => v >= 10) で10以上を取り出そう"
    - "filter した結果に .reduce((sum, v) => sum + v, 0) をつなげよう"
    - "console.log(結果); で表示しよう"
---

# {配列|はいれつ}メソッド

:::sensei
{前|まえ}に `for` ループで{配列|はいれつ}を{処理|しょり}したよね。
でも、もっとスマートに{配列|はいれつ}を{操|あやつ}る{方法|ほうほう}があるんだ。
{山|やま}の{頂上|ちょうじょう}を{目指|めざ}す{冒険者|ぼうけんしゃ}のように、{一段|いちだん}ずつレベルアップしていこう！
:::

:::student
ループを使わなくてもいいの？
:::

:::sensei
そう！{配列|はいれつ}には{強力|きょうりょく}なメソッドがたくさんあるんだ。
`map`、`filter`、`reduce` — この3つは{冒険者|ぼうけんしゃ}の{三大|さんだい}{必殺技|ひっさつわざ}みたいなものだよ！
:::

## map — {全部|ぜんぶ}を{変換|へんかん}する

`map` は{配列|はいれつ}の{全|すべ}ての{要素|ようそ}を{別|べつ}の{形|かたち}に{変換|へんかん}するよ。
{元|もと}の{配列|はいれつ}は{変|か}わらず、{新|あたら}しい{配列|はいれつ}が{返|かえ}ってくるんだ。

```javascript runnable
let prices = [100, 200, 300, 400];

// 全部を2倍にする
let doubled = prices.map(price => price * 2);
console.log(doubled);
```

:::hint
`map` の中には{関数|かんすう}を書くよ。
`要素 => 変換後の値` というアロー{関数|かんすう}の{形|かたち}がよく使われるんだ。
:::

```javascript runnable
let heroes = ["ゆうしゃ", "まほうつかい", "せんし"];

// 名前に称号をつける
let titled = heroes.map(name => `★${name}★`);
console.log(titled);
```

:::student
{全員|ぜんいん}に★がついた！`for` ループを書かなくていいから{楽|らく}だね！
:::

## filter — {条件|じょうけん}で{選|えら}ぶ

`filter` は{条件|じょうけん}に{合|あ}う{要素|ようそ}だけを{取|と}り出して{新|あたら}しい{配列|はいれつ}を作るよ。

```javascript runnable
let scores = [45, 80, 30, 95, 60, 75];

// 70点以上だけ取り出す
let passed = scores.filter(score => score >= 70);
console.log(passed);
```

```javascript runnable
let items = [
  { name: "ポーション", price: 50 },
  { name: "エリクサー", price: 500 },
  { name: "薬草", price: 10 },
  { name: "聖水", price: 300 }
];

// 100ゴールド以下のアイテムだけ
let cheap = items.filter(item => item.price <= 100);
for (let item of cheap) {
  console.log(`${item.name}: ${item.price}G`);
}
```

:::sensei
`filter` の中の{関数|かんすう}は `true` か `false` を{返|かえ}すよ。
`true` を{返|かえ}した{要素|ようそ}だけが{新|あたら}しい{配列|はいれつ}に入るんだ。
:::

## reduce — まとめる

`reduce` は{配列|はいれつ}の{全要素|ぜんようそ}を{一|ひと}つの{値|あたい}にまとめるよ。
{合計|ごうけい}を出すのに{最適|さいてき}なんだ！

```javascript runnable
let damages = [25, 30, 18, 42, 35];

// 合計ダメージを計算
let total = damages.reduce((sum, d) => sum + d, 0);
console.log(`合計ダメージ: ${total}`);
```

:::hint
`reduce(関数, 初期値)` の{形|かたち}だよ。
{関数|かんすう}には `(これまでの結果, 今の要素)` が{渡|わた}されるんだ。
{初期値|しょきち}の `0` は「{最初|さいしょ}は0からスタート」という{意味|いみ}だよ。
:::

```javascript runnable
let prices = [100, 250, 80, 300];

// 合計金額
let total = prices.reduce((sum, price) => sum + price, 0);
console.log(`お買い物合計: ${total}G`);
```

:::student
`reduce` は{全部|ぜんぶ}をギュッとまとめるイメージだね！
:::

## find と findIndex — {探|さが}す

`find` は{条件|じょうけん}に{合|あ}う{最初|さいしょ}の{要素|ようそ}を{返|かえ}すよ。
`findIndex` は{条件|じょうけん}に{合|あ}う{最初|さいしょ}の{位置|いち}を{返|かえ}すよ。

```javascript runnable
let monsters = [
  { name: "スライム", hp: 10 },
  { name: "ゴブリン", hp: 30 },
  { name: "ドラゴン", hp: 200 },
  { name: "コウモリ", hp: 5 }
];

// HPが100以上のモンスターを探す
let boss = monsters.find(m => m.hp >= 100);
console.log(`ボス発見: ${boss.name} (HP: ${boss.hp})`);

// その位置は？
let bossIndex = monsters.findIndex(m => m.hp >= 100);
console.log(`位置: ${bossIndex}番目`);
```

:::sensei
`find` は{見|み}つかったら{要素|ようそ}そのものを、`findIndex` は{位置|いち}（インデックス）を{返|かえ}すんだ。
見つからなかったら `find` は `undefined`、`findIndex` は `-1` を{返|かえ}すよ。
:::

## some と every — チェック

`some` は「{一|ひと}つでも{条件|じょうけん}に{合|あ}うものがあるか」をチェック。
`every` は「{全部|ぜんぶ}が{条件|じょうけん}に{合|あ}うか」をチェック。

```javascript runnable
let partyHp = [100, 0, 80, 50];

// 誰かが倒れている？（HPが0）
let someoneDown = partyHp.some(hp => hp === 0);
console.log(`誰かが倒れている: ${someoneDown}`);

// 全員生きている？（HPが0より大きい）
let allAlive = partyHp.every(hp => hp > 0);
console.log(`全員生存: ${allAlive}`);
```

:::student
`some` は「{誰|だれ}か{一人|ひとり}でも」で、`every` は「{全員|ぜんいん}」なんだね！
:::

## sort — {並|なら}べ{替|か}える

`sort` は{配列|はいれつ}を{並|なら}べ{替|か}えるよ。
{注意|ちゅうい}：{元|もと}の{配列|はいれつ}が{直接変|ちょくせつか}わるよ！

```javascript runnable
// 文字列はそのままソートできる
let names = ["せんし", "ゆうしゃ", "まほうつかい", "そうりょ"];
names.sort();
console.log(names);
```

{数値|すうち}をソートするときは{比較関数|ひかくかんすう}が{必要|ひつよう}だよ。

```javascript runnable
let scores = [40, 100, 5, 25, 80];

// 小さい順（昇順）
scores.sort((a, b) => a - b);
console.log(`昇順: ${scores}`);

// 大きい順（降順）
scores.sort((a, b) => b - a);
console.log(`降順: ${scores}`);
```

:::hint
`sort((a, b) => a - b)` の{仕組|しく}み：
- {結果|けっか}がマイナスなら a が{前|まえ}
- {結果|けっか}がプラスなら b が{前|まえ}
- 0 なら{同|おな}じ
つまり `a - b` だと{小|ちい}さい{順|じゅん}、`b - a` だと{大|おお}きい{順|じゅん}になるよ！
:::

## メソッドチェーン — つなげて使う

{配列|はいれつ}メソッドの{真|しん}の{力|ちから}は、つなげて使えることだよ！

```javascript runnable
let monsters = [
  { name: "スライム", level: 3 },
  { name: "ドラゴン", level: 50 },
  { name: "ゴブリン", level: 8 },
  { name: "コウモリ", level: 2 },
  { name: "オーク", level: 15 }
];

// レベル10以上のモンスターの名前を取得
let strongNames = monsters
  .filter(m => m.level >= 10)
  .map(m => m.name);

console.log(`強敵: ${strongNames.join(", ")}`);
```

```javascript runnable
let sales = [120, 80, 200, 50, 300, 90];

// 100以上の売上だけ合計する
let bigTotal = sales
  .filter(s => s >= 100)
  .reduce((sum, s) => sum + s, 0);

console.log(`大口売上の合計: ${bigTotal}`);
```

:::sensei
`filter` → `map` → `reduce` のように{繋|つな}げるのを「メソッドチェーン」というよ。
{複雑|ふくざつ}な{処理|しょり}もスッキリ書けるんだ！
:::

## {実践|じっせん}：{冒険者|ぼうけんしゃ}ギルドのデータ{分析|ぶんせき}

{学|まな}んだメソッドを{全部|ぜんぶ}組み合わせてみよう！

```javascript runnable
let adventurers = [
  { name: "アリス", level: 15, job: "剣士" },
  { name: "ボブ", level: 8, job: "魔法使い" },
  { name: "カルロス", level: 22, job: "剣士" },
  { name: "ダイアナ", level: 5, job: "僧侶" },
  { name: "エミリ", level: 18, job: "魔法使い" }
];

// レベル10以上の冒険者
let veterans = adventurers.filter(a => a.level >= 10);
console.log("ベテラン冒険者:");
veterans.forEach(a => console.log(`  ${a.name} Lv.${a.level}`));

// 剣士だけ取り出す
let swordsmen = adventurers.filter(a => a.job === "剣士");
console.log(`\n剣士: ${swordsmen.map(a => a.name).join(", ")}`);

// レベルの合計と平均
let totalLevel = adventurers.reduce((sum, a) => sum + a.level, 0);
let avgLevel = totalLevel / adventurers.length;
console.log(`\n平均レベル: ${avgLevel}`);

// レベル順にソート（高い順）
let ranked = [...adventurers].sort((a, b) => b.level - a.level);
console.log("\nランキング:");
ranked.forEach((a, i) => console.log(`  ${i + 1}位: ${a.name} Lv.${a.level}`));
```

:::student
メソッドを組み合わせるとこんなにいろんなことができるんだ！
:::

## まとめ

| メソッド | {説明|せつめい} | {戻|もど}り{値|ち} |
|---------|------|------|
| `map(fn)` | {全要素|ぜんようそ}を{変換|へんかん} | {新|あたら}しい{配列|はいれつ} |
| `filter(fn)` | {条件|じょうけん}で{絞|しぼ}る | {新|あたら}しい{配列|はいれつ} |
| `reduce(fn, init)` | {一|ひと}つの{値|あたい}にまとめる | {値|あたい} |
| `find(fn)` | {最初|さいしょ}の{一致|いっち}を{返|かえ}す | {要素|ようそ} or undefined |
| `findIndex(fn)` | {最初|さいしょ}の{一致|いっち}{位置|いち} | {数値|すうち} or -1 |
| `some(fn)` | {一|ひと}つでも{合|あ}うか | true / false |
| `every(fn)` | {全部|ぜんぶ}{合|あ}うか | true / false |
| `sort(fn)` | {並|なら}べ{替|か}え | {元|もと}の{配列|はいれつ}（{変更|へんこう}される） |

:::sensei
`map`、`filter`、`reduce` は{特|とく}によく使う{三大|さんだい}メソッドだよ。
チェーンでつなげて使えるようになれば、データ{処理|しょり}の{達人|たつじん}だ！
さあ、チャレンジで{実力|じつりょく}を{試|ため}してみよう！
:::
