---
title: "文字列操作"
slug: "string-operations"
order: 6
description: "言葉で遊ぼう"
world: "town"
challenge:
  description: "\"hello world\" を大文字に変換して表示しよう！"
  starterCode: "text = \"hello world\"\n# 大文字にして表示しよう\n"
  expectedOutput: "HELLO WORLD"
---

# {文字列操作|もじれつそうさ}

:::sensei
今日は{文字列|もじれつ}をいろいろ変えたり、
調べたりする方法を学ぶよ！
{暗号|あんごう}を作ったり、
言葉あそびをしてみよう。
:::

:::student
{暗号|あんごう}！？
スパイみたい！
:::

## 大文字と小文字を変えよう

`upper()` で大文字に、`lower()` で小文字にできるよ。

```python runnable
aisatsu = "Hello, World!"

# 全部大文字に
print(aisatsu.upper())

# 全部小文字に
print(aisatsu.lower())

# 暗号っぽく大文字にしてみよう
himitsuno_message = "tasuketekure"
print(f"暗号: {himitsuno_message.upper()}")
```

:::hint
`upper()` は「上」、`lower()` は「下」という{意味|いみ}。
大文字は上、小文字は下と覚えよう！
:::

## {文字|もじ}を置きかえよう

:::sensei
`replace()` を使うと、
{文字|もじ}を別の{文字|もじ}に置きかえられるよ！
:::

```python runnable
message = "りんごが好き"

# 「りんご」を「バナナ」に置きかえ
new_message = message.replace("りんご", "バナナ")
print(new_message)

# 暗号を作ろう！「あ」を「★」に変える
himitsu = "あいうえお あいうえお"
angou = himitsu.replace("あ", "★")
print(f"暗号: {angou}")

# 複数回の置きかえ
kotoba = "ねこねこねこ"
print(kotoba.replace("ねこ", "いぬ"))
```

## {文字列|もじれつ}を分けよう

:::student
長い{文字|もじ}をバラバラにしたい！
:::

:::sensei
`split()` を使えば、
{文字列|もじれつ}をリストに分けられるよ！
:::

```python runnable
# スペースで分ける
bun = "りんご バナナ ぶどう もも"
fruits = bun.split()
print(fruits)

# 好きな文字で分ける
data = "タロウ:10:勇者"
info = data.split(":")
print(info)
print(f"名前: {info[0]}")
print(f"レベル: {info[1]}")
print(f"職業: {info[2]}")
```

## リストを{文字列|もじれつ}にまとめよう

`join()` は `split()` の反対。
リストをひとつの{文字列|もじれつ}にまとめるよ。

```python runnable
words = ["Python", "は", "楽しい"]

# スペースでつなげる
bun = " ".join(words)
print(bun)

# 「→」でつなげる
items = ["村", "森", "洞窟", "城"]
michi = " → ".join(items)
print(f"冒険の道: {michi}")

# 改行でつなげる
lines = ["1行目", "2行目", "3行目"]
print("\n".join(lines))
```

## {文字|もじ}を{探|さが}そう

:::sensei
{文字列|もじれつ}の中から{文字|もじ}を{探|さが}す方法もあるよ！
:::

```python runnable
message = "むかしむかし あるところに おじいさんとおばあさんが"

# find: 文字の位置を探す（なかったら-1）
pos = message.find("おじいさん")
print(f"「おじいさん」の位置: {pos}")

pos2 = message.find("ドラゴン")
print(f"「ドラゴン」の位置: {pos2}")  # -1 = みつからない

# count: 何回出てくるか数える
kaisu = message.count("むかし")
print(f"「むかし」の回数: {kaisu}")
```

## {文字列|もじれつ}を切り出そう（スライス）

:::student
{文字列|もじれつ}の一部だけ取り出せるの？
:::

:::sensei
リストと同じように、
スライスで切り出せるよ！
:::

```python runnable
kotoba = "プログラミング"

# 最初の3文字
print(f"最初の3文字: {kotoba[:3]}")

# 4文字目から最後まで
print(f"4文字目から: {kotoba[3:]}")

# 後ろから3文字
print(f"後ろ3文字: {kotoba[-3:]}")

# 逆にする！
print(f"逆: {kotoba[::-1]}")
```

## エスケープ{文字|もじ}

:::sensei
特別な{文字|もじ}を表すための書き方もあるよ。
:::

```python runnable
# \n は改行
print("1行目\n2行目\n3行目")

# \t はタブ（大きなスペース）
print("名前\t点数")
print("タロウ\t85")
print("ハナコ\t92")

# \" は文字列の中で「"」を使う
print("彼は「こんにちは」と\"言った\"")
```

## {暗号|あんごう}メーカーを作ろう！

学んだことをぜんぶ使って、
{暗号|あんごう}メーカーを作ろう！

```python runnable
# 暗号変換テーブル
message = "ひみつのメッセージ"
print(f"元のメッセージ: {message}")

# 暗号化：文字を置きかえる
angou = message
angou = angou.replace("ひ", "★")
angou = angou.replace("み", "◆")
angou = angou.replace("つ", "●")
angou = angou.replace("の", "▲")
print(f"暗号: {angou}")

# 復号化：元に戻す
fukugou = angou
fukugou = fukugou.replace("★", "ひ")
fukugou = fukugou.replace("◆", "み")
fukugou = fukugou.replace("●", "つ")
fukugou = fukugou.replace("▲", "の")
print(f"復号: {fukugou}")

# 逆さ暗号
sakasa = message[::-1]
print(f"\n逆さ暗号: {sakasa}")
print(f"元に戻す: {sakasa[::-1]}")
```

:::sensei
自分だけの{暗号|あんごう}を作ってみよう！
どんな{文字|もじ}に置きかえる？
友だちに{暗号|あんごう}を送ってみてね。
:::

## しりとりチェッカー

{文字列|もじれつ}の{操作|そうさ}を使って、
しりとりのルールをチェックしよう！

```python runnable
# しりとりの言葉リスト
words = ["りんご", "ごりら", "らっぱ", "ぱんだ"]

print("=== しりとりチェック ===")
for i in range(len(words) - 1):
    now = words[i]
    next_word = words[i + 1]

    # 今の言葉の最後の文字
    last_char = now[-1]
    # 次の言葉の最初の文字
    first_char = next_word[0]

    if last_char == first_char:
        result = "OK"
    else:
        result = "NG"

    print(f"  {now} → {next_word} : {result}")
```

:::hint
`words[-1]` はリストの最後の要素だけど、
`now[-1]` は{文字列|もじれつ}の最後の{文字|もじ}だよ。
`[-1]` は「最後」という{意味|いみ}なんだ！
:::

## まとめ

- `upper()` で大文字、`lower()` で小文字にする
- `replace()` で{文字|もじ}を置きかえる
- `split()` で{文字列|もじれつ}をリストに分ける
- `join()` でリストを{文字列|もじれつ}にまとめる
- `find()` で{文字|もじ}の{位置|いち}を{探|さが}す
- `count()` で{文字|もじ}の回数を数える
- `文字列[はじめ:おわり]` で一部を切り出せる
- `\n` は{改行|かいぎょう}、`\t` はタブ
