---
title: "高階関数"
slug: "higher-order-functions"
order: 17
description: "関数を関数に渡そう"
world: "castle"
challenge:
  description: "compose(double, addOne)(3) を計算して表示しよう！composeは右から適用するよ。"
  starterCode: "// double（2倍する関数）を作ろう\n\n// addOne（1を足す関数）を作ろう\n\n// compose（右から適用する関数）を作ろう\n\n// console.log(compose(double, addOne)(3));\n"
  expectedOutput: "8"
  hints:
    - "function double(x) { return x * 2; } で2倍の関数を作ろう"
    - "function addOne(x) { return x + 1; } で+1の関数を作ろう"
    - "compose(f, g) は function(x) { return f(g(x)); } を返す関数だよ"
    - "compose(double, addOne)(3) → double(addOne(3)) → double(4) → 8"
---

# {高階関数|こうかいかんすう}

:::sensei
{城|しろ}の{奥|おく}にある{魔法|まほう}の{書庫|しょこ}にようこそ！
ここでは「{関数|かんすう}を{関数|かんすう}に{渡|わた}す」という{強力|きょうりょく}な{技|わざ}を{学|まな}ぶよ。
これを**{高階関数|こうかいかんすう}**（higher-order function）というんだ！
:::

:::student
{関数|かんすう}を{渡|わた}す？{数|すう}じゃなくて？
:::

:::sensei
そう！JavaScriptでは{関数|かんすう}も「{値|あたい}」のひとつなんだ。
{変数|へんすう}に{入|い}れたり、{別|べつ}の{関数|かんすう}に{渡|わた}したり、{関数|かんすう}から{返|かえ}したりできるよ。
これを「{第一級関数|だいいっきゅうかんすう}」（first-class functions）っていうんだ！
:::

## {関数|かんすう}は{値|あたい}である

{関数|かんすう}を{変数|へんすう}に{入|い}れてみよう。

```javascript runnable
// 関数を変数に入れる
let greet = function(name) {
  return `こんにちは、${name}！`;
};

console.log(greet("勇者"));

// アロー関数でも同じ
let shout = (message) => message.toUpperCase() + "!!!";

console.log(shout("fire"));

// 関数の型を確認
console.log(typeof greet);
```

:::hint
`function` を{変数|へんすう}に{代入|だいにゅう}できるのがポイントだよ。
{数値|すうち}や{文字列|もじれつ}と{同|おな}じように{扱|あつか}えるんだ！
:::

## {関数|かんすう}を{引数|ひきすう}として{渡|わた}す

{関数|かんすう}を{別|べつ}の{関数|かんすう}に{渡|わた}してみよう。これが{高階関数|こうかいかんすう}の{基本|きほん}！

```javascript runnable
// 関数を受け取る関数 = 高階関数
function applyTwice(func, value) {
  return func(func(value));
}

function double(x) {
  return x * 2;
}

function addThree(x) {
  return x + 3;
}

// double を2回適用: 5 → 10 → 20
console.log(applyTwice(double, 5));

// addThree を2回適用: 5 → 8 → 11
console.log(applyTwice(addThree, 5));
```

:::student
おおー！`double` を2{回|かい}{使|つか}ったら4{倍|ばい}になった！
:::

:::sensei
そう！{関数|かんすう}を{渡|わた}すことで、「{何|なに}を{適用|てきよう}するか」を{自由|じゆう}に{変|か}えられるんだ。
これは{戦略|せんりゃく}パターン（strategy pattern）って{呼|よ}ばれるよ。
:::

## {戦略|せんりゃく}パターン — {攻撃方法|こうげきほうほう}を{選|えら}ぶ

{同|おな}じ{仕組|しく}みで{違|ちが}う{戦略|せんりゃく}を{使|つか}い{分|わ}けよう！

```javascript runnable
// 攻撃の戦略を関数で表す
function fireAttack(power) {
  return `炎攻撃！ダメージ: ${power * 2}`;
}

function iceAttack(power) {
  return `氷攻撃！ダメージ: ${power * 1.5}`;
}

function thunderAttack(power) {
  return `雷攻撃！ダメージ: ${power * 3}`;
}

// 高階関数: どの戦略で攻撃するか
function executeAttack(strategy, basePower) {
  console.log("攻撃開始！");
  let result = strategy(basePower);
  console.log(result);
}

executeAttack(fireAttack, 10);
executeAttack(iceAttack, 10);
executeAttack(thunderAttack, 10);
```

:::hint
`executeAttack` は{攻撃|こうげき}の{種類|しゅるい}を{知|し}らなくていい。
{渡|わた}された{関数|かんすう}を{実行|じっこう}するだけ。これが{高階関数|こうかいかんすう}の{力|ちから}！
:::

## {関数|かんすう}を{返|かえ}す{関数|かんすう}

{関数|かんすう}から{新|あたら}しい{関数|かんすう}を{返|かえ}すこともできるよ。

```javascript runnable
// 掛け算する関数を「作る」関数
function createMultiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

let double = createMultiplier(2);
let triple = createMultiplier(3);
let tenTimes = createMultiplier(10);

console.log(double(5));     // 10
console.log(triple(5));     // 15
console.log(tenTimes(5));   // 50

// createMultiplier(2) が返した関数の中身
console.log(typeof double); // function
```

:::student
{関数|かんすう}が{関数|かんすう}を{作|つく}ってくれるの？まるで{魔法|まほう}の{工房|こうぼう}だ！
:::

:::sensei
その{通|とお}り！この{仕組|しく}みを{使|つか}うと、{設定|せってい}{済|ず}みの{関数|かんすう}を{量産|りょうさん}できるんだ。
{外側|そとがわ}の{変数|へんすう}（`factor`）を{覚|おぼ}えているのは「クロージャ」のおかげだよ。
:::

## イベントハンドラパターン

{高階関数|こうかいかんすう}は、「{何|なに}かが{起|お}きたとき」の{処理|しょり}を{登録|とうろく}するパターンでよく{使|つか}われるよ。

```javascript runnable
// イベントシステムを作る
function createEventSystem() {
  let handlers = {};

  return {
    on: function(eventName, handler) {
      if (!handlers[eventName]) {
        handlers[eventName] = [];
      }
      handlers[eventName].push(handler);
    },
    emit: function(eventName, data) {
      if (handlers[eventName]) {
        handlers[eventName].forEach(function(handler) {
          handler(data);
        });
      }
    }
  };
}

let game = createEventSystem();

// イベントハンドラを登録（関数を渡す）
game.on("attack", function(damage) {
  console.log(`${damage}ダメージを受けた！`);
});

game.on("attack", function(damage) {
  console.log(`残りHP: ${100 - damage}`);
});

game.on("heal", function(amount) {
  console.log(`${amount}回復した！`);
});

// イベントを発生させる
game.emit("attack", 30);
game.emit("heal", 20);
```

:::hint
`on` で{関数|かんすう}を{登録|とうろく}して、`emit` でまとめて{実行|じっこう}する。
これがイベント{駆動|くどう}プログラミングの{基本|きほん}だよ！
:::

## カリー{化|か}（currying）

{複数|ふくすう}の{引数|ひきすう}を{取|と}る{関数|かんすう}を、1つずつ{受|う}け{取|と}る{形|かたち}に{変|か}えるのがカリー{化|か}だよ。

```javascript runnable
// 普通の関数
function normalAdd(a, b) {
  return a + b;
}
console.log(normalAdd(3, 5));

// カリー化した関数
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}
console.log(curriedAdd(3)(5));

// 部分適用：引数を1つだけ先に渡す
let addTen = curriedAdd(10);
console.log(addTen(5));   // 15
console.log(addTen(20));  // 30

// RPGの例: ダメージ計算をカリー化
function attackWith(element) {
  return function(power) {
    return function(target) {
      return `${element}属性の攻撃！${target}に${power}ダメージ！`;
    };
  };
}

let fireStrike = attackWith("炎");
let fireStrong = fireStrike(100);

console.log(fireStrong("ドラゴン"));
console.log(fireStrong("スライム"));
```

:::student
{引数|ひきすう}を1{個|こ}ずつ{渡|わた}せるようになるんだ。{便利|べんり}かも！
:::

## {関数合成|かんすうごうせい}（function composition）

{関数|かんすう}を{組|く}み{合|あ}わせて、{新|あたら}しい{関数|かんすう}を{作|つく}ろう！
これが{今回|こんかい}の{最終奥義|さいしゅうおうぎ}だ！

```javascript runnable
// 小さな関数を用意
function addOne(x) {
  return x + 1;
}

function double(x) {
  return x * 2;
}

function square(x) {
  return x * x;
}

// compose: 右から左へ関数を適用する
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

// addOne してから double
let doubleAfterAddOne = compose(double, addOne);
console.log(doubleAfterAddOne(3)); // double(addOne(3)) = double(4) = 8

// double してから square
let squareAfterDouble = compose(square, double);
console.log(squareAfterDouble(3)); // square(double(3)) = square(6) = 36

// 3つ以上の合成
let tripleCombo = compose(square, compose(double, addOne));
console.log(tripleCombo(2)); // square(double(addOne(2))) = square(double(3)) = square(6) = 36
```

:::sensei
`compose(f, g)(x)` は{右|みぎ}から{順|じゅん}に{適用|てきよう}するよ。
まず `g(x)` を{計算|けいさん}して、その{結果|けっか}を `f` に{渡|わた}す。
{数学|すうがく}の `f ∘ g` と{同|おな}じだね！
:::

## {実践|じっせん}パターン — {配列|はいれつ}を{高階関数|こうかいかんすう}で{処理|しょり}

`map`、`filter`、`reduce` も{高階関数|こうかいかんすう}の{仲間|なかま}だよ。{復習|ふくしゅう}も{兼|か}ねて{使|つか}ってみよう！

```javascript runnable
let monsters = [
  { name: "スライム", hp: 30, level: 2 },
  { name: "ゴブリン", hp: 50, level: 5 },
  { name: "ドラゴン", hp: 200, level: 15 },
  { name: "コウモリ", hp: 20, level: 1 },
  { name: "ゴーレム", hp: 150, level: 10 }
];

// 高階関数: 条件で絞り込む関数を作る
function createFilter(minLevel) {
  return function(monster) {
    return monster.level >= minLevel;
  };
}

// レベル5以上のモンスター
let strongMonsters = monsters.filter(createFilter(5));
console.log(strongMonsters.map(m => m.name).join(", "));

// 名前だけ取り出す（map に関数を渡す）
let names = monsters.map(function(m) { return m.name; });
console.log(names.join(", "));

// HPの合計（reduce に関数を渡す）
let totalHP = monsters.reduce(function(sum, m) { return sum + m.hp; }, 0);
console.log("合計HP: " + totalHP);
```

:::hint
`map`、`filter`、`reduce` は{全|すべ}て{関数|かんすう}を{引数|ひきすう}に{受|う}け{取|と}る{高階関数|こうかいかんすう}だよ。
{自分|じぶん}でも{同|おな}じような{仕組|しく}みを{作|つく}れるんだ！
:::

## まとめ

:::sensei
{今日|きょう}{学|まな}んだことを{整理|せいり}しよう！

- {関数|かんすう}は「{値|あたい}」として{変数|へんすう}に{入|い}れたり{渡|わた}したりできる
- {関数|かんすう}を{受|う}け{取|と}る{関数|かんすう} = **{高階関数|こうかいかんすう}**
- {関数|かんすう}を{返|かえ}す{関数|かんすう}で、{新|あたら}しい{関数|かんすう}を{作|つく}れる
- **カリー{化|か}**で{引数|ひきすう}を1つずつ{渡|わた}せる
- **{関数合成|かんすうごうせい}**（compose）で{小|ちい}さな{関数|かんすう}を{組|く}み{合|あ}わせられる

さあ、チャレンジで `compose` を{使|つか}ってみよう！
:::

:::student
{関数|かんすう}を{自由|じゆう}に{組|く}み{合|あ}わせるって、RPGの{装備|そうび}を{組|く}み{合|あ}わせるみたいで{楽|たの}しい！
:::
