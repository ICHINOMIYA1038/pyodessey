---
title: "最終チャレンジ"
slug: "final-challenge"
order: 33
description: "すべての力を結集せよ"
world: "sky"
challenge:
  description: "レベル20以上の勇者の名前をアルファベット順に並べて表示しよう"
  starterCode: "let heroes = [\n  { name: \"ボブ\", level: 25, skills: [\"剣術\"] },\n  { name: \"アリス\", level: 30, skills: [\"魔法\", \"回復\"] },\n  { name: \"チャーリー\", level: 15, skills: [\"弓術\"] },\n];\n// レベル20以上の勇者の名前をアルファベット順に表示しよう\n"
  expectedOutput: "アリス, ボブ"
  hints:
    - "filter で level >= 20 のものだけ取り出そう"
    - "map で名前だけの配列にしよう"
    - "sort() でアルファベット順に並べよう"
    - "join(\", \") で文字列にして console.log しよう"
---

# {最終|さいしゅう}チャレンジ ー すべての{力|ちから}を{結集|けっしゅう}せよ

:::sensei
{冒険者|ぼうけんしゃ}よ...ついにこの{時|とき}が{来|き}た。
{森|もり}の{世界|せかい}で{変数|へんすう}を{学|まな}び、{海|うみ}の{世界|せかい}でクラスを{学|まな}び、
{空|そら}の{世界|せかい}でアルゴリズムを{学|まな}んだ。
{今日|きょう}は{全|すべ}てのレッスンの{集大成|しゅうたいせい}だ！
:::

:::student
{最終|さいしゅう}チャレンジ！{緊張|きんちょう}するけど...{全力|ぜんりょく}でやるよ！
:::

:::sensei
{大丈夫|だいじょうぶ}。ここまで{来|き}た{君|きみ}なら{必|かなら}ずできる。
さあ、{最後|さいご}の{冒険|ぼうけん}を{始|はじ}めよう！
:::

## チャレンジ1：データ{処理|しょり}

まずは{基本|きほん}の{復習|ふくしゅう}。{配列|はいれつ}、オブジェクト、{関数|かんすう}を{組|く}み{合|あ}わせよう。

```javascript runnable
let heroes = [
  { name: "ボブ", level: 25, skills: ["剣術"] },
  { name: "アリス", level: 30, skills: ["魔法", "回復"] },
  { name: "チャーリー", level: 15, skills: ["弓術"] },
  { name: "ダイアナ", level: 22, skills: ["盗術", "罠解除"] },
  { name: "エドワード", level: 10, skills: ["料理"] },
];

// レベル20以上のヒーローを抽出
let eliteHeroes = heroes.filter(function(h) {
  return h.level >= 20;
});

// 名前だけ取り出してソート
let names = eliteHeroes.map(function(h) {
  return h.name;
}).sort();

console.log("エリート勇者: " + names.join(", "));

// 全スキルを集める
let allSkills = [];
for (let i = 0; i < heroes.length; i++) {
  for (let j = 0; j < heroes[i].skills.length; j++) {
    allSkills.push(heroes[i].skills[j]);
  }
}
console.log("全スキル: " + allSkills.join(", "));

// 平均レベル
let totalLevel = 0;
for (let i = 0; i < heroes.length; i++) {
  totalLevel += heroes[i].level;
}
console.log("平均レベル: " + (totalLevel / heroes.length));
```

:::student
filter, map, sort...{前|まえ}のレッスンで{学|まな}んだことが{全部出|ぜんぶで}てきた！
:::

## チャレンジ2：クラスとアルゴリズム

クラスを{使|つか}って{冒険者|ぼうけんしゃ}のパーティを{管理|かんり}するシステムを{作|つく}ろう。

```javascript runnable
class Hero {
  constructor(name, role, power) {
    this.name = name;
    this.role = role;
    this.power = power;
  }

  toString() {
    return this.name + "(" + this.role + " 戦闘力:" + this.power + ")";
  }
}

class Party {
  constructor() {
    this.members = [];
  }

  add(hero) {
    this.members.push(hero);
  }

  // バブルソートで戦闘力順にソート
  sortByPower() {
    let arr = this.members.slice();
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j].power < arr[j + 1].power) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }

  totalPower() {
    let total = 0;
    for (let i = 0; i < this.members.length; i++) {
      total += this.members[i].power;
    }
    return total;
  }
}

let party = new Party();
party.add(new Hero("アキラ", "戦士", 85));
party.add(new Hero("ユキ", "魔法使い", 92));
party.add(new Hero("タロウ", "僧侶", 60));
party.add(new Hero("ハナ", "盗賊", 78));

console.log("=== パーティメンバー ===");
for (let i = 0; i < party.members.length; i++) {
  console.log((i + 1) + ". " + party.members[i].toString());
}

console.log("\n=== 戦闘力ランキング ===");
let ranked = party.sortByPower();
for (let i = 0; i < ranked.length; i++) {
  console.log((i + 1) + "位: " + ranked[i].toString());
}

console.log("\n合計戦闘力: " + party.totalPower());
```

:::sensei
クラス、ソートアルゴリズム、{配列操作|はいれつそうさ}を{組|く}み{合|あ}わせたね。
{次|つぎ}はもっと{難|むずか}しくなるよ！
:::

## チャレンジ3：{再帰|さいき}とデータ{構造|こうぞう}

{再帰|さいき}と{木構造|きこうぞう}を{使|つか}って、スキルツリーを{作|つく}ろう。

```javascript runnable
class SkillNode {
  constructor(name, cost) {
    this.name = name;
    this.cost = cost;
    this.children = [];
    this.unlocked = false;
  }

  addChild(node) {
    this.children.push(node);
    return node;
  }
}

// スキルツリーを構築
let root = new SkillNode("基本攻撃", 0);
root.unlocked = true;

let sword = root.addChild(new SkillNode("剣術", 10));
let magic = root.addChild(new SkillNode("魔法", 10));

let heavySlash = sword.addChild(new SkillNode("強斬り", 20));
let counter = sword.addChild(new SkillNode("カウンター", 15));
heavySlash.addChild(new SkillNode("必殺剣", 50));

let fire = magic.addChild(new SkillNode("ファイア", 15));
let ice = magic.addChild(new SkillNode("ブリザド", 15));
fire.addChild(new SkillNode("メテオ", 40));
ice.addChild(new SkillNode("ダイヤモンドダスト", 40));

// 再帰でスキルツリーを表示
function displayTree(node, depth) {
  let indent = "  ".repeat(depth);
  let status = node.unlocked ? "[習得済]" : "[未習得]";
  console.log(indent + status + " " + node.name + " (コスト:" + node.cost + ")");
  for (let i = 0; i < node.children.length; i++) {
    displayTree(node.children[i], depth + 1);
  }
}

// 再帰で全コストを計算
function totalCost(node) {
  let cost = node.cost;
  for (let i = 0; i < node.children.length; i++) {
    cost += totalCost(node.children[i]);
  }
  return cost;
}

// 再帰でスキル数を数える
function countSkills(node) {
  let count = 1;
  for (let i = 0; i < node.children.length; i++) {
    count += countSkills(node.children[i]);
  }
  return count;
}

console.log("=== スキルツリー ===");
displayTree(root, 0);
console.log("\n全スキル数: " + countSkills(root));
console.log("全習得に必要なポイント: " + totalCost(root));
```

:::student
{再帰|さいき}で{木|き}を{辿|たど}るのも{前|まえ}のレッスンでやったね！
{全部|ぜんぶ}つながってる...！
:::

## チャレンジ4：{総合力|そうごうりょく}テスト

{全|すべ}ての{知識|ちしき}を{結集|けっしゅう}した{最終問題|さいしゅうもんだい}だ。
ダンジョンを{探索|たんさく}して{宝物|たからもの}を{集|あつ}め、{最適|さいてき}な{戦略|せんりゃく}を{立|た}てよう。

```javascript runnable
// --- グラフ：ダンジョンの部屋 ---
class Dungeon {
  constructor() { this.rooms = {}; }
  addRoom(name) { this.rooms[name] = { neighbors: [], treasure: null, monster: null }; }
  connect(a, b) {
    this.rooms[a].neighbors.push(b);
    this.rooms[b].neighbors.push(a);
  }
  setTreasure(room, item) { this.rooms[room].treasure = item; }
  setMonster(room, monster) { this.rooms[room].monster = monster; }

  // BFSで全部屋を探索
  explore(start) {
    let visited = {};
    let queue = [start];
    visited[start] = true;
    let log = [];
    while (queue.length > 0) {
      let current = queue.shift();
      let room = this.rooms[current];
      let entry = "【" + current + "】";
      if (room.monster) entry += " 敵:" + room.monster;
      if (room.treasure) entry += " 宝:" + room.treasure.name;
      log.push(entry);
      for (let i = 0; i < room.neighbors.length; i++) {
        if (!visited[room.neighbors[i]]) {
          visited[room.neighbors[i]] = true;
          queue.push(room.neighbors[i]);
        }
      }
    }
    return log;
  }
}

// --- ナップサック：アイテム選択 ---
function bestLoot(items, capacity) {
  let n = items.length;
  let table = [];
  for (let i = 0; i <= n; i++) {
    table[i] = [];
    for (let w = 0; w <= capacity; w++) table[i][w] = 0;
  }
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      table[i][w] = table[i - 1][w];
      if (items[i - 1].weight <= w) {
        let val = table[i - 1][w - items[i - 1].weight] + items[i - 1].value;
        if (val > table[i][w]) table[i][w] = val;
      }
    }
  }
  return table[n][capacity];
}

// ダンジョン構築
let d = new Dungeon();
["入口","広間","東の部屋","西の部屋","奥の間","ボス部屋"].forEach(function(r) { d.addRoom(r); });
d.connect("入口", "広間");
d.connect("広間", "東の部屋");
d.connect("広間", "西の部屋");
d.connect("東の部屋", "奥の間");
d.connect("西の部屋", "奥の間");
d.connect("奥の間", "ボス部屋");

d.setMonster("広間", "ゴブリン");
d.setMonster("東の部屋", "スケルトン");
d.setMonster("ボス部屋", "ドラゴン");
d.setTreasure("西の部屋", { name: "金の指輪", weight: 1, value: 15 });
d.setTreasure("東の部屋", { name: "魔法の杖", weight: 4, value: 30 });
d.setTreasure("奥の間", { name: "ダイヤの盾", weight: 5, value: 25 });
d.setTreasure("ボス部屋", { name: "伝説の剣", weight: 3, value: 50 });

// 探索
console.log("=== ダンジョン探索（BFS）===");
let log = d.explore("入口");
for (let i = 0; i < log.length; i++) console.log(log[i]);

// 発見した宝物でナップサック問題
let treasures = [];
let rooms = Object.keys(d.rooms);
for (let i = 0; i < rooms.length; i++) {
  if (d.rooms[rooms[i]].treasure) {
    treasures.push(d.rooms[rooms[i]].treasure);
  }
}

console.log("\n=== 発見した宝物 ===");
for (let i = 0; i < treasures.length; i++) {
  let t = treasures[i];
  console.log(t.name + " (重さ:" + t.weight + " 価値:" + t.value + ")");
}

let bagCapacity = 8;
console.log("\n袋の容量: " + bagCapacity);
console.log("持ち帰れる最大価値: " + bestLoot(treasures, bagCapacity));
```

:::sensei
グラフ{探索|たんさく}でダンジョンを{回|まわ}り、ナップサック{問題|もんだい}でアイテムを{選|えら}ぶ。
{複数|ふくすう}のアルゴリズムを{組|く}み{合|あ}わせるのが{本当|ほんとう}の{実力|じつりょく}だ！
:::

## {冒険|ぼうけん}の{軌跡|きせき}

ここまでの{全|すべ}てのレッスンを{振|ふ}り{返|かえ}ってみよう。

```javascript runnable
let journey = [
  { world: "森", lessons: ["変数", "数値と文字列", "条件分岐", "ループ", "配列", "文字列操作"] },
  { world: "森", lessons: ["オブジェクト", "関数", "アロー関数", "エラー処理"] },
  { world: "海", lessons: ["スコープ", "配列メソッド", "分割代入", "スプレッド"] },
  { world: "海", lessons: ["クラス基礎", "クラス応用", "高階関数", "正規表現"] },
  { world: "海", lessons: ["Map/Set", "イテレータ", "アルゴリズム入門", "JSON"] },
  { world: "海", lessons: ["便利なパターン", "データ処理", "テキスト処理", "シミュレーション", "ミニプロジェクト"] },
  { world: "空", lessons: ["再帰", "スタックとキュー", "木構造", "グラフ", "動的計画法", "最終チャレンジ"] },
];

let totalLessons = 0;
for (let i = 0; i < journey.length; i++) {
  let w = journey[i];
  totalLessons += w.lessons.length;
}

console.log("=== 冒険の軌跡 ===");
console.log("");

for (let i = 0; i < journey.length; i++) {
  let w = journey[i];
  let icon = w.world === "森" ? "[森]" : w.world === "海" ? "[海]" : "[空]";
  console.log(icon + " " + w.world + "の世界");
  for (let j = 0; j < w.lessons.length; j++) {
    console.log("  * " + w.lessons[j]);
  }
}

console.log("");
console.log("全" + totalLessons + "レッスン クリア！");
```

:::student
こんなにたくさんのことを{学|まな}んだんだ...！
{最初|さいしょ}は `let x = 5` もわからなかったのに...
:::

## {冒険者|ぼうけんしゃ}への{最後|さいご}のメッセージ

```javascript runnable
function generateStars(n) {
  let result = "";
  for (let i = 0; i < n; i++) {
    result += "*";
  }
  return result;
}

let width = 30;
let message = "CONGRATULATIONS!";
let padding = Math.floor((width - message.length) / 2);

console.log(generateStars(width));
console.log(generateStars(width));
console.log("");
let spaces = "";
for (let i = 0; i < padding; i++) spaces += " ";
console.log(spaces + message);
console.log("");

let lines = [
  "全てのレッスンをクリアした！",
  "",
  "君はもう立派なプログラマーだ。",
  "変数からアルゴリズムまで、",
  "JavaScriptの世界を冒険した。",
  "",
  "でも、これは終わりじゃない。",
  "ここからが本当の冒険の始まりだ！",
  "",
  "自分だけのプログラムを作ろう。",
  "新しい技術に挑戦しよう。",
  "仲間と一緒にコードを書こう。",
  "",
  "冒険は続く...！",
];

for (let i = 0; i < lines.length; i++) {
  console.log("  " + lines[i]);
}

console.log("");
console.log(generateStars(width));
console.log(generateStars(width));
```

:::sensei
{冒険者|ぼうけんしゃ}よ、{本当|ほんとう}に{素晴|すば}らしい{旅|たび}だったね。
{君|きみ}が{学|まな}んだ{全|すべ}てのスキルは、これからの{冒険|ぼうけん}できっと{役|やく}に{立|た}つ。
{変数|へんすう}、{関数|かんすう}、クラス、アルゴリズム...
{一|ひと}つ{一|ひと}つが{君|きみ}の{武器|ぶき}になったはずだ。
:::

:::student
ありがとう、{先生|せんせい}！
プログラミングって{最初|さいしょ}は{怖|こわ}かったけど、
やってみたらすごく{楽|たの}しかった！
もっともっと{色|いろ}んなものを{作|つく}ってみたい！
:::

:::sensei
その{気持|きも}ちがあれば{大丈夫|だいじょうぶ}。
{困|こま}ったときは、いつでもレッスンを{見返|みかえ}しにおいで。
{君|きみ}の{冒険|ぼうけん}はまだまだ{続|つづ}くよ。
{行|い}ってこい、{勇者|ゆうしゃ}よ！
:::
