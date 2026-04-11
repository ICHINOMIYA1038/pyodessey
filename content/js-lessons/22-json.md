---
title: "JSONデータ"
slug: "json"
order: 22
description: "データを保存・読み込もう"
world: "sea"
challenge:
  description: "オブジェクトをJSON文字列にしてパースし直してnameを表示しよう"
  starterCode: "let hero = { name: \"ゆうしゃ\", level: 10 };\n// JSON.stringify → JSON.parse → name を表示\n"
  expectedOutput: "ゆうしゃ"
  hints:
    - "JSON.stringify(hero) でオブジェクトを文字列にできるよ"
    - "JSON.parse(文字列) で文字列をオブジェクトに戻せるよ"
    - "戻したオブジェクトの .name を console.log で表示しよう"
---

# JSONデータ ー データを{保存|ほぞん}・{読|よ}み{込|こ}もう

:::sensei
{冒険者|ぼうけんしゃ}よ、{今日|きょう}は{冒険|ぼうけん}のデータを{保存|ほぞん}する{方法|ほうほう}を{学|まな}ぶよ。
ゲームのセーブデータって、どうやって{保存|ほぞん}されていると{思|おも}う？
:::

:::student
うーん、{数字|すうじ}とか{名前|なまえ}とかを{全部|ぜんぶ}ファイルに{書|か}き{出|だ}すの？
:::

:::sensei
そのとおり！でもオブジェクトをそのままファイルに{保存|ほぞん}するのは{難|むずか}しいんだ。
そこで **JSON** という{形式|けいしき}を{使|つか}って、データを{文字列|もじれつ}に{変換|へんかん}するんだよ。
JSONは「JavaScript Object Notation」の{略|りゃく}で、{世界中|せかいじゅう}で使われている{超重要|ちょうじゅうよう}なデータ{形式|けいしき}なんだ！
:::

## JSONってなに？

JSONは、オブジェクトや{配列|はいれつ}を{文字列|もじれつ}で{表現|ひょうげん}する{書|か}き{方|かた}だよ。
JavaScriptのオブジェクトとそっくりだけど、いくつかルールがあるんだ。

```javascript runnable
// これはJavaScriptのオブジェクト
let hero = {
  name: "ゆうしゃ",
  level: 10,
  hp: 100
};

// これがJSON文字列（ただの文字列！）
let jsonText = '{"name":"ゆうしゃ","level":10,"hp":100}';

console.log(typeof hero);
console.log(typeof jsonText);
```

:::hint
JSONは{見|み}た{目|め}はオブジェクトに{似|に}ているけど、{実|じつ}はただの{文字列|もじれつ}（テキスト）だよ。
キー{名|めい}を{必|かなら}ず `"` （ダブルクォート）で{囲|かこ}むのがJSONのルールなんだ。
:::

## JSON.stringify ー オブジェクトを{文字列|もじれつ}に

`JSON.stringify()` を使うと、オブジェクトをJSON{文字列|もじれつ}に{変換|へんかん}できるよ。
これが「セーブ」のイメージだね！

```javascript runnable
let hero = {
  name: "ゆうしゃ",
  level: 15,
  hp: 120,
  weapon: "はがねのつるぎ"
};

let saved = JSON.stringify(hero);
console.log(saved);
console.log(typeof saved);
```

:::student
おお！オブジェクトが{一行|いちぎょう}の{文字列|もじれつ}になった！
これならファイルに{保存|ほぞん}できそうだね。
:::

## JSON.parse ー {文字列|もじれつ}をオブジェクトに

`JSON.parse()` を使うと、JSON{文字列|もじれつ}をオブジェクトに{戻|もど}せるよ。
これが「ロード」のイメージだね！

```javascript runnable
let saved = '{"name":"まほうつかい","level":12,"mp":80}';

let loaded = JSON.parse(saved);
console.log(loaded.name);
console.log(loaded.level);
console.log(loaded.mp);
console.log(typeof loaded);
```

:::sensei
`JSON.stringify()` で「オブジェクト → {文字列|もじれつ}」、
`JSON.parse()` で「{文字列|もじれつ} → オブジェクト」。
この2つはセットで{覚|おぼ}えよう！
:::

## セーブ＆ロードの{流|なが}れ

{実際|じっさい}のゲームのセーブ・ロードのイメージで{試|ため}してみよう。

```javascript runnable
// ゲームデータ
let gameData = {
  player: "ゆうしゃ",
  level: 20,
  gold: 5000,
  items: ["ポーション", "エーテル", "テント"]
};

// セーブ（オブジェクト → 文字列）
let saveFile = JSON.stringify(gameData);
console.log("セーブ完了！");
console.log(saveFile);

// ロード（文字列 → オブジェクト）
let loadedData = JSON.parse(saveFile);
console.log("ロード完了！");
console.log(loadedData.player + " Lv." + loadedData.level);
console.log("所持金: " + loadedData.gold + "G");
console.log("アイテム: " + loadedData.items.join(", "));
```

:::student
おおー！セーブしてロードしても、{配列|はいれつ}もちゃんと{元|もと}に{戻|もど}ってる！
:::

## {入|い}れ{子|こ}のJSON

オブジェクトの{中|なか}にオブジェクトや{配列|はいれつ}があっても、ちゃんとJSON{化|か}できるよ。

```javascript runnable
let party = {
  name: "ゆうしゃパーティ",
  members: [
    { name: "ゆうしゃ", role: "戦士", hp: 150 },
    { name: "まほうつかい", role: "魔法", hp: 80 },
    { name: "そうりょ", role: "回復", hp: 100 }
  ],
  location: {
    world: "海の世界",
    area: "珊瑚の洞窟"
  }
};

let json = JSON.stringify(party);
console.log(json);

// パースして中身を確認
let restored = JSON.parse(json);
console.log(restored.members[0].name);
console.log(restored.location.area);
```

:::sensei
どんなに{複雑|ふくざつ}な{入|い}れ{子|こ}でも、JSONはきれいに{変換|へんかん}してくれるんだ。
{配列|はいれつ}の{中|なか}のオブジェクト、オブジェクトの{中|なか}の{配列|はいれつ}、なんでもOKだよ！
:::

## きれいに{表示|ひょうじ}：インデント

`JSON.stringify()` に3つ{目|め}の{引数|ひきすう}を{渡|わた}すと、{読|よ}みやすくインデントしてくれるよ。

```javascript runnable
let hero = {
  name: "ゆうしゃ",
  level: 25,
  equipment: {
    weapon: "伝説の剣",
    armor: "ミスリルの鎧"
  },
  skills: ["ファイア", "ブリザド", "サンダー"]
};

// 第3引数に 2 を渡すと、2スペースでインデント
let pretty = JSON.stringify(hero, null, 2);
console.log(pretty);
```

:::student
わあ、すごく{読|よ}みやすくなった！デバッグのときに{便利|べんり}だね！
:::

:::hint
`JSON.stringify(obj, null, 2)` の `null` は「{全|すべ}てのプロパティを{含|ふく}む」という{意味|いみ}だよ。
`2` はインデントの{幅|はば}（スペースの{数|かず}）。`4` にするともっと{広|ひろ}くなるよ。
:::

## JSONの{注意点|ちゅういてん}

JSONにはいくつか{変換|へんかん}できないものがあるんだ。

```javascript runnable
let data = {
  name: "テスト",
  greet: function() { return "こんにちは"; },  // 関数
  secret: undefined,                            // undefined
  count: 42,                                    // 数字はOK
  active: true,                                 // 真偽値もOK
  empty: null                                   // null はOK
};

let json = JSON.stringify(data, null, 2);
console.log(json);
```

:::sensei
{見|み}てごらん。`greet`（{関数|かんすう}）と `secret`（undefined）が{消|き}えてしまったね。
JSONに{変換|へんかん}できるのは、{文字列|もじれつ}・{数字|すうじ}・{真偽値|しんぎち}・null・オブジェクト・{配列|はいれつ}だけなんだ。
{関数|かんすう}や `undefined` は{無視|むし}されるから{気|き}をつけよう！
:::

## {配列|はいれつ}もJSONにできる

JSONはオブジェクトだけじゃなく、{配列|はいれつ}もそのまま{変換|へんかん}できるよ。

```javascript runnable
let inventory = ["ポーション", "エーテル", "フェニックスの尾", "テント"];

let json = JSON.stringify(inventory);
console.log(json);

let restored = JSON.parse(json);
console.log(restored[0]);
console.log(restored.length + "個のアイテム");
```

## {実践|じっせん}：{冒険|ぼうけん}ログシステム

{学|まな}んだことを{組|く}み{合|あ}わせて、{冒険|ぼうけん}ログを{作|つく}ってみよう！

```javascript runnable
let adventureLog = {
  day: 1,
  events: []
};

// イベントを記録する関数
function logEvent(log, event) {
  log.events.push({
    day: log.day,
    message: event
  });
}

// 冒険を記録
logEvent(adventureLog, "旅が始まった");
logEvent(adventureLog, "スライムを倒した");
adventureLog.day = 2;
logEvent(adventureLog, "洞窟を発見した");
logEvent(adventureLog, "宝箱を開けた");

// セーブ
let saveData = JSON.stringify(adventureLog, null, 2);
console.log("=== セーブデータ ===");
console.log(saveData);

// ロードして表示
let loaded = JSON.parse(saveData);
console.log("=== 冒険ログ ===");
for (let i = 0; i < loaded.events.length; i++) {
  let e = loaded.events[i];
  console.log("Day" + e.day + ": " + e.message);
}
```

:::sensei
JSONを{使|つか}えば、ゲームの{状態|じょうたい}をまるごと{保存|ほぞん}して{復元|ふくげん}できるんだ。
{実際|じっさい}のWebアプリやゲームでも、データのやりとりにJSONが{大活躍|だいかつやく}しているよ。
さあ、チャレンジに{挑戦|ちょうせん}してみよう！
:::

## まとめ

- **JSON** はオブジェクトや{配列|はいれつ}を{文字列|もじれつ}で{表現|ひょうげん}する{形式|けいしき}
- `JSON.stringify()` でオブジェクト → {文字列|もじれつ}（セーブ）
- `JSON.parse()` で{文字列|もじれつ} → オブジェクト（ロード）
- `JSON.stringify(obj, null, 2)` できれいにインデント{表示|ひょうじ}
- {関数|かんすう}や `undefined` はJSONに{変換|へんかん}できない
- {配列|はいれつ}もJSONに{変換|へんかん}できる
