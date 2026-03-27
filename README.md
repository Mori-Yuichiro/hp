# Yuichiro Mori - 個人サイト

このリポジトリは **Yuichiro Mori** の個人サイトです。
GitHub Pages で公開しています → [https://Mori-Yuichiro.github.io](https://Mori-Yuichiro.github.io)

---

## GitHub Pages 公開手順（コマンド不要・GUI操作のみ）

> **所要時間：約10分**
> ターミナルやコマンドプロンプトは一切使いません。GitHubのWeb画面だけで完結します。

---

### STEP 1：リポジトリを作成する

1. **https://github.com/Mori-Yuichiro** にアクセスしてログインします。

2. 右上の **「+」ボタン** → **「New repository」** をクリックします。

3. 以下のとおり入力します：
   - **Repository name（リポジトリ名）**：`Mori-Yuichiro.github.io`
     ⚠️ **この名前は正確に入力してください。** GitHubの仕様上、
     `ユーザー名.github.io` という形式にしないとPages公開ができません。
   - **Public** を選択（Privateだと公開URLでアクセスできません）
   - 「Add a README file」のチェックは **オフ** にしておく

4. **「Create repository」** ボタンをクリックします。

---

### STEP 2：ファイルをアップロードする

**方法：ドラッグ＆ドロップで一括アップロード**

1. 作成したリポジトリのページを開きます。

2. ページ中央にある **「uploading an existing file」** のリンクをクリックします。
   （または「Add file」→「Upload files」でも同じ画面に進めます）

3. このフォルダ（`Mori-Yuichiro.github.io/`）の中にある以下のファイル・フォルダを
   **すべて選択して、ブラウザの画面にドラッグ＆ドロップ**します：
   ```
   index.html
   works.html
   css/        ← フォルダごとドロップ
   js/         ← フォルダごとドロップ
   README.md
   ```
   > **フォルダをドロップするときの注意：**
   > フォルダはそのままドラッグ＆ドロップできます。
   > ファイルをフォルダから取り出してアップロードすると
   > パスが変わってCSSが当たらなくなるので気をつけてください。

4. 画面下部の「Commit changes」ボタンをクリックします。
   コミットメッセージはそのまま（「Add files via upload」）で問題ありません。

---

### STEP 3：GitHub Pages を有効にする

1. リポジトリのページ上部にある **「Settings」タブ** をクリックします。

2. 左サイドバーの **「Pages」** をクリックします。

3. 「Branch」の欄で **「main」** を選択し、フォルダは **「/ (root)」** のまま。

4. **「Save」ボタン** をクリックします。

---

### STEP 4：公開URLを確認する

1. 数分待ちます（最大5分ほどかかる場合があります）。

2. ブラウザで以下のURLにアクセスします：
   👉 **https://Mori-Yuichiro.github.io**

3. 自分のサイトが表示されれば完成です！🎉

> **表示されない場合：**
> - URLのスペルが正しいか確認する
> - Settings → Pages に「Your site is live at...」と表示されているか確認する
> - 少し待ってからリロードする（ブラウザキャッシュをクリアするには Ctrl+Shift+R / Cmd+Shift+R）

---

### STEP 5：ファイルを更新したいとき

テキストや色を変えたい場合は、GitHubのWeb画面から直接編集できます。

1. リポジトリのページを開き、変更したいファイル（例：`index.html`）をクリックします。

2. 右上の **鉛筆アイコン（Edit this file）** をクリックします。

3. 内容を直接編集します。

4. ページ下部の **「Commit changes」** ボタンをクリックします。

5. 数分後に自動でサイトに反映されます。

---

### STEP 6：テキスト・色のカスタマイズ方法

#### テキストを変更したい場合

各HTMLファイルには日本語のコメントが入っています。
「ここを変えてください」「URLを変更するには〜」などの案内に従って編集してください。

たとえば `index.html` の自己紹介テキストはここにあります：
```html
<!-- ここのテキストを自由に編集してください -->
<div class="about-text">
  <p class="about-para reveal">
    はじめまして、Yuichiro Moriです。...
  </p>
```

#### 色を変更したい場合

`css/style.css` の先頭にある `:root { ... }` の部分を編集します：

```css
:root {
  --bg: #0d0d0d;       /* ← 背景色（ほぼ黒） */
  --text: #f0f0f0;     /* ← テキスト色（オフホワイト） */
  --accent: #7b61ff;   /* ← アクセントカラー（パープル） */
}
```

ここの値を変えるだけでサイト全体の色が変わります。

#### リンク先URLを変更したい場合

HTMLファイル内で `href="https://..."` と書かれている箇所を変更します。
各リンクの近くに `<!-- URLを変更する場合は〜 -->` というコメントがあります。

---

## ファイル構成

```
Mori-Yuichiro.github.io/
├── index.html        # 自己紹介・プロフィールページ
├── works.html        # ポートフォリオ・作品紹介ページ
├── css/
│   └── style.css     # デザイン全般（色・フォント・レイアウト）
├── js/
│   └── main.js       # アニメーション・インタラクション
└── README.md         # このファイル
```

---

© 2026 Yuichiro Mori
