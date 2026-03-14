---
title: "ファイル操作"
slug: "file-operations"
order: 12
description: "データを保存しよう"
world: "mountain"
challenge:
  description: "文字列 \"Hello\\nWorld\" を split(\"\\n\") で分割して、行数を表示しよう！"
  starterCode: "text = \"Hello\\nWorld\"\n# 行に分割して行数を表示しよう\n"
  expectedOutput: "2"
---

# データを{保存|ほぞん}しよう

:::sensei
{冒険|ぼうけん}の{記録|きろく}をノートに書いたことあるかな？
プログラムでも「ファイル」に{記録|きろく}を{保存|ほぞん}できるんだよ！
:::

:::student
ゲームのセーブみたいなこと？
:::

:::sensei
そうそう！
ファイルに書き込めば、あとから読み出せるんだ。
{冒険|ぼうけん}日記を作ってみよう！
:::

## ファイルに書き込もう

`open()` でファイルを開いて、`write()` で書き込むよ。
`"w"` は「write（書く）」のりゃくだよ。

```python runnable
# ファイルに書き込む
with open("diary.txt", "w") as f:
    f.write("冒険日記\n")
    f.write("1日目: スライムを倒した！\n")
    f.write("2日目: 宝箱を見つけた！\n")

print("📝 日記を書いたよ！")
```

`with open(...) as f:` で開いて、
`f.write(...)` で書き込むんだ。
`\n` は「{改行|かいぎょう}」（次の行に行く）だよ。

:::hint
`with` を使うと、ファイルが自動で閉じられるよ。
ファイルは開いたら閉じるのがルール！
`with` を使えば忘れなくて{安心|あんしん}だね。
:::

## ファイルを読み込もう

:::sensei
書いた{日記|にっき}を読んでみよう！
`"r"` は「read（読む）」のりゃくだよ。
:::

```python runnable
# まず日記を書く
with open("diary.txt", "w") as f:
    f.write("冒険日記\n")
    f.write("1日目: スライムを倒した！\n")
    f.write("2日目: 宝箱を見つけた！\n")
    f.write("3日目: ドラゴンに会った！\n")

# 全部まとめて読む
with open("diary.txt", "r") as f:
    content = f.read()
    print("=== 日記の中身 ===")
    print(content)
```

`f.read()` でファイルの中身を全部読めるよ。

## 1行ずつ読もう

:::student
1行ずつ読むこともできるの？
:::

:::sensei
`for` ループを使えば、1行ずつ読めるよ！
:::

```python runnable
# まずファイルを作る
with open("monsters.txt", "w") as f:
    f.write("スライム,30\n")
    f.write("ゴブリン,50\n")
    f.write("オーク,80\n")
    f.write("ドラゴン,200\n")

# 1行ずつ読んで処理する
print("=== モンスター図鑑 ===")
with open("monsters.txt", "r") as f:
    for line in f:
        name, hp = line.strip().split(",")
        print(f"  🐉 {name}: HP{hp}")
```

`line.strip()` で{改行|かいぎょう}を取って、
`.split(",")` でカンマで分けているよ。

## {追記|ついき}モード

:::sensei
「`a`」モードを使うと、
ファイルの最後に{追加|ついか}できるよ！
`"a"` は「append（{追加|ついか}）」のりゃくだよ。
:::

```python runnable
# 最初の日記を書く
with open("log.txt", "w") as f:
    f.write("1日目: 冒険スタート！\n")

# あとから追加する（上書きされない！）
with open("log.txt", "a") as f:
    f.write("2日目: 森を探検した！\n")
    f.write("3日目: 洞窟を発見！\n")

# 読んでみよう
with open("log.txt", "r") as f:
    print(f.read())
```

:::hint
- `"w"` : 上書きモード（前の中身は消える！）
- `"r"` : 読み込みモード
- `"a"` : {追記|ついき}モード（最後に{追加|ついか}）
:::

## データを{整理|せいり}しよう

:::student
{冒険|ぼうけん}の{記録|きろく}をきれいに{整理|せいり}できる？
:::

:::sensei
カンマ区切りでデータを{保存|ほぞん}すれば、
あとで{整理|せいり}できるよ！
:::

```python runnable
# 冒険のスコアをファイルに保存
with open("scores.txt", "w") as f:
    f.write("名前,レベル,スコア\n")
    f.write("ユウシャ,15,2500\n")
    f.write("マホウツカイ,12,2100\n")
    f.write("センシ,18,2800\n")
    f.write("ソウリョ,10,1800\n")

# 読み込んで集計する
print("=== 冒険スコアボード ===")
total_score = 0
count = 0

with open("scores.txt", "r") as f:
    header = f.readline()  # 最初の行（見出し）を飛ばす
    for line in f:
        name, level, score = line.strip().split(",")
        total_score += int(score)
        count += 1
        print(f"  ⭐ {name}（Lv.{level}）: {score}点")

print(f"\n合計: {total_score}点")
print(f"平均: {total_score // count}点")
```

## StringIOで{練習|れんしゅう}

:::sensei
ブラウザの中では本当のファイルが使えないこともあるよ。
`StringIO` を使えば、ファイルのフリができるんだ！
:::

```python runnable
from io import StringIO

# 文字列をファイルのように扱う
data = "勇者,100\n魔法使い,60\n戦士,150\n"
fake_file = StringIO(data)

# ふつうのファイルと同じように読める！
for line in fake_file:
    name, hp = line.strip().split(",")
    print(f"🗡️ {name}: HP{hp}")

# 書き込みもできる
output = StringIO()
output.write("冒険の結果:\n")
output.write("勝利！\n")
print(output.getvalue())
```

## やってみよう

{冒険|ぼうけん}{日記|にっき}を作ってみよう！

```python runnable
# 冒険日記を書く
with open("adventure.txt", "w") as f:
    f.write("=== 冒険日記 ===\n")
    f.write("今日の天気: 晴れ\n")
    f.write("出会ったモンスター: スライム\n")
    f.write("手に入れたアイテム: 薬草\n")

# 追記する
with open("adventure.txt", "a") as f:
    f.write("\n--- 午後の冒険 ---\n")
    f.write("出会ったモンスター: ゴブリン\n")
    f.write("手に入れたアイテム: 鉄の剣\n")

# 読み込んで表示
with open("adventure.txt", "r") as f:
    print(f.read())
```

:::sensei
{日記|にっき}の中身を自分の{冒険|ぼうけん}に変えてみよう！
モンスターやアイテムを増やしてみてね！
:::

## まとめ

- `open("ファイル名", "w")` で書き込み
- `open("ファイル名", "r")` で読み込み
- `open("ファイル名", "a")` で{追記|ついき}
- `with` を使えばファイルを自動で閉じてくれる
- `f.read()` で全部読む、`for line in f` で1行ずつ
- カンマ区切りでデータを{整理|せいり}できる
