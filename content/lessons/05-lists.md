---
title: "リスト"
slug: "lists"
order: 5
description: "たくさんのデータをまとめよう"
world: "forest"
challenge:
  description: "リスト [3, 1, 4, 1, 5] を並べ替えて表示しよう！"
  starterCode: "nums = [3, 1, 4, 1, 5]\n# 並べ替えて表示しよう\n"
  expectedOutput: "[1, 1, 3, 4, 5]"
---

# リスト

:::sensei
{冒険|ぼうけん}に出るとき、
リュックにアイテムを入れるよね。
プログラムでも同じように、
たくさんのデータをまとめられるよ！
:::

:::student
リュックサック！
どんなものを入れられるの？
:::

:::sensei
{数字|すうじ}でも{文字|もじ}でも何でもOK！
それが「リスト」だよ。
:::

## リストを作ろう

リストは `[]` で囲んで作るよ。
中身は `,` で区切るんだ。

```python runnable
# リュックの中身
ryukku = ["剣", "盾", "ポーション", "たいまつ"]
print(ryukku)

# 数字のリスト
hp_list = [100, 80, 65, 90]
print(hp_list)

# 空のリスト
kara = []
print(kara)
```

## リストの中身を取り出す

:::sensei
リストの中身には{番号|ばんごう}がついているよ。
ただし、**0番から**始まるんだ！
:::

```python runnable
fruits = ["りんご", "バナナ", "ぶどう", "もも"]

# 番号（インデックス）で取り出す
print(f"0番目: {fruits[0]}")
print(f"1番目: {fruits[1]}")
print(f"2番目: {fruits[2]}")

# 後ろから数える
print(f"最後: {fruits[-1]}")
print(f"後ろから2番目: {fruits[-2]}")
```

:::hint
{番号|ばんごう}は 0 から始まるよ！
`fruits[0]` が最初の要素で、
`fruits[-1]` が最後の要素だよ。
:::

## アイテムを{追加|ついか}・{削除|さくじょ}する

:::student
リュックにアイテムを入れたり、
出したりしたい！
:::

:::sensei
`append()` で{追加|ついか}、
`remove()` で{削除|さくじょ}できるよ！
:::

```python runnable
ryukku = ["剣", "盾"]
print(f"最初: {ryukku}")

# append: 最後に追加
ryukku.append("ポーション")
print(f"ポーション追加: {ryukku}")

# append: もうひとつ追加
ryukku.append("地図")
print(f"地図追加: {ryukku}")

# remove: 指定したものを削除
ryukku.remove("盾")
print(f"盾を捨てた: {ryukku}")

# pop: 最後のものを取り出す（削除して返す）
item = ryukku.pop()
print(f"取り出した: {item}")
print(f"残り: {ryukku}")
```

## リストの{長|なが}さを調べる

`len()` でリストに何個入っているか分かるよ。

```python runnable
nakama = ["勇者", "魔法使い", "戦士", "僧侶"]
print(f"仲間の数: {len(nakama)}人")

# 空っぽかどうか確認
kara = []
if len(kara) == 0:
    print("リストは空っぽです")
```

## リストをループで見る

:::sensei
for を使えば、リストの中身を
ひとつずつ取り出せるよ！
:::

```python runnable
items = ["薬草", "毒消し", "聖水", "エリクサー"]

print("=== アイテム一覧 ===")
for item in items:
    print(f"  ・{item}")

print(f"\n全部で{len(items)}個のアイテム")
```

## 「入っている？」を調べる

`in` を使うと、リストの中に
あるものがあるかどうか調べられるよ。

```python runnable
ryukku = ["剣", "ポーション", "たいまつ", "鍵"]

# 「鍵」を持っているか？
if "鍵" in ryukku:
    print("鍵を持っている！扉を開けられる！")
else:
    print("鍵がない...扉が開かない")

# 「盾」を持っているか？
if "盾" in ryukku:
    print("盾でガード！")
else:
    print("盾がない！攻撃をよけろ！")
```

## リストの一部を切り出す（スライス）

:::student
リストの一部だけほしいときは？
:::

:::sensei
スライスを使えば、
リストの一部を切り出せるよ！
:::

```python runnable
suuji = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 最初の3つ
print(f"最初の3つ: {suuji[:3]}")

# 3番目から5番目
print(f"3番目から5番目: {suuji[3:6]}")

# 最後の3つ
print(f"最後の3つ: {suuji[-3:]}")
```

## {冒険|ぼうけん}アイテム管理

学んだことをぜんぶ使って、
アイテム管理システムを作ろう！

```python runnable
# 冒険者のアイテム
items = ["薬草", "薬草", "たいまつ"]

# アイテムをたくさん見つけた！
new_items = ["剣", "盾", "ポーション", "鍵"]
for item in new_items:
    items.append(item)
    print(f"  {item}を手に入れた！")

print(f"\n今のアイテム: {items}")
print(f"全部で{len(items)}個")

# 薬草を使う
if "薬草" in items:
    items.remove("薬草")
    print("\n薬草を使った！HPが回復した！")

# 鍵を使う
if "鍵" in items:
    items.remove("鍵")
    print("鍵を使った！宝箱が開いた！")

print(f"\n残りのアイテム: {items}")
print(f"残り{len(items)}個")
```

:::sensei
アイテムを{追加|ついか}したり、
使ったりするコードを変えてみよう！
自分だけの{冒険|ぼうけん}アイテムを作ってね。
:::

## まとめ

- リストは `[]` でたくさんのデータをまとめる
- {番号|ばんごう}は **0から** 始まる（`リスト[0]` が最初）
- `append()` で{追加|ついか}、`remove()` で{削除|さくじょ}、`pop()` で取り出し
- `len()` で個数をかぞえる
- `for` でひとつずつ取り出せる
- `in` で入っているか調べられる
- `リスト[はじめ:おわり]` で一部を切り出せる
