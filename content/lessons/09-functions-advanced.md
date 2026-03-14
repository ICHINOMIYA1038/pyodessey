---
title: "関数の応用"
slug: "functions-advanced"
order: 9
description: "もっと強い魔法"
world: "town"
challenge:
  description: "デフォルト引数を使って、greet(\"タロウ\") で「こんにちは、タロウさん！」、greet(\"ハナコ\", \"やあ\") で「やあ、ハナコさん！」と表示する関数を作ろう！"
  starterCode: "# greet関数を定義しよう\n"
  expectedOutput: "こんにちは、タロウさん！\nやあ、ハナコさん！"
---

# もっと強い{魔法|まほう}

:::sensei
{前回|ぜんかい}は{関数|かんすう}の{基本|きほん}を学んだね。
今日はもっと強い{魔法|まほう}の使い方を学ぶよ！
:::

:::student
もっと強い{魔法|まほう}！わくわくする！
:::

## 2つの{結果|けっか}を返す{魔法|まほう}

:::sensei
{関数|かんすう}は{結果|けっか}を2つ以上返せるんだよ！
カンマ `,` で区切るだけだよ。
:::

```python runnable
def battle(hero_hp, monster_hp, hero_atk, monster_atk):
    monster_hp = monster_hp - hero_atk
    hero_hp = hero_hp - monster_atk
    return hero_hp, monster_hp

hero, monster = battle(100, 80, 30, 15)
print(f"勇者のHP: {hero}")
print(f"モンスターのHP: {monster}")
```

`return hero_hp, monster_hp` で2つの{値|あたい}を返して、
`hero, monster = ...` で2つの{変数|へんすう}に入れているよ。

## 名前つき{引数|ひきすう}

:::student
{引数|ひきすう}がたくさんあると、
{順番|じゅんばん}がわからなくなりそう...
:::

:::sensei
名前をつけて渡せば、
{順番|じゅんばん}を気にしなくていいんだ！
:::

```python runnable
def potion(name, hp=0, mp=0):
    print(f"🧪 {name}を使った！")
    if hp > 0:
        print(f"   HPが{hp}回復！")
    if mp > 0:
        print(f"   MPが{mp}回復！")

# 名前をつけて渡す
potion("やくそう", hp=30)
potion("マジックウォーター", mp=50)
potion("エリクサー", hp=100, mp=100)
```

`hp=30` のように名前をつけて渡すと、
どの{引数|ひきすう}に入るかはっきりわかるね！

## たくさんの{材料|ざいりょう}を受けとる

:::sensei
{材料|ざいりょう}がいくつ来るかわからないとき、
`*args` を使うと全部受けとれるよ！
:::

```python runnable
def party_attack(*members):
    print("⚔️ パーティー全員で攻撃！")
    total = 0
    for member in members:
        print(f"   {member}が攻撃した！")
        total += 1
    print(f"   {total}人で攻撃した！")

party_attack("勇者", "魔法使い", "戦士")
print()
party_attack("勇者", "魔法使い")
```

`*members` の `*` がポイント！
いくつでも{引数|ひきすう}を受けとれるんだ。

:::hint
`*args` の `args` は好きな名前でOKだよ。
`*members` でも `*names` でも大丈夫！
`*` がついていることが大事なんだ。
:::

## {魔法|まほう}の組み合わせ

:::sensei
{関数|かんすう}の中から別の{関数|かんすう}を呼べるよ！
{魔法|まほう}を組み合わせると、もっと強くなるんだ！
:::

```python runnable
def attack_power(level):
    return level * 10

def defense_power(level):
    return level * 5

def battle_result(atk_level, def_level):
    atk = attack_power(atk_level)
    dfs = defense_power(def_level)
    dmg = atk - dfs
    if dmg < 0:
        dmg = 0
    return dmg

# レベル8の勇者 vs レベル5のモンスター
result = battle_result(8, 5)
print(f"ダメージ: {result}")

# レベル3の勇者 vs レベル10のドラゴン
result = battle_result(3, 10)
print(f"ダメージ: {result}")
```

`battle_result` の中で、
`attack_power` と `defense_power` を使っているね。
小さい{関数|かんすう}を組み合わせると、わかりやすいよ！

## {変数|へんすう}の見える{範囲|はんい}

:::student
{関数|かんすう}の中で作った{変数|へんすう}って、
外からも使えるの？
:::

:::sensei
使えないんだ。
{関数|かんすう}の中で作った{変数|へんすう}は、
{関数|かんすう}の中だけで使えるよ。
:::

```python runnable
hero_name = "ユウシャ"  # みんなから見える

def show_spell():
    spell_name = "ファイア"  # この関数の中だけ
    print(f"{hero_name}が{spell_name}をとなえた！")

show_spell()
print(f"勇者の名前: {hero_name}")

# spell_name はここでは使えない！
# print(spell_name)  ← エラーになる
```

:::hint
{関数|かんすう}の外の{変数|へんすう}は「グローバル{変数|へんすう}」、
中の{変数|へんすう}は「ローカル{変数|へんすう}」というよ。
ローカル{変数|へんすう}は{関数|かんすう}が終わると消えちゃうんだ。
:::

## ミニ{関数|かんすう}（lambda）

:::sensei
かんたんな{関数|かんすう}は、1行で書けるよ！
`lambda` というキーワードを使うんだ。
:::

```python runnable
# ふつうの関数
def double(x):
    return x * 2

# lambdaで同じことを書く
triple = lambda x: x * 3

print(f"2倍: {double(5)}")
print(f"3倍: {triple(5)}")

# ソートに使うと便利！
monsters = [
    {"name": "スライム", "hp": 30},
    {"name": "ドラゴン", "hp": 200},
    {"name": "ゴブリン", "hp": 50},
]

# HPが低い順にならべる
monsters.sort(key=lambda m: m["hp"])
for m in monsters:
    print(f"  {m['name']}: HP{m['hp']}")
```

:::hint
`lambda` は「ちょっとした{計算|けいさん}」に便利だよ。
むずかしい{処理|しょり}には、ふつうの `def` を使おう！
:::

## やってみよう

パーティーのステータスを{表示|ひょうじ}する
{関数|かんすう}を作ってみよう！

```python runnable
def show_status(name, hp, mp, level=1):
    print(f"{'='*20}")
    print(f"  {name} (Lv.{level})")
    print(f"  HP: {hp}  MP: {mp}")
    return hp + mp

total1 = show_status("勇者", 100, 50, level=5)
total2 = show_status("魔法使い", 60, 120, level=4)
total3 = show_status("戦士", hp=150, mp=20, level=6)

print(f"{'='*20}")
print(f"パーティーの合計パワー: {total1 + total2 + total3}")
```

:::sensei
{引数|ひきすう}の{値|あたい}を変えたり、
新しいキャラクターを追加してみよう！
:::

## まとめ

- {関数|かんすう}は{結果|けっか}を2つ以上返せる
- 名前つき{引数|ひきすう}で{順番|じゅんばん}を気にしなくてOK
- `*args` でいくつでも{引数|ひきすう}を受けとれる
- {関数|かんすう}の中から別の{関数|かんすう}を呼べる
- {関数|かんすう}の中の{変数|へんすう}は外から見えない
- `lambda` で1行のミニ{関数|かんすう}を作れる
