---
title: "スプレッドとレスト"
slug: "spread-rest"
order: 14
description: "広げたり集めたり"
world: "mountain"
challenge:
  description: "2つの配列 [1,2,3] と [4,5,6] をスプレッドで結合して表示しよう！"
  starterCode: "let a = [1, 2, 3];\nlet b = [4, 5, 6];\n// スプレッドで結合しよう\n"
  expectedOutput: "1,2,3,4,5,6"
  hints:
    - "let combined = [...a, ...b]; でスプレッドを使おう"
    - "console.log(combined.toString()); で表示しよう"
    - "toString() は配列をカンマ区切りの文字列にするよ"
---

# スプレッドとレスト

:::sensei
{前回|ぜんかい}の{分割代入|ぶんかつだいにゅう}で `...` を{少|すこ}し見たよね。
{今回|こんかい}はこの `...`（3つのドット）を{徹底的|てっていてき}に{学|まな}ぶよ！
「{広|ひろ}げる」のがスプレッド、「{集|あつ}める」のがレストだ。
:::

:::student
{同|おな}じ `...` なのに2つの{意味|いみ}があるの？
:::

:::sensei
そう！{使|つか}う{場所|ばしょ}で{意味|いみ}が{変|か}わるんだ。
{宝箱|たからばこ}を{開|あ}けてアイテムを{広|ひろ}げるのがスプレッド、
{散|ち}らばったアイテムを{袋|ふくろ}に{集|あつ}めるのがレスト — そうイメージしよう！
:::

## スプレッド — {配列|はいれつ}を{広|ひろ}げる

`...配列` で{配列|はいれつ}の{中身|なかみ}を{展開|てんかい}できるよ。

```javascript runnable
let frontLine = ["せんし", "ゆうしゃ"];
let backLine = ["まほうつかい", "そうりょ"];

// スプレッドで結合！
let fullParty = [...frontLine, ...backLine];
console.log(fullParty);
```

:::hint
`...配列名` と書くと、`[ ]` の中で{配列|はいれつ}の{中身|なかみ}が「バラバラ」に{展開|てんかい}されるよ。
`[...a, ...b]` は a の{中身|なかみ}と b の{中身|なかみ}が{並|なら}んだ{新|あたら}しい{配列|はいれつ}になるんだ。
:::

{間|あいだ}に{別|べつ}の{要素|ようそ}を{挟|はさ}むこともできるよ。

```javascript runnable
let basics = ["ポーション", "薬草"];
let specials = ["エリクサー"];

let allItems = [...basics, "テント", ...specials, "鍵"];
console.log(allItems);
```

:::student
{配列|はいれつ}と{普通|ふつう}の{値|あたい}を{自由|じゆう}に{混|ま}ぜられるんだ！
:::

## {配列|はいれつ}のコピー

スプレッドを使うと{配列|はいれつ}のコピーが{簡単|かんたん}にできるよ。

```javascript runnable
let original = [1, 2, 3];

// コピーを作る
let copy = [...original];
copy.push(4);

console.log(`元: ${original}`);
console.log(`コピー: ${copy}`);
```

:::sensei
{普通|ふつう}に `let copy = original` と書くと、{同|おな}じ{配列|はいれつ}を{指|さ}してしまって{片方|かたほう}を{変|か}えるともう{片方|かたほう}も{変|か}わるんだ。
`[...original]` なら{独立|どくりつ}したコピーが作れるよ。
:::

```javascript runnable
// コピーしないとこうなる（注意！）
let a = [1, 2, 3];
let b = a;       // 同じ配列を指している！
b.push(4);
console.log(`a: ${a}`);  // a も変わってしまう！

// スプレッドでコピーすれば安全
let c = [1, 2, 3];
let d = [...c];   // 独立したコピー
d.push(4);
console.log(`c: ${c}`);  // c は変わらない！
```

## スプレッド — オブジェクトを{広|ひろ}げる

オブジェクトでもスプレッドが使えるよ。

```javascript runnable
let baseStats = { hp: 100, mp: 50 };
let bonus = { attack: 30, defense: 20 };

// オブジェクトを合体！
let fullStats = { ...baseStats, ...bonus };
console.log(fullStats);
```

{後|あと}から書いた{方|ほう}が{優先|ゆうせん}されるよ。

```javascript runnable
let defaults = { volume: 50, brightness: 80, language: "ja" };
let userSettings = { volume: 30 };

// デフォルト設定にユーザー設定を上書き
let settings = { ...defaults, ...userSettings };
console.log(settings);
```

:::hint
{同|おな}じプロパティがあったら、{後|あと}に書いた{方|ほう}が{勝|か}つよ。
「{最初|さいしょ}にデフォルト{値|ち}を{広|ひろ}げて、{後|あと}からカスタム{値|ち}で{上書|うわが}き」というパターンはとてもよく使うんだ。
:::

## オブジェクトのコピーと{更新|こうしん}

{元|もと}のオブジェクトを{変|か}えずに「{一部|いちぶ}だけ{変|か}えたコピー」を作れるよ。

```javascript runnable
let hero = { name: "ゆうしゃ", level: 10, hp: 100 };

// レベルアップ！（元のオブジェクトは変えない）
let leveledUp = { ...hero, level: hero.level + 1 };

console.log(`元: ${hero.name} Lv.${hero.level}`);
console.log(`後: ${leveledUp.name} Lv.${leveledUp.level}`);
```

:::student
{元|もと}のデータを{壊|こわ}さずに{新|あたら}しいバージョンを作れるんだ！
:::

## レストパラメータ — {引数|ひきすう}を{集|あつ}める

{関数|かんすう}の{引数|ひきすう}で `...` を使うと、{複数|ふくすう}の{引数|ひきすう}をまとめて{配列|はいれつ}にできるよ。

```javascript runnable
function sumAll(...numbers) {
  let total = 0;
  for (let n of numbers) {
    total += n;
  }
  return total;
}

console.log(sumAll(1, 2, 3));
console.log(sumAll(10, 20, 30, 40, 50));
```

:::sensei
スプレッドは「{広|ひろ}げる」、レストは「{集|あつ}める」。
{関数|かんすう}の{引数|ひきすう}で `...` を使うのがレストパラメータだよ。
いくつ{引数|ひきすう}を{渡|わた}しても{全部|ぜんぶ}{受|う}け{取|と}れるんだ。
:::

{固定|こてい}の{引数|ひきすう}とレストを組み合わせることもできるよ。

```javascript runnable
function logParty(leader, ...members) {
  console.log(`リーダー: ${leader}`);
  console.log(`メンバー: ${members.join(", ")}`);
  console.log(`合計: ${members.length + 1}人`);
}

logParty("ゆうしゃ", "まほうつかい", "せんし", "そうりょ");
```

## {実用|じつよう}パターン：{配列|はいれつ}の{操作|そうさ}

スプレッドを使うと{配列|はいれつ}の{操作|そうさ}がスッキリ書けるよ。

```javascript runnable
let items = ["剣", "盾", "薬草"];

// 先頭に追加
let withHelmet = ["兜", ...items];
console.log(withHelmet);

// 末尾に追加
let withBoots = [...items, "ブーツ"];
console.log(withBoots);

// 途中に挿入（2番目の位置に）
let withBow = [...items.slice(0, 2), "弓", ...items.slice(2)];
console.log(withBow);
```

## {実践|じっせん}：{装備|そうび}マネージャー

{学|まな}んだことを{全部|ぜんぶ}使ってみよう！

```javascript runnable
// 基本装備と特殊装備を合体
let basicGear = { weapon: "鉄の剣", armor: "革の鎧" };
let specialGear = { accessory: "勇気の指輪" };
let fullGear = { ...basicGear, ...specialGear };

console.log("=== 装備一覧 ===");
for (let [slot, item] of Object.entries(fullGear)) {
  console.log(`${slot}: ${item}`);
}

// パーティ合流
let partyA = ["アリス", "ボブ"];
let partyB = ["カルロス"];
let bigParty = [...partyA, ...partyB];
console.log(`\nパーティ: ${bigParty.join(", ")}`);

// ステータスの更新（元データを保持）
let hero = { name: "アリス", level: 10, hp: 100, mp: 50 };
let afterBattle = { ...hero, hp: hero.hp - 30, mp: hero.mp - 10 };
console.log(`\n戦闘後: HP ${afterBattle.hp}, MP ${afterBattle.mp}`);
```

:::student
スプレッドを使うと{元|もと}のデータを{安全|あんぜん}に{保|たも}ったまま{新|あたら}しいデータが作れるんだね！
:::

:::sensei
そのとおり！
スプレッド（`...`）は{現代|げんだい}の JavaScript で{本当|ほんとう}によく使う{書|か}き{方|かた}だよ。
「{広|ひろ}げる」と「{集|あつ}める」をマスターすれば、コードがグッとスッキリするんだ。
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::

## まとめ

- `[...a, ...b]` — {配列|はいれつ}を{広|ひろ}げて{結合|けつごう}
- `{...obj}` — オブジェクトを{広|ひろ}げてコピー・マージ
- `[...arr]` — {配列|はいれつ}のコピー
- `{...obj, key: value}` — {一部|いちぶ}{変更|へんこう}したコピー
- `function(...args)` — レストパラメータで{引数|ひきすう}を{集|あつ}める
- {後|あと}に書いた{方|ほう}が{優先|ゆうせん}される（オブジェクトのマージ）
