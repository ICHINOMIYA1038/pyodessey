---
title: "イテレータとジェネレータ"
slug: "iterators-generators"
order: 20
description: "一つずつ取り出す魔法"
world: "castle"
challenge:
  description: "range(1, 5) ジェネレータを作って [...range(1, 5)] を表示しよう！"
  starterCode: "// range ジェネレータを作ろう\n\n// console.log([...range(1, 5)].join(\",\"));\n"
  expectedOutput: "1,2,3,4,5"
  hints:
    - "function* range(start, end) { ... } でジェネレータ関数を作ろう"
    - "for ループで start から end まで yield しよう"
    - "while (start <= end) { yield start; start++; } でもOK"
    - "[...range(1, 5)] でジェネレータを配列に変換できるよ"
---

# イテレータとジェネレータ

:::sensei
{城|しろ}の{最深部|さいしんぶ}に{来|き}たね。ここでは{特別|とくべつ}な{魔法|まほう}を{教|おし}えるよ。
「{値|あたい}を1つずつ{取|と}り{出|だ}す」{仕組|しく}み、**イテレータ**と**ジェネレータ**だ！
:::

:::student
1つずつ{取|と}り{出|だ}す？{配列|はいれつ}の `for...of` みたいなこと？
:::

:::sensei
まさにそう！`for...of` が{裏|うら}で{使|つか}っているのがイテレータなんだ。
そして**ジェネレータ**を{使|つか}うと、{自分|じぶん}だけのイテレータを{簡単|かんたん}に{作|つく}れるよ！
:::

## イテレータとは

イテレータは「`next()` を{呼|よ}ぶと{次|つぎ}の{値|あたい}を{返|かえ}す」オブジェクトだよ。

```javascript runnable
// 配列からイテレータを手動で取得
let monsters = ["スライム", "ゴブリン", "ドラゴン"];
let iterator = monsters[Symbol.iterator]();

// next() で1つずつ取り出す
console.log(iterator.next()); // { value: "スライム", done: false }
console.log(iterator.next()); // { value: "ゴブリン", done: false }
console.log(iterator.next()); // { value: "ドラゴン", done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

:::hint
`next()` は `{ value, done }` という{形|かたち}のオブジェクトを{返|かえ}すよ。
`done` が `true` になったら、もう{取|と}り{出|だ}す{値|あたい}がないということ！
:::

## {自作|じさく}イテレータ

`Symbol.iterator` メソッドを{持|も}つオブジェクトを{作|つく}ると、`for...of` で{使|つか}えるようになるよ。

```javascript runnable
// カウントダウンするイテレータを持つオブジェクト
let countdown = {
  from: 5,
  to: 1,

  [Symbol.iterator]() {
    let current = this.from;
    let last = this.to;

    return {
      next() {
        if (current >= last) {
          return { value: current--, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// for...of で使える！
for (let num of countdown) {
  console.log(num);
}

// スプレッド構文でも使える
console.log([...countdown]);
```

:::student
`[Symbol.iterator]` を{定義|ていぎ}すれば `for...of` が{使|つか}えるようになるんだ！
:::

:::sensei
そう！でも{毎回|まいかい}こんなに{書|か}くのは{大変|たいへん}だよね。
そこで{登場|とうじょう}するのが**ジェネレータ**だ！
:::

## ジェネレータ{関数|かんすう} — `function*` と `yield`

`function*` で{作|つく}る{特別|とくべつ}な{関数|かんすう}。`yield` で{値|あたい}を1つずつ{返|かえ}すよ。

```javascript runnable
// function* でジェネレータ関数を定義
function* countUp() {
  yield 1;
  yield 2;
  yield 3;
}

// ジェネレータオブジェクトを取得
let gen = countUp();

// next() で1つずつ取り出す
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// for...of でも使える
for (let num of countUp()) {
  console.log("値:", num);
}

// スプレッドでも配列にできる
console.log([...countUp()]);
```

:::hint
`function*` の `*`（アスタリスク）がジェネレータの{印|しるし}だよ。
`yield` は「ここで{一時停止|いちじていし}して{値|あたい}を{返|かえ}す」という{意味|いみ}。
{次|つぎ}に `next()` が{呼|よ}ばれると、`yield` の{次|つぎ}の{行|ぎょう}から{再開|さいかい}するんだ！
:::

## ジェネレータでループ

`yield` はループの{中|なか}でも{使|つか}えるよ。これが{本当|ほんとう}に{便利|べんり}！

```javascript runnable
// 範囲を生成するジェネレータ
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

console.log([...range(1, 5)]);   // [1, 2, 3, 4, 5]
console.log([...range(10, 15)]); // [10, 11, 12, 13, 14, 15]

// for...of で使う
for (let n of range(3, 7)) {
  console.log("冒険" + n + "日目");
}
```

:::student
わー！`range` が{自分|じぶん}で{作|つく}れた！Pythonの `range` みたい！
:::

## {無限|むげん}シーケンス

ジェネレータは**{必要|ひつよう}なときに{必要|ひつよう}な{分|ぶん}だけ**{生成|せいせい}するから、{無限|むげん}のシーケンスも{作|つく}れるよ。

```javascript runnable
// 無限に数を生成（使うときに制限をかける）
function* naturalNumbers() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

// 最初の5個だけ取り出す
let gen = naturalNumbers();
for (let i = 0; i < 5; i++) {
  console.log(gen.next().value);
}

// フィボナッチ数列
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// 最初の10個
let fib = fibonacci();
let result = [];
for (let i = 0; i < 10; i++) {
  result.push(fib.next().value);
}
console.log(result.join(", "));
```

:::sensei
`while (true)` で{無限|むげん}ループだけど、`yield` があるから{大丈夫|だいじょうぶ}！
`next()` が{呼|よ}ばれるまで{停止|ていし}しているから、メモリも{使|つか}わないんだ。
これを**{遅延評価|ちえんひょうか}**（lazy evaluation）というよ。
:::

:::hint
{無限|むげん}ジェネレータを `[...generator()]` で{展開|てんかい}すると{無限|むげん}ループになるから{注意|ちゅうい}！
{必|かなら}ず `next()` で{必要|ひつよう}な{分|ぶん}だけ{取|と}り{出|だ}すか、{制限|せいげん}をつけよう。
:::

## {実用的|じつようてき}なジェネレータ — IDジェネレータ

ゲームでユニークなIDを{生成|せいせい}するのにジェネレータが{活躍|かつやく}するよ。

```javascript runnable
// ユニークID生成器
function* idGenerator(prefix) {
  let id = 1;
  while (true) {
    yield `${prefix}-${String(id).padStart(4, "0")}`;
    id++;
  }
}

let monsterIds = idGenerator("MON");
let itemIds = idGenerator("ITEM");

console.log(monsterIds.next().value); // MON-0001
console.log(monsterIds.next().value); // MON-0002
console.log(itemIds.next().value);    // ITEM-0001
console.log(monsterIds.next().value); // MON-0003
console.log(itemIds.next().value);    // ITEM-0002

// それぞれ独立してカウントが進む！
```

:::student
モンスターとアイテムで{別々|べつべつ}のID{番号|ばんごう}が{進|すす}んでいくんだ！
:::

## ジェネレータで{自作|じさく}イテラブル

ジェネレータを{使|つか}うと、`Symbol.iterator` を{簡単|かんたん}に{実装|じっそう}できるよ。

```javascript runnable
// パーティクラス
class Party {
  constructor() {
    this.members = [];
  }

  add(name, role) {
    this.members.push({ name, role });
  }

  // ジェネレータでイテレータを実装
  *[Symbol.iterator]() {
    for (let member of this.members) {
      yield `${member.name}（${member.role}）`;
    }
  }
}

let party = new Party();
party.add("アレックス", "勇者");
party.add("メリッサ", "魔法使い");
party.add("ガレス", "戦士");

// for...of が使える！
for (let member of party) {
  console.log(member);
}

// スプレッドも使える
console.log([...party].join(" / "));
```

:::sensei
`*[Symbol.iterator]()` でジェネレータをイテレータとして{使|つか}えるんだ。
{手動|しゅどう}で `next()` を{書|か}くよりずっと{簡単|かんたん}だね！
:::

## {便利|べんり}なジェネレータユーティリティ

ジェネレータを{組|く}み{合|あ}わせて{便利|べんり}なツールを{作|つく}ろう。

```javascript runnable
// take: 最初のn個を取り出す
function* take(n, iterable) {
  let count = 0;
  for (let item of iterable) {
    if (count >= n) return;
    yield item;
    count++;
  }
}

// 無限ジェネレータ
function* naturals() {
  let n = 1;
  while (true) yield n++;
}

// 最初の5個だけ安全に取得
console.log([...take(5, naturals())]);

// map のジェネレータ版
function* genMap(fn, iterable) {
  for (let item of iterable) {
    yield fn(item);
  }
}

// 自然数の最初の5個を2倍
let doubled = take(5, genMap(x => x * 2, naturals()));
console.log([...doubled]);

// filter のジェネレータ版
function* genFilter(fn, iterable) {
  for (let item of iterable) {
    if (fn(item)) yield item;
  }
}

// 最初の5個の偶数
let evens = take(5, genFilter(x => x % 2 === 0, naturals()));
console.log([...evens]);
```

:::hint
ジェネレータを{組|く}み{合|あ}わせると、{無限|むげん}のデータを{必要|ひつよう}な{分|ぶん}だけ{効率|こうりつ}よく{処理|しょり}できるよ。
これが{遅延評価|ちえんひょうか}の{力|ちから}だ！
:::

## まとめ

:::sensei
{今日|きょう}の{魔法|まほう}をまとめよう！

- **イテレータ**: `next()` で{値|あたい}を1つずつ{返|かえ}すオブジェクト
- `Symbol.iterator` を{実装|じっそう}すると `for...of` で{使|つか}える
- **ジェネレータ**: `function*` と `yield` で{簡単|かんたん}にイテレータを{作|つく}れる
- `yield` で{一時停止|いちじていし}して{値|あたい}を{返|かえ}し、`next()` で{再開|さいかい}
- **{遅延評価|ちえんひょうか}**: {必要|ひつよう}なときに{必要|ひつよう}な{分|ぶん}だけ{生成|せいせい}
- {無限|むげん}シーケンスも{安全|あんぜん}に{扱|あつか}える

チャレンジで `range` ジェネレータを{作|つく}ってみよう！
:::

:::student
ジェネレータって、{魔法|まほう}のカードを1{枚|まい}ずつ{引|ひ}くみたいで{面白|おもしろ}い！
:::
