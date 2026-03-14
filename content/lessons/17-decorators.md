---
title: "デコレータ"
slug: "decorators"
order: 17
description: "魔法の上書き"
world: "castle"
challenge:
  description: "関数の前後に「開始」「終了」と表示するデコレータ wrapper を作り、@wrapper をつけた hello 関数（「こんにちは」と表示）を実行しよう！"
  starterCode: "# デコレータを定義しよう\n"
  expectedOutput: "開始\nこんにちは\n終了"
---

# デコレータ

:::sensei
今日はすごい{魔法|まほう}を教えるよ。
「デコレータ」を使うと、
{関数|かんすう}に{特殊|とくしゅ}な{効果|こうか}をつけられるんだ！
:::

:::student
{特殊|とくしゅ}な{効果|こうか}？
ゲームのエンチャントみたいな？
:::

:::sensei
まさにそう！
{剣|つるぎ}に「{炎|ほのお}のエンチャント」をつけるように、
{関数|かんすう}に{機能|きのう}を{追加|ついか}できるんだ！
:::

## {関数|かんすう}は「もの」として{渡|わた}せる

デコレータを学ぶ前に、大事なことを知ろう。
Pythonでは、{関数|かんすう}を{変数|へんすう}に入れたり、
{別|べつ}の{関数|かんすう}に{渡|わた}したりできるんだ。

```python runnable
def hello():
    print("こんにちは！")

# 関数を変数に入れる
aisatsu = hello
aisatsu()  # hello() と同じ！

# 関数を別の関数に渡す
def run_twice(func):
    func()
    func()

run_twice(hello)  # hello が2回実行される
```

:::hint
`hello` と書くと{関数|かんすう}そのもの。
`hello()` と書くと{関数|かんすう}を{実行|じっこう}する。
カッコがあるかないかで{意味|いみ}がちがうよ！
:::

## {関数|かんすう}を返す{関数|かんすう}

:::sensei
{関数|かんすう}の中で{新|あたら}しい{関数|かんすう}を作って、
それを返すこともできるんだ。
:::

```python runnable
def make_greeter(greeting):
    def greeter(name):
        print(f"{greeting}、{name}！")
    return greeter

hello = make_greeter("こんにちは")
goodbye = make_greeter("さようなら")

hello("タロウ")
goodbye("ハナコ")
```

:::student
{関数|かんすう}が{関数|かんすう}を作るの？ おもしろい！
:::

## はじめてのデコレータ

:::sensei
いよいよデコレータだ！
{関数|かんすう}を受け取って、
{新|あたら}しい{機能|きのう}を足した{関数|かんすう}を返すんだ。
:::

```python runnable
def enchant_fire(func):
    """炎のエンチャントをつけるデコレータ"""
    def wrapper():
        print("🔥 炎のオーラが燃え上がる！")
        func()
        print("🔥 炎が消えた！")
    return wrapper

def attack():
    print("⚔️ 攻撃した！")

# デコレータを手動で使う
enchanted_attack = enchant_fire(attack)
enchanted_attack()
```

:::hint
デコレータは「{関数|かんすう}を受け取って、
パワーアップした{関数|かんすう}を返す{関数|かんすう}」。
ちょっとむずかしいけど、使ってみるとわかるよ！
:::

## @ マークで楽に書こう

:::sensei
さっきの書き方はちょっと面倒だよね。
`@` マークを使うともっと楽に書けるよ！
:::

```python runnable
def enchant_ice(func):
    """氷のエンチャントをつけるデコレータ"""
    def wrapper():
        print("❄️ 冷気がただよう...")
        func()
        print("❄️ あたりが凍りついた！")
    return wrapper

@enchant_ice
def magic_spell():
    print("✨ 魔法を唱えた！")

# @enchant_ice をつけたので、自動でエンチャントされる！
magic_spell()
```

:::student
`@` をつけるだけでいいの？ 楽ちん！
:::

:::sensei
`@enchant_ice` は
`magic_spell = enchant_ice(magic_spell)` と同じ{意味|いみ}だよ。
でも `@` の方がずっと{読|よ}みやすいよね！
:::

## {実用的|じつようてき}なデコレータ：タイマー

{関数|かんすう}がどれくらい時間がかかるか{計|はか}るデコレータ。

```python runnable
import time

def timer(func):
    """実行時間を計るデコレータ"""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"⏱️ {func.__name__} は {elapsed:.4f}秒かかった")
        return result
    return wrapper

@timer
def slow_spell(n):
    """ゆっくりな魔法"""
    total = 0
    for i in range(n):
        total += i
    return total

result = slow_spell(1000000)
print(f"結果: {result}")
```

:::hint
`*args, **kwargs` を使うと、
どんな{引数|ひきすう}の{関数|かんすう}にも使えるデコレータが作れるよ。
:::

## functools.wraps で名前を守ろう

:::sensei
デコレータを使うと、{関数|かんすう}の名前が消えちゃうことがあるんだ。
`functools.wraps` で{防|ふせ}げるよ。
:::

```python runnable
import functools

# wraps なし
def bad_decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

# wraps あり
def good_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@bad_decorator
def spell_a():
    """火の魔法"""
    pass

@good_decorator
def spell_b():
    """氷の魔法"""
    pass

print(f"wrapsなし: 名前={spell_a.__name__}")
print(f"wrapsあり: 名前={spell_b.__name__}")
```

:::hint
`@functools.wraps(func)` を wrapper の上につけるだけ。
これでもとの{関数|かんすう}の名前や{説明|せつめい}が残るよ！
:::

## やってみよう

自分でデコレータを作ってみよう！

```python runnable
import functools

def log(func):
    """実行を記録するデコレータ"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"📝 {func.__name__} を実行するよ！")
        result = func(*args, **kwargs)
        print(f"📝 {func.__name__} が終わった！ 結果: {result}")
        return result
    return wrapper

@log
def add(a, b):
    return a + b

@log
def greet(name):
    return f"こんにちは、{name}！"

add(3, 5)
print()
greet("タロウ")
```

## まとめ

- {関数|かんすう}は{変数|へんすう}に入れたり、{渡|わた}したりできる
- **デコレータ**：{関数|かんすう}に{機能|きのう}を{追加|ついか}する{関数|かんすう}
- **`@`マーク**でデコレータを楽に使える
- **`functools.wraps`** でもとの名前を{守|まも}る
- タイマーやログなど、{便利|べんり}な使い方がたくさんある
