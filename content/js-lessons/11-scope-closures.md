---
title: "スコープとクロージャ"
slug: "scope-closures"
order: 11
description: "変数の見える範囲"
world: "town"
challenge:
  description: "createCounter関数を作ってカウンターを2回呼んで表示しよう"
  starterCode: "// createCounter 関数を作ろう\n\n// let counter = createCounter();\n// console.log(counter());\n// console.log(counter());\n"
  expectedOutput: "1\n2"
  hints:
    - "createCounter の中で let count = 0; を作ろう"
    - "内側の関数で count を1増やして return しよう"
    - "return function() { count++; return count; }; で完成！"
---

# スコープとクロージャ ー {変数|へんすう}の{見|み}える{範囲|はんい}

:::sensei
{変数|へんすう}はどこからでも{見|み}えるわけじゃないんだ。
「どこで{作|つく}ったか」によって、{見|み}える{範囲|はんい}が{変|か}わるんだよ。
これを「スコープ」というんだ。
:::

:::student
スコープ？{変数|へんすう}に{見|み}えない{場所|ばしょ}があるの？
:::

:::sensei
RPGで{考|かんが}えてみよう。
{町|まち}の{中|なか}だけで使える{地図|ちず}と、{世界中|せかいじゅう}で使える{地図|ちず}があるよね。
{変数|へんすう}も{同|おな}じように「使える{範囲|はんい}」が{決|き}まっているんだ。
:::

## グローバルスコープとローカルスコープ

{関数|かんすう}の{外|そと}で{作|つく}った{変数|へんすう}は「グローバル」、{中|なか}で{作|つく}った{変数|へんすう}は「ローカル」だよ。

```javascript runnable
let worldName = "アルテミア大陸";  // グローバル変数

function enterTown() {
  let townName = "はじまりの町";   // ローカル変数
  console.log(`${worldName}の${townName}に到着！`);
}

enterTown();
console.log(worldName);  // OK: グローバル変数はどこでも見える

// console.log(townName);  // エラー！ ローカル変数は関数の外から見えない
```

:::hint
グローバル{変数|へんすう}は「{世界|せかい}マップ」みたいにどこからでも{見|み}えるよ。
ローカル{変数|へんすう}は「{町|まち}の{中|なか}の{地図|ちず}」みたいに、その{関数|かんすう}の{中|なか}だけで{見|み}えるんだ。
:::

## ブロックスコープ: let と const

`let` と `const` は `{}` のブロックの{中|なか}だけで{有効|ゆうこう}だよ。

```javascript runnable
if (true) {
  let secret = "隠された宝の場所";
  const password = "ひらけごま";
  console.log(secret);     // OK
  console.log(password);   // OK
}

// console.log(secret);    // エラー！ ブロックの外から見えない
// console.log(password);  // エラー！ ブロックの外から見えない
console.log("ブロックの外に出た");
```

```javascript runnable
for (let i = 0; i < 3; i++) {
  let monster = `モンスター${i + 1}`;
  console.log(monster);
}

// console.log(i);       // エラー！ for の外から見えない
// console.log(monster);  // エラー！ for の外から見えない
console.log("ループ終了！");
```

:::sensei
`let` と `const` は{近|ちか}くの `{}` の{中|なか}だけで{生|い}きるんだ。
これがあるから{変数|へんすう}が{他|ほか}の{場所|ばしょ}に{影響|えいきょう}しないように{守|まも}られているよ。
:::

## var は{注意|ちゅうい}が{必要|ひつよう}

{昔|むかし}のJavaScriptでは `var` を使っていたけど、ブロックスコープが{効|き}かないんだ。

```javascript runnable
if (true) {
  var oldStyle = "var で作った変数";
  let newStyle = "let で作った変数";
}

console.log(oldStyle);   // OK: var はブロックの外でも見える！
// console.log(newStyle); // エラー: let はブロックの外から見えない
```

:::student
`var` だとブロックの{外|そと}でも{見|み}えちゃうの？ちょっと{危|あぶ}ないね。
:::

:::sensei
そうなんだ。だから{今|いま}は `let` と `const` を使うのがおすすめだよ。
`var` を{見|み}かけたら「{昔|むかし}の{書|か}き{方|かた}だな」と{思|おも}えばOK。
:::

## {入|い}れ{子|こ}の{関数|かんすう}とスコープチェーン

{関数|かんすう}の{中|なか}から{外側|そとがわ}の{変数|へんすう}にアクセスできるよ。

```javascript runnable
function dungeon() {
  let floor = "地下1階";

  function findTreasure() {
    let item = "金の鍵";
    // 外側の変数 floor にアクセスできる！
    console.log(`${floor}で${item}を見つけた！`);
  }

  findTreasure();
  // console.log(item); // エラー！ 内側の変数は外から見えない
}

dungeon();
```

:::hint
{内側|うちがわ}の{関数|かんすう}は{外側|そとがわ}の{変数|へんすう}を{見|み}ることができるけど、
{外側|そとがわ}から{内側|うちがわ}の{変数|へんすう}は{見|み}えないよ。
{一方通行|いっぽうつうこう}なんだ！
:::

## クロージャとは？

{関数|かんすう}が{自分|じぶん}が{作|つく}られたときの{変数|へんすう}を「{覚|おぼ}えている」こと。これがクロージャだよ！

```javascript runnable
function createGreeting(greeting) {
  // この内側の関数は greeting を覚えている！
  return function(name) {
    console.log(`${greeting}、${name}！`);
  };
}

let hello = createGreeting("こんにちは");
let bye = createGreeting("さようなら");

hello("ゆうしゃ");
hello("まほうつかい");
bye("ゆうしゃ");
```

:::sensei
`createGreeting` は{終|お}わったのに、`greeting` の{値|あたい}はまだ{残|のこ}っているよね。
{内側|うちがわ}の{関数|かんすう}が `greeting` を「{覚|おぼ}えて」いるから、
あとから{呼|よ}んでもちゃんと{使|つか}えるんだ。これがクロージャの{力|ちから}だよ！
:::

## クロージャで{カウンター}を{作|つく}る

クロージャの{定番|ていばん}の{例|れい}、カウンターを{作|つく}ってみよう。

```javascript runnable
function createCounter() {
  let count = 0;  // この変数がクロージャで守られる

  return function() {
    count = count + 1;
    return count;
  };
}

let counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3

// 別のカウンターを作ると、別々にカウントされる！
let counter2 = createCounter();
console.log(counter2()); // 1（別のカウンター）
console.log(counter());  // 4（元のカウンターは続きから）
```

:::student
`count` は{外|そと}からは{触|さわ}れないのに、{関数|かんすう}の{中|なか}ではちゃんと{増|ふ}えていくんだ！
{魔法|まほう}みたい！
:::

## クロージャで{非公開|ひこうかい}データを{作|つく}る

クロージャを使うと、{外|そと}から{直接|ちょくせつ}さわれない{秘密|ひみつ}のデータを{作|つく}れるよ。

```javascript runnable
function createWallet(initialGold) {
  let gold = initialGold;  // 外から直接触れない！

  return {
    getGold: function() {
      return gold;
    },
    earn: function(amount) {
      gold = gold + amount;
      console.log(`${amount}G獲得！ 所持金: ${gold}G`);
    },
    spend: function(amount) {
      if (amount > gold) {
        console.log("お金が足りない！");
        return false;
      }
      gold = gold - amount;
      console.log(`${amount}G使った！ 残り: ${gold}G`);
      return true;
    }
  };
}

let wallet = createWallet(100);
wallet.earn(50);
wallet.spend(30);
wallet.spend(200);
console.log(`現在の所持金: ${wallet.getGold()}G`);
// wallet.gold = 99999;  // これをやっても内部の gold は変わらない！
```

:::sensei
`gold` は{直接|ちょくせつ}{変更|へんこう}できないように{守|まも}られているんだ。
`earn` や `spend` という{決|き}められた{方法|ほうほう}でしか{操作|そうさ}できない。
これを「{非公開|ひこうかい}（プライベート）{変数|へんすう}」というよ。
ゲームのチート{対策|たいさく}みたいだね！
:::

## IIFE: {即時実行関数式|そくじじっこうかんすうしき}

{関数|かんすう}を{作|つく}ってすぐに{実行|じっこう}する{書|か}き{方|かた}もあるよ。

```javascript runnable
let game = (function() {
  let score = 0;

  return {
    addScore: function(points) {
      score = score + points;
    },
    getScore: function() {
      return score;
    }
  };
})();  // ← すぐに実行！

game.addScore(100);
game.addScore(50);
console.log(`スコア: ${game.getScore()}`);
```

:::hint
`(function() { ... })()` という{書|か}き{方|かた}で、{関数|かんすう}を{作|つく}ると{同時|どうじ}に{実行|じっこう}するんだ。
IIFEは「Immediately Invoked Function Expression」の{略|りゃく}だよ。
{最近|さいきん}はモジュールという{仕組|しく}みがあるから使う{機会|きかい}は{減|へ}ったけど、
{知|し}っておくと{古|ふる}いコードも{読|よ}めるようになるよ。
:::

## {実践|じっせん}：RPGのHPマネージャー

{学|まな}んだことを{全部|ぜんぶ}{組|く}み{合|あ}わせよう！

```javascript runnable
function createCharacter(name, maxHp) {
  let hp = maxHp;  // クロージャで守られたHP

  return {
    getName: () => name,
    getHp: () => hp,
    getMaxHp: () => maxHp,
    takeDamage: function(damage) {
      hp = hp - damage;
      if (hp < 0) hp = 0;
      console.log(`${name}は${damage}ダメージ受けた！ HP: ${hp}/${maxHp}`);
      if (hp === 0) {
        console.log(`${name}は倒れた...`);
      }
    },
    heal: function(amount) {
      if (hp === 0) {
        console.log(`${name}は倒れている...回復できない！`);
        return;
      }
      hp = hp + amount;
      if (hp > maxHp) hp = maxHp;
      console.log(`${name}のHPが${amount}回復！ HP: ${hp}/${maxHp}`);
    },
    showStatus: function() {
      let bar = "█".repeat(Math.floor(hp / maxHp * 10));
      let empty = "░".repeat(10 - Math.floor(hp / maxHp * 10));
      console.log(`${name} [${bar}${empty}] ${hp}/${maxHp}`);
    }
  };
}

let hero = createCharacter("ゆうしゃ", 100);
hero.showStatus();
hero.takeDamage(35);
hero.showStatus();
hero.heal(20);
hero.showStatus();
```

:::sensei
スコープとクロージャは{最初|さいしょ}は{難|むずか}しく{感|かん}じるかもしれないけど、
使っているうちに{自然|しぜん}とわかるようになるよ。
{大事|だいじ}なのは「{変数|へんすう}には{見|み}える{範囲|はんい}がある」ということと、
「{関数|かんすう}は{外側|そとがわ}の{変数|へんすう}を{覚|おぼ}えていられる」ということだよ。
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::
