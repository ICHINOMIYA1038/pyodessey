---
title: "再帰"
slug: "recursion"
order: 28
description: "自分自身を呼ぶ魔法"
world: "sky"
challenge:
  description: "factorial 関数を作って、factorial(6) の結果を表示しよう"
  starterCode: "// factorial 関数を作ろう\n\n// console.log(factorial(6));\n"
  expectedOutput: "720"
  hints:
    - "function factorial(n) { ... } で関数を作ろう"
    - "n が 0 か 1 なら 1 を返すのがベースケースだよ"
    - "それ以外は n * factorial(n - 1) を返そう"
---

# {再帰|さいき} ー {自分自身|じぶんじしん}を{呼|よ}ぶ{魔法|まほう}

:::sensei
{冒険者|ぼうけんしゃ}よ、{空|そら}の{世界|せかい}へようこそ！
{今日|きょう}は「{再帰|さいき}」という{強力|きょうりょく}な{魔法|まほう}を{学|まな}ぶよ。
{再帰|さいき}とは、{関数|かんすう}が{自分自身|じぶんじしん}を{呼|よ}び{出|だ}すテクニックのことなんだ！
:::

:::student
{自分自身|じぶんじしん}を{呼|よ}ぶ？{合|あ}わせ{鏡|かがみ}みたいな{感|かん}じ？
:::

:::sensei
いい{例|たと}えだね！{合|あ}わせ{鏡|かがみ}のように、{鏡|かがみ}の{中|なか}にまた{鏡|かがみ}がある。
でも{大事|だいじ}なのは、どこかで{止|と}まらないと{永遠|えいえん}に{続|つづ}いてしまう。
だから「ベースケース」という{止|と}まる{条件|じょうけん}が{必要|ひつよう}なんだ！
:::

## {再帰|さいき}の{基本|きほん}：カウントダウン

まずは{簡単|かんたん}なカウントダウンで{再帰|さいき}の{仕組|しく}みを{見|み}てみよう。

```javascript runnable
function countdown(n) {
  // ベースケース：0になったら止まる
  if (n <= 0) {
    console.log("発射！");
    return;
  }
  // 現在の数を表示
  console.log(n);
  // 自分自身を呼ぶ（再帰ケース）
  countdown(n - 1);
}

countdown(5);
```

:::student
おおっ！`countdown` の{中|なか}で `countdown` を{呼|よ}んでる！
{毎回|まいかい} n が1{減|へ}って、0になったら{止|と}まるんだね。
:::

:::sensei
そのとおり！{再帰|さいき}には{必|かなら}ず2つの{部分|ぶぶん}があるよ：
- **ベースケース**：{止|と}まる{条件|じょうけん}（ここでは `n <= 0`）
- **{再帰|さいき}ケース**：{自分自身|じぶんじしん}を{呼|よ}ぶ{部分|ぶぶん}（ここでは `countdown(n - 1)`）
ベースケースを{忘|わす}れると{無限|むげん}ループになるから{気|き}をつけてね！
:::

## {階乗|かいじょう}を{計算|けいさん}する

{再帰|さいき}の{定番|ていばん}といえば「{階乗|かいじょう}」だ。
`5! = 5 × 4 × 3 × 2 × 1 = 120` のように{計算|けいさん}するよ。

```javascript runnable
function factorial(n) {
  // ベースケース：0! = 1, 1! = 1
  if (n <= 1) {
    return 1;
  }
  // 再帰ケース：n! = n × (n-1)!
  return n * factorial(n - 1);
}

console.log("3! = " + factorial(3));
console.log("5! = " + factorial(5));
console.log("7! = " + factorial(7));
```

:::student
`factorial(5)` は `5 * factorial(4)` で、
`factorial(4)` は `4 * factorial(3)` で...
どんどん{小|ちい}さくなって、{最後|さいご}に `factorial(1)` が 1 を{返|かえ}すんだ！
:::

:::hint
{再帰|さいき}の{流|なが}れを{追|お}ってみよう：
`factorial(4)` → `4 * factorial(3)` → `4 * 3 * factorial(2)` → `4 * 3 * 2 * factorial(1)` → `4 * 3 * 2 * 1` = 24
:::

## {再帰|さいき}の{流|なが}れを{可視化|かしか}する

{再帰|さいき}がどう{動|うご}いているか、{表示|ひょうじ}して{確認|かくにん}してみよう。

```javascript runnable
function factorialVerbose(n, depth) {
  let indent = "  ".repeat(depth);
  console.log(indent + "factorial(" + n + ") が呼ばれた");

  if (n <= 1) {
    console.log(indent + "→ ベースケース！1を返す");
    return 1;
  }

  let result = n * factorialVerbose(n - 1, depth + 1);
  console.log(indent + "→ " + n + " * ... = " + result + " を返す");
  return result;
}

console.log("結果: " + factorialVerbose(4, 0));
```

:::sensei
インデントを{使|つか}って、{再帰|さいき}がどんどん{深|ふか}くなっていく{様子|ようす}が{見|み}えるね。
{一番|いちばん}{深|ふか}いところ（ベースケース）まで{行|い}ったら、
{結果|けっか}が{戻|もど}ってくるんだ。これを「{巻|ま}き{戻|もど}し」と{呼|よ}ぶよ。
:::

## フィボナッチ{数列|すうれつ}

{次|つぎ}は{有名|ゆうめい}なフィボナッチ{数列|すうれつ}だ。
{前|まえ}の2つの{数|かず}を{足|た}して{次|つぎ}の{数|かず}を{作|つく}るよ：0, 1, 1, 2, 3, 5, 8, 13...

```javascript runnable
function fibonacci(n) {
  // ベースケース
  if (n === 0) return 0;
  if (n === 1) return 1;
  // 再帰ケース：前の2つを足す
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 最初の10個を表示
let result = [];
for (let i = 0; i < 10; i++) {
  result.push(fibonacci(i));
}
console.log("フィボナッチ: " + result.join(", "));
```

:::student
2つの{自分自身|じぶんじしん}を{呼|よ}んでる！すごい！
でもちょっと{遅|おそ}くならないの？
:::

:::sensei
いい{質問|しつもん}だね！{実|じつ}は{同|おな}じ{計算|けいさん}を{何度|なんど}も{繰|く}り{返|かえ}すから、
{大|おお}きな{数|かず}だと{遅|おそ}くなるんだ。
{後|あと}のレッスンで「{動的計画法|どうてきけいかくほう}」を{学|まな}ぶとき、
これを{速|はや}くする{方法|ほうほう}を{覚|おぼ}えるよ！
:::

## {再帰|さいき}で{配列|はいれつ}の{合計|ごうけい}

ループの{代|か}わりに{再帰|さいき}で{配列|はいれつ}の{合計|ごうけい}を{計算|けいさん}してみよう。

```javascript runnable
function sum(arr) {
  // ベースケース：配列が空なら0
  if (arr.length === 0) {
    return 0;
  }
  // 最初の要素 + 残りの合計
  return arr[0] + sum(arr.slice(1));
}

let damage = [30, 45, 12, 88, 25];
console.log("ダメージ一覧: " + damage.join(", "));
console.log("合計ダメージ: " + sum(damage));

let treasure = [100, 250, 50, 300];
console.log("お宝: " + treasure.join(", "));
console.log("合計ゴールド: " + sum(treasure));
```

:::hint
`arr.slice(1)` は{配列|はいれつ}の2{番目以降|ばんめいこう}を{取|と}り{出|だ}すよ。
`[30, 45, 12]` → `arr[0]` は 30、`arr.slice(1)` は `[45, 12]`
:::

## {文字列|もじれつ}を{逆|ぎゃく}にする

{再帰|さいき}で{文字列|もじれつ}をひっくり{返|かえ}してみよう。

```javascript runnable
function reverse(str) {
  // ベースケース：空文字か1文字なら
  if (str.length <= 1) {
    return str;
  }
  // 最後の文字 + 残りを逆にしたもの
  return str[str.length - 1] + reverse(str.slice(0, -1));
}

console.log(reverse("hello"));
console.log(reverse("RPG"));
console.log(reverse("まほう"));

// 回文チェックにも使える！
function isPalindrome(str) {
  return str === reverse(str);
}
console.log("level は回文？ " + isPalindrome("level"));
console.log("hello は回文？ " + isPalindrome("hello"));
```

:::student
{最後|さいご}の{文字|もじ}を{先頭|せんとう}に{持|も}ってきて、
{残|のこ}りをまた{逆|ぎゃく}にする...{賢|かしこ}い！
:::

## {再帰|さいき} vs ループ

{同|おな}じ{処理|しょり}をループと{再帰|さいき}で{比|くら}べてみよう。

```javascript runnable
// ループ版
function sumLoop(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

// 再帰版
function sumRecursive(n) {
  if (n <= 0) return 0;
  return n + sumRecursive(n - 1);
}

console.log("ループ: 1〜10の合計 = " + sumLoop(10));
console.log("再帰:   1〜10の合計 = " + sumRecursive(10));
console.log("ループ: 1〜100の合計 = " + sumLoop(100));
console.log("再帰:   1〜100の合計 = " + sumRecursive(100));
```

:::sensei
どちらも{同|おな}じ{結果|けっか}になるね。
{使|つか}い{分|わ}けのポイントはこうだよ：
- **ループ**：{単純|たんじゅん}な{繰|く}り{返|かえ}しに{向|む}いている
- **{再帰|さいき}**：{木構造|きこうぞう}やフラクタルなど、{自然|しぜん}に{分|わ}かれるものに{向|む}いている
:::

## スタックオーバーフローに{注意|ちゅうい}

{再帰|さいき}が{深|ふか}くなりすぎると「スタックオーバーフロー」というエラーが{起|お}きるよ。

```javascript runnable
// 安全な再帰の例
function safeCountdown(n) {
  if (n <= 0) {
    return "完了！";
  }
  return safeCountdown(n - 1);
}
console.log(safeCountdown(100));

// 注意：ベースケースがないとスタックオーバーフロー！
// function dangerous(n) {
//   return dangerous(n + 1);  // 永遠に止まらない！
// }
// dangerous(1);  // エラー！

// 再帰の深さに注意
console.log("再帰は便利だけど、深すぎると危険！");
console.log("通常、数千回以上の再帰は避けよう");
```

:::hint
JavaScriptでは{再帰|さいき}の{深|ふか}さに{限界|げんかい}があるよ（{環境|かんきょう}によるけど{数千|すうせん}〜{数万回|すうまんかい}）。
{大|おお}きなデータを{扱|あつか}うときはループを{使|つか}うほうが{安全|あんぜん}だよ。
:::

## ハノイの{塔|とう}

{再帰|さいき}の{有名|ゆうめい}な{問題|もんだい}「ハノイの{塔|とう}」を{見|み}てみよう。
3つの{柱|はしら}に{円盤|えんばん}を{移動|いどう}させるパズルだよ。

```javascript runnable
function hanoi(n, from, to, via) {
  if (n === 1) {
    console.log("円盤1を " + from + " から " + to + " へ移動");
    return;
  }
  // n-1枚を経由地へ
  hanoi(n - 1, from, via, to);
  // 一番大きい円盤を目的地へ
  console.log("円盤" + n + "を " + from + " から " + to + " へ移動");
  // n-1枚を経由地から目的地へ
  hanoi(n - 1, via, to, from);
}

console.log("=== 円盤3枚のハノイの塔 ===");
hanoi(3, "A", "C", "B");
```

:::sensei
ハノイの{塔|とう}は{再帰|さいき}で{考|かんが}えるとスッキリ{解|と}ける{典型的|てんけいてき}な{問題|もんだい}だ。
{円盤|えんばん}が n{枚|まい}のとき、`2^n - 1` {回|かい}の{移動|いどう}が{必要|ひつよう}になるよ。
3{枚|まい}なら 7{回|かい}、4{枚|まい}なら 15{回|かい}だ！
:::

:::student
{再帰|さいき}ってすごい！{自分|じぶん}で{自分|じぶん}を{呼|よ}ぶって
{最初|さいしょ}は{不思議|ふしぎ}だったけど、{使|つか}いこなせたら{強力|きょうりょく}な{武器|ぶき}になるね！
:::

:::sensei
そのとおり！{再帰|さいき}は{慣|な}れるまで{少|すこ}し{時間|じかん}がかかるけど、
{木構造|きこうぞう}やグラフの{探索|たんさく}など、{後|あと}のレッスンで{大活躍|だいかつやく}するよ。
さあ、チャレンジで{階乗|かいじょう}を{完成|かんせい}させよう！
:::
