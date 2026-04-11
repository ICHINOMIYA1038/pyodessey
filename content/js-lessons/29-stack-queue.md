---
title: "スタックとキュー"
slug: "stack-queue"
order: 29
description: "データの出し入れ"
world: "sky"
challenge:
  description: "括弧の対応チェック関数 isValid を作って、isValid(\"({[]})\") の結果を表示しよう"
  starterCode: "// isValid 関数を作ろう\n\n// console.log(isValid(\"({[]})\"));\n"
  expectedOutput: "true"
  hints:
    - "スタック（配列）を使って開き括弧を push しよう"
    - "閉じ括弧が来たら pop して対応をチェックしよう"
    - "最後にスタックが空なら true だよ"
---

# スタックとキュー ー データの{出|だ}し{入|い}れ

:::sensei
{冒険者|ぼうけんしゃ}よ、{今日|きょう}は2つの{大切|たいせつ}なデータ{構造|こうぞう}を{学|まな}ぶよ。
「スタック」と「キュー」だ。どちらもデータを{順番|じゅんばん}に{管理|かんり}するための{仕組|しく}みなんだ！
:::

:::student
スタック？キュー？{名前|なまえ}がかっこいい！
:::

:::sensei
スタックは「{積|つ}み{重|かさ}ね」、キューは「{行列|ぎょうれつ}」と{考|かんが}えるとわかりやすいよ。
お{皿|さら}を{積|つ}み{重|かさ}ねたら、{上|うえ}から{取|と}るよね？それがスタック。
レジに{並|なら}んだら、{先|さき}に{並|なら}んだ{人|ひと}から{会計|かいけい}するよね？それがキュー。
:::

## スタック（LIFO）

スタックは **LIFO**（Last In, First Out ー {後|あと}に{入|い}れたものが{先|さき}に{出|で}る）だ。

```javascript runnable
// 配列でスタックを作る
let stack = [];

// push: 上に積む
stack.push("剣");
console.log("剣を積んだ: " + stack.join(", "));

stack.push("盾");
console.log("盾を積んだ: " + stack.join(", "));

stack.push("薬草");
console.log("薬草を積んだ: " + stack.join(", "));

// pop: 上から取る（最後に入れたものから）
let item = stack.pop();
console.log("取り出した: " + item);
console.log("残り: " + stack.join(", "));

item = stack.pop();
console.log("取り出した: " + item);
console.log("残り: " + stack.join(", "));
```

:::student
{最後|さいご}に{入|い}れた「{薬草|やくそう}」が{最初|さいしょ}に{出|で}てきた！
お{皿|さら}の{山|やま}と{同|おな}じだね。
:::

## スタッククラスを{作|つく}る

もう{少|すこ}しちゃんとしたスタックをクラスで{作|つく}ってみよう。

```javascript runnable
class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      return "スタックは空です";
    }
    return this.items.pop();
  }

  peek() {
    // 一番上を見る（取り出さない）
    if (this.isEmpty()) {
      return "スタックは空です";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

let magicStack = new Stack();
magicStack.push("ファイア");
magicStack.push("ブリザド");
magicStack.push("サンダー");

console.log("一番上の魔法: " + magicStack.peek());
console.log("魔法の数: " + magicStack.size());
console.log("使った魔法: " + magicStack.pop());
console.log("次の魔法: " + magicStack.peek());
```

:::hint
`peek()` はスタックの{一番上|いちばんうえ}を{確認|かくにん}するだけで、{取|と}り{出|だ}さないよ。
`pop()` は{取|と}り{出|だ}す。この{違|ちが}いを{覚|おぼ}えておこう！
:::

## {元|もと}に{戻|もど}す（Undo）システム

スタックの{実用的|じつようてき}な{使|つか}い{方|かた}として、Undoシステムを{作|つく}ってみよう。

```javascript runnable
class UndoSystem {
  constructor() {
    this.history = [];
    this.text = "";
  }

  type(newText) {
    this.history.push(this.text);  // 現在の状態を保存
    this.text = newText;
    console.log("現在: " + this.text);
  }

  undo() {
    if (this.history.length === 0) {
      console.log("これ以上戻せません");
      return;
    }
    this.text = this.history.pop();
    console.log("元に戻した: " + this.text);
  }
}

let editor = new UndoSystem();
editor.type("こんにちは");
editor.type("こんにちは、世界");
editor.type("こんにちは、世界！");
console.log("---");
editor.undo();
editor.undo();
editor.undo();
```

:::student
Undoってスタックで{作|つく}れるんだ！{普段使|ふだんつか}ってるのにしくみは{知|し}らなかった！
:::

## キュー（FIFO）

キューは **FIFO**（First In, First Out ー {先|さき}に{入|い}れたものが{先|さき}に{出|で}る）だ。

```javascript runnable
// 配列でキューを作る
let queue = [];

// enqueue: 列の後ろに並ぶ
queue.push("戦士アキラ");
queue.push("魔法使いユキ");
queue.push("僧侶タロウ");
console.log("待ち行列: " + queue.join(" → "));

// dequeue: 列の先頭から出る
let first = queue.shift();
console.log(first + " の番です！");
console.log("待ち行列: " + queue.join(" → "));

first = queue.shift();
console.log(first + " の番です！");
console.log("待ち行列: " + queue.join(" → "));
```

:::sensei
`push` で{後|うし}ろに{追加|ついか}、`shift` で{先頭|せんとう}から{取|と}り{出|だ}す。
これがキューの{基本|きほん}だよ。{先|さき}に{並|なら}んだ{人|ひと}が{先|さき}に{処理|しょり}される！
:::

## キュークラスを{作|つく}る

キューもクラスで{作|つく}ってみよう。

```javascript runnable
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) {
      return "キューは空です";
    }
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) {
      return "キューは空です";
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

let taskQueue = new Queue();
taskQueue.enqueue("敵Aを攻撃");
taskQueue.enqueue("回復魔法を使う");
taskQueue.enqueue("敵Bを攻撃");

console.log("次のタスク: " + taskQueue.front());
console.log("実行: " + taskQueue.dequeue());
console.log("実行: " + taskQueue.dequeue());
console.log("残りタスク数: " + taskQueue.size());
```

:::student
スタックは `pop`（{上|うえ}から）、キューは `shift`（{前|まえ}から）。
{取|と}り{出|だ}す{場所|ばしょ}が{違|ちが}うんだね！
:::

## スタックとキューの{比較|ひかく}

{同|おな}じデータを{入|い}れて、{取|と}り{出|だ}す{順番|じゅんばん}を{比|くら}べてみよう。

```javascript runnable
let data = ["A", "B", "C", "D"];

// スタック（LIFO）
let stack = [];
for (let i = 0; i < data.length; i++) {
  stack.push(data[i]);
}
let stackResult = [];
while (stack.length > 0) {
  stackResult.push(stack.pop());
}
console.log("入れた順: " + data.join(", "));
console.log("スタック: " + stackResult.join(", "));

// キュー（FIFO）
let queue = [];
for (let i = 0; i < data.length; i++) {
  queue.push(data[i]);
}
let queueResult = [];
while (queue.length > 0) {
  queueResult.push(queue.shift());
}
console.log("キュー:   " + queueResult.join(", "));
```

:::sensei
スタックは{逆順|ぎゃくじゅん}（D, C, B, A）、キューは{同|おな}じ{順番|じゅんばん}（A, B, C, D）になるね。
この{違|ちが}いをしっかり{覚|おぼ}えておこう！
:::

## {括弧|かっこ}の{対応|たいおう}チェック

スタックの{代表的|だいひょうてき}な{使|つか}い{方|かた}が「{括弧|かっこ}の{対応|たいおう}チェック」だ。
プログラミングでとても{役|やく}に{立|た}つよ！

```javascript runnable
function isValid(str) {
  let stack = [];
  let pairs = { ")": "(", "]": "[", "}": "{" };

  for (let i = 0; i < str.length; i++) {
    let ch = str[i];

    // 開き括弧ならスタックに積む
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
    }
    // 閉じ括弧なら対応をチェック
    else if (ch === ")" || ch === "]" || ch === "}") {
      if (stack.length === 0) return false;
      let top = stack.pop();
      if (top !== pairs[ch]) return false;
    }
  }

  // スタックが空なら全部対応している
  return stack.length === 0;
}

console.log("({[]}) → " + isValid("({[]})"));
console.log("({)} → " + isValid("({)}"));
console.log("((( → " + isValid("((("));
console.log("[] → " + isValid("[]"));
console.log("{[()]} → " + isValid("{[()]}"));
```

:::student
なるほど！{開|ひら}き{括弧|かっこ}をスタックに{積|つ}んで、
{閉|と}じ{括弧|かっこ}が{来|き}たら{対応|たいおう}するか{確認|かくにん}するんだ。
スタックが{空|から}なら{全部|ぜんぶ}{正|ただ}しく{対応|たいおう}してるってこと！
:::

## {冒険|ぼうけん}のターンシステム

スタックとキューを{組|く}み{合|あ}わせた{実践的|じっせんてき}な{例|れい}を{見|み}てみよう。

```javascript runnable
// ターン制バトルのシステム
let turnOrder = [];  // キュー: 行動順
let actionLog = [];  // スタック: 行動履歴

// キューにキャラを追加
let characters = ["勇者", "魔法使い", "ゴブリン", "ドラゴン"];
for (let i = 0; i < characters.length; i++) {
  turnOrder.push(characters[i]);
}

// バトルの3ターンをシミュレーション
let actions = ["斬りつけた", "ファイアを唱えた", "噛みついた"];
for (let i = 0; i < 3; i++) {
  let current = turnOrder.shift();  // キューから次のキャラ
  let action = current + "が" + actions[i];
  console.log("【ターン" + (i + 1) + "】" + action);
  actionLog.push(action);  // スタックに履歴を記録
  turnOrder.push(current);  // キューの最後に戻す
}

console.log("\n=== 行動履歴（新しい順） ===");
while (actionLog.length > 0) {
  console.log(actionLog.pop());
}
```

:::sensei
キューで{行動順|こうどうじゅん}を{管理|かんり}し、スタックで{履歴|りれき}を{管理|かんり}する。
{実際|じっさい}のゲームでもこういう{仕組|しく}みが{使|つか}われているんだよ！

さあ、チャレンジで{括弧|かっこ}チェックを{自分|じぶん}で{書|か}いてみよう！
:::
