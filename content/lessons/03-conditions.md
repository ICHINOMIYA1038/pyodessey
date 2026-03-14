---
title: "条件分岐"
slug: "conditions"
order: 3
description: "もしも…だったら？"
world: "forest"
challenge:
  description: "変数 score に 75 を入れて、80以上なら「合格」、そうでなければ「もう少し」と表示しよう！"
  starterCode: "score = 75\n# if文を書こう\n"
  expectedOutput: "もう少し"
---

# {条件分岐|じょうけんぶんき}

:::sensei
{冒険|ぼうけん}で「右の道」と「左の道」、
どっちに進む？って{選|えら}ぶことがあるよね。
プログラムでも同じことができるんだ！
:::

:::student
どっちの道にもモンスターがいたりして！
:::

:::sensei
そう！{条件|じょうけん}によって、
やることを変えるのが「if {文|ぶん}」だよ。
:::

## if {文|ぶん} ― もしも…だったら

`if` は「もしも」という{意味|いみ}だよ。
{条件|じょうけん}が正しいとき、中のコードが{実行|じっこう}されるんだ。

```python runnable
hp = 100

if hp > 0:
    print("まだ元気だ！冒険をつづけよう！")
```

:::hint
`if` の行の最後には `:` をつけるよ。
次の行は**スペース4つ**ぶん右にずらすよ。
これを「インデント」っていうんだ！
:::

## {比較|ひかく}してみよう

{数字|すうじ}を{比較|ひかく}する記号を覚えよう！

| 記号 | {意味|いみ} | {例|れい} |
|------|------------|----------|
| `==` | 同じ | `5 == 5` → True |
| `!=` | ちがう | `5 != 3` → True |
| `>` | より大きい | `10 > 5` → True |
| `<` | より小さい | `3 < 7` → True |
| `>=` | 以上 | `5 >= 5` → True |
| `<=` | 以下 | `3 <= 5` → True |

```python runnable
level = 5

print(f"レベルは{level}")
print(f"レベル5と同じ？ {level == 5}")
print(f"レベル3より大きい？ {level > 3}")
print(f"レベル10以下？ {level <= 10}")
```

## else ― そうじゃなかったら

:::student
{条件|じょうけん}に当てはまらないときは
どうするの？
:::

:::sensei
`else` を使うんだ！
「そうじゃなかったら」という{意味|いみ}だよ。
:::

```python runnable
ken = "あり"

if ken == "あり":
    print("剣をふってドラゴンと戦う！")
else:
    print("にげろー！！")
```

`ken` の中身を `"なし"` に変えてみよう。
{結果|けっか}が変わるよ！

## elif ― それとも…だったら

{選|えら}べる道が3つ以上あるときは `elif` を使うよ。

```python runnable
tensuu = 85

if tensuu >= 90:
    print("すごい！Sランクだ！")
elif tensuu >= 70:
    print("やったね！Aランクだ！")
elif tensuu >= 50:
    print("がんばった！Bランクだ！")
else:
    print("もう一回チャレンジしよう！")
```

:::hint
`elif` は「else if」の{短|みじか}い書き方だよ。
上から{順番|じゅんばん}にチェックして、
最初に当てはまったところだけ{実行|じっこう}するよ。
:::

## {冒険|ぼうけん}の{選択|せんたく}

:::sensei
いよいよ{冒険|ぼうけん}の{選択|せんたく}だ！
アイテムとレベルで、できることが変わるよ。
:::

```python runnable
level = 7
item = "たいまつ"

print(f"レベル: {level}")
print(f"アイテム: {item}")
print()

if level >= 10:
    print("ドラゴンの洞窟に入れる！")
elif level >= 5 and item == "たいまつ":
    print("暗い森を進める！")
elif level >= 5:
    print("森の入り口で止まった。たいまつが必要だ！")
else:
    print("まだレベルが足りない。修行しよう！")
```

`and` は「どっちも正しいとき」という{意味|いみ}だよ。

## True と False

:::student
True と False ってなに？
:::

:::sensei
True は「正しい」、False は「まちがい」だよ。
{条件|じょうけん}の{結果|けっか}はかならずどっちかになるんだ。
:::

```python runnable
# Trueは「正しい」
is_hero = True
print(f"勇者である: {is_hero}")

# Falseは「まちがい」
is_game_over = False
print(f"ゲームオーバー: {is_game_over}")

# if文でそのまま使える
if is_hero:
    print("勇者よ、世界を救うのだ！")

if not is_game_over:
    print("冒険はまだ続く！")
```

:::hint
`not` は「反対にする」という{意味|いみ}だよ。
`not True` は `False` になって、
`not False` は `True` になるよ。
:::

## {冒険|ぼうけん}ゲームを作ろう！

学んだことをぜんぶ使って、
かんたんな{冒険|ぼうけん}ゲームを作ってみよう！

```python runnable
# 冒険者のステータス
hp = 80
attack = 15
has_shield = True

# モンスターのステータス
monster_hp = 50
monster_attack = 20

print("=== モンスターが現れた！ ===")
print(f"あなた HP:{hp} 攻撃力:{attack}")
print(f"モンスター HP:{monster_hp}")
print()

# 攻撃！
monster_hp = monster_hp - attack
print(f"あなたの攻撃！ モンスターに{attack}ダメージ！")
print(f"モンスターの残りHP: {monster_hp}")

# モンスターの反撃
if has_shield:
    damage = monster_attack // 2
    print(f"盾でガード！ ダメージ半減！ ({damage}ダメージ)")
else:
    damage = monster_attack
    print(f"モンスターの攻撃！ {damage}ダメージ！")

hp = hp - damage
print(f"あなたの残りHP: {hp}")
print()

# 結果判定
if monster_hp <= 0:
    print("モンスターをたおした！やったー！")
elif hp <= 0:
    print("やられてしまった...")
else:
    print("バトルはまだ続く！")
```

:::sensei
`has_shield` を `False` に変えてみよう！
{攻撃力|こうげきりょく}や HP も変えてみてね。
:::

## まとめ

- `if` は「もしも」、`elif` は「それとも」、`else` は「そうじゃなかったら」
- {比較|ひかく}には `==` `!=` `>` `<` `>=` `<=` を使う
- `and` は「どっちも」、`or` は「どちらか」、`not` は「反対」
- `True` は正しい、`False` はまちがい
- 上から{順番|じゅんばん}にチェックして、最初に当てはまったものだけ{実行|じっこう}する
