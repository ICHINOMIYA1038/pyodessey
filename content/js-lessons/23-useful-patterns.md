---
title: "便利なパターン"
slug: "useful-patterns"
order: 23
description: "プロの技を学ぼう"
world: "sea"
challenge:
  description: "optional chaining で存在しないプロパティを安全にアクセスしよう"
  starterCode: "let data = { user: { name: \"太郎\" } };\n// data.user.address?.city が undefined なら \"なし\" と表示\n"
  expectedOutput: "なし"
  hints:
    - "data.user.address?.city で安全にアクセスできるよ"
    - "?? 演算子を使って undefined のとき代わりの値を返そう"
    - "console.log(data.user.address?.city ?? \"なし\"); で完成！"
---

# {便利|べんり}なパターン ー プロの{技|わざ}を{学|まな}ぼう

:::sensei
{冒険者|ぼうけんしゃ}よ、{今日|きょう}はプロのJavaScript{使|つか}いが{普段|ふだん}から{使|つか}っている
{便利|べんり}なテクニックを{教|おし}えるよ。
これをマスターすれば、コードがグッとスマートになるんだ！
:::

:::student
プロの{技|わざ}！？かっこいい！{早|はや}く{教|おし}えて！
:::

:::sensei
まずは「{安全|あんぜん}にデータにアクセスする{方法|ほうほう}」からだ。
ゲームでいうと、{存在|そんざい}しないアイテムを{使|つか}おうとしてエラーになるのを{防|ふせ}ぐ{技|わざ}だね。
:::

## オプショナルチェイニング（?.）

オブジェクトの{中身|なかみ}にアクセスするとき、{途中|とちゅう}のプロパティが{存在|そんざい}しないとエラーになるよね。
`?.` を使うと、{安全|あんぜん}にアクセスできるんだ。

```javascript runnable
let hero = {
  name: "ゆうしゃ",
  equipment: {
    weapon: "はがねのつるぎ"
  }
};

// equipment はあるから OK
console.log(hero.equipment.weapon);

// armor は存在しない → ?. を使えば安全
console.log(hero.armor?.name);

// ?. がないと…エラーになる場面を安全に回避！
console.log(hero.equipment?.shield?.defense);
```

:::student
`undefined` が{表示|ひょうじ}されるだけで、エラーにならない！これは{便利|べんり}だ！
:::

:::hint
`?.` は「その{前|まえ}の{値|あたい}が `null` や `undefined` だったら、そこで{止|と}めて `undefined` を{返|かえ}す」という{意味|いみ}だよ。
エラーにならないから{安心|あんしん}してアクセスできるんだ。
:::

## {深|ふか}いネストを{安全|あんぜん}にたどる

RPGのセーブデータみたいに{深|ふか}い{構造|こうぞう}でも `?.` が{大活躍|だいかつやく}するよ。

```javascript runnable
let saveData = {
  player: {
    name: "ゆうしゃ",
    stats: {
      hp: 100,
      mp: 50
    }
  }
  // guild プロパティは存在しない
};

// 安全にアクセス
console.log(saveData.player?.name);
console.log(saveData.player?.stats?.hp);
console.log(saveData.guild?.name);
console.log(saveData.guild?.members?.length);

// メソッドにも使える
let result = saveData.player?.getTitle?.();
console.log(result);
```

:::sensei
`?.` はプロパティアクセスだけじゃなく、メソッド{呼|よ}び{出|だ}しにも使えるよ。
`obj.method?.()` と{書|か}けば、メソッドがなくてもエラーにならないんだ。
:::

## Null{合体|がったい}{演算子|えんざんし}（??）

`??` は「{左側|ひだりがわ}が `null` か `undefined` のとき、{右側|みぎがわ}の{値|あたい}を使う」という{演算子|えんざんし}だよ。

```javascript runnable
let hero = {
  name: "ゆうしゃ",
  title: null
};

// ?? で代わりの値を設定
let displayName = hero.name ?? "名無し";
let displayTitle = hero.title ?? "称号なし";
let displayGuild = hero.guild ?? "ギルド未所属";

console.log(displayName);
console.log(displayTitle);
console.log(displayGuild);
```

:::student
`??` は「{値|あたい}がないときの{代|か}わり」を{決|き}められるんだね！
:::

## ?. と ?? を{組|く}み{合|あ}わせる

`?.` と `??` は{相性|あいしょう}バツグン！{一緒|いっしょ}に使うと{最強|さいきょう}だよ。

```javascript runnable
let players = [
  { name: "たろう", pet: { name: "ポチ", type: "犬" } },
  { name: "はなこ", pet: null },
  { name: "じろう" }
];

for (let i = 0; i < players.length; i++) {
  let player = players[i];
  let petName = player.pet?.name ?? "ペットなし";
  console.log(player.name + "のペット: " + petName);
}
```

:::sensei
`player.pet?.name` で{安全|あんぜん}にアクセスして、
`?? "ペットなし"` で `undefined` のときの{代|か}わりを{設定|せってい}する。
この{組|く}み{合|あ}わせはプロが{本当|ほんとう}によく使うパターンだよ！
:::

## ショートサーキット{評価|ひょうか}（&& と ||）

`&&` と `||` は{条件分岐|じょうけんぶんき}だけじゃなく、{値|あたい}を{選|えら}ぶのにも使えるよ。

```javascript runnable
// || は左が falsy なら右を返す
let name1 = "" || "名無し";
let name2 = "ゆうしゃ" || "名無し";
console.log(name1);
console.log(name2);

// && は左が truthy なら右を返す
let bonus = true && "ボーナスあり！";
let noBonus = false && "ボーナスあり！";
console.log(bonus);
console.log(noBonus);
```

:::hint
`||` と `??` は{似|に}ているけど{違|ちが}いがあるよ。
`||` は `""` や `0` も falsy として{右側|みぎがわ}を{返|かえ}すけど、
`??` は `null` と `undefined` のときだけ{右側|みぎがわ}を{返|かえ}すんだ。
:::

```javascript runnable
// || と ?? の違いを確認
let score = 0;

console.log(score || "スコアなし");   // 0は falsyなので "スコアなし"
console.log(score ?? "スコアなし");   // 0は null/undefined じゃないので 0

let empty = "";
console.log(empty || "空です");   // "" は falsy なので "空です"
console.log(empty ?? "空です");   // "" は null/undefined じゃないので ""
```

:::student
なるほど！`0` や `""` を{有効|ゆうこう}な{値|あたい}として{扱|あつか}いたいときは `??` を使えばいいんだね！
:::

## オブジェクトの{省略|しょうりゃく}{記法|きほう}

{変数名|へんすうめい}とプロパティ{名|めい}が{同|おな}じとき、{短|みじか}く{書|か}ける{便利|べんり}な{記法|きほう}があるよ。

```javascript runnable
let name = "ゆうしゃ";
let level = 25;
let hp = 150;

// 普通の書き方
let hero1 = { name: name, level: level, hp: hp };
console.log(hero1);

// 省略記法！キー名と変数名が同じなら省略できる
let hero2 = { name, level, hp };
console.log(hero2);
```

:::sensei
{省略|しょうりゃく}{記法|きほう}を使うとコードがスッキリするよ。
{変数名|へんすうめい}がそのままプロパティ{名|めい}になるんだ。
プロのコードではこの{書|か}き{方|かた}がとても{多|おお}いよ！
:::

## {計算|けいさん}されたプロパティ{名|めい}

`[]` を使うと、{動的|どうてき}にプロパティ{名|めい}を{決|き}められるよ。

```javascript runnable
let statType = "attack";
let statValue = 50;

let hero = {
  name: "ゆうしゃ",
  [statType]: statValue,
  [statType + "Bonus"]: 10
};

console.log(hero);
console.log(hero.attack);
console.log(hero.attackBonus);

// ループで動的にプロパティを作る
let stats = {};
let statNames = ["hp", "mp", "attack", "defense"];
for (let i = 0; i < statNames.length; i++) {
  stats[statNames[i]] = (i + 1) * 10;
}
console.log(stats);
```

## タグ{付|つ}きテンプレートリテラル

テンプレートリテラルに{関数|かんすう}をつけると、{特別|とくべつ}な{加工|かこう}ができるよ。

```javascript runnable
function highlight(strings, ...values) {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += "【" + values[i] + "】";
    }
  }
  return result;
}

let name = "ゆうしゃ";
let level = 30;
let message = highlight`プレイヤー${name}はレベル${level}になった`;
console.log(message);
```

:::student
{値|あたい}の{部分|ぶぶん}に{自動|じどう}で【】がついた！ログの{装飾|そうしょく}とかに使えそうだね！
:::

## Symbolの{基本|きほん}

`Symbol` は{絶対|ぜったい}に{他|ほか}と{被|かぶ}らないユニークな{値|あたい}を作れるよ。

```javascript runnable
let id1 = Symbol("hero");
let id2 = Symbol("hero");

// 同じ説明文でも、別の Symbol になる
console.log(id1 === id2);
console.log(typeof id1);
console.log(id1.toString());

// オブジェクトの隠しプロパティとして使える
let secretPower = Symbol("秘密の力");
let hero = {
  name: "ゆうしゃ",
  [secretPower]: 9999
};

console.log(hero.name);
console.log(hero[secretPower]);
// 通常のループでは見えない
console.log(Object.keys(hero));
```

:::sensei
`Symbol` は{上級者|じょうきゅうしゃ}が使うテクニックだから、{今|いま}は「ユニークなIDを作れるもの」と{覚|おぼ}えておけば{大丈夫|だいじょうぶ}だよ。
:::

## {実践|じっせん}：{安全|あんぜん}なデータアクセス

{学|まな}んだ{技|わざ}を{全部|ぜんぶ}{組|く}み{合|あ}わせてみよう！

```javascript runnable
let gameState = {
  player: {
    name: "ゆうしゃ",
    level: 30,
    party: [
      { name: "まほうつかい", hp: 80 },
      { name: "せんし", hp: 150 }
    ]
  },
  quest: null
};

// ?. と ?? で安全にデータ表示
let playerName = gameState.player?.name ?? "不明";
let questName = gameState.quest?.name ?? "クエスト未受注";
let thirdMember = gameState.player?.party?.[2]?.name ?? "空席";
let guildName = gameState.guild?.name ?? "未所属";

console.log("プレイヤー: " + playerName);
console.log("クエスト: " + questName);
console.log("3人目: " + thirdMember);
console.log("ギルド: " + guildName);

// 省略記法でまとめる
let summary = { playerName, questName, thirdMember, guildName };
console.log(JSON.stringify(summary, null, 2));
```

:::sensei
これらの{技|わざ}を{身|み}につければ、エラーに{強|つよ}いコードが{書|か}けるようになるよ。
{特|とく}に `?.` と `??` は{現代|げんだい}のJavaScriptでは{必須|ひっす}テクニックだ。
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::

## まとめ

- `?.` はプロパティが{存在|そんざい}しなくてもエラーにならない
- `??` は `null` / `undefined` のときに{代|か}わりの{値|あたい}を{返|かえ}す
- `||` は falsy な{値|あたい}（`0`, `""`, `false`）でも{右側|みぎがわ}を{返|かえ}す
- オブジェクトの{省略|しょうりゃく}{記法|きほう}で `{ name }` と{短|みじか}く{書|か}ける
- `[式]` で{動的|どうてき}なプロパティ{名|めい}を{作|つく}れる
- `Symbol` は{絶対|ぜったい}にユニークな{値|あたい}
- タグ{付|つ}きテンプレートリテラルで{文字列|もじれつ}を{加工|かこう}できる
