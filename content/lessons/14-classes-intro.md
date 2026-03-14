---
title: "クラス入門"
slug: "classes-intro"
order: 14
description: "設計図を作ろう"
world: "mountain"
challenge:
  description: "Dog クラスを作り、name を受け取って bark() で「ワン！ぼくは○○」と表示するようにしよう！dog = Dog(\"ポチ\") で作って bark() を呼ぼう。"
  starterCode: "# Dogクラスを定義しよう\n"
  expectedOutput: "ワン！ぼくはポチ"
---

# {設計図|せっけいず}を作ろう

:::sensei
今日は「クラス」を学ぶよ！
クラスは**モンスターの{設計図|せっけいず}**みたいなものだよ。
:::

:::student
{設計図|せっけいず}？
モンスターを作れるの！？
:::

:::sensei
そう！{設計図|せっけいず}を1つ作れば、
そこからたくさんのモンスターを作れるんだ！
名前やHPがちがうモンスターを何体でも作れるよ。
:::

## はじめてのクラス

`class` でモンスターの{設計図|せっけいず}を作ろう。

```python runnable
class Monster:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

# 設計図からモンスターを作る！
slime = Monster("スライム", 30)
dragon = Monster("ドラゴン", 200)

print(f"{slime.name}のHP: {slime.hp}")
print(f"{dragon.name}のHP: {dragon.hp}")
```

`class Monster:` が{設計図|せっけいず}だよ。
`Monster("スライム", 30)` で{設計図|せっけいず}から
モンスターを1体作っているんだ。

:::hint
`__init__` は「{初期化|しょきか}」のことだよ。
モンスターが生まれるときに最初に呼ばれるんだ。
名前やHPを{設定|せってい}するのに使うよ。
:::

## self ってなに？

:::student
`self` ってなに？いっぱい出てくるけど...
:::

:::sensei
`self` は「自分自身」っていう{意味|いみ}だよ。
モンスターが「ぼくの名前は○○」って言うときの
「ぼく」が `self` なんだ！
:::

```python runnable
class Monster:
    def __init__(self, name, hp):
        self.name = name  # 自分の名前
        self.hp = hp      # 自分のHP

    def jiko_shoukai(self):
        print(f"ぼくは{self.name}！HPは{self.hp}だよ！")

slime = Monster("スライム", 30)
goblin = Monster("ゴブリン", 50)

slime.jiko_shoukai()
goblin.jiko_shoukai()
```

`self.name` は「自分の名前」、
`self.hp` は「自分のHP」っていう{意味|いみ}だよ。

## メソッドを作ろう

:::sensei
{設計図|せっけいず}には「できること」も書けるよ。
これを「メソッド」っていうんだ。
:::

```python runnable
class Monster:
    def __init__(self, name, hp, attack):
        self.name = name
        self.hp = hp
        self.attack = attack

    def cry(self):
        print(f"{self.name}「ガオー！」")

    def status(self):
        print(f"  {self.name}: HP={self.hp} 攻撃力={self.attack}")

# モンスターを作って、メソッドを使う
slime = Monster("スライム", 30, 10)
dragon = Monster("ドラゴン", 200, 80)
goblin = Monster("ゴブリン", 50, 25)

slime.cry()
dragon.cry()

print("\n=== モンスター図鑑 ===")
slime.status()
goblin.status()
dragon.status()
```

`cry()` と `status()` がメソッドだよ。
モンスターに「やって！」とお願いするかんじだね。

:::hint
メソッドは{関数|かんすう}にそっくり！
ちがうのは `self` が最初に入ることだけだよ。
:::

## モンスターをたたかわせよう

:::student
モンスター同士で{戦|たたか}わせたい！
:::

:::sensei
メソッドでダメージを受ける{処理|しょり}を作ろう！
:::

```python runnable
class Monster:
    def __init__(self, name, hp, attack):
        self.name = name
        self.hp = hp
        self.attack = attack

    def take_damage(self, damage):
        self.hp -= damage
        if self.hp < 0:
            self.hp = 0
        print(f"  {self.name}は{damage}ダメージ受けた！(HP: {self.hp})")

    def is_alive(self):
        return self.hp > 0

# バトル！
hero = Monster("勇者", 100, 35)
enemy = Monster("ゴブリン", 60, 20)

print("⚔️ バトル開始！")
print(f"{hero.name}(HP:{hero.hp}) vs {enemy.name}(HP:{enemy.hp})")
print()

turn = 1
while hero.is_alive() and enemy.is_alive():
    print(f"--- ターン{turn} ---")
    print(f"  {hero.name}の攻撃！")
    enemy.take_damage(hero.attack)

    if enemy.is_alive():
        print(f"  {enemy.name}の攻撃！")
        hero.take_damage(enemy.attack)

    turn += 1

print()
if hero.is_alive():
    print(f"🎉 {hero.name}の勝ち！")
else:
    print(f"💀 {enemy.name}の勝ち！")
```

`self.hp -= damage` で自分のHPが減るんだ。
`is_alive()` で生きているかチェックできるよ。

## たくさんモンスターを作ろう

:::sensei
{設計図|せっけいず}のいいところは、
何体でもモンスターを作れることだよ！
:::

```python runnable
class Monster:
    def __init__(self, name, hp, attack):
        self.name = name
        self.hp = hp
        self.attack = attack

    def info(self):
        return f"{self.name}(HP:{self.hp}, 攻撃:{self.attack})"

# たくさん作る！
monsters = [
    Monster("スライム", 30, 10),
    Monster("ゴブリン", 50, 25),
    Monster("オーク", 80, 40),
    Monster("ドラゴン", 200, 80),
    Monster("魔王", 500, 150),
]

print("=== モンスター図鑑 ===")
for i, m in enumerate(monsters, 1):
    print(f"  No.{i}: {m.info()}")

# 一番HPが高いモンスターを探す
strongest = monsters[0]
for m in monsters:
    if m.hp > strongest.hp:
        strongest = m
print(f"\n最強: {strongest.info()}")
```

## {自己|じこ}{紹介|しょうかい}カードを作ろう

:::student
モンスター以外にも使えるの？
:::

:::sensei
もちろん！なんでも{設計図|せっけいず}にできるよ。
{自己|じこ}{紹介|しょうかい}カードを作ってみよう！
:::

```python runnable
class Card:
    def __init__(self, name, age, hobby):
        self.name = name
        self.age = age
        self.hobby = hobby

    def show(self):
        print("┌──────────────────┐")
        print(f"│ 名前: {self.name}")
        print(f"│ 年齢: {self.age}さい")
        print(f"│ 趣味: {self.hobby}")
        print("└──────────────────┘")

# カードを作って表示
card1 = Card("サクラ", 10, "プログラミング")
card2 = Card("ユウタ", 9, "サッカー")
card3 = Card("ミク", 11, "お絵かき")

card1.show()
card2.show()
card3.show()
```

## やってみよう

自分だけのモンスターを{設計|せっけい}してみよう！

```python runnable
class MyMonster:
    def __init__(self, name, hp, attack, skill):
        self.name = name
        self.hp = hp
        self.attack = attack
        self.skill = skill

    def use_skill(self):
        print(f"✨ {self.name}は{self.skill}を使った！")

    def show(self):
        print(f"🐉 {self.name}")
        print(f"   HP: {self.hp}")
        print(f"   攻撃力: {self.attack}")
        print(f"   特技: {self.skill}")

# 自分のモンスターを作ろう！
m1 = MyMonster("フレイムキャット", 80, 45, "ファイアボール")
m2 = MyMonster("アイスバード", 60, 35, "ブリザード")
m3 = MyMonster("サンダーウルフ", 90, 55, "いなずま")

for m in [m1, m2, m3]:
    m.show()
    m.use_skill()
    print()
```

:::sensei
名前やステータスを自分で変えてみよう！
新しい{特技|とくぎ}のモンスターを作ってもいいよ！
:::

## まとめ

- **クラス**は{設計図|せっけいず}、作ったものは「インスタンス」
- `__init__` で最初の{設定|せってい}をする
- `self` は「自分自身」のこと
- **メソッド**はクラスの中の{関数|かんすう}
- 1つの{設計図|せっけいず}から何個でも作れる
- モンスターだけじゃなく、何でも{設計|せっけい}できる！
