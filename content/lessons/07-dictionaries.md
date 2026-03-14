---
title: "辞書"
slug: "dictionaries"
order: 7
description: "名前と値のペア"
world: "town"
challenge:
  description: "辞書 {\"name\": \"タロウ\", \"age\": 10} を作って、「タロウは10さい」と表示しよう！"
  starterCode: "# 辞書を作って表示しよう\n"
  expectedOutput: "タロウは10さい"
---

# {辞書|じしょ}

:::sensei
モンスター{図鑑|ずかん}って見たことある？
名前を調べると、いろんな{情報|じょうほう}が出てくるよね。
:::

:::student
ポ○モン{図鑑|ずかん}みたいな？
:::

:::sensei
そう！Pythonの「{辞書|じしょ}」は
名前と{情報|じょうほう}をセットで保存できるんだ。
:::

## {辞書|じしょ}を作ろう

{辞書|じしょ}は `{}` で作るよ。
「キー」と「{値|あたい}」をセットにして入れるんだ。

```python runnable
# モンスター図鑑
slime = {
    "名前": "スライム",
    "HP": 30,
    "攻撃力": 5,
    "属性": "水",
}

print(slime)
```

:::hint
`"名前"` がキー、`"スライム"` が{値|あたい}だよ。
キーと{値|あたい}は `:` でつなぐんだ。
{辞書|じしょ}のキーは「見出し」みたいなもの！
:::

## {値|あたい}を取り出そう

:::sensei
キーを使えば、{値|あたい}を取り出せるよ！
:::

```python runnable
monster = {
    "名前": "ドラゴン",
    "HP": 500,
    "攻撃力": 80,
    "属性": "炎",
}

# キーで値を取り出す
print(f"名前: {monster['名前']}")
print(f"HP: {monster['HP']}")
print(f"攻撃力: {monster['攻撃力']}")
print(f"属性: {monster['属性']}")
```

## {値|あたい}を{追加|ついか}・変えよう

:::student
新しい{情報|じょうほう}を足したり、
変えたりできるの？
:::

:::sensei
もちろん！キーを指定して
`=` で入れるだけだよ。
:::

```python runnable
monster = {
    "名前": "ゴブリン",
    "HP": 50,
    "攻撃力": 15,
}

print(f"最初: {monster}")

# 新しい情報を追加
monster["弱点"] = "光"
print(f"弱点追加: {monster}")

# 値を変更
monster["HP"] = 40
print(f"HP変更: {monster}")

# 削除
del monster["攻撃力"]
print(f"攻撃力削除: {monster}")
```

## keys, values, items

:::sensei
{辞書|じしょ}の中身を{全部|ぜんぶ}見る方法もあるよ！
:::

```python runnable
player = {
    "名前": "タロウ",
    "レベル": 5,
    "HP": 120,
    "MP": 30,
    "職業": "勇者",
}

# キーだけ見る
print(f"キー: {list(player.keys())}")

# 値だけ見る
print(f"値: {list(player.values())}")

# セットで見る
print("\n=== プレイヤー情報 ===")
for key, value in player.items():
    print(f"  {key}: {value}")
```

## キーがあるか調べる

`in` を使うと、キーがあるか調べられるよ。

```python runnable
ryukku = {
    "薬草": 3,
    "ポーション": 1,
    "たいまつ": 2,
}

# 「鍵」を持っているか？
if "鍵" in ryukku:
    print("鍵を持っている！")
else:
    print("鍵を持っていない...")

# 「薬草」を持っているか？
if "薬草" in ryukku:
    print(f"薬草を{ryukku['薬草']}個持っている！")
```

:::hint
`in` はキーを調べるよ。{値|あたい}じゃないから注意！
`"薬草" in ryukku` → キーに「薬草」がある？
:::

## {辞書|じしょ}をループで見る

```python runnable
# アイテム屋さん
shop = {
    "薬草": 50,
    "ポーション": 200,
    "毒消し": 80,
    "聖水": 300,
    "テント": 500,
}

print("=== アイテムショップ ===")
for item, price in shop.items():
    print(f"  {item}: {price}ゴールド")

# 合計金額
total = sum(shop.values())
print(f"\n全部買うと: {total}ゴールド")
```

## ネストした{辞書|じしょ}

:::student
{辞書|じしょ}の中に{辞書|じしょ}を入れられる？
:::

:::sensei
入れられるよ！
モンスター{図鑑|ずかん}を作ってみよう。
:::

```python runnable
# モンスター図鑑
zukan = {
    "スライム": {
        "HP": 30,
        "攻撃力": 5,
        "属性": "水",
    },
    "ドラゴン": {
        "HP": 500,
        "攻撃力": 80,
        "属性": "炎",
    },
    "ゴーレム": {
        "HP": 300,
        "攻撃力": 50,
        "属性": "土",
    },
}

# ドラゴンの情報を見る
print("=== ドラゴン ===")
dragon = zukan["ドラゴン"]
for key, value in dragon.items():
    print(f"  {key}: {value}")

# 全モンスターの名前とHP
print("\n=== モンスター一覧 ===")
for name, info in zukan.items():
    print(f"  {name}: HP {info['HP']}")
```

## モンスターバトル！

学んだことをぜんぶ使って、
モンスターバトルシステムを作ろう！

```python runnable
# プレイヤーと敵
player = {"名前": "勇者", "HP": 100, "攻撃力": 25}
enemy = {"名前": "ダークナイト", "HP": 80, "攻撃力": 20}

print("=== バトル開始！ ===")
print(f"{player['名前']} VS {enemy['名前']}")
print()

turn = 0
while player["HP"] > 0 and enemy["HP"] > 0:
    turn = turn + 1
    print(f"--- ターン{turn} ---")

    # プレイヤーの攻撃
    enemy["HP"] = enemy["HP"] - player["攻撃力"]
    print(f"{player['名前']}の攻撃！ {player['攻撃力']}ダメージ！")
    print(f"  {enemy['名前']}のHP: {enemy['HP']}")

    if enemy["HP"] <= 0:
        break

    # 敵の攻撃
    player["HP"] = player["HP"] - enemy["攻撃力"]
    print(f"{enemy['名前']}の攻撃！ {enemy['攻撃力']}ダメージ！")
    print(f"  {player['名前']}のHP: {player['HP']}")

print()
if player["HP"] > 0:
    print(f"{player['名前']}の勝利！")
else:
    print(f"{enemy['名前']}の勝利...")
```

:::sensei
HP や{攻撃力|こうげきりょく}を変えて、
いろんなバトルを試してみよう！
新しいモンスターを作ってもいいね。
:::

## まとめ

- {辞書|じしょ}は `{}` でキーと{値|あたい}のペアを保存する
- `辞書["キー"]` で{値|あたい}を取り出す
- `辞書["キー"] = 値` で{追加|ついか}・{変更|へんこう}する
- `keys()` でキー、`values()` で{値|あたい}、`items()` でセット
- `in` でキーがあるか調べられる
- `for key, value in 辞書.items()` でループできる
- {辞書|じしょ}の中に{辞書|じしょ}を入れられる（ネスト）
