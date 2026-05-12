# Implementation Plan

## 基本方針

既存アプリ本体とスライド制作物が混ざらないように、スライド関連ファイルは専用ディレクトリに置きます。

- `docs/slide-deck/` はスライドの設計資料を置く場所
- `slide-assets/` はスライドで使う画像素材を置く場所
- `slide-assets/generated/` はGPT Imagesなどで生成した素材を置く場所
- `slide-assets/references/` は、必要に応じて加工済みの参照画像を置く場所
- `slide-src/` はHTML/CSSでスライドを実装する場所
- `slide-output/` は書き出したPNG、PDFを置く場所
- 既存の `src/` はアプリ本体なので、原則としてスライド制作では変更しない

## 推奨フォルダ構成

```text
.
├── AGENTS.md
├── docs
│   ├── ARCHITECTURE.md
│   ├── handover-bot-spec.md
│   ├── screenshot-edit.png
│   ├── screenshot-home.png
│   ├── screenshot-settings.png
│   ├── screenshot-step1-extensions.png
│   ├── screenshot-step3-initialize.png
│   ├── screenshot-step4-deploy.png
│   └── slide-deck
│       ├── handover_notifier_slide_plan_for_codex.md
│       ├── deck-brief.md
│       ├── product-facts.md
│       ├── app-design-summary.md
│       ├── design-tokens.md
│       ├── visual-style.md
│       ├── slide-plan.md
│       └── slides
│           ├── 01-title.md
│           ├── 02-problem-drive.md
│           ├── 03-problem-system.md
│           ├── 04-solution-notification.md
│           ├── 05-how-it-works.md
│           ├── 06-easy-registration.md
│           ├── 07-benefits.md
│           ├── 08-year-transition.md
│           └── 09-summary.md
├── slide-assets
│   ├── references
│   │   └── README.md
│   └── generated
│       ├── backgrounds
│       ├── characters
│       ├── robots
│       └── decorations
├── slide-src
│   ├── package.json
│   ├── index.html
│   ├── styles.css
│   ├── slides
│   │   ├── slide01.html
│   │   ├── slide02.html
│   │   ├── slide03.html
│   │   ├── slide04.html
│   │   ├── slide05.html
│   │   ├── slide06.html
│   │   ├── slide07.html
│   │   ├── slide08.html
│   │   └── slide09.html
│   └── scripts
│       └── export-slides.js
└── slide-output
    ├── png
    └── pdf
```

## HTML/CSSスライド実装方針

### 基本仕様

- 16:9
- 1920 × 1080 px 想定
- 1スライド1HTMLまたは1ページ内に9セクション
- 最終的にPNG / PDFへ書き出す
- PPTX化は任意。必要な場合は、各スライド画像を貼り込む形式でよい

### 共通レイアウト

- 左側に大見出しと箇条書き
- 右側にUI、人物、図解などのビジュアル
- 表紙とまとめは中央寄せまたは大きなビジュアルを使用
- 余白を広めに取る
- 背景は白または淡いブルー
- カードは実アプリの雰囲気に合わせる

### 文字ルール

- 大見出しは大きく、短く
- 箇条書きは最大3つ
- 長文説明は避ける
- 小さすぎる注釈は避ける
- 日本語テキストはすべてHTML/CSSで表示する

## 書き出し方法

HTML/CSSで作成したスライドは、PlaywrightなどでPNGとPDFへ書き出します。

想定コマンド例：

```bash
cd slide-src
npm install
npm run export
```

`slide-src/scripts/export-slides.js` は以下を行います。

- `slide-src/index.html` を開く
- 各スライドを1920×1080でスクリーンショット保存
- `slide-output/png/slide01.png` から `slide09.png` に出力
- 必要に応じてPDFも出力

## 最終成果物

| 成果物 | 内容 | 必須 |
|---|---|---|
| `slide-output/png/slide01.png` 〜 `slide09.png` | 各スライド画像 | 必須 |
| `slide-output/pdf/handover-notifier-intro.pdf` | PDF版スライド | 必須 |
| `docs/slide-deck/` | スライド設計資料一式 | 必須 |
| `slide-src/` | HTML/CSSスライド実装 | 必須 |
| `slide-assets/` | 参照画像・生成素材 | 必須 |
| `slide-output/pptx/handover-notifier-intro.pptx` | PowerPoint版。必要な場合のみ、画像貼り込み形式で作成 | 任意 |
