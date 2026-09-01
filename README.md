# PyOdessey

> ブラウザだけで Python を学べる無料の学習アプリ。冒険形式の全 33 レッスンで基礎から動的計画法までカバー。

[https://nullstead.com/pyodessey](https://nullstead.com/pyodessey)

## なぜ作ったか

子ども向けのプログラミング教室で講師をしていた時期に、Python や JavaScript を初めて触る子どもたちが「エディタを開く前に挫ける」場面を何度も見てきた。環境構築の壁をなくし、ブラウザだけで手を動かしながら学べる場所を作りたかった。

## 特徴

- **環境構築ゼロ**: Pyodide で Python をブラウザ内実行、インストール不要
- **冒険形式**: 33 レッスンをストーリー仕立てで進める
- **段階的な難易度**: 基礎構文 → 制御構造 → データ構造 → アルゴリズム(動的計画法まで)
- **モバイル対応**: スマートフォンでも学習可能

## 技術スタック

- Next.js / React / TypeScript
- Pyodide (WebAssembly 版 CPython)
- Tailwind CSS

## 開発

```bash
npm install
npm run dev
```
