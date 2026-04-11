---
title: "変数ってなに？"
slug: "variables"
order: 1
description: "宝箱に名前をつけよう"
world: "forest"
challenge:
  description: "変数 x に 5 を入れて、x * 3 の結果を表示しよう！"
  starterCode: "// 変数 x を作って 5 を入れよう\n\n// x * 3 の結果を console.log で表示しよう\n"
  expectedOutput: "15"
  hints:
    - "let x = 5; で変数を作ろう"
    - "console.log(x * 3); で結果を表示しよう"
---

# {変数|へんすう}ってなに？

:::sensei
ようこそ、{冒険者|ぼうけんしゃ}！
今日は「{変数|へんすう}」というとても大切なものを{学|まな}ぶよ。
{変数|へんすう}は、プログラミングの{基本中|きほんちゅう}の{基本|きほん}なんだ！
:::

:::student
{変数|へんすう}...？
なんだかむずかしそう...
:::

:::sensei
{大丈夫|だいじょうぶ}！
{変数|へんすう}は、ものを入れておく{宝箱|たからばこ}みたいなものだよ。
{宝箱|たからばこ}に好きな名前をつけて、中に{数字|すうじ}や{言葉|ことば}を入れるんだ！
:::

## {宝箱|たからばこ}を作ってみよう

{変数|へんすう}を作るには `let` というキーワードを使うよ。
`let 名前 = 中身;` という{形|かたち}で書くんだ。

```javascript runnable
let takara = "ダイヤモンド";
console.log(takara);
```

:::student
おおっ！ `takara` って名前の箱に `"ダイヤモンド"` が入ったんだね！
:::

:::sensei
そのとおり！
`console.log()` を使うと、箱の中身を{画面|がめん}に{表示|ひょうじ}できるよ。
これはプログラミングでとってもよく使う{命令|めいれい}なんだ。
:::

## {数字|すうじ}を入れてみよう

{宝箱|たからばこ}には{文字|もじ}だけじゃなく、{数字|すうじ}も入れられるよ！

```javascript runnable
let level = 1;
let hp = 100;
console.log(level);
console.log(hp);
```

{数字|すうじ}を入れるときは、`"` で{囲|かこ}まなくてOKだよ。
`"` をつけると{文字列|もじれつ}（テキスト）になっちゃうから{気|き}をつけてね。

## いろんな{種類|しゅるい}のデータ

JavaScriptで{宝箱|たからばこ}に入れられるものは{主|おも}に3{種類|しゅるい}あるよ。

```javascript runnable
let namae = "ゆうしゃ";     // 文字列（もじれつ）
let level = 10;             // 数字（すうじ）
let isStrong = true;        // 真偽値（しんぎち）

console.log(namae);
console.log(level);
console.log(isStrong);
```

- **{文字列|もじれつ}**（string）: `"` か `'` で{囲|かこ}んだテキスト
- **{数字|すうじ}**（number）: そのまま{数字|すうじ}を書く
- **{真偽値|しんぎち}**（boolean）: `true`（ほんとう）か `false`（うそ）だけ

:::hint
`typeof` を使うと、データの{種類|しゅるい}を{調|しら}べられるよ！
:::

```javascript runnable
let namae = "ゆうしゃ";
let level = 10;
let isStrong = true;

console.log(typeof namae);
console.log(typeof level);
console.log(typeof isStrong);
```

:::student
`string`、`number`、`boolean` って{表示|ひょうじ}された！
これがデータの{種類|しゅるい}なんだね。
:::

## 箱の中身を変えよう

`let` で作った{宝箱|たからばこ}は、{後|あと}から中身を入れかえられるよ！

```javascript runnable
let hp = 100;
console.log(hp);

hp = 75;
console.log(hp);

hp = hp - 25;
console.log(hp);
```

:::sensei
2{行目|ぎょうめ}の `hp = 75` には `let` がないよね。
もう箱は作ってあるから、`let` なしで中身だけ入れかえるんだ。
`hp = hp - 25` は「{今|いま}の hp から 25 を{引|ひ}いた{値|あたい}を、hp に{戻|もど}す」という{意味|いみ}だよ。
:::

## const は変えられない箱

`const` で作った箱は、一度入れたら中身を変えられないよ。

```javascript runnable
const maxHp = 100;
console.log(maxHp);

// 下の行のコメントを外すとエラーになるよ！
// maxHp = 200;
```

:::student
えっ、変えられない箱なんて{意味|いみ}あるの？
:::

:::sensei
あるよ！{絶対|ぜったい}に変わらない{値|あたい}には `const` を使うんだ。
たとえばゲームの{最大|さいだい}HPとか、{消費税|しょうひぜい}の{率|りつ}とか。
うっかり変えてしまうミスを{防|ふせ}げるんだよ。
:::

```javascript runnable
const gameName = "JSOdessey";
const maxLevel = 99;

console.log(gameName);
console.log(maxLevel);
```

## var について

{昔|むかし}のJavaScriptでは `var` というキーワードも使われていたよ。

```javascript runnable
var oldStyle = "むかしの書き方";
console.log(oldStyle);
```

:::hint
{今|いま}は `let` と `const` を使おう！
`var` は{古|ふる}い書き方で、ちょっとクセがあるんだ。
{他|ほか}の{人|ひと}のコードで見かけることがあるかもしれないけど、
自分で書くときは `let` と `const` でOKだよ。
:::

## {変数|へんすう}の名前のルール

{変数|へんすう}の名前には、いくつかルールがあるよ。

```javascript runnable
// OK な名前
let myName = "ゆうしゃ";
let player1 = "たろう";
let _secret = "ひみつ";
let highScore = 9999;

console.log(myName);
console.log(player1);
console.log(_secret);
console.log(highScore);
```

- {英数字|えいすうじ}、`_`（アンダースコア）、`$` が使えるよ
- {最初|さいしょ}の{文字|もじ}に{数字|すうじ}は使えない（`1player` はダメ）
- {大文字|おおもじ}と{小文字|こもじ}は{区別|くべつ}されるよ（`name` と `Name` は{別|べつ}の箱）

:::sensei
JavaScriptでは **キャメルケース** という書き方がよく使われるよ。
{単語|たんご}のつなぎ目を{大文字|おおもじ}にするんだ。
たとえば `myName`、`highScore`、`maxHp` みたいにね！
:::

## {計算|けいさん}して入れよう

{変数|へんすう}に{計算|けいさん}の{結果|けっか}を入れることもできるよ！

```javascript runnable
let x = 5;
let y = 3;
let sum = x + y;
let product = x * y;

console.log(sum);
console.log(product);
```

:::student
すごい！{変数|へんすう}どうしで{計算|けいさん}もできるんだね！
:::

```javascript runnable
let attack = 30;
let defense = 10;
let damage = attack - defense;

console.log(damage);
```

:::sensei
{変数|へんすう}を使うと、あとから{値|あたい}を変えるだけで{計算結果|けいさんけっか}も変わるから、
とっても{便利|べんり}なんだよ。
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::

## まとめ

- `let` で中身を変えられる{変数|へんすう}を作る
- `const` で中身を変えられない{変数|へんすう}を作る
- {文字列|もじれつ}（`"テキスト"`）、{数字|すうじ}（`42`）、{真偽値|しんぎち}（`true` / `false`）が入れられる
- `console.log()` で中身を{表示|ひょうじ}できる
- {変数|へんすう}どうしで{計算|けいさん}もできる
