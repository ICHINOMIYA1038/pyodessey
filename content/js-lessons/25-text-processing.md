---
title: "テキスト処理"
slug: "text-processing"
order: 25
description: "文章を分析しよう"
world: "sea"
challenge:
  description: "文字列の単語数をカウントして表示しよう"
  starterCode: "let text = \"the quick brown fox jumps\";\n// 単語の数を数えよう\n"
  expectedOutput: "5"
  hints:
    - "split(\" \") でスペース区切りの配列にしよう"
    - "配列の .length で単語数がわかるよ"
    - "console.log(words.length); で表示しよう"
---

# テキスト{処理|しょり} ー {文章|ぶんしょう}を{分析|ぶんせき}しよう

:::sensei
{冒険者|ぼうけんしゃ}よ、{今日|きょう}は{文字列|もじれつ}を{自在|じざい}に{操|あやつ}る{技|わざ}を{学|まな}ぶよ。
{古代|こだい}の{魔法書|まほうしょ}を{解読|かいどく}したり、{暗号|あんごう}を{解|と}いたりするイメージだね！
:::

:::student
{暗号解読|あんごうかいどく}！？RPGっぽくてワクワクする！
:::

## {分割|ぶんかつ}と{結合|けつごう}：split と join

`split` で{文字列|もじれつ}を{分割|ぶんかつ}し、`join` で{配列|はいれつ}を{結合|けつごう}するのが{基本中|きほんちゅう}の{基本|きほん}だよ。

```javascript runnable
let spell = "ファイア-ブリザド-サンダー";

// "-" で分割
let skills = spell.split("-");
console.log(skills);
console.log(skills.length + "つの魔法");

// " と " で結合
let display = skills.join(" と ");
console.log(display);

// 1文字ずつに分割
let word = "ゆうしゃ";
let chars = word.split("");
console.log(chars);
console.log(chars.length + "文字");
```

:::hint
`split("")` のように{空文字|くうもじ}で{分割|ぶんかつ}すると、1{文字|もじ}ずつの{配列|はいれつ}になるよ。
{文字|もじ}を1つずつ{調|しら}べたいときに{便利|べんり}だね！
:::

## {単語|たんご}カウント

{文章|ぶんしょう}の{中|なか}の{単語|たんご}を{数|かぞ}えてみよう。

```javascript runnable
let message = "the brave hero defeated the evil dragon";

// スペースで分割して単語数を数える
let words = message.split(" ");
console.log("単語数: " + words.length);

// 各単語の長さも調べる
words.forEach(w => {
  console.log("  「" + w + "」→ " + w.length + "文字");
});

// 一番長い単語を見つける
let longest = words.reduce((a, b) => a.length >= b.length ? a : b);
console.log("最も長い単語: " + longest);
```

:::student
{文章|ぶんしょう}を{分割|ぶんかつ}して{分析|ぶんせき}するのって{面白|おもしろ}い！
:::

## {文字|もじ}の{出現頻度|しゅつげんひんど}

{各文字|かくもじ}が{何回|なんかい}{出|で}てくるか{数|かぞ}えてみよう。

```javascript runnable
let text = "abracadabra";

// 各文字の出現回数を数える
let freq = {};
let chars = text.split("");
for (let i = 0; i < chars.length; i++) {
  let c = chars[i];
  freq[c] = (freq[c] || 0) + 1;
}

console.log("「" + text + "」の文字頻度:");
let keys = Object.keys(freq);
// 出現回数が多い順にソート
keys.sort((a, b) => freq[b] - freq[a]);
for (let i = 0; i < keys.length; i++) {
  let k = keys[i];
  let bar = "*".repeat(freq[k]);
  console.log("  " + k + ": " + bar + " (" + freq[k] + "回)");
}
```

:::sensei
{文字|もじ}の{頻度分析|ひんどぶんせき}は、{暗号解読|あんごうかいどく}の{基本|きほん}{技術|ぎじゅつ}なんだよ。
{英語|えいご}では「e」が{一番|いちばん}{多|おお}く{使|つか}われるとか、{言語|げんご}ごとに{特徴|とくちょう}があるんだ。
:::

## {回文|かいぶん}チェック

「{前|まえ}から{読|よ}んでも{後|うし}ろから{読|よ}んでも{同|おな}じ」{文字列|もじれつ}を{回文|かいぶん}というよ。

```javascript runnable
function isPalindrome(text) {
  // スペースを除いて小文字に統一
  let clean = text.toLowerCase().split(" ").join("");
  let reversed = clean.split("").reverse().join("");
  return clean === reversed;
}

let tests = ["level", "radar", "hello", "racecar", "madam"];

for (let i = 0; i < tests.length; i++) {
  let word = tests[i];
  let result = isPalindrome(word) ? "回文！" : "回文じゃない";
  console.log(word + " → " + result);
}
```

:::student
`split` → `reverse` → `join` で{文字列|もじれつ}をひっくり{返|かえ}すんだ！{賢|かしこ}い！
:::

## シーザー{暗号|あんごう}

{古代|こだい}ローマのシーザーが使った{暗号|あんごう}を{実装|じっそう}してみよう。
{各文字|かくもじ}を{一定数|いっていすう}ずらすシンプルな{暗号|あんごう}だよ。

```javascript runnable
function caesarCipher(text, shift) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    // 小文字 a-z の範囲（97-122）
    if (code >= 97 && code <= 122) {
      code = ((code - 97 + shift) % 26 + 26) % 26 + 97;
    }
    // 大文字 A-Z の範囲（65-90）
    if (code >= 65 && code <= 90) {
      code = ((code - 65 + shift) % 26 + 26) % 26 + 65;
    }
    result += String.fromCharCode(code);
  }
  return result;
}

let original = "hello hero";
let encrypted = caesarCipher(original, 3);
let decrypted = caesarCipher(encrypted, -3);

console.log("原文:   " + original);
console.log("暗号化: " + encrypted);
console.log("復号化: " + decrypted);

// ゲーム風メッセージ
let secret = caesarCipher("the treasure is in the cave", 5);
console.log("謎の手紙: " + secret);
console.log("解読:     " + caesarCipher(secret, -5));
```

:::sensei
`charCodeAt()` で{文字|もじ}を{数値|すうち}（{文字|もじ}コード）に{変換|へんかん}し、
`String.fromCharCode()` で{数値|すうち}を{文字|もじ}に{戻|もど}しているんだ。
これが{暗号化|あんごうか}の{仕組|しく}みだよ。
:::

## padStart / padEnd

{文字列|もじれつ}の{長|なが}さを{揃|そろ}えたいとき、`padStart` と `padEnd` が{便利|べんり}だよ。

```javascript runnable
// 数字をゼロ埋め
for (let i = 1; i <= 5; i++) {
  let num = String(i).padStart(3, "0");
  console.log("モンスターNo." + num);
}

console.log("---");

// ステータス表示を揃える
let stats = [
  { label: "HP", value: 150 },
  { label: "MP", value: 30 },
  { label: "攻撃力", value: 45 },
  { label: "防御力", value: 38 }
];

for (let i = 0; i < stats.length; i++) {
  let s = stats[i];
  let label = s.label.padEnd(5, "　");
  let value = String(s.value).padStart(5, " ");
  console.log(label + ":" + value);
}
```

:::hint
`padStart(長さ, 埋め文字)` は{先頭|せんとう}を{埋|う}めて、
`padEnd(長さ, 埋め文字)` は{末尾|まつび}を{埋|う}めるよ。
{表|ひょう}を{揃|そろ}えて{表示|ひょうじ}するのに{最適|さいてき}だね！
:::

## {構造化|こうぞうか}テキストのパース

{決|き}まった{形式|けいしき}のテキストを{解析|かいせき}してデータに{変換|へんかん}してみよう。

```javascript runnable
// CSVっぽいデータをパース
let csv = "名前,HP,攻撃力\nゆうしゃ,200,50\nまほうつかい,100,20\nせんし,250,60";

let lines = csv.split("\n");
let headers = lines[0].split(",");

let data = [];
for (let i = 1; i < lines.length; i++) {
  let values = lines[i].split(",");
  let obj = {};
  for (let j = 0; j < headers.length; j++) {
    obj[headers[j]] = values[j];
  }
  data.push(obj);
}

console.log("パース結果:");
data.forEach(d => {
  console.log("  " + d["名前"] + " - HP:" + d["HP"] + " 攻撃:" + d["攻撃力"]);
});
```

:::student
テキストデータをオブジェクトに{変換|へんかん}できた！すごい！
:::

## {実践|じっせん}：{魔法書|まほうしょ}{解析|かいせき}システム

{学|まな}んだ{技|わざ}を{全部|ぜんぶ}使って、{魔法書|まほうしょ}のテキストを{解析|かいせき}しよう。

```javascript runnable
let spellBook = "fire:10:攻撃 ice:15:攻撃 heal:8:回復 thunder:20:攻撃 cure:5:回復";

// パース
let spells = spellBook.split(" ").map(entry => {
  let parts = entry.split(":");
  return {
    name: parts[0],
    cost: Number(parts[1]),
    type: parts[2]
  };
});

// タイプ別に分類
let byType = spells.reduce((acc, s) => {
  if (!acc[s.type]) acc[s.type] = [];
  acc[s.type].push(s);
  return acc;
}, {});

// レポート表示
console.log("=== 魔法書 解析結果 ===");
console.log("総魔法数: " + spells.length);

let types = Object.keys(byType);
for (let i = 0; i < types.length; i++) {
  let type = types[i];
  let group = byType[type];
  console.log("[" + type + "魔法]");
  group.forEach(s => {
    let label = ("  " + s.name).padEnd(12, " ");
    console.log(label + "MP:" + String(s.cost).padStart(2, " "));
  });
}

// 平均MPコスト
let avgCost = spells.reduce((s, sp) => s + sp.cost, 0) / spells.length;
console.log("平均MPコスト: " + avgCost.toFixed(1));

// 最もコストが高い魔法
let expensive = spells.reduce((a, b) => a.cost > b.cost ? a : b);
console.log("最強魔法: " + expensive.name + "（MP:" + expensive.cost + "）");
```

:::sensei
テキスト{処理|しょり}は{地味|じみ}に{見|み}えるけど、プログラミングの{基本|きほん}スキルだよ。
ログの{解析|かいせき}、データの{変換|へんかん}、{設定|せってい}ファイルの{読|よ}み{込|こ}みなど、
{実際|じっさい}の{開発|かいはつ}で{毎日|まいにち}のように使うんだ。
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::

## まとめ

- `split()` で{文字列|もじれつ}を{配列|はいれつ}に{分割|ぶんかつ}、`join()` で{結合|けつごう}
- {単語|たんご}カウントは `split(" ").length` で{簡単|かんたん}にできる
- {文字|もじ}の{出現頻度|しゅつげんひんど}はオブジェクトで{数|かぞ}える
- `split("").reverse().join("")` で{文字列|もじれつ}を{反転|はんてん}
- `charCodeAt()` と `String.fromCharCode()` で{文字|もじ}と{数値|すうち}を{変換|へんかん}
- `padStart()` / `padEnd()` で{文字列|もじれつ}の{長|なが}さを{揃|そろ}える
- テキストの{分割|ぶんかつ}と{変換|へんかん}で{構造化|こうぞうか}データを作れる
