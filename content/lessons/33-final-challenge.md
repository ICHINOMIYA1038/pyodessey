---
title: "最終チャレンジ"
slug: "final-challenge"
order: 33
description: "すべての力を試そう"
world: "sky"
challenge:
  description: "2Dグリッドの迷路をBFSで解こう！左上(0,0)から右下(3,3)への最短経路の長さ（スタートとゴールを含む）を表示してね。0は通路、1は壁だよ。"
  starterCode: "from collections import deque\n\nmaze = [\n    [0, 0, 1, 0],\n    [0, 0, 0, 0],\n    [1, 0, 1, 0],\n    [0, 0, 0, 0]\n]\n\n# BFSで最短経路の長さを求めよう\n"
  expectedOutput: "7"
---

# {最終|さいしゅう}チャレンジ

:::sensei
ここが{最後|さいご}の{試練|しれん}の{場|ば}だ。
{草原|そうげん}で{基礎|きそ}を{学|まな}び、
{街|まち}で{道具|どうぐ}を{手|て}に入れ、
{城|しろ}で{技|わざ}を{磨|みが}き、
そして{空|そら}で{最強|さいきょう}のアルゴリズムを{身|み}につけた。
{今|いま}こそ、すべての{力|ちから}を{合|あ}わせるときだ！
:::

:::student
ここまで{来|き}たんだ...！
{全部|ぜんぶ}{使|つか}って{戦|たたか}うぞ！
:::

## {冒険|ぼうけん}の{振|ふ}り{返|かえ}り

:::sensei
まずは{今|いま}まで{学|まな}んだことを{思|おも}い{出|だ}そう。
{全|すべ}ての{技|わざ}を{組|く}み{合|あ}わせるのが、
{真|しん}のプログラマーの{力|ちから}だ！
:::

```python runnable
# これまでの冒険で手に入れた武器たち

skills = {
    "草原": ["変数", "条件分岐", "ループ", "リスト", "関数"],
    "街":   ["文字列操作", "辞書", "クラス", "エラー処理"],
    "城":   ["再帰", "ソート", "探索", "リスト内包表記"],
    "空":   ["グラフ探索", "動的計画法", "BFS", "DFS"]
}

total = 0
for world, tools in skills.items():
    print(f"🌍 {world}の世界で学んだこと:")
    for tool in tools:
        print(f"   ⚔️ {tool}")
    total += len(tools)
    print()

print(f"合計 {total} の技を習得！")
```

## {技|わざ}の{組|く}み{合|あ}わせ：{再帰|さいき} + メモ{化|か}

:::sensei
{強|つよ}い{技|わざ}は{組|く}み{合|あ}わせるとさらに{強|つよ}くなる。
まずは{再帰|さいき}とメモ{化|か}の{組|く}み{合|あ}わせだ！
:::

```python runnable
# 再帰 + メモ化：空の階段を登る方法
# 1段、2段、3段のいずれかで登れる

def climb(n, memo={}):
    """n段の階段を登る方法の数"""
    if n in memo:
        return memo[n]
    if n <= 0:
        return 1 if n == 0 else 0

    result = climb(n - 1, memo) + climb(n - 2, memo) + climb(n - 3, memo)
    memo[n] = result
    return result

print("=== 空の階段チャレンジ ===")
for i in range(1, 11):
    ways = climb(i)
    bar = "█" * min(ways, 30)
    print(f"{i:2d}段: {ways:5d}通り {bar}")
```

## {技|わざ}の{組|く}み{合|あ}わせ：グラフ + クラス

:::sensei
グラフとクラスを{組|く}み{合|あ}わせると、
もっと{複雑|ふくざつ}な{世界|せかい}を{表現|ひょうげん}できる！
:::

```python runnable
# クラスでグラフを表現
class SkyWorld:
    def __init__(self):
        self.islands = {}

    def add_island(self, name, treasure=None):
        self.islands[name] = {
            "connections": [],
            "treasure": treasure
        }

    def add_bridge(self, island1, island2):
        self.islands[island1]["connections"].append(island2)
        self.islands[island2]["connections"].append(island1)

    def find_treasure(self, start, target_treasure):
        """BFSで宝物を探す"""
        from collections import deque
        queue = deque([(start, [start])])
        visited = set()

        while queue:
            current, path = queue.popleft()
            if current in visited:
                continue
            visited.add(current)

            info = self.islands[current]
            if info["treasure"] == target_treasure:
                return path

            for neighbor in info["connections"]:
                if neighbor not in visited:
                    queue.append((neighbor, path + [neighbor]))
        return None

# 空の世界を構築
world = SkyWorld()
world.add_island("出発の島")
world.add_island("風の島", "風の羽")
world.add_island("雷の島", "雷の石")
world.add_island("虹の島", "虹の結晶")
world.add_island("星の島", "伝説の剣")
world.add_island("月の島")

world.add_bridge("出発の島", "風の島")
world.add_bridge("出発の島", "雷の島")
world.add_bridge("風の島", "虹の島")
world.add_bridge("雷の島", "月の島")
world.add_bridge("虹の島", "星の島")
world.add_bridge("月の島", "星の島")

# 伝説の剣を探す冒険！
path = world.find_treasure("出発の島", "伝説の剣")
if path:
    print("伝説の剣への道:")
    for i, island in enumerate(path):
        treasure = world.islands[island]["treasure"]
        t = f" 【{treasure}を発見！】" if treasure else ""
        print(f"  {'→ ' if i > 0 else '  '}{island}{t}")
```

## {技|わざ}の{組|く}み{合|あ}わせ：2Dグリッド + BFS

:::sensei
いよいよ{最終|さいしゅう}{決戦|けっせん}に{近|ちか}づいてきた。
2Dグリッド（{格子状|こうしじょう}のマップ）をBFSで{探索|たんさく}する
{方法|ほうほう}を{学|まな}ぼう。これが{最後|さいご}の{武器|ぶき}だ！
:::

:::student
2Dグリッドって、ゲームのマップみたいな？
:::

:::sensei
まさにそう！{上下左右|じょうげさゆう}に{動|うご}ける
マス{目|め}のマップだよ。
:::

```python runnable
from collections import deque

def solve_maze(maze):
    """2Dグリッドの迷路をBFSで解く"""
    rows = len(maze)
    cols = len(maze[0])

    # 上下左右の移動
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    # BFS: (行, 列, 経路の長さ)
    queue = deque([(0, 0, 1)])  # スタートは(0,0)、長さ1
    visited = set()
    visited.add((0, 0))

    while queue:
        row, col, length = queue.popleft()

        # ゴールに到達？
        if row == rows - 1 and col == cols - 1:
            return length

        # 上下左右を探索
        for dr, dc in directions:
            new_row = row + dr
            new_col = col + dc

            if (0 <= new_row < rows and
                0 <= new_col < cols and
                maze[new_row][new_col] == 0 and
                (new_row, new_col) not in visited):
                visited.add((new_row, new_col))
                queue.append((new_row, new_col, length + 1))

    return -1  # ゴールに到達できない

# 空の迷宮マップ (0=通路、1=壁)
maze = [
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [1, 0, 1, 0],
    [0, 0, 0, 0]
]

# マップを表示
print("=== 空の迷宮 ===")
for r, row in enumerate(maze):
    for c, cell in enumerate(row):
        if r == 0 and c == 0:
            print("🟢", end="")
        elif r == 3 and c == 3:
            print("⭐", end="")
        elif cell == 1:
            print("🧱", end="")
        else:
            print("⬜", end="")
    print()

result = solve_maze(maze)
print(f"\n最短経路の長さ: {result}")
```

## {経路|けいろ}を{表示|ひょうじ}してみよう

```python runnable
from collections import deque

def solve_maze_with_path(maze):
    """迷路の最短経路を復元する"""
    rows = len(maze)
    cols = len(maze[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    # BFS: (行, 列, 経路リスト)
    queue = deque([(0, 0, [(0, 0)])])
    visited = set()
    visited.add((0, 0))

    while queue:
        row, col, path = queue.popleft()

        if row == rows - 1 and col == cols - 1:
            return path

        for dr, dc in directions:
            nr, nc = row + dr, col + dc
            if (0 <= nr < rows and 0 <= nc < cols and
                maze[nr][nc] == 0 and (nr, nc) not in visited):
                visited.add((nr, nc))
                queue.append((nr, nc, path + [(nr, nc)]))

    return None

maze = [
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [1, 0, 1, 0],
    [0, 0, 0, 0]
]

path = solve_maze_with_path(maze)

if path:
    print("=== 最短経路 ===")
    path_set = set(path)
    for r in range(len(maze)):
        for c in range(len(maze[0])):
            if (r, c) == (0, 0):
                print("🟢", end="")
            elif (r, c) == (len(maze)-1, len(maze[0])-1):
                print("⭐", end="")
            elif (r, c) in path_set:
                print("🔵", end="")
            elif maze[r][c] == 1:
                print("🧱", end="")
            else:
                print("⬜", end="")
        print()

    print(f"\n経路: {' → '.join(f'({r},{c})' for r,c in path)}")
    print(f"経路の長さ: {len(path)}")
```

## {総合|そうごう}{問題|もんだい}：DP + グリッド

:::sensei
{最後|さいご}に、DPとグリッドを{組|く}み{合|あ}わせた{問題|もんだい}だ。
グリッドの{左上|ひだりうえ}から{右下|みぎした}まで、
{右|みぎ}か{下|した}にしか{進|すす}めないとき、
{経路|けいろ}は{何通|なんとお}りあるかな？
:::

```python runnable
# DP: グリッド上の経路の数
def count_paths(rows, cols):
    """右と下にしか進めないときの経路数"""
    dp = [[0] * cols for _ in range(rows)]

    # 最初の行と列は1通りしかない
    for i in range(rows):
        dp[i][0] = 1
    for j in range(cols):
        dp[0][j] = 1

    # それ以外は「上から来る」+「左から来る」
    for i in range(1, rows):
        for j in range(1, cols):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]

    # テーブルを表示
    print("DPテーブル:")
    for row in dp:
        print("  " + "  ".join(f"{x:3d}" for x in row))

    return dp[rows-1][cols-1]

result = count_paths(4, 4)
print(f"\n4×4グリッドの経路数: {result}通り")
```

## すべてを{合|あ}わせた{冒険|ぼうけん}

```python runnable
from collections import deque

# 最終冒険：複数のスキルを組み合わせる

# 1. 辞書とクラスで世界を構築
class QuestMap:
    def __init__(self, grid):
        self.grid = grid
        self.rows = len(grid)
        self.cols = len(grid[0])

    def bfs_shortest(self, start, goal):
        """BFSで最短経路"""
        queue = deque([(start, 1)])
        visited = {start}
        directions = [(-1,0),(1,0),(0,-1),(0,1)]

        while queue:
            (r, c), dist = queue.popleft()
            if (r, c) == goal:
                return dist
            for dr, dc in directions:
                nr, nc = r+dr, c+dc
                if (0 <= nr < self.rows and 0 <= nc < self.cols
                    and self.grid[nr][nc] == 0
                    and (nr, nc) not in visited):
                    visited.add((nr, nc))
                    queue.append(((nr, nc), dist + 1))
        return -1

    def count_reachable(self, start):
        """到達可能なマスの数"""
        queue = deque([start])
        visited = {start}
        directions = [(-1,0),(1,0),(0,-1),(0,1)]
        while queue:
            r, c = queue.popleft()
            for dr, dc in directions:
                nr, nc = r+dr, c+dc
                if (0 <= nr < self.rows and 0 <= nc < self.cols
                    and self.grid[nr][nc] == 0
                    and (nr, nc) not in visited):
                    visited.add((nr, nc))
                    queue.append((nr, nc))
        return len(visited)

# 2. 冒険マップを作成
quest = [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0]
]

qmap = QuestMap(quest)

# 3. 分析
print("=== 最終冒険レポート ===\n")
shortest = qmap.bfs_shortest((0,0), (4,4))
reachable = qmap.count_reachable((0,0))
total_open = sum(row.count(0) for row in quest)

print(f"マップサイズ: {qmap.rows}×{qmap.cols}")
print(f"通路マスの数: {total_open}")
print(f"到達可能マス: {reachable}")
print(f"最短経路: {shortest}マス")
print(f"\n冒険完了！🎉")
```

## {旅|たび}の{終|お}わり

:::sensei
{長|なが}い{冒険|ぼうけん}だったね。
{草原|そうげん}で{変数|へんすう}という{名前|なまえ}のつけ方を{覚|おぼ}え、
{街|まち}で{辞書|じしょ}やクラスという{道具|どうぐ}を{手|て}に入れ、
{城|しろ}で{再帰|さいき}やソートの{技|わざ}を{磨|みが}き、
{空|そら}でグラフ{探索|たんさく}とDPという{最強|さいきょう}の{武器|ぶき}を{得|え}た。
:::

:::student
{全部|ぜんぶ}つながっているんだね。
{変数|へんすう}がなければリストは{作|つく}れないし、
リストがなければグラフは{表現|ひょうげん}できない。
:::

:::sensei
その{通|とお}り。プログラミングは{積|つ}み{重|かさ}ねだ。
{今日|きょう}{学|まな}んだことは{明日|あした}の{土台|どだい}になる。
{君|きみ}はもう{立派|りっぱ}なプログラマーだ。
でも{忘|わす}れないでほしい ——
{学|まな}びの{旅|たび}に{終|お}わりはないということを。
:::

:::student
うん！もっと{強|つよ}くなって、
もっとすごいプログラムを{作|つく}るよ！
ありがとう、{師匠|ししょう}！
:::

:::sensei
こちらこそ。
さあ、{最後|さいご}のチャレンジに{挑|いど}もう。
{空|そら}の{迷宮|めいきゅう}を{解|と}き{明|あ}かすのだ！
:::
