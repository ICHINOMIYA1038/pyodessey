---
title: "繰り返し"
slug: "loops"
order: 4
description: "何度もやってみよう"
world: "forest"
challenge:
  description: "1から10までの数字の合計を計算して表示しよう！"
  starterCode: "total = 0\n# forループを書こう\n"
  expectedOutput: "55"
---

# {繰|く}り{返|かえ}し

:::sensei
同じことを何回もやりたいとき、
いちいち全部書くのは大変だよね？
:::

:::student
10回 print するとか、
めんどくさいよ～
:::

:::sensei
そこで「ループ」の出番！
同じことを何回でも{繰|く}り{返|かえ}せるんだ。
:::

## for ― {決|き}まった回数やる

`for` と `range()` を使うと、
{決|き}まった回数だけ{繰|く}り{返|かえ}せるよ。

```python runnable
# 素振り10回！
for i in range(10):
    print(f"{i + 1}回目: ブンッ！")

print("修行完了！")
```

:::hint
`range(10)` は 0 から 9 までの数を作るよ。
`i + 1` にすると 1 から 10 になるね！
:::

## range() のつかいかた

:::sensei
`range()` には3つの書き方があるよ。
:::

```python runnable
# range(おわり) → 0からスタート
print("range(5):", list(range(5)))

# range(はじめ, おわり) → はじめからスタート
print("range(1, 6):", list(range(1, 6)))

# range(はじめ, おわり, ステップ) → とびとび
print("range(0, 10, 2):", list(range(0, 10, 2)))

# カウントダウン
print("range(5, 0, -1):", list(range(5, 0, -1)))
```

## リストを{順番|じゅんばん}に見る

:::student
リストの中身を{全部|ぜんぶ}見たいときは？
:::

:::sensei
for を使えば、リストの中身を
ひとつずつ取り出せるよ！
:::

```python runnable
# 仲間リスト
nakama = ["勇者タロウ", "魔法使いハナコ", "戦士ジロウ"]

for member in nakama:
    print(f"{member}が仲間に加わった！")

print(f"\nパーティー人数: {len(nakama)}人")
```

## while ― {条件|じょうけん}が正しいあいだやる

:::sensei
「何回」じゃなくて、
「{条件|じょうけん}が正しいあいだ」{繰|く}り{返|かえ}す
方法もあるよ。それが `while` だ！
:::

```python runnable
# モンスターをたおすまで攻撃！
monster_hp = 50
turn = 0

while monster_hp > 0:
    turn = turn + 1
    damage = 15
    monster_hp = monster_hp - damage
    print(f"ターン{turn}: {damage}ダメージ！ 残りHP: {monster_hp}")

print(f"\n{turn}ターンでモンスターをたおした！")
```

:::hint
`while` は{条件|じょうけん}がずっと正しいと、
永遠に{繰|く}り{返|かえ}しちゃうから気をつけてね！
かならず{条件|じょうけん}が変わるようにしよう。
:::

## break ― ループをやめる

:::student
ループの途中でやめたいときは？
:::

:::sensei
`break` を使えば、すぐにループを抜けられるよ！
:::

```python runnable
# 宝箱をさがせ！
basho_list = ["木の下", "岩の後ろ", "宝箱発見！", "川のそば"]

for basho in basho_list:
    print(f"調べた: {basho}")
    if basho == "宝箱発見！":
        print("やったー！宝箱を見つけた！")
        break

print("探索おわり")
```

## continue ― スキップする

`continue` を使うと、
その回だけスキップして次に進めるよ。

```python runnable
# 3の倍数はスキップ！
for i in range(1, 11):
    if i % 3 == 0:
        print(f"{i}: スキップ！")
        continue
    print(f"{i}: ジャンプ！")
```

## レベルアップシステム

学んだことを使って、
レベルアップするシステムを作ってみよう！

```python runnable
level = 1
exp = 0

# モンスターをたおして経験値をもらう
monsters = [
    "スライム",
    "ゴブリン",
    "オオカミ",
    "スライム",
    "ドラゴン",
]

for monster in monsters:
    # モンスターごとの経験値
    if monster == "スライム":
        get_exp = 10
    elif monster == "ゴブリン":
        get_exp = 20
    elif monster == "オオカミ":
        get_exp = 25
    elif monster == "ドラゴン":
        get_exp = 100
    else:
        get_exp = 5

    exp = exp + get_exp
    print(f"{monster}をたおした！ +{get_exp}EXP（合計: {exp}）")

    # レベルアップ判定
    while exp >= level * 30:
        exp = exp - level * 30
        level = level + 1
        print(f"  ★ レベルアップ！ レベル{level}になった！")

print(f"\n最終レベル: {level}")
```

:::sensei
モンスターの{種類|しゅるい}や{経験値|けいけんち}を
変えてみよう！
レベルアップに{必要|ひつよう}な{経験値|けいけんち}も
変えてみてね。
:::

## 九九の表を作ろう

ループの中にループを入れることもできるよ。

```python runnable
# 九九の表
for i in range(1, 10):
    gyou = ""
    for j in range(1, 10):
        kekka = i * j
        gyou = gyou + f"{kekka:4}"
    print(gyou)
```

:::hint
`f"{kekka:4}"` は「4文字ぶんの{幅|はば}で{表示|ひょうじ}する」
という{意味|いみ}だよ。これできれいにそろうんだ！
:::

## まとめ

- `for i in range(回数)` で{決|き}まった回数{繰|く}り{返|かえ}す
- `for x in リスト` でリストの中身をひとつずつ取り出す
- `while {条件|じょうけん}` で{条件|じょうけん}が正しいあいだ{繰|く}り{返|かえ}す
- `break` でループをやめる
- `continue` でその回をスキップする
- ループの中にループを入れることもできる
