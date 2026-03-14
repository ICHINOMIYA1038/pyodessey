---
title: "数と文字"
slug: "numbers-and-strings"
order: 2
description: "計算と言葉を使おう"
world: "forest"
challenge:
  description: "100 ÷ 3 の商（整数部分）と余りをそれぞれ表示しよう！"
  starterCode: "# // は商、% は余りを求める演算子だよ\n"
  expectedOutput: "33\n1"
---

# {数|かず}と{文字|もじ}

:::sensei
今日は{数字|すうじ}と{文字列|もじれつ}をもっとくわしく学ぶよ！
おかし屋さんごっこをしながらね。
:::

:::student
おかし屋さん！？
やったー！
:::

## {数字|すうじ}で{計算|けいさん}しよう

Python は{計算|けいさん}がとくい！
たし算、ひき算、かけ算、わり算ができるよ。

```python runnable
# おかしの値段
choko = 100
gumi = 80
ame = 30

# たし算
goukei = choko + gumi
print(f"チョコとグミの合計: {goukei}円")

# ひき算
otsuri = 500 - choko
print(f"500円でチョコを買ったおつり: {otsuri}円")

# かけ算
gumi_3ko = gumi * 3
print(f"グミ3個の値段: {gumi_3ko}円")

# わり算
warikan = 300 / 3
print(f"300円を3人でわりかん: {warikan}円")
```

:::hint
{計算|けいさん}の記号を覚えよう！
- `+` たし算
- `-` ひき算
- `*` かけ算（×のかわり）
- `/` わり算（÷のかわり）
:::

## {整数|せいすう}と{小数|しょうすう}

:::sensei
{数字|すうじ}には2つの種類があるよ。
{整数|せいすう}（int）と{小数|しょうすう}（float）だ！
:::

```python runnable
# 整数（int）- 小数点なし
ko_su = 5
print(f"個数: {ko_su}")

# 小数（float）- 小数点あり
taijuu = 3.5
print(f"体重: {taijuu}kg")

# わり算の結果は小数になる
kekka = 10 / 3
print(f"10 ÷ 3 = {kekka}")

# 整数のわり算（あまりを出さない）
shou = 10 // 3
amari = 10 % 3
print(f"10 ÷ 3 = {shou} あまり {amari}")
```

:::hint
`//` は「あまりを出さないわり算」だよ。
`%` は「あまりだけ出す」記号だよ。
:::

## {文字列|もじれつ}ってなに？

:::student
{文字列|もじれつ}ってなに？
:::

:::sensei
{文字|もじ}がつながったものだよ。
`"` か `'` で囲んで作るんだ！
:::

```python runnable
# 文字列を作る
aisatsu = "こんにちは"
namae = 'タロウ'

print(aisatsu)
print(namae)

# 文字列をくっつける（連結）
message = aisatsu + "、" + namae + "！"
print(message)
```

## {文字列|もじれつ}と{数字|すうじ}をまぜる

:::sensei
{文字列|もじれつ}と{数字|すうじ}は、
そのままではくっつけられないんだ。
:::

```python runnable
namae = "ハナコ"
nenrei = 10

# これはエラーになる！
# print(namae + "は" + nenrei + "さいです")

# f-stringを使えばOK！
print(f"{namae}は{nenrei}さいです")

# str()で数字を文字に変えてもOK
print(namae + "は" + str(nenrei) + "さいです")
```

:::hint
f-string を使うのがいちばんかんたんだよ！
`f"..."` の中の `{}` に{変数|へんすう}を書くだけ。
:::

## {文字列|もじれつ}の{長|なが}さを調べよう

`len()` を使うと、{文字|もじ}の数を数えられるよ。

```python runnable
kotoba = "プログラミング"
print(f"「{kotoba}」は{len(kotoba)}文字")

namae1 = "タロウ"
namae2 = "ハナコ"
print(f"「{namae1}」は{len(namae1)}文字")
print(f"「{namae2}」は{len(namae2)}文字")

# どっちの名前が長い？
if len(namae1) > len(namae2):
    print(f"{namae1}の方が長い！")
elif len(namae1) < len(namae2):
    print(f"{namae2}の方が長い！")
else:
    print("同じ長さ！")
```

## おかし屋さんレジ

学んだことをぜんぶ使って、
おかし屋さんのレジを作ってみよう！

```python runnable
# おかしの値段
choko = 120
gumi = 80
cookie = 150

# 買ったもの
choko_ko = 2
gumi_ko = 3
cookie_ko = 1

# 合計を計算
goukei = (choko * choko_ko) + (gumi * gumi_ko) + (cookie * cookie_ko)

# レシートを表示
print("==== レシート ====")
print(f"チョコ  {choko}円 × {choko_ko}個")
print(f"グミ    {gumi}円 × {gumi_ko}個")
print(f"クッキー {cookie}円 × {cookie_ko}個")
print(f"-----------------")
print(f"合計: {goukei}円")

# おつりを計算
okane = 1000
otsuri = okane - goukei
print(f"お支払い: {okane}円")
print(f"おつり: {otsuri}円")
print("==================")
```

:::sensei
{値段|ねだん}や個数を変えて、
いろんな買い物をしてみよう！
:::

## まとめ

- {計算|けいさん}は `+` `-` `*` `/` を使う
- {整数|せいすう}（int）と{小数|しょうすう}（float）がある
- `//` はあまりなしのわり算、`%` はあまりだけ
- {文字列|もじれつ}は `"` で囲んで作る
- {文字列|もじれつ}は `+` でくっつけられる
- `f"..."` で{文字|もじ}と{数字|すうじ}をまぜられる
- `len()` で{文字|もじ}の数を数えられる
