---
title: "正規表現"
slug: "regex"
order: 18
description: "文字列の中を探検しよう"
world: "castle"
challenge:
  description: "文字列 \"HP:100 MP:50 ATK:30\" から数字だけ取り出して合計を表示しよう！"
  starterCode: "let text = \"HP:100 MP:50 ATK:30\";\n\n// 正規表現で数字を取り出して合計しよう\n"
  expectedOutput: "180"
  hints:
    - "text.match(/\\d+/g) で数字をすべて取り出せるよ"
    - "match の結果は文字列の配列だから Number() で数値に変換しよう"
    - "reduce を使って合計を計算しよう"
    - "console.log(text.match(/\\d+/g).map(Number).reduce((a,b) => a+b, 0));"
---

# {正規表現|せいきひょうげん}

:::sensei
{城|しろ}の{古文書|こもんじょ}の{中|なか}から{特定|とくてい}の{情報|じょうほう}を{探|さが}し{出|だ}す{魔法|まほう}を{教|おし}えよう。
それが**{正規表現|せいきひょうげん}**（Regular Expression, RegExp）だ！
{文字列|もじれつ}のパターンを{記述|きじゅつ}して、{一致|いっち}する{部分|ぶぶん}を{見|み}つけられるよ。
:::

:::student
パターンで{探|さが}す？`includes` とは{違|ちが}うの？
:::

:::sensei
`includes` は{決|き}まった{文字列|もじれつ}しか{探|さが}せないけど、
{正規表現|せいきひょうげん}なら「{数字|すうじ}3{文字|もじ}」「{英語|えいご}で{始|はじ}まる{単語|たんご}」みたいな
**パターン**で{探|さが}せるんだ！
:::

## {正規表現|せいきひょうげん}の{基本|きほん}

`/パターン/` で{正規表現|せいきひょうげん}を{作|つく}るよ。

```javascript runnable
// スラッシュで囲むと正規表現
let pattern = /hero/;

// test() で一致するかチェック
console.log(pattern.test("I am a hero"));   // true
console.log(pattern.test("I am a villain")); // false

// 文字列の match() で見つけた部分を取得
let result = "The hero is brave".match(/hero/);
console.log(result[0]); // "hero"

// 見つからないと null
let noMatch = "The villain".match(/hero/);
console.log(noMatch);   // null
```

:::hint
`test()` は `true` か `false` を{返|かえ}す。
`match()` は{見|み}つけた{部分|ぶぶん}の{情報|じょうほう}を{返|かえ}す。{見|み}つからないと `null` だよ！
:::

## フラグ — {検索|けんさく}のオプション

{正規表現|せいきひょうげん}には{便利|べんり}なフラグがあるよ。

```javascript runnable
let text = "Fire fire FIRE";

// フラグなし：最初の1つだけ
console.log(text.match(/fire/));     // ["fire"] (1つだけ)

// i フラグ：大文字小文字を区別しない
console.log(text.match(/fire/i));    // ["Fire"] (最初のFire)

// g フラグ：すべて見つける
console.log(text.match(/fire/g));    // ["fire"] (小文字のfireだけ)

// gi フラグ：組み合わせ！
let all = text.match(/fire/gi);
console.log(all);                    // ["Fire", "fire", "FIRE"]
console.log(all.length);             // 3
```

:::student
`g` は{全部|ぜんぶ}{探|さが}す、`i` は{大文字小文字|おおもじこもじ}を{無視|むし}するんだね！
:::

## {特殊|とくしゅ}な{文字|もじ}クラス

{正規表現|せいきひょうげん}には{特別|とくべつ}な{意味|いみ}を{持|も}つ{文字|もじ}があるよ。

```javascript runnable
let text = "HP:100 MP:50 レベル3";

// \d は数字1文字にマッチ
console.log(text.match(/\d/g));      // 1文字ずつ

// \d+ は数字が1文字以上連続
console.log(text.match(/\d+/g));     // 数字のかたまり

// \w は英数字とアンダースコア
console.log("abc_123!@#".match(/\w+/g));

// \s は空白文字
let spaced = "hello   world   js";
console.log(spaced.match(/\S+/g));   // 空白以外のかたまり

// . は任意の1文字
console.log("cat bat hat".match(/.at/g));
```

:::sensei
{覚|おぼ}えておきたい{特殊文字|とくしゅもじ}をまとめるよ：
- `\d` → {数字|すうじ}（0-9）
- `\w` → {英数字|えいすうじ}（a-z, A-Z, 0-9, _）
- `\s` → {空白|くうはく}（スペース、タブなど）
- `.` → {任意|にんい}の1{文字|もじ}
- {大文字|おおもじ}（`\D`, `\W`, `\S`）はその{逆|ぎゃく}だよ！
:::

## {量指定子|りょうしていし} — {繰|く}り{返|かえ}しの{指定|してい}

「{何回|なんかい}{繰|く}り{返|かえ}すか」を{指定|してい}できるよ。

```javascript runnable
let text = "aaa ab abbb ac";

// + は1回以上
console.log("ab abbb".match(/ab+/g));    // "ab", "abbb"

// * は0回以上
console.log("a ab abbb".match(/ab*/g));  // "a", "ab", "abbb"

// ? は0回か1回
console.log("color colour".match(/colou?r/g)); // "color", "colour"

// {n} はちょうどn回
console.log("12 123 1234".match(/\d{3}/g));  // ちょうど3桁

// {n,m} はn回以上m回以下
console.log("1 12 123 1234".match(/\d{2,3}/g)); // 2〜3桁
```

:::hint
- `+` → 1{回以上|かいいじょう}（{欲張|よくば}り）
- `*` → 0{回以上|かいいじょう}
- `?` → 0{回|かい}か1{回|かい}
- `{n}` → ちょうど n {回|かい}
- `{n,m}` → n{回|かい}{以上|いじょう} m{回|かい}{以下|いか}
:::

## {文字|もじ}クラス `[...]` とグループ `(...)`

{自分|じぶん}で{文字|もじ}の{範囲|はんい}を{指定|してい}したり、グルーピングしたりできるよ。

```javascript runnable
// [abc] は a, b, c のどれか
console.log("apple banana cherry".match(/[abc]\w+/g));

// [a-z] は小文字アルファベット
console.log("Hello World 123".match(/[a-z]+/g));

// [0-9] は数字（\d と同じ）
console.log("HP100 MP50".match(/[A-Z]+[0-9]+/g));

// [^...] は「それ以外」
console.log("abc123def456".match(/[^0-9]+/g)); // 数字以外

// () でグループ化
let dateText = "2024-01-15 と 2024-12-25";
let dates = dateText.match(/\d{4}-\d{2}-\d{2}/g);
console.log(dates);
```

:::student
`[a-z]` で{範囲|はんい}を{指定|してい}できるんだ！{便利|べんり}！
:::

## replace — {文字列|もじれつ}の{置換|ちかん}

{正規表現|せいきひょうげん}を{使|つか}って{文字列|もじれつ}を{置|お}き{換|か}えよう。

```javascript runnable
// 基本の置換
let text = "I like cats and cats are cute";
console.log(text.replace(/cats/, "dogs"));  // 最初の1つだけ
console.log(text.replace(/cats/g, "dogs")); // 全部置換

// 数字を★に置換
let secret = "パスワード: 12345";
console.log(secret.replace(/\d/g, "★"));

// キャプチャグループで並び替え
let name = "Taro Yamada";
console.log(name.replace(/(\w+) (\w+)/, "$2 $1"));

// 関数を使った高度な置換
let stats = "HP:100 MP:50 ATK:30";
let boosted = stats.replace(/\d+/g, function(match) {
  return Number(match) * 2;
});
console.log(boosted); // 数値を全部2倍に
```

:::sensei
`replace` の{第二引数|だいにひきすう}に{関数|かんすう}を{渡|わた}せるのは{前回|ぜんかい}{学|まな}んだ{高階関数|こうかいかんすう}のテクニックだね！
`$1`, `$2` は `()` でキャプチャした{部分|ぶぶん}を{参照|さんしょう}するよ。
:::

## {実践|じっせん}パターン — バリデーション

{正規表現|せいきひょうげん}を{使|つか}って{入力|にゅうりょく}チェックをしてみよう。

```javascript runnable
// メールアドレスの簡易チェック
function isValidEmail(email) {
  let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

console.log(isValidEmail("hero@castle.com"));  // true
console.log(isValidEmail("invalid@"));          // false
console.log(isValidEmail("test@example.co.jp"));// true

// ^ は先頭、$ は末尾を表す
console.log(/^hello/.test("hello world"));  // 先頭がhello
console.log(/world$/.test("hello world"));  // 末尾がworld
console.log(/^hello$/.test("hello"));       // 完全一致

// プレイヤー名のバリデーション
function isValidPlayerName(name) {
  // 2〜10文字の英数字
  return /^[a-zA-Z0-9]{2,10}$/.test(name);
}

console.log(isValidPlayerName("Hero"));     // true
console.log(isValidPlayerName("A"));        // false（短すぎ）
console.log(isValidPlayerName("Hero!!!"));  // false（記号あり）
```

:::hint
- `^` は{文字列|もじれつ}の{先頭|せんとう}
- `$` は{文字列|もじれつ}の{末尾|まつび}
- `^パターン$` で「{全体|ぜんたい}がこのパターン」と{指定|してい}できるよ！
:::

## {数字|すうじ}を{取|と}り{出|だ}して{計算|けいさん}する

チャレンジに{向|む}けた{練習|れんしゅう}！{文字列|もじれつ}から{数字|すうじ}を{取|と}り{出|だ}して{計算|けいさん}してみよう。

```javascript runnable
let battleLog = "勇者が3回攻撃！ダメージ: 25, 30, 45";

// 数字をすべて取り出す
let numbers = battleLog.match(/\d+/g);
console.log(numbers); // 文字列の配列

// 文字列を数値に変換して合計
let total = numbers.map(Number).reduce((sum, n) => sum + n, 0);
console.log("合計: " + total);

// 別の例
let inventory = "ポーション x5, エリクサー x2, 聖水 x10";
let counts = inventory.match(/\d+/g).map(Number);
console.log("アイテム合計: " + counts.reduce((a, b) => a + b, 0));
```

:::sensei
`match(/\d+/g)` で{数字|すうじ}の{配列|はいれつ}を{取得|しゅとく}して、
`map(Number)` で{数値|すうち}に{変換|へんかん}、`reduce` で{合計|ごうけい}する。
このパターンはとても{役立|やくだ}つよ！
:::

## まとめ

:::sensei
{正規表現|せいきひょうげん}で{学|まな}んだことを{整理|せいり}しよう！

- `/パターン/フラグ` で{正規表現|せいきひょうげん}を{作|つく}る
- `test()` で{一致|いっち}チェック、`match()` で{取得|しゅとく}、`replace()` で{置換|ちかん}
- `g`（{全部|ぜんぶ}）、`i`（{大小|だいしょう}{無視|むし}）のフラグ
- `\d`（{数字|すうじ}）、`\w`（{英数字|えいすうじ}）、`.`（{任意|にんい}）の{特殊文字|とくしゅもじ}
- `+`、`*`、`?`、`{n,m}` の{量指定子|りょうしていし}
- `[...]` で{文字|もじ}クラス、`()` でグループ{化|か}

チャレンジでは{正規表現|せいきひょうげん}で{数字|すうじ}を{取|と}り{出|だ}して{計算|けいさん}してみよう！
:::

:::student
{正規表現|せいきひょうげん}って{最初|さいしょ}は{暗号|あんごう}みたいだけど、{意味|いみ}がわかると{楽|たの}しいね！
:::
