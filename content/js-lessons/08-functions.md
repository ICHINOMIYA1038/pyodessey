---
title: "関数"
slug: "functions"
order: 8
description: "魔法の呪文を作ろう"
world: "town"
challenge:
  description: "2つの数を受け取って合計を返す関数 add を作ろう"
  starterCode: "// 関数 add を作ろう\n\n// add(3, 7) を表示\n"
  expectedOutput: "10"
  hints:
    - "function add(a, b) { ... } で関数を作ろう"
    - "return a + b; で合計を返そう"
    - "console.log(add(3, 7)); で結果を表示しよう"
---

# {関数|かんすう} ー {魔法|まほう}の{呪文|じゅもん}を{作|つく}ろう

:::sensei
{今|いま}まで{同|おな}じような{処理|しょり}を{何度|なんど}も{書|か}いたことがあるよね？
「{関数|かんすう}」を使えば、{一度|いちど}{書|か}いた{処理|しょり}を{何度|なんど}でも{呼|よ}び{出|だ}せるんだ。
{魔法|まほう}の{呪文|じゅもん}を{覚|おぼ}えるようなものだよ！
:::

:::student
{呪文|じゅもん}を{覚|おぼ}えたら{何回|なんかい}でも{使|つか}えるってこと？
:::

:::sensei
そのとおり！{一度|いちど}{定義|ていぎ}すれば、{名前|なまえ}を{呼|よ}ぶだけで{何度|なんど}でも{実行|じっこう}できるよ。
:::

## {関数|かんすう}を{作|つく}ろう: function

`function` キーワードで{関数|かんすう}を{作|つく}れるよ。

```javascript runnable
function greet() {
  console.log("ようこそ、冒険者よ！");
}

// 関数を呼び出す
greet();
greet();
```

:::hint
{関数|かんすう}は{定義|ていぎ}しただけでは{動|うご}かないよ。
`greet()` のように{名前|なまえ}のあとに `()` をつけて{呼|よ}び{出|だ}そう！
:::

## パラメータ（{引数|ひきすう}）

{関数|かんすう}にデータを{渡|わた}すことができるよ。これを「パラメータ」や「{引数|ひきすう}」というんだ。

```javascript runnable
function attackMessage(monsterName) {
  console.log(`${monsterName}に攻撃した！`);
}

attackMessage("スライム");
attackMessage("ゴブリン");
attackMessage("ドラゴン");
```

:::student
カッコの{中|なか}に{名前|なまえ}を{入|い}れると、{関数|かんすう}の{中|なか}で使えるんだね！
:::

## {複数|ふくすう}のパラメータ

カンマで{区切|くぎ}れば{複数|ふくすう}のパラメータを{受|う}け{取|と}れるよ。

```javascript runnable
function battleLog(attacker, target, damage) {
  console.log(`${attacker}の攻撃！${target}に${damage}のダメージ！`);
}

battleLog("ゆうしゃ", "スライム", 25);
battleLog("まほうつかい", "ゴブリン", 40);
```

## return で{値|あたい}を{返|かえ}す

{関数|かんすう}は{結果|けっか}を `return` で{返|かえ}すことができるよ。

```javascript runnable
function calcDamage(attack, defense) {
  let damage = attack - defense;
  return damage;
}

let result = calcDamage(50, 20);
console.log(`ダメージ: ${result}`);

// 直接 console.log に渡してもOK
console.log(`ダメージ: ${calcDamage(80, 35)}`);
```

:::sensei
`return` で{値|あたい}を{返|かえ}すと、{関数|かんすう}の{呼|よ}び{出|だ}しが
その{値|あたい}に{置|お}き{換|か}わるイメージだよ。
`calcDamage(50, 20)` が `30` になるんだね。
:::

:::hint
`return` が{実行|じっこう}されると、{関数|かんすう}はそこで{終了|しゅうりょう}するよ。
`return` のあとの{行|ぎょう}は{実行|じっこう}されないから{注意|ちゅうい}してね。
:::

## デフォルトパラメータ

パラメータに{初期値|しょきち}を{設定|せってい}できるよ。{値|あたい}が{渡|わた}されなかったときに使われるんだ。

```javascript runnable
function heal(target, amount = 30) {
  console.log(`${target}のHPを${amount}回復した！`);
}

heal("ゆうしゃ", 50);     // amount = 50
heal("まほうつかい");       // amount = 30（デフォルト値）
```

:::student
{何|なに}も{渡|わた}さなかったら{自動|じどう}で30になるんだ！{便利|べんり}！
:::

## {早期|そうき}リターン（early return）

{条件|じょうけん}に{合|あ}わないときは{早|はや}めに `return` して{処理|しょり}を{止|と}められるよ。

```javascript runnable
function usePotion(currentHp, maxHp) {
  if (currentHp >= maxHp) {
    console.log("HPは満タンだ！ポーションは使えない。");
    return currentHp;
  }

  let healed = currentHp + 30;
  if (healed > maxHp) {
    healed = maxHp;
  }

  console.log(`HPが${healed}に回復した！`);
  return healed;
}

let hp = usePotion(70, 100);
console.log(`現在のHP: ${hp}`);

hp = usePotion(100, 100);
console.log(`現在のHP: ${hp}`);
```

:::sensei
{早期|そうき}リターンを使うと、「この{条件|じょうけん}なら{何|なに}もしなくていい」
というパターンがスッキリ{書|か}けるんだ。
:::

## {関数|かんすう}を{組|く}み{合|あ}わせよう

{関数|かんすう}の{中|なか}から{別|べつ}の{関数|かんすう}を{呼|よ}ぶこともできるよ。

```javascript runnable
function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function attackRoll(attackPower) {
  let dice = rollDice(6);
  let totalDamage = attackPower + dice;
  console.log(`サイコロ: ${dice}  攻撃力: ${attackPower}  合計ダメージ: ${totalDamage}`);
  return totalDamage;
}

function battle(heroAttack, monsterHp) {
  console.log(`モンスターHP: ${monsterHp}`);
  let damage = attackRoll(heroAttack);
  monsterHp = monsterHp - damage;
  if (monsterHp <= 0) {
    console.log("モンスターを倒した！");
  } else {
    console.log(`モンスター残りHP: ${monsterHp}`);
  }
}

battle(20, 30);
```

:::student
{関数|かんすう}の{中|なか}から{関数|かんすう}を{呼|よ}べるんだ！
{小|ちい}さい{呪文|じゅもん}を{組|く}み{合|あ}わせて{大|おお}きな{魔法|まほう}を{作|つく}るみたいだね！
:::

## {関数式|かんすうしき}

{関数|かんすう}を{変数|へんすう}に{入|い}れることもできるよ。これを「{関数式|かんすうしき}」というんだ。

```javascript runnable
let shout = function(message) {
  console.log(message.toUpperCase() + "!!!");
};

shout("fire");
shout("attack");

// 関数も値の一つ。変数に入れたり渡したりできる！
let myAction = shout;
myAction("heal");
```

:::sensei
JavaScriptでは{関数|かんすう}も「{値|あたい}」の{一|ひと}つなんだ。
{数字|すうじ}や{文字列|もじれつ}と{同|おな}じように{変数|へんすう}に{入|い}れたり、
{別|べつ}の{関数|かんすう}に{渡|わた}したりできるよ。
これはとても{大事|だいじ}な{考|かんが}え{方|かた}だから{覚|おぼ}えておこう！
:::

## {実践|じっせん}：パーティの{戦闘|せんとう}システム

{学|まな}んだことを{全部|ぜんぶ}使ってみよう！

```javascript runnable
function createHero(name, hp, attack) {
  return { name: name, hp: hp, attack: attack };
}

function dealDamage(attacker, defender) {
  let damage = attacker.attack;
  if (damage > defender.hp) {
    damage = defender.hp;
  }
  return damage;
}

function showStatus(character) {
  console.log(`${character.name} HP:${character.hp} 攻撃力:${character.attack}`);
}

// パーティとモンスターを作る
let hero = createHero("ゆうしゃ", 100, 30);
let monster = createHero("ドラゴン", 80, 20);

showStatus(hero);
showStatus(monster);

// 戦闘！
let damage = dealDamage(hero, monster);
monster.hp = monster.hp - damage;
console.log(`${hero.name}の攻撃！${monster.name}に${damage}ダメージ！`);
showStatus(monster);
```

:::sensei
{関数|かんすう}を使うと{処理|しょり}を{整理|せいり}できて、{読|よ}みやすいコードが{書|か}けるね。
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::
