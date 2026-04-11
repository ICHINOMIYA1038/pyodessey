---
title: "エラー処理"
slug: "error-handling"
order: 10
description: "失敗してもだいじょうぶ"
world: "town"
challenge:
  description: "try-catch で JSON.parse(\"not json\") のエラーをキャッチして「エラーをキャッチ！」と表示しよう"
  starterCode: "// try-catch を使おう\n"
  expectedOutput: "エラーをキャッチ！"
  hints:
    - "try { ... } catch (e) { ... } の形で書こう"
    - "try の中で JSON.parse(\"not json\") を実行しよう"
    - "catch の中で console.log(\"エラーをキャッチ！\"); と書こう"
---

# エラー{処理|しょり} ー {失敗|しっぱい}してもだいじょうぶ

:::sensei
{冒険|ぼうけん}では{予想外|よそうがい}のことが{起|お}きるよね。
{罠|わな}にかかったり、{宝箱|たからばこ}がカラだったり...
プログラムでも{同|おな}じようにエラーが{起|お}きることがあるんだ。
でも「エラー{処理|しょり}」を{知|し}っていれば、{安全|あんぜん}に{対処|たいしょ}できるよ！
:::

:::student
エラーが{起|お}きたらプログラムが{止|と}まっちゃうんじゃないの？
:::

:::sensei
そう、{普通|ふつう}はエラーが{起|お}きると{止|と}まってしまう。
でも `try-catch` を使えば、エラーをキャッチして{止|と}まらずに{続|つづ}けられるんだ！
:::

## エラーが{起|お}きるとどうなる？

まず、エラーが{起|お}きたときの{動|うご}きを{見|み}てみよう。

```javascript runnable
console.log("冒険開始！");
console.log("ステップ1: 洞窟に入った");

// ここでエラーが起きる！
let data = JSON.parse("これはJSONじゃない");

// この行は実行されない
console.log("ステップ2: 宝を見つけた");
```

:::hint
`JSON.parse()` は{正|ただ}しいJSON{形式|けいしき}じゃない{文字列|もじれつ}を{渡|わた}すとエラーになるよ。
エラーが{起|お}きた{行|ぎょう}より{下|した}は{実行|じっこう}されないんだ。
:::

## try-catch でエラーをキャッチ

`try` の{中|なか}でエラーが{起|お}きたら、`catch` が{受|う}け{止|と}めてくれるよ。

```javascript runnable
console.log("冒険開始！");

try {
  console.log("宝箱を開ける...");
  let data = JSON.parse("これはJSONじゃない");
  console.log("宝を手に入れた！"); // ここは実行されない
} catch (error) {
  console.log("罠だった！でも無事だ！");
  console.log(`エラー内容: ${error.message}`);
}

console.log("冒険は続く...");
```

:::student
エラーが{起|お}きても{止|と}まらないで{続|つづ}けられるんだ！すごい！
:::

:::sensei
`catch` のカッコの{中|なか}にある `error` には、エラーの{情報|じょうほう}が{入|はい}っているよ。
`error.message` でエラーの{内容|ないよう}がわかるんだ。
:::

## Error オブジェクト

エラーにはいくつかの{情報|じょうほう}が{含|ふく}まれているよ。

```javascript runnable
try {
  let result = JSON.parse("{bad json}");
} catch (error) {
  console.log(`名前: ${error.name}`);
  console.log(`メッセージ: ${error.message}`);
}
```

```javascript runnable
try {
  // 存在しない変数を使おうとする
  console.log(unknownVariable);
} catch (error) {
  console.log(`名前: ${error.name}`);
  console.log(`メッセージ: ${error.message}`);
}
```

:::hint
`error.name` でエラーの{種類|しゅるい}、`error.message` で{詳|くわ}しい{内容|ないよう}がわかるよ。
{代表的|だいひょうてき}なエラーの{種類|しゅるい}は:
- `SyntaxError`: {書|か}き{方|かた}がおかしい
- `TypeError`: {型|かた}が{合|あ}わない
- `ReferenceError`: {存在|そんざい}しないものを{使|つか}おうとした
:::

## throw で{自分|じぶん}でエラーを{投|な}げる

`throw` を使えば{自分|じぶん}でエラーを{発生|はっせい}させられるよ。

```javascript runnable
function enterDungeon(level) {
  if (level < 1) {
    throw new Error("レベルは1以上が必要です！");
  }
  if (level > 99) {
    throw new Error("レベルは99以下にしてください！");
  }
  console.log(`レベル${level}のダンジョンに入った！`);
}

try {
  enterDungeon(5);
  enterDungeon(0);   // ここでエラー
} catch (error) {
  console.log(`入場拒否: ${error.message}`);
}
```

:::sensei
「この{条件|じょうけん}はダメ！」というときに `throw new Error()` でエラーを{投|な}げられるよ。
ゲームで「レベルが{足|た}りません！」と{表示|ひょうじ}するのと{同|おな}じだね。
:::

## {入力|にゅうりょく}チェック（バリデーション）

{関数|かんすう}に{渡|わた}されたデータが{正|ただ}しいか{確認|かくにん}しよう。

```javascript runnable
function createCharacter(name, hp) {
  if (typeof name !== "string") {
    throw new Error("名前は文字列にしてください！");
  }
  if (typeof hp !== "number") {
    throw new Error("HPは数値にしてください！");
  }
  if (hp <= 0) {
    throw new Error("HPは1以上にしてください！");
  }
  return { name: name, hp: hp };
}

try {
  let hero = createCharacter("ゆうしゃ", 100);
  console.log(`${hero.name}を作成！ HP: ${hero.hp}`);

  let bad = createCharacter(123, "百");
  console.log(bad); // ここは実行されない
} catch (error) {
  console.log(`作成失敗: ${error.message}`);
}
```

:::student
`typeof` で{型|かた}をチェックしてからエラーを{投|な}げるんだね！
{変|へん}なデータが{入|はい}ってくるのを{防|ふせ}げるんだ。
:::

## finally: {必|かなら}ず{実行|じっこう}される{処理|しょり}

`finally` は、エラーが{起|お}きても{起|お}きなくても{必|かなら}ず{実行|じっこう}されるよ。

```javascript runnable
function openTreasureBox(boxType) {
  console.log(`${boxType}の宝箱を開ける...`);
  try {
    if (boxType === "ミミック") {
      throw new Error("モンスターだった！");
    }
    console.log("お宝をゲット！");
  } catch (error) {
    console.log(`うわっ！${error.message}`);
  } finally {
    console.log("宝箱を閉じた。\n");
  }
}

openTreasureBox("金の宝箱");
openTreasureBox("ミミック");
```

:::hint
`finally` は{後片付|あとかたづ}けの{処理|しょり}に{使|つか}うことが{多|おお}いよ。
{成功|せいこう}しても{失敗|しっぱい}しても「{最後|さいご}に{必|かなら}ずやること」を{書|か}くんだ。
:::

## typeof で{安全|あんぜん}にチェック

エラーが{起|お}きる{前|まえ}に、`typeof` で{型|かた}をチェックして{防|ふせ}ぐこともできるよ。

```javascript runnable
function safeAdd(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    console.log("数値を入れてください！");
    return 0;
  }
  return a + b;
}

console.log(safeAdd(10, 20));
console.log(safeAdd("hello", 5));
console.log(safeAdd(10, undefined));
```

:::sensei
エラーを `throw` して `catch` するのも{大事|だいじ}だけど、
そもそもエラーが{起|お}きないように{先|さき}にチェックするのも{大切|たいせつ}だよ。
:::

## {代表的|だいひょうてき}なエラーの{種類|しゅるい}

```javascript runnable
// TypeError: 型が合わないときのエラー
try {
  let num = 42;
  num.toUpperCase();
} catch (e) {
  console.log(`TypeError: ${e.message}`);
}

// ReferenceError: 存在しない変数を使おうとした
try {
  console.log(notDefined);
} catch (e) {
  console.log(`ReferenceError: ${e.message}`);
}

// SyntaxError: JSON の書き方が正しくない
try {
  JSON.parse("{ bad }");
} catch (e) {
  console.log(`SyntaxError: ${e.message}`);
}
```

## {実践|じっせん}：{安全|あんぜん}なアイテムショップ

{学|まな}んだことを{組|く}み{合|あ}わせよう！

```javascript runnable
function buyItem(itemName, price, gold) {
  if (typeof gold !== "number" || gold < 0) {
    throw new Error("所持金が正しくありません！");
  }
  if (typeof price !== "number" || price <= 0) {
    throw new Error("値段が正しくありません！");
  }
  if (gold < price) {
    throw new Error(`お金が足りない！（${gold}G < ${price}G）`);
  }
  let remaining = gold - price;
  console.log(`${itemName}を購入！ 残り${remaining}G`);
  return remaining;
}

let myGold = 500;
console.log(`所持金: ${myGold}G`);

try {
  myGold = buyItem("ポーション", 50, myGold);
  myGold = buyItem("鉄の剣", 300, myGold);
  myGold = buyItem("鋼の鎧", 800, myGold); // お金が足りない！
} catch (error) {
  console.log(`購入失敗: ${error.message}`);
} finally {
  console.log(`最終所持金: ${myGold}G`);
}
```

:::sensei
エラー{処理|しょり}ができると、プログラムがずっと{頑丈|がんじょう}になるよ。
{冒険|ぼうけん}で{罠|わな}に{備|そな}えるのと{同|おな}じだね！
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::
