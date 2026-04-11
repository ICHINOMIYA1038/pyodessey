---
title: "MapとSet"
slug: "map-set"
order: 19
description: "特別なコレクション"
world: "castle"
challenge:
  description: "配列 [1, 2, 2, 3, 3, 3, 4] からSetで重複を除いてサイズを表示しよう！"
  starterCode: "let numbers = [1, 2, 2, 3, 3, 3, 4];\n\n// Set を使って重複を除こう\n"
  expectedOutput: "4"
  hints:
    - "new Set(numbers) で配列から Set を作れるよ"
    - "Set の .size プロパティで要素の数がわかるよ"
    - "console.log(new Set(numbers).size); で答えが出るよ"
---

# MapとSet

:::sensei
{城|しろ}の{宝物庫|ほうもつこ}には{特別|とくべつ}なコレクションがあるんだ。
{今日|きょう}は **Set** と **Map** という2つの{便利|べんり}なデータ{構造|こうぞう}を{学|まな}ぶよ！
:::

:::student
{配列|はいれつ}やオブジェクトとは{違|ちが}うの？
:::

:::sensei
{似|に}ているけど、それぞれ{得意|とくい}なことが{違|ちが}うんだ。
**Set** は「{重複|じゅうふく}しない{値|あたい}の{集合|しゅうごう}」、
**Map** は「どんな{型|かた}でもキーにできる{辞書|じしょ}」だよ！
:::

## Set — {重複|じゅうふく}しない{値|あたい}の{集合|しゅうごう}

Set には{同|おな}じ{値|あたい}を2{回|かい}{入|い}れることができないよ。

```javascript runnable
// Set を作る
let partyMembers = new Set();

// add で追加
partyMembers.add("勇者");
partyMembers.add("魔法使い");
partyMembers.add("戦士");
partyMembers.add("勇者");  // 重複！無視される

console.log(partyMembers.size); // 3（重複は入らない）

// has で存在チェック
console.log(partyMembers.has("勇者"));    // true
console.log(partyMembers.has("盗賊"));    // false

// delete で削除
partyMembers.delete("戦士");
console.log(partyMembers.size); // 2

// for...of で繰り返し
for (let member of partyMembers) {
  console.log(member);
}
```

:::hint
`add()` で{追加|ついか}、`has()` で{存在|そんざい}チェック、`delete()` で{削除|さくじょ}、`size` で{要素数|ようそすう}。
{配列|はいれつ}の `push`、`includes`、`length` に{似|に}ているね！
:::

## Set で{配列|はいれつ}の{重複|じゅうふく}を{除|のぞ}く

Set の{一番|いちばん}よく{使|つか}われるパターンがこれ！

```javascript runnable
// 重複のある配列
let items = ["ポーション", "エリクサー", "ポーション", "聖水", "エリクサー", "ポーション"];
console.log("元の配列:", items.length + "個");

// Set に変換して重複除去
let uniqueSet = new Set(items);
console.log("Set:", uniqueSet.size + "個");

// Set を配列に戻す（スプレッド構文）
let uniqueArray = [...uniqueSet];
console.log(uniqueArray);

// 1行でも書ける！
let unique = [...new Set(items)];
console.log(unique);

// 数値でも同じ
let scores = [100, 80, 100, 90, 80, 70, 90];
let uniqueScores = [...new Set(scores)];
console.log(uniqueScores);
```

:::student
`[...new Set(配列)]` で{一発|いっぱつ}で{重複|じゅうふく}を{消|け}せるんだ！すごい！
:::

## Set の{集合演算|しゅうごうえんざん}

{数学|すうがく}の{集合|しゅうごう}みたいな{操作|そうさ}もできるよ。

```javascript runnable
let partyA = new Set(["勇者", "魔法使い", "戦士"]);
let partyB = new Set(["魔法使い", "僧侶", "盗賊"]);

// 和集合（どちらかにいるメンバー）
let union = new Set([...partyA, ...partyB]);
console.log("和集合:", [...union]);

// 積集合（両方にいるメンバー）
let intersection = new Set([...partyA].filter(x => partyB.has(x)));
console.log("積集合:", [...intersection]);

// 差集合（Aにいて Bにいない）
let difference = new Set([...partyA].filter(x => !partyB.has(x)));
console.log("差集合:", [...difference]);
```

:::sensei
Set を{配列|はいれつ}に{変換|へんかん}してから `filter` を{使|つか}うのがコツだよ。
`has()` は{高速|こうそく}だから、たくさんの{要素|ようそ}でも{速|はや}く{検索|けんさく}できるんだ！
:::

## Map — {何|なん}でもキーにできる{辞書|じしょ}

{普通|ふつう}のオブジェクトは{文字列|もじれつ}しかキーにできないけど、Map は{何|なん}でもキーにできるよ。

```javascript runnable
// Map を作る
let inventory = new Map();

// set でキーと値をセット
inventory.set("ポーション", 5);
inventory.set("エリクサー", 2);
inventory.set("聖水", 10);

// get で値を取得
console.log(inventory.get("ポーション")); // 5
console.log(inventory.get("なし"));       // undefined

// has でキーの存在チェック
console.log(inventory.has("エリクサー")); // true

// size で要素数
console.log(inventory.size); // 3

// delete で削除
inventory.delete("聖水");
console.log(inventory.size); // 2

// for...of で繰り返し
for (let [key, value] of inventory) {
  console.log(`${key}: ${value}個`);
}
```

:::hint
Map は `set(キー, 値)` で{追加|ついか}、`get(キー)` で{取得|しゅとく}だよ。
オブジェクトの `obj[key] = value` と `obj[key]` に{似|に}ているね！
:::

## Map vs オブジェクト — {何|なに}が{違|ちが}う？

```javascript runnable
// オブジェクトはキーが文字列だけ
let objMap = {};
objMap["name"] = "勇者";
objMap[42] = "数字キー";     // "42" に変換される
console.log(Object.keys(objMap)); // 全部文字列

// Map は何でもキーにできる！
let realMap = new Map();
realMap.set("name", "勇者");
realMap.set(42, "数字キー");         // 数値のまま
realMap.set(true, "真偽値キー");     // 真偽値もOK

let hero = { name: "勇者" };
realMap.set(hero, "オブジェクトキー"); // オブジェクトもOK！

console.log(realMap.get(42));      // "数字キー"
console.log(realMap.get(true));    // "真偽値キー"
console.log(realMap.get(hero));    // "オブジェクトキー"
console.log(realMap.size);         // 4

// Map は挿入順が保証される
for (let [key, value] of realMap) {
  console.log(typeof key + ": " + value);
}
```

:::student
オブジェクトをキーにできるのはすごい！{敵|てき}のオブジェクトをキーにして{情報|じょうほう}を{紐|ひも}づけたりできるね！
:::

## Map の{実践|じっせん} — {出現回数|しゅつげんかいすう}カウント

Map を{使|つか}って{要素|ようそ}の{出現回数|しゅつげんかいすう}を{数|かぞ}えてみよう。

```javascript runnable
// モンスターの出現回数をカウント
let encounters = ["スライム", "ゴブリン", "スライム", "ドラゴン", "スライム", "ゴブリン"];

let countMap = new Map();

for (let monster of encounters) {
  if (countMap.has(monster)) {
    countMap.set(monster, countMap.get(monster) + 1);
  } else {
    countMap.set(monster, 1);
  }
}

// 結果を表示
for (let [monster, count] of countMap) {
  console.log(`${monster}: ${count}回`);
}

// 一番多いモンスターを見つける
let maxCount = 0;
let maxMonster = "";
for (let [monster, count] of countMap) {
  if (count > maxCount) {
    maxCount = count;
    maxMonster = monster;
  }
}
console.log(`最多: ${maxMonster}（${maxCount}回）`);
```

:::sensei
{出現回数|しゅつげんかいすう}のカウントは{本当|ほんとう}によく{使|つか}うパターンだよ。
Map なら{順序|じゅんじょ}も{保持|ほじ}されるし、`size` で{要素数|ようそすう}もすぐわかる！
:::

## Map の{便利|べんり}メソッド

```javascript runnable
// 配列からMapを作る
let entries = [["HP", 100], ["MP", 50], ["ATK", 30]];
let stats = new Map(entries);
console.log(stats);

// keys(), values(), entries()
console.log([...stats.keys()]);     // キーの配列
console.log([...stats.values()]);   // 値の配列

// forEach も使える
stats.forEach(function(value, key) {
  console.log(`${key} = ${value}`);
});

// clear で全削除
stats.clear();
console.log(stats.size); // 0
```

:::hint
`keys()` でキーだけ、`values()` で{値|あたい}だけ、`entries()` で{両方|りょうほう}を{取得|しゅとく}できるよ。
{配列|はいれつ}に{変換|へんかん}するときはスプレッド{構文|こうぶん} `[...]` を{使|つか}おう！
:::

## Set と Map の{使|つか}い{分|わ}け

```javascript runnable
// Set: 「何があるか」だけ知りたいとき
let visitedDungeons = new Set();
visitedDungeons.add("森のダンジョン");
visitedDungeons.add("氷の洞窟");
visitedDungeons.add("森のダンジョン"); // 重複無視

console.log("訪問済みダンジョン数:", visitedDungeons.size);
console.log("森クリア済み?", visitedDungeons.has("森のダンジョン"));

// Map: 「何がいくつあるか」を知りたいとき
let treasureBox = new Map();
treasureBox.set("金貨", 150);
treasureBox.set("宝石", 5);
treasureBox.set("鍵", 3);

console.log("金貨:", treasureBox.get("金貨") + "枚");

// 配列の重複チェックもSetが便利
function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}

console.log(hasDuplicates([1, 2, 3]));       // false
console.log(hasDuplicates([1, 2, 2, 3]));    // true
```

:::sensei
- **Set** → {重複|じゅうふく}なしの{集合|しゅうごう}。「{入|はい}っているか？」が{得意|とくい}
- **Map** → キーと{値|あたい}のペア。{何|なん}でもキーにできる
- **{配列|はいれつ}** → {順番|じゅんばん}が{大事|だいじ}なとき
- **オブジェクト** → {固定|こてい}の{構造|こうぞう}（{名前|なまえ}、HP、MPなど）

{場面|ばめん}に{合|あ}わせて{使|つか}い{分|わ}けよう！
:::

## まとめ

:::sensei
{今日|きょう}の{冒険|ぼうけん}で{手|て}に{入|い}れた{知識|ちしき}をまとめよう！

- **Set**: {重複|じゅうふく}しない{値|あたい}の{集合|しゅうごう}（`add`, `has`, `delete`, `size`）
- `[...new Set(配列)]` で{配列|はいれつ}の{重複|じゅうふく}を{除去|じょきょ}
- {集合演算|しゅうごうえんざん}（{和|わ}・{積|せき}・{差|さ}）も{簡単|かんたん}
- **Map**: どんな{型|かた}でもキーにできる（`set`, `get`, `has`, `delete`, `size`）
- {出現回数|しゅつげんかいすう}カウントに{最適|さいてき}
- `keys()`, `values()`, `entries()` で{中身|なかみ}を{取|と}り{出|だ}せる

チャレンジで Set を{使|つか}った{重複除去|じゅうふくじょきょ}を{試|ため}してみよう！
:::

:::student
Set で{重複|じゅうふく}を{消|け}すのが{一番|いちばん}かっこいいと{思|おも}った！
:::
