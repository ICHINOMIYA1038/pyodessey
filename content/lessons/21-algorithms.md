---
title: "アルゴリズム"
slug: "algorithms"
order: 21
description: "問題の解き方"
world: "castle"
challenge:
  description: "リスト [5, 3, 8, 1, 9, 2] をバブルソートで並べ替えて表示しよう！（sort()は使わないで）"
  starterCode: "nums = [5, 3, 8, 1, 9, 2]\n# バブルソートを実装しよう\n"
  expectedOutput: "[1, 2, 3, 5, 8, 9]"
---

# アルゴリズム

:::sensei
今日は「アルゴリズム」を学ぶよ。
{問題|もんだい}を{効率|こうりつ}よく{解|と}く「{作戦|さくせん}」のことだ！
:::

:::student
{作戦|さくせん}？ ゲームの{攻略法|こうりゃくほう}みたいな？
:::

:::sensei
まさにそう！
クエストをクリアする{最|もっと}もいい方法を
{考|かんが}えるのがアルゴリズムだよ。
:::

## アルゴリズムってなに？

アルゴリズムは「{問題|もんだい}を{解|と}くための{手順|てじゅん}」のこと。
同じ{問題|もんだい}でも、いい{作戦|さくせん}と悪い{作戦|さくせん}がある。

```python runnable
# 1から100までの合計を出す

# 作戦A: 1つずつ足す（ふつうのやり方）
total = 0
for i in range(1, 101):
    total += i
print(f"作戦A: {total}")

# 作戦B: 数学の公式を使う（かしこいやり方）
n = 100
total2 = n * (n + 1) // 2
print(f"作戦B: {total2}")

# どちらも同じ答え！でも作戦Bの方が速い
print(f"同じ？ {total == total2}")
```

:::hint
アルゴリズムは「答えを出す{手順|てじゅん}」。
同じ答えでも、速いやり方と遅いやり方がある。
速いやり方を{考|かんが}えるのがプログラマーの{腕|うで}の見せどころ！
:::

## {線形探索|せんけいたんさく}：1つずつ{探|さが}す

:::sensei
まずは{一番|いちばん}かんたんな{探|さが}し方。
「{線形探索|せんけいたんさく}」は、{最初|さいしょ}から{順番|じゅんばん}に
1つずつ{調|しら}べていく{方法|ほうほう}だよ。
:::

```python runnable
def linear_search(items, target):
    """先頭から順番に探す"""
    for i, item in enumerate(items):
        if item == target:
            return i  # 見つかった！
    return -1  # 見つからなかった

# 宝箱の中から「ダイヤモンド」を探す
treasures = ["コイン", "ルビー", "エメラルド", "ダイヤモンド", "サファイア"]

result = linear_search(treasures, "ダイヤモンド")
print(f"ダイヤモンドは {result} 番目にあった！")

result = linear_search(treasures, "金のリンゴ")
print(f"金のリンゴ: {result}（-1 は見つからなかった）")
```

:::student
{順番|じゅんばん}に見ていくから、わかりやすい！
:::

## {二分探索|にぶんたんさく}：なかばで{分|わ}ける

:::sensei
もっと速い{探|さが}し方があるよ。
「{二分探索|にぶんたんさく}」は、{並|なら}んでいるデータの
{真|ま}ん{中|なか}を見て、{半分|はんぶん}ずつ{絞|しぼ}っていくんだ。
:::

:::student
数当てゲームみたいだね！
「もっと大きい」「もっと小さい」って{言|い}うやつ。
:::

```python runnable
def binary_search(items, target):
    """真ん中を見て半分に絞る（データは並んでいる必要あり）"""
    left = 0
    right = len(items) - 1
    steps = 0

    while left <= right:
        steps += 1
        mid = (left + right) // 2
        print(f"  ステップ{steps}: 位置{mid}の値は {items[mid]}")

        if items[mid] == target:
            print(f"  → 見つけた！ {steps}回で発見！")
            return mid
        elif items[mid] < target:
            left = mid + 1  # 右半分を探す
        else:
            right = mid - 1  # 左半分を探す

    return -1

# 1〜100の中から77を探す
numbers = list(range(1, 101))
print("77を探すよ:")
binary_search(numbers, 77)
```

:::hint
{二分探索|にぶんたんさく}は{毎回|まいかい}{半分|はんぶん}に{絞|しぼ}るから、
100{個|こ}のデータでも7回くらいで見つかる。
でもデータが{並|なら}んでないと使えないよ！
:::

## {探索|たんさく}の{速|はや}さを{比|くら}べよう

```python runnable
import math

def linear_search_count(items, target):
    """線形探索（何回調べたか数える）"""
    for i, item in enumerate(items):
        if item == target:
            return i + 1  # 調べた回数
    return len(items)

def binary_search_count(items, target):
    """二分探索（何回調べたか数える）"""
    left, right, steps = 0, len(items) - 1, 0
    while left <= right:
        steps += 1
        mid = (left + right) // 2
        if items[mid] == target:
            return steps
        elif items[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return steps

# データサイズを変えて比べる
for n in [10, 100, 1000, 10000]:
    data = list(range(n))
    target = n - 1  # 最後の要素を探す

    linear = linear_search_count(data, target)
    binary = binary_search_count(data, target)

    print(f"データ{n:>5}個: 線形={linear:>5}回  二分={binary:>2}回")
```

:::student
データが{多|おお}いほど、{差|さ}がすごいことになるね！
:::

## バブルソート：{並|なら}べ{替|か}え

:::sensei
次は「ソート（{並|なら}べ{替|か}え）」を学ぼう。
バブルソートは、{隣同士|となりどうし}を{比|くら}べて
{入|い}れ{替|か}えていく{方法|ほうほう}だよ。
:::

```python runnable
def bubble_sort(items):
    """隣同士を比べて入れ替える"""
    arr = items.copy()
    n = len(arr)

    for i in range(n):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                # 隣同士を入れ替え！
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
        print(f"  {i+1}回目: {arr}")

    return arr

# モンスターのレベルを並べ替えよう
levels = [5, 3, 8, 1, 9, 2, 7]
print(f"元の順番: {levels}")
print("並べ替え中...")
result = bubble_sort(levels)
print(f"完成: {result}")
```

:::hint
バブルソートでは、大きい{値|あたい}が{泡|あわ}（バブル）のように
上に浮かんでいくんだ。
かんたんだけど、データが{多|おお}いと遅くなるよ。
:::

## {再帰|さいき}：自分で自分を呼ぶ

:::sensei
「{再帰|さいき}」は、{関数|かんすう}が自分自身を呼ぶテクニックだよ。
マトリョーシカ{人形|にんぎょう}みたいに、
中にどんどん小さい{問題|もんだい}が入っているイメージだ！
:::

```python runnable
# 階乗: 5! = 5 × 4 × 3 × 2 × 1
def factorial(n):
    if n <= 1:
        return 1  # ここで止まる！
    return n * factorial(n - 1)  # 自分を呼ぶ

print(f"5! = {factorial(5)}")
print(f"3! = {factorial(3)}")
print(f"10! = {factorial(10)}")

# フィボナッチ数列: 前の2つを足す
# 1, 1, 2, 3, 5, 8, 13, 21...
def fibonacci(n):
    if n <= 2:
        return 1  # 最初の2つは1
    return fibonacci(n - 1) + fibonacci(n - 2)

print("\nフィボナッチ数列:")
for i in range(1, 11):
    print(f"  {i}番目: {fibonacci(i)}")
```

:::hint
{再帰|さいき}には「{止|と}まる{条件|じょうけん}」が{絶対|ぜったい}に{必要|ひつよう}！
`if n <= 1: return 1` がないと、{永遠|えいえん}に自分を呼び{続|つづ}けてしまうよ。
:::

## Big O：{速|はや}さの{目安|めやす}

:::sensei
アルゴリズムの{速|はや}さを{表|あらわ}す「Big O」を{紹介|しょうかい}するよ。
データが{増|ふ}えたとき、どれくらい{時間|じかん}がかかるかの{目安|めやす}だ。
:::

:::student
ゲームでいう{難易度|なんいど}みたいなもの？
:::

```python runnable
# O(1): データがいくら増えても同じ速さ ★一番速い
def get_first(items):
    return items[0]

# O(n): データの数だけ時間がかかる
def find_max(items):
    biggest = items[0]
    for item in items:
        if item > biggest:
            biggest = item
    return biggest

# O(n²): データの数の「2乗」の時間がかかる ★遅い
def has_duplicate(items):
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            if items[i] == items[j]:
                return True
    return False

data = [3, 1, 4, 1, 5, 9, 2, 6, 5]
print(f"最初の要素: {get_first(data)}")
print(f"最大値: {find_max(data)}")
print(f"重複あり？ {has_duplicate(data)}")

# データ量と処理回数の比較
print("\n--- 速さの目安 ---")
for n in [10, 100, 1000]:
    print(f"データ{n}個: O(1)={1}回  O(n)={n}回  O(n²)={n*n}回")
```

:::hint
{速|はや}い順に並べると:
**O(1)** > **O(log n)** > **O(n)** > **O(n log n)** > **O(n²)**
{二分探索|にぶんたんさく}は O(log n)、バブルソートは O(n²) だよ。
:::

## やってみよう

学んだアルゴリズムを{使|つか}ってクエストをクリアしよう！

```python runnable
# クエスト: ダンジョンの部屋から宝物を見つけよう

rooms = list(range(1, 51))  # 50部屋のダンジョン
treasure_room = 37          # 宝物は37番目の部屋

# 線形探索で探す
steps_linear = 0
for room in rooms:
    steps_linear += 1
    if room == treasure_room:
        break
print(f"線形探索: {steps_linear}回で発見")

# 二分探索で探す
left, right = 0, len(rooms) - 1
steps_binary = 0
while left <= right:
    steps_binary += 1
    mid = (left + right) // 2
    if rooms[mid] == treasure_room:
        break
    elif rooms[mid] < treasure_room:
        left = mid + 1
    else:
        right = mid - 1
print(f"二分探索: {steps_binary}回で発見")

print(f"\n二分探索は {steps_linear - steps_binary}回も少ない！")
print("賢い作戦を使えば、冒険はもっと楽になるね！")
```

## まとめ

- **アルゴリズム**：{問題|もんだい}を{解|と}くための{作戦|さくせん}
- {線形探索|せんけいたんさく}：{順番|じゅんばん}に{探|さが}す（O(n)）
- {二分探索|にぶんたんさく}：{半分|はんぶん}に{絞|しぼ}って{探|さが}す（O(log n)）
- **バブルソート**：{隣同士|となりどうし}を{比|くら}べて{並|なら}べる（O(n²)）
- {再帰|さいき}：{関数|かんすう}が自分を呼ぶテクニック
- **Big O**：アルゴリズムの{速|はや}さの{目安|めやす}
- いい{作戦|さくせん}を{選|えら}べば、{問題|もんだい}は速く{解|と}ける！
