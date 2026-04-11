---
title: "グラフ探索"
slug: "graph"
order: 31
description: "つながりをたどろう"
world: "sky"
challenge:
  description: "Graph クラスと BFS を作って、\"A\" から \"D\" への最短経路の長さを表示しよう"
  starterCode: "// Graph クラスと BFS を作ろう\n// グラフ: A-B, A-C, B-D, C-D\n\n// let g = new Graph();\n// [\"A\",\"B\",\"C\",\"D\"].forEach(v => g.addVertex(v));\n// g.addEdge(\"A\",\"B\");\n// g.addEdge(\"A\",\"C\");\n// g.addEdge(\"B\",\"D\");\n// g.addEdge(\"C\",\"D\");\n// console.log(g.bfsDistance(\"A\", \"D\"));\n"
  expectedOutput: "2"
  hints:
    - "隣接リストは Object を使い、各頂点に配列を持たせよう"
    - "BFS はキュー（配列 + push/shift）で実装しよう"
    - "距離を記録する Object を作って、訪問済みチェックにも使おう"
---

# グラフ{探索|たんさく} ー つながりをたどろう

:::sensei
{冒険者|ぼうけんしゃ}よ、{今日|きょう}は「グラフ」を{学|まな}ぶよ。
{木構造|きこうぞう}は{親|おや}から{子|こ}への{一方通行|いっぽうつうこう}だったけど、
グラフは{自由|じゆう}につながりを{持|も}てるんだ。
{街|まち}と{街|まち}をつなぐ{道|みち}、SNSの{友達関係|ともだちかんけい}、
ダンジョンの{部屋|へや}のつながりなど、{色|いろ}んなものがグラフで{表|あらわ}せるよ！
:::

:::student
{木|き}よりもっと{自由|じゆう}な{形|かたち}なんだね！
:::

:::sensei
そう！グラフには「{頂点|ちょうてん}（ノード）」と「{辺|へん}（エッジ）」があって、
{頂点|ちょうてん}を{辺|へん}でつなぐことで{関係|かんけい}を{表|あらわ}すんだ。
:::

## グラフの{基本|きほん}：{隣接|りんせつ}リスト

グラフを{作|つく}る{一番|いちばん}シンプルな{方法|ほうほう}は「{隣接|りんせつ}リスト」だよ。

```javascript runnable
// 隣接リストでグラフを表現
let graph = {
  "村": ["森", "洞窟"],
  "森": ["村", "湖", "山"],
  "洞窟": ["村", "宝部屋"],
  "湖": ["森"],
  "山": ["森", "山頂"],
  "山頂": ["山"],
  "宝部屋": ["洞窟"]
};

// 各場所のつながりを表示
let places = Object.keys(graph);
for (let i = 0; i < places.length; i++) {
  let place = places[i];
  console.log(place + " → " + graph[place].join(", "));
}
```

:::student
{各場所|かくばしょ}から{行|い}ける{場所|ばしょ}が{配列|はいれつ}で{入|はい}ってるんだ。
ダンジョンのマップみたい！
:::

## Graphクラスを{作|つく}る

クラスでグラフを{管理|かんり}しよう。

```javascript runnable
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2) {
    // 双方向（無向グラフ）
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  showGraph() {
    let vertices = Object.keys(this.adjacencyList);
    for (let i = 0; i < vertices.length; i++) {
      let v = vertices[i];
      console.log(v + " → " + this.adjacencyList[v].join(", "));
    }
  }
}

let dungeon = new Graph();
dungeon.addVertex("入口");
dungeon.addVertex("通路A");
dungeon.addVertex("通路B");
dungeon.addVertex("宝箱の部屋");
dungeon.addVertex("ボス部屋");

dungeon.addEdge("入口", "通路A");
dungeon.addEdge("入口", "通路B");
dungeon.addEdge("通路A", "宝箱の部屋");
dungeon.addEdge("通路B", "宝箱の部屋");
dungeon.addEdge("宝箱の部屋", "ボス部屋");

console.log("=== ダンジョンマップ ===");
dungeon.showGraph();
```

:::sensei
`addEdge` で{両方向|りょうほうこう}につながりを{作|つく}っているね。
これを「{無向|むこう}グラフ」と{呼|よ}ぶよ。{道|みち}は{双方向|そうほうこう}に{通|とお}れるということだ。
:::

## {深|ふか}さ{優先探索|ゆうせんたんさく}（DFS）

まずは DFS（Depth-First Search）を{実装|じっそう}しよう。
{一|ひと}つの{道|みち}を{行|い}けるところまで{進|すす}んでから{戻|もど}る{探索方法|たんさくほうほう}だ。

```javascript runnable
class Graph {
  constructor() { this.adjacencyList = {}; }
  addVertex(v) { if (!this.adjacencyList[v]) this.adjacencyList[v] = []; }
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  // 深さ優先探索（再帰版）
  dfs(start) {
    let result = [];
    let visited = {};
    this._dfs(start, visited, result);
    return result;
  }

  _dfs(vertex, visited, result) {
    visited[vertex] = true;
    result.push(vertex);
    let neighbors = this.adjacencyList[vertex];
    for (let i = 0; i < neighbors.length; i++) {
      if (!visited[neighbors[i]]) {
        this._dfs(neighbors[i], visited, result);
      }
    }
  }
}

let map = new Graph();
["A", "B", "C", "D", "E", "F"].forEach(function(v) { map.addVertex(v); });
map.addEdge("A", "B");
map.addEdge("A", "C");
map.addEdge("B", "D");
map.addEdge("C", "E");
map.addEdge("D", "E");
map.addEdge("D", "F");

console.log("DFS探索順: " + map.dfs("A").join(" → "));
```

:::student
Aから{始|はじ}めて、Bに{行|い}って、Dに{行|い}って...
{行|い}き{止|ど}まりになったら{戻|もど}ってくるんだ！
{前|まえ}のレッスンの{再帰|さいき}が{使|つか}われてるね。
:::

## {幅優先探索|はばゆうせんたんさく}（BFS）

{次|つぎ}は BFS（Breadth-First Search）だ。
{近|ちか}い{場所|ばしょ}から{順番|じゅんばん}に{探索|たんさく}していく{方法|ほうほう}だよ。

```javascript runnable
class Graph {
  constructor() { this.adjacencyList = {}; }
  addVertex(v) { if (!this.adjacencyList[v]) this.adjacencyList[v] = []; }
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  // 幅優先探索（キューを使う！）
  bfs(start) {
    let result = [];
    let visited = {};
    let queue = [start];
    visited[start] = true;

    while (queue.length > 0) {
      let current = queue.shift();  // キューの先頭を取り出す
      result.push(current);

      let neighbors = this.adjacencyList[current];
      for (let i = 0; i < neighbors.length; i++) {
        if (!visited[neighbors[i]]) {
          visited[neighbors[i]] = true;
          queue.push(neighbors[i]);
        }
      }
    }
    return result;
  }
}

let map = new Graph();
["A", "B", "C", "D", "E", "F"].forEach(function(v) { map.addVertex(v); });
map.addEdge("A", "B");
map.addEdge("A", "C");
map.addEdge("B", "D");
map.addEdge("C", "E");
map.addEdge("D", "E");
map.addEdge("D", "F");

console.log("BFS探索順: " + map.bfs("A").join(" → "));
```

:::sensei
BFS はキューを{使|つか}うよ！{前|まえ}のレッスンで{学|まな}んだキューが{活躍|かつやく}するね。
{近|ちか}いところから{順番|じゅんばん}に{広|ひろ}がっていくから、
{最短経路|さいたんけいろ}を{見|み}つけるのに{最適|さいてき}なんだ！
:::

## DFS vs BFS を{比較|ひかく}する

{同|おな}じグラフを2つの{方法|ほうほう}で{探索|たんさく}して{比|くら}べてみよう。

```javascript runnable
class Graph {
  constructor() { this.adjacencyList = {}; }
  addVertex(v) { if (!this.adjacencyList[v]) this.adjacencyList[v] = []; }
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  dfs(start) {
    let result = [];
    let visited = {};
    this._dfs(start, visited, result);
    return result;
  }
  _dfs(v, visited, result) {
    visited[v] = true;
    result.push(v);
    let n = this.adjacencyList[v];
    for (let i = 0; i < n.length; i++) {
      if (!visited[n[i]]) this._dfs(n[i], visited, result);
    }
  }

  bfs(start) {
    let result = [];
    let visited = {};
    let queue = [start];
    visited[start] = true;
    while (queue.length > 0) {
      let current = queue.shift();
      result.push(current);
      let n = this.adjacencyList[current];
      for (let i = 0; i < n.length; i++) {
        if (!visited[n[i]]) {
          visited[n[i]] = true;
          queue.push(n[i]);
        }
      }
    }
    return result;
  }
}

let g = new Graph();
["王様","大臣","将軍","兵士A","兵士B","村人"].forEach(function(v) { g.addVertex(v); });
g.addEdge("王様", "大臣");
g.addEdge("王様", "将軍");
g.addEdge("大臣", "兵士A");
g.addEdge("将軍", "兵士B");
g.addEdge("兵士A", "村人");
g.addEdge("兵士B", "村人");

console.log("DFS: " + g.dfs("王様").join(" → "));
console.log("BFS: " + g.bfs("王様").join(" → "));
console.log("");
console.log("DFS: 深く潜ってから戻る（迷路を解くのに向いている）");
console.log("BFS: 近い順に広がる（最短経路に向いている）");
```

:::hint
- **DFS**：{深|ふか}く{潜|もぐ}ってから{戻|もど}る → {迷路|めいろ}、{全探索|ぜんたんさく}
- **BFS**：{近|ちか}い{順|じゅん}に{広|ひろ}がる → {最短経路|さいたんけいろ}、レベル{探索|たんさく}
:::

## {最短経路|さいたんけいろ}を{見|み}つける

BFS を{使|つか}って{最短経路|さいたんけいろ}の{距離|きょり}を{求|もと}めてみよう。

```javascript runnable
class Graph {
  constructor() { this.adjacencyList = {}; }
  addVertex(v) { if (!this.adjacencyList[v]) this.adjacencyList[v] = []; }
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  bfsDistance(start, end) {
    let visited = {};
    let queue = [start];
    visited[start] = 0;  // 距離を記録

    while (queue.length > 0) {
      let current = queue.shift();

      if (current === end) {
        return visited[current];
      }

      let neighbors = this.adjacencyList[current];
      for (let i = 0; i < neighbors.length; i++) {
        let next = neighbors[i];
        if (visited[next] === undefined) {
          visited[next] = visited[current] + 1;
          queue.push(next);
        }
      }
    }
    return -1;  // 到達不能
  }
}

let g = new Graph();
["A", "B", "C", "D", "E"].forEach(function(v) { g.addVertex(v); });
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "D");
g.addEdge("D", "E");

console.log("AからDまで: " + g.bfsDistance("A", "D") + " ステップ");
console.log("AからEまで: " + g.bfsDistance("A", "E") + " ステップ");
console.log("BからEまで: " + g.bfsDistance("B", "E") + " ステップ");
```

:::student
BFS は{近|ちか}いところから{探|さが}すから、
{最初|さいしょ}に{見|み}つけた{経路|けいろ}が{最短|さいたん}なんだ！{賢|かしこ}い！
:::

## ダンジョン{探索|たんさく}シミュレーション

グラフを{使|つか}ったダンジョン{探索|たんさく}をやってみよう。

```javascript runnable
class Graph {
  constructor() { this.adjacencyList = {}; }
  addVertex(v) { if (!this.adjacencyList[v]) this.adjacencyList[v] = []; }
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  bfsPath(start, end) {
    let visited = {};
    let parent = {};
    let queue = [start];
    visited[start] = true;
    parent[start] = null;

    while (queue.length > 0) {
      let current = queue.shift();
      if (current === end) {
        // 経路を復元
        let path = [];
        let node = end;
        while (node !== null) {
          path.push(node);
          node = parent[node];
        }
        path.reverse();
        return path;
      }
      let neighbors = this.adjacencyList[current];
      for (let i = 0; i < neighbors.length; i++) {
        if (!visited[neighbors[i]]) {
          visited[neighbors[i]] = true;
          parent[neighbors[i]] = current;
          queue.push(neighbors[i]);
        }
      }
    }
    return null;
  }
}

let dungeon = new Graph();
let rooms = ["入口", "分岐点", "罠の部屋", "休憩室", "鍵の部屋", "宝物庫", "ボス部屋"];
rooms.forEach(function(r) { dungeon.addVertex(r); });

dungeon.addEdge("入口", "分岐点");
dungeon.addEdge("分岐点", "罠の部屋");
dungeon.addEdge("分岐点", "休憩室");
dungeon.addEdge("罠の部屋", "鍵の部屋");
dungeon.addEdge("休憩室", "鍵の部屋");
dungeon.addEdge("鍵の部屋", "宝物庫");
dungeon.addEdge("鍵の部屋", "ボス部屋");

let path = dungeon.bfsPath("入口", "ボス部屋");
console.log("=== ダンジョン最短ルート ===");
console.log(path.join(" → "));
console.log("部屋の数: " + path.length);
console.log("移動回数: " + (path.length - 1));
```

:::sensei
BFS で{経路|けいろ}を{復元|ふくげん}するには、{各|かく}ノードが「どこから{来|き}たか」を
{記録|きろく}しておくんだ。`parent` オブジェクトがそれだよ。
{目的地|もくてきち}から{逆|ぎゃく}にたどれば{経路|けいろ}がわかるね！

さあ、チャレンジでグラフとBFSを{自分|じぶん}で{作|つく}ってみよう！
:::
