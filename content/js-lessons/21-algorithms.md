---
title: "アルゴリズム入門"
slug: "algorithms"
order: 21
description: "効率よく問題を解こう"
world: "castle"
challenge:
  description: "binarySearch([1, 3, 5, 7, 9, 11], 7) でインデックスを表示しよう！"
  starterCode: "// binarySearch 関数を作ろう\n\n// console.log(binarySearch([1, 3, 5, 7, 9, 11], 7));\n"
  expectedOutput: "3"
  hints:
    - "let low = 0, high = arr.length - 1; で範囲を決めよう"
    - "let mid = Math.floor((low + high) / 2); で真ん中を求めよう"
    - "arr[mid] === target なら mid を返す、小さければ low = mid + 1、大きければ high = mid - 1"
    - "while (low <= high) のループで繰り返そう"
---

# アルゴリズム{入門|にゅうもん}

:::sensei
{城|しろ}の{最終|さいしゅう}{試練|しれん}にようこそ！
ここでは**アルゴリズム** — {問題|もんだい}を{効率|こうりつ}よく{解|と}く{方法|ほうほう} — を{学|まな}ぶよ。
{同|おな}じ{答|こた}えでも、{速|はや}い{方法|ほうほう}と{遅|おそ}い{方法|ほうほう}があるんだ！
:::

:::student
{速|はや}いとか{遅|おそ}いとか、{正|ただ}しければいいんじゃないの？
:::

:::sensei
データが10{個|こ}なら{気|き}にならないけど、100{万個|まんこ}になったら？
{良|よ}いアルゴリズムは{何秒|なんびょう}で{終|お}わるのに、{悪|わる}いアルゴリズムは{何時間|なんじかん}もかかることがあるよ！
:::

## {線形探索|せんけいたんさく}（Linear Search）

{一番|いちばん}シンプルな{探|さが}し{方|かた}。{先頭|せんとう}から{順番|じゅんばん}に{見|み}ていくよ。

```javascript runnable
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;  // 見つけた！インデックスを返す
    }
  }
  return -1;  // 見つからなかった
}

let monsters = ["スライム", "ゴブリン", "ドラゴン", "ゴーレム", "フェニックス"];

console.log(linearSearch(monsters, "ドラゴン"));   // 2
console.log(linearSearch(monsters, "ゴーレム"));   // 3
console.log(linearSearch(monsters, "ユニコーン")); // -1

// 何回比較したか数えてみよう
function linearSearchCount(arr, target) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    count++;
    if (arr[i] === target) {
      console.log(`${count}回の比較で発見！`);
      return i;
    }
  }
  console.log(`${count}回の比較で見つからず`);
  return -1;
}

linearSearchCount(monsters, "フェニックス"); // 最後にある→5回
linearSearchCount(monsters, "スライム");     // 最初にある→1回
```

:::hint
{線形探索|せんけいたんさく}は{最悪|さいあく}の{場合|ばあい}、{全部|ぜんぶ}を{調|しら}べる{必要|ひつよう}があるよ。
{要素|ようそ}が n{個|こ}なら、{最大|さいだい} n{回|かい}の{比較|ひかく}が{必要|ひつよう}だ。
:::

## {二分探索|にぶんたんさく}（Binary Search）

**{並|なら}び{替|か}え{済|ず}み**の{配列|はいれつ}なら、もっと{速|はや}く{探|さが}せる！{真|ま}ん{中|なか}を{見|み}て、{半分|はんぶん}ずつ{絞|しぼ}り{込|こ}む{方法|ほうほう}だ。

```javascript runnable
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      return mid;              // 見つけた！
    } else if (arr[mid] < target) {
      low = mid + 1;           // 右半分を探す
    } else {
      high = mid - 1;          // 左半分を探す
    }
  }

  return -1;  // 見つからなかった
}

let sorted = [1, 3, 5, 7, 9, 11, 13, 15];

console.log(binarySearch(sorted, 7));  // 3
console.log(binarySearch(sorted, 13)); // 6
console.log(binarySearch(sorted, 4));  // -1
```

:::student
{半分|はんぶん}ずつ{絞|しぼ}るから{速|はや}いんだ！
:::

:::sensei
その{通|とお}り！{辞書|じしょ}で{言葉|ことば}を{探|さが}すとき、{真|ま}ん{中|なか}を{開|ひら}いて
「もっと{前|まえ}かな？{後|うし}ろかな？」って{探|さが}すのと{同|おな}じだよ。
:::

## {比較|ひかく}してみよう

{線形探索|せんけいたんさく}と{二分探索|にぶんたんさく}で、{何回|なんかい}{比較|ひかく}するか{数|かぞ}えてみよう。

```javascript runnable
// 比較回数を数えるバージョン
function linearSearchSteps(arr, target) {
  let steps = 0;
  for (let i = 0; i < arr.length; i++) {
    steps++;
    if (arr[i] === target) return steps;
  }
  return steps;
}

function binarySearchSteps(arr, target) {
  let low = 0, high = arr.length - 1, steps = 0;
  while (low <= high) {
    steps++;
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return steps;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return steps;
}

// 1から100の配列で比較
let arr = [];
for (let i = 1; i <= 100; i++) arr.push(i);

let target = 73;
console.log(`配列サイズ: ${arr.length}`);
console.log(`線形探索: ${linearSearchSteps(arr, target)}回`);
console.log(`二分探索: ${binarySearchSteps(arr, target)}回`);

// 1から1000で比較
let bigArr = [];
for (let i = 1; i <= 1000; i++) bigArr.push(i);

target = 731;
console.log(`\n配列サイズ: ${bigArr.length}`);
console.log(`線形探索: ${linearSearchSteps(bigArr, target)}回`);
console.log(`二分探索: ${binarySearchSteps(bigArr, target)}回`);
```

:::sensei
{配列|はいれつ}が1000{個|こ}でも、{二分探索|にぶんたんさく}なら{最大|さいだい}10{回|かい}くらいで{見|み}つかる！
100{万個|まんこ}でも{最大|さいだい}20{回|かい}くらいだよ。
:::

## バブルソート（Bubble Sort）

{次|つぎ}は「{並|なら}べ{替|か}え」（ソート）のアルゴリズム。{隣同士|となりどうし}を{比|くら}べて{入|い}れ{替|か}えていくよ。

```javascript runnable
function bubbleSort(arr) {
  let result = [...arr]; // コピーして元を壊さない
  let n = result.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        // 隣同士を入れ替え
        let temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }
  return result;
}

let scores = [64, 34, 25, 12, 22, 11, 90];
console.log("ソート前:", scores.join(", "));
console.log("ソート後:", bubbleSort(scores).join(", "));

// モンスターをHPで並べ替え
let monsters = [
  { name: "ドラゴン", hp: 200 },
  { name: "スライム", hp: 30 },
  { name: "ゴーレム", hp: 150 },
  { name: "コウモリ", hp: 20 }
];

// HPでバブルソート
for (let i = 0; i < monsters.length - 1; i++) {
  for (let j = 0; j < monsters.length - 1 - i; j++) {
    if (monsters[j].hp > monsters[j + 1].hp) {
      let temp = monsters[j];
      monsters[j] = monsters[j + 1];
      monsters[j + 1] = temp;
    }
  }
}

for (let m of monsters) {
  console.log(`${m.name}: HP${m.hp}`);
}
```

:::hint
「バブル」は{泡|あわ}のこと。{大|おお}きい{値|あたい}が{泡|あわ}のように{上|うえ}に{浮|う}かんでいくイメージだよ。
{外側|そとがわ}のループ1{回|かい}ごとに、{一番|いちばん}{大|おお}きい{値|あたい}が{正|ただ}しい{位置|いち}に{確定|かくてい}するんだ。
:::

## {選択|せんたく}ソート（Selection Sort）

{最小値|さいしょうち}を{見|み}つけて{先頭|せんとう}に{置|お}く、を{繰|く}り{返|かえ}す{方法|ほうほう}。

```javascript runnable
function selectionSort(arr) {
  let result = [...arr];
  let n = result.length;

  for (let i = 0; i < n - 1; i++) {
    // i番目以降で最小値を探す
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }
    // 最小値を i 番目と入れ替え
    if (minIndex !== i) {
      let temp = result[i];
      result[i] = result[minIndex];
      result[minIndex] = temp;
    }
  }
  return result;
}

let data = [29, 10, 14, 37, 13];
console.log("ソート前:", data.join(", "));
console.log("ソート後:", selectionSort(data).join(", "));

// 動きを見てみよう
function selectionSortVisualize(arr) {
  let result = [...arr];
  let n = result.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (result[j] < result[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      let temp = result[i];
      result[i] = result[minIndex];
      result[minIndex] = temp;
    }
    console.log(`ステップ${i + 1}: [${result.join(", ")}]`);
  }
  return result;
}

selectionSortVisualize([64, 25, 12, 22, 11]);
```

:::student
{毎回|まいかい}{一番小|いちばんちい}さいのを{見|み}つけて{先頭|せんとう}に{持|も}ってくるんだね！
{手|て}でトランプを{並|なら}べるときみたい！
:::

## Big O {記法|きほう} — アルゴリズムの{速|はや}さを{表|あらわ}す

アルゴリズムの{効率|こうりつ}を{表|あらわ}す「Big O {記法|きほう}」を{覚|おぼ}えよう。

```javascript runnable
// O(1) - 定数時間: データ量に関係なく一瞬
function getFirst(arr) {
  return arr[0]; // 常に1回
}
console.log("O(1): 配列の先頭を取得 →", getFirst([10, 20, 30]));

// O(n) - 線形時間: データ量に比例
function sum(arr) {
  let total = 0;
  for (let num of arr) total += num; // n回ループ
  return total;
}
console.log("O(n): 合計を計算 →", sum([1, 2, 3, 4, 5]));

// O(n²) - 二乗時間: データ量の2乗に比例
function allPairs(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      count++; // 全ペアを数える
    }
  }
  return count;
}
console.log("O(n²): 5個のペア数 →", allPairs([1,2,3,4,5]));
console.log("O(n²): 10個のペア数 →", allPairs([1,2,3,4,5,6,7,8,9,10]));

// O(log n) - 対数時間: データが倍でも1回増えるだけ
function howManyHalves(n) {
  let count = 0;
  while (n > 1) {
    n = Math.floor(n / 2);
    count++;
  }
  return count;
}
console.log("O(log n): 100を何回半分に? →", howManyHalves(100));
console.log("O(log n): 1000を何回半分に? →", howManyHalves(1000));
```

:::sensei
{速|はや}い{順|じゅん}に{並|なら}べるとこうなるよ：
- **O(1)** → {最速|さいそく}！{何個|なんこ}あっても{一瞬|いっしゅん}
- **O(log n)** → {速|はや}い！{二分探索|にぶんたんさく}がこれ
- **O(n)** → {普通|ふつう}。{線形探索|せんけいたんさく}がこれ
- **O(n²)** → {遅|おそ}い。バブルソート、{選択|せんたく}ソートがこれ

データが{増|ふ}えるほど{差|さ}が{大|おお}きくなるよ！
:::

## {実感|じっかん}してみよう — {速度|そくど}{比較|ひかく}

{実際|じっさい}に{操作|そうさ}{回数|かいすう}を{比較|ひかく}してみよう。

```javascript runnable
// 各アルゴリズムの操作回数をシミュレーション
function compareAlgorithms(n) {
  console.log(`--- データ数: ${n} ---`);
  console.log(`O(1):     ${1}回`);
  console.log(`O(log n): ${Math.ceil(Math.log2(n))}回`);
  console.log(`O(n):     ${n}回`);
  console.log(`O(n²):    ${n * n}回`);
}

compareAlgorithms(10);
compareAlgorithms(100);
compareAlgorithms(1000);
```

:::hint
n=1000 のとき、O(log n) は{約|やく}10{回|かい}だけど O(n²) は100{万回|まんかい}！
{良|よ}いアルゴリズムを{選|えら}ぶことが{本当|ほんとう}に{大切|たいせつ}なのがわかるね。
:::

## {総合|そうごう}{練習|れんしゅう} — アルゴリズムを{組|く}み{合|あ}わせる

{学|まな}んだアルゴリズムを{組|く}み{合|あ}わせてみよう！

```javascript runnable
// ソートしてから二分探索で高速に検索
function sortAndSearch(arr, target) {
  // まずソート（ここではJSの組み込みsortを使用）
  let sorted = [...arr].sort((a, b) => a - b);
  console.log("ソート済み:", sorted.join(", "));

  // 二分探索で検索
  let low = 0, high = sorted.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (sorted[mid] === target) {
      console.log(`${target} はソート後のインデックス ${mid} にあります`);
      return mid;
    } else if (sorted[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  console.log(`${target} は見つかりませんでした`);
  return -1;
}

let treasures = [50, 10, 80, 30, 90, 20, 70];
sortAndSearch(treasures, 70);
sortAndSearch(treasures, 45);

// おまけ: どのアルゴリズムを使うべき？
console.log("\n=== アルゴリズム選択ガイド ===");
console.log("1回だけ検索 → 線形探索 O(n)");
console.log("何回も検索 → ソート O(n²) + 二分探索 O(log n)");
console.log("少ないデータ → 何でもOK");
console.log("大量データ → 効率が重要！");
```

:::sensei
{実|じつ}は、JavaScriptの `Array.sort()` はもっと{速|はや}いアルゴリズム（O(n log n)）を{使|つか}っているよ。
{今日|きょう}{学|まな}んだのは{基本|きほん}で、もっと{速|はや}い{方法|ほうほう}もたくさんあるんだ！
:::

## まとめ

:::sensei
アルゴリズム{入門|にゅうもん}のまとめだ！

- **{線形探索|せんけいたんさく}** O(n): {先頭|せんとう}から{順番|じゅんばん}に{探|さが}す
- **{二分探索|にぶんたんさく}** O(log n): {並|なら}び{替|か}え{済|ず}みで{半分|はんぶん}ずつ{絞|しぼ}る
- **バブルソート** O(n²): {隣同士|となりどうし}を{比|くら}べて{入|い}れ{替|か}え
- **{選択|せんたく}ソート** O(n²): {最小値|さいしょうち}を{見|み}つけて{先頭|せんとう}に{置|お}く
- **Big O**: アルゴリズムの{効率|こうりつ}を{表|あらわ}す{方法|ほうほう}

チャレンジで{二分探索|にぶんたんさく}を{実装|じっそう}してみよう！
:::

:::student
{同|おな}じ{問題|もんだい}でも{解|と}き{方|かた}で{速|はや}さがこんなに{変|か}わるなんて！
アルゴリズムって{大事|だいじ}なんだね！
:::
