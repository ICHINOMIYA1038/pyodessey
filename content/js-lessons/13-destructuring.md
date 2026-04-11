---
title: "分割代入"
slug: "destructuring"
order: 13
description: "まとめてバラバラに取り出そう"
world: "mountain"
challenge:
  description: "オブジェクトから name と level を取り出して表示しよう！"
  starterCode: "let hero = { name: \"ゆうしゃ\", level: 10, hp: 100 };\n// 分割代入で name と level を取り出そう\n// console.log(`${name} Lv.${level}`);\n"
  expectedOutput: "ゆうしゃ Lv.10"
  hints:
    - "let { name, level } = hero; で取り出せるよ"
    - "オブジェクトの分割代入は { } を使うよ"
    - "取り出した後は普通の変数として使えるよ"
---

# {分割代入|ぶんかつだいにゅう}

:::sensei
{宝箱|たからばこ}を{開|あ}けたら、{剣|けん}と{盾|たて}と{薬草|やくそう}が入っていたとしよう。
{一|ひと}つずつ{取|と}り出すのは{面倒|めんどう}だよね。
「まとめてバラバラに{取|と}り出す」{方法|ほうほう}があるんだ！
:::

:::student
{一気|いっき}に{全部取|ぜんぶと}り出せるの？
:::

:::sensei
そう！それが「{分割代入|ぶんかつだいにゅう}」（デストラクチャリング）だよ。
{配列|はいれつ}やオブジェクトから、{中身|なかみ}をサッと{取|と}り出せるんだ。
:::

## {配列|はいれつ}の{分割代入|ぶんかつだいにゅう}

まずは{配列|はいれつ}から{値|あたい}を{取|と}り出してみよう。

```javascript runnable
let party = ["ゆうしゃ", "まほうつかい", "せんし"];

// 従来のやり方
let leader = party[0];
let mage = party[1];
let warrior = party[2];
console.log(leader, mage, warrior);
```

これを{分割代入|ぶんかつだいにゅう}で書くとこうなるよ。

```javascript runnable
let party = ["ゆうしゃ", "まほうつかい", "せんし"];

// 分割代入！
let [leader, mage, warrior] = party;

console.log(leader);
console.log(mage);
console.log(warrior);
```

:::student
1{行|ぎょう}で3つの{変数|へんすう}に{入|い}れられた！すごい！
:::

:::hint
{配列|はいれつ}の{分割代入|ぶんかつだいにゅう}は `[ ]` を使うよ。
{左側|ひだりがわ}の{変数|へんすう}の{順番|じゅんばん}と{配列|はいれつ}の{順番|じゅんばん}が{対応|たいおう}するんだ。
:::

{一部|いちぶ}だけ{取|と}り出すこともできるよ。

```javascript runnable
let scores = [95, 80, 70, 60, 50];

// 最初の2つだけ取り出す
let [first, second] = scores;
console.log(`1位: ${first}点`);
console.log(`2位: ${second}点`);
```

## オブジェクトの{分割代入|ぶんかつだいにゅう}

オブジェクトからも{取|と}り出せるよ。こちらは `{ }` を使うんだ。

```javascript runnable
let hero = { name: "ゆうしゃ", level: 10, hp: 100 };

// 従来のやり方
let name1 = hero.name;
let level1 = hero.level;
console.log(`${name1} Lv.${level1}`);

// 分割代入！
let { name, level, hp } = hero;
console.log(`${name} Lv.${level} HP:${hp}`);
```

:::sensei
オブジェクトの{分割代入|ぶんかつだいにゅう}では、{変数名|へんすうめい}とプロパティ{名|めい}を{同|おな}じにするよ。
{順番|じゅんばん}は{関係|かんけい}なくて、{名前|なまえ}で{対応|たいおう}するんだ。
:::

```javascript runnable
let monster = { name: "ドラゴン", hp: 500, attack: 80, defense: 60 };

// 必要なものだけ取り出せる
let { name, attack } = monster;
console.log(`${name}の攻撃力: ${attack}`);
```

:::student
{全部取|ぜんぶと}り出さなくてもいいんだ！{必要|ひつよう}なものだけ{選|えら}べるのは{便利|べんり}だね。
:::

## デフォルト{値|ち}

{値|あたい}がない{場合|ばあい}に{使|つか}うデフォルト{値|ち}を{設定|せってい}できるよ。

```javascript runnable
let options = { difficulty: "hard" };

// mode がないから "normal" がデフォルト値になる
let { difficulty, mode = "normal" } = options;
console.log(`難易度: ${difficulty}`);
console.log(`モード: ${mode}`);
```

{配列|はいれつ}でもデフォルト{値|ち}が使えるよ。

```javascript runnable
let [a, b, c = 0] = [10, 20];
console.log(a);  // 10
console.log(b);  // 20
console.log(c);  // 0（デフォルト値）
```

:::hint
`= 値` でデフォルト{値|ち}を{設定|せってい}できるよ。
{元|もと}のデータに{値|あたい}がなかった（`undefined`）ときだけ使われるんだ。
:::

## {名前|なまえ}を{変|か}えて{取|と}り出す（リネーム）

オブジェクトから{取|と}り出すとき、{別|べつ}の{変数名|へんすうめい}をつけられるよ。

```javascript runnable
let monster = { name: "スライム", hp: 10, attack: 5 };

// name を monsterName という変数名で取り出す
let { name: monsterName, hp: monsterHp } = monster;
console.log(`${monsterName} HP:${monsterHp}`);
```

:::sensei
`{ 元の名前: 新しい名前 }` という{形|かたち}で書くよ。
{同|おな}じ `name` というプロパティが{複数|ふくすう}のオブジェクトにあるとき、{名前|なまえ}を{変|か}えると{区別|くべつ}できて{便利|べんり}だよ。
:::

## ネスト（{入|い}れ{子|こ}）の{分割代入|ぶんかつだいにゅう}

オブジェクトの中のオブジェクトからも{取|と}り出せるよ。

```javascript runnable
let character = {
  name: "ゆうしゃ",
  stats: {
    hp: 100,
    mp: 50,
    attack: 30
  }
};

// stats の中の hp と mp を取り出す
let { name, stats: { hp, mp } } = character;
console.log(`${name} HP:${hp} MP:${mp}`);
```

:::student
{中|なか}のオブジェクトの{中身|なかみ}まで{一気|いっき}に{取|と}り出せるんだ！
:::

## レスト{要素|ようそ}（...rest）

{残|のこ}り{全部|ぜんぶ}をまとめて{受|う}け{取|と}ることもできるよ。

```javascript runnable
let [first, ...others] = ["ゆうしゃ", "まほうつかい", "せんし", "そうりょ"];
console.log(`リーダー: ${first}`);
console.log(`他のメンバー: ${others}`);
```

オブジェクトでも使えるよ。

```javascript runnable
let hero = { name: "ゆうしゃ", level: 10, hp: 100, mp: 50, attack: 30 };

let { name, level, ...otherStats } = hero;
console.log(`${name} Lv.${level}`);
console.log(otherStats);
```

:::hint
`...変数名` で「{残|のこ}り{全部|ぜんぶ}」を{受|う}け{取|と}れるよ。
これは{必|かなら}ず{最後|さいご}に書かないとエラーになるから{注意|ちゅうい}してね。
:::

## {関数|かんすう}の{引数|ひきすう}で{分割代入|ぶんかつだいにゅう}

{関数|かんすう}の{引数|ひきすう}でも{使|つか}えるよ。これがとても{便利|べんり}なんだ！

```javascript runnable
function introduce({ name, level, job = "冒険者" }) {
  console.log(`${name}は Lv.${level} の${job}だ！`);
}

introduce({ name: "アリス", level: 15, job: "剣士" });
introduce({ name: "ボブ", level: 8 });
```

:::sensei
{関数|かんすう}にオブジェクトを{渡|わた}すとき、{分割代入|ぶんかつだいにゅう}を使うと{必要|ひつよう}なプロパティだけ{受|う}け{取|と}れるよ。
デフォルト{値|ち}も{設定|せってい}できるから、とても{実用的|じつようてき}なんだ。
:::

## {変数|へんすう}の{入|い}れ{替|か}えトリック

{分割代入|ぶんかつだいにゅう}を使うと、2つの{変数|へんすう}の{値|あたい}を{一行|いちぎょう}で{入|い}れ{替|か}えられるよ！

```javascript runnable
let a = "ポーション";
let b = "エリクサー";
console.log(`交換前: a=${a}, b=${b}`);

// 一行で入れ替え！
[a, b] = [b, a];
console.log(`交換後: a=${a}, b=${b}`);
```

:::student
{普通|ふつう}は{一時的|いちじてき}な{変数|へんすう}が{必要|ひつよう}なのに、これなら1{行|ぎょう}でできるんだ！
:::

## {実践|じっせん}：{冒険|ぼうけん}パーティの{情報|じょうほう}{処理|しょり}

{学|まな}んだことを{組|く}み{合|あ}わせてみよう！

```javascript runnable
let questResult = {
  questName: "ドラゴン討伐",
  reward: { gold: 1000, exp: 500, item: "竜の鱗" },
  members: ["アリス", "ボブ", "カルロス"]
};

// まとめて取り出す
let {
  questName,
  reward: { gold, exp, item },
  members: [leader, ...supporters]
} = questResult;

console.log(`=== ${questName} 完了！ ===`);
console.log(`リーダー: ${leader}`);
console.log(`サポート: ${supporters.join(", ")}`);
console.log(`報酬: ${gold}G, ${exp}EXP`);
console.log(`アイテム: ${item}`);
```

:::sensei
{分割代入|ぶんかつだいにゅう}は{最初|さいしょ}は{難|むずか}しく{感|かん}じるかもしれないけど、
{慣|な}れると{本当|ほんとう}に{便利|べんり}なんだ。
{特|とく}にオブジェクトの{分割代入|ぶんかつだいにゅう}はものすごくよく使うから、{覚|おぼ}えておこう！
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::

## まとめ

- {配列|はいれつ}の{分割代入|ぶんかつだいにゅう}は `[a, b, c] = 配列`
- オブジェクトの{分割代入|ぶんかつだいにゅう}は `{name, level} = オブジェクト`
- `= 値` でデフォルト{値|ち}を{設定|せってい}できる
- `{ 元の名前: 新しい名前 }` でリネームできる
- `...rest` で{残|のこ}りをまとめて{受|う}け{取|と}れる
- {関数|かんすう}の{引数|ひきすう}でも{分割代入|ぶんかつだいにゅう}できる
- `[a, b] = [b, a]` で{変数|へんすう}を{入|い}れ{替|か}えられる
