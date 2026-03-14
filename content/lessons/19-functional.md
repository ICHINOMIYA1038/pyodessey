---
title: "関数型プログラミング"
slug: "functional"
order: 19
description: "別の考え方"
world: "castle"
challenge:
  description: "map と lambda を使って [1, 2, 3, 4, 5] の各要素を2乗したリストを作って表示しよう！"
  starterCode: "nums = [1, 2, 3, 4, 5]\n# mapとlambdaを使おう\n"
  expectedOutput: "[1, 4, 9, 16, 25]"
---

# {関数型|かんすうがた}プログラミング

:::sensei
今日は「{関数型|かんすうがた}プログラミング」を学ぶよ。
工場のベルトコンベアみたいに、
データを次々と{変換|へんかん}していく{考|かんが}え方だ！
:::

:::student
ベルトコンベア？ 工場みたいに？
:::

:::sensei
そう！ {材料|ざいりょう}がベルトコンベアに{乗|の}って、
{各|かく}ステーションで{加工|かこう}されていく。
それと同じことをデータでやるんだ！
:::

## map() で{変換|へんかん}する

`map()` は、リストの{全|すべ}ての{要素|ようそ}に
同じ{処理|しょり}をする{関数|かんすう}だよ。

```python runnable
# 全部の数字を2倍にする
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))
print(f"2倍: {doubled}")

# 全部の名前に「さん」をつける
names = ["タロウ", "ハナコ", "ジロウ"]
with_san = list(map(lambda n: n + "さん", names))
print(f"さん付け: {with_san}")

# 全部の文字を大文字にする
words = ["hello", "world", "python"]
upper = list(map(str.upper, words))
print(f"大文字: {upper}")
```

:::hint
`map(関数, リスト)` は
「リストの{全部|ぜんぶ}に、この{関数|かんすう}を使ってね」
という{意味|いみ}。
`lambda` は「名前のない小さな{関数|かんすう}」だよ！
:::

## filter() で{選|えら}ぶ

:::sensei
`filter()` は、{条件|じょうけん}に合うものだけ{選|えら}ぶよ。
ベルトコンベアの{検品|けんぴん}ステーションだ！
:::

```python runnable
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 偶数だけ選ぶ
even = list(filter(lambda x: x % 2 == 0, numbers))
print(f"偶数: {even}")

# 5より大きい数だけ選ぶ
big = list(filter(lambda x: x > 5, numbers))
print(f"5より大きい: {big}")

# 長い名前だけ選ぶ
animals = ["ネコ", "カピバラ", "イヌ", "ゾウ", "ウサギ"]
long_names = list(filter(lambda a: len(a) >= 3, animals))
print(f"3文字以上: {long_names}")
```

:::student
map は「{全部|ぜんぶ}{変換|へんかん}」、
filter は「{条件|じょうけん}で{選|えら}ぶ」だね！
:::

## sorted() で{並|なら}べ{替|か}える

:::sensei
`sorted()` に `key` を{渡|わた}すと、
好きな{基準|きじゅん}で{並|なら}べ{替|か}えられるよ！
:::

```python runnable
# 文字数が短い順に並べる
animals = ["カピバラ", "ネコ", "ウサギ", "ゾウ"]
by_length = sorted(animals, key=lambda a: len(a))
print(f"短い順: {by_length}")

# 点数が高い順に並べる
students = [
    {"name": "タロウ", "score": 85},
    {"name": "ハナコ", "score": 92},
    {"name": "ジロウ", "score": 78},
]
by_score = sorted(students, key=lambda s: s["score"], reverse=True)
for s in by_score:
    print(f"  {s['name']}: {s['score']}点")

# 最後の文字でソート
words = ["banana", "apple", "cherry"]
by_last = sorted(words, key=lambda w: w[-1])
print(f"最後の文字順: {by_last}")
```

:::hint
`key=lambda x: ...` で「何を{基準|きじゅん}に{並|なら}べるか」を{決|き}める。
`reverse=True` をつけると{逆順|ぎゃくじゅん}になるよ！
:::

## reduce() でまとめる

:::sensei
`reduce()` は、リストの{要素|ようそ}を
順番にまとめて1つの{値|あたい}にするよ。
ベルトコンベアの{最後|さいご}の{合体|がったい}ステーションだ！
:::

```python runnable
from functools import reduce

# 全部たす
numbers = [1, 2, 3, 4, 5]
total = reduce(lambda a, b: a + b, numbers)
print(f"合計: {total}")

# 全部かける
product = reduce(lambda a, b: a * b, numbers)
print(f"かけ算: {product}")

# 文字をつなげる
words = ["Python", "は", "たのしい", "！"]
sentence = reduce(lambda a, b: a + b, words)
print(f"文: {sentence}")

# 最大値をさがす
nums = [3, 7, 2, 9, 1, 8]
biggest = reduce(lambda a, b: a if a > b else b, nums)
print(f"最大: {biggest}")
```

:::hint
`reduce(関数, リスト)` は
「{最初|さいしょ}の2つを{処理|しょり}して、
その{結果|けっか}と次の{要素|ようそ}を{処理|しょり}して...」
と{順番|じゅんばん}にまとめていくよ。
:::

## lambda と組み合わせる

:::student
lambda ってよく出てくるけど、
何だっけ？
:::

:::sensei
lambda は「{使|つか}い{捨|す}ての小さな{関数|かんすう}」だよ。
map や filter と{組|く}み合わせるとすごく{便利|べんり}なんだ！
:::

```python runnable
# お菓子の値段リスト
okashi = [
    {"name": "チョコ", "price": 100},
    {"name": "グミ", "price": 50},
    {"name": "ポテチ", "price": 150},
    {"name": "アメ", "price": 30},
    {"name": "クッキー", "price": 200},
]

# 100円以下のお菓子を選んで、名前だけ取り出す
cheap_names = list(
    map(
        lambda o: o["name"],
        filter(lambda o: o["price"] <= 100, okashi)
    )
)
print(f"100円以下: {cheap_names}")

# 全部のお菓子を10%引きにする
sale = list(map(lambda o: {
    "name": o["name"],
    "price": int(o["price"] * 0.9)
}, okashi))
for item in sale:
    print(f"  {item['name']}: {item['price']}円")
```

## {処理|しょり}をつなげる

:::sensei
map、filter、sorted をつなげると、
ベルトコンベアみたいに{処理|しょり}が{流|なが}れていくよ！
:::

```python runnable
# モンスターデータ
monsters = [
    {"name": "スライム", "hp": 30, "attack": 10},
    {"name": "ドラゴン", "hp": 200, "attack": 80},
    {"name": "ゴブリン", "hp": 50, "attack": 25},
    {"name": "フェニックス", "hp": 150, "attack": 60},
    {"name": "コウモリ", "hp": 20, "attack": 5},
]

# ステップ1: HPが50以上のモンスターを選ぶ
strong = list(filter(lambda m: m["hp"] >= 50, monsters))

# ステップ2: 攻撃力が高い順に並べる
ranked = sorted(strong, key=lambda m: m["attack"], reverse=True)

# ステップ3: 名前と攻撃力だけ取り出す
result = list(map(lambda m: f"{m['name']}(攻撃力{m['attack']})", ranked))

print("強いモンスターランキング:")
for i, r in enumerate(result, 1):
    print(f"  {i}位: {r}")
```

:::student
フィルター → ソート → 変換、
って{順番|じゅんばん}に{流|なが}れていくんだね！
:::

## やってみよう

{関数型|かんすうがた}プログラミングで{冒険者|ぼうけんしゃ}パーティを{整理|せいり}しよう！

```python runnable
from functools import reduce

party = [
    {"name": "戦士タロウ", "level": 15, "hp": 200},
    {"name": "魔法使いハナコ", "level": 20, "hp": 120},
    {"name": "僧侶ジロウ", "level": 12, "hp": 150},
    {"name": "盗賊サクラ", "level": 18, "hp": 100},
]

# レベル15以上のメンバーだけ選ぶ
elite = list(filter(lambda m: m["level"] >= 15, party))
print("エリートメンバー:")
for m in elite:
    print(f"  {m['name']} (Lv.{m['level']})")

# パーティの合計HPを計算
total_hp = reduce(lambda a, b: a + b["hp"], party, 0)
print(f"\nパーティの合計HP: {total_hp}")

# レベル順にソート
by_level = sorted(party, key=lambda m: m["level"], reverse=True)
print("\nレベルランキング:")
for i, m in enumerate(by_level, 1):
    print(f"  {i}位: {m['name']} (Lv.{m['level']})")
```

## まとめ

- **`map()`**：全{要素|ようそ}を{変換|へんかん}する（{加工|かこう}ステーション）
- **`filter()`**：{条件|じょうけん}で{選|えら}ぶ（{検品|けんぴん}ステーション）
- **`sorted()`**：key で好きな{基準|きじゅん}で{並|なら}べる
- **`reduce()`**：全{要素|ようそ}を1つにまとめる（{合体|がったい}ステーション）
- **`lambda`**：{使|つか}い{捨|す}ての小さな{関数|かんすう}
- つなげて使うとベルトコンベアのように{処理|しょり}が{流|なが}れる！
