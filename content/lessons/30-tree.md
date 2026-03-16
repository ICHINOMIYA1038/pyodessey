---
title: "木構造"
slug: "tree"
order: 30
description: "データの木を育てよう"
world: "sky"
challenge:
  description: "ネストされた辞書で表現された木のノード数を再帰で数えて表示しよう！"
  starterCode: "tree = {\"value\": 1, \"children\": [{\"value\": 2, \"children\": []}, {\"value\": 3, \"children\": [{\"value\": 4, \"children\": []}]}]}\n\ndef count_nodes(node):\n    # ここにコードを書こう\n    pass\n\nprint(count_nodes(tree))\n"
  expectedOutput: "4"
---

# 木構造

:::sensei
{空|そら}の{世界|せかい}の{最後|さいご}のレッスンだよ。
今日は「{木構造|きこうぞう}（ツリー）」を学ぼう。
{空|そら}から{地上|ちじょう}を{見下|みお}ろすと、{川|かわ}が{枝分|えだわ}かれしているのが見えるよね。
あれがまさに{木構造|きこうぞう}のイメージなんだ！
:::

:::student
プログラミングの「木」って、{本物|ほんもの}の{木|き}とは{違|ちが}うんでしょ？
:::

:::sensei
{形|かたち}は{似|に}ているよ！
ただし、プログラミングの{木|き}は**{上下|じょうげ}{逆|ぎゃく}**。
{根|ね}っこ（ルート）が{一番|いちばん}{上|うえ}にあって、
{下|した}に{向|む}かって{枝分|えだわ}かれしていくんだ。
:::

## {木構造|きこうぞう}ってなに？

{木構造|きこうぞう}は、データが{親子関係|おやこかんけい}で{繋|つな}がった{構造|こうぞう}。
パソコンのフォルダ{構造|こうぞう}や{家系図|かけいず}を{思|おも}い{浮|う}かべてみて。

```python runnable
# 家系図をイメージしよう
family = {
    "name": "おじいちゃん",
    "children": [
        {
            "name": "おとうさん",
            "children": [
                {"name": "わたし", "children": []},
                {"name": "いもうと", "children": []},
            ]
        },
        {
            "name": "おじさん",
            "children": [
                {"name": "いとこ", "children": []},
            ]
        }
    ]
}

# 木を表示する関数
def show_tree(node, indent=0):
    print("  " * indent + "├─ " + node["name"])
    for child in node["children"]:
        show_tree(child, indent + 1)

print("=== 家系図 ===")
show_tree(family)
```

:::student
おお、{再帰|さいき}だ！ {前|まえ}のレッスンで学んだやつ！
{木|き}の{表示|ひょうじ}に{再帰|さいき}がピッタリなんだね。
:::

:::hint
{木構造|きこうぞう}の{用語|ようご}：
- **ルート（{根|ね}）**：{一番|いちばん}{上|うえ}のノード
- **ノード（{節|ふし}）**：{木|き}の{各|かく}ポイント
- **{葉|は}（リーフ）**：{子|こ}がないノード
- **{親|おや}**：{上|うえ}のノード、**{子|こ}**：{下|した}のノード
:::

## {辞書|じしょ}で{木|き}を{作|つく}ろう

{空|そら}の{世界|せかい}のマップを{木構造|きこうぞう}で{表現|ひょうげん}してみよう。

```python runnable
# 空の世界のエリアマップ
sky_world = {
    "value": "天空の城",
    "children": [
        {
            "value": "雲の港",
            "children": [
                {"value": "風の桟橋", "children": []},
                {"value": "霧の倉庫", "children": []},
            ]
        },
        {
            "value": "星の塔",
            "children": [
                {
                    "value": "月の間",
                    "children": [
                        {"value": "秘密の部屋", "children": []},
                    ]
                },
            ]
        },
        {
            "value": "虹の庭園",
            "children": []
        },
    ]
}

def show_map(node, prefix="", is_last=True):
    connector = "└── " if is_last else "├── "
    print(prefix + connector + node["value"])

    new_prefix = prefix + ("    " if is_last else "│   ")
    children = node["children"]
    for i, child in enumerate(children):
        show_map(child, new_prefix, i == len(children) - 1)

print("=== 空の世界マップ ===")
show_map(sky_world)
```

:::student
フォルダ{構造|こうぞう}みたい！
パソコンの{中|なか}もこうなっているのかな？
:::

:::sensei
まさにそう！ ファイルシステムは{木構造|きこうぞう}そのものだよ。
:::

## ノードを{数|かぞ}えよう

:::sensei
{木|き}の{中|なか}にノードがいくつあるか{数|かぞ}えてみよう。
{再帰|さいき}を{使|つか}えばかんたんだよ。
:::

```python runnable
def count_nodes(node):
    """ノードの数を数える"""
    count = 1  # 自分自身を数える
    for child in node["children"]:
        count += count_nodes(child)  # 子の数を足す
    return count

# かんたんな木
simple_tree = {
    "value": 1,
    "children": [
        {"value": 2, "children": []},
        {
            "value": 3,
            "children": [
                {"value": 4, "children": []},
            ]
        },
    ]
}

print(f"ノード数: {count_nodes(simple_tree)}")  # 4

# 空の世界マップのノード数
sky_world = {
    "value": "天空の城",
    "children": [
        {
            "value": "雲の港",
            "children": [
                {"value": "風の桟橋", "children": []},
                {"value": "霧の倉庫", "children": []},
            ]
        },
        {
            "value": "星の塔",
            "children": [
                {
                    "value": "月の間",
                    "children": [
                        {"value": "秘密の部屋", "children": []},
                    ]
                },
            ]
        },
        {"value": "虹の庭園", "children": []},
    ]
}

print(f"空の世界のエリア数: {count_nodes(sky_world)}")  # 7
```

:::hint
ノードを{数|かぞ}えるコツ：
「自分（1）＋ すべての{子|こ}のノード{数|すう}」を{再帰|さいき}で{計算|けいさん}する。
{葉|は}ノード（{子|こ}がない）では {子|こ}のループが{回|まわ}らないから、1が{返|かえ}る。
:::

## {木|き}の{探索|たんさく}：{行きがけ順|いきがけじゅん}（Preorder）

:::sensei
{木|き}のすべてのノードを{順番|じゅんばん}に{訪|おとず}れることを
「{走査|そうさ}（トラバーサル）」というよ。
まずは「{行きがけ順|いきがけじゅん}（Preorder）」を学ぼう。
自分を{先|さき}に{処理|しょり}してから、{子|こ}を{訪|おとず}れる{方法|ほうほう}だ。
:::

```python runnable
def preorder(node, result=None):
    """行きがけ順: 自分 → 子（左から右）"""
    if result is None:
        result = []

    result.append(node["value"])  # まず自分を記録

    for child in node["children"]:
        preorder(child, result)   # 次に子を訪問

    return result

# 数字の木
number_tree = {
    "value": 1,
    "children": [
        {
            "value": 2,
            "children": [
                {"value": 4, "children": []},
                {"value": 5, "children": []},
            ]
        },
        {
            "value": 3,
            "children": [
                {"value": 6, "children": []},
            ]
        },
    ]
}

print("=== 行きがけ順（Preorder） ===")
print(f"訪問順: {preorder(number_tree)}")

# どう動いているか見てみよう
def preorder_verbose(node, depth=0):
    indent = "  " * depth
    print(f"{indent}訪問: {node['value']}")
    for child in node["children"]:
        preorder_verbose(child, depth + 1)

print("\n=== 動きを追跡 ===")
preorder_verbose(number_tree)
```

## {二分木|にぶんぎ}：{子|こ}が2つまでの{木|き}

:::sensei
{特|とく}に{重要|じゅうよう}なのが「{二分木|にぶんぎ}（バイナリツリー）」。
{各|かく}ノードの{子|こ}が**{最大|さいだい}2つ**（{左|ひだり}と{右|みぎ}）の{木|き}だよ。
:::

```python runnable
# 二分木をクラスで作ってみよう
class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

# 木を組み立てる
#       10
#      /  \
#     5    15
#    / \     \
#   3   7    20

tree = TreeNode(10,
    left=TreeNode(5,
        left=TreeNode(3),
        right=TreeNode(7)
    ),
    right=TreeNode(15,
        right=TreeNode(20)
    )
)

# 行きがけ順（Preorder）
def preorder(node):
    if node is None:
        return []
    return [node.value] + preorder(node.left) + preorder(node.right)

# 通りがけ順（Inorder）- 二分木で特に重要！
def inorder(node):
    if node is None:
        return []
    return inorder(node.left) + [node.value] + inorder(node.right)

# 帰りがけ順（Postorder）
def postorder(node):
    if node is None:
        return []
    return postorder(node.left) + postorder(node.right) + [node.value]

print(f"行きがけ順: {preorder(tree)}")
print(f"通りがけ順: {inorder(tree)}")
print(f"帰りがけ順: {postorder(tree)}")
```

:::student
{通|とお}りがけ{順|じゅん}だと{小|ちい}さい{順|じゅん}に{並|なら}んでる！
:::

:::sensei
いいところに{気|き}づいたね！
「{二分探索木|にぶんたんさくぎ}」は{左|ひだり}の{子|こ}が{小|ちい}さく、{右|みぎ}の{子|こ}が{大|おお}きいから、
{通|とお}りがけ{順|じゅん}で{訪|おとず}れると{自動的|じどうてき}にソートされるんだ。
:::

## {木|き}の{深|ふか}さを{調|しら}べよう

```python runnable
def tree_depth(node):
    """木の深さ（高さ）を求める"""
    if not node["children"]:
        return 1  # 葉ノードの深さは1
    child_depths = []
    for child in node["children"]:
        child_depths.append(tree_depth(child))
    return 1 + max(child_depths)

def find_leaves(node):
    """葉ノード（子がないノード）を見つける"""
    if not node["children"]:
        return [node["value"]]
    leaves = []
    for child in node["children"]:
        leaves.extend(find_leaves(child))
    return leaves

# テスト用の木
sky_tree = {
    "value": "天空の城",
    "children": [
        {
            "value": "雲の港",
            "children": [
                {"value": "風の桟橋", "children": []},
                {"value": "霧の倉庫", "children": []},
            ]
        },
        {
            "value": "星の塔",
            "children": [
                {
                    "value": "月の間",
                    "children": [
                        {"value": "秘密の部屋", "children": []},
                    ]
                },
            ]
        },
    ]
}

def count_nodes(node):
    count = 1
    for child in node["children"]:
        count += count_nodes(child)
    return count

print(f"木の深さ: {tree_depth(sky_tree)}")
print(f"葉ノード: {find_leaves(sky_tree)}")
print(f"ノード数: {count_nodes(sky_tree)}")
```

:::hint
{木|き}の{深|ふか}さ（{高|たか}さ）は「ルートから{一番|いちばん}{遠|とお}い{葉|は}までの{距離|きょり}」。
{再帰|さいき}で「1 + {子|こ}の{深|ふか}さの{最大値|さいだいち}」を{計算|けいさん}するよ。
:::

## {木|き}で{値|あたい}を{探|さが}す

```python runnable
def search_tree(node, target):
    """木の中から値を探す"""
    if node["value"] == target:
        return True

    for child in node["children"]:
        if search_tree(child, target):
            return True

    return False

def find_path(node, target, path=None):
    """ルートからターゲットまでの道を見つける"""
    if path is None:
        path = []

    path.append(node["value"])

    if node["value"] == target:
        return path.copy()

    for child in node["children"]:
        result = find_path(child, target, path)
        if result:
            return result

    path.pop()  # この道は違った、戻る
    return None

# 空の世界マップ
sky = {
    "value": "天空の城",
    "children": [
        {
            "value": "雲の港",
            "children": [
                {"value": "風の桟橋", "children": []},
                {"value": "霧の倉庫", "children": []},
            ]
        },
        {
            "value": "星の塔",
            "children": [
                {
                    "value": "月の間",
                    "children": [
                        {"value": "秘密の部屋", "children": []},
                    ]
                },
            ]
        },
    ]
}

# 探してみよう
print(f"秘密の部屋はある？ {search_tree(sky, '秘密の部屋')}")
print(f"太陽の神殿はある？ {search_tree(sky, '太陽の神殿')}")

# 道を見つけよう
path = find_path(sky, "秘密の部屋")
print(f"\n秘密の部屋への道:")
print(" → ".join(path))
```

:::student
{木|き}の{中|なか}を{探|さが}すのも{再帰|さいき}なんだね。
{道|みち}を{見|み}つけるのは{冒険|ぼうけん}のルート{探|さが}しみたい！
:::

## やってみよう

{木構造|きこうぞう}のノードを{数|かぞ}える{関数|かんすう}を{作|つく}ろう！

```python runnable
# 練習: ノード数を数えよう
tree = {
    "value": 1,
    "children": [
        {"value": 2, "children": []},
        {
            "value": 3,
            "children": [
                {"value": 4, "children": []},
            ]
        },
    ]
}

def count_nodes(node):
    count = 1  # 自分を数える
    for child in node["children"]:
        count += count_nodes(child)
    return count

print(count_nodes(tree))  # 4
```

## まとめ

- **{木構造|きこうぞう}**：{親子関係|おやこかんけい}で{繋|つな}がったデータ{構造|こうぞう}
- **ノード**：{木|き}の{各|かく}ポイント。**ルート**が{一番|いちばん}{上|うえ}、**{葉|は}**が{末端|まったん}
- {辞書|じしょ}やクラスで{木|き}を{表現|ひょうげん}できる
- **{走査|そうさ}（トラバーサル）**：すべてのノードを{訪|おとず}れる{方法|ほうほう}
  - {行きがけ順|いきがけじゅん}（Preorder）：自分 → {子|こ}
  - {通りがけ順|とおりがけじゅん}（Inorder）：{左|ひだり} → 自分 → {右|みぎ}
  - {帰りがけ順|かえりがけじゅん}（Postorder）：{子|こ} → 自分
- **{二分木|にぶんぎ}**：{子|こ}が{最大|さいだい}2つの{木|き}
- {木構造|きこうぞう}の{操作|そうさ}には**{再帰|さいき}**がピッタリ！
- {空|そら}の{世界|せかい}のマップも、フォルダ{構造|こうぞう}も、{家系図|かけいず}も、みんな{木|き}！
