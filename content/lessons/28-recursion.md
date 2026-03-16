---
title: "再帰"
slug: "recursion"
order: 28
description: "自分自身を呼ぶ魔法"
world: "sky"
challenge:
  description: "再帰関数を使って fibonacci(10) を計算し、結果を表示しよう！"
  starterCode: "def fibonacci(n):\n    # ここに再帰のコードを書こう\n    pass\n\nprint(fibonacci(10))\n"
  expectedOutput: "55"
---

# 再帰

:::sensei
今日は「{再帰|さいき}」という{魔法|まほう}を学ぶよ。
{関数|かんすう}が自分自身を呼び出す、{不思議|ふしぎ}なテクニックだ！
:::

:::student
自分で自分を呼ぶ？ なんだかめまいがしそう……
:::

:::sensei
{合|あ}わせ{鏡|かがみ}を見たことはあるかい？
{鏡|かがみ}の{中|なか}に{鏡|かがみ}が{映|うつ}って、その{中|なか}にまた{鏡|かがみ}……
{再帰|さいき}はまさにあのイメージなんだ。
ただし、どこかで「{止|と}まる」のがポイントだよ！
:::

## {再帰|さいき}ってなに？

{再帰|さいき}（リカージョン）は、{関数|かんすう}が**自分自身を呼び出す**テクニック。
マトリョーシカ{人形|にんぎょう}のように、大きい{問題|もんだい}の{中|なか}に小さい{問題|もんだい}が{入|はい}っていて、
どんどん小さくしていくイメージだよ。

```python runnable
# まずはかんたんな例：カウントダウン
def countdown(n):
    if n <= 0:
        print("発射！🚀")
        return  # ここで止まる（ベースケース）
    print(n)
    countdown(n - 1)  # 自分を呼ぶ（再帰ケース）

countdown(5)
```

:::hint
{再帰|さいき}には{必|かなら}ず2つのパーツがある：
1. **ベースケース**：{止|と}まる{条件|じょうけん}（これがないと{永遠|えいえん}にループ！）
2. **{再帰|さいき}ケース**：自分自身を呼ぶ{部分|ぶぶん}
:::

## {階乗|かいじょう}を{計算|けいさん}しよう

:::sensei
{再帰|さいき}の{定番|ていばん}、{階乗|かいじょう}（ファクトリアル）をやってみよう。
5! = 5 × 4 × 3 × 2 × 1 = 120 だよね。
これを{再帰|さいき}で{書|か}くと、とてもキレイになるんだ。
:::

```python runnable
def factorial(n):
    # ベースケース：1以下なら1を返す
    if n <= 1:
        return 1
    # 再帰ケース：n × (n-1)の階乗
    return n * factorial(n - 1)

# 動きを見てみよう
print(f"3! = {factorial(3)}")   # 3 × 2 × 1 = 6
print(f"5! = {factorial(5)}")   # 5 × 4 × 3 × 2 × 1 = 120
print(f"7! = {factorial(7)}")   # 5040
print(f"10! = {factorial(10)}") # 3628800
```

:::student
おお！ `factorial(5)` が `5 * factorial(4)` を呼んで、
`factorial(4)` が `4 * factorial(3)` を呼んで……
{最後|さいご}に `factorial(1)` で{止|と}まるんだね！
:::

## {再帰|さいき}の{流|なが}れを見てみよう

{再帰|さいき}がどう{動|うご}いているか、{実際|じっさい}に{追|お}いかけてみよう。

```python runnable
def factorial_verbose(n, depth=0):
    indent = "  " * depth  # 深さに応じてインデント
    print(f"{indent}factorial({n}) が呼ばれた")

    if n <= 1:
        print(f"{indent}→ ベースケース！ 1 を返す")
        return 1

    result = n * factorial_verbose(n - 1, depth + 1)
    print(f"{indent}→ {n} × ... = {result} を返す")
    return result

print("=== factorial(4) の動き ===")
answer = factorial_verbose(4)
print(f"\n答え: {answer}")
```

:::hint
{再帰|さいき}は「{行|い}き」と「{帰|かえ}り」の2つの{流|なが}れがある。
「{行|い}き」で{問題|もんだい}を小さくして、
「{帰|かえ}り」で{結果|けっか}を{組|く}み{立|た}てるんだ！
:::

## {再帰|さいき}で{合計|ごうけい}を{計算|けいさん}

:::sensei
リストの{合計|ごうけい}も{再帰|さいき}で{計算|けいさん}できるよ。
{雲|くも}の{階段|かいだん}を{一段|いちだん}ずつ{登|のぼ}るイメージだ。
{一段|いちだん}{登|のぼ}るたびに、{残|のこ}りの{階段|かいだん}の{合計|ごうけい}を{計算|けいさん}する。
:::

```python runnable
def recursive_sum(numbers):
    # ベースケース：リストが空なら0
    if len(numbers) == 0:
        return 0
    # 先頭 + 残りの合計
    return numbers[0] + recursive_sum(numbers[1:])

# 空の雲から順に積み上げよう
cloud_values = [10, 20, 30, 40, 50]
print(f"雲の値: {cloud_values}")
print(f"合計: {recursive_sum(cloud_values)}")

# 1から10までの合計
nums = list(range(1, 11))
print(f"\n1〜10の合計: {recursive_sum(nums)}")
```

:::student
{先頭|せんとう}を取り出して、{残|のこ}りはまた自分に{任|まか}せるんだね。
{雲|くも}を1つずつ{集|あつ}める{感|かん}じだ！
:::

## フィボナッチ{数列|すうれつ}

:::sensei
{空|そら}の{世界|せかい}にふさわしい{美|うつく}しい{数列|すうれつ}を{紹介|しょうかい}しよう。
**フィボナッチ{数列|すうれつ}**は、{前|まえ}の2つの{数|かず}を{足|た}してできる{数列|すうれつ}だ。
{自然界|しぜんかい}の{渦巻|うずま}きや{花|はな}びらの{数|かず}にも{現|あらわ}れるんだよ。
:::

```python runnable
# フィボナッチ数列: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ...
# F(1) = 1, F(2) = 1
# F(n) = F(n-1) + F(n-2)

def fibonacci(n):
    if n <= 1:
        return n
    if n == 2:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

print("フィボナッチ数列:")
for i in range(1, 11):
    print(f"  F({i}) = {fibonacci(i)}")
```

:::student
F(5) = F(4) + F(3) = 3 + 2 = 5……なるほど！
でも、F(10)を{計算|けいさん}するとき、同じものを{何度|なんど}も{計算|けいさん}してない？
:::

:::sensei
いいところに{気|き}づいたね！
{実|じつ}は{素朴|そぼく}なフィボナッチの{再帰|さいき}は{効率|こうりつ}が{悪|わる}いんだ。
でも「メモ化」というテクニックで{速|はや}くできるよ。
:::

## メモ{化|か}で{高速化|こうそくか}

```python runnable
# メモなし（遅い）
def fib_slow(n):
    if n <= 2:
        return 1
    return fib_slow(n - 1) + fib_slow(n - 2)

# メモあり（速い！）
def fib_fast(n, memo={}):
    if n <= 2:
        return 1
    if n in memo:
        return memo[n]  # 計算済みならメモを見る
    memo[n] = fib_fast(n - 1, memo) + fib_fast(n - 2, memo)
    return memo[n]

# 結果は同じ
print(f"fib_slow(10) = {fib_slow(10)}")
print(f"fib_fast(10) = {fib_fast(10)}")

# メモ化なら大きい数も一瞬
print(f"fib_fast(50) = {fib_fast(50)}")
print(f"fib_fast(100) = {fib_fast(100)}")
```

:::hint
メモ{化|か}は「一度{計算|けいさん}した{結果|けっか}を{覚|おぼ}えておく」テクニック。
{同|おな}じ{計算|けいさん}を{繰|く}り{返|かえ}さないから、{劇的|げきてき}に{速|はや}くなるよ！
:::

## {再帰|さいき}で{星|ほし}の{模様|もよう}を{描|えが}こう

:::sensei
{再帰|さいき}は{計算|けいさん}だけじゃない。
{模様|もよう}を{描|えが}くこともできるんだ。
{空|そら}の{世界|せかい}らしく、{星|ほし}の{模様|もよう}を{作|つく}ってみよう。
:::

```python runnable
# 再帰で三角形の星模様
def star_triangle(n):
    if n <= 0:
        return
    star_triangle(n - 1)   # まず小さい三角形を描く
    print("★ " * n)        # そのあと自分の行を描く

print("=== 星の三角形 ===")
star_triangle(5)

print()

# 再帰でカウントアップ＆ダウン（山型）
def star_mountain(n, current=1):
    if current > n:
        return
    print("  " * (n - current) + "★ " * current)
    star_mountain(n, current + 1)
    print("  " * (n - current) + "★ " * current)

print("=== 星の山 ===")
star_mountain(4)
```

## {再帰|さいき}の{注意点|ちゅういてん}

:::sensei
{再帰|さいき}はパワフルだけど、{気|き}をつけることがあるよ。
:::

```python runnable
# 注意1: ベースケースを忘れると無限ループ！
# （これは動かさないでね）
# def bad_recursion(n):
#     return bad_recursion(n - 1)  # 止まらない！

# 注意2: Pythonの再帰の深さには限界がある
import sys
print(f"再帰の深さの上限: {sys.getrecursionlimit()}")

# 注意3: 再帰は繰り返しに書き換えられる
def factorial_loop(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)

# 結果は同じ
print(f"ループ版: {factorial_loop(10)}")
print(f"再帰版: {factorial_recursive(10)}")
print("どちらを使うかは場面による！")
```

:::hint
{再帰|さいき}が{向|む}いている{場面|ばめん}：
- {木構造|きこうぞう}のたどり（次のレッスンで学ぶよ！）
- {分割統治|ぶんかつとうち}（{問題|もんだい}を{半分|はんぶん}に{分|わ}ける）
- {数学的|すうがくてき}な{定義|ていぎ}がそのまま{再帰|さいき}になるとき
:::

## やってみよう

{再帰|さいき}の{魔法|まほう}を{使|つか}って、フィボナッチ{数列|すうれつ}の10{番目|ばんめ}を{計算|けいさん}しよう！

```python runnable
# 練習: fibonacci(10) を再帰で計算しよう
def fibonacci(n):
    if n <= 1:
        return n
    if n == 2:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

result = fibonacci(10)
print(result)  # 55 になるはず！
```

## まとめ

- **{再帰|さいき}**：{関数|かんすう}が自分自身を呼ぶテクニック
- **ベースケース**：{再帰|さいき}を{止|と}める{条件|じょうけん}（{絶対|ぜったい}{必要|ひつよう}！）
- **{再帰|さいき}ケース**：{問題|もんだい}を小さくして自分を呼ぶ
- **{階乗|かいじょう}**：`n! = n × (n-1)!`
- **フィボナッチ**：`F(n) = F(n-1) + F(n-2)`
- **メモ{化|か}**：{計算|けいさん}{結果|けっか}を{覚|おぼ}えて{高速化|こうそくか}
- {再帰|さいき}は{合|あ}わせ{鏡|かがみ}のように、{問題|もんだい}を{映|うつ}し{続|つづ}ける{魔法|まほう}だ！
