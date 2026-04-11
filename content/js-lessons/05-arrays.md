---
title: "配列"
slug: "arrays"
order: 5
description: "アイテムを並べよう"
world: "forest"
challenge:
  description: "配列 [3, 1, 4, 1, 5] の合計を計算して表示しよう！"
  starterCode: "let numbers = [3, 1, 4, 1, 5];\nlet total = 0;\n\n// for...of で合計を計算しよう\n\n// 合計を表示しよう\n"
  expectedOutput: "14"
  hints:
    - "for (let num of numbers) でひとつずつ取り出そう"
    - "total += num; で足していこう"
    - "ループの後で console.log(total); しよう"
---

# {配列|はいれつ}

:::sensei
{冒険|ぼうけん}ではアイテムをたくさん{持|も}ち{歩|ある}くよね。
ポーション、{薬草|やくそう}、{鍵|かぎ}...これらを{一|ひと}つの{変数|へんすう}にまとめて入れられたら{便利|べんり}だよね？
:::

:::student
えっ、{一|ひと}つの{変数|へんすう}に{複数|ふくすう}のものを入れられるの？
:::

:::sensei
できるよ！それが「{配列|はいれつ}」なんだ。
アイテムを{順番|じゅんばん}に{並|なら}べて入れておける{特別|とくべつ}な箱だよ。
:::

## {配列|はいれつ}を作ろう

`[ ]` の中にデータを{並|なら}べると{配列|はいれつ}になるよ。

```javascript runnable
let items = ["ポーション", "毒消し草", "テント"];
console.log(items);
```

{数字|すうじ}の{配列|はいれつ}も作れるよ。

```javascript runnable
let scores = [80, 95, 60, 75, 90];
console.log(scores);
```

:::hint
{配列|はいれつ}は英語で **Array**（アレイ）というよ。
`[ ]` で{囲|かこ}んで、データをカンマ `,` で{区切|くぎ}るんだ。
:::

## {番号|ばんごう}（インデックス）でアクセス

{配列|はいれつ}の中身には{番号|ばんごう}がついているよ。
{大事|だいじ}なポイント：**{番号|ばんごう}は 0 からスタート**するんだ！

```javascript runnable
let items = ["ポーション", "毒消し草", "テント"];

console.log(items[0]);  // ポーション（1番目）
console.log(items[1]);  // 毒消し草（2番目）
console.log(items[2]);  // テント（3番目）
```

:::student
0からスタートなの！？ 1からじゃないんだ！
:::

:::sensei
そう、ここは{間違|まちが}えやすいポイントだね。
プログラミングでは{多|おお}くの{言語|げんご}で{番号|ばんごう}は 0 から{始|はじ}まるんだ。
{慣|な}れるまでは{気|き}をつけよう！
:::

```javascript runnable
let party = ["ゆうしゃ", "まほうつかい", "せんし", "そうりょ"];

console.log(`リーダー: ${party[0]}`);
console.log(`2番目: ${party[1]}`);
console.log(`3番目: ${party[2]}`);
console.log(`4番目: ${party[3]}`);
```

## {配列|はいれつ}の{長|なが}さ（length）

`.length` で{配列|はいれつ}に何個入っているか{調|しら}べられるよ。

```javascript runnable
let items = ["ポーション", "毒消し草", "テント"];
console.log(items.length);
```

```javascript runnable
let emptyBag = [];
console.log(emptyBag.length);
```

:::hint
`[]` は{空|から}の{配列|はいれつ}だよ。まだ{何|なに}も入っていない{状態|じょうたい}。
{冒険|ぼうけん}の{最初|さいしょ}は{空|から}のアイテム{袋|ぶくろ}みたいだね！
:::

## 中身を変えよう

{番号|ばんごう}を{指定|してい}して中身を入れかえられるよ。

```javascript runnable
let items = ["木の棒", "布の服", "薬草"];
console.log(items);

items[0] = "鉄の剣";
items[1] = "鉄の鎧";
console.log(items);
```

## push で{追加|ついか}しよう

`.push()` を使うと、{配列|はいれつ}の{最後|さいご}にデータを{追加|ついか}できるよ。

```javascript runnable
let items = ["ポーション"];
console.log(items);

items.push("毒消し草");
console.log(items);

items.push("テント");
console.log(items);
```

:::student
`push` で{後|うし}ろにどんどん{追加|ついか}できるんだ！
:::

## pop で{取|と}り出そう

`.pop()` を使うと、{最後|さいご}のデータを{取|と}り出せるよ。

```javascript runnable
let items = ["ポーション", "毒消し草", "テント"];
console.log(items);

let lastItem = items.pop();
console.log(`${lastItem}を使った！`);
console.log(items);
```

## {先頭|せんとう}の{操作|そうさ}: unshift と shift

{先頭|せんとう}にも{追加|ついか}・{取|と}り出しができるよ。

```javascript runnable
let queue = ["まほうつかい", "せんし"];
console.log(queue);

// 先頭に追加
queue.unshift("ゆうしゃ");
console.log(queue);

// 先頭を取り出し
let first = queue.shift();
console.log(`${first}が先頭から出た！`);
console.log(queue);
```

:::sensei
まとめると：
- `push()` → {最後|さいご}に{追加|ついか}
- `pop()` → {最後|さいご}から{取|と}り出す
- `unshift()` → {先頭|せんとう}に{追加|ついか}
- `shift()` → {先頭|せんとう}から{取|と}り出す
:::

## splice で{自由|じゆう}に{操作|そうさ}

`.splice()` を使うと、{好|す}きな{位置|いち}から{削除|さくじょ}や{追加|ついか}ができるよ。

```javascript runnable
let items = ["剣", "盾", "薬草", "鎧", "兜"];
console.log(items);

// 2番目から1個削除
items.splice(2, 1);
console.log(items);
```

```javascript runnable
let items = ["剣", "盾", "鎧"];
console.log(items);

// 1番目の位置に「弓」を挿入（削除は0個）
items.splice(1, 0, "弓");
console.log(items);
```

:::hint
`splice(開始位置, 削除する数, 追加するデータ)` という{形|かたち}だよ。
{削除|さくじょ}だけ・{追加|ついか}だけ・{両方同時|りょうほうどうじ}、どれもできる{万能|ばんのう}メソッドだよ！
:::

## {探|さが}す: includes と indexOf

{配列|はいれつ}の中に{特定|とくてい}のデータがあるか{調|しら}べられるよ。

```javascript runnable
let items = ["ポーション", "毒消し草", "テント"];

console.log(items.includes("ポーション"));   // true
console.log(items.includes("エリクサー"));    // false
```

```javascript runnable
let items = ["ポーション", "毒消し草", "テント"];

console.log(items.indexOf("毒消し草"));   // 1（見つかった位置）
console.log(items.indexOf("エリクサー")); // -1（見つからない）
```

:::student
`includes` は「あるかないか」を `true` / `false` で{教|おし}えてくれて、
`indexOf` は「どこにあるか」を{番号|ばんごう}で{教|おし}えてくれるんだね！
:::

## for...of で{全部|ぜんぶ}見る

{配列|はいれつ}の中身を{全部|ぜんぶ}{順番|じゅんばん}に見るなら `for...of` が{便利|べんり}だよ。

```javascript runnable
let party = ["ゆうしゃ", "まほうつかい", "せんし", "そうりょ"];

for (let member of party) {
  console.log(`${member}が仲間にいる！`);
}
```

## for ループでインデックスも使う

{番号|ばんごう}（インデックス）も{一緒|いっしょ}に使いたいときは、{普通|ふつう}の `for` ループを使おう。

```javascript runnable
let party = ["ゆうしゃ", "まほうつかい", "せんし", "そうりょ"];

for (let i = 0; i < party.length; i++) {
  console.log(`${i + 1}番目: ${party[i]}`);
}
```

## {実践|じっせん}：アイテム{管理|かんり}

{学|まな}んだことを{全部|ぜんぶ}使って、アイテムを{管理|かんり}してみよう！

```javascript runnable
let bag = ["ポーション", "薬草"];
console.log("=== 冒険スタート ===");
console.log(bag);

// アイテムを拾った！
bag.push("鍵");
bag.push("地図");
console.log("アイテムを拾った！");
console.log(bag);

// ポーションを使った
if (bag.includes("ポーション")) {
  let idx = bag.indexOf("ポーション");
  bag.splice(idx, 1);
  console.log("ポーションを使った！");
}
console.log(bag);

// 持ち物を確認
console.log(`\n持ち物: ${bag.length}個`);
for (let item of bag) {
  console.log(`- ${item}`);
}
```

## {配列|はいれつ}で{合計|ごうけい}を出す

{数字|すうじ}の{配列|はいれつ}の{合計|ごうけい}を出すのは、よく使うパターンだよ。

```javascript runnable
let damages = [25, 30, 18, 42, 35];
let total = 0;

for (let d of damages) {
  total += d;
}

console.log(`合計ダメージ: ${total}`);
```

:::sensei
`total += d` は `total = total + d` と{同|おな}じだよ。
この「{少|すこ}しずつ{足|た}していく」パターンはとてもよく使うから{覚|おぼ}えておこう！
チャレンジでも使うよ。{挑戦|ちょうせん}してみてね！
:::

## まとめ

- `[ ]` で{配列|はいれつ}を作る
- インデックスは **0** から{始|はじ}まる
- `.length` で{個数|こすう}を{調|しら}べる
- `push()` / `pop()` で{末尾|まつび}に{追加|ついか}/{取|と}り出し
- `unshift()` / `shift()` で{先頭|せんとう}に{追加|ついか}/{取|と}り出し
- `splice()` で{自由|じゆう}に{削除|さくじょ}・{挿入|そうにゅう}
- `includes()` で{存在|そんざい}チェック、`indexOf()` で{位置|いち}を{調|しら}べる
- `for...of` で{全部|ぜんぶ}のデータを{順番|じゅんばん}に{処理|しょり}
