---
title: "データ処理"
slug: "data-processing"
order: 24
description: "大量のデータをさばこう"
world: "sea"
challenge:
  description: "モンスター配列から hp の平均値を計算して表示しよう"
  starterCode: "let monsters = [\n  { name: \"スライム\", hp: 30 },\n  { name: \"ゴブリン\", hp: 50 },\n  { name: \"ドラゴン\", hp: 100 },\n];\n// hp の平均を計算しよう\n"
  expectedOutput: "60"
  hints:
    - "reduce で hp の合計を求めよう"
    - "合計を monsters.length で割ると平均が出るよ"
    - "console.log(average); で表示しよう"
---

# データ{処理|しょり} ー {大量|たいりょう}のデータをさばこう

:::sensei
{冒険者|ぼうけんしゃ}よ、{今日|きょう}は{大量|たいりょう}のデータを{処理|しょり}する{技|わざ}を{学|まな}ぶよ。
RPGでいうと、モンスター{図鑑|ずかん}のデータを{分析|ぶんせき}するような{感|かん}じだね。
{配列|はいれつ}のメソッドを{組|く}み{合|あ}わせれば、どんなデータも{自在|じざい}に{操|あやつ}れるんだ！
:::

:::student
データ{分析|ぶんせき}！なんだかかっこいい！
:::

## オブジェクトの{配列|はいれつ}を{処理|しょり}する

まずは{基本|きほん}。オブジェクトの{配列|はいれつ}から{特定|とくてい}の{情報|じょうほう}を{取|と}り{出|だ}してみよう。

```javascript runnable
let monsters = [
  { name: "スライム", hp: 30, type: "水" },
  { name: "ゴブリン", hp: 50, type: "地" },
  { name: "ドラゴン", hp: 100, type: "火" },
  { name: "フェニックス", hp: 80, type: "火" },
  { name: "ゴーレム", hp: 120, type: "地" }
];

// 名前だけ取り出す
let names = monsters.map(m => m.name);
console.log(names);

// hpだけ取り出す
let hpList = monsters.map(m => m.hp);
console.log(hpList);
```

:::sensei
`map` は{配列|はいれつ}の{各要素|かくようそ}を{変換|へんかん}して{新|あたら}しい{配列|はいれつ}を作るメソッドだったね。
オブジェクトの{配列|はいれつ}から{特定|とくてい}のプロパティだけ{取|と}り{出|だ}すのに{最適|さいてき}だよ！
:::

## フィルタリング：{条件|じょうけん}で{絞|しぼ}り{込|こ}む

`filter` を使って、{条件|じょうけん}に{合|あ}うデータだけを{取|と}り{出|だ}そう。

```javascript runnable
let monsters = [
  { name: "スライム", hp: 30, type: "水", level: 1 },
  { name: "ゴブリン", hp: 50, type: "地", level: 3 },
  { name: "ドラゴン", hp: 100, type: "火", level: 10 },
  { name: "フェニックス", hp: 80, type: "火", level: 8 },
  { name: "ゴーレム", hp: 120, type: "地", level: 7 },
  { name: "クラーケン", hp: 90, type: "水", level: 9 }
];

// HPが80以上のモンスター
let strong = monsters.filter(m => m.hp >= 80);
console.log("強いモンスター:");
strong.forEach(m => console.log("  " + m.name + " (HP:" + m.hp + ")"));

// 火属性のモンスター
let fireType = monsters.filter(m => m.type === "火");
console.log("火属性:");
fireType.forEach(m => console.log("  " + m.name));
```

:::student
{条件|じょうけん}にあうものだけピックアップできるんだ！モンスター{図鑑|ずかん}の{検索|けんさく}みたいだね！
:::

## {複数条件|ふくすうじょうけん}でフィルタリング

`&&` や `||` を使えば、{複数|ふくすう}の{条件|じょうけん}を{組|く}み{合|あ}わせられるよ。

```javascript runnable
let items = [
  { name: "ポーション", price: 100, type: "回復", rare: false },
  { name: "エリクサー", price: 5000, type: "回復", rare: true },
  { name: "鉄の剣", price: 500, type: "武器", rare: false },
  { name: "伝説の剣", price: 50000, type: "武器", rare: true },
  { name: "皮の盾", price: 300, type: "防具", rare: false },
  { name: "エーテル", price: 200, type: "回復", rare: false }
];

// 回復アイテムかつ価格1000以下
let cheapHeals = items.filter(i => i.type === "回復" && i.price <= 1000);
console.log("お手頃な回復アイテム:");
cheapHeals.forEach(i => console.log("  " + i.name + " (" + i.price + "G)"));

// レアアイテムまたは価格5000以上
let special = items.filter(i => i.rare || i.price >= 5000);
console.log("特別なアイテム:");
special.forEach(i => console.log("  " + i.name));
```

## {集計|しゅうけい}：{合計|ごうけい}・{平均|へいきん}・{最大|さいだい}・{最小|さいしょう}

`reduce` を使えば、データの{集計|しゅうけい}ができるよ。

```javascript runnable
let scores = [
  { name: "ゆうしゃ", score: 85 },
  { name: "まほうつかい", score: 92 },
  { name: "せんし", score: 78 },
  { name: "そうりょ", score: 88 },
  { name: "とうぞく", score: 95 }
];

// 合計
let total = scores.reduce((sum, s) => sum + s.score, 0);
console.log("合計: " + total);

// 平均
let average = total / scores.length;
console.log("平均: " + average);

// 最大値
let max = scores.reduce((m, s) => s.score > m ? s.score : m, 0);
console.log("最高点: " + max);

// 最小値
let min = scores.reduce((m, s) => s.score < m ? s.score : m, Infinity);
console.log("最低点: " + min);
```

:::sensei
`reduce` は{配列|はいれつ}を「{一|ひと}つの{値|あたい}」にまとめるメソッドだよ。
{合計|ごうけい}、{平均|へいきん}、{最大|さいだい}、{最小|さいしょう}...なんでも{計算|けいさん}できる{万能|ばんのう}な{技|わざ}なんだ！
:::

## グルーピング：データを{分類|ぶんるい}する

`reduce` を使えば、データをグループに{分|わ}けることもできるよ。

```javascript runnable
let monsters = [
  { name: "スライム", type: "水" },
  { name: "ゴブリン", type: "地" },
  { name: "ドラゴン", type: "火" },
  { name: "フェニックス", type: "火" },
  { name: "ゴーレム", type: "地" },
  { name: "クラーケン", type: "水" },
  { name: "サラマンダー", type: "火" }
];

// 属性ごとにグループ分け
let groups = monsters.reduce((acc, m) => {
  if (!acc[m.type]) {
    acc[m.type] = [];
  }
  acc[m.type].push(m.name);
  return acc;
}, {});

console.log("属性別モンスター:");
let types = Object.keys(groups);
for (let i = 0; i < types.length; i++) {
  let type = types[i];
  console.log("  " + type + ": " + groups[type].join(", "));
}
```

:::student
{属性|ぞくせい}ごとに{自動|じどう}で{分類|ぶんるい}された！これはすごい！
:::

## ソート：データを{並|なら}べ{替|か}える

`sort` を使えば、{自由|じゆう}な{基準|きじゅん}でデータを{並|なら}べ{替|か}えられるよ。

```javascript runnable
let heroes = [
  { name: "ゆうしゃ", level: 25, hp: 200 },
  { name: "まほうつかい", level: 30, hp: 120 },
  { name: "せんし", level: 22, hp: 250 },
  { name: "そうりょ", level: 28, hp: 150 }
];

// レベル順（高い順）
let byLevel = [...heroes].sort((a, b) => b.level - a.level);
console.log("レベル順:");
byLevel.forEach(h => console.log("  " + h.name + " Lv." + h.level));

// HP順（低い順）
let byHp = [...heroes].sort((a, b) => a.hp - b.hp);
console.log("HP順（低→高）:");
byHp.forEach(h => console.log("  " + h.name + " HP:" + h.hp));
```

:::hint
`[...heroes]` でコピーを作ってからソートしているよ。
`sort` は{元|もと}の{配列|はいれつ}を{変更|へんこう}してしまうから、
{元|もと}を{残|のこ}したいときはコピーを作るのがコツだよ。
:::

## データの{変換|へんかん}：{形|かたち}を{変|か}える

`map` で{配列|はいれつ}のデータの{形|かたち}を{変換|へんかん}してみよう。

```javascript runnable
let rawData = [
  { firstName: "太郎", lastName: "山田", age: 14 },
  { firstName: "花子", lastName: "鈴木", age: 13 },
  { firstName: "次郎", lastName: "田中", age: 15 }
];

// データの形を変換
let formatted = rawData.map(person => {
  return {
    fullName: person.lastName + " " + person.firstName,
    isAdult: person.age >= 15,
    display: person.lastName + person.firstName + "（" + person.age + "歳）"
  };
});

formatted.forEach(p => {
  console.log(p.display + " - 大人: " + p.isAdult);
});
```

## データパイプライン：{処理|しょり}をつなげる

`filter` → `map` → `reduce` のように{処理|しょり}をつなげると、{複雑|ふくざつ}なデータ{処理|しょり}もスマートに{書|か}けるよ。

```javascript runnable
let questLog = [
  { name: "スライム退治", reward: 100, completed: true },
  { name: "薬草採集", reward: 50, completed: true },
  { name: "洞窟探検", reward: 300, completed: false },
  { name: "ゴブリン討伐", reward: 200, completed: true },
  { name: "ドラゴン討伐", reward: 1000, completed: false },
  { name: "村の護衛", reward: 150, completed: true }
];

// 完了したクエストの報酬合計
let totalReward = questLog
  .filter(q => q.completed)
  .map(q => q.reward)
  .reduce((sum, r) => sum + r, 0);

console.log("獲得報酬合計: " + totalReward + "G");

// 未完了クエストの名前一覧
let remaining = questLog
  .filter(q => !q.completed)
  .map(q => q.name + "（" + q.reward + "G）");

console.log("未完了クエスト:");
remaining.forEach(q => console.log("  " + q));

// 完了率
let rate = Math.round(
  questLog.filter(q => q.completed).length / questLog.length * 100
);
console.log("クエスト完了率: " + rate + "%");
```

:::sensei
`filter` → `map` → `reduce` のチェーンは「データパイプライン」と{呼|よ}ばれる{考|かんが}え{方|かた}だよ。
{大量|たいりょう}のデータを{段階的|だんかいてき}に{加工|かこう}していくイメージだね。
プロの{現場|げんば}でもこのパターンは{毎日|まいにち}のように使うんだ！
:::

## {実践|じっせん}：パーティ{分析|ぶんせき}レポート

{全|すべ}ての{技|わざ}を{組|く}み{合|あ}わせて、パーティの{分析|ぶんせき}レポートを作ってみよう。

```javascript runnable
let party = [
  { name: "ゆうしゃ", role: "戦士", hp: 200, mp: 30, attack: 50, level: 25 },
  { name: "まほうつかい", role: "魔法", hp: 100, mp: 120, attack: 20, level: 28 },
  { name: "せんし", role: "戦士", hp: 250, mp: 10, attack: 60, level: 22 },
  { name: "そうりょ", role: "回復", hp: 130, mp: 100, attack: 15, level: 27 },
  { name: "とうぞく", role: "戦士", hp: 150, mp: 20, attack: 45, level: 24 }
];

console.log("=== パーティ分析レポート ===");

// 平均レベル
let avgLevel = party.reduce((s, m) => s + m.level, 0) / party.length;
console.log("平均レベル: " + avgLevel);

// 最高攻撃力のメンバー
let strongest = party.reduce((best, m) => m.attack > best.attack ? m : best);
console.log("最強アタッカー: " + strongest.name + "（攻撃力" + strongest.attack + "）");

// 役割別の人数
let roleCount = party.reduce((acc, m) => {
  acc[m.role] = (acc[m.role] || 0) + 1;
  return acc;
}, {});
console.log("役割別人数:");
let roles = Object.keys(roleCount);
for (let i = 0; i < roles.length; i++) {
  console.log("  " + roles[i] + ": " + roleCount[roles[i]] + "人");
}

// HP合計とMP合計
let totalHp = party.reduce((s, m) => s + m.hp, 0);
let totalMp = party.reduce((s, m) => s + m.mp, 0);
console.log("パーティ総HP: " + totalHp);
console.log("パーティ総MP: " + totalMp);
```

:::student
データ{処理|しょり}ってこんなにいろいろできるんだ！
{配列|はいれつ}メソッドの{組|く}み{合|あ}わせって{最強|さいきょう}だね！
:::

:::sensei
そのとおり！`filter`、`map`、`reduce` の3つを{自在|じざい}に使えるようになれば、
どんなデータ{処理|しょり}もこわくないよ。
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::

## まとめ

- `map` でデータの{形|かたち}を{変換|へんかん}する
- `filter` で{条件|じょうけん}に{合|あ}うデータを{絞|しぼ}り{込|こ}む
- `reduce` で{合計|ごうけい}・{平均|へいきん}・{最大|さいだい}・{最小|さいしょう}を{計算|けいさん}する
- `reduce` でグルーピング（{分類|ぶんるい}）もできる
- `sort` で{自由|じゆう}な{基準|きじゅん}でソートできる
- `filter` → `map` → `reduce` のパイプラインで{複雑|ふくざつ}な{処理|しょり}をスマートに
