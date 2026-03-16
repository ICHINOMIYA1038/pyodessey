---
title: "グラフ探索"
slug: "graph"
order: 31
description: "空の道を探索しよう"
world: "sky"
challenge:
  description: "空の島のグラフが与えられています。BFS（幅優先探索）を使って、島「A」から島「F」への道があるかを調べよう！道があれば「Found」、なければ「Not Found」と表示してね。"
  starterCode: "from collections import deque\n\ngraph = {\"A\": [\"B\", \"C\"], \"B\": [\"D\"], \"C\": [\"E\"], \"D\": [\"F\"], \"E\": [], \"F\": []}\n\n# BFSで「A」から「F」への道を探そう\n"
  expectedOutput: "Found"
---

# グラフ{探索|たんさく}

:::sensei
いよいよ「空」の{世界|せかい}だ！
ここでは{高度|こうど}なアルゴリズムを{学|まな}ぶよ。
まずは「グラフ{探索|たんさく}」から始めよう。
:::

:::student
グラフって、{棒|ぼう}グラフとか{円|えん}グラフのこと？
:::

:::sensei
{違|ちが}うんだ！プログラミングの「グラフ」は、
{点|てん}と{線|せん}でつながった{構造|こうぞう}のこと。
空に{浮|う}かぶ{島|しま}と、それをつなぐ{橋|はし}を
イメージしてみて！
:::

## グラフってなに？

グラフは「ノード（{点|てん}）」と「エッジ（{線|せん}）」でできた{構造|こうぞう}。
空の{島|しま}がノード、{島|しま}をつなぐ{橋|はし}がエッジだと{考|かんが}えよう！

```python runnable
# 空の島をグラフで表現しよう！
# 「隣接リスト」という方法を使う

sky_islands = {
    "スタート島": ["風の島", "雲の島"],
    "風の島": ["虹の島"],
    "雲の島": ["星の島"],
    "虹の島": ["ゴール島"],
    "星の島": ["ゴール島"],
    "ゴール島": []
}

# 各島とつながっている島を表示
for island, bridges in sky_islands.items():
    if bridges:
        print(f"🏝️ {island} → {', '.join(bridges)}")
    else:
        print(f"🏝️ {island} → （行き止まり）")
```

:::hint
{辞書|じしょ}（dict）を使って、各ノードから{行|い}けるノードのリストを{保存|ほぞん}する。
これを「{隣接|りんせつ}リスト」と{呼|よ}ぶよ！
:::

## BFS（{幅|はば}{優先|ゆうせん}{探索|たんさく}）

:::sensei
BFSは「{近|ちか}いところから{順番|じゅんばん}に{探|さが}す」{方法|ほうほう}だ。
空の{島|しま}を{探検|たんけん}するとき、まず{隣|となり}の{島|しま}を{全部|ぜんぶ}
{調|しら}べてから、その{先|さき}の{島|しま}を{調|しら}べる。
{波|なみ}が{広|ひろ}がるように{探索|たんさく}するイメージだよ！
:::

:::student
{近|ちか}い{島|しま}から{順番|じゅんばん}にってことだね！
:::

```python runnable
from collections import deque

def bfs(graph, start):
    """BFS: 近いところから順番に探索する"""
    visited = []          # 訪問した島のリスト
    queue = deque([start])  # 次に訪問する島のキュー

    while queue:
        island = queue.popleft()  # キューの先頭から取り出す
        if island not in visited:
            visited.append(island)
            print(f"🔍 {island} を探索中...")
            # まだ訪問していない隣の島をキューに追加
            for neighbor in graph[island]:
                if neighbor not in visited:
                    queue.append(neighbor)

    return visited

# 空の島マップ
sky_map = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["E"],
    "D": ["F"],
    "E": [],
    "F": []
}

print("=== BFS探索 ===")
result = bfs(sky_map, "A")
print(f"\n訪問した順番: {result}")
```

:::hint
BFSでは`deque`（デック）を使う。
`append()`で{後|うし}ろに{追加|ついか}し、`popleft()`で{前|まえ}から{取|と}り出す。
これで「{先|さき}に入れたものから{先|さき}に出す」（FIFO）ができる！
:::

## DFS（{深|ふか}さ{優先|ゆうせん}{探索|たんさく}）

:::sensei
もう1つの{探|さが}し方が DFS だ。
こっちは「{行|い}けるところまで{行|い}って、
{行|い}き{止|ど}まりになったら{戻|もど}る」{方法|ほうほう}。
{迷路|めいろ}を{片|かた}っ{端|ぱし}から{進|すす}むイメージだよ！
:::

```python runnable
def dfs(graph, start, visited=None):
    """DFS: 行けるところまで深く探索する（再帰版）"""
    if visited is None:
        visited = []

    visited.append(start)
    print(f"🔍 {start} を探索中...")

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    return visited

# 空の島マップ
sky_map = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["E"],
    "D": ["F"],
    "E": [],
    "F": []
}

print("=== DFS探索 ===")
result = dfs(sky_map, "A")
print(f"\n訪問した順番: {result}")
```

:::student
BFSとDFSで{訪問|ほうもん}する{順番|じゅんばん}が{違|ちが}うんだね！
:::

:::sensei
そう！BFSは A→B→C→D→E→F と{幅|はば}を{広|ひろ}げ、
DFSは A→B→D→F→C→E と{深|ふか}く{進|すす}む。
{問題|もんだい}によって{使|つか}い{分|わ}けるんだ！
:::

## BFSで{道|みち}を{探|さが}す

BFSは「{最短|さいたん}の{道|みち}」を{見|み}つけるのが{得意|とくい}！
{目的地|もくてきち}までの{道|みち}があるか{調|しら}べてみよう。

```python runnable
from collections import deque

def find_path_bfs(graph, start, goal):
    """BFSでstartからgoalへの道を探す"""
    queue = deque([(start, [start])])  # (現在地, 経路) のペア
    visited = set()

    while queue:
        current, path = queue.popleft()

        if current == goal:
            return path  # 見つかった！

        if current in visited:
            continue
        visited.add(current)

        for neighbor in graph[current]:
            if neighbor not in visited:
                queue.append((neighbor, path + [neighbor]))

    return None  # 道がなかった

# 空の島マップ
sky_map = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["E"],
    "D": ["F"],
    "E": [],
    "F": []
}

# AからFへの道を探す
path = find_path_bfs(sky_map, "A", "F")
if path:
    print(f"道が見つかった！: {' → '.join(path)}")
else:
    print("道が見つからなかった...")

# AからEへの道も探してみる
path2 = find_path_bfs(sky_map, "A", "E")
if path2:
    print(f"道が見つかった！: {' → '.join(path2)}")
```

## BFS vs DFS：{使|つか}い{分|わ}け

```python runnable
from collections import deque

# もっと複雑な空の島マップ
big_map = {
    "スタート": ["A", "B"],
    "A": ["C", "D"],
    "B": ["E", "F"],
    "C": ["ゴール"],
    "D": [],
    "E": ["ゴール"],
    "F": [],
    "ゴール": []
}

# BFS: 最短ルートを見つけやすい
def bfs_path(graph, start, goal):
    queue = deque([(start, [start])])
    visited = set()
    while queue:
        current, path = queue.popleft()
        if current == goal:
            return path
        if current in visited:
            continue
        visited.add(current)
        for neighbor in graph[current]:
            if neighbor not in visited:
                queue.append((neighbor, path + [neighbor]))
    return None

# DFS: 経路の存在確認が簡単
def dfs_exists(graph, start, goal, visited=None):
    if visited is None:
        visited = set()
    if start == goal:
        return True
    visited.add(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            if dfs_exists(graph, neighbor, goal, visited):
                return True
    return False

path = bfs_path(big_map, "スタート", "ゴール")
print(f"BFSの最短ルート: {' → '.join(path)}")
print(f"ステップ数: {len(path) - 1}")

exists = dfs_exists(big_map, "スタート", "ゴール")
print(f"\nDFSで道はある？: {exists}")
```

:::sensei
BFSは「{最短|さいたん}ルート」を{見|み}つけたいとき、
DFSは「{道|みち}があるかどうか」を{調|しら}べたいときに{便利|べんり}だ。
{覚|おぼ}えておこう！
:::

## まとめ

:::sensei
グラフ{探索|たんさく}をまとめるよ：
- **グラフ** = ノード（{点|てん}）とエッジ（{線|せん}）の{構造|こうぞう}
- **{隣接|りんせつ}リスト** = {辞書|じしょ}で{表現|ひょうげん}する
- **BFS** = {近|ちか}くから{広|ひろ}げて{探|さが}す（{最短|さいたん}{経路|けいろ}に{強|つよ}い）
- **DFS** = {深|ふか}く{進|すす}んで{戻|もど}る（{再帰|さいき}で{書|か}きやすい）
:::

:::student
空の{島|しま}を{探検|たんけん}しながら{学|まな}べて{楽|たの}しかった！
次も{楽|たの}しみ！
:::
