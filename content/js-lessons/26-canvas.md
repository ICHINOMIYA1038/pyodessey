---
title: "Canvas入門"
slug: "canvas"
order: 26
description: "絵を描こう"
world: "sea"
challenge:
  description: "Canvas に赤い円を描いて console.log(\"描画完了\") と表示しよう"
  starterCode: "showCanvas();\nconst ctx = canvas.getContext(\"2d\");\n\n// 赤い円を描こう\n// ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();\n\nconsole.log(\"描画完了\");\n"
  expectedOutput: "描画完了"
  hints:
    - "ctx.fillStyle = \"red\"; で色を赤にしよう"
    - "ctx.beginPath() でパスを始めて、ctx.arc(200, 200, 50, 0, Math.PI * 2) で円を作ろう"
    - "ctx.fill() で塗りつぶそう"
---

# Canvas{入門|にゅうもん} ー {絵|え}を{描|か}こう

:::sensei
{冒険者|ぼうけんしゃ}よ、{今日|きょう}はいよいよ{画面|がめん}に{絵|え}を{描|か}くぞ！
JavaScriptの **Canvas**（キャンバス）を{使|つか}えば、{四角|しかく}や{円|えん}、{線|せん}、{文字|もじ}...
なんでも{自由|じゆう}に{描|か}けるんだ！
:::

:::student
{絵|え}が{描|か}ける！？ゲームの{画面|がめん}みたいなの{作|つく}れるの！？
:::

:::sensei
そのとおり！ゲームもアニメーションも、{全部|ぜんぶ}Canvasの{上|うえ}に{描|か}いているんだよ。
まずは{基本|きほん}から{始|はじ}めよう！
:::

## Canvasとは？

Canvasは{英語|えいご}で「{画布|がふ}」という{意味|いみ}だよ。
{絵|え}を{描|か}くための{特別|とくべつ}な{領域|りょういき}で、HTMLの `<canvas>` {要素|ようそ}として{用意|ようい}されているんだ。

この{学習環境|がくしゅうかんきょう}では、すでに `canvas` という{変数|へんすう}が{用意|ようい}されているよ。
{幅|はば}400px、{高|たか}さ400pxのキャンバスだ。

:::hint
`showCanvas()` を{呼|よ}ぶとキャンバスが{画面|がめん}に{表示|ひょうじ}されるよ。
{描画|びょうが}コードを{書|か}く{前|まえ}に{必|かなら}ず{呼|よ}ぼう！
:::

## 2D コンテキストを{取得|しゅとく}する

{絵|え}を{描|か}くには、まず「{描画|びょうが}コンテキスト」を{取得|しゅとく}する{必要|ひつよう}があるよ。
コンテキストは「{絵|え}を{描|か}くための{道具箱|どうぐばこ}」みたいなものだ。

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");
console.log("コンテキスト取得OK！");
console.log("キャンバスの幅: " + canvas.width);
console.log("キャンバスの高さ: " + canvas.height);
```

:::sensei
`getContext("2d")` で2D{描画|びょうが}の{道具箱|どうぐばこ}をもらうんだ。
この `ctx` を{使|つか}って、これからいろんな{図形|ずけい}を{描|か}いていくよ！
:::

## {四角形|しかくけい}を{描|か}こう

{最|もっと}も{基本的|きほんてき}な{図形|ずけい}は{四角形|しかくけい}だよ。3つの{方法|ほうほう}があるんだ。

| メソッド | {意味|いみ} |
|---|---|
| `fillRect(x, y, w, h)` | {塗|ぬ}りつぶした{四角|しかく} |
| `strokeRect(x, y, w, h)` | {枠|わく}だけの{四角|しかく} |
| `clearRect(x, y, w, h)` | {四角|しかく}い{範囲|はんい}を{消|け}す |

`x, y` は{左上|ひだりうえ}の{座標|ざひょう}、`w` は{幅|はば}、`h` は{高|たか}さだよ。

:::hint
Canvasの{座標|ざひょう}は{左上|ひだりうえ}が `(0, 0)` で、{右|みぎ}に{行|い}くほど `x` が{増|ふ}え、
{下|した}に{行|い}くほど `y` が{増|ふ}えるよ。{数学|すうがく}のグラフとは `y` の{方向|ほうこう}が{逆|ぎゃく}だから{注意|ちゅうい}！
:::

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// 塗りつぶした四角
ctx.fillRect(50, 50, 100, 80);

// 枠だけの四角
ctx.strokeRect(200, 50, 100, 80);

// まず大きな四角を塗って...
ctx.fillRect(50, 180, 200, 100);
// 中を消す → 枠のように見える！
ctx.clearRect(60, 190, 180, 80);

console.log("四角形を3つ描いたよ！");
```

:::student
おお！{黒|くろ}い{四角|しかく}と、{枠|わく}だけの{四角|しかく}が{描|か}けた！
`clearRect` で{消|け}すのもおもしろいね！
:::

## {色|いろ}をつけよう

`fillStyle` と `strokeStyle` で{色|いろ}を{変|か}えられるよ。
{色|いろ}の{指定|してい}は CSS と{同|おな}じ{方法|ほうほう}が{使|つか}えるんだ。

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// 赤い四角
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 80, 80);

// 青い四角
ctx.fillStyle = "blue";
ctx.fillRect(120, 20, 80, 80);

// 緑の四角
ctx.fillStyle = "green";
ctx.fillRect(220, 20, 80, 80);

// 半透明の黄色
ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
ctx.fillRect(320, 20, 60, 80);

// オレンジの枠線
ctx.strokeStyle = "orange";
ctx.lineWidth = 4;
ctx.strokeRect(20, 130, 360, 80);

console.log("カラフルな四角を描いたよ！");
```

:::sensei
`fillStyle` は{塗|ぬ}りの{色|いろ}、`strokeStyle` は{線|せん}の{色|いろ}だよ。
`"red"` のような{色名|いろめい}、`"#FF0000"` のような16{進数|しんすう}、
`"rgba(255, 0, 0, 0.5)"` のようなRGBA{形式|けいしき}が{使|つか}えるんだ。
{一度|いちど}{設定|せってい}した{色|いろ}は、{次|つぎ}に{変|か}えるまで{有効|ゆうこう}だよ。
:::

## パスで{自由|じゆう}な{形|かたち}を{描|か}こう

{四角形|しかくけい}だけじゃなく、{線|せん}をつないで{自由|じゆう}な{形|かたち}を{描|か}けるよ。
これを「パス」と{呼|よ}ぶんだ。

| メソッド | {意味|いみ} |
|---|---|
| `beginPath()` | {新|あたら}しいパスを{始|はじ}める |
| `moveTo(x, y)` | ペンを{移動|いどう}（{線|せん}は{引|ひ}かない） |
| `lineTo(x, y)` | {今|いま}の{位置|いち}から{線|せん}を{引|ひ}く |
| `closePath()` | {始点|してん}に{戻|もど}る{線|せん}を{引|ひ}く |
| `fill()` | パスの{中|なか}を{塗|ぬ}りつぶす |
| `stroke()` | パスの{線|せん}を{描|か}く |

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// 三角形を描こう
ctx.beginPath();
ctx.moveTo(200, 50);    // 頂点（上）
ctx.lineTo(100, 200);   // 左下
ctx.lineTo(300, 200);   // 右下
ctx.closePath();         // 始点に戻る

ctx.fillStyle = "gold";
ctx.fill();
ctx.strokeStyle = "darkgoldenrod";
ctx.lineWidth = 3;
ctx.stroke();

console.log("金色の三角形を描いたよ！");
```

:::student
わあ、{三角形|さんかくけい}が{描|か}けた！`moveTo` で{移動|いどう}して、`lineTo` で{線|せん}を{引|ひ}くんだね。
:::

{星|ほし}の{形|かたち}もパスで{描|か}けるよ！

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// 星を描く
ctx.beginPath();
ctx.moveTo(200, 30);
ctx.lineTo(230, 140);
ctx.lineTo(340, 140);
ctx.lineTo(250, 210);
ctx.lineTo(280, 320);
ctx.lineTo(200, 250);
ctx.lineTo(120, 320);
ctx.lineTo(150, 210);
ctx.lineTo(60, 140);
ctx.lineTo(170, 140);
ctx.closePath();

ctx.fillStyle = "#FFD700";
ctx.fill();
ctx.strokeStyle = "#B8860B";
ctx.lineWidth = 2;
ctx.stroke();

console.log("星を描いたよ！");
```

## {円|えん}を{描|か}こう

{円|えん}は `arc` メソッドで{描|か}くよ。

```
ctx.arc(x, y, radius, startAngle, endAngle);
```

- `x, y` ー {中心|ちゅうしん}の{座標|ざひょう}
- `radius` ー {半径|はんけい}
- `startAngle` ー {開始角度|かいしかくど}（ラジアン）
- `endAngle` ー {終了角度|しゅうりょうかくど}（ラジアン）

{完全|かんぜん}な{円|えん}を{描|か}くには `0` から `Math.PI * 2`（360{度|ど}）まで{指定|してい}するんだ。

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// 赤い円
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();

// 青い円（枠だけ）
ctx.beginPath();
ctx.arc(250, 100, 50, 0, Math.PI * 2);
ctx.strokeStyle = "blue";
ctx.lineWidth = 3;
ctx.stroke();

// 半円
ctx.beginPath();
ctx.arc(175, 260, 60, 0, Math.PI);
ctx.fillStyle = "purple";
ctx.fill();

console.log("円と半円を描いたよ！");
```

:::sensei
{大事|だいじ}なポイント！`beginPath()` を{忘|わす}れると、{前|まえ}のパスとつながっちゃうよ。
{新|あたら}しい{図形|ずけい}を{描|か}く{前|まえ}には{必|かなら}ず `beginPath()` を{呼|よ}ぼう！
:::

:::student
なるほど！{毎回|まいかい} `beginPath()` で{始|はじ}めるのがコツなんだね。
:::

## {文字|もじ}を{描|か}こう

Canvas には{文字|もじ}も{描|か}けるよ。`font` で{書体|しょたい}とサイズを{設定|せってい}してから、
`fillText` や `strokeText` で{描画|びょうが}するんだ。

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// 大きな文字
ctx.font = "48px sans-serif";
ctx.fillStyle = "navy";
ctx.fillText("冒険開始！", 50, 80);

// 小さな文字
ctx.font = "24px sans-serif";
ctx.fillStyle = "gray";
ctx.fillText("レベル 1 / HP 100", 50, 130);

// 枠文字
ctx.font = "60px sans-serif";
ctx.strokeStyle = "crimson";
ctx.lineWidth = 2;
ctx.strokeText("BOSS", 100, 250);

// 中央揃え
ctx.font = "20px sans-serif";
ctx.textAlign = "center";
ctx.fillStyle = "green";
ctx.fillText("この文字は中央揃え", 200, 330);

console.log("文字を描いたよ！");
```

:::hint
`ctx.textAlign = "center"` を{設定|せってい}すると、`fillText` の `x` {座標|ざひょう}が
{文字|もじ}の{中央|ちゅうおう}になるよ。{左揃|ひだりぞろ}えなら `"left"`（デフォルト）だよ。
:::

## {風景|ふうけい}を{描|か}いてみよう

{学|まな}んだことを{組|く}み{合|あ}わせて、{簡単|かんたん}な{風景|ふうけい}を{描|か}いてみよう！
{空|そら}、{地面|じめん}、{太陽|たいよう}、{家|いえ}のある{風景|ふうけい}だよ。

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// === 空 ===
ctx.fillStyle = "#87CEEB";
ctx.fillRect(0, 0, 400, 250);

// === 地面（草原） ===
ctx.fillStyle = "#228B22";
ctx.fillRect(0, 250, 400, 150);

// === 太陽 ===
ctx.beginPath();
ctx.arc(330, 70, 45, 0, Math.PI * 2);
ctx.fillStyle = "#FFD700";
ctx.fill();

// === 家の壁 ===
ctx.fillStyle = "#DEB887";
ctx.fillRect(120, 170, 120, 80);

// === 屋根（三角形） ===
ctx.beginPath();
ctx.moveTo(100, 170);
ctx.lineTo(180, 100);
ctx.lineTo(260, 170);
ctx.closePath();
ctx.fillStyle = "#8B0000";
ctx.fill();

// === ドア ===
ctx.fillStyle = "#654321";
ctx.fillRect(165, 210, 30, 40);

// === 窓 ===
ctx.fillStyle = "#ADD8E6";
ctx.fillRect(135, 190, 20, 20);
ctx.fillRect(205, 190, 20, 20);

// === テキスト ===
ctx.font = "16px sans-serif";
ctx.fillStyle = "white";
ctx.fillText("冒険者の家", 140, 290);

console.log("風景を描いたよ！");
```

:::student
すごい！{空|そら}と{太陽|たいよう}と{家|いえ}がある！
{四角|しかく}と{三角|さんかく}と{円|えん}だけでこんなに{描|か}けるんだね！
:::

:::sensei
そう！{基本|きほん}の{図形|ずけい}を{組|く}み{合|あ}わせれば、いろんな{絵|え}が{描|か}けるんだ。
ゲームの{背景|はいけい}もこうやって{作|つく}られているんだよ。
:::

## グリッド（{格子|こうし}）を{描|か}こう

ゲームの{盤面|ばんめん}を{作|つく}るにはグリッド（{格子|こうし}）が{必要|ひつよう}だよ。
ループを{使|つか}って{線|せん}をたくさん{引|ひ}いてみよう。

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

const gridSize = 40;  // 1マスのサイズ
const cols = 10;       // 列数
const rows = 10;       // 行数

ctx.strokeStyle = "#333";
ctx.lineWidth = 1;

// 縦線を描く
for (let i = 0; i <= cols; i++) {
  ctx.beginPath();
  ctx.moveTo(i * gridSize, 0);
  ctx.lineTo(i * gridSize, rows * gridSize);
  ctx.stroke();
}

// 横線を描く
for (let j = 0; j <= rows; j++) {
  ctx.beginPath();
  ctx.moveTo(0, j * gridSize);
  ctx.lineTo(cols * gridSize, j * gridSize);
  ctx.stroke();
}

console.log("10x10のグリッドを描いたよ！");
```

:::sensei
ループで{線|せん}を{引|ひ}くだけでグリッドの{完成|かんせい}だ！
{将棋盤|しょうぎばん}やオセロの{盤面|ばんめん}も、こうやって{描|か}くんだよ。
:::

{色分|いろわ}けしたグリッドも{作|つく}ってみよう。チェスボードだ！

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

const size = 50;  // 1マスのサイズ
const cols = 8;
const rows = 8;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    if ((row + col) % 2 === 0) {
      ctx.fillStyle = "#F0D9B5";  // 明るいマス
    } else {
      ctx.fillStyle = "#B58863";  // 暗いマス
    }
    ctx.fillRect(col * size, row * size, size, size);
  }
}

console.log("チェスボードを描いたよ！");
```

:::student
おおっ、チェスボードだ！`(row + col) % 2` で{交互|こうご}に{色|いろ}を{変|か}えてるんだね。かしこい！
:::

## {線|せん}のスタイル

{線|せん}の{太|ふと}さや{形|かたち}も{変|か}えられるよ。

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// 細い線
ctx.beginPath();
ctx.lineWidth = 1;
ctx.moveTo(20, 30);
ctx.lineTo(380, 30);
ctx.stroke();

// 太い線
ctx.beginPath();
ctx.lineWidth = 8;
ctx.moveTo(20, 80);
ctx.lineTo(380, 80);
ctx.stroke();

// 色付きの線
ctx.beginPath();
ctx.lineWidth = 4;
ctx.strokeStyle = "red";
ctx.moveTo(20, 130);
ctx.lineTo(380, 130);
ctx.stroke();

// 点線（破線）
ctx.beginPath();
ctx.setLineDash([10, 5]);
ctx.strokeStyle = "blue";
ctx.lineWidth = 3;
ctx.moveTo(20, 180);
ctx.lineTo(380, 180);
ctx.stroke();

// 点線をリセット
ctx.setLineDash([]);

console.log("いろんな線を描いたよ！");
```

## {複数|ふくすう}の{円|えん}で{顔|かお}を{描|か}こう

{円|えん}を{組|く}み{合|あ}わせてキャラクターの{顔|かお}を{描|か}いてみよう！

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// 顔（大きい円）
ctx.beginPath();
ctx.arc(200, 200, 120, 0, Math.PI * 2);
ctx.fillStyle = "#FFDAB9";
ctx.fill();
ctx.strokeStyle = "#333";
ctx.lineWidth = 3;
ctx.stroke();

// 左目
ctx.beginPath();
ctx.arc(160, 170, 15, 0, Math.PI * 2);
ctx.fillStyle = "#333";
ctx.fill();

// 右目
ctx.beginPath();
ctx.arc(240, 170, 15, 0, Math.PI * 2);
ctx.fillStyle = "#333";
ctx.fill();

// 口（半円）
ctx.beginPath();
ctx.arc(200, 230, 40, 0, Math.PI);
ctx.strokeStyle = "#333";
ctx.lineWidth = 3;
ctx.stroke();

// 名前
ctx.font = "20px sans-serif";
ctx.textAlign = "center";
ctx.fillStyle = "#333";
ctx.fillText("ぼうけんしゃ", 200, 360);

console.log("顔を描いたよ！");
```

:::sensei
こうやって{基本|きほん}の{図形|ずけい}を{組|く}み{合|あ}わせれば、
キャラクターだって{描|か}けるんだ！
:::

## {関数|かんすう}にまとめよう

{同|おな}じ{図形|ずけい}を{何度|なんど}も{描|か}くなら、{関数|かんすう}にまとめると{便利|べんり}だよ。

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// 木を描く関数
function drawTree(x, y) {
  // 幹
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(x - 10, y, 20, 40);
  // 葉
  ctx.beginPath();
  ctx.arc(x, y - 10, 30, 0, Math.PI * 2);
  ctx.fillStyle = "#228B22";
  ctx.fill();
}

// 地面
ctx.fillStyle = "#90EE90";
ctx.fillRect(0, 300, 400, 100);

// 木をたくさん描く！
drawTree(60, 260);
drawTree(150, 270);
drawTree(250, 255);
drawTree(340, 275);

console.log("4本の木を描いたよ！");
```

:::student
{関数|かんすう}にしたら、{座標|ざひょう}を{変|か}えるだけで{何本|なんぼん}でも{木|き}が{描|か}ける！
:::

## アニメーションの{考|かんが}え{方|かた}

ゲームでは{画面|がめん}が{動|うご}いて{見|み}えるよね。
これは「{描|か}いて→{消|け}して→{少|すこ}し{変|か}えて→また{描|か}く」を{高速|こうそく}で{繰|く}り{返|かえ}しているんだ。

JavaScriptでは `requestAnimationFrame` という{関数|かんすう}を{使|つか}うよ。
{毎秒|まいびょう}60{回|かい}くらい{呼|よ}ばれて、なめらかなアニメーションになるんだ。

:::sensei
`requestAnimationFrame` は{非同期処理|ひどうきしょり}だから、
{今日|きょう}は{仕組|しく}みだけ{説明|せつめい}するよ。{実際|じっさい}に{動|うご}かすのは{別|べつ}のレッスンでね！
:::

アニメーションの{基本|きほん}パターンはこうだよ：

```
function gameLoop() {
  // 1. 画面をクリア
  ctx.clearRect(0, 0, 400, 400);

  // 2. 位置を更新
  x += speed;

  // 3. 描画
  ctx.fillRect(x, y, 50, 50);

  // 4. 次のフレームを要求
  requestAnimationFrame(gameLoop);
}
gameLoop(); // 開始
```

:::student
{描|か}いて{消|け}して{描|か}いて...の{繰|く}り{返|かえ}しで{動|うご}いて{見|み}えるんだね！
パラパラ{漫画|まんが}みたい！
:::

:::sensei
まさにそのとおり！パラパラ{漫画|まんが}と{同|おな}じ{原理|げんり}だよ。
1{秒|びょう}に60{枚|まい}も{描|か}くから、とてもなめらかに{見|み}えるんだ。
:::

## まとめ

{今日|きょう}{学|まな}んだCanvasの{基本|きほん}をおさらいしよう！

| {操作|そうさ} | メソッド |
|---|---|
| コンテキスト{取得|しゅとく} | `canvas.getContext("2d")` |
| {塗|ぬ}り{四角|しかく} | `ctx.fillRect(x, y, w, h)` |
| {枠|わく}{四角|しかく} | `ctx.strokeRect(x, y, w, h)` |
| {消去|しょうきょ} | `ctx.clearRect(x, y, w, h)` |
| {塗|ぬ}りの{色|いろ} | `ctx.fillStyle = "色"` |
| {線|せん}の{色|いろ} | `ctx.strokeStyle = "色"` |
| パス{開始|かいし} | `ctx.beginPath()` |
| {移動|いどう} | `ctx.moveTo(x, y)` |
| {線|せん} | `ctx.lineTo(x, y)` |
| {円|えん} | `ctx.arc(x, y, r, start, end)` |
| {文字|もじ} | `ctx.fillText("文字", x, y)` |
| フォント | `ctx.font = "20px sans-serif"` |

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// 最後に全部の技を使って描こう！
// 背景
ctx.fillStyle = "#1a1a2e";
ctx.fillRect(0, 0, 400, 400);

// 星をランダムに描く
ctx.fillStyle = "white";
for (let i = 0; i < 50; i++) {
  const x = (i * 137 + 50) % 400;
  const y = (i * 97 + 30) % 300;
  ctx.fillRect(x, y, 2, 2);
}

// 月
ctx.beginPath();
ctx.arc(320, 80, 40, 0, Math.PI * 2);
ctx.fillStyle = "#F0E68C";
ctx.fill();

// 海
ctx.fillStyle = "#0077BE";
ctx.fillRect(0, 300, 400, 100);

// 船
ctx.fillStyle = "#8B4513";
ctx.fillRect(150, 280, 100, 30);
ctx.beginPath();
ctx.moveTo(200, 240);
ctx.lineTo(200, 280);
ctx.lineTo(260, 270);
ctx.closePath();
ctx.fillStyle = "white";
ctx.fill();

// タイトル
ctx.font = "24px sans-serif";
ctx.textAlign = "center";
ctx.fillStyle = "#FFD700";
ctx.fillText("Canvas の海へ出発！", 200, 380);

console.log("Canvas入門 完了！");
```

:::sensei
{素晴|すば}らしい！これでCanvasの{基本|きほん}はマスターだ。
{次|つぎ}のレッスンでは、このCanvasを{使|つか}って{本格的|ほんかくてき}なゲームを{作|つく}るぞ！
:::

:::student
ゲーム{作|つく}り！{楽|たの}しみ！
Canvas って{思|おも}ったより{簡単|かんたん}で{楽|たの}しいね！
:::
