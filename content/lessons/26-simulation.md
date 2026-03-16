---
title: "シミュレーション"
slug: "simulation"
order: 26
description: "海の世界をシミュレートしよう"
world: "sea"
challenge:
  description: "サイコロ2個を1000回振って、合計が7になる回数を数えよう！random.seed(42)を使って結果を固定するよ。"
  starterCode: "import random\nrandom.seed(42)\n\ncount = 0\nfor i in range(1000):\n    d1 = random.randint(1, 6)\n    d2 = random.randint(1, 6)\n    if d1 + d2 == 7:\n        count += 1\n\nprint(count)\n"
  expectedOutput: "160"
---

# シミュレーション

:::sensei
{海|うみ}の{冒険|ぼうけん}には「{運|うん}」がつきもの。
{嵐|あらし}が来るか、{宝|たから}が見つかるか……
でも、Pythonなら{何千回|なんぜんかい}も{試|ため}して
{確率|かくりつ}を{調|しら}べられるんだ！
:::

:::student
{何千回|なんぜんかい}も！？ そんなのムリだよ！
:::

:::sensei
{手|て}でやったらね。でもコンピュータなら{一瞬|いっしゅん}さ。
これが「シミュレーション」の{力|ちから}だ！
:::

## random モジュール

まずは「ランダム」の使い方を学ぼう。

```python runnable
import random

# random.seed() で結果を固定できる
random.seed(42)

# randint: 範囲の中からランダムな整数
print("=== ランダムな数 ===")
for i in range(5):
    n = random.randint(1, 10)
    print(f"  {i+1}回目: {n}")

# choice: リストからランダムに1つ選ぶ
random.seed(42)
treasures = ["金貨", "銀貨", "ダイヤ", "真珠", "ハズレ"]
print("\n=== 宝箱を開ける ===")
for i in range(3):
    item = random.choice(treasures)
    print(f"  {i+1}個目: {item}")
```

:::hint
`random.seed(42)` を使うと、{毎回|まいかい}同じ「ランダム」な{結果|けっか}になる。
テストや{実験|じっけん}のときに{便利|べんり}だよ！
:::

## サイコロを振ろう

:::sensei
{海賊|かいぞく}たちはサイコロで{運命|うんめい}を{決|き}める！
まずは1{個|こ}のサイコロから{試|ため}してみよう。
:::

```python runnable
import random
random.seed(42)

# サイコロを10回振る
print("=== サイコロ10回 ===")
results = []
for i in range(10):
    roll = random.randint(1, 6)
    results.append(roll)
    print(f"  {i+1}回目: {roll}")

# 平均を計算
average = sum(results) / len(results)
print(f"\n平均: {average:.1f}")
print(f"理論値: 3.5")
```

## {何回|なんかい}も{試|ため}す：{確率|かくりつ}を{調|しら}べる

:::student
10回だと{偏|かたよ}りがあるよね？
もっとたくさん{試|ため}したらどうなるの？
:::

:::sensei
いい{質問|しつもん}だ！
{回数|かいすう}を{増|ふ}やすと、{理論上|りろんじょう}の{確率|かくりつ}に
どんどん{近|ちか}づいていくんだ。これが「{大数|たいすう}の{法則|ほうそく}」だよ。
:::

```python runnable
import random

# 回数を変えて、6が出る確率を調べる
# 理論上は 1/6 ≒ 16.7%
for n_rolls in [10, 100, 1000, 10000]:
    random.seed(42)
    sixes = 0
    for _ in range(n_rolls):
        if random.randint(1, 6) == 6:
            sixes += 1
    rate = sixes / n_rolls * 100
    print(f"{n_rolls:>5}回: 6が出た={sixes:>4}回 ({rate:.1f}%)")

print(f"\n理論値: 16.7%")
print("回数が増えるほど理論値に近づく！")
```

:::hint
{回数|かいすう}が{少|すく}ないと{結果|けっか}はバラバラ。
でもたくさん{試|ため}せば{試|ため}すほど、
{本当|ほんとう}の{確率|かくりつ}に{近|ちか}づくんだ！
:::

## {海|うみ}の{天気|てんき}シミュレーション

```python runnable
import random
random.seed(42)

# 海の天気：晴れ60%、曇り25%、嵐15%
def get_weather():
    roll = random.randint(1, 100)
    if roll <= 60:
        return "晴れ"
    elif roll <= 85:
        return "曇り"
    else:
        return "嵐"

# 30日間の航海をシミュレーション
print("=== 30日間の航海 ===")
weather_count = {"晴れ": 0, "曇り": 0, "嵐": 0}

for day in range(1, 31):
    weather = get_weather()
    weather_count[weather] += 1
    if weather == "嵐":
        print(f"  {day:>2}日目: {weather} ⚡ 危険！")

print(f"\n=== 天気まとめ ===")
for weather, count in weather_count.items():
    bar = "█" * count
    print(f"  {weather}: {count:>2}日 {bar}")
```

## 2{個|こ}のサイコロの{合計|ごうけい}

:::sensei
サイコロ2{個|こ}を{振|ふ}ったとき、
{合計|ごうけい}が7になる{確率|かくりつ}が{一番|いちばん}{高|たか}いって知ってた？
シミュレーションで{確|たし}かめてみよう！
:::

```python runnable
import random
random.seed(42)

# 2個のサイコロを1000回振る
n = 1000
sum_count = {}  # 合計ごとの回数

for _ in range(n):
    d1 = random.randint(1, 6)
    d2 = random.randint(1, 6)
    total = d1 + d2
    if total in sum_count:
        sum_count[total] += 1
    else:
        sum_count[total] = 0
        sum_count[total] += 1

# 結果を表示
print("=== サイコロ2個の合計 (1000回) ===")
for s in range(2, 13):
    count = sum_count.get(s, 0)
    bar = "█" * (count // 5)
    rate = count / n * 100
    print(f"  {s:>2}: {count:>3}回 ({rate:>4.1f}%) {bar}")

# 7が一番多い？
max_sum = max(sum_count, key=sum_count.get)
print(f"\n一番多い合計: {max_sum} ({sum_count[max_sum]}回)")
```

:::hint
サイコロ2{個|こ}で7を出す{組|く}み{合|あ}わせは6{通|とお}り
（1+6, 2+5, 3+4, 4+3, 5+2, 6+1）。
{全部|ぜんぶ}で36{通|とお}りあるから、{確率|かくりつ}は 6/36 = 16.7%。
:::

## {宝探|たからさが}しシミュレーション

```python runnable
import random
random.seed(42)

# 5つの島があり、1つに宝が隠されている
# ランダムに島を選んで宝を探す冒険を100回シミュレーション
islands = ["火山島", "氷の島", "森の島", "砂漠島", "幽霊島"]

n_adventures = 100
total_tries = 0
found_first_try = 0

for _ in range(n_adventures):
    treasure_island = random.choice(islands)
    tries = 0
    searched = []

    while True:
        tries += 1
        guess = random.choice(islands)
        if guess not in searched:
            searched.append(guess)
        if guess == treasure_island:
            break

    total_tries += tries
    if tries == 1:
        found_first_try += 1

avg = total_tries / n_adventures
print(f"=== 宝探しシミュレーション ({n_adventures}回) ===")
print(f"1回目で見つけた: {found_first_try}回")
print(f"平均の探索回数: {avg:.1f}回")
print(f"理論値（1回で見つかる確率）: {1/len(islands)*100:.1f}%")
print(f"実際（1回で見つかった割合）: {found_first_try/n_adventures*100:.1f}%")
```

## コイン投げの{連続|れんぞく}{記録|きろく}

:::student
コインを{何回|なんかい}も投げたら、
{表|おもて}が{何回|なんかい}連続で出ることがあるの？
:::

```python runnable
import random
random.seed(42)

# コインを100回投げて、表の最大連続回数を調べる
n_flips = 100
max_streak = 0
current_streak = 0

results = []
for _ in range(n_flips):
    flip = random.choice(["表", "裏"])
    results.append(flip)
    if flip == "表":
        current_streak += 1
        if current_streak > max_streak:
            max_streak = current_streak
    else:
        current_streak = 0

# 最初の30回を表示
print("最初の30回:")
print("".join("○" if r == "表" else "×" for r in results[:30]))

heads = results.count("表")
tails = results.count("裏")
print(f"\n{n_flips}回の結果:")
print(f"  表: {heads}回 ({heads/n_flips*100:.0f}%)")
print(f"  裏: {tails}回 ({tails/n_flips*100:.0f}%)")
print(f"  表の最大連続: {max_streak}回")
```

## {実験|じっけん}を{関数|かんすう}にまとめよう

:::sensei
シミュレーションを{関数|かんすう}にまとめると、
{何度|なんど}でも{実験|じっけん}できて{便利|べんり}だよ！
:::

```python runnable
import random

def fishing_simulation(n_days, seed=42):
    """釣りシミュレーション"""
    random.seed(seed)
    fish_types = {
        "イワシ": 40,    # 40%
        "タイ": 25,       # 25%
        "マグロ": 15,     # 15%
        "サメ": 10,       # 10%
        "伝説の魚": 5,    # 5%
        "ハズレ": 5,      # 5%
    }

    # 確率テーブルを作る
    table = []
    for fish, chance in fish_types.items():
        table.extend([fish] * chance)

    # シミュレーション実行
    catch_count = {}
    for _ in range(n_days):
        catch = random.choice(table)
        catch_count[catch] = catch_count.get(catch, 0) + 1

    return catch_count

# 100日間の釣り
result = fishing_simulation(100)
print("=== 100日間の釣り結果 ===")
for fish, count in sorted(result.items(), key=lambda x: -x[1]):
    bar = "🐟" * (count // 3)
    print(f"  {fish:<8}: {count:>3}匹 {bar}")

total = sum(result.values())
legend = result.get("伝説の魚", 0)
print(f"\n合計: {total}匹")
print(f"伝説の魚: {legend}匹 ({legend/total*100:.1f}%)")
```

## やってみよう

サイコロ2{個|こ}を1000{回|かい}{振|ふ}って、{合計|ごうけい}が7になる{回数|かいすう}を{数|かぞ}えよう！

```python runnable
# チャレンジの練習
import random
random.seed(42)

count = 0
for i in range(1000):
    d1 = random.randint(1, 6)
    d2 = random.randint(1, 6)
    if d1 + d2 == 7:
        count += 1

print(count)
```

## まとめ

- `random` モジュールで「ランダム」な{値|あたい}を作れる
- `random.seed()` で{結果|けっか}を{固定|こてい}できる（テストに{便利|べんり}）
- `randint(a, b)` は a{以上|いじょう}b{以下|いか}のランダムな{整数|せいすう}
- `choice(リスト)` はリストからランダムに1つ{選|えら}ぶ
- {何千回|なんぜんかい}もシミュレーションすると、{理論上|りろんじょう}の{確率|かくりつ}に{近|ちか}づく
- シミュレーションを{関数|かんすう}にまとめると{再利用|さいりよう}しやすい
- コンピュータの{力|ちから}を使えば、{運|うん}の{法則|ほうそく}も{解明|かいめい}できる！
