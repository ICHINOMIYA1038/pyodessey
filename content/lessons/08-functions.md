---
title: "関数"
slug: "functions"
order: 8
description: "魔法の呪文を作ろう"
world: "town"
challenge:
  description: "2つの数を受け取って合計を返す関数 add を作り、add(3, 7) の結果を表示しよう！"
  starterCode: "# 関数 add を定義しよう\n"
  expectedOutput: "10"
---

# {魔法|まほう}の{呪文|じゅもん}を作ろう

:::sensei
今日は「{関数|かんすう}」を学ぶよ！
{関数|かんすう}は、{魔法|まほう}の{呪文|じゅもん}みたいなものなんだ。
:::

:::student
{魔法|まほう}の{呪文|じゅもん}！？
かっこいい！どうやって作るの？
:::

:::sensei
`def` というキーワードを使って、
自分だけの{呪文|じゅもん}を作れるよ！
一度作れば、何回でも使えるんだ。
:::

## はじめての{呪文|じゅもん}

{関数|かんすう}は `def` で作るよ。
`def` は「define（{定義|ていぎ}する）」のりゃくだよ。

```python runnable
def aisatsu():
    print("こんにちは！")
    print("元気ですか？")

# 呪文をとなえる（関数を呼び出す）
aisatsu()
aisatsu()
```

`aisatsu()` と書くだけで、
中に書いた2行がまとめて{実行|じっこう}されるよ！

:::hint
{関数|かんすう}の中身は、**スペース4つ**で右にずらすよ。
これを「インデント」というんだ。
インデントしないと、{関数|かんすう}の中身にならないよ！
:::

## {呪文|じゅもん}にパワーを入れよう

:::sensei
{呪文|じゅもん}に「{材料|ざいりょう}」を入れると、
もっとすごい{魔法|まほう}になるよ！
この{材料|ざいりょう}を「{引数|ひきすう}」っていうんだ。
:::

:::student
{引数|ひきすう}？
{材料|ざいりょう}を変えると{魔法|まほう}も変わるの？
:::

```python runnable
def fire(target):
    print(f"🔥 {target}にファイアー！")

fire("スライム")
fire("ドラゴン")
fire("ゴブリン")
```

`target` が{引数|ひきすう}だよ。
{呪文|じゅもん}をとなえるとき、カッコの中に入れるものが変わると、
{魔法|まほう}の{結果|けっか}も変わるんだ！

## {材料|ざいりょう}を2つ以上入れよう

{引数|ひきすう}は何個でも使えるよ。
カンマ `,` で区切るだけ！

```python runnable
def attack(name, power):
    print(f"⚔️ {name}の攻撃！ {power}ダメージ！")

attack("勇者", 50)
attack("魔法使い", 80)
attack("戦士", 65)
```

:::hint
{引数|ひきすう}の{順番|じゅんばん}は大事だよ！
最初に書いたものが最初の{引数|ひきすう}に入るよ。
:::

## {魔法|まほう}の{結果|けっか}をもらおう

:::sensei
{呪文|じゅもん}が何かを「返す」こともできるよ。
`return` を使うんだ！
:::

:::student
返すってどういうこと？
:::

:::sensei
たとえば{回復|かいふく}{魔法|まほう}は、
回復したあとのHPを「返して」くれるよ。
その{結果|けっか}を{変数|へんすう}に入れて使えるんだ！
:::

```python runnable
def heal(hp, kaifuku):
    new_hp = hp + kaifuku
    return new_hp

yuusha_hp = 30
print(f"回復前のHP: {yuusha_hp}")

yuusha_hp = heal(yuusha_hp, 50)
print(f"回復後のHP: {yuusha_hp}")
```

`return` で返した{値|あたい}を、
{変数|へんすう}に入れて使えるんだよ。

## お気に入りの{設定|せってい}

:::sensei
{引数|ひきすう}に「いつもの{値|あたい}」を{設定|せってい}できるよ。
これを「デフォルト{値|あたい}」というんだ。
:::

```python runnable
def magic(name, power=10):
    print(f"✨ {name}が{power}の力で魔法をかけた！")

# powerを指定しない → デフォルトの10になる
magic("ユウキ")

# powerを指定する → 指定した値になる
magic("ユウキ", 100)
magic("ミク", 50)
```

`power=10` と書くと、
何も指定しなかったときは `10` になるよ。

## {計算|けいさん}{呪文|じゅもん}を作ろう

:::student
{関数|かんすう}で{計算|けいさん}もできるの？
:::

:::sensei
もちろん！
ダメージ{計算|けいさん}の{呪文|じゅもん}を作ってみよう！
:::

```python runnable
def damage(attack, defense):
    dmg = attack - defense
    if dmg < 0:
        dmg = 0
    return dmg

# いろんなバトルを計算しよう
hero_atk = 80
slime_def = 20
dragon_def = 90

print(f"勇者 vs スライム: {damage(hero_atk, slime_def)}ダメージ")
print(f"勇者 vs ドラゴン: {damage(hero_atk, dragon_def)}ダメージ")
```

## やってみよう

自分だけの{魔法|まほう}{呪文|じゅもん}を作ってみよう！

```python runnable
def jiko_shoukai(namae, nenrei, suki):
    print(f"🧙 わたしの名前は{namae}！")
    print(f"   {nenrei}さいです！")
    print(f"   {suki}が大好き！")

jiko_shoukai("サクラ", 10, "プログラミング")
jiko_shoukai("ユウタ", 9, "サッカー")
```

:::sensei
名前や{年齢|ねんれい}を変えてみよう！
新しい{関数|かんすう}を自分で作ってもいいよ！
:::

## まとめ

- `def` で{関数|かんすう}（{魔法|まほう}の{呪文|じゅもん}）を作る
- {引数|ひきすう}は{呪文|じゅもん}の{材料|ざいりょう}
- `return` で{結果|けっか}を返す
- デフォルト{値|あたい}で「いつもの{設定|せってい}」ができる
- {関数|かんすう}は何度でも使える！
