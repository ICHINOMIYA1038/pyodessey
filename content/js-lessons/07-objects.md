---
title: "オブジェクト"
slug: "objects"
order: 7
description: "冒険者のデータをまとめよう"
world: "town"
challenge:
  description: "オブジェクト hero を作り hero.name を表示しよう"
  starterCode: "let hero = { name: \"ゆうしゃ\", hp: 100 };\n// hero.name を表示しよう\n"
  expectedOutput: "ゆうしゃ"
  hints:
    - "console.log(hero.name); でプロパティを表示できるよ"
    - "ドット（.）でオブジェクトの中身にアクセスしよう"
---

# オブジェクト ー {冒険者|ぼうけんしゃ}のデータをまとめよう

:::sensei
{今|いま}まで{変数|へんすう}に{一|ひと}つずつデータを{入|い}れてきたよね。
でも{冒険者|ぼうけんしゃ}には{名前|なまえ}もHPも{攻撃力|こうげきりょく}もある。
これを{一|ひと}つにまとめられたら{便利|べんり}だと{思|おも}わない？
:::

:::student
{名前|なまえ}とHPと{攻撃力|こうげきりょく}をバラバラに{管理|かんり}するのは{大変|たいへん}だよね...
:::

:::sensei
そこで「オブジェクト」の{出番|でばん}だ！
オブジェクトは{関連|かんれん}するデータを `{}` の{中|なか}にまとめられるんだよ。
RPGの{冒険者|ぼうけんしゃ}カードみたいなものだね！
:::

## オブジェクトを{作|つく}ろう

`{}` の{中|なか}に「{名前|なまえ}: {値|あたい}」のペアを{書|か}くよ。これを「プロパティ」というんだ。

```javascript runnable
let hero = {
  name: "ゆうしゃ",
  hp: 100,
  attack: 25
};

console.log(hero);
```

:::hint
プロパティとプロパティの{間|あいだ}にはカンマ `,` を{忘|わす}れないでね！
{最後|さいご}のプロパティのあとにカンマがあってもなくてもOKだよ。
:::

## プロパティにアクセスする：ドット{記法|きほう}

オブジェクトの{中身|なかみ}を{取|と}り{出|だ}すには `.`（ドット）を使うよ。

```javascript runnable
let hero = {
  name: "ゆうしゃ",
  hp: 100,
  attack: 25,
  level: 5
};

console.log(hero.name);
console.log(hero.hp);
console.log(`${hero.name}のレベルは${hero.level}だ！`);
```

:::student
ドットのあとにプロパティの{名前|なまえ}を{書|か}けばいいんだね！かんたん！
:::

## ブラケット{記法|きほう}でもアクセスできる

`[]` の{中|なか}に{文字列|もじれつ}でプロパティ{名|めい}を{書|か}く{方法|ほうほう}もあるよ。

```javascript runnable
let monster = {
  name: "スライム",
  hp: 30,
  type: "水"
};

// ドット記法
console.log(monster.name);

// ブラケット記法
console.log(monster["name"]);

// 変数でプロパティ名を指定できる！
let key = "hp";
console.log(monster[key]);
```

:::sensei
ブラケット{記法|きほう}は{変数|へんすう}でプロパティ{名|めい}を{指定|してい}したいときにとても{便利|べんり}だよ。
{普段|ふだん}はドット{記法|きほう}のほうがスッキリ{書|か}けるけどね。
:::

## プロパティを{追加|ついか}・{変更|へんこう}する

オブジェクトは{後|あと}からプロパティを{追加|ついか}したり{変更|へんこう}したりできるよ。

```javascript runnable
let hero = {
  name: "ゆうしゃ",
  hp: 100
};

// プロパティを変更
hero.hp = 80;
console.log(`${hero.name}のHP: ${hero.hp}`);

// 新しいプロパティを追加
hero.mp = 50;
hero.weapon = "ひのきのぼう";
console.log(`武器: ${hero.weapon}`);
console.log(`MP: ${hero.mp}`);
```

:::student
あとから{自由|じゆう}に{追加|ついか}できるんだ！{装備|そうび}を{変|か}えるみたいだね！
:::

## メソッド：オブジェクトの{中|なか}の{関数|かんすう}

オブジェクトのプロパティには{関数|かんすう}も{入|い}れられるよ。これを「メソッド」というんだ。

```javascript runnable
let hero = {
  name: "ゆうしゃ",
  hp: 100,
  attack: 25,
  greet: function() {
    console.log(`わたしは${this.name}だ！`);
  },
  showStatus: function() {
    console.log(`${this.name} - HP: ${this.hp} 攻撃力: ${this.attack}`);
  }
};

hero.greet();
hero.showStatus();
```

:::hint
メソッドの{中|なか}で `this` を使うと、そのオブジェクト{自身|じしん}のプロパティにアクセスできるよ。
`this.name` は「この{オブジェクト}の name」という{意味|いみ}だね。
:::

## {入|い}れ{子|こ}のオブジェクト

オブジェクトの{中|なか}にオブジェクトを{入|い}れることもできるよ。

```javascript runnable
let hero = {
  name: "ゆうしゃ",
  hp: 100,
  equipment: {
    weapon: "はがねのつるぎ",
    armor: "てつのよろい",
    shield: "かわのたて"
  },
  stats: {
    attack: 45,
    defense: 30,
    speed: 20
  }
};

console.log(hero.equipment.weapon);
console.log(hero.stats.attack);
console.log(`${hero.name}は${hero.equipment.weapon}を装備している！`);
```

:::sensei
ドットを{続|つづ}けて{書|か}けば、{深|ふか}い{階層|かいそう}のデータにもアクセスできるよ。
`hero.equipment.weapon` で「heroの{装備|そうび}の{武器|ぶき}」ってことだね。
:::

## Object.keys / Object.values / Object.entries

オブジェクトの{中身|なかみ}を{調|しら}べる{便利|べんり}な{方法|ほうほう}があるよ。

```javascript runnable
let inventory = {
  potion: 5,
  ether: 2,
  antidote: 3,
  phoenix: 1
};

// キー（名前）の一覧
console.log(Object.keys(inventory));

// 値の一覧
console.log(Object.values(inventory));

// キーと値のペア
console.log(Object.entries(inventory));
```

:::student
`Object.keys` で{全部|ぜんぶ}のプロパティ{名|めい}がわかるんだ！
{持|も}ち{物|もの}リストを{表示|ひょうじ}するのに{便利|べんり}だね！
:::

## for...in ループでオブジェクトを{回|まわ}す

`for...in` を使うとオブジェクトの{全|すべ}てのプロパティを{順番|じゅんばん}に{処理|しょり}できるよ。

```javascript runnable
let partyStatus = {
  ゆうしゃ: 100,
  まほうつかい: 60,
  せんし: 120,
  そうりょ: 80
};

for (let member in partyStatus) {
  console.log(`${member}のHP: ${partyStatus[member]}`);
}
```

:::hint
`for...in` ループでは{変数|へんすう}にプロパティの「{名前|なまえ}」（キー）が{入|はい}るよ。
{値|あたい}を{取|と}り{出|だ}すにはブラケット{記法|きほう} `obj[key]` を使おう！
:::

## {実践|じっせん}：モンスター{図鑑|ずかん}を{作|つく}ろう

{学|まな}んだことを{組|く}み{合|あ}わせてみよう！

```javascript runnable
let monsters = {
  slime: { name: "スライム", hp: 30, exp: 5 },
  goblin: { name: "ゴブリン", hp: 50, exp: 12 },
  dragon: { name: "ドラゴン", hp: 500, exp: 100 }
};

// モンスター図鑑を表示
let ids = Object.keys(monsters);
console.log(`図鑑登録数: ${ids.length}体`);

for (let id in monsters) {
  let m = monsters[id];
  console.log(`${m.name} - HP:${m.hp} EXP:${m.exp}`);
}

// 一番経験値が高いモンスターを探す
let bestExp = 0;
let bestName = "";
for (let id in monsters) {
  if (monsters[id].exp > bestExp) {
    bestExp = monsters[id].exp;
    bestName = monsters[id].name;
  }
}
console.log(`最も経験値が高い: ${bestName}（${bestExp}EXP）`);
```

:::sensei
オブジェクトを使えば、ゲームの{キャラクター}やアイテムのデータを
きれいに{整理|せいり}できるようになるね。
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::
