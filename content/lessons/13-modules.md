---
title: "モジュール"
slug: "modules"
order: 13
description: "便利な道具箱"
world: "mountain"
challenge:
  description: "mathモジュールを使って、円周率の小数点以下2桁までを表示しよう！"
  starterCode: "import math\n# math.pi を使おう\n"
  expectedOutput: "3.14"
---

# {便利|べんり}な{道具箱|どうぐばこ}

:::sensei
Python には{便利|べんり}な{道具|どうぐ}がたくさん入った
「{道具箱|どうぐばこ}」があるんだ。
これを「モジュール」っていうよ！
:::

:::student
{道具箱|どうぐばこ}？
自分で作らなくていいの？
:::

:::sensei
そう！みんなが使える{道具|どうぐ}が最初から入っているよ。
`import` で{道具箱|どうぐばこ}を開くんだ！
:::

## {道具箱|どうぐばこ}を開こう

`import` を使って、モジュールを読み込むよ。

```python runnable
import math

# 円周率（パイ）
print(f"円周率: {math.pi}")

# 平方根（ルート）
print(f"√16 = {math.sqrt(16)}")
print(f"√2 = {math.sqrt(2):.4f}")

# 切り上げと切り捨て
print(f"3.7の切り上げ: {math.ceil(3.7)}")
print(f"3.7の切り捨て: {math.floor(3.7)}")
```

`import math` で `math`（{算数|さんすう}）の
{道具箱|どうぐばこ}を開いたんだ。
`math.sqrt()` のように使うよ！

:::hint
`math.` をつけるのは、「{算数|さんすう}の{道具箱|どうぐばこ}の中の」
という{意味|いみ}だよ。
どの{道具箱|どうぐばこ}の{道具|どうぐ}かわかりやすいね！
:::

## {道具|どうぐ}だけ取り出そう

:::sensei
{道具箱|どうぐばこ}ごと持ってこなくても、
{道具|どうぐ}だけ取り出せるよ！
:::

```python runnable
from math import sqrt, pi

# math. をつけなくても使える！
print(f"円周率: {pi}")
print(f"√25 = {sqrt(25)}")

# 円の面積を計算しよう
hankei = 5
menseki = pi * hankei ** 2
print(f"半径{hankei}の円の面積: {menseki:.2f}")
```

`from math import sqrt, pi` で
`sqrt` と `pi` だけ取り出したよ。
もう `math.` をつけなくていいんだ！

## ランダムの{道具箱|どうぐばこ}

:::student
サイコロとか、くじ引きもできるの？
:::

:::sensei
`random` モジュールを使えばできるよ！
ゲームを作るときにとっても{便利|べんり}なんだ。
:::

```python runnable
import random

# サイコロをふる
dice = random.randint(1, 6)
print(f"🎲 サイコロの目: {dice}")

# くじ引き
prizes = ["大吉", "中吉", "小吉", "吉", "凶"]
result = random.choice(prizes)
print(f"🎋 おみくじ: {result}")

# モンスターをランダムに選ぶ
monsters = ["スライム", "ゴブリン", "オーク", "ドラゴン"]
encounter = random.choice(monsters)
print(f"🐉 {encounter}が現れた！")
```

:::hint
- `randint(a, b)` : aからbまでの{数字|すうじ}をランダムに出す
- `choice(リスト)` : リストからランダムに1つ選ぶ
:::

## もっとランダム

```python runnable
import random

# リストからランダムに3つ選ぶ
items = ["剣", "盾", "薬草", "弓", "杖", "鎧"]
loot = random.sample(items, 3)
print(f"🎁 手に入れたアイテム: {loot}")

# リストをシャッフル（順番をバラバラにする）
order = ["1番", "2番", "3番", "4番", "5番"]
random.shuffle(order)
print(f"🔀 くじ引きの順番: {order}")

# ランダムなダメージ計算
base_damage = 50
damage = base_damage + random.randint(-10, 10)
print(f"⚔️ ダメージ: {damage}")
```

## {道具箱|どうぐばこ}の使い方まとめ

:::sensei
`import` にはいくつかの書き方があるよ。
全部覚えなくて大丈夫、使いやすいのを選ぼう！
:::

```python runnable
# 方法1: 道具箱ごと持ってくる
import math
print(f"方法1: {math.pi:.4f}")

# 方法2: 道具だけ取り出す
from math import sqrt
print(f"方法2: {sqrt(16)}")

# 方法3: 別名をつける
import math as m
print(f"方法3: {m.pi:.4f}")
```

:::hint
**おすすめの書き方**
- 少しだけ使うとき → `from math import sqrt`
- たくさん使うとき → `import math`
- 名前が長いとき → `import math as m`
:::

## ミニゲームを作ろう

いろんなモジュールを使って、
{数当|かずあ}てゲームのシミュレーションを作ってみよう！

```python runnable
import random
import math

# 秘密の数をランダムに決める
secret = random.randint(1, 100)
print("=== 数当てゲーム ===")
print("1から100の数を当てよう！")
print()

# コンピュータが当てるシミュレーション
low = 1
high = 100
attempts = 0

while low <= high:
    guess = (low + high) // 2
    attempts += 1

    if guess == secret:
        print(f"🎯 {attempts}回目: {guess} → 正解！")
        break
    elif guess < secret:
        print(f"🔼 {attempts}回目: {guess} → もっと大きい！")
        low = guess + 1
    else:
        print(f"🔽 {attempts}回目: {guess} → もっと小さい！")
        high = guess - 1

# 最大何回で当たるか計算
max_tries = math.ceil(math.log(100, 2))
print(f"\n秘密の数: {secret}")
print(f"最大{max_tries}回で当たるよ！")
```

:::sensei
{何回|なんかい}か{実行|じっこう}してみよう。
{秘密|ひみつ}の数が毎回変わるよ！
:::

## やってみよう

```python runnable
import random

# RPGバトルシミュレーション
hero_hp = 100
monster_hp = 80

print("⚔️ バトル開始！")
print(f"勇者HP: {hero_hp}  モンスターHP: {monster_hp}")
print()

turn = 1
while hero_hp > 0 and monster_hp > 0:
    # 勇者の攻撃
    hero_dmg = random.randint(15, 30)
    monster_hp -= hero_dmg
    print(f"ターン{turn}: 勇者の攻撃！ {hero_dmg}ダメージ！")

    if monster_hp <= 0:
        print("🎉 モンスターを倒した！")
        break

    # モンスターの攻撃
    monster_dmg = random.randint(10, 25)
    hero_hp -= monster_dmg
    print(f"        モンスターの攻撃！ {monster_dmg}ダメージ！")

    if hero_hp <= 0:
        print("💀 勇者はやられてしまった...")
        break

    print(f"        勇者HP: {hero_hp}  モンスターHP: {monster_hp}")
    turn += 1
```

:::sensei
{何回|なんかい}か{実行|じっこう}すると{結果|けっか}が変わるよ！
ダメージの{範囲|はんい}を変えてみよう！
:::

## まとめ

- モジュールは{便利|べんり}な{道具|どうぐ}が入った{道具箱|どうぐばこ}
- `import` で{道具箱|どうぐばこ}を読み込む
- `from ... import ...` で{道具|どうぐ}だけ取り出す
- `math` : {計算|けいさん}に{便利|べんり}（`sqrt`, `pi` など）
- `random` : ランダムに{便利|べんり}（`randint`, `choice` など）
- いろんなモジュールを組み合わせてゲームが作れる！
