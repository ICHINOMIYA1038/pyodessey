---
title: "五目並べを作ろう"
slug: "gomoku"
order: 27
description: "本格ゲームに挑戦"
world: "sea"
challenge:
  description: "五目並べの盤面を描画して console.log(\"ゲーム準備完了\") と表示しよう"
  starterCode: "showCanvas();\nconst ctx = canvas.getContext(\"2d\");\n\n// 9x9の盤面を描こう\n\nconsole.log(\"ゲーム準備完了\");\n"
  expectedOutput: "ゲーム準備完了"
  hints:
    - "まず背景を ctx.fillStyle と ctx.fillRect で塗ろう"
    - "for ループで縦線と横線を描こう"
    - "ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); で線が引けるよ"
---

# {五目並|ごもくなら}べを{作|つく}ろう ー {本格|ほんかく}ゲームに{挑戦|ちょうせん}

:::sensei
{冒険者|ぼうけんしゃ}よ、いよいよ{本格的|ほんかくてき}なゲームを{作|つく}るぞ！
{今日|きょう}のミッションは「{五目並|ごもくなら}べ」だ！
:::

:::student
{五目並|ごもくなら}べ！？あの{白|しろ}と{黒|くろ}の{石|いし}を{並|なら}べるゲーム？
{自分|じぶん}で{作|つく}れるの！？
:::

:::sensei
もちろん！{前回|ぜんかい}のCanvasの{技|わざ}を{使|つか}えば、{盤面|ばんめん}も{石|いし}も{描|か}ける。
クリックで{石|いし}を{置|お}いて、{勝|か}ち{負|ま}けも{判定|はんてい}する。
{一歩|いっぽ}ずつ{作|つく}っていこう！
:::

## ゲームの{全体像|ぜんたいぞう}

{完成|かんせい}するゲームの{機能|きのう}を{確認|かくにん}しよう。

1. **{盤面|ばんめん}の{描画|びょうが}** ー 9x9のグリッドを{描|か}く
2. **クリック{処理|しょり}** ー クリックした{場所|ばしょ}に{石|いし}を{置|お}く
3. **{状態管理|じょうたいかんり}** ー 2{次元配列|じげんはいれつ}でどこに{石|いし}があるか{記録|きろく}
4. **{交互|こうご}に{打|う}つ** ー {黒|くろ}→{白|しろ}→{黒|くろ}...と{交代|こうたい}
5. **{勝利判定|しょうりはんてい}** ー 5つ{並|なら}んだら{勝|か}ち！
6. **{勝利表示|しょうりひょうじ}** ー {勝者|しょうしゃ}をメッセージで{表示|ひょうじ}

:::hint
9x9の{盤面|ばんめん}を{使|つか}うよ。{本来|ほんらい}の{五目並|ごもくなら}べは15x15だけど、
{学習用|がくしゅうよう}に{小|ちい}さくして{作|つく}りやすくするんだ！
:::

## ステップ1：{盤面|ばんめん}を{描|か}こう

まずは{空|から}の{盤面|ばんめん}を{描|か}くところからだ。
{碁盤|ごばん}のような{格子|こうし}を{描|か}くよ。

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

const BOARD_SIZE = 9;     // 9x9の盤面
const CELL_SIZE = 40;     // 1マスのサイズ（ピクセル）
const PADDING = 20;       // 盤面の余白

// 背景を木目っぽい色で塗る
ctx.fillStyle = "#DEB887";
ctx.fillRect(0, 0, 400, 400);

// 格子線を描く
ctx.strokeStyle = "#333";
ctx.lineWidth = 1;

for (let i = 0; i < BOARD_SIZE; i++) {
  // 縦線
  const x = PADDING + i * CELL_SIZE;
  ctx.beginPath();
  ctx.moveTo(x, PADDING);
  ctx.lineTo(x, PADDING + (BOARD_SIZE - 1) * CELL_SIZE);
  ctx.stroke();

  // 横線
  const y = PADDING + i * CELL_SIZE;
  ctx.beginPath();
  ctx.moveTo(PADDING, y);
  ctx.lineTo(PADDING + (BOARD_SIZE - 1) * CELL_SIZE, y);
  ctx.stroke();
}

console.log("盤面を描いたよ！");
```

:::student
おお、{碁盤|ごばん}みたいなのが{描|か}けた！
{線|せん}の{交点|こうてん}に{石|いし}を{置|お}くんだよね？
:::

:::sensei
そのとおり！{五目並|ごもくなら}べでは{線|せん}の{交点|こうてん}（{交|まじ}わるところ）に{石|いし}を{置|お}くんだ。
マスの{中|なか}じゃなくて、{線|せん}が{交|まじ}わるポイントだよ。

{定数|ていすう}を{説明|せつめい}しよう：
- `BOARD_SIZE = 9` → 9{本|ほん}の{線|せん}で9x9の{交点|こうてん}ができる
- `CELL_SIZE = 40` → {交点|こうてん}の{間隔|かんかく}は40ピクセル
- `PADDING = 20` → {盤面|ばんめん}の{周|まわ}りに20ピクセルの{余白|よはく}
:::

## ステップ2：クリックで{石|いし}を{置|お}こう

{次|つぎ}は、キャンバスをクリックしたら{石|いし}が{表示|ひょうじ}されるようにするよ。
クリック{座標|ざひょう}を{一番近|いちばんちか}い{交点|こうてん}に{変換|へんかん}するのがポイントだ！

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

const BOARD_SIZE = 9;
const CELL_SIZE = 40;
const PADDING = 20;

// 盤面を描く関数
function drawBoard() {
  ctx.fillStyle = "#DEB887";
  ctx.fillRect(0, 0, 400, 400);

  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;

  for (let i = 0; i < BOARD_SIZE; i++) {
    const x = PADDING + i * CELL_SIZE;
    ctx.beginPath();
    ctx.moveTo(x, PADDING);
    ctx.lineTo(x, PADDING + (BOARD_SIZE - 1) * CELL_SIZE);
    ctx.stroke();

    const y = PADDING + i * CELL_SIZE;
    ctx.beginPath();
    ctx.moveTo(PADDING, y);
    ctx.lineTo(PADDING + (BOARD_SIZE - 1) * CELL_SIZE, y);
    ctx.stroke();
  }
}

// 石を描く関数
function drawStone(row, col, color) {
  const x = PADDING + col * CELL_SIZE;
  const y = PADDING + row * CELL_SIZE;

  ctx.beginPath();
  ctx.arc(x, y, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.stroke();
}

// 盤面を描画
drawBoard();

// クリックイベント
canvas.addEventListener("click", function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // 一番近い交点を計算
  const col = Math.round((mouseX - PADDING) / CELL_SIZE);
  const row = Math.round((mouseY - PADDING) / CELL_SIZE);

  // 盤面の範囲内かチェック
  if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
    drawBoard();  // 盤面を再描画
    drawStone(row, col, "black");
    console.log("石を置いた: 行=" + row + " 列=" + col);
  }
});

console.log("盤面をクリックして石を置こう！");
```

:::sensei
{大事|だいじ}なポイントを{説明|せつめい}するよ。

**クリック{座標|ざひょう}の{変換|へんかん}：**
1. `e.clientX - rect.left` で、キャンバス{内|ない}の{座標|ざひょう}を{取得|しゅとく}
2. `Math.round((mouseX - PADDING) / CELL_SIZE)` で{一番近|いちばんちか}い{交点|こうてん}に{変換|へんかん}

`Math.round` で{四捨五入|ししゃごにゅう}するから、クリックが{少|すこ}しずれても
{一番近|いちばんちか}い{交点|こうてん}にピタッと{石|いし}が{置|お}かれるんだ。
:::

:::student
なるほど！ピクセルの{座標|ざひょう}を{盤面|ばんめん}の{行|ぎょう}・{列|れつ}に{変換|へんかん}してるんだね。
でも{今|いま}は{新|あたら}しい{石|いし}を{置|お}くと{前|まえ}の{石|いし}が{消|き}えちゃう...
:::

:::sensei
{良|い}いところに{気|き}づいた！{次|つぎ}のステップで、
{全部|ぜんぶ}の{石|いし}を{覚|おぼ}えておく{仕組|しく}みを{作|つく}ろう！
:::

## ステップ3：{状態管理|じょうたいかんり}と{交互|こうご}に{打|う}つ

ゲームの{状態|じょうたい}を2{次元配列|じげんはいれつ}で{管理|かんり}するよ。
`0` は{空|から}、`1` は{黒|くろ}、`2` は{白|しろ}だ。

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

const BOARD_SIZE = 9;
const CELL_SIZE = 40;
const PADDING = 20;

// ゲームの状態
const board = [];
for (let i = 0; i < BOARD_SIZE; i++) {
  board.push(new Array(BOARD_SIZE).fill(0));
}
let currentPlayer = 1; // 1=黒, 2=白

// 盤面を描く
function drawBoard() {
  ctx.fillStyle = "#DEB887";
  ctx.fillRect(0, 0, 400, 400);

  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;

  for (let i = 0; i < BOARD_SIZE; i++) {
    const x = PADDING + i * CELL_SIZE;
    ctx.beginPath();
    ctx.moveTo(x, PADDING);
    ctx.lineTo(x, PADDING + (BOARD_SIZE - 1) * CELL_SIZE);
    ctx.stroke();

    const y = PADDING + i * CELL_SIZE;
    ctx.beginPath();
    ctx.moveTo(PADDING, y);
    ctx.lineTo(PADDING + (BOARD_SIZE - 1) * CELL_SIZE, y);
    ctx.stroke();
  }
}

// 石を描く
function drawStone(row, col, player) {
  const x = PADDING + col * CELL_SIZE;
  const y = PADDING + row * CELL_SIZE;
  const radius = CELL_SIZE / 2 - 2;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);

  if (player === 1) {
    ctx.fillStyle = "#111";
  } else {
    ctx.fillStyle = "#EEE";
  }
  ctx.fill();
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.stroke();
}

// 全部描画
function drawAll() {
  drawBoard();
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] !== 0) {
        drawStone(r, c, board[r][c]);
      }
    }
  }

  // 現在の手番を表示
  const turnText = currentPlayer === 1 ? "●黒の番" : "○白の番";
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "#333";
  ctx.textAlign = "left";
  ctx.fillText(turnText, 10, 390);
}

// クリックイベント
canvas.addEventListener("click", function(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const col = Math.round((mouseX - PADDING) / CELL_SIZE);
  const row = Math.round((mouseY - PADDING) / CELL_SIZE);

  if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
    // すでに石がある場所には置けない
    if (board[row][col] !== 0) {
      console.log("そこにはもう石があるよ！");
      return;
    }

    board[row][col] = currentPlayer;
    console.log((currentPlayer === 1 ? "黒" : "白") + "が (" + row + "," + col + ") に置いた");

    // 手番を交代
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    drawAll();
  }
});

drawAll();
console.log("黒と白が交互に打てるよ！クリックしてみよう！");
```

:::sensei
ここがゲーム{作|つく}りの{核心|かくしん}だ！{大事|だいじ}なポイントを{整理|せいり}しよう。

**2{次元配列|じげんはいれつ} `board`：**
{盤面|ばんめん}の{状態|じょうたい}を{記録|きろく}する「{地図|ちず}」だよ。
- `board[row][col] === 0` → {空|から}
- `board[row][col] === 1` → {黒|くろ}い{石|いし}
- `board[row][col] === 2` → {白|しろ}い{石|いし}

**{手番|てばん}の{交代|こうたい}：**
`currentPlayer = currentPlayer === 1 ? 2 : 1;`
これで1と2を{交互|こうご}に{切|き}り{替|か}えているよ。

**{重複|じゅうふく}チェック：**
`if (board[row][col] !== 0) return;`
{すでに石|いし}がある{場所|ばしょ}には{置|お}けないようにしているんだ。
:::

:::student
おお！{黒|くろ}と{白|しろ}が{交互|こうご}に{打|う}てる！
でもまだ「5つ{並|なら}んだら{勝|か}ち」の{判定|はんてい}がないね？
:::

## ステップ4：{勝利判定|しょうりはんてい}を{作|つく}ろう

{五目並|ごもくなら}べの{一番難|いちばんむずか}しい{部分|ぶぶん}ー{勝利判定|しょうりはんてい}だ！
{石|いし}を{置|お}いた{場所|ばしょ}から4つの{方向|ほうこう}をチェックするよ。

- {横|よこ}（→）
- {縦|たて}（↓）
- {右斜|みぎなな}め（↘）
- {左斜|ひだりなな}め（↙）

```javascript runnable
// 勝利判定のロジックだけ確認しよう

const BOARD_SIZE = 9;

// テスト用の盤面
const board = [];
for (let i = 0; i < BOARD_SIZE; i++) {
  board.push(new Array(BOARD_SIZE).fill(0));
}

// 黒石を横に5つ並べてみる
board[4][2] = 1;
board[4][3] = 1;
board[4][4] = 1;
board[4][5] = 1;
board[4][6] = 1;

// 勝利判定関数
function checkWin(row, col, player) {
  // 4方向をチェック: [行の変化, 列の変化]
  const directions = [
    [0, 1],   // 横（→）
    [1, 0],   // 縦（↓）
    [1, 1],   // 右斜め（↘）
    [1, -1]   // 左斜め（↙）
  ];

  for (const [dr, dc] of directions) {
    let count = 1; // 置いた石自身を数える

    // 正方向を数える
    for (let i = 1; i < 5; i++) {
      const r = row + dr * i;
      const c = col + dc * i;
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) break;
      if (board[r][c] !== player) break;
      count++;
    }

    // 逆方向を数える
    for (let i = 1; i < 5; i++) {
      const r = row - dr * i;
      const c = col - dc * i;
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) break;
      if (board[r][c] !== player) break;
      count++;
    }

    if (count >= 5) return true;
  }

  return false;
}

// テスト！
console.log("横5つ並び判定: " + checkWin(4, 4, 1));  // true
console.log("白の判定: " + checkWin(4, 4, 2));         // false

// 縦も試す
const board2 = [];
for (let i = 0; i < BOARD_SIZE; i++) {
  board2.push(new Array(BOARD_SIZE).fill(0));
}
board2[0][3] = 2;
board2[1][3] = 2;
board2[2][3] = 2;
board2[3][3] = 2;
board2[4][3] = 2;

// board2をboardにコピーして判定
for (let i = 0; i < BOARD_SIZE; i++) {
  for (let j = 0; j < BOARD_SIZE; j++) {
    board[i][j] = board2[i][j];
  }
}
console.log("縦5つ並び判定: " + checkWin(2, 3, 2));  // true
```

:::sensei
{勝利判定|しょうりはんてい}のアルゴリズムを{詳|くわ}しく{説明|せつめい}するよ！

**4{方向|ほうこう}のチェック：**
{石|いし}を{置|お}いた{場所|ばしょ}から、4つの{方向|ほうこう}それぞれについて
「{正方向|せいほうこう}に{何個|なんこ}{並|なら}んでいるか」と
「{逆方向|ぎゃくほうこう}に{何個|なんこ}{並|なら}んでいるか」を{数|かぞ}えるんだ。

たとえば{横方向|よこほうこう} `[0, 1]` なら：
- {正方向|せいほうこう}：{右|みぎ}に{向|む}かって{同|おな}じ{色|いろ}の{石|いし}を{数|かぞ}える
- {逆方向|ぎゃくほうこう}：{左|ひだり}に{向|む}かって{同|おな}じ{色|いろ}の{石|いし}を{数|かぞ}える
- {合計|ごうけい} + {自分自身|じぶんじしん}1 で5{以上|いじょう}なら{勝|か}ち！

`[dr, dc]` は{方向|ほうこう}ベクトルだよ：
- `[0, 1]` → {行|ぎょう}は{変|か}わらず、{列|れつ}が+1（{右|みぎ}）
- `[1, 0]` → {行|ぎょう}が+1、{列|れつ}は{変|か}わらず（{下|した}）
- `[1, 1]` → {行|ぎょう}+1、{列|れつ}+1（{右下|みぎした}）
- `[1, -1]` → {行|ぎょう}+1、{列|れつ}-1（{左下|ひだりした}）
:::

:::student
なるほど！{正方向|せいほうこう}と{逆方向|ぎゃくほうこう}の{両方|りょうほう}を{数|かぞ}えるから、
{真|ま}ん{中|なか}に{置|お}いた{石|いし}でも{正|ただ}しく{判定|はんてい}できるんだね！
:::

:::sensei
そのとおり！{例|たと}えば `○○●○○` の{真|ま}ん{中|なか}の `●` から
{左|ひだり}に2つ、{右|みぎ}に2つ、+{自分|じぶん}で{合計|ごうけい}5つ！
:::

## ステップ5：{完成|かんせい}！{全機能|ぜんきのう}を{合体|がったい}

すべての{機能|きのう}を{合|あ}わせて、{完全|かんぜん}に{遊|あそ}べる{五目並|ごもくなら}べを{作|つく}ろう！

:::sensei
これが{最終形|さいしゅうけい}だ！{長|なが}いコードだけど、
ここまでのステップで{全部理解|ぜんぶりかい}しているはずだよ。
{一|ひと}つずつ{確認|かくにん}しながら{読|よ}んでみよう！
:::

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// === 定数 ===
const SIZE = 9;
const CELL = 40;
const PAD = 20;

// === ゲーム状態 ===
const board = [];
for (let i = 0; i < SIZE; i++) {
  board.push(new Array(SIZE).fill(0));
}
let currentPlayer = 1;
let gameOver = false;

// === 盤面描画 ===
function drawBoard() {
  ctx.fillStyle = "#DEB887";
  ctx.fillRect(0, 0, 400, 400);

  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  for (let i = 0; i < SIZE; i++) {
    const x = PAD + i * CELL;
    ctx.beginPath();
    ctx.moveTo(x, PAD);
    ctx.lineTo(x, PAD + (SIZE - 1) * CELL);
    ctx.stroke();

    const y = PAD + i * CELL;
    ctx.beginPath();
    ctx.moveTo(PAD, y);
    ctx.lineTo(PAD + (SIZE - 1) * CELL, y);
    ctx.stroke();
  }

  // 星（中央と四隅の目印）
  const stars = [2, 4, 6];
  ctx.fillStyle = "#333";
  for (const r of stars) {
    for (const c of stars) {
      if ((r === 4 && c === 4) || (r === 2 && c === 2) ||
          (r === 2 && c === 6) || (r === 6 && c === 2) || (r === 6 && c === 6)) {
        ctx.beginPath();
        ctx.arc(PAD + c * CELL, PAD + r * CELL, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

// === 石描画 ===
function drawStone(row, col, player) {
  const x = PAD + col * CELL;
  const y = PAD + row * CELL;
  const r = CELL / 2 - 3;

  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);

  if (player === 1) {
    // 黒石（グラデーション風）
    ctx.fillStyle = "#222";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - 3, y - 3, r * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = "#555";
    ctx.fill();
  } else {
    // 白石（グラデーション風）
    ctx.fillStyle = "#EEE";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - 3, y - 3, r * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = "#FFF";
    ctx.fill();
  }

  // 外枠
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 1;
  ctx.stroke();
}

// === 全体描画 ===
function drawAll() {
  drawBoard();
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] !== 0) {
        drawStone(r, c, board[r][c]);
      }
    }
  }

  // ステータス表示
  ctx.font = "bold 16px sans-serif";
  ctx.textAlign = "left";
  if (gameOver) {
    ctx.fillStyle = "red";
    const winner = currentPlayer === 1 ? "白" : "黒";
    ctx.fillText("🎉 " + winner + "の勝ち！", 10, 390);
  } else {
    ctx.fillStyle = "#333";
    const turn = currentPlayer === 1 ? "● 黒の番" : "○ 白の番";
    ctx.fillText(turn, 10, 390);
  }
}

// === 勝利判定 ===
function checkWin(row, col, player) {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];

  for (const [dr, dc] of dirs) {
    let count = 1;

    for (let i = 1; i < 5; i++) {
      const r = row + dr * i;
      const c = col + dc * i;
      if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) break;
      if (board[r][c] !== player) break;
      count++;
    }
    for (let i = 1; i < 5; i++) {
      const r = row - dr * i;
      const c = col - dc * i;
      if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) break;
      if (board[r][c] !== player) break;
      count++;
    }

    if (count >= 5) return true;
  }
  return false;
}

// === クリック処理 ===
canvas.addEventListener("click", function(e) {
  if (gameOver) return;

  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  const col = Math.round((mx - PAD) / CELL);
  const row = Math.round((my - PAD) / CELL);

  if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) return;
  if (board[row][col] !== 0) return;

  board[row][col] = currentPlayer;

  if (checkWin(row, col, currentPlayer)) {
    gameOver = true;
    drawAll();
    const winner = currentPlayer === 1 ? "黒" : "白";
    console.log(winner + "の勝ち！🎉");
    return;
  }

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  drawAll();
});

// === ゲーム開始 ===
drawAll();
console.log("五目並べスタート！盤面をクリックして遊ぼう！");
```

:::student
すごい！！{完全|かんぜん}に{遊|あそ}べる{五目並|ごもくなら}べができた！
{黒|くろ}と{白|しろ}の{石|いし}がちゃんとキレイに{描|か}かれてるし、
5つ{並|なら}べたら{勝|か}ちって{出|で}る！
:::

## コードの{全体|ぜんたい}を{振|ふ}り{返|かえ}ろう

{完成|かんせい}したゲームの{構造|こうぞう}を{整理|せいり}しよう。

### {定数|ていすう}と{状態|じょうたい}

```
const SIZE = 9;        // 盤面のサイズ
const CELL = 40;       // マスの大きさ
const PAD = 20;        // 余白
const board = [...];   // 2次元配列（0=空, 1=黒, 2=白）
let currentPlayer = 1; // 今の手番
let gameOver = false;  // ゲーム終了フラグ
```

:::sensei
ゲームの{状態|じょうたい}は `board`、`currentPlayer`、`gameOver` の3つだけ。
シンプルだけど、これだけでゲームが{動|うご}くんだ！
:::

### {描画|びょうが}{関数|かんすう}

| {関数|かんすう} | {役割|やくわり} |
|---|---|
| `drawBoard()` | {格子線|こうしせん}と{星|ほし}を{描|か}く |
| `drawStone(row, col, player)` | {指定位置|していいち}に{石|いし}を{描|か}く |
| `drawAll()` | {盤面|ばんめん}+{全|すべ}ての{石|いし}+ステータスを{描|か}く |

:::sensei
`drawAll()` が{全体|ぜんたい}を{描|か}き{直|なお}す{関数|かんすう}だよ。
{石|いし}を{置|お}くたびにこれを{呼|よ}んで{画面|がめん}を{更新|こうしん}するんだ。
:::

### {勝利判定|しょうりはんてい}のアルゴリズム

```
function checkWin(row, col, player) {
  // 4方向 × 正逆 をチェック
  // 同じ色の石が5つ以上並んでいたら true
}
```

:::hint
{勝利判定|しょうりはんてい}は{石|いし}を{置|お}いた{直後|ちょくご}にだけ{呼|よ}べばOKだよ。
{毎回|まいかい}{全|すべ}ての{場所|ばしょ}をチェックする{必要|ひつよう}はないんだ。
{効率的|こうりつてき}でしょ？
:::

### クリック{処理|しょり}の{流|なが}れ

1. クリック{座標|ざひょう}を{取得|しゅとく}
2. {一番近|いちばんちか}い{交点|こうてん}に{変換|へんかん}
3. {範囲|はんい}チェック＆{空|から}きチェック
4. {石|いし}を{配列|はいれつ}に{記録|きろく}
5. {勝利判定|しょうりはんてい}
6. {手番交代|てばんこうたい}
7. {再描画|さいびょうが}

:::sensei
この{流|なが}れは、{多|おお}くのボードゲームで{共通|きょうつう}だよ。
オセロでもチェスでも、{基本的|きほんてき}には{同|おな}じパターンなんだ！
:::

## {応用|おうよう}アイデア

{完成|かんせい}したゲームをもっと{良|よ}くするアイデアを{紹介|しょうかい}するよ。

### アイデア1：{最後|さいご}に{置|お}いた{石|いし}をハイライト

{最後|さいご}に{置|お}いた{石|いし}がどれかわかるように、{印|しるし}をつけてみよう。

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

// 盤面の一部を描画
ctx.fillStyle = "#DEB887";
ctx.fillRect(0, 0, 400, 400);

// 格子線（一部）
ctx.strokeStyle = "#333";
ctx.lineWidth = 1;
for (let i = 0; i < 5; i++) {
  const pos = 60 + i * 60;
  ctx.beginPath();
  ctx.moveTo(pos, 60);
  ctx.lineTo(pos, 300);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(60, pos);
  ctx.lineTo(300, pos);
  ctx.stroke();
}

// 普通の黒石
ctx.beginPath();
ctx.arc(120, 120, 25, 0, Math.PI * 2);
ctx.fillStyle = "#222";
ctx.fill();

// 最後に置いた石（赤い印つき）
ctx.beginPath();
ctx.arc(180, 180, 25, 0, Math.PI * 2);
ctx.fillStyle = "#222";
ctx.fill();

// 赤い点で最後の石を示す
ctx.beginPath();
ctx.arc(180, 180, 5, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();

ctx.font = "14px sans-serif";
ctx.fillStyle = "#333";
ctx.fillText("← 最後に置いた石（赤い印）", 210, 185);

console.log("ハイライト表示の例だよ！");
```

### アイデア2：{座標|ざひょう}ラベルを{表示|ひょうじ}

{盤面|ばんめん}の{端|はし}に{番号|ばんごう}やアルファベットを{表示|ひょうじ}すると{見|み}やすくなるよ。

```javascript runnable
showCanvas();
const ctx = canvas.getContext("2d");

const SIZE = 9;
const CELL = 40;
const PAD = 30; // ラベル分少し余白を増やす

ctx.fillStyle = "#DEB887";
ctx.fillRect(0, 0, 400, 400);

ctx.strokeStyle = "#333";
ctx.lineWidth = 1;

for (let i = 0; i < SIZE; i++) {
  const x = PAD + i * CELL;
  ctx.beginPath();
  ctx.moveTo(x, PAD);
  ctx.lineTo(x, PAD + (SIZE - 1) * CELL);
  ctx.stroke();

  const y = PAD + i * CELL;
  ctx.beginPath();
  ctx.moveTo(PAD, y);
  ctx.lineTo(PAD + (SIZE - 1) * CELL, y);
  ctx.stroke();

  // 列ラベル（A〜I）
  ctx.font = "12px sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#555";
  ctx.fillText(String.fromCharCode(65 + i), PAD + i * CELL, PAD - 10);

  // 行ラベル（1〜9）
  ctx.textAlign = "right";
  ctx.fillText(String(i + 1), PAD - 8, PAD + i * CELL + 4);
}

console.log("座標ラベル付きの盤面だよ！");
```

### アイデア3：リセットボタン

ゲームが{終|お}わったら{最初|さいしょ}からやり{直|なお}せるようにしよう。

:::sensei
{実際|じっさい}にリセット{機能|きのう}を{追加|ついか}するなら、こんなコードを{足|た}すよ：

```
function resetGame() {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      board[r][c] = 0;
    }
  }
  currentPlayer = 1;
  gameOver = false;
  drawAll();
  console.log("ゲームをリセットしたよ！");
}
```

`gameOver` のときにクリックしたらリセットする、
というのが{一番簡単|いちばんかんたん}な{方法|ほうほう}だね。
:::

## {発展|はってん}：もっと{強|つよ}いゲームにするには

:::sensei
{余裕|よゆう}がある{冒険者|ぼうけんしゃ}のために、{発展的|はってんてき}なアイデアを{紹介|しょうかい}するよ。
:::

### 15x15{盤面|ばんめん}への{拡張|かくちょう}

{定数|ていすう}を{変|か}えるだけで{盤面|ばんめん}サイズを{変|か}えられるよ。

```
const SIZE = 15;   // 9 → 15 に変更
const CELL = 25;   // マスを小さくする
const PAD = 12;    // 余白も調整
```

:::student
{定数|ていすう}を{変|か}えるだけで{対応|たいおう}できるように{作|つく}ってたんだね！
:::

### {禁|きん}じ{手|て}ルール

{本格的|ほんかくてき}な{五目並|ごもくなら}べでは、{黒|くろ}に「{禁|きん}じ{手|て}」があるんだ：
- **{三三|さんさん}** ー {同時|どうじ}に2つの{活|い}き{三|さん}（{両端|りょうたん}が{空|あ}いた3{連|れん}）を{作|つく}る{手|て}
- **{四四|しし}** ー {同時|どうじ}に2つの{四|し}を{作|つく}る{手|て}
- **{長連|ちょうれん}** ー 6つ{以上|いじょう}{並|なら}べる{手|て}

これらの{実装|じっそう}は{難|むずか}しいけど、チャレンジしてみるのもいいね！

### AI{対戦|たいせん}

{一人|ひとり}でも{遊|あそ}べるように、{簡単|かんたん}なAIを{作|つく}ることもできるよ。
{一番簡単|いちばんかんたん}なのは「ランダムに{空|あ}いている{場所|ばしょ}に{置|お}く」AIだ。

```
function aiMove() {
  const empty = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) empty.push([r, c]);
    }
  }
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  board[r][c] = currentPlayer;
  // 勝利判定と手番交代...
}
```

:::sensei
もっと{強|つよ}いAIにするには、「{相手|あいて}が4つ{並|なら}んでたら{止|と}める」
「{自分|じぶん}が4つ{並|なら}んでたら5つ{目|め}に{置|お}く」のような
ルールを{追加|ついか}するんだ。これを「ヒューリスティック」と{呼|よ}ぶよ。
:::

## {今日|きょう}{学|まな}んだこと

:::sensei
{今日|きょう}の{冒険|ぼうけん}で{学|まな}んだことを{振|ふ}り{返|かえ}ろう！
:::

| {技術|ぎじゅつ} | {使|つか}った{場面|ばめん} |
|---|---|
| Canvas{描画|びょうが} | {盤面|ばんめん}の{格子線|こうしせん}、{石|いし}、テキスト |
| 2{次元配列|じげんはいれつ} | ゲームの{状態管理|じょうたいかんり} |
| イベントリスナー | クリックで{石|いし}を{置|お}く |
| {座標変換|ざひょうへんかん} | ピクセル →{盤面|ばんめん}の{行列|ぎょうれつ} |
| {方向|ほうこう}ベクトル | 4{方向|ほうこう}の{勝利判定|しょうりはんてい} |
| {関数|かんすう}の{分割|ぶんかつ} | {描画|びょうが}・{判定|はんてい}・{入力|にゅうりょく}を{分|わ}ける |
| フラグ{変数|へんすう} | `gameOver` でゲーム{終了|しゅうりょう}を{管理|かんり} |

:::student
Canvasと{配列|はいれつ}とイベントと{関数|かんすう}...
{今|いま}まで{学|まな}んだことが{全部|ぜんぶ}つながって、ゲームになった！
プログラミングってすごい！
:::

:::sensei
そう、これが{今|いま}までの{冒険|ぼうけん}の{集大成|しゅうたいせい}だ！
{変数|へんすう}、{配列|はいれつ}、ループ、{関数|かんすう}、{条件分岐|じょうけんぶんき}、イベント...
{全部|ぜんぶ}{組|く}み{合|あ}わせて、{本格的|ほんかくてき}なゲームが{作|つく}れたね。
{冒険者|ぼうけんしゃ}よ、{君|きみ}はもう{立派|りっぱ}なプログラマーだ！
:::
