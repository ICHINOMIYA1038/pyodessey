---
title: "数と文字"
slug: "numbers-and-strings"
order: 2
description: "数字と言葉をあやつろう"
world: "forest"
challenge:
  description: "変数 name に \"ゆうしゃ\" を入れて「こんにちは、ゆうしゃ！」と表示しよう！"
  starterCode: "// 変数 name に \"ゆうしゃ\" を入れよう\n\n// テンプレートリテラルで表示しよう\n"
  expectedOutput: "こんにちは、ゆうしゃ！"
  hints:
    - "let name = \"ゆうしゃ\"; で変数を作ろう"
    - "console.log(`こんにちは、${name}！`); と書いてみよう"
---

# {数|かず}と{文字|もじ}

:::sensei
{前回|ぜんかい}は{変数|へんすう}を{学|まな}んだね。
今日は{数字|すうじ}と{文字列|もじれつ}をもっと深く{学|まな}ぶよ！
:::

:::student
{計算|けいさん}したり、{文字|もじ}をくっつけたりできるんだよね？
:::

:::sensei
そう！{冒険|ぼうけん}で{必要|ひつよう}な{計算|けいさん}や、
{仲間|なかま}に{話|はな}しかけるための{文字列|もじれつ}を{自由|じゆう}に使えるようになろう！
:::

## {四則演算|しそくえんざん}

まずは{基本|きほん}の{計算|けいさん}から。JavaScriptでは{普通|ふつう}の{計算|けいさん}が全部できるよ。

```javascript runnable
console.log(10 + 3);   // たし算 → 13
console.log(10 - 3);   // ひき算 → 7
console.log(10 * 3);   // かけ算 → 30
console.log(10 / 3);   // わり算 → 3.333...
```

:::student
わり算で{小数|しょうすう}が出るんだ！
:::

## あまりとべき{乗|じょう}

{特別|とくべつ}な{計算|けいさん}もあるよ。

```javascript runnable
console.log(10 % 3);   // あまり → 1
console.log(2 ** 3);   // べき乗（2の3乗）→ 8
console.log(5 ** 2);   // 5の2乗 → 25
```

:::hint
`%` は「あまり」を求める{演算子|えんざんし}だよ。
`10 % 3` は「10 ÷ 3 のあまり = 1」。
{偶数|ぐうすう}か{奇数|きすう}かを{調|しら}べるときにも使えるんだ！
:::

```javascript runnable
// 偶数か奇数か調べよう
let number = 7;
console.log(number % 2);  // 1 なら奇数、0 なら偶数
```

## {計算|けいさん}の{順番|じゅんばん}

{算数|さんすう}と{同|おな}じで、かけ算・わり算はたし算・ひき算より先にやるよ。

```javascript runnable
console.log(2 + 3 * 4);     // 14（3 * 4 が先）
console.log((2 + 3) * 4);   // 20（カッコが先）
```

:::sensei
カッコ `()` を使えば、先にやりたい{計算|けいさん}を{指定|してい}できるよ。
{算数|さんすう}のルールと{同|おな}じだね！
:::

## {変数|へんすう}を使った{計算|けいさん}

{冒険|ぼうけん}っぽい{計算|けいさん}をしてみよう！

```javascript runnable
let attack = 25;
let weaponBonus = 10;
let enemyDefense = 15;

let damage = (attack + weaponBonus) - enemyDefense;
console.log(damage);
```

:::student
{攻撃力|こうげきりょく}と{武器|ぶき}ボーナスを{足|た}して、{敵|てき}の{防御力|ぼうぎょりょく}を{引|ひ}くんだね！
:::

## {文字列|もじれつ}を作ろう

{文字列|もじれつ}は `"` か `'` で{囲|かこ}んで作るよ。どちらでもOK！

```javascript runnable
let greeting = "こんにちは";
let name = 'ゆうしゃ';
console.log(greeting);
console.log(name);
```

:::hint
`"` と `'` に{違|ちが}いはほとんどないよ。
チームで書くときはどちらかに{統一|とういつ}するのがいいね。
:::

## {文字列|もじれつ}をつなげよう（{連結|れんけつ}）

`+` を使うと{文字列|もじれつ}どうしをくっつけられるよ。

```javascript runnable
let first = "こんにちは";
let second = "せかい";
console.log(first + second);
```

:::student
あれ、くっついたけど{間|あいだ}にスペースがない...
:::

```javascript runnable
let first = "こんにちは";
let second = "せかい";
console.log(first + "、" + second + "！");
```

:::sensei
{文字列|もじれつ}を `+` でつなげるときは、スペースや{記号|きごう}も自分で入れるんだ。
でも、もっと{便利|べんり}な方法があるよ！
:::

## テンプレートリテラル

バッククォート（`` ` ``）を使うと、{文字列|もじれつ}の中に{変数|へんすう}を{直接|ちょくせつ}入れられるよ！
これを**テンプレートリテラル**というんだ。

```javascript runnable
let name = "ゆうしゃ";
let level = 5;
console.log(`${name}のレベルは${level}です！`);
```

:::sensei
`${ }` の中に{変数|へんすう}を書くと、その{値|あたい}が{文字列|もじれつ}に入るんだ。
`+` でつなげるよりずっと読みやすいよね！
:::

{計算|けいさん}を `${ }` の中でやることもできるよ。

```javascript runnable
let price = 300;
let count = 3;
console.log(`合計は${price * count}ゴールドです`);
```

:::student
{計算|けいさん}もそのまま入れられるの！？ {便利|べんり}すぎる！
:::

## テンプレートリテラルでいろいろ{表示|ひょうじ}しよう

{冒険者|ぼうけんしゃ}のステータスを{表示|ひょうじ}してみよう！

```javascript runnable
let name = "ゆうしゃ";
let hp = 100;
let mp = 50;
let gold = 1200;

console.log(`=== ${name}のステータス ===`);
console.log(`HP: ${hp}`);
console.log(`MP: ${mp}`);
console.log(`ゴールド: ${gold}`);
```

## {型変換|かたへんかん}のワナ

ここで{注意|ちゅうい}！{数字|すうじ}と{文字列|もじれつ}を `+` するとどうなるかな？

```javascript runnable
console.log(5 + 3);        // 8（数字 + 数字）
console.log("5" + "3");    // "53"（文字列 + 文字列）
console.log(5 + "3");      // "53"（文字列になる！）
console.log("5" - 3);      // 2（数字になる！）
```

:::student
えーっ！ `5 + "3"` が `"53"` になるの！？
でも `"5" - 3` は `2` になるの！？
:::

:::sensei
これがJavaScriptの{面白|おもしろ}いところ...というかワナだね。
`+` は{文字列|もじれつ}の{連結|れんけつ}にも使うから、{文字列|もじれつ}が{混|ま}ざると{連結|れんけつ}になるんだ。
でも `-` は{計算|けいさん}にしか使わないから、{数字|すうじ}に{変換|へんかん}されるんだよ。
:::

## {数字|すうじ}に{変換|へんかん}する

{文字列|もじれつ}を{数字|すうじ}に変えたいときは `Number()` を使うよ。

```javascript runnable
let strNumber = "42";
let realNumber = Number(strNumber);

console.log(strNumber + 10);     // "4210"（文字列の連結）
console.log(realNumber + 10);    // 52（数字の計算）
```

```javascript runnable
console.log(Number("100"));    // 100
console.log(Number("abc"));    // NaN（変換できない！）
```

:::hint
`NaN` は「Not a Number」（{数字|すうじ}じゃない）という{意味|いみ}だよ。
{変換|へんかん}できない{文字列|もじれつ}を `Number()` に入れるとこうなるんだ。
:::

## {文字列|もじれつ}に{変換|へんかん}する

{逆|ぎゃく}に、{数字|すうじ}を{文字列|もじれつ}にしたいときは `String()` を使うよ。

```javascript runnable
let num = 42;
let str = String(num);

console.log(typeof num);   // number
console.log(typeof str);   // string
console.log(str);           // "42"
```

## まとめ

:::sensei
今日{学|まな}んだことをおさらいしよう！
:::

- {四則演算|しそくえんざん}: `+` `-` `*` `/`、あまり: `%`、べき{乗|じょう}: `**`
- {文字列|もじれつ}は `"` か `'` で{囲|かこ}む
- テンプレートリテラル（`` ` ``）で `${変数}` を{埋|う}め{込|こ}める
- {数字|すうじ}と{文字列|もじれつ}を `+` すると{文字列|もじれつ}になる（{要注意|ようちゅうい}！）
- `Number()` で{数字|すうじ}に、`String()` で{文字列|もじれつ}に{変換|へんかん}できる

:::student
テンプレートリテラル、すっごく{便利|べんり}だね！
チャレンジやってみる！
:::
