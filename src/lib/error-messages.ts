const ERROR_PATTERNS: Array<{ pattern: RegExp; message: string }> = [
  {
    pattern: /NameError: name '(\w+)' is not defined/,
    message:
      "🔍 「$1」っていう名前が見つからないよ。つづりをたしかめてみよう！",
  },
  {
    pattern: /SyntaxError: expected ':'/,
    message:
      "✏️ コロン（ : ）がたりないよ！if や for のあとには : をつけてね。",
  },
  {
    pattern: /SyntaxError: invalid syntax/,
    message:
      "✏️ コードの書きかたがちょっとちがうみたい。カッコやコロンをチェックしよう！",
  },
  {
    pattern: /SyntaxError/,
    message:
      "✏️ コードの書きかたにまちがいがあるよ。カッコやコロンが足りないかも？",
  },
  {
    pattern: /IndentationError/,
    message:
      "📐 字下げ（インデント）がおかしいよ！スペース4つでそろえてみよう。",
  },
  {
    pattern: /TypeError: unsupported operand type/,
    message:
      "🤔 その計算はできないよ。文字と数字をたし算しようとしていない？",
  },
  {
    pattern: /TypeError:.*argument/,
    message:
      "🤔 カッコの中に入れる値の数がちがうみたい。いくつ必要か確認してね。",
  },
  {
    pattern: /ZeroDivisionError/,
    message: "🚫 0でわることはできないよ！わり算の右がわをチェックしよう。",
  },
  {
    pattern: /IndexError: list index out of range/,
    message:
      "📦 リストの番号が大きすぎるよ！リストの長さをたしかめよう。",
  },
  {
    pattern: /KeyError/,
    message:
      "🔑 その名前は辞書にないよ。キーのつづりをたしかめてみよう。",
  },
  {
    pattern: /ValueError/,
    message:
      "❓ 値のしゅるいがちがうよ。数字にできない文字をつかっていない？",
  },
  {
    pattern: /RecursionError/,
    message:
      "🔄 関数がじぶん自身をよびすぎちゃった！おわりの条件をたしかめよう。",
  },
  {
    pattern: /ModuleNotFoundError: No module named '(\w+)'/,
    message:
      "📦 「$1」というモジュールはつかえないよ。べつのモジュールをためしてみよう。",
  },
  {
    pattern: /EOFError/,
    message:
      "⌨️ input() はここではつかえないよ。変数に直接値を入れてみよう！",
  },
  {
    pattern: /AttributeError: '(\w+)' object has no attribute '(\w+)'/,
    message:
      "🔍 「$1」には「$2」っていう機能はないよ。名前をたしかめてみよう。",
  },
  {
    pattern: /FileNotFoundError/,
    message:
      "📁 ファイルが見つからないよ。ファイル名をたしかめてみよう。",
  },
];

export function friendlyError(rawError: string): string {
  for (const { pattern, message } of ERROR_PATTERNS) {
    const match = rawError.match(pattern);
    if (match) {
      let result = message;
      for (let i = 1; i < match.length; i++) {
        result = result.replace(`$${i}`, match[i]);
      }
      return result;
    }
  }
  return `😅 エラーがおきちゃった！下のメッセージをよんでみよう。\n\n${rawError}`;
}
