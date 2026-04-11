---
title: "条件分岐"
slug: "conditions"
order: 3
description: "もしも…のとき"
world: "forest"
challenge:
  description: "変数 score が 80 以上なら「合格！」、そうでなければ「もう少し！」と表示しよう。score は 85 にしてね。"
  starterCode: "let score = 85;\n\n// if文を書こう\n"
  expectedOutput: "合格！"
  hints:
    - "if (score >= 80) と書こう"
    - "else を使って「もう少し！」も表示できるようにしよう"
---

# {条件分岐|じょうけんぶんき}

:::sensei
{冒険|ぼうけん}の{途中|とちゅう}で「もしも〜だったら」という{場面|ばめん}があるよね。
たとえば「もしもHPが{少|すく}なかったら{回復|かいふく}する」とか。
今日はそんな「{条件分岐|じょうけんぶんき}」を{学|まな}ぶよ！
:::

:::student
ゲームでよくある「はい / いいえ」の{選択|せんたく}みたいなもの？
:::

:::sensei
そのとおり！
{条件|じょうけん}によって{違|ちが}うことをするのが{条件分岐|じょうけんぶんき}なんだ。
:::

## if {文|ぶん}

`if` を使うと、{条件|じょうけん}が正しいときだけコードを{実行|じっこう}できるよ。

```javascript runnable
let hp = 30;

if (hp < 50) {
  console.log("HPが低い！回復しよう！");
}
```

:::hint
`if` の{後|あと}の `( )` の中に{条件|じょうけん}を書くよ。
{条件|じょうけん}が `true`（ほんとう）なら `{ }` の中のコードが動くんだ。
:::

{条件|じょうけん}が `false`（うそ）なら、なにも{起|お}きないよ。

```javascript runnable
let hp = 80;

if (hp < 50) {
  console.log("HPが低い！回復しよう！");
}
console.log("冒険を続けよう！");
```

:::student
`hp` が 80 だから、`hp < 50` は `false` になるんだね。
だから「HPが{低|ひく}い！」は{表示|ひょうじ}されないんだ！
:::

## if...else

{条件|じょうけん}が正しくないときの{処理|しょり}も書きたいときは `else` を使うよ。

```javascript runnable
let level = 15;

if (level >= 10) {
  console.log("ダンジョンに入れるよ！");
} else {
  console.log("レベルが足りない...");
}
```

:::sensei
`if` の{条件|じょうけん}が `true` なら上のブロック、
`false` なら `else` のブロックが動くんだ。
どちらか{片方|かたほう}だけが{実行|じっこう}されるよ。
:::

```javascript runnable
let hasKey = false;

if (hasKey) {
  console.log("扉を開けた！");
} else {
  console.log("カギが必要だ...");
}
```

## else if で{複数|ふくすう}の{条件|じょうけん}をチェック

{条件|じょうけん}が2つ{以上|いじょう}あるときは `else if` を使おう。

```javascript runnable
let score = 85;

if (score >= 90) {
  console.log("S ランク！すごい！");
} else if (score >= 70) {
  console.log("A ランク！いい調子！");
} else if (score >= 50) {
  console.log("B ランク！もう少し！");
} else {
  console.log("C ランク...がんばろう！");
}
```

:::student
上から{順番|じゅんばん}にチェックして、最初に合った{条件|じょうけん}で止まるんだね！
score が 85 だから、`>= 90` は `false`、`>= 70` が `true` で「A ランク」になる！
:::

{冒険者|ぼうけんしゃ}のレベルに{合|あ}わせて{装備|そうび}を{提案|ていあん}してみよう。

```javascript runnable
let level = 25;

if (level >= 30) {
  console.log("伝説の剣を装備できるよ！");
} else if (level >= 20) {
  console.log("鋼の剣を装備できるよ！");
} else if (level >= 10) {
  console.log("鉄の剣を装備できるよ！");
} else {
  console.log("木の棒で戦おう！");
}
```

## {比較演算子|ひかくえんざんし}

{条件|じょうけん}で使う{記号|きごう}をまとめて{覚|おぼ}えよう！

```javascript runnable
console.log(5 === 5);    // true  （等しい）
console.log(5 !== 3);    // true  （等しくない）
console.log(5 > 3);      // true  （より大きい）
console.log(5 < 3);      // false （より小さい）
console.log(5 >= 5);     // true  （以上）
console.log(5 <= 3);     // false （以下）
```

:::sensei
JavaScriptでは `===` を使おう。
`==` もあるけど、{型|かた}を{無視|むし}して{比|くら}べるから{予想外|よそうがい}の{結果|けっか}になることがあるよ。
:::

```javascript runnable
// === と == の違い
console.log(5 === "5");   // false（型が違う）
console.log(5 == "5");    // true（型を無視して比べる）
```

:::hint
`===` は「{値|あたい}も{型|かた}も{同|おな}じ」をチェックするよ。
`==` は「{値|あたい}だけ{同|おな}じ」をチェックするから、{思|おも}わぬバグの{原因|げんいん}になるんだ。
いつも `===` を使うクセをつけよう！
:::

## {論理演算子|ろんりえんざんし}

{条件|じょうけん}を組み合わせたいときに使うよ。

### && （かつ）

{両方|りょうほう}とも `true` のとき、{全体|ぜんたい}が `true` になるよ。

```javascript runnable
let hp = 80;
let mp = 30;

if (hp > 50 && mp > 10) {
  console.log("特技を使える！");
} else {
  console.log("HPかMPが足りない...");
}
```

### || （または）

どちらかが `true` なら、{全体|ぜんたい}が `true` になるよ。

```javascript runnable
let hasPotion = false;
let hasHerb = true;

if (hasPotion || hasHerb) {
  console.log("回復アイテムがある！");
} else {
  console.log("回復アイテムがない...");
}
```

### ! （ではない）

`true` と `false` をひっくり{返|かえ}すよ。

```javascript runnable
let isGameOver = false;

if (!isGameOver) {
  console.log("冒険はまだ続く！");
}
```

:::student
`!isGameOver` は「ゲームオーバーではない」って{意味|いみ}なんだね！
:::

## 組み合わせてみよう

{複数|ふくすう}の{条件|じょうけん}を組み合わせた{例|れい}を見てみよう。

```javascript runnable
let level = 20;
let hasKey = true;
let hp = 60;

if (level >= 15 && hasKey && hp > 0) {
  console.log("ボスの部屋に入れる！");
} else {
  console.log("条件が足りない...");
}
```

## {三項演算子|さんこうえんざんし}

かんたんな `if...else` は、{一行|いちぎょう}で書くこともできるよ。

```javascript runnable
let hp = 30;
let status = hp > 50 ? "元気" : "ピンチ";
console.log(status);
```

:::sensei
`条件 ? trueの値 : falseの値` という{形|かたち}だよ。
これを**{三項演算子|さんこうえんざんし}**というんだ。
かんたんな{条件|じょうけん}のときに{便利|べんり}だよ！
:::

```javascript runnable
let score = 75;
console.log(score >= 60 ? "合格！" : "不合格...");
```

```javascript runnable
let age = 12;
let ticket = age < 12 ? "子供料金" : "大人料金";
console.log(ticket);
```

:::student
{短|みじか}く書けて{便利|べんり}だけど、{複雑|ふくざつ}な{条件|じょうけん}のときは
`if...else` を使ったほうが読みやすいよね？
:::

:::sensei
そのとおり！
かんたんなときは{三項演算子|さんこうえんざんし}、
{複雑|ふくざつ}なときは `if...else` を使い{分|わ}けよう。
:::

## {実践|じっせん}：{冒険者|ぼうけんしゃ}の{判定|はんてい}

{学|まな}んだことを{全部|ぜんぶ}使って、{冒険者|ぼうけんしゃ}の{状態|じょうたい}を{判定|はんてい}してみよう！

```javascript runnable
let name = "ゆうしゃ";
let hp = 45;
let mp = 20;
let level = 12;

let hpStatus = hp > 70 ? "元気" : hp > 30 ? "注意" : "危険";

console.log(`${name} Lv.${level}`);
console.log(`HP: ${hp} (${hpStatus})`);

if (hp <= 0) {
  console.log("たおれてしまった...");
} else if (hp < 30 && mp >= 10) {
  console.log("魔法で回復しよう！");
} else if (hp < 50) {
  console.log("ポーションを使おう！");
} else {
  console.log("このまま進もう！");
}
```

## まとめ

- `if` で{条件|じょうけん}が `true` のときだけ{実行|じっこう}
- `else` で{条件|じょうけん}が `false` のときの{処理|しょり}
- `else if` で{複数|ふくすう}の{条件|じょうけん}をチェック
- {比較演算子|ひかくえんざんし}: `===` `!==` `>` `<` `>=` `<=`
- {論理演算子|ろんりえんざんし}: `&&`（かつ） `||`（または） `!`（ではない）
- {三項演算子|さんこうえんざんし}: `条件 ? trueの値 : falseの値`

:::sensei
{条件分岐|じょうけんぶんき}をマスターすれば、プログラムにいろんな{判断|はんだん}をさせられるよ。
チャレンジに{挑戦|ちょうせん}してみよう！
:::
