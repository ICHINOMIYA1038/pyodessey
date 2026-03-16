---
title: "スタックとキュー"
slug: "stack-queue"
order: 29
description: "データの並び方を学ぼう"
world: "sky"
challenge:
  description: "スタックを使って、カッコの文字列 \"((())())\" が正しく閉じているか判定しよう。正しければ「OK」と表示してね！"
  starterCode: "s = \"((())())\"\nstack = []\n# ここにコードを書こう\n"
  expectedOutput: "OK"
---

# スタックとキュー

:::sensei
{空|そら}の{世界|せかい}では、{雲|くも}が{積|つ}み{重|かさ}なったり、
{星|ほし}が{列|れつ}を{作|つく}ったりしているよね。
今日はデータの「{並|なら}び{方|かた}」を学ぼう！
:::

:::student
データの{並|なら}び{方|かた}？ リストとは{違|ちが}うの？
:::

:::sensei
リストは「どこでも{自由|じゆう}にアクセスできる」けど、
**スタック**と**キュー**は「{入|い}れる{順番|じゅんばん}と{出|だ}す{順番|じゅんばん}にルールがある」んだ。
このルールがあるからこそ、{便利|べんり}な{場面|ばめん}がたくさんあるよ。
:::

## スタック：{最後|さいご}に{入|い}れたものが{最初|さいしょ}に{出|で}る

スタックは「**LIFO**」（Last In, First Out）。
{皿|さら}を{積|つ}み{重|かさ}ねるイメージだよ。
{一番|いちばん}{上|うえ}の{皿|さら}（{最後|さいご}に{置|お}いた{皿|さら}）から{取|と}る。

```python runnable
# スタック = Pythonのリストで作れる！
stack = []

# push: 上に積む（append）
stack.append("雲A")
print(f"積んだ: 雲A → {stack}")

stack.append("雲B")
print(f"積んだ: 雲B → {stack}")

stack.append("雲C")
print(f"積んだ: 雲C → {stack}")

print()

# pop: 上から取る（pop）
top = stack.pop()
print(f"取った: {top} → {stack}")

top = stack.pop()
print(f"取った: {top} → {stack}")

top = stack.pop()
print(f"取った: {top} → {stack}")
```

:::student
{最後|さいご}に{積|つ}んだ「{雲|くも}C」が{最初|さいしょ}に{出|で}てきた！
まさに{皿|さら}{積|づ}みみたいだね。
:::

:::hint
スタックの{操作|そうさ}はたった2つ：
- **push**（{積|つ}む）= `append()`
- **pop**（{取|と}る）= `pop()`
{一番|いちばん}{上|うえ}だけを見る **peek** もよく{使|つか}うよ（`stack[-1]`）。
:::

## スタックの{活用|かつよう}：{元|もと}に{戻|もど}す{機能|きのう}

:::sensei
スタックは「{元|もと}に{戻|もど}す（Undo）」に{使|つか}われているよ。
{空|そら}の{冒険|ぼうけん}で{通|とお}った{道|みち}を{覚|おぼ}えて、
{戻|もど}れるようにしてみよう。
:::

```python runnable
# 冒険の足跡をスタックで管理
history = []

def move_to(place):
    history.append(place)
    print(f"→ {place} に移動！  履歴: {history}")

def go_back():
    if history:
        left = history.pop()
        current = history[-1] if history else "スタート"
        print(f"← {left} から戻った！ 今: {current}  履歴: {history}")
    else:
        print("これ以上戻れない！")

# 冒険開始
move_to("雲の橋")
move_to("風の塔")
move_to("星の広場")
move_to("月の神殿")

print("\n--- 戻ろう ---")
go_back()
go_back()
print(f"\n今いる場所: {history[-1]}")
```

## カッコの{対応|たいおう}チェック

:::sensei
スタックの{超|ちょう}{定番|ていばん}の{使|つか}い{方|かた}を{教|おし}えるよ。
プログラミングでも{数学|すうがく}でも、カッコが{正|ただ}しく{閉|と}じているかチェックする{必要|ひつよう}があるよね。
:::

```python runnable
def check_brackets(text):
    stack = []
    for char in text:
        if char == "(":
            stack.append(char)  # 開きカッコを積む
        elif char == ")":
            if not stack:
                return False  # 対応する開きカッコがない！
            stack.pop()  # 対応する開きカッコを取り出す

    return len(stack) == 0  # 全部対応していればOK

# テストしてみよう
tests = [
    "(())",       # OK
    "((())())",   # OK
    "(()",        # NG - 閉じてない
    "())",        # NG - 開いてない
    "()()()",     # OK
]

for t in tests:
    result = "OK" if check_brackets(t) else "NG"
    print(f"{t:>12} → {result}")
```

:::student
なるほど！ 「(」が来たら{積|つ}んで、「)」が来たら{取|と}り{出|だ}す。
{最後|さいご}にスタックが{空|から}なら、全部{対応|たいおう}してるってことだね！
:::

## いろんなカッコに{対応|たいおう}しよう

```python runnable
def check_all_brackets(text):
    stack = []
    pairs = {")": "(", "]": "[", "}": "{"}

    for char in text:
        if char in "([{":
            stack.append(char)
        elif char in ")]}":
            if not stack:
                return False
            if stack[-1] != pairs[char]:
                return False  # 種類が違う！
            stack.pop()

    return len(stack) == 0

tests = [
    "{[()]}",       # OK
    "{[(])}",       # NG - 種類が合わない
    "([{}])()",     # OK
    "((({{}}))",    # NG
]

for t in tests:
    result = "OK" if check_all_brackets(t) else "NG"
    print(f"{t:>14} → {result}")
```

:::hint
3{種類|しゅるい}のカッコに{対応|たいおう}するには、
{辞書|じしょ}（dict）で「{閉|と}じカッコ → {開|ひら}きカッコ」の{対応|たいおう}を{作|つく}ると{便利|べんり}！
:::

## キュー：{最初|さいしょ}に{入|い}れたものが{最初|さいしょ}に{出|で}る

:::sensei
次はキューだよ。「**FIFO**」（First In, First Out）。
チケット{売|う}り{場|ば}の{行列|ぎょうれつ}を{想像|そうぞう}してみて。
{先|さき}に{並|なら}んだ{人|ひと}が{先|さき}に{買|か}えるよね。
:::

```python runnable
from collections import deque

# キュー = deque（デック）で作る
queue = deque()

# enqueue: 後ろに並ぶ（append）
queue.append("星A")
print(f"並んだ: 星A → {list(queue)}")

queue.append("星B")
print(f"並んだ: 星B → {list(queue)}")

queue.append("星C")
print(f"並んだ: 星C → {list(queue)}")

print()

# dequeue: 前から出る（popleft）
front = queue.popleft()
print(f"出発: {front} → {list(queue)}")

front = queue.popleft()
print(f"出発: {front} → {list(queue)}")

front = queue.popleft()
print(f"出発: {front} → {list(queue)}")
```

:::student
{最初|さいしょ}に{並|なら}んだ「{星|ほし}A」が{最初|さいしょ}に{出|で}る！
スタックとは{逆|ぎゃく}だね。
:::

:::hint
キューにはリストの `pop(0)` も{使|つか}えるけど、{遅|おそ}い！
`collections.deque` の `popleft()` は{高速|こうそく}だから、
キューを{作|つく}るときは `deque` を{使|つか}おう。
:::

## キューの{活用|かつよう}：メッセージ{処理|しょり}

```python runnable
from collections import deque

# 空の世界の通信システム
message_queue = deque()

# メッセージを送信（キューに入れる）
def send_message(msg):
    message_queue.append(msg)
    print(f"📨 送信: {msg}")

# メッセージを受信（キューから出す）
def receive_message():
    if message_queue:
        msg = message_queue.popleft()
        print(f"📬 受信: {msg}")
        return msg
    print("メッセージはありません")
    return None

# 通信してみよう
send_message("嵐が近づいています")
send_message("北の星が光っています")
send_message("雲の上に宝箱発見！")

print(f"\n未読: {len(message_queue)}件")
print()

# 順番に受信
receive_message()
receive_message()
receive_message()
receive_message()  # もうない
```

## スタックとキューの{比較|ひかく}

```python runnable
from collections import deque

print("=== 同じ順番で入れて、出す順番を比べよう ===")
print()

# 入れるデータ
data = ["雲", "風", "星", "月", "虹"]

# スタック（LIFO）
stack = []
for item in data:
    stack.append(item)

print(f"入れた順: {data}")
print()

# スタックから出す
print("スタック（LIFO - 後入れ先出し）:")
result_stack = []
while stack:
    result_stack.append(stack.pop())
print(f"  出た順: {result_stack}")

print()

# キュー（FIFO）
queue = deque()
for item in data:
    queue.append(item)

print("キュー（FIFO - 先入れ先出し）:")
result_queue = []
while queue:
    result_queue.append(queue.popleft())
print(f"  出た順: {result_queue}")
```

:::student
スタックは{入|い}れた{順番|じゅんばん}とは{逆|ぎゃく}に{出|で}て、
キューは{入|い}れた{順番|じゅんばん}どおりに{出|で}るんだね！
:::

## BFS プレビュー：キューで{探索|たんさく}

:::sensei
キューは「{幅|はば}{優先|ゆうせん}{探索|たんさく}（BFS）」で{大活躍|だいかつやく}するよ。
{空|そら}の{世界|せかい}のマップを{探索|たんさく}するイメージで見てみよう。
:::

```python runnable
from collections import deque

# 空の世界のマップ（つながり）
sky_map = {
    "雲の港": ["風の橋", "星の塔"],
    "風の橋": ["雲の港", "月の広場", "虹の滝"],
    "星の塔": ["雲の港", "月の広場"],
    "月の広場": ["風の橋", "星の塔", "太陽の神殿"],
    "虹の滝": ["風の橋"],
    "太陽の神殿": ["月の広場"],
}

def bfs(start):
    """幅優先探索：近い場所から順に訪問"""
    visited = set()
    queue = deque([start])
    visited.add(start)
    order = []

    while queue:
        place = queue.popleft()
        order.append(place)

        for neighbor in sky_map[place]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order

print("雲の港から探索開始！")
result = bfs("雲の港")
for i, place in enumerate(result, 1):
    print(f"  {i}番目: {place}")
```

:::hint
BFS はキューを{使|つか}って「{近|ちか}い{場所|ばしょ}から{順|じゅん}に」{探索|たんさく}する。
{最短|さいたん}ルートを{見|み}つけたいとき等に{使|つか}われるよ！
:::

## やってみよう

スタックを{使|つか}って、カッコが{正|ただ}しいか{判定|はんてい}しよう！

```python runnable
# 練習: カッコの対応チェック
s = "((())())"
stack = []
is_valid = True

for char in s:
    if char == "(":
        stack.append(char)
    elif char == ")":
        if not stack:
            is_valid = False
            break
        stack.pop()

if is_valid and len(stack) == 0:
    print("OK")
else:
    print("NG")
```

## まとめ

- **スタック（LIFO）**：{最後|さいご}に{入|い}れたものが{最初|さいしょ}に{出|で}る（{皿|さら}{積|づ}み）
  - `append()` で{積|つ}む、`pop()` で{取|と}る
  - カッコチェック、Undo{機能|きのう}に{便利|べんり}
- **キュー（FIFO）**：{最初|さいしょ}に{入|い}れたものが{最初|さいしょ}に{出|で}る（{行列|ぎょうれつ}）
  - `collections.deque` を{使|つか}う
  - `append()` で{並|なら}ぶ、`popleft()` で{出|で}る
  - BFS（{幅|はば}{優先|ゆうせん}{探索|たんさく}）で{大活躍|だいかつやく}
- {並|なら}び{方|かた}のルールがあるからこそ、{特定|とくてい}の{問題|もんだい}を{効率|こうりつ}よく{解|と}ける！
