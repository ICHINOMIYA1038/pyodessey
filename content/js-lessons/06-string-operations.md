---
title: "文字列操作"
slug: "string-operations"
order: 6
description: "言葉を自由にあやつろう"
world: "forest"
challenge:
  description: "\"hello world\" を split して reverse して join しよう！"
  starterCode: "let text = \"hello world\";\n\n// split で単語に分けて、reverse で逆にして、join でつなげよう\n"
  expectedOutput: "world hello"
  hints:
    - "let words = text.split(\" \"); で単語に分けよう"
    - "words.reverse(); で順番を逆にしよう"
    - "console.log(words.join(\" \")); でスペースでつなげて表示しよう"
---

# {文字列操作|もじれつそうさ}

:::sensei
{前|まえ}に{文字列|もじれつ}の{基本|きほん}を{学|まな}んだよね。
今日はもっと{自由|じゆう}に{文字列|もじれつ}をあやつる{方法|ほうほう}を{学|まな}ぶよ！
{文字|もじ}を{切|き}り{取|と}ったり、{探|さが}したり、{変換|へんかん}したりできるんだ。
:::

:::student
{文字列|もじれつ}って、そんなにいろんなことができるの？
:::

:::sensei
できるよ！{文字列|もじれつ}には{便利|べんり}な{機能|きのう}（メソッド）がたくさんあるんだ。
{呪文|じゅもん}を{覚|おぼ}えるみたいに、{一|ひと}つずつマスターしていこう！
:::

## {文字列|もじれつ}の{長|なが}さ: length

`.length` で{文字|もじ}の{数|かず}がわかるよ。

```javascript runnable
let spell = "ファイアボール";
console.log(spell.length);

let greeting = "Hello";
console.log(greeting.length);
```

:::hint
スペースも1{文字|もじ}として{数|かぞ}えるよ！
:::

```javascript runnable
let message = "hello world";
console.log(message.length);  // スペースも含めて11文字
```

## {大文字|おおもじ}と{小文字|こもじ}: toUpperCase / toLowerCase

{英語|えいご}の{大文字|おおもじ}・{小文字|こもじ}を{変換|へんかん}できるよ。

```javascript runnable
let word = "Hello World";

console.log(word.toUpperCase());  // 全部大文字
console.log(word.toLowerCase());  // 全部小文字
```

:::student
{叫|さけ}んでるみたいに{全部|ぜんぶ}{大文字|おおもじ}にできるんだ！
:::

```javascript runnable
let shout = "fire";
console.log(`${shout.toUpperCase()}!!!`);
```

:::sensei
ゲームで「{必殺技|ひっさつわざ}」を{大文字|おおもじ}で{表示|ひょうじ}したいときに使えるね！
{日本語|にほんご}には{大文字|おおもじ}・{小文字|こもじ}がないから、{英語|えいご}のときに使おう。
:::

## {文字列|もじれつ}の{一部|いちぶ}を{切|き}り出す: slice

`.slice()` で{文字列|もじれつ}の{一部|いちぶ}を{切|き}り出せるよ。

```javascript runnable
let text = "ファイアボール";

console.log(text.slice(0, 3));    // 0番目から3番目の手前まで
console.log(text.slice(3));       // 3番目から最後まで
```

:::hint
{配列|はいれつ}と{同|おな}じで、{番号|ばんごう}は **0** からスタートだよ。
`slice(開始, 終了)` で、{終了|しゅうりょう}の{番号|ばんごう}は{含|ふく}まれないから{注意|ちゅうい}してね。
:::

```javascript runnable
let filename = "dragon.png";

// 最後の4文字を取る（マイナスは後ろから数える）
console.log(filename.slice(-4));

// 拡張子を除いた名前
console.log(filename.slice(0, -4));
```

:::student
マイナスの{数字|すうじ}を使うと{後|うし}ろから{数|かぞ}えられるんだ！{便利|べんり}！
:::

## {文字|もじ}を{探|さが}す: indexOf

`.indexOf()` で{文字|もじ}や{単語|たんご}がどこにあるか{探|さが}せるよ。

```javascript runnable
let message = "勇者は冒険に出た";

console.log(message.indexOf("冒険"));   // 3（3番目にある）
console.log(message.indexOf("魔王"));   // -1（見つからない）
```

:::sensei
見つかったら{位置|いち}の{番号|ばんごう}、見つからなかったら `-1` が{返|かえ}ってくるよ。
:::

## {含|ふく}まれているか: includes

「あるかないか」だけ{知|し}りたいなら `.includes()` のほうがかんたんだよ。

```javascript runnable
let message = "勇者は冒険に出た";

console.log(message.includes("冒険"));   // true
console.log(message.includes("魔王"));   // false
```

```javascript runnable
let password = "secret123";

if (password.includes("123")) {
  console.log("かんたんすぎるパスワードだよ！");
} else {
  console.log("OK！");
}
```

## {分割|ぶんかつ}する: split

`.split()` で{文字列|もじれつ}を{分割|ぶんかつ}して{配列|はいれつ}にできるよ。

```javascript runnable
let csv = "りんご,バナナ,みかん";
let fruits = csv.split(",");
console.log(fruits);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
```

:::student
カンマで{区切|くぎ}って{配列|はいれつ}にしてくれるんだ！
:::

```javascript runnable
let sentence = "今日は いい 天気 ですね";
let words = sentence.split(" ");
console.log(words);
console.log(`単語の数: ${words.length}`);
```

:::hint
`split(" ")` はスペースで{分割|ぶんかつ}、`split(",")` はカンマで{分割|ぶんかつ}。
カッコの中の{文字|もじ}が「ここで{切|き}る！」という{目印|めじるし}になるんだ。
:::

## くっつける: join

`split` の{逆|ぎゃく}が `join` だよ。{配列|はいれつ}を{文字列|もじれつ}にくっつけるんだ。

```javascript runnable
let words = ["こんにちは", "せかい"];
console.log(words.join(" "));   // スペースでつなぐ
console.log(words.join("、"));  // 読点でつなぐ
console.log(words.join(""));    // そのままくっつける
```

```javascript runnable
let party = ["ゆうしゃ", "まほうつかい", "せんし"];
let partyList = party.join(" と ");
console.log(partyList);
```

## split と join を組み合わせよう

`split` と `join` を組み合わせると、いろんなことができるよ！

```javascript runnable
// スペースをハイフンに変える
let text = "hello beautiful world";
let result = text.split(" ").join("-");
console.log(result);
```

```javascript runnable
// 単語の順番を逆にする
let text = "one two three";
let words = text.split(" ");
words.reverse();
console.log(words.join(" "));
```

:::sensei
`split` → {加工|かこう} → `join` はよく使うパターンだよ。
{覚|おぼ}えておくと{便利|べんり}だね！
:::

## {置換|ちかん}: replace

`.replace()` で{文字|もじ}を{別|べつ}の{文字|もじ}に{置|お}き{換|か}えられるよ。

```javascript runnable
let message = "こんにちは、世界！";
let newMessage = message.replace("世界", "冒険者");
console.log(newMessage);
```

:::hint
`replace` は{最初|さいしょ}に見つかった1{箇所|かしょ}だけ{置|お}き{換|か}えるよ。
{全部|ぜんぶ}{置|お}き{換|か}えたいときは `replaceAll` を使おう！
:::

```javascript runnable
let text = "りんごとりんごとりんご";

console.log(text.replace("りんご", "みかん"));      // 最初の1つだけ
console.log(text.replaceAll("りんご", "みかん"));    // 全部
```

## {空白|くうはく}を{取|と}り{除|のぞ}く: trim

`.trim()` で{前後|ぜんご}の{余分|よぶん}なスペースを{取|と}り{除|のぞ}けるよ。

```javascript runnable
let input = "   ゆうしゃ   ";
console.log(input);
console.log(input.trim());
console.log(`「${input.trim()}」`);
```

:::sensei
ユーザーが入力するときに{余分|よぶん}なスペースが入ることがあるよね。
`trim()` で{綺麗|きれい}にできるんだ。
:::

## {繰|く}り{返|かえ}す: repeat

`.repeat()` で{同|おな}じ{文字列|もじれつ}を{何度|なんど}も{繰|く}り{返|かえ}せるよ。

```javascript runnable
let star = "★";
console.log(star.repeat(5));

let dash = "-";
console.log(dash.repeat(20));
```

```javascript runnable
// HPバーを作ってみよう！
let hp = 7;
let maxHp = 10;

let bar = "█".repeat(hp) + "░".repeat(maxHp - hp);
console.log(`HP: [${bar}] ${hp}/${maxHp}`);
```

:::student
HPバーが作れた！かっこいい！
:::

## メソッドチェーン

メソッドを{連続|れんぞく}して使うこともできるよ。

```javascript runnable
let text = "  Hello World  ";
let result = text.trim().toLowerCase();
console.log(result);
```

```javascript runnable
let shout = "fire ball";
let result = shout.toUpperCase().replace(" ", "_");
console.log(result);
```

:::sensei
`.` でメソッドをつなげることを「メソッドチェーン」というよ。
{左|ひだり}から{順番|じゅんばん}に{処理|しょり}されるんだ。
:::

## {実践|じっせん}：{冒険|ぼうけん}ログを{加工|かこう}しよう

{学|まな}んだことを{全部|ぜんぶ}使ってみよう！

```javascript runnable
let log = "ゆうしゃ,まほうつかい,せんし,そうりょ";

// カンマで分割
let members = log.split(",");
console.log(`パーティ人数: ${members.length}人`);

// メンバー一覧
for (let member of members) {
  console.log(`- ${member}`);
}

// 「と」でつなげる
console.log(members.join(" と "));
```

```javascript runnable
// ファイル名の処理
let filename = "  Dragon_Boss.PNG  ";
let clean = filename.trim().toLowerCase();
console.log(clean);

let name = clean.slice(0, clean.indexOf("."));
let ext = clean.slice(clean.indexOf("."));
console.log(`名前: ${name}`);
console.log(`拡張子: ${ext}`);
```

## メソッドまとめ

| メソッド | {説明|せつめい} | {例|れい} |
|---------|------|------|
| `.length` | {文字数|もじすう} | `"abc".length` → 3 |
| `.toUpperCase()` | {大文字|おおもじ}に | `"hi".toUpperCase()` → "HI" |
| `.toLowerCase()` | {小文字|こもじ}に | `"HI".toLowerCase()` → "hi" |
| `.slice(a, b)` | {切|き}り出す | `"hello".slice(0, 3)` → "hel" |
| `.indexOf(s)` | {位置|いち}を{探|さが}す | `"hello".indexOf("ll")` → 2 |
| `.includes(s)` | {含|ふく}むか | `"hello".includes("ell")` → true |
| `.split(s)` | {分割|ぶんかつ} | `"a,b".split(",")` → ["a","b"] |
| `.join(s)` | {結合|けつごう}（{配列|はいれつ}） | `["a","b"].join("-")` → "a-b" |
| `.replace(a, b)` | {置換|ちかん} | `"hi".replace("h","y")` → "yi" |
| `.trim()` | {前後|ぜんご}の{空白|くうはく}{除去|じょきょ} | `" hi ".trim()` → "hi" |
| `.repeat(n)` | {繰|く}り{返|かえ}し | `"ab".repeat(3)` → "ababab" |

:::sensei
たくさんあるけど、{全部|ぜんぶ}いっぺんに{覚|おぼ}えなくてもOK！
使っているうちに{自然|しぜん}と{覚|おぼ}えるよ。
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::
