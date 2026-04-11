---
title: "繰り返し"
slug: "loops"
order: 4
description: "何度もやってみよう"
world: "forest"
challenge:
  description: "1から10までの合計を計算して表示しよう！"
  starterCode: "let total = 0;\n\n// for文で1から10まで足そう\n\n// 合計を表示しよう\n"
  expectedOutput: "55"
  hints:
    - "for (let i = 1; i <= 10; i++) と書こう"
    - "ループの中で total = total + i; または total += i; としよう"
    - "ループの後で console.log(total); で表示しよう"
---

# {繰|く}り{返|かえ}し

:::sensei
{冒険|ぼうけん}では{同|おな}じことを{何度|なんど}もやることがあるよね。
たとえば「{敵|てき}を10{回|かい}{攻撃|こうげき}する」とか「アイテムを{全部|ぜんぶ}チェックする」とか。
今日は「ループ」を使って{繰|く}り{返|かえ}しを{学|まな}ぶよ！
:::

:::student
10{回|かい}やるなら、10{回|かい}書けばいいんじゃないの？
:::

:::sensei
もし100{回|かい}だったら？1000{回|かい}だったら？
ループを使えば、{何回|なんかい}でもかんたんに{繰|く}り{返|かえ}せるんだ！
:::

## for ループ

{一番|いちばん}よく使うのが `for` ループだよ。

```javascript runnable
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

:::sensei
`for` ループには3つの{部分|ぶぶん}があるよ。

1. `let i = 1` → スタート（{最初|さいしょ}の{値|あたい}）
2. `i <= 5` → {条件|じょうけん}（これが `true` の{間|あいだ}{続|つづ}ける）
3. `i++` → {更新|こうしん}（1{回|かい}ごとに i を1{増|ふ}やす）
:::

:::hint
`i++` は `i = i + 1` と{同|おな}じ{意味|いみ}だよ。
1ずつ{増|ふ}やす{省略形|しょうりゃくけい}なんだ。
:::

## カウントダウンもできる

{数|かず}を{減|へ}らしていくこともできるよ。

```javascript runnable
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
console.log("発射！");
```

:::student
`i--` で1ずつ{減|へ}らしてるんだね。カウントダウンだ！
:::

## 2ずつ{増|ふ}やす

{増|ふ}やす{数|かず}を変えることもできるよ。

```javascript runnable
for (let i = 0; i <= 10; i += 2) {
  console.log(i);
}
```

:::hint
`i += 2` は `i = i + 2` と{同|おな}じ{意味|いみ}。
{偶数|ぐうすう}だけを{表示|ひょうじ}できたね！
:::

## ループで{計算|けいさん}する

ループの中で{計算|けいさん}を{積|つ}み{重|かさ}ねることができるよ。

```javascript runnable
let total = 0;

for (let i = 1; i <= 5; i++) {
  total = total + i;
  console.log(`${i}を足して、合計は${total}`);
}

console.log(`最終合計: ${total}`);
```

:::sensei
{変数|へんすう} `total` に{少|すこ}しずつ{足|た}していくんだ。
これは「{累積|るいせき}」というテクニックで、とてもよく使うよ！
:::

## while ループ

`while` は、{条件|じょうけん}が `true` の{間|あいだ}ずっと{繰|く}り{返|かえ}すよ。

```javascript runnable
let hp = 50;

while (hp > 0) {
  console.log(`HP: ${hp}`);
  hp = hp - 15;
}

console.log("たおれた...");
```

:::student
HPが0{以下|いか}になるまで{繰|く}り{返|かえ}すんだね。
:::

:::sensei
`while` は「{何回|なんかい}{繰|く}り{返|かえ}すかわからないとき」に{便利|べんり}だよ。
でも{気|き}をつけて！{条件|じょうけん}がずっと `true` だと{永遠|えいえん}に止まらなくなるよ。
:::

## for...of ループ

{配列|はいれつ}（リスト）の中身を{順番|じゅんばん}に取り出すときは `for...of` が{便利|べんり}だよ。
{配列|はいれつ}は{次|つぎ}のレッスンでくわしく{学|まな}ぶけど、ちょっと先取りしよう！

```javascript runnable
let items = ["ポーション", "毒消し草", "テント"];

for (let item of items) {
  console.log(item);
}
```

:::hint
`for...of` は「リストの中身を{一|ひと}つずつ取り出す」ループだよ。
{数|かず}を{数|かぞ}えなくていいから、かんたんだね！
:::

```javascript runnable
let scores = [80, 95, 60, 75, 90];
let total = 0;

for (let score of scores) {
  total += score;
}

console.log(`合計: ${total}`);
console.log(`平均: ${total / scores.length}`);
```

## break でループを止める

{途中|とちゅう}でループを止めたいときは `break` を使うよ。

```javascript runnable
for (let i = 1; i <= 10; i++) {
  if (i === 6) {
    console.log("6を見つけた！ストップ！");
    break;
  }
  console.log(i);
}
```

:::sensei
`break` を使うと、その{時点|じてん}でループから{抜|ぬ}け出せるんだ。
{探|さが}しものが見つかったら止める、みたいな使い方ができるよ。
:::

## continue でスキップ

{今|いま}の{回|かい}だけスキップして{次|つぎ}に{進|すす}むのが `continue` だよ。

```javascript runnable
for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0) {
    continue;  // 3の倍数はスキップ
  }
  console.log(i);
}
```

:::student
3、6、9がスキップされた！
`continue` は「この{回|かい}はとばして{次|つぎ}へ」ってことだね。
:::

## ネスト（{入|い}れ{子|こ}）ループ

ループの中にループを書くこともできるよ。

```javascript runnable
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i}-${j}`);
  }
}
```

:::sensei
{外側|そとがわ}のループが1{回|かい}まわるごとに、{内側|うちがわ}のループが{全部|ぜんぶ}まわるんだ。
{九九|くく}の{表|ひょう}を作るときなどに使えるよ！
:::

{九九|くく}を作ってみよう！

```javascript runnable
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}
```

## {実践|じっせん}：{冒険|ぼうけん}シミュレーション

{学|まな}んだことを組み合わせてみよう！

```javascript runnable
let heroHp = 100;
let monsterHp = 80;
let turn = 0;

while (heroHp > 0 && monsterHp > 0) {
  turn++;
  let heroDamage = 15;
  let monsterDamage = 10;

  monsterHp -= heroDamage;
  heroHp -= monsterDamage;

  console.log(`ターン${turn}: 勇者HP=${heroHp} モンスターHP=${monsterHp}`);

  if (monsterHp <= 0) {
    console.log("勇者の勝ち！");
    break;
  }
  if (heroHp <= 0) {
    console.log("勇者は倒れた...");
    break;
  }
}
```

## まとめ

- `for` ループ: {回数|かいすう}がわかっているとき
- `while` ループ: {条件|じょうけん}が `true` の{間|あいだ}{続|つづ}ける
- `for...of`: リストの中身を{順番|じゅんばん}に取り出す
- `break`: ループを{途中|とちゅう}で止める
- `continue`: {今|いま}の{回|かい}をスキップ
- ネストループ: ループの中にループ

:::sensei
ループは{何度|なんど}も使う{超重要|ちょうじゅうよう}なテクニックだよ。
チャレンジで{実際|じっさい}に使ってみよう！
:::
