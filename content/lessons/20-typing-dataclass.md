---
title: "型ヒントとデータクラス"
slug: "typing-dataclass"
order: 20
description: "きちんと書く"
world: "castle"
challenge:
  description: "dataclass を使って name と age を持つ Person クラスを作り、Person(\"タロウ\", 10) を表示しよう！"
  starterCode: "from dataclasses import dataclass\n# Personクラスを定義しよう\n"
  expectedOutput: "Person(name='タロウ', age=10)"
---

# {型|かた}ヒントとデータクラス

:::sensei
今日は「{型|かた}ヒント」と「データクラス」を学ぶよ。
{設計図|せっけいず}をもっと{正確|せいかく}に書く方法だ！
:::

:::student
{設計図|せっけいず}を{正確|せいかく}に？
:::

:::sensei
たとえば「この箱には{数字|すうじ}を入れてね」って
メモしておくイメージ。
{間違|まちが}いを{防|ふせ}げるようになるんだ！
:::

## {型|かた}ヒントの{基本|きほん}

{型|かた}ヒントは、{変数|へんすう}に「どんな{種類|しゅるい}のデータが入るか」
をメモしておく書き方だよ。

```python runnable
# 型ヒントをつけてみよう
name: str = "タロウ"
age: int = 10
height: float = 140.5
is_student: bool = True

print(f"名前: {name}")
print(f"年齢: {age}歳")
print(f"身長: {height}cm")
print(f"学生: {is_student}")

# リストや辞書にもつけられる
scores: list[int] = [85, 92, 78]
profile: dict[str, str] = {"名前": "タロウ", "趣味": "ゲーム"}

print(f"点数: {scores}")
print(f"プロフィール: {profile}")
```

:::hint
{型|かた}ヒントはメモなので、
{間違|まちが}った{型|かた}を入れてもエラーにはならないよ。
でも書いておくと{読|よ}みやすくなるんだ！
:::

## {関数|かんすう}の{型|かた}ヒント

:::sensei
{関数|かんすう}にも{型|かた}ヒントをつけられるよ。
「何を受け取って、何を返すか」がわかりやすくなる！
:::

```python runnable
def greet(name: str, times: int = 1) -> str:
    """あいさつを返す関数"""
    return f"こんにちは、{name}！ " * times

def add(a: int, b: int) -> int:
    """2つの数を足す"""
    return a + b

def is_even(n: int) -> bool:
    """偶数かどうか調べる"""
    return n % 2 == 0

print(greet("タロウ"))
print(greet("ハナコ", 3))
print(f"5 + 3 = {add(5, 3)}")
print(f"4は偶数？ {is_even(4)}")
```

:::student
`-> str` は「{文字列|もじれつ}を返す」って{意味|いみ}？
:::

:::sensei
そのとおり！ `->` のあとに「返す{型|かた}」を書くんだ。
{引数|ひきすう}には `:` のあとに{型|かた}を書くよ。
:::

## Optional と Union

:::sensei
「あるかもしれないし、ないかもしれない」ときは
`Optional` を使うよ。
「どっちかの{型|かた}」は `Union` だ！
:::

```python runnable
# None かもしれない値
def find_treasure(room: int) -> str | None:
    treasures = {1: "ダイヤモンド", 3: "金のコイン", 5: "魔法の杖"}
    return treasures.get(room)

for i in range(1, 6):
    result = find_treasure(i)
    if result:
        print(f"部屋{i}: {result}を見つけた！")
    else:
        print(f"部屋{i}: 何もなかった...")

# 複数の型を受け取る
def double(value: int | str) -> int | str:
    if isinstance(value, int):
        return value * 2
    return value + value

print(f"\n数字: {double(5)}")
print(f"文字: {double('ニャー')}")
```

:::hint
`str | None` は「{文字列|もじれつ}か None」。
`int | str` は「{整数|せいすう}か{文字列|もじれつ}」。
`|` は「または」という{意味|いみ}だよ！
:::

## データクラスの{基本|きほん}

:::sensei
いよいよ「データクラス」だ！
`@dataclass` をつけると、
クラスがものすごく楽に書けるようになるよ。
:::

:::student
どのくらい楽になるの？
:::

```python runnable
from dataclasses import dataclass

@dataclass
class Monster:
    name: str
    hp: int
    attack: int
    element: str = "ノーマル"  # デフォルト値

# これだけで __init__ が自動で作られる！
slime = Monster("スライム", 30, 10)
dragon = Monster("ドラゴン", 200, 80, "火")

print(slime)
print(dragon)

# 値で比較もできる
slime2 = Monster("スライム", 30, 10)
print(f"\n同じ？ {slime == slime2}")  # True！
```

:::hint
`@dataclass` をつけると、
`__init__`、`__repr__`、`__eq__` が{自動|じどう}で作られる。
たった数行で{便利|べんり}なクラスができちゃう！
:::

## {普通|ふつう}のクラスとの{比較|ひかく}

:::sensei
{普通|ふつう}のクラスとデータクラスを{比|くら}べてみよう。
どれだけ楽になるかわかるよ！
:::

```python runnable
from dataclasses import dataclass

# --- 普通のクラス（たくさん書かないといけない）---
class ItemOld:
    def __init__(self, name, price, count):
        self.name = name
        self.price = price
        self.count = count

    def __repr__(self):
        return f"ItemOld(name='{self.name}', price={self.price}, count={self.count})"

    def __eq__(self, other):
        if not isinstance(other, ItemOld):
            return False
        return (self.name, self.price, self.count) == (other.name, other.price, other.count)

# --- データクラス（これだけでOK！）---
@dataclass
class Item:
    name: str
    price: int
    count: int = 1

# どちらも同じように使える
old = ItemOld("ポーション", 100, 3)
new = Item("ポーション", 100, 3)

print(f"普通: {old}")
print(f"データ: {new}")
```

:::student
コードの{量|りょう}がぜんぜんちがう！
データクラスの方がずっと{短|みじか}い！
:::

## デフォルト{値|ち}と{便利|べんり}な使い方

```python runnable
from dataclasses import dataclass, field

@dataclass
class Player:
    name: str
    level: int = 1
    hp: int = 100
    items: list[str] = field(default_factory=list)

    def pick_up(self, item: str) -> None:
        self.items.append(item)
        print(f"{self.name}は{item}を手に入れた！")

    def status(self) -> None:
        print(f"\n--- {self.name} ---")
        print(f"  レベル: {self.level}")
        print(f"  HP: {self.hp}")
        print(f"  アイテム: {self.items}")

# プレイヤーを作る
hero = Player("勇者タロウ", level=5, hp=200)
hero.pick_up("鉄の剣")
hero.pick_up("回復薬")
hero.pick_up("魔法の盾")
hero.status()

# デフォルト値で作る
newbie = Player("初心者ハナコ")
newbie.status()
```

:::hint
リストのデフォルト{値|ち}は `field(default_factory=list)` と書くよ。
`items: list = []` と書くとエラーになるので気をつけてね！
:::

## やってみよう

データクラスで{自分|じぶん}だけの{冒険|ぼうけん}パーティを作ろう！

```python runnable
from dataclasses import dataclass, field

@dataclass
class Adventurer:
    name: str
    job: str
    level: int
    skills: list[str] = field(default_factory=list)

    def introduce(self) -> str:
        skill_text = "、".join(self.skills) if self.skills else "なし"
        return f"{self.name}（{self.job} Lv.{self.level}）スキル: {skill_text}"

# パーティメンバーを作ろう
party: list[Adventurer] = [
    Adventurer("タロウ", "戦士", 15, ["斬撃", "シールドバッシュ"]),
    Adventurer("ハナコ", "魔法使い", 20, ["ファイアボール", "ヒール"]),
    Adventurer("ジロウ", "盗賊", 12, ["ステルス"]),
]

print("冒険パーティ:")
for member in party:
    print(f"  {member.introduce()}")

# レベルが高い順に並べる
party_sorted = sorted(party, key=lambda a: a.level, reverse=True)
print("\nレベル順:")
for m in party_sorted:
    print(f"  Lv.{m.level} {m.name}")
```

## まとめ

- **{型|かた}ヒント**：{変数|へんすう}や{関数|かんすう}にメモをつける
  - `name: str`、`age: int`、`-> bool`
- **`str | None`**：「あるかもしれないし、ないかもしれない」
- **`@dataclass`**：クラスを楽に書ける{魔法|まほう}のデコレータ
  - `__init__`、`__repr__`、`__eq__` が{自動生成|じどうせいせい}
- **`field(default_factory=list)`**：リストのデフォルト{値|ち}
- {型|かた}ヒントとデータクラスで、{読|よ}みやすいコードを書こう！
