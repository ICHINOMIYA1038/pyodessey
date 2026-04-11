---
title: "木構造"
slug: "tree"
order: 30
description: "枝分かれするデータ"
world: "sky"
challenge:
  description: "二分探索木に [5,3,7,1,4] を挿入して、中順走査（inorder）で表示しよう"
  starterCode: "// BinaryTree クラスを作ろう\n\n// let tree = new BinaryTree();\n// [5, 3, 7, 1, 4].forEach(n => tree.insert(n));\n// console.log(tree.inorder().join(\",\"));\n"
  expectedOutput: "1,3,4,5,7"
  hints:
    - "TreeNode クラスに value, left, right を持たせよう"
    - "insert では値が小さければ左、大きければ右に進むよ"
    - "inorder は 左 → 自分 → 右 の順で配列に追加しよう"
---

# {木構造|きこうぞう} ー {枝分|えだわ}かれするデータ

:::sensei
{冒険者|ぼうけんしゃ}よ、{今日|きょう}は「{木構造|きこうぞう}」を{学|まな}ぶよ。
{木|き}のように{枝分|えだわ}かれしていくデータ{構造|こうぞう}なんだ。
ファイルシステムや{組織図|そしきず}、ゲームのスキルツリーなど、
{色|いろ}んなところで{使|つか}われているよ！
:::

:::student
{木|き}？プログラミングに{木|き}が{出|で}てくるの？
:::

:::sensei
{本物|ほんもの}の{木|き}をひっくり{返|かえ}した{形|かたち}を{想像|そうぞう}してみて。
{一番上|いちばんうえ}に「{根|ね}」があって、そこから{枝|えだ}が{下|した}に{広|ひろ}がっていく。
{枝|えだ}の{先|さき}が「{葉|は}」だよ。これが{木構造|きこうぞう}なんだ！
:::

## {木|き}のノードを{作|つく}る

まずは{木|き}の{基本|きほん}パーツ「ノード」を{作|つく}ろう。

```javascript runnable
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;   // 左の子
    this.right = null;  // 右の子
  }
}

// 手動で木を組み立てる
let root = new TreeNode("ボス");
root.left = new TreeNode("中ボスA");
root.right = new TreeNode("中ボスB");
root.left.left = new TreeNode("ザコ1");
root.left.right = new TreeNode("ザコ2");
root.right.left = new TreeNode("ザコ3");

console.log("根: " + root.value);
console.log("左の子: " + root.left.value);
console.log("右の子: " + root.right.value);
console.log("左の左: " + root.left.left.value);
console.log("左の右: " + root.left.right.value);
```

:::student
なるほど！{各|かく}ノードが{左|ひだり}と{右|みぎ}の{子|こ}ノードを{持|も}てるんだ。
これで{枝分|えだわ}かれしていくんだね！
:::

## {二分探索木|にぶんたんさくぎ}（BST）

{二分探索木|にぶんたんさくぎ}は{特別|とくべつ}なルールがある{木|き}だ。
{左|ひだり}の{子|こ}は{親|おや}より{小|ちい}さく、{右|みぎ}の{子|こ}は{親|おや}より{大|おお}きい！

```javascript runnable
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    let newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    this._insertNode(this.root, newNode);
  }

  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      // 左へ
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      // 右へ
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }
}

let tree = new BinaryTree();
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(1);
tree.insert(9);

console.log("根: " + tree.root.value);
console.log("左: " + tree.root.left.value);
console.log("右: " + tree.root.right.value);
console.log("左の左: " + tree.root.left.left.value);
console.log("右の右: " + tree.root.right.right.value);
```

:::sensei
5が{根|ね}で、3は5より{小|ちい}さいから{左|ひだり}、7は{大|おお}きいから{右|みぎ}。
1は3より{小|ちい}さいからさらに{左|ひだり}、9は7より{大|おお}きいからさらに{右|みぎ}。
このルールのおかげで{素早|すばや}く{検索|けんさく}できるんだ！
:::

## {木|き}の{走査|そうさ}：{中順|ちゅうじゅん}（Inorder）

{木|き}のすべてのノードを{訪|おとず}れることを「{走査|そうさ}」と{呼|よ}ぶよ。
{中順走査|ちゅうじゅんそうさ}は「{左|ひだり} → {自分|じぶん} → {右|みぎ}」の{順|じゅん}で{回|まわ}る。

```javascript runnable
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    let newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    this._insertNode(this.root, newNode);
  }

  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) node.left = newNode;
      else this._insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this._insertNode(node.right, newNode);
    }
  }

  // 中順走査：左 → 自分 → 右
  inorder() {
    let result = [];
    this._inorder(this.root, result);
    return result;
  }

  _inorder(node, result) {
    if (node === null) return;
    this._inorder(node.left, result);    // 左
    result.push(node.value);             // 自分
    this._inorder(node.right, result);   // 右
  }
}

let tree = new BinaryTree();
[5, 3, 7, 1, 4, 6, 9].forEach(function(n) {
  tree.insert(n);
});

console.log("中順走査: " + tree.inorder().join(", "));
console.log("→ 小さい順にソートされている！");
```

:::student
{中順走査|ちゅうじゅんそうさ}すると{小|ちい}さい{順|じゅん}に{並|なら}ぶんだ！すごい！
:::

:::hint
{二分探索木|にぶんたんさくぎ}を{中順走査|ちゅうじゅんそうさ}すると、{自動的|じどうてき}にソートされた{順番|じゅんばん}になるよ。
これが{二分探索木|にぶんたんさくぎ}の{大|おお}きな{特徴|とくちょう}なんだ！
:::

## 3つの{走査方法|そうさほうほう}

{走査|そうさ}には{主|おも}に3つの{方法|ほうほう}があるよ。

```javascript runnable
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    let newNode = new TreeNode(value);
    if (this.root === null) { this.root = newNode; return; }
    this._insertNode(this.root, newNode);
  }

  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) node.left = newNode;
      else this._insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this._insertNode(node.right, newNode);
    }
  }

  // 前順：自分 → 左 → 右
  preorder() {
    let result = [];
    this._preorder(this.root, result);
    return result;
  }
  _preorder(node, result) {
    if (node === null) return;
    result.push(node.value);
    this._preorder(node.left, result);
    this._preorder(node.right, result);
  }

  // 中順：左 → 自分 → 右
  inorder() {
    let result = [];
    this._inorder(this.root, result);
    return result;
  }
  _inorder(node, result) {
    if (node === null) return;
    this._inorder(node.left, result);
    result.push(node.value);
    this._inorder(node.right, result);
  }

  // 後順：左 → 右 → 自分
  postorder() {
    let result = [];
    this._postorder(this.root, result);
    return result;
  }
  _postorder(node, result) {
    if (node === null) return;
    this._postorder(node.left, result);
    this._postorder(node.right, result);
    result.push(node.value);
  }
}

let tree = new BinaryTree();
[5, 3, 7, 1, 4].forEach(function(n) { tree.insert(n); });

console.log("前順（自分→左→右）: " + tree.preorder().join(", "));
console.log("中順（左→自分→右）: " + tree.inorder().join(", "));
console.log("後順（左→右→自分）: " + tree.postorder().join(", "));
```

:::sensei
{覚|おぼ}え{方|かた}は{簡単|かんたん}！「{自分|じぶん}」をいつ{訪|おとず}れるかだよ：
- **{前順|ぜんじゅん}**：{自分|じぶん}が{最初|さいしょ}（{木|き}のコピーに{便利|べんり}）
- **{中順|ちゅうじゅん}**：{自分|じぶん}が{真|ま}ん{中|なか}（ソートに{便利|べんり}）
- **{後順|こうじゅん}**：{自分|じぶん}が{最後|さいご}（{削除|さくじょ}に{便利|べんり}）
:::

## {木|き}の{中|なか}を{検索|けんさく}する

{二分探索木|にぶんたんさくぎ}では{効率的|こうりつてき}に{値|あたい}を{探|さが}せるよ。

```javascript runnable
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() { this.root = null; }

  insert(value) {
    let newNode = new TreeNode(value);
    if (this.root === null) { this.root = newNode; return; }
    this._insertNode(this.root, newNode);
  }

  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) node.left = newNode;
      else this._insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this._insertNode(node.right, newNode);
    }
  }

  search(value) {
    return this._search(this.root, value, []);
  }

  _search(node, value, path) {
    if (node === null) {
      return { found: false, path: path };
    }
    path.push(node.value);
    if (value === node.value) {
      return { found: true, path: path };
    }
    if (value < node.value) {
      return this._search(node.left, value, path);
    }
    return this._search(node.right, value, path);
  }
}

let tree = new BinaryTree();
[50, 30, 70, 20, 40, 60, 80].forEach(function(n) { tree.insert(n); });

let targets = [40, 60, 25];
for (let i = 0; i < targets.length; i++) {
  let result = tree.search(targets[i]);
  if (result.found) {
    console.log(targets[i] + " を発見！ 経路: " + result.path.join(" → "));
  } else {
    console.log(targets[i] + " は見つからない 経路: " + result.path.join(" → "));
  }
}
```

:::student
{毎回|まいかい}{半分|はんぶん}に{絞|しぼ}って{探|さが}すから{速|はや}いんだ！
7つのノードでも{最大|さいだい}3{回|かい}の{比較|ひかく}で{見|み}つかるね。
:::

## {木|き}の{高|たか}さを{求|もと}める

{木|き}の{高|たか}さ（{深|ふか}さ）を{再帰|さいき}で{計算|けいさん}してみよう。

```javascript runnable
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() { this.root = null; }

  insert(value) {
    let newNode = new TreeNode(value);
    if (this.root === null) { this.root = newNode; return; }
    this._insertNode(this.root, newNode);
  }

  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) node.left = newNode;
      else this._insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this._insertNode(node.right, newNode);
    }
  }

  height() {
    return this._height(this.root);
  }

  _height(node) {
    if (node === null) return 0;
    let leftH = this._height(node.left);
    let rightH = this._height(node.right);
    return 1 + Math.max(leftH, rightH);
  }

  countNodes() {
    return this._count(this.root);
  }

  _count(node) {
    if (node === null) return 0;
    return 1 + this._count(node.left) + this._count(node.right);
  }
}

let tree = new BinaryTree();
[10, 5, 15, 3, 7, 12, 20, 1].forEach(function(n) { tree.insert(n); });

console.log("ノード数: " + tree.countNodes());
console.log("木の高さ: " + tree.height());
console.log("→ 最大 " + tree.height() + " 回の比較で検索できる！");
```

:::hint
{木|き}の{高|たか}さは「{左|ひだり}の{高|たか}さ」と「{右|みぎ}の{高|たか}さ」の{大|おお}きい{方|ほう}+1だよ。
{再帰|さいき}で{自然|しぜん}に{計算|けいさん}できるね！
:::

## {実用例|じつようれい}：ファイルシステム

{木構造|きこうぞう}は{身近|みぢか}なところで{使|つか}われているよ。

```javascript runnable
class FileNode {
  constructor(name, type) {
    this.name = name;
    this.type = type;  // "folder" or "file"
    this.children = [];
  }

  add(child) {
    this.children.push(child);
    return this;
  }

  display(indent) {
    if (indent === undefined) indent = 0;
    let prefix = "  ".repeat(indent);
    let icon = this.type === "folder" ? "[D]" : " * ";
    console.log(prefix + icon + " " + this.name);
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].display(indent + 1);
    }
  }
}

let root = new FileNode("冒険者のPC", "folder");
let docs = new FileNode("ドキュメント", "folder");
let games = new FileNode("ゲーム", "folder");

docs.add(new FileNode("冒険日記.txt", "file"));
docs.add(new FileNode("地図.png", "file"));

games.add(new FileNode("RPG", "folder")
  .add(new FileNode("セーブデータ.dat", "file"))
  .add(new FileNode("設定.json", "file")));
games.add(new FileNode("パズル.exe", "file"));

root.add(docs);
root.add(games);
root.add(new FileNode("メモ.txt", "file"));

root.display();
```

:::sensei
フォルダの{中|なか}にフォルダがあって、その{中|なか}にファイルがある。
これはまさに{木構造|きこうぞう}そのものだね！

{木構造|きこうぞう}は{再帰|さいき}ととても{相性|あいしょう}がいい。
{前|まえ}のレッスンで{学|まな}んだ{再帰|さいき}が{大活躍|だいかつやく}しただろう？
さあ、チャレンジで{二分探索木|にぶんたんさくぎ}を{自分|じぶん}で{作|つく}ってみよう！
:::
