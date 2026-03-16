---
title: "便利なコレクション"
slug: "collections"
order: 23
description: "冒険の道具箱を使いこなそう"
world: "sea"
challenge:
  description: "Counterを使って、一番多いアイテムを見つけて表示しよう！"
  starterCode: "from collections import Counter\n\nitems = [\"魚\", \"貝\", \"魚\", \"海藻\", \"魚\", \"貝\", \"魚\", \"海藻\", \"貝\", \"魚\"]\n\n# 一番多いアイテムの名前だけを表示しよう\n"
  expectedOutput: "魚"
---

# {便利|べんり}なコレクション

:::sensei
{航海|こうかい}に出るとき、{便利|べんり}な{道具|どうぐ}があると{助|たす}かるよね。
Pythonにも、リストや{辞書|じしょ}をもっと{便利|べんり}に使える
{特別|とくべつ}な{道具箱|どうぐばこ}があるんだ。
:::

:::student
{特別|とくべつ}な{道具箱|どうぐばこ}？ どんなのがあるの？
:::

:::sensei
`collections` モジュールの `Counter` や `defaultdict`、
それから `enumerate` と `zip` という{便利|べんり}な{関数|かんすう}を{紹介|しょうかい}するよ！
:::

## Counter：{数|かず}を{数|かぞ}える{達人|たつじん}

{海|うみ}で{集|あつ}めた{戦利品|せんりひん}を{数|かぞ}えるのに
{一|ひと}つずつ{数|かぞ}えるのは{大変|たいへん}。
`Counter` を使えば{一瞬|いっしゅん}だ！

```python runnable
from collections import Counter

# 海で拾ったアイテムを数えよう
loot = ["貝殻", "サンゴ", "貝殻", "真珠", "サンゴ", "貝殻",
        "真珠", "貝殻", "サンゴ", "ヒトデ", "貝殻", "真珠"]

# Counter で一発カウント！
count = Counter(loot)

print("=== 戦利品カウント ===")
print(count)

# 一番多いアイテム
print(f"\n一番多い: {count.most_common(1)[0][0]}")

# 上位3つ
print("\nトップ3:")
for item, num in count.most_common(3):
    print(f"  {item}: {num}個")

# 特定のアイテムの数
print(f"\n真珠の数: {count['真珠']}個")
print(f"ダイヤの数: {count['ダイヤ']}個")  # 存在しなくても0が返る！
```

:::hint
`Counter` はリストの{中身|なかみ}を{自動|じどう}で{数|かぞ}えてくれるよ。
`most_common(n)` で{多|おお}い{順|じゅん}にn{個|こ}{取|と}り{出|だ}せる！
{存在|そんざい}しないキーを{聞|き}いても、エラーにならず `0` が{返|かえ}るのも{便利|べんり}だ。
:::

## Counter{同士|どうし}の{計算|けいさん}

:::sensei
Counter は{足|た}し{算|ざん}や{引|ひ}き{算|ざん}もできるんだ。
2つの{島|しま}で{集|あつ}めた{戦利品|せんりひん}を{合計|ごうけい}してみよう。
:::

```python runnable
from collections import Counter

# 2つの島で集めた戦利品
island_a = Counter({"金貨": 50, "銀貨": 30, "宝石": 10})
island_b = Counter({"金貨": 20, "銀貨": 50, "地図": 3})

# 合計
total = island_a + island_b
print("=== 合計 ===")
for item, num in total.most_common():
    print(f"  {item}: {num}個")

# 差分（island_a にあって island_b にないもの）
diff = island_a - island_b
print("\n=== A が多い分 ===")
for item, num in diff.items():
    print(f"  {item}: {num}個多い")
```

## Counter で{文字列|もじれつ}を{分析|ぶんせき}

```python runnable
from collections import Counter

# 船長の暗号メッセージを解析
message = "ひがしのうみにたからがねむる"
char_count = Counter(message)

print("=== 文字の出現回数 ===")
for char, num in char_count.most_common():
    bar = "■" * num
    print(f"  {char}: {bar} ({num}回)")

print(f"\n使われている文字の種類: {len(char_count)}種類")
```

## defaultdict：{初期値|しょきち}つき{辞書|じしょ}

:::sensei
{普通|ふつう}の{辞書|じしょ}は、{存在|そんざい}しないキーにアクセスするとエラーになるよね。
`defaultdict` を使えば、{自動|じどう}で{初期値|しょきち}を{設定|せってい}してくれるんだ。
:::

```python runnable
from collections import defaultdict

# 普通の辞書だとエラーになる
normal_dict = {}
try:
    normal_dict["海賊"].append("ルフィ")
except KeyError as e:
    print(f"普通の辞書: KeyError! ({e})")

# defaultdict なら自動で初期化！
crews = defaultdict(list)  # 値の初期値はからっぽのリスト
crews["赤髪海賊団"].append("シャンクス")
crews["赤髪海賊団"].append("ベン・ベックマン")
crews["白ひげ海賊団"].append("白ひげ")
crews["白ひげ海賊団"].append("マルコ")
crews["白ひげ海賊団"].append("エース")

print("=== 海賊団メンバー ===")
for crew_name, members in crews.items():
    print(f"{crew_name}: {', '.join(members)}")
```

:::student
いちいち `if` で{確認|かくにん}しなくていいんだ！{楽|らく}ちん！
:::

```python runnable
from collections import defaultdict

# 航海日誌：天気ごとにイベントを分類
log_entries = [
    ("晴れ", "島を発見"),
    ("嵐", "海賊に遭遇"),
    ("晴れ", "宝を発見"),
    ("曇り", "クジラを目撃"),
    ("嵐", "船が損傷"),
    ("晴れ", "港に到着"),
    ("曇り", "霧で迷う"),
]

# 天気ごとに自動でグループ分け
weather_events = defaultdict(list)
for weather, event in log_entries:
    weather_events[weather].append(event)

print("=== 天気別イベント ===")
for weather, events in weather_events.items():
    print(f"\n{weather}の日:")
    for event in events:
        print(f"  ・{event}")

# defaultdict(int) でカウントもできる
weather_count = defaultdict(int)
for weather, _ in log_entries:
    weather_count[weather] += 1

print("\n=== 天気の日数 ===")
for weather, count in weather_count.items():
    print(f"  {weather}: {count}日")
```

## enumerate：{番号|ばんごう}つきループ

:::sensei
リストをループするとき、{今|いま}{何番目|なんばんめ}か{知|し}りたいこと、あるよね？
`enumerate` を使えば、{番号|ばんごう}を{自動|じどう}でつけてくれるよ。
:::

```python runnable
# 普通のやり方（ちょっと面倒）
ports = ["東京港", "横浜港", "神戸港", "博多港", "那覇港"]

print("=== 普通のやり方 ===")
i = 0
for port in ports:
    print(f"{i}: {port}")
    i += 1

# enumerate を使えばスッキリ！
print("\n=== enumerate ===")
for i, port in enumerate(ports):
    print(f"{i}: {port}")

# 1から始めたいとき
print("\n=== 1番から ===")
for i, port in enumerate(ports, start=1):
    print(f"第{i}の港: {port}")
```

:::hint
`enumerate(リスト)` は `(番号, 要素)` のペアを{返|かえ}すよ。
`start=1` で{番号|ばんごう}を1から{始|はじ}められる！
:::

```python runnable
# 実践: 航路の中で一番長い区間を見つける
distances = [120, 85, 200, 150, 95, 310, 180]

# enumerate で番号と値を同時に取得
max_dist = 0
max_idx = 0
for i, dist in enumerate(distances):
    if dist > max_dist:
        max_dist = dist
        max_idx = i

print("=== 航路の距離 ===")
for i, dist in enumerate(distances, start=1):
    marker = " ← 最長！" if i - 1 == max_idx else ""
    print(f"  区間{i}: {dist}km{marker}")

print(f"\n最長区間: 区間{max_idx + 1}（{max_dist}km）")
```

## zip：2つのリストを{合体|がったい}

:::sensei
`zip` は2つ（{以上|いじょう}）のリストを
ファスナーのように{合体|がったい}させる{関数|かんすう}だよ。
:::

```python runnable
# 船の名前と速度のリスト
ship_names = ["サンタマリア号", "ゴールデン号", "ブラックパール号"]
ship_speeds = [15, 22, 30]

# zip で合体！
print("=== 船の情報 ===")
for name, speed in zip(ship_names, ship_speeds):
    print(f"  {name}: 速度{speed}ノット")

# 3つのリストも合体できる
captains = ["コロンブス", "ドレーク", "ジャック"]

print("\n=== 完全な情報 ===")
for captain, name, speed in zip(captains, ship_names, ship_speeds):
    print(f"  {captain}船長の{name}（速度{speed}ノット）")
```

:::student
バラバラだったデータが{一|ひと}つにまとまって{便利|べんり}だね！
:::

```python runnable
# zip + enumerate の合わせ技！
islands = ["ルビー島", "サファイア島", "エメラルド島"]
treasures = [500, 1200, 800]
dangers = ["低", "高", "中"]

print("=== 冒険ガイド ===")
for i, (island, treasure, danger) in enumerate(zip(islands, treasures, dangers), start=1):
    print(f"{i}. {island}")
    print(f"   財宝: {treasure}枚 / 危険度: {danger}")
    print()

# zip で辞書を一発作成
island_treasure = dict(zip(islands, treasures))
print("辞書に変換:", island_treasure)
```

:::hint
`zip` と `enumerate` を{組|く}み{合|あ}わせると、
{番号|ばんごう}つきで{複数|ふくすう}のリストを{同時|どうじ}に{処理|しょり}できるよ！
`dict(zip(keys, values))` で{辞書|じしょ}を{一発|いっぱつ}で{作|つく}れるのも{便利|べんり}！
:::

## やってみよう

{海|うみ}で{集|あつ}めたアイテムの中から、{一番|いちばん}{多|おお}いものを{見|み}つけよう！

```python runnable
from collections import Counter

items = ["魚", "貝", "魚", "海藻", "魚", "貝", "魚", "海藻", "貝", "魚"]

count = Counter(items)

print("=== アイテム集計 ===")
for item, num in count.most_common():
    bar = "🐟" * num if item == "魚" else "■" * num
    print(f"  {item}: {num}個")

# 一番多いアイテム
most_common_item = count.most_common(1)[0][0]
print(f"\n一番多いアイテム: {most_common_item}")
```

## まとめ

- **Counter**：リストの{要素|ようそ}を{自動|じどう}で{数|かぞ}えてくれる
  - `most_common(n)` で{多|おお}い{順|じゅん}にn{個|こ}{取得|しゅとく}
  - Counter{同士|どうし}の{足|た}し{算|ざん}・{引|ひ}き{算|ざん}もできる
- **defaultdict**：{存在|そんざい}しないキーに{自動|じどう}で{初期値|しょきち}を{設定|せってい}
  - `defaultdict(list)` でリストの{自動|じどう}{初期化|しょきか}
  - `defaultdict(int)` でカウンターとして{利用|りよう}
- **enumerate**：ループに{番号|ばんごう}をつける
  - `start=1` で1から{始|はじ}められる
- **zip**：{複数|ふくすう}のリストを{同時|どうじ}にループ
  - `dict(zip(keys, values))` で{辞書|じしょ}{作成|さくせい}
- これらを{組|く}み{合|あ}わせると、データ{処理|しょり}がぐっと{楽|らく}になるよ！
