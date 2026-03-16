---
title: "データ処理"
slug: "data-processing"
order: 24
description: "海のデータを分析しよう"
world: "sea"
challenge:
  description: "魚データのリストから一番重い魚の名前を表示しよう！"
  starterCode: "fish_data = [\n    {\"name\": \"マグロ\", \"weight\": 80},\n    {\"name\": \"クジラ\", \"weight\": 500},\n    {\"name\": \"サメ\", \"weight\": 200},\n    {\"name\": \"イルカ\", \"weight\": 150},\n    {\"name\": \"タイ\", \"weight\": 5}\n]\n\n# 一番重い魚の名前を表示しよう\n"
  expectedOutput: "クジラ"
---

# データ{処理|しょり}

:::sensei
{海|うみ}にはたくさんの{生|い}き{物|もの}やデータがあるよね。
今日は、リストや{辞書|じしょ}のデータを
{分析|ぶんせき}する{方法|ほうほう}を学ぼう！
:::

:::student
{海|うみ}のデータ{分析|ぶんせき}！
{海洋|かいよう}{探検家|たんけんか}みたいだね！
:::

:::sensei
そう！データを{上手|じょうず}に{処理|しょり}できれば、
{海|うみ}の{秘密|ひみつ}が{見|み}えてくるよ。
:::

## リストの{集計|しゅうけい}：sum, max, min

まずは{基本|きほん}の{集計|しゅうけい}{関数|かんすう}から{始|はじ}めよう。

```python runnable
# 各島で見つけた宝の数
treasures = [45, 120, 30, 85, 200, 15, 95]

print(f"合計: {sum(treasures)}個")
print(f"最大: {max(treasures)}個")
print(f"最小: {min(treasures)}個")
print(f"平均: {sum(treasures) / len(treasures):.1f}個")

# 島の数
print(f"島の数: {len(treasures)}島")
```

:::hint
`sum()` は{合計|ごうけい}、`max()` は{最大|さいだい}、`min()` は{最小|さいしょう}を{返|かえ}すよ。
{平均|へいきん}は `sum() / len()` で{計算|けいさん}できる！
:::

## {辞書|じしょ}のリストを{処理|しょり}する

:::sensei
{実際|じっさい}のデータは、ただの{数字|すうじ}のリストじゃなくて、
{名前|なまえ}や{種類|しゅるい}がついた「{辞書|じしょ}のリスト」になっていることが{多|おお}いよ。
:::

```python runnable
# 海で捕まえた魚のデータ
catches = [
    {"name": "マグロ", "weight": 80, "area": "外洋"},
    {"name": "タイ", "weight": 5, "area": "沿岸"},
    {"name": "サバ", "weight": 3, "area": "沿岸"},
    {"name": "カツオ", "weight": 15, "area": "外洋"},
    {"name": "アジ", "weight": 2, "area": "沿岸"},
    {"name": "サメ", "weight": 200, "area": "外洋"},
    {"name": "ヒラメ", "weight": 8, "area": "沿岸"},
]

# 全部の重さの合計
total_weight = sum(fish["weight"] for fish in catches)
print(f"総漁獲量: {total_weight}kg")

# 一番重い魚
heaviest = max(catches, key=lambda f: f["weight"])
print(f"最重量: {heaviest['name']}（{heaviest['weight']}kg）")

# 一番軽い魚
lightest = min(catches, key=lambda f: f["weight"])
print(f"最軽量: {lightest['name']}（{lightest['weight']}kg）")
```

:::student
`key=lambda f: f["weight"]` ってなに？
:::

:::sensei
{辞書|じしょ}のリストで `max` や `min` を使うとき、
「{何|なに}を{基準|きじゅん}に{比|くら}べるか」を{教|おし}えてあげる{必要|ひつよう}があるんだ。
`lambda f: f["weight"]` は「weightの{値|あたい}で{比|くら}べてね」という{意味|いみ}だよ。
:::

## フィルタリング：{条件|じょうけん}で{絞|しぼ}り{込|こ}む

{海|うみ}のデータから、{必要|ひつよう}なものだけ{取|と}り{出|だ}してみよう。

```python runnable
# 海洋生物データ
creatures = [
    {"name": "マグロ", "weight": 80, "type": "魚", "depth": 200},
    {"name": "クラゲ", "weight": 2, "type": "その他", "depth": 50},
    {"name": "サメ", "weight": 200, "type": "魚", "depth": 100},
    {"name": "イルカ", "weight": 150, "type": "哺乳類", "depth": 30},
    {"name": "タコ", "weight": 5, "type": "その他", "depth": 80},
    {"name": "クジラ", "weight": 500, "type": "哺乳類", "depth": 300},
    {"name": "カツオ", "weight": 15, "type": "魚", "depth": 150},
    {"name": "エビ", "weight": 1, "type": "その他", "depth": 60},
]

# 魚だけを絞り込み
fish_only = [c for c in creatures if c["type"] == "魚"]
print("=== 魚だけ ===")
for f in fish_only:
    print(f"  {f['name']}（{f['weight']}kg）")

# 50kg以上の大型生物
big_ones = [c for c in creatures if c["weight"] >= 50]
print("\n=== 50kg以上 ===")
for b in big_ones:
    print(f"  {b['name']}（{b['weight']}kg, {b['type']}）")

# 深海（100m以上）にいる生物
deep_sea = [c for c in creatures if c["depth"] >= 100]
print("\n=== 深海の生物 ===")
for d in deep_sea:
    print(f"  {d['name']}（深度{d['depth']}m）")
```

:::hint
リスト{内包|ないほう}{表記|ひょうき}の `if` で{条件|じょうけん}を{指定|してい}すれば、
{必要|ひつよう}なデータだけを{取|と}り{出|だ}せるよ！
`[x for x in リスト if 条件]` の{形|かたち}を{覚|おぼ}えよう。
:::

## ソート：{並|なら}べ{替|か}え

:::sensei
データを{並|なら}べ{替|か}えると、{全体|ぜんたい}が{見|み}やすくなるよ。
`sorted()` と `key` を{使|つか}いこなそう。
:::

```python runnable
# 港のデータ
ports = [
    {"name": "東京港", "ships": 120, "distance": 0},
    {"name": "シンガポール港", "ships": 300, "distance": 5300},
    {"name": "ロンドン港", "ships": 80, "distance": 9500},
    {"name": "上海港", "ships": 450, "distance": 1800},
    {"name": "シドニー港", "ships": 95, "distance": 7800},
]

# 船の数が多い順（reverse=True で降順）
by_ships = sorted(ports, key=lambda p: p["ships"], reverse=True)
print("=== 船の多い順 ===")
for i, port in enumerate(by_ships, start=1):
    print(f"  {i}. {port['name']}: {port['ships']}隻")

# 距離が近い順
by_distance = sorted(ports, key=lambda p: p["distance"])
print("\n=== 距離が近い順 ===")
for i, port in enumerate(by_distance, start=1):
    print(f"  {i}. {port['name']}: {port['distance']}km")
```

```python runnable
# 複数の条件で並べ替え
crew_members = [
    {"name": "アン", "role": "航海士", "level": 15},
    {"name": "ボブ", "role": "剣士", "level": 20},
    {"name": "クリス", "role": "航海士", "level": 20},
    {"name": "ダン", "role": "剣士", "level": 15},
    {"name": "エマ", "role": "料理人", "level": 18},
]

# 役割で並べて、同じ役割ならレベルの高い順
sorted_crew = sorted(crew_members, key=lambda m: (m["role"], -m["level"]))
print("=== 役割別・レベル降順 ===")
for m in sorted_crew:
    print(f"  {m['name']}（{m['role']}, Lv.{m['level']}）")
```

:::hint
`sorted()` の `key` にタプルを{返|かえ}す`lambda`を{渡|わた}すと、
{複数|ふくすう}の{条件|じょうけん}で{並|なら}べ{替|か}えられるよ。
`-m["level"]` のようにマイナスをつけると{降順|こうじゅん}になる！
:::

## グループ{分|わ}けと{集計|しゅうけい}

:::sensei
データをグループに{分|わ}けて、それぞれ{集計|しゅうけい}する
テクニックを{見|み}てみよう。
:::

```python runnable
from collections import defaultdict

# 航海で見つけた生き物のデータ
sightings = [
    {"name": "マグロ", "area": "北の海", "count": 12},
    {"name": "サメ", "area": "南の海", "count": 3},
    {"name": "イルカ", "area": "北の海", "count": 8},
    {"name": "クジラ", "area": "南の海", "count": 1},
    {"name": "カツオ", "area": "北の海", "count": 20},
    {"name": "ウミガメ", "area": "南の海", "count": 5},
    {"name": "サバ", "area": "東の海", "count": 30},
    {"name": "タコ", "area": "東の海", "count": 7},
]

# エリアごとにグループ分け
area_groups = defaultdict(list)
for s in sightings:
    area_groups[s["area"]].append(s)

# エリアごとの集計
print("=== エリア別レポート ===")
for area, group in sorted(area_groups.items()):
    total = sum(s["count"] for s in group)
    species = len(group)
    most = max(group, key=lambda s: s["count"])

    print(f"\n【{area}】")
    print(f"  種類数: {species}")
    print(f"  目撃総数: {total}")
    print(f"  最多: {most['name']}（{most['count']}匹）")
```

## statistics モジュール

:::student
もっと{高度|こうど}な{統計|とうけい}もできるの？
:::

:::sensei
`statistics` モジュールを使えば、
{中央値|ちゅうおうち}や{標準偏差|ひょうじゅんへんさ}も{計算|けいさん}できるよ！
:::

```python runnable
import statistics

# 各日の漁獲量（kg）
daily_catch = [45, 120, 30, 85, 200, 15, 95, 60, 150, 40]

print("=== 漁獲量の統計 ===")
print(f"平均: {statistics.mean(daily_catch):.1f}kg")
print(f"中央値: {statistics.median(daily_catch):.1f}kg")
print(f"最頻値: −（すべて異なる値）")
print(f"標準偏差: {statistics.stdev(daily_catch):.1f}kg")
print(f"最大: {max(daily_catch)}kg")
print(f"最小: {min(daily_catch)}kg")

# 平均より多い日を探す
avg = statistics.mean(daily_catch)
good_days = [i + 1 for i, catch in enumerate(daily_catch) if catch > avg]
print(f"\n平均以上の日: {good_days}")
print(f"好調な日の割合: {len(good_days)}/{len(daily_catch)}")
```

## {実践|じっせん}：{海洋|かいよう}データの{総合|そうごう}{分析|ぶんせき}

ここまで学んだことを{全部|ぜんぶ}{組|く}み{合|あ}わせてみよう！

```python runnable
from collections import Counter, defaultdict

# 海洋調査データ
survey_data = [
    {"date": "1日目", "creature": "マグロ", "size": "大", "area": "外洋"},
    {"date": "1日目", "creature": "サバ", "size": "小", "area": "沿岸"},
    {"date": "1日目", "creature": "マグロ", "size": "中", "area": "外洋"},
    {"date": "2日目", "creature": "イルカ", "size": "大", "area": "沿岸"},
    {"date": "2日目", "creature": "サメ", "size": "大", "area": "外洋"},
    {"date": "2日目", "creature": "サバ", "size": "小", "area": "沿岸"},
    {"date": "2日目", "creature": "サバ", "size": "中", "area": "沿岸"},
    {"date": "3日目", "creature": "クジラ", "size": "大", "area": "外洋"},
    {"date": "3日目", "creature": "マグロ", "size": "大", "area": "外洋"},
    {"date": "3日目", "creature": "タコ", "size": "小", "area": "沿岸"},
]

print("=" * 40)
print("  海洋調査レポート")
print("=" * 40)

# 1. 生き物ランキング
creature_count = Counter(d["creature"] for d in survey_data)
print("\n【目撃ランキング】")
for creature, count in creature_count.most_common():
    bar = "■" * count
    print(f"  {creature:　<5} {bar} ({count}回)")

# 2. エリア別の目撃数
print("\n【エリア別】")
area_count = Counter(d["area"] for d in survey_data)
for area, count in area_count.items():
    print(f"  {area}: {count}回")

# 3. サイズ分布
print("\n【サイズ分布】")
size_count = Counter(d["size"] for d in survey_data)
for size in ["大", "中", "小"]:
    print(f"  {size}: {size_count[size]}匹")

# 4. 日別サマリー
print("\n【日別サマリー】")
daily = defaultdict(list)
for d in survey_data:
    daily[d["date"]].append(d["creature"])

for date, creatures in sorted(daily.items()):
    unique = len(set(creatures))
    print(f"  {date}: {len(creatures)}匹発見（{unique}種類）")

print(f"\n調査結果: 全{len(survey_data)}件の目撃データを分析完了！")
```

## やってみよう

{魚|さかな}データから{一番|いちばん}{重|おも}い{魚|さかな}の{名前|なまえ}を{見|み}つけよう！

```python runnable
fish_data = [
    {"name": "マグロ", "weight": 80},
    {"name": "クジラ", "weight": 500},
    {"name": "サメ", "weight": 200},
    {"name": "イルカ", "weight": 150},
    {"name": "タイ", "weight": 5}
]

heaviest = max(fish_data, key=lambda f: f["weight"])
print(heaviest["name"])
```

## まとめ

- **sum / max / min**：リストの{合計|ごうけい}・{最大|さいだい}・{最小|さいしょう}を{計算|けいさん}
- **key=lambda**：{辞書|じしょ}のリストで「{何|なに}を{基準|きじゅん}にするか」を{指定|してい}
- **リスト{内包|ないほう}{表記|ひょうき} + if**：{条件|じょうけん}で{絞|しぼ}り{込|こ}み（フィルタリング）
- **sorted(key=...)**：{好|す}きな{基準|きじゅん}で{並|なら}べ{替|か}え
- **defaultdict**でグループ{分|わ}け → {集計|しゅうけい}
- **statistics**モジュール：{平均|へいきん}・{中央値|ちゅうおうち}・{標準偏差|ひょうじゅんへんさ}
- データ{処理|しょり}を{組|く}み{合|あ}わせれば、{海|うみ}のデータも{自在|じざい}に{分析|ぶんせき}できる！
