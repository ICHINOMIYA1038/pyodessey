---
title: "ミニプロジェクト"
slug: "mini-project"
order: 27
description: "海のお店を作ろう"
world: "sea"
challenge:
  description: "商品の合計金額を計算する関数を完成させよう！合計が1000以上なら10%割引を適用するよ。商品: つりざお=500, エサ=300, バケツ=200, クーラーボックス=700 を各1個ずつ、エサだけ2個買ったときの合計を表示しよう。"
  starterCode: "def calculate_total(items, quantities):\n    total = 0\n    for item, price in items.items():\n        total += price * quantities.get(item, 0)\n    if total >= 1000:\n        total = int(total * 0.9)\n    return total\n\nitems = {\"つりざお\": 500, \"エサ\": 300, \"バケツ\": 200, \"クーラーボックス\": 700}\nquantities = {\"つりざお\": 1, \"エサ\": 2, \"バケツ\": 1, \"クーラーボックス\": 1}\n\nresult = calculate_total(items, quantities)\nprint(result)\n"
  expectedOutput: "1800"
---

# ミニプロジェクト：{海|うみ}のお{店|みせ}を作ろう

:::sensei
これまで学んできた{全|すべ}てのスキルを{使|つか}って、
{海|うみ}の{冒険|ぼうけん}に{必要|ひつよう}なアイテムショップを作ろう！
{辞書|じしょ}、ループ、{関数|かんすう}、文字列フォーマット……
{全部|ぜんぶ}{組|く}み{合|あ}わせるぞ！
:::

:::student
自分でお{店|みせ}を作れるの！？ わくわくする！
:::

## ステップ1：{商品|しょうひん}データを作る

まずは{辞書|じしょ}を使ってお{店|みせ}の{商品|しょうひん}データを作ろう。

```python runnable
# 海の冒険ショップの商品データ
shop_items = {
    "つりざお": {"price": 500, "description": "魚を釣れる"},
    "エサ": {"price": 300, "description": "魚が寄ってくる"},
    "バケツ": {"price": 200, "description": "魚を入れる"},
    "クーラーボックス": {"price": 700, "description": "魚を新鮮に保つ"},
    "救命浮き輪": {"price": 400, "description": "海に落ちても安心"},
    "望遠鏡": {"price": 1200, "description": "遠くの島が見える"},
}

# 商品一覧を表示
print("=== 海の冒険ショップ ===\n")
for name, info in shop_items.items():
    print(f"  {name:<10} {info['price']:>5}G  - {info['description']}")

print(f"\n商品数: {len(shop_items)}種類")
```

:::hint
{辞書|じしょ}の中に{辞書|じしょ}を入れて、
{商品|しょうひん}ごとに{値段|ねだん}と{説明|せつめい}を{管理|かんり}しているよ。
:::

## ステップ2：{商品|しょうひん}を{表示|ひょうじ}する{関数|かんすう}

{関数|かんすう}にすると、{何度|なんど}でも{呼|よ}び出せて{便利|べんり}だ。

```python runnable
def show_menu(items):
    """商品メニューを表示する"""
    print("┌────────────────────────────────┐")
    print("│    海の冒険ショップ            │")
    print("├────────────────────────────────┤")
    for name, info in items.items():
        price = info["price"]
        print(f"│ {name:<10} {price:>6,}G            │")
    print("├────────────────────────────────┤")
    print("│ ★ 1000G以上で10%OFF！         │")
    print("└────────────────────────────────┘")

# 商品データ
shop = {
    "つりざお": {"price": 500},
    "エサ": {"price": 300},
    "バケツ": {"price": 200},
    "クーラーボックス": {"price": 700},
    "救命浮き輪": {"price": 400},
}

show_menu(shop)
```

## ステップ3：{合計|ごうけい}{金額|きんがく}を{計算|けいさん}する

:::sensei
お{客|きゃく}さんが{何|なに}を{何個|なんこ}{買|か}うか決めたら、
{合計|ごうけい}{金額|きんがく}を{計算|けいさん}する{関数|かんすう}を作ろう。
1000G{以上|いじょう}{買|か}ったら10%{割引|わりびき}だ！
:::

```python runnable
def calculate_total(items, quantities):
    """合計金額を計算する（1000以上で10%割引）"""
    total = 0
    for item, price in items.items():
        qty = quantities.get(item, 0)
        total += price * qty

    # 割引判定
    if total >= 1000:
        total = int(total * 0.9)  # 10%OFF

    return total

# シンプルな商品リスト（名前: 値段）
items = {
    "つりざお": 500,
    "エサ": 300,
    "バケツ": 200,
    "クーラーボックス": 700,
}

# お客さんの注文
order = {
    "つりざお": 1,
    "エサ": 2,
    "バケツ": 1,
    "クーラーボックス": 1,
}

# 明細を表示
print("=== お買い物明細 ===")
subtotal = 0
for item, price in items.items():
    qty = order.get(item, 0)
    if qty > 0:
        line_total = price * qty
        subtotal += line_total
        print(f"  {item} x{qty}  {line_total:>6,}G")

print(f"\n  小計: {subtotal:,}G")
if subtotal >= 1000:
    discount = subtotal - int(subtotal * 0.9)
    print(f"  割引: -{discount:,}G (10%OFF)")

total = calculate_total(items, order)
print(f"  合計: {total:,}G")
```

:::hint
`quantities.get(item, 0)` は、
キーがなかったら 0 を{返|かえ}す{安全|あんぜん}な{書|か}き方だよ。
`int()` で{小数点以下|しょうすうてんいか}を{切|き}り{捨|す}てているんだ。
:::

## ステップ4：{買|か}い{物|もの}カートを作る

```python runnable
def create_cart():
    """空のカートを作る"""
    return {}

def add_to_cart(cart, item, quantity=1):
    """カートに商品を追加する"""
    if item in cart:
        cart[item] += quantity
    else:
        cart[item] = quantity
    return cart

def show_cart(cart, prices):
    """カートの中身を表示する"""
    if not cart:
        print("カートは空です")
        return

    print("=== カートの中身 ===")
    total = 0
    for item, qty in cart.items():
        price = prices.get(item, 0)
        line = price * qty
        total += line
        print(f"  {item} x{qty} = {line:,}G")
    print(f"  -----------")
    print(f"  小計: {total:,}G")
    if total >= 1000:
        final = int(total * 0.9)
        print(f"  割引後: {final:,}G (10%OFF!)")

# 使ってみよう！
prices = {
    "つりざお": 500,
    "エサ": 300,
    "バケツ": 200,
    "クーラーボックス": 700,
    "救命浮き輪": 400,
}

cart = create_cart()
cart = add_to_cart(cart, "つりざお")
cart = add_to_cart(cart, "エサ", 3)
cart = add_to_cart(cart, "バケツ")
print("--- エサ3個とつりざおとバケツ ---")
show_cart(cart, prices)

# さらに追加
cart = add_to_cart(cart, "クーラーボックス")
print("\n--- クーラーボックスも追加 ---")
show_cart(cart, prices)
```

## ステップ5：レシートを{印刷|いんさつ}する

:::student
本物のレシートみたいに{表示|ひょうじ}したい！
:::

```python runnable
def print_receipt(cart, prices, shop_name="海の冒険ショップ"):
    """きれいなレシートを印刷する"""
    width = 34

    # ヘッダー
    print("=" * width)
    print(f"{shop_name:^{width}}")
    print("=" * width)

    # 商品リスト
    subtotal = 0
    for item, qty in cart.items():
        price = prices.get(item, 0)
        line_total = price * qty
        subtotal += line_total
        print(f" {item:<10} {qty}x{price:>5} {line_total:>6,}G")

    print("-" * width)
    print(f" {'小計':<20} {subtotal:>6,}G")

    # 割引
    if subtotal >= 1000:
        discount = subtotal - int(subtotal * 0.9)
        final = int(subtotal * 0.9)
        print(f" {'★10%割引':<20} -{discount:>5,}G")
        print("-" * width)
        print(f" {'合計':<20} {final:>6,}G")
    else:
        print("-" * width)
        print(f" {'合計':<20} {subtotal:>6,}G")

    print("=" * width)
    print(f"{'ありがとうございました！':^{width}}")
    print("=" * width)

# お買い物
prices = {
    "つりざお": 500,
    "エサ": 300,
    "バケツ": 200,
    "クーラーボックス": 700,
}

cart = {"つりざお": 1, "エサ": 2, "クーラーボックス": 1}
print_receipt(cart, prices)
```

## ステップ6：{全部|ぜんぶ}{組|く}み{合|あ}わせよう

:::sensei
{最後|さいご}に、{全|すべ}ての{機能|きのう}を{組|く}み{合|あ}わせて
{完成|かんせい}させよう！
:::

```python runnable
# === 海の冒険ショップ 完成版 ===

def show_shop(items):
    """商品一覧を表示"""
    print("\n🏪 海の冒険ショップへようこそ！")
    print("-" * 30)
    for i, (name, price) in enumerate(items.items(), 1):
        print(f"  {i}. {name:<10} {price:>5,}G")
    print("-" * 30)
    print("  ★ 1000G以上お買い上げで10%OFF！\n")

def calculate_total(items, quantities):
    """合計を計算（割引込み）"""
    total = 0
    for item, price in items.items():
        total += price * quantities.get(item, 0)
    if total >= 1000:
        total = int(total * 0.9)
    return total

def process_order(items, quantities, customer_name):
    """注文を処理してレシートを出す"""
    print(f"=== {customer_name}さんのお買い物 ===")
    subtotal = 0
    for item, price in items.items():
        qty = quantities.get(item, 0)
        if qty > 0:
            line = price * qty
            subtotal += line
            print(f"  {item} x{qty} = {line:,}G")

    print(f"\n  小計: {subtotal:,}G")
    total = calculate_total(items, quantities)
    if subtotal != total:
        print(f"  割引: -{subtotal - total:,}G (10%OFF)")
    print(f"  お支払い: {total:,}G")
    return total

# 商品データ
shop_items = {
    "つりざお": 500,
    "エサ": 300,
    "バケツ": 200,
    "クーラーボックス": 700,
    "救命浮き輪": 400,
}

show_shop(shop_items)

# お客さん1: たくさん買う → 割引
order1 = {"つりざお": 1, "エサ": 2, "クーラーボックス": 1}
total1 = process_order(shop_items, order1, "ルフィ")

print()

# お客さん2: 少しだけ → 割引なし
order2 = {"エサ": 1, "バケツ": 1}
total2 = process_order(shop_items, order2, "チョッパー")

print(f"\n本日の売上合計: {total1 + total2:,}G")
```

## {割引|わりびき}の{仕組|しく}みを{理解|りかい}しよう

```python runnable
# 割引計算を詳しく見てみよう
def explain_discount(items, quantities):
    """割引の計算過程を説明する"""
    total = 0
    for item, price in items.items():
        qty = quantities.get(item, 0)
        if qty > 0:
            line = price * qty
            total += line
            print(f"  {item}: {price}G x {qty}個 = {line}G")

    print(f"\n  合計: {total}G")
    print(f"  1000G以上？ {'はい' if total >= 1000 else 'いいえ'}")

    if total >= 1000:
        discounted = int(total * 0.9)
        saved = total - discounted
        print(f"  計算: {total} x 0.9 = {total * 0.9}")
        print(f"  int()で切り捨て: {discounted}G")
        print(f"  お得になった: {saved}G")
        return discounted
    else:
        print(f"  割引なし: {total}G")
        return total

items = {"つりざお": 500, "エサ": 300, "バケツ": 200, "クーラーボックス": 700}

print("=== ケース1: たくさん買う ===")
q1 = {"つりざお": 1, "エサ": 2, "バケツ": 1, "クーラーボックス": 1}
result1 = explain_discount(items, q1)

print(f"\n=== ケース2: 少しだけ買う ===")
q2 = {"エサ": 1, "バケツ": 1}
result2 = explain_discount(items, q2)
```

:::hint
`int(2000 * 0.9)` は `int(1800.0)` → `1800` になる。
`int()` は{小数点以下|しょうすうてんいか}を{切|き}り{捨|す}てるよ。
{割引|わりびき}の{計算|けいさん}では{端数|はすう}をどう{処理|しょり}するかが{大事|だいじ}！
:::

## やってみよう

{商品|しょうひん}の{合計|ごうけい}{金額|きんがく}を{計算|けいさん}する{関数|かんすう}を{完成|かんせい}させよう！

```python runnable
# チャレンジの練習
def calculate_total(items, quantities):
    total = 0
    for item, price in items.items():
        total += price * quantities.get(item, 0)
    if total >= 1000:
        total = int(total * 0.9)
    return total

items = {"つりざお": 500, "エサ": 300, "バケツ": 200, "クーラーボックス": 700}
quantities = {"つりざお": 1, "エサ": 2, "バケツ": 1, "クーラーボックス": 1}

result = calculate_total(items, quantities)
print(result)
```

## まとめ

- {辞書|じしょ}で{商品|しょうひん}データを{管理|かんり}できる
- {関数|かんすう}に{分|わ}けると、コードが{整理|せいり}されて{読|よ}みやすい
- `dict.get(key, default)` でキーがなくても{安全|あんぜん}に{値|あたい}を{取得|しゅとく}
- f-strings で{数値|すうち}をきれいにフォーマットできる
- {条件分岐|じょうけんぶんき}で{割引|わりびき}ロジックを{実装|じっそう}できる
- 小さな{関数|かんすう}を{組|く}み{合|あ}わせれば、{大|おお}きなプログラムが作れる！
- ここまでの{知識|ちしき}があれば、いろんなものを作れるようになったぞ！
