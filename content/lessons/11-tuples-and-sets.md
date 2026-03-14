---
title: "タプルとセット"
slug: "tuples-and-sets"
order: 11
description: "特別なデータ入れ"
world: "mountain"
challenge:
  description: "2つのセット {1,2,3,4} と {3,4,5,6} の共通部分を求めて、sorted()で並べ替えて表示しよう！"
  starterCode: "a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\n# 共通部分を求めよう\n"
  expectedOutput: "[3, 4]"
---

# {特別|とくべつ}なデータ入れ

:::sensei
リストは覚えているかな？
今日は{特別|とくべつ}なデータ入れを2つ学ぶよ！
「タプル」と「セット」だ。
:::

:::student
リストとどうちがうの？
:::

:::sensei
タプルは「中身を変えられない{宝箱|たからばこ}」で、
セットは「同じものが入らない{宝箱|たからばこ}」だよ！
:::

## タプルを作ろう

タプルは `()` で作るよ。
リストの `[]` とにているけど、ちがうんだ。

```python runnable
# タプルを作る
treasure = ("ダイヤモンド", "ルビー", "サファイア")
print(f"お宝: {treasure}")
print(f"1番目: {treasure[0]}")
print(f"お宝の数: {len(treasure)}")

# リストとくらべてみよう
items_list = ["剣", "盾", "薬草"]   # リスト []
items_tuple = ("剣", "盾", "薬草")  # タプル ()

print(f"リスト: {items_list}")
print(f"タプル: {items_tuple}")
```

:::hint
タプルはカッコ `()` で作るよ。
1つだけのタプルは `("ダイヤ",)` と
最後にカンマをつけるのがルール！
:::

## タプルは変えられない！

:::sensei
タプルの一番の{特徴|とくちょう}は、
一度作ったら中身を変えられないことだよ。
大事なデータを守るのに使うんだ！
:::

```python runnable
# リストは変えられる
items_list = ["剣", "盾", "薬草"]
items_list[0] = "伝説の剣"
print(f"リスト変更OK: {items_list}")

# タプルは変えられない
items_tuple = ("剣", "盾", "薬草")
try:
    items_tuple[0] = "伝説の剣"
except TypeError as e:
    print(f"タプルはダメ！: {e}")
```

:::student
変えられないって不便じゃない？
:::

:::sensei
大事なものは変えられないほうが{安全|あんぜん}だよ！
たとえば{曜日|ようび}は変わらないよね。
:::

## タプルのアンパッキング

:::sensei
タプルの中身をバラバラに取り出せるよ。
これを「アンパッキング」っていうんだ！
:::

```python runnable
# 3つの値をバラバラに取り出す
monster = ("ドラゴン", 500, 100)
name, hp, attack = monster
print(f"名前: {name}")
print(f"HP: {hp}")
print(f"攻撃力: {attack}")

# 2つの変数を入れ替えるのにも使える！
a = "左"
b = "右"
print(f"入れ替え前: a={a}, b={b}")

a, b = b, a
print(f"入れ替え後: a={a}, b={b}")
```

`a, b = b, a` で{変数|へんすう}の中身を
かんたんに入れ替えられるよ！

## セットを作ろう

:::sensei
次は「セット」だよ！
セットは**同じものが入らない{宝石|ほうせき}ケース**みたいなものだよ。
:::

```python runnable
# セットを作る（同じものは自動で消える！）
gems = {"ルビー", "サファイア", "ルビー", "エメラルド", "サファイア"}
print(f"宝石: {gems}")
print(f"種類の数: {len(gems)}")

# リストからセットを作ると、重複が消える！
items = ["薬草", "薬草", "毒消し", "薬草", "聖水", "毒消し"]
print(f"アイテムリスト: {items}")
print(f"種類: {set(items)}")
```

:::hint
セットは `{}` で作るよ。
でも空っぽのセットは `set()` で作ってね。
`{}` だけだと辞書になっちゃうよ！
:::

## セットで{仲間|なかま}分け

:::sensei
セットは「どっちにもいる」「片方だけにいる」
みたいな{比較|ひかく}が得意なんだ！
:::

```python runnable
# 2つのパーティーのメンバー
party_a = {"勇者", "魔法使い", "戦士", "僧侶"}
party_b = {"勇者", "忍者", "僧侶", "弓使い"}

# 両方にいるメンバー（共通）
both = party_a & party_b
print(f"両方にいる: {both}")

# どちらかにいるメンバー（合体）
everyone = party_a | party_b
print(f"全員: {everyone}")

# Aだけにいるメンバー（差）
only_a = party_a - party_b
print(f"Aだけ: {only_a}")

# 片方だけにいるメンバー
unique = party_a ^ party_b
print(f"片方だけ: {unique}")
```

:::hint
- `&` : 両方にある（{交差|こうさ}）
- `|` : どちらかにある（{合体|がったい}）
- `-` : 引き算（{差|さ}）
- `^` : 片方だけにある
:::

## {重複|じゅうふく}をなくそう

:::student
同じモンスターを2回{倒|たお}しちゃったとき、
1回だけにしたいんだけど...
:::

:::sensei
セットを使えばかんたんだよ！
:::

```python runnable
# 今日倒したモンスターの記録
defeated = [
    "スライム", "ゴブリン", "スライム",
    "ドラゴン", "スライム", "ゴブリン",
    "オーク", "スライム"
]

print(f"倒した回数: {len(defeated)}回")

# セットで種類だけ取り出す
unique_monsters = set(defeated)
print(f"倒した種類: {unique_monsters}")
print(f"種類の数: {len(unique_monsters)}種類")

# リストに戻してソートもできる
sorted_monsters = sorted(unique_monsters)
print(f"あいうえお順: {sorted_monsters}")
```

## やってみよう

2つのチームの{得意技|とくいわざ}をくらべてみよう！

```python runnable
# チームのメンバーとステータス（タプル）
hero = ("勇者", 100, 80)
mage = ("魔法使い", 60, 120)
knight = ("戦士", 150, 40)

# アンパッキングで表示
for member in [hero, mage, knight]:
    name, hp, mp = member
    print(f"  {name}: HP={hp} MP={mp}")

print()

# 得意技の比較（セット）
hero_skills = {"斬撃", "突進", "防御"}
mage_skills = {"ファイア", "防御", "回復"}

print(f"勇者の技: {hero_skills}")
print(f"魔法使いの技: {mage_skills}")
print(f"共通の技: {hero_skills & mage_skills}")
print(f"全部の技: {hero_skills | mage_skills}")
```

:::sensei
メンバーを増やしたり、
{得意技|とくいわざ}を変えてみよう！
:::

## まとめ

- **タプル** `()` : 中身を変えられないデータ入れ
- タプルのアンパッキングで中身をバラバラにできる
- **セット** `{}` : 同じものが入らないデータ入れ
- セットで{重複|じゅうふく}をなくせる
- `&` `|` `-` `^` で{比較|ひかく}ができる
