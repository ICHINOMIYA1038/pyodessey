---
title: "テキスト処理"
slug: "text-processing"
order: 25
description: "暗号メッセージを解読しよう"
world: "sea"
challenge:
  description: "シーザー暗号（1文字ずらし）で暗号化されたメッセージ \"Ifmmp-!Qzuipo\" を解読して表示しよう！各文字のASCIIコードを1つ戻すと元のメッセージになるよ。"
  starterCode: "encoded = \"Ifmmp-!Qzuipo\"\n# 各文字のコードを1つ戻して解読しよう\ndecoded = \"\"\nfor char in encoded:\n    decoded += chr(ord(char) - 1)\nprint(decoded)\n"
  expectedOutput: "Hello, Python"
---

# テキスト{処理|しょり}

:::sensei
{海|うみ}の{冒険|ぼうけん}で{古|ふる}い{地図|ちず}を見つけたぞ！
でも、メッセージが{暗号|あんごう}で書かれている……
テキスト{処理|しょり}の{技|わざ}を使って{解読|かいどく}しよう！
:::

:::student
{暗号|あんごう}！？ スパイみたいでかっこいい！
:::

:::sensei
Pythonは文字を{操|あやつ}るのがとても{得意|とくい}なんだ。
まずは{基本|きほん}のテクニックから学んでいこう。
:::

## split と join：文字を{分|わ}けて{繋|つな}ぐ

`split()` は文字列をバラバラにして、`join()` はくっつけるよ。

```python runnable
# 海賊の宝のリストが1行で書かれている
treasure_line = "金貨,銀貨,ダイヤモンド,真珠,ルビー"

# split() でバラバラにする
treasures = treasure_line.split(",")
print(f"宝物リスト: {treasures}")
print(f"宝物の数: {len(treasures)}個")

# join() でくっつける
result = " と ".join(treasures)
print(f"つなげると: {result}")

# スペースで分ける例
message = "海 の 底 に 宝 が ある"
words = message.split(" ")
print(f"\n単語リスト: {words}")

# くっつけ直す
no_space = "".join(words)
print(f"スペースなし: {no_space}")
```

:::hint
`split(",")` は `,` で{分|わ}ける。
`" と ".join(リスト)` は「 と 」で{繋|つな}ぐ。
{引数|ひきすう}なしの `split()` はスペースで{分|わ}けるよ！
:::

## replace と strip：{文字|もじ}を{置|お}き{換|か}える・{取|と}り{除|のぞ}く

```python runnable
# 海底で見つけた汚れたメッセージ
dirty_message = "   ★★★宝は北の★★★洞窟にある★★★   "

# strip() で前後の空白を取る
clean = dirty_message.strip()
print(f"空白除去: 「{clean}」")

# replace() で文字を置き換える
clean2 = clean.replace("★★★", "")
print(f"星を除去: 「{clean2}」")

# 複数回 replace を繋げられる
coded = "T-H-E S-E-A"
decoded = coded.replace("-", "").replace(" ", "_")
print(f"\n暗号: {coded}")
print(f"解読: {decoded}")
```

## f-strings の{高度|こうど}な使い方

:::sensei
f-strings はもっと{便利|べんり}な使い方ができるんだ。
{海|うみ}の{航海|こうかい}ログを作ってみよう！
:::

```python runnable
# 数値のフォーマット
gold = 12345
print(f"所持金: {gold:,}ゴールド")  # カンマ区切り

# 小数点の桁数
distance = 3.14159
print(f"島までの距離: {distance:.2f}海里")  # 小数2桁

# 幅を揃える（右揃え、左揃え）
items = [("剣", 1200), ("盾", 800), ("薬草", 50)]
print("\n=== 海賊ショップ ===")
for name, price in items:
    print(f"  {name:<6} {price:>6,}G")  # 左6文字、右6文字

# 式も入れられる
hp = 75
max_hp = 100
print(f"\nHP: {hp}/{max_hp} ({hp/max_hp*100:.0f}%)")
```

:::hint
`{値:,}` → カンマ{区切|くぎ}り（1,234）
`{値:.2f}` → {小数|しょうすう}2{桁|けた}（3.14）
`{値:<10}` → {左揃|ひだりぞろ}え10文字
`{値:>10}` → {右揃|みぎぞろ}え10文字
:::

## {複数行|ふくすうぎょう}の文字列

```python runnable
# トリプルクォートで複数行の文字列
sea_map = """
~~~~~~~~~~~~~~~~~~~~~~~~~
~  ☆ 宝島              ~
~       ~~~             ~
~  🚢      ~~~  ⚓     ~
~            ~~~~~      ~
~~~~~~~~~~~~~~~~~~~~~~~~~
"""
print(sea_map)

# 複数行を処理する
ship_log = """日付: 1日目 晴れ
日付: 2日目 嵐
日付: 3日目 晴れ
日付: 4日目 霧"""

lines = ship_log.strip().split("\n")
print(f"航海日数: {len(lines)}日")

for line in lines:
    parts = line.split(" ")
    day = parts[1]
    weather = parts[2]
    print(f"  {day} → 天気: {weather}")
```

## テキスト{解析|かいせき}テクニック

:::sensei
テキストを{分析|ぶんせき}する{技|わざ}を学ぼう。
{海賊|かいぞく}の{暗号|あんごう}ログを{解析|かいせき}するのに{役立|やくだ}つぞ！
:::

```python runnable
# 文字を調べるメソッド
test_words = ["Hello", "123", "abc", "Hello123", "   "]

for word in test_words:
    info = []
    if word.isalpha():
        info.append("文字だけ")
    if word.isdigit():
        info.append("数字だけ")
    if word.isalnum():
        info.append("文字か数字")
    if word.isspace():
        info.append("空白だけ")
    print(f"  「{word}」→ {', '.join(info) if info else 'ミックス'}")

# upper / lower
secret = "The Treasure Is Under The Rock"
print(f"\n大文字: {secret.upper()}")
print(f"小文字: {secret.lower()}")

# 文字の出現回数を数える
pirate_msg = "abracadabra"
print(f"\n「{pirate_msg}」の中の文字:")
for char in set(pirate_msg):
    print(f"  '{char}': {pirate_msg.count(char)}回")
```

## ASCII コードで{暗号|あんごう}を作ろう

:::student
{暗号|あんごう}ってどうやって作るの？
:::

:::sensei
文字にはそれぞれ「{番号|ばんごう}」がついているんだ。
`ord()` で{番号|ばんごう}を取り出して、
`chr()` で{番号|ばんごう}から文字に{戻|もど}せるよ。
:::

```python runnable
# 文字とASCIIコード
print("=== 文字の番号（ASCIIコード） ===")
for char in "ABCDE":
    print(f"  '{char}' → {ord(char)}")

print()
for char in "abcde":
    print(f"  '{char}' → {ord(char)}")

# 番号から文字に戻す
print(f"\n番号65の文字: {chr(65)}")
print(f"番号97の文字: {chr(97)}")
```

## シーザー{暗号|あんごう}

:::sensei
「シーザー{暗号|あんごう}」は、文字を{何文字|なんもじ}かずらす{暗号|あんごう}だ。
たとえば1文字ずらすと、A→B、B→C になる。
{古代|こだい}ローマの{将軍|しょうぐん}シーザーが使ったと言われているよ！
:::

```python runnable
# シーザー暗号：暗号化（文字を1つずらす）
def encrypt(text, shift=1):
    result = ""
    for char in text:
        result += chr(ord(char) + shift)
    return result

# シーザー暗号：解読（文字を1つ戻す）
def decrypt(text, shift=1):
    result = ""
    for char in text:
        result += chr(ord(char) - shift)
    return result

# 暗号化してみよう
original = "Hello, Python"
encoded = encrypt(original)
print(f"元のメッセージ: {original}")
print(f"暗号化: {encoded}")

# 解読してみよう
decoded = decrypt(encoded)
print(f"解読: {decoded}")

# ちゃんと戻った？
print(f"一致: {original == decoded}")
```

:::hint
`ord('A')` は 65、`ord('B')` は 66。
1を足せば A→B になる。1を引けば B→A に{戻|もど}る。
これがシーザー{暗号|あんごう}の{仕組|しく}みだよ！
:::

## {海賊|かいぞく}の{暗号|あんごう}メッセージを{解読|かいどく}！

```python runnable
# 海賊が残した暗号メッセージを解読しよう！
encoded_messages = [
    "Uif!usfbtvsf!jt!ifsf",  # shift=1
    "Uckn\"kp\"vjg\"ecxg",     # shift=2
]

print("=== 海賊の暗号解読 ===\n")

for i, msg in enumerate(encoded_messages):
    shift = i + 1  # 1番目はshift=1、2番目はshift=2
    decoded = ""
    for char in msg:
        decoded += chr(ord(char) - shift)
    print(f"暗号 {i+1}: {msg}")
    print(f"解読 (ずらし{shift}): {decoded}")
    print()
```

## テキスト{処理|しょり}で{航海|こうかい}ログを作ろう

```python runnable
# 航海ログのテキスト処理
raw_data = """
  name:海賊船サンダー, captain:ジャック, crew:25
  name:商船ゴールデン, captain:マリー, crew:12
  name:軍艦アイアン, captain:ネルソン, crew:80
"""

ships = []
for line in raw_data.strip().split("\n"):
    line = line.strip()
    if not line:
        continue
    ship = {}
    for pair in line.split(", "):
        key, value = pair.split(":")
        ship[key.strip()] = value.strip()
    ships.append(ship)

# きれいに表示
print("=== 港の船リスト ===")
print(f"{'船名':<14} {'船長':<10} {'乗組員':>6}")
print("-" * 32)
for ship in ships:
    name = ship["name"]
    captain = ship["captain"]
    crew = ship["crew"]
    print(f"{name:<12} {captain:<8} {crew:>4}人")

total_crew = sum(int(s["crew"]) for s in ships)
print(f"\n合計乗組員: {total_crew}人")
```

## やってみよう

{海底|かいてい}で見つけた{暗号|あんごう}メッセージを{解読|かいどく}しよう！

```python runnable
# チャレンジの練習: シーザー暗号を解読しよう
encoded = "Ifmmp-!Qzuipo"

# 各文字のASCIIコードを1つ戻す
decoded = ""
for char in encoded:
    decoded += chr(ord(char) - 1)

print(decoded)
```

## まとめ

- `split()` で文字列を{分|わ}けて、`join()` で{繋|つな}ぐ
- `replace()` で{文字|もじ}を{置|お}き{換|か}え、`strip()` で{前後|ぜんご}の{空白|くうはく}を{除去|じょきょ}
- f-strings で{数値|すうち}フォーマット（`:,` `:.2f` `:<10` `:>10`）
- `ord()` で文字→{番号|ばんごう}、`chr()` で{番号|ばんごう}→文字
- シーザー{暗号|あんごう}：文字の{番号|ばんごう}をずらして{暗号化|あんごうか}・{解読|かいどく}
- テキスト{処理|しょり}を{組|く}み{合|あ}わせれば、どんなデータも{読|よ}み{解|と}ける！
