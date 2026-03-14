---
title: "正規表現"
slug: "regex"
order: 18
description: "文字列の探偵"
world: "castle"
challenge:
  description: "re.findall を使って \"I have 3 cats and 12 dogs\" から数字だけを全て取り出して表示しよう！"
  starterCode: "import re\ntext = \"I have 3 cats and 12 dogs\"\n# 数字を取り出そう\n"
  expectedOutput: "['3', '12']"
---

# {正規表現|せいきひょうげん}

:::sensei
今日は「{正規表現|せいきひょうげん}」を学ぶよ。
{文字列|もじれつ}の中からパターンを見つける、
{探偵|たんてい}のような{技術|ぎじゅつ}だよ！
:::

:::student
{探偵|たんてい}！？ どんなパターンを{探|さが}すの？
:::

:::sensei
たとえば「{数字|すうじ}が3つ{並|なら}んでるところ」とか、
「メールアドレスっぽいもの」とか。
{暗号|あんごう}{解読|かいどく}みたいでしょ？
:::

## re モジュールを使おう

Pythonで{正規表現|せいきひょうげん}を使うには、
`re` モジュールをインポートするよ。

```python runnable
import re

text = "今日は2月14日、気温は5度です"

# search(): 最初に見つかったものを返す
result = re.search(r"\d+", text)
if result:
    print(f"最初の数字: {result.group()}")

# findall(): 全部見つける
all_numbers = re.findall(r"\d+", text)
print(f"全部の数字: {all_numbers}")
```

:::hint
`r"\d+"` の `r` は「ローストリング」。
`\d` は「{数字|すうじ}1文字」、`+` は「1回以上」という{意味|いみ}。
つまり「1つ以上の{数字|すうじ}のかたまり」を{探|さが}すよ！
:::

## {基本|きほん}パターン

:::sensei
{正規表現|せいきひょうげん}には{特別|とくべつ}な{記号|きごう}があるよ。
{探偵|たんてい}の{道具|どうぐ}みたいなものだ！
:::

```python runnable
import re

# . → 何でも1文字
print(re.findall(r"a.c", "abc adc aec a1c"))

# * → 0回以上くりかえし
print(re.findall(r"ab*c", "ac abc abbc abbbc"))

# + → 1回以上くりかえし
print(re.findall(r"ab+c", "ac abc abbc abbbc"))

# ? → あってもなくてもOK（0回か1回）
print(re.findall(r"colou?r", "color colour"))
```

:::student
`.` は何にでもなれる{変装|へんそう}の達人みたい！
:::

:::sensei
いい{例|たと}えだね！
`*` は「なくてもOK」、`+` は「{最低|さいてい}1つ」、
`?` は「あってもなくてもOK」と{覚|おぼ}えよう。
:::

## {文字|もじ}クラス [...]

:::sensei
`[]` の中に書いた{文字|もじ}のどれかにマッチするよ。
「この中のどれか」という{意味|いみ}だ。
:::

```python runnable
import re

# [abc] → a, b, c のどれか
print(re.findall(r"[abc]", "abcdefg"))

# [a-z] → aからzまでのどれか
print(re.findall(r"[a-z]+", "Hello World 123"))

# [0-9] → 数字（\d と同じ）
print(re.findall(r"[0-9]+", "電話: 03-1234-5678"))

# [^abc] → abc 以外の文字
print(re.findall(r"[^aeiou]+", "hello world"))
```

:::hint
`[a-z]` は「aからzのどれか」。
`[^abc]` のように `^` をつけると「これ以外」になるよ。
:::

## グループ化 ()

:::sensei
`()` でかこむと、マッチした{部分|ぶぶん}を
{別々|べつべつ}に取り出せるよ。
{探偵|たんてい}が{証拠|しょうこ}を{整理|せいり}するみたいだね。
:::

```python runnable
import re

# 日付のパターン
text = "誕生日は2015年4月1日です"
result = re.search(r"(\d+)年(\d+)月(\d+)日", text)
if result:
    print(f"見つけた: {result.group()}")
    print(f"年: {result.group(1)}")
    print(f"月: {result.group(2)}")
    print(f"日: {result.group(3)}")

# findall + グループ
fruits = "りんご3個、みかん5個、バナナ2本"
items = re.findall(r"(\w+?)(\d+)(個|本)", fruits)
for name, count, unit in items:
    print(f"  {name}: {count}{unit}")
```

:::student
グループにすると、ばらばらに取り出せるんだ！
:::

## よくあるパターン

:::sensei
{探偵|たんてい}がよく使う「お決まりのパターン」を{紹介|しょうかい}するよ！
:::

```python runnable
import re

# \d → 数字、\w → 英数字と_、\s → 空白
text = "名前: タロウ  年齢: 10歳"
print(f"数字: {re.findall(r'\\d+', text)}")
print(f"単語: {re.findall(r'\\w+', text)}")

# メールアドレスっぽいパターン
emails = "連絡先: taro@example.com と hanako@school.jp です"
found = re.findall(r"[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+", emails)
print(f"メール: {found}")

# 電話番号っぽいパターン
phones = "電話は03-1234-5678か090-9876-5432です"
found = re.findall(r"\d{2,4}-\d{3,4}-\d{4}", phones)
print(f"電話: {found}")
```

:::hint
`\d{3}` は「{数字|すうじ}ちょうど3つ」。
`\d{2,4}` は「{数字|すうじ}2つから4つ」という{意味|いみ}だよ。
`{}` の中の{数字|すうじ}で回数を{指定|してい}できるんだ。
:::

## {置換|ちかん}と{分割|ぶんかつ}

:::sensei
パターンを見つけるだけじゃなく、
{置|お}き{換|か}えたり{分割|ぶんかつ}したりもできるよ！
:::

```python runnable
import re

# sub(): パターンに合うところを置き換える
secret = "パスワードは abc123 です"
hidden = re.sub(r"[a-z0-9]+", "****", secret)
print(f"隠した: {hidden}")

# split(): パターンで分割する
text = "りんご、みかん；バナナ、メロン"
fruits = re.split(r"[、；]+", text)
print(f"分割: {fruits}")

# 暗号を解読しよう！
code = "H3e1l2l5o"
letters = re.findall(r"[A-Za-z]", code)
print(f"暗号解読: {''.join(letters)}")
```

:::student
{暗号|あんごう}{解読|かいどく}だ！ {探偵|たんてい}っぽい！
:::

## やってみよう

{正規表現|せいきひょうげん}で{探偵|たんてい}になってみよう！

```python runnable
import re

# 謎のメッセージから手がかりを見つけよう
message = """
事件ファイル #42
日時: 2026年2月14日 15時30分
場所: 東京タワー 展望台
目撃者: tanaka@mail.com (田中, 電話: 03-1111-2222)
容疑者: suzuki@mail.com (鈴木, 電話: 090-3333-4444)
"""

# 日時を探す
dates = re.findall(r"\d+年\d+月\d+日", message)
print(f"日付: {dates}")

# メールを探す
emails = re.findall(r"[a-z]+@[a-z]+\.[a-z]+", message)
print(f"メール: {emails}")

# 電話番号を探す
phones = re.findall(r"\d{2,3}-\d{4}-\d{4}", message)
print(f"電話: {phones}")

# ファイル番号を探す
file_no = re.search(r"#(\d+)", message)
if file_no:
    print(f"事件番号: {file_no.group(1)}")
```

## まとめ

- **`re.search()`**：{最初|さいしょ}のマッチを{探|さが}す
- **`re.findall()`**：全部のマッチを{探|さが}す
- **`.`**：何でも1{文字|もじ}、**`*`**：0回以上、**`+`**：1回以上
- **`[a-z]`**：{文字|もじ}クラス（この中のどれか）
- **`()`**：グループ化（{部分|ぶぶん}を取り出す）
- **`re.sub()`**：{置|お}き{換|か}え
- {正規表現|せいきひょうげん}は{文字列|もじれつ}の{探偵|たんてい}ツール！
