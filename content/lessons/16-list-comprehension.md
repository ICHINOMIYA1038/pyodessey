---
title: "リスト内包表記"
slug: "list-comprehension"
order: 16
description: "短く書く魔法"
world: "mountain"
challenge:
  description: "リスト内包表記を使って、1から10までの偶数のリストを作って表示しよう！"
  starterCode: "# リスト内包表記を使おう\n"
  expectedOutput: "[2, 4, 6, 8, 10]"
---

# リスト{内包表記|ないほうひょうき}

:::sensei
今日は「一行{魔法|まほう}」を学ぶよ！
何行もかかっていたコードを、
たった一行で書けるようになるんだ。
:::

:::student
一行で！？ そんな{魔法|まほう}があるの？
:::

:::sensei
「リスト{内包表記|ないほうひょうき}」っていうんだ。
まずは{普通|ふつう}のやり方と{比|くら}べてみよう！
:::

## for ループと{比|くら}べてみよう

{普通|ふつう}の for ループで{数字|すうじ}を2{倍|ばい}にするコード。

```python runnable
# 普通のやり方（3行かかる）
numbers = [1, 2, 3, 4, 5]
doubled = []
for n in numbers:
    doubled.append(n * 2)
print(f"普通: {doubled}")

# リスト内包表記（1行でできる！）
doubled2 = [n * 2 for n in numbers]
print(f"魔法: {doubled2}")
```

:::hint
リスト{内包表記|ないほうひょうき}の{形|かたち}：
`[やること for 変数 in リスト]`
これだけ！
:::

## {基本|きほん}のかたち

:::sensei
いろんな{変換|へんかん}を一行でやってみよう！
:::

```python runnable
animals = ["ネコ", "イヌ", "ウサギ", "パンダ"]

# それぞれに「さん」をつける
with_san = [a + "さん" for a in animals]
print(with_san)

# 文字の長さを調べる
lengths = [len(a) for a in animals]
print(f"文字数: {lengths}")

# 1〜10の数字をつくる
numbers = [i for i in range(1, 11)]
print(f"1〜10: {numbers}")

# 九九の5の段
gonodan = [5 * i for i in range(1, 10)]
print(f"5の段: {gonodan}")
```

:::student
ほんとだ！ 一行でリストが作れちゃう！
:::

## {条件|じょうけん}つき（if をつける）

:::sensei
「{条件|じょうけん}に合うものだけ」選ぶこともできるよ。
うしろに `if` をつけるだけ！
:::

```python runnable
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 偶数だけ選ぶ
even = [n for n in numbers if n % 2 == 0]
print(f"偶数: {even}")

# 3より大きい数を2倍にする
big_doubled = [n * 2 for n in numbers if n > 3]
print(f"3より大きい数の2倍: {big_doubled}")

# お菓子の中から「チョコ」がつくものだけ選ぶ
okashi = ["チョコケーキ", "グミ", "チョコパイ", "クッキー", "チョコアイス"]
choco = [o for o in okashi if "チョコ" in o]
print(f"チョコ系: {choco}")
```

:::hint
{条件|じょうけん}つきの{形|かたち}：
`[やること for 変数 in リスト if 条件]`
`if` のあとに{条件|じょうけん}を書くだけ！
:::

## for ループとの{比較|ひかく}

:::student
for ループと{内包表記|ないほうひょうき}、
どっちを使えばいいの？
:::

:::sensei
かんたんな{処理|しょり}なら{内包表記|ないほうひょうき}、
{複雑|ふくざつ}な{処理|しょり}なら for ループがいいよ。
{比|くら}べてみよう！
:::

```python runnable
scores = [45, 82, 67, 91, 38, 75, 55, 88]

# --- for ループ版 ---
passed = []
for s in scores:
    if s >= 60:
        passed.append(f"{s}点:合格")
print(f"ループ版: {passed}")

# --- 内包表記版 ---
passed2 = [f"{s}点:合格" for s in scores if s >= 60]
print(f"内包表記: {passed2}")

# どちらも同じ結果！
print(f"同じ？ {passed == passed2}")
```

## {辞書|じしょ}{内包表記|ないほうひょうき}

:::sensei
リストだけじゃなく、
{辞書|じしょ}も一行で作れるよ！
:::

```python runnable
# 動物の名前と文字数の辞書をつくる
animals = ["ネコ", "ウサギ", "カピバラ", "ゾウ"]
name_length = {a: len(a) for a in animals}
print(f"名前の長さ: {name_length}")

# 九九の表を辞書で作る
kuku = {f"{i}x{j}": i * j for i in range(1, 4) for j in range(1, 4)}
print(f"九九: {kuku}")

# 点数を合格/不合格に変換
scores = {"太郎": 85, "花子": 45, "次郎": 72}
result = {name: "合格" if s >= 60 else "不合格" for name, s in scores.items()}
print(f"結果: {result}")
```

:::hint
{辞書|じしょ}{内包表記|ないほうひょうき}の{形|かたち}：
`{キー: 値 for 変数 in リスト}`
`[]` のかわりに `{}` を使うよ！
:::

## ネストした{内包表記|ないほうひょうき}

:::student
もっと{複雑|ふくざつ}なこともできるの？
:::

:::sensei
for を2つ{重|かさ}ねることもできるよ。
でも、{読|よ}みにくくなるから気をつけてね！
:::

```python runnable
# 2つのリストのすべての組み合わせ
colors = ["赤", "青"]
items = ["帽子", "マント"]

combos = [f"{c}の{i}" for c in colors for i in items]
print(f"組み合わせ: {combos}")

# 2次元リストを1次元にする（平坦化）
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [n for row in matrix for n in row]
print(f"平坦化: {flat}")
```

:::hint
ネストした{内包表記|ないほうひょうき}が{読|よ}みにくいときは、
{無理|むり}せず for ループで書こう。
{読|よ}みやすさが一番大事！
:::

## やってみよう

自分でリスト{内包表記|ないほうひょうき}を使ってみよう！

```python runnable
# チャレンジ: 1〜20の中から、3の倍数を集めて「○は3の倍数」という文にしよう
multiples = [f"{n}は3の倍数" for n in range(1, 21) if n % 3 == 0]
for m in multiples:
    print(m)
```

## まとめ

- **リスト{内包表記|ないほうひょうき}**：`[やること for x in リスト]`
- **{条件|じょうけん}つき**：`[やること for x in リスト if 条件]`
- **{辞書|じしょ}版**：`{キー: 値 for x in リスト}`
- かんたんな{処理|しょり}なら一行で書ける{魔法|まほう}！
- {複雑|ふくざつ}なときは for ループの方が{読|よ}みやすい
