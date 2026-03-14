---
title: "エラー処理"
slug: "error-handling"
order: 10
description: "間違いに強くなろう"
world: "town"
challenge:
  description: "try/exceptを使って、int(\"abc\") のエラーをキャッチし「変換できません」と表示しよう！"
  starterCode: "# try/exceptを使おう\n"
  expectedOutput: "変換できません"
---

# {間違|まちが}いに強くなろう

:::sensei
プログラムは{間違|まちが}いが起きることがあるんだ。
でも大丈夫！「シールド{魔法|まほう}」で守れるよ！
:::

:::student
プログラムがこわれちゃうの？
:::

:::sensei
エラーが起きるとプログラムが止まっちゃうんだ。
でも `try` と `except` を使えば、
エラーが起きても止まらないようにできるよ！
:::

## よくあるエラーたち

まずは、どんなエラーがあるか見てみよう。
エラーには名前がついているんだよ！

```python runnable
# NameError: 存在しない変数を使った
try:
    print(nazo)
except NameError:
    print("❌ NameError: その名前の変数はないよ！")

# TypeError: 型が違うものを足した
try:
    print("HP:" + 100)
except TypeError:
    print("❌ TypeError: 文字と数字は足せないよ！")

# ZeroDivisionError: 0で割った
try:
    print(10 / 0)
except ZeroDivisionError:
    print("❌ ZeroDivisionError: 0で割れないよ！")

# IndexError: リストの範囲外
try:
    items = ["剣", "盾"]
    print(items[10])
except IndexError:
    print("❌ IndexError: そこには何もないよ！")
```

:::hint
エラーの名前を覚えなくても大丈夫！
エラーが出たら、メッセージを読めばヒントがわかるよ。
:::

## シールド{魔法|まほう} try / except

:::sensei
`try` の中でエラーが起きると、
`except` の中が{実行|じっこう}されるよ。
プログラムは止まらないんだ！
:::

```python runnable
def waru(a, b):
    try:
        result = a / b
        print(f"{a} ÷ {b} = {result}")
    except ZeroDivisionError:
        print(f"🛡️ {a} ÷ {b} はできないよ！0で割れないんだ")

waru(10, 2)
waru(10, 0)
waru(15, 3)
```

`try` が「やってみる」、
`except` が「ダメだったとき」だよ。

## いろんなエラーをキャッチしよう

:::student
エラーって1{種類|しゅるい}だけ？
:::

:::sensei
いろんな{種類|しゅるい}があるから、
それぞれ別のシールドで守れるよ！
:::

```python runnable
def safe_item(items, index):
    try:
        name = items[index]
        print(f"アイテム: {name}（{len(name)}文字）")
    except IndexError:
        print(f"🛡️ {index}番目のアイテムはないよ！")
    except TypeError:
        print(f"🛡️ 番号は数字で指定してね！")

bag = ["薬草", "毒消し", "聖水"]

safe_item(bag, 0)
safe_item(bag, 10)
safe_item(bag, "abc")
```

`except` を何個も書けるんだ。
エラーの{種類|しゅるい}ごとにメッセージを変えられるよ！

## {成功|せいこう}したときと、最後にかならず

:::sensei
`else` は{成功|せいこう}したときだけ動くよ。
`finally` はどんなときでも最後に動くんだ！
:::

```python runnable
def open_treasure(box_number):
    treasures = {1: "ダイヤモンド", 2: "ルビー", 3: "サファイア"}

    try:
        item = treasures[box_number]
    except KeyError:
        print(f"  ❌ {box_number}番の宝箱はないよ！")
    else:
        print(f"  🎁 {item}を見つけた！")
    finally:
        print(f"  📦 {box_number}番の宝箱の調査完了！")

print("宝箱を開けよう！")
open_treasure(1)
print()
open_treasure(5)
```

:::hint
- `try`: やってみる
- `except`: エラーが起きたとき
- `else`: エラーが起きなかったとき
- `finally`: どんなときでも最後に{実行|じっこう}
:::

## 自分でエラーを出す

:::student
自分でエラーを出すこともできるの？
:::

:::sensei
`raise` を使うと、自分でエラーを出せるよ！
「これはダメ！」ってルールを作れるんだ。
:::

```python runnable
def set_level(level):
    if level < 1:
        raise ValueError("レベルは1以上にしてね！")
    if level > 99:
        raise ValueError("レベルは99までだよ！")
    print(f"⭐ レベルを{level}に設定したよ！")

try:
    set_level(5)
    set_level(0)
except ValueError as e:
    print(f"🛡️ エラー: {e}")

try:
    set_level(100)
except ValueError as e:
    print(f"🛡️ エラー: {e}")
```

`as e` をつけると、エラーメッセージを
{変数|へんすう} `e` で受けとれるよ。

## エラーメッセージを読もう

:::sensei
エラーが出たときは、メッセージをよく読もう。
「何が」「どこで」{間違|まちが}ったか教えてくれるよ！
:::

```python runnable
# エラーメッセージを読んでみよう
errors = [
    ("int('abc')", "数字じゃない文字を数字にしようとした"),
    ("'hello'[10]", "文字列の範囲外を見ようとした"),
    ("[1,2,3].remove(99)", "リストにない要素を消そうとした"),
]

for code, explanation in errors:
    try:
        eval(code)
    except Exception as e:
        error_name = type(e).__name__
        print(f"コード: {code}")
        print(f"  エラー: {error_name}")
        print(f"  意味: {explanation}")
        print()
```

## やってみよう

{冒険者|ぼうけんしゃ}の{登録|とうろく}システムを作ってみよう！
エラーが起きても止まらないようにしよう。

```python runnable
def touroku(name, age_str):
    try:
        age = int(age_str)
    except ValueError:
        print(f"🛡️ '{age_str}'は数字じゃないよ！")
        return

    if age < 1 or age > 150:
        print(f"🛡️ {age}歳はおかしいよ！")
        return

    print(f"✅ {name}（{age}歳）を登録したよ！")

touroku("ユウシャ", "15")
touroku("マオウ", "abc")
touroku("エルフ", "999")
touroku("センシ", "25")
```

:::sensei
名前や{年齢|ねんれい}を変えて{実行|じっこう}してみよう！
わざとエラーを出してみると、
シールドの動きがよくわかるよ！
:::

## まとめ

- プログラムにはいろんなエラーがある
- `try` / `except` でエラーをキャッチできる
- `else` は{成功|せいこう}時、`finally` はいつでも{実行|じっこう}
- `raise` で自分からエラーを出せる
- エラーメッセージをよく読むと{原因|げんいん}がわかる
