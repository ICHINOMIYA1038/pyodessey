---
title: "JSONデータ"
slug: "json"
order: 22
description: "データの宝の地図を読もう"
world: "sea"
challenge:
  description: "海賊の宝データ（JSON文字列）を読み取って、金貨の合計を表示しよう！"
  starterCode: "import json\n\ntreasure_json = '{\"treasures\": [{\"name\": \"赤い宝箱\", \"gold\": 150}, {\"name\": \"青い宝箱\", \"gold\": 80}, {\"name\": \"金の宝箱\", \"gold\": 120}]}'\n\n# JSONを読み取って金貨の合計を計算しよう\n"
  expectedOutput: "350"
---

# JSONデータ

:::sensei
{海|うみ}の{冒険|ぼうけん}では、{宝|たから}の{地図|ちず}が{大切|たいせつ}だよね。
プログラミングの{世界|せかい}にも「データの{地図|ちず}」があるんだ。
それが **JSON** だよ！
:::

:::student
JSON？ なんだかかっこいい{名前|なまえ}だね！
:::

:::sensei
JSON は「JavaScript Object Notation」の{略|りゃく}で、
データを{書|か}き{表|あらわ}すための{決|き}まった{書|か}き{方|かた}なんだ。
{海|うみ}の{冒険者|ぼうけんしゃ}たちが{共通|きょうつう}の{地図|ちず}の{書|か}き{方|かた}を
使うように、プログラム{同士|どうし}がデータをやりとりするときに使うよ。
:::

## JSONってどんな{形|かたち}？

JSONはPythonの{辞書|じしょ}やリストにとてもよく{似|に}ているよ。

```python runnable
import json

# これがJSON文字列だよ（ただの文字列！）
ship_json = '{"name": "サンタマリア号", "crew": 30, "speed": 15.5}'

print("JSON文字列:")
print(ship_json)
print(f"型: {type(ship_json)}")

# json.loads() で文字列 → 辞書に変換！
ship = json.loads(ship_json)

print("\nPython辞書に変換:")
print(ship)
print(f"型: {type(ship)}")
print(f"船の名前: {ship['name']}")
print(f"乗組員: {ship['crew']}人")
```

:::hint
`json.loads()` の「s」は string の s。
{文字列|もじれつ}（string）を読み{込|こ}む（load）という{意味|いみ}だよ！
:::

## Python → JSON に{変換|へんかん}する

:::sensei
{逆|ぎゃく}に、Pythonのデータを JSON{文字列|もじれつ}にすることもできるよ。
{航海日誌|こうかいにっし}を{書|か}くようなものだね！
:::

```python runnable
import json

# Pythonの辞書を作る
captain = {
    "name": "キャプテン・パイソン",
    "level": 42,
    "skills": ["操舵", "天文学", "剣術"],
    "ship": {
        "name": "コードブレイカー号",
        "cannons": 20
    }
}

# json.dumps() で辞書 → JSON文字列に変換！
captain_json = json.dumps(captain, ensure_ascii=False, indent=2)

print("JSON文字列（きれいに表示）:")
print(captain_json)
```

:::student
`ensure_ascii=False` と `indent=2` ってなに？
:::

:::sensei
`ensure_ascii=False` は{日本語|にほんご}をそのまま{表示|ひょうじ}するための{設定|せってい}だよ。
`indent=2` は見やすくスペースで{字下|じさ}げしてくれる{設定|せってい}だ。
これがないと、{全部|ぜんぶ}1{行|ぎょう}にギュッとなっちゃうんだ。
:::

## {入|い}れ{子|こ}のデータにアクセスする

JSONデータは{入|い}れ{子|こ}になっていることが{多|おお}いよ。
{宝箱|たからばこ}の{中|なか}にまた{宝箱|たからばこ}があるイメージだ！

```python runnable
import json

# 海賊団のデータ（入れ子構造）
pirate_data = '''
{
  "pirate_crew": "パイソン海賊団",
  "captain": {
    "name": "レッド・パイソン",
    "bounty": 50000000
  },
  "members": [
    {"name": "ナビ", "role": "航海士", "strength": 85},
    {"name": "ソード", "role": "剣士", "strength": 92},
    {"name": "クック", "role": "料理人", "strength": 78}
  ],
  "ship": {
    "name": "ゴールデンコード号",
    "weapons": {
      "cannons": 24,
      "torpedoes": 6
    }
  }
}
'''

data = json.loads(pirate_data)

# 入れ子データにアクセス
print(f"海賊団: {data['pirate_crew']}")
print(f"船長: {data['captain']['name']}")
print(f"懸賞金: {data['captain']['bounty']:,}ベリー")
print(f"船: {data['ship']['name']}")
print(f"大砲: {data['ship']['weapons']['cannons']}門")

# メンバーリストをループ
print("\n--- 乗組員 ---")
for member in data['members']:
    print(f"  {member['name']}（{member['role']}）- 戦闘力: {member['strength']}")
```

:::hint
{入|い}れ{子|こ}のデータには `[ ]` を{連続|れんぞく}して使うよ。
`data['ship']['weapons']['cannons']` のように、
{宝箱|たからばこ}を{順番|じゅんばん}に{開|あ}けていくイメージだ！
:::

## リストの中の{辞書|じしょ}を{処理|しょり}する

:::sensei
JSONでよくある{形|かたち}は「{辞書|じしょ}のリスト」だよ。
{海|うみ}で{見|み}つけた{島|しま}のデータを{整理|せいり}してみよう。
:::

```python runnable
import json

islands_json = '''
[
  {"name": "ルビー島", "treasure": 500, "danger": "低", "discovered": true},
  {"name": "サファイア島", "treasure": 1200, "danger": "高", "discovered": false},
  {"name": "エメラルド島", "treasure": 800, "danger": "中", "discovered": true},
  {"name": "ダイヤモンド島", "treasure": 3000, "danger": "超高", "discovered": false},
  {"name": "パール島", "treasure": 300, "danger": "低", "discovered": true}
]
'''

islands = json.loads(islands_json)

# 発見済みの島だけ表示
print("=== 発見済みの島 ===")
for island in islands:
    if island["discovered"]:
        print(f"  {island['name']}: 財宝 {island['treasure']}枚")

# 財宝の合計
total = sum(island["treasure"] for island in islands)
print(f"\n全島の財宝合計: {total}枚")

# 一番財宝が多い島
richest = max(islands, key=lambda x: x["treasure"])
print(f"最も財宝が多い島: {richest['name']}（{richest['treasure']}枚）")
```

## JSONデータを{組|く}み{立|た}てる

:::student
自分でJSONデータを{作|つく}ることもできるの？
:::

:::sensei
もちろん！{冒険|ぼうけん}の{記録|きろく}を
JSONで{保存|ほぞん}してみよう。
:::

```python runnable
import json

# 冒険ログを作る
adventure_log = {
    "day": 1,
    "events": []
}

# イベントを追加していく
events = [
    {"time": "朝", "event": "港を出発", "weather": "晴れ"},
    {"time": "昼", "event": "海賊に遭遇", "weather": "曇り"},
    {"time": "夕", "event": "無人島を発見", "weather": "晴れ"},
]

for event in events:
    adventure_log["events"].append(event)

# きれいなJSONに変換
log_json = json.dumps(adventure_log, ensure_ascii=False, indent=2)
print("=== 冒険日誌 ===")
print(log_json)

# JSONから読み直して確認
log_back = json.loads(log_json)
print(f"\n今日のイベント数: {len(log_back['events'])}件")
for e in log_back["events"]:
    print(f"  [{e['time']}] {e['event']}（{e['weather']}）")
```

## JSONでよくある{間違|まちが}い

:::sensei
JSONを{扱|あつか}うときに{気|き}をつけるポイントを{教|おし}えるよ。
:::

```python runnable
import json

# NG: シングルクォートはJSONでは使えない！
bad_json = "{'name': 'パイソン'}"
try:
    json.loads(bad_json)
except json.JSONDecodeError as e:
    print(f"エラー！: {e}")

# OK: ダブルクォートを使おう
good_json = '{"name": "パイソン"}'
result = json.loads(good_json)
print(f"成功: {result}")

# JSONで使えるデータ型
print("\n--- JSONで使える型 ---")
sample = json.loads('''
{
  "文字列": "hello",
  "数値（整数）": 42,
  "数値（小数）": 3.14,
  "真偽値": true,
  "null値": null,
  "配列": [1, 2, 3],
  "オブジェクト": {"a": 1}
}
''')

for key, value in sample.items():
    print(f"  {key}: {value} → Python型: {type(value).__name__}")
```

:::hint
JSONでは `true`/`false`/`null` だけど、
Pythonでは `True`/`False`/`None` だよ。
`json.loads()` が{自動|じどう}で{変換|へんかん}してくれるから{安心|あんしん}してね！
:::

## やってみよう

{海賊|かいぞく}の{宝|たから}データを{解析|かいせき}して、{金貨|きんか}の{合計|ごうけい}を{出|だ}そう！

```python runnable
import json

treasure_json = '{"treasures": [{"name": "赤い宝箱", "gold": 150}, {"name": "青い宝箱", "gold": 80}, {"name": "金の宝箱", "gold": 120}]}'

data = json.loads(treasure_json)

total_gold = 0
for chest in data["treasures"]:
    print(f"{chest['name']}: {chest['gold']}枚")
    total_gold += chest["gold"]

print(f"\n金貨の合計: {total_gold}枚")
```

## まとめ

- **JSON**：プログラム{同士|どうし}でデータをやりとりする{書|か}き{方|かた}
- `json.loads()`：JSON{文字列|もじれつ} → Pythonの{辞書|じしょ}やリスト
- `json.dumps()`：Pythonのデータ → JSON{文字列|もじれつ}
- `ensure_ascii=False`：{日本語|にほんご}をそのまま{表示|ひょうじ}
- `indent=2`：見やすく{字下|じさ}げ
- {入|い}れ{子|こ}データは `[ ]` を{連続|れんぞく}して{辿|たど}る
- JSONはWebの{世界|せかい}でとてもよく使われているよ！
