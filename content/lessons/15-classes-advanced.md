---
title: "クラスの応用"
slug: "classes-advanced"
order: 15
description: "もっと強い設計図"
world: "mountain"
challenge:
  description: "Animal クラスを継承した Cat クラスを作り、speak() で「ニャー」と表示しよう！cat = Cat(\"ミケ\") で作って speak() を呼ぼう。"
  starterCode: "class Animal:\n    def __init__(self, name):\n        self.name = name\n\n# Catクラスを作ろう\n"
  expectedOutput: "ニャー"
---

# クラスの{応用|おうよう}

:::sensei
前に「クラス」を学んだよね。
今日は、クラスをもっとパワーアップさせる方法を学ぶよ！
:::

:::student
パワーアップ？ どうやるの？
:::

:::sensei
モンスターが{進化|しんか}するみたいに、
クラスも「{継承|けいしょう}」で{進化|しんか}できるんだ！
:::

## {継承|けいしょう}ってなに？

{継承|けいしょう}は、あるクラスの{能力|のうりょく}を引き継いで、
新しいクラスを作ることだよ。

もとになるクラスを「{親|おや}クラス」、
新しいクラスを「{子|こ}クラス」というよ。

```python runnable
class Monster:
    """すべてのモンスターの元になるクラス"""
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def attack(self):
        print(f"{self.name}の攻撃！")

# Monster を継承して FireMonster を作る
class FireMonster(Monster):
    def fire_breath(self):
        print(f"{self.name}が火を吹いた！🔥")

hikozaru = FireMonster("ヒコザル", 50)
hikozaru.attack()       # 親の能力が使える！
hikozaru.fire_breath()  # 自分だけの能力も使える！
print(f"HP: {hikozaru.hp}")
```

:::hint
`class FireMonster(Monster):` のカッコの中に{親|おや}クラスの名前を書くよ。
これだけで、{親|おや}の{能力|のうりょく}をぜんぶ引き継げるんだ！
:::

## super() で{親|おや}の力をよびだす

:::sensei
{子|こ}クラスで `__init__` を書くとき、
{親|おや}の `__init__` も{実行|じっこう}したいよね。
そんなとき `super()` を使うよ！
:::

:::student
super って「スーパー」？ かっこいい！
:::

```python runnable
class Monster:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def info(self):
        print(f"{self.name} (HP: {self.hp})")

class IceMonster(Monster):
    def __init__(self, name, hp, ice_power):
        super().__init__(name, hp)  # 親のinit を呼ぶ
        self.ice_power = ice_power  # 追加の能力

    def blizzard(self):
        print(f"{self.name}のブリザード！ 威力{self.ice_power}！❄️")

yuki = IceMonster("ユキオン", 80, 30)
yuki.info()       # 親のメソッド
yuki.blizzard()   # 自分のメソッド
```

:::hint
`super()` は「{親|おや}クラス」を{意味|いみ}するよ。
`super().__init__(...)` で、{親|おや}の{初期化|しょきか}を先にやるんだ。
:::

## メソッドの{上書|うわが}き（オーバーライド）

:::sensei
{親|おや}クラスのメソッドを、
{子|こ}クラスで書き{直|なお}すこともできるよ。
これを「オーバーライド」というんだ！
:::

```python runnable
class Monster:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp

    def attack(self):
        print(f"{self.name}のこうげき！ ダメージ10！")

class DragonMonster(Monster):
    def attack(self):
        # 親と同じ名前のメソッドを書き直す
        print(f"{self.name}のドラゴンブレス！ ダメージ50！🐉")

slime = Monster("スライム", 30)
dragon = DragonMonster("ドラゴン", 200)

slime.attack()   # 元のattack
dragon.attack()  # 上書きされたattack
```

:::student
同じ `attack` なのに、ちがう{動|うご}きになった！
:::

:::sensei
{子|こ}クラスで同じ名前のメソッドを作ると、
そっちが{優先|ゆうせん}されるんだ。
{進化|しんか}して{技|わざ}が強くなったイメージだね！
:::

## isinstance() で{種類|しゅるい}をチェック

モンスターの{種類|しゅるい}を{調|しら}べたいとき、
`isinstance()` を使うよ。

```python runnable
class Monster:
    def __init__(self, name):
        self.name = name

class FireMonster(Monster):
    pass

class IceMonster(Monster):
    pass

hikozaru = FireMonster("ヒコザル")
yukion = IceMonster("ユキオン")

# isinstance(もの, クラス) で種類をチェック
print(isinstance(hikozaru, FireMonster))  # True
print(isinstance(hikozaru, Monster))      # True（親でもOK）
print(isinstance(hikozaru, IceMonster))   # False

# バトルで使ってみよう
monsters = [hikozaru, yukion]
for m in monsters:
    if isinstance(m, FireMonster):
        print(f"{m.name}は火タイプ！🔥")
    elif isinstance(m, IceMonster):
        print(f"{m.name}は氷タイプ！❄️")
```

:::hint
`isinstance()` は「このモンスターは○○タイプ？」と聞くようなもの。
{親|おや}クラスでチェックすると、{子|こ}クラスも `True` になるよ！
:::

## クラスの{組|く}み{合|あ}わせ

:::sensei
{継承|けいしょう}のほかにも、
クラスの中に{別|べつ}のクラスを持たせる方法があるよ。
これを「{組|く}み{合|あ}わせ」というんだ！
:::

```python runnable
class Skill:
    def __init__(self, name, power):
        self.name = name
        self.power = power

    def use(self):
        print(f"  → {self.name}を使った！ 威力{self.power}！")

class Monster:
    def __init__(self, name, hp):
        self.name = name
        self.hp = hp
        self.skills = []  # スキルのリスト

    def learn(self, skill):
        self.skills.append(skill)
        print(f"{self.name}が「{skill.name}」をおぼえた！")

    def show_skills(self):
        print(f"\n{self.name}の技リスト:")
        for skill in self.skills:
            print(f"  - {skill.name}（威力{skill.power}）")

# モンスターにスキルを覚えさせよう
pikachu = Monster("ピカチュウ", 100)
pikachu.learn(Skill("でんきショック", 20))
pikachu.learn(Skill("かみなり", 50))
pikachu.learn(Skill("アイアンテール", 35))

pikachu.show_skills()

# スキルを使う
pikachu.skills[1].use()
```

:::student
モンスターの中にスキルが入ってるんだね！
:::

:::sensei
そう！ {継承|けいしょう}は「○○の{一種|いっしゅ}」の{関係|かんけい}。
{組|く}み{合|あ}わせは「○○を{持|も}っている」の{関係|かんけい}だよ。
どちらも大事なテクニックだね！
:::

## まとめ

- {継承|けいしょう}：{親|おや}クラスの{能力|のうりょく}を引き継ぐ
- **super()**：{親|おや}の `__init__` を呼び出す
- **オーバーライド**：{親|おや}のメソッドを書き{直|なお}す
- **isinstance()**：クラスの{種類|しゅるい}をチェックする
- **{組|く}み{合|あ}わせ**：クラスの中に{別|べつ}のクラスを持たせる
