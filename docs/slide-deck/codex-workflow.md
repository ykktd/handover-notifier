# Codex Workflow

## 目的

このドキュメントは、Handover Notifier 紹介スライドを Codex で段階的に作成するための作業手順を定義する。

作業は一度に全て実装せず、以下の順に進める。

1. 既存アプリの調査
2. 設計資料の作成
3. Slide 01 と Slide 06 の試作
4. 試作レビュー
5. 残り7枚の実装
6. PNG/PDF書き出し
7. 最終レビュー

---

## 基本方針

Codexに作業させる際は、毎回まず以下を読む。

- `AGENTS.md`
- `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`

作業内容に応じて、必要な詳細ファイルだけを追加で読む。

共通ルール：

- 既存アプリのUI、デザイン、スクリーンショット、仕様を尊重する
- スライドはHTML/CSSで実装する
- 日本語テキストは画像生成に含めず、HTMLテキストとして配置する
- GPT Imagesは背景、人物、ロボット、装飾素材の生成にのみ使う
- 実アプリUIは、`docs/` 内のスクリーンショットや `src/` 内の実装を参照する
- 架空のUIや未実装の機能を勝手に作らない
- `src/` 配下のアプリ本体は、原則として変更しない

---

## 参照ファイル一覧

### 常に読む

- `AGENTS.md`
- `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`

### 全体方針を確認するときに読む

- `docs/slide-deck/deck-brief.md`
- `docs/slide-deck/product-facts.md`

### デザイン・見た目を扱うときに読む

- `docs/slide-deck/app-design-summary.md`
- `docs/slide-deck/design-tokens.md`
- `docs/slide-deck/visual-style.md`
- `docs/slide-deck/asset-policy.md`

### 実装するときに読む

- `docs/slide-deck/implementation-plan.md`
- `docs/slide-deck/design-tokens.md`
- `docs/slide-deck/visual-style.md`
- 対象スライドの仕様ファイル
- 必要な既存スクリーンショット

### レビューするときに読む

- `docs/slide-deck/review-checklist.md`
- `docs/slide-deck/product-facts.md`
- 対象スライドの仕様ファイル

---

## Step 1: 設計資料の初期作成

### 目的

既存アプリのデザインとプロダクト事実を棚卸しする。

### 読むファイル

- `AGENTS.md`
- `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`
- `README.md`
- `docs/handover-bot-spec.md`
- `docs/ARCHITECTURE.md`
- `docs/screenshot-home.png`
- `docs/screenshot-edit.png`
- `docs/screenshot-settings.png`
- `bot-wireframe.jsx`
- `preview.html`
- `src/index.html`
- `src/app.html`
- `src/style.html`
- `src/Code.gs`
- `src/Models.gs`
- `src/Notifier.gs`

### 作成するファイル

- `docs/slide-deck/app-design-summary.md`
- `docs/slide-deck/product-facts.md`

### プロンプト例

```text
AGENTS.md と docs/slide-deck/handover_notifier_slide_plan_for_codex.md を読んでください。

まず、既存ファイルを調査して、以下の2つを作成してください。

1. docs/slide-deck/app-design-summary.md
2. docs/slide-deck/product-facts.md

参照するファイル：
- README.md
- docs/handover-bot-spec.md
- docs/ARCHITECTURE.md
- docs/screenshot-home.png
- docs/screenshot-edit.png
- docs/screenshot-settings.png
- src/index.html
- src/app.html
- src/style.html
- src/Code.gs
- src/Models.gs
- src/Notifier.gs

app-design-summary.md には、メインカラー、アクセントカラー、背景色、カード、ボタン、角丸、影、余白、フォント感、アイコンや装飾の使い方、画面全体の雰囲気を整理してください。

product-facts.md には、このアプリでできること、通知登録の流れ、Slack通知、Gmail通知、Apps Scriptの役割、Google Sheetsの役割、年度更新・前年度スケジュール複製、スライドで避けるべき誤解を整理してください。

この段階では slide-src/ の作成やスライド実装はまだ行わないでください。
```

---

## Step 2: デザイン・スライド仕様の作成

### 目的

Step 1で作成した設計資料をもとに、スライド制作に必要な仕様を作る。

### 読むファイル

- `AGENTS.md`
- `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`
- `docs/slide-deck/deck-brief.md`
- `docs/slide-deck/product-facts.md`
- `docs/slide-deck/app-design-summary.md`
- `docs/slide-deck/asset-policy.md`
- `docs/slide-deck/slides/01-title.md`
- `docs/slide-deck/slides/02-problem-drive.md`
- `docs/slide-deck/slides/03-problem-system.md`
- `docs/slide-deck/slides/04-solution-notification.md`
- `docs/slide-deck/slides/05-how-it-works.md`
- `docs/slide-deck/slides/06-easy-registration.md`
- `docs/slide-deck/slides/07-benefits.md`
- `docs/slide-deck/slides/08-year-transition.md`
- `docs/slide-deck/slides/09-summary.md`

### 作成するファイル

- `docs/slide-deck/design-tokens.md`
- `docs/slide-deck/visual-style.md`
- `docs/slide-deck/slide-plan.md`

### プロンプト例

```text
AGENTS.md、docs/slide-deck/handover_notifier_slide_plan_for_codex.md、docs/slide-deck/deck-brief.md、docs/slide-deck/product-facts.md、docs/slide-deck/app-design-summary.md、docs/slide-deck/asset-policy.md を読んでください。

それらをもとに、以下を作成してください。

1. docs/slide-deck/design-tokens.md
2. docs/slide-deck/visual-style.md
3. docs/slide-deck/slide-plan.md

そのうえで、以下をレビューしてください。

4. docs/slide-deck/slides/ 配下の9枚分のスライド仕様Markdown

各スライド仕様が次の構成になっているか、内容について各種資料との整合性が取れているか、スライドとして伝わりやすい構成になっているかなどをチェックしてください。

- Role
- Audience reaction
- Display text
- Visual direction
- Required assets
- Avoid
- Implementation notes

この段階では、まだ slide-src/ の本実装は行わないでください。
```

---

## Step 3: 試作スライドの実装

### 目的

全体実装前に、表紙と実UI中心スライドでデザイン方針を検証する。

### 対象

- Slide 01
- Slide 06

### 読むファイル

- `AGENTS.md`
- `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`
- `docs/slide-deck/deck-brief.md`
- `docs/slide-deck/product-facts.md`
- `docs/slide-deck/app-design-summary.md`
- `docs/slide-deck/design-tokens.md`
- `docs/slide-deck/visual-style.md`
- `docs/slide-deck/asset-policy.md`
- `docs/slide-deck/implementation-plan.md`
- `docs/slide-deck/slides/01-title.md`
- `docs/slide-deck/slides/06-easy-registration.md`
- `docs/screenshot-edit.png`

### 作成・更新するファイル

- `slide-src/`
- `slide-src/index.html`
- `slide-src/styles.css`
- `slide-src/slides/slide01.html`
- `slide-src/slides/slide06.html`

### プロンプト例

```text
AGENTS.md、docs/slide-deck/handover_notifier_slide_plan_for_codex.md、docs/slide-deck/deck-brief.md、docs/slide-deck/product-facts.md、docs/slide-deck/app-design-summary.md、docs/slide-deck/design-tokens.md、docs/slide-deck/visual-style.md、docs/slide-deck/asset-policy.md、docs/slide-deck/implementation-plan.md、docs/slide-deck/slides/01-title.md、docs/slide-deck/slides/06-easy-registration.md を読んでください。

slide-src/ にHTML/CSSスライドのテンプレートを作成してください。
まずは Slide 01 と Slide 06 だけを実装してください。

Slide 01 では全体のビジュアルトーンを確認します。
Slide 06 では docs/screenshot-edit.png を使用し、実UI中心のレイアウトを確認します。

この段階では、残り7枚はまだ実装しないでください。
```

---

## Step 4: 試作レビュー

### 目的

Slide 01 と Slide 06 が、仕様・プロダクト事実・デザイン方針に合っているか確認する。

### 読むファイル

- `AGENTS.md`
- `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`
- `docs/slide-deck/product-facts.md`
- `docs/slide-deck/review-checklist.md`
- `docs/slide-deck/slides/01-title.md`
- `docs/slide-deck/slides/06-easy-registration.md`
- 実装済みの `slide-src/` 関連ファイル

### プロンプト例

```text
AGENTS.md、docs/slide-deck/handover_notifier_slide_plan_for_codex.md、docs/slide-deck/product-facts.md、docs/slide-deck/review-checklist.md、docs/slide-deck/slides/01-title.md、docs/slide-deck/slides/06-easy-registration.md を読んでください。

実装した Slide 01 と Slide 06 を、各スライド仕様とレビュー基準に照らして確認してください。

以下の観点で問題点と修正案を出してください。

- 内容の正確性
- スライドの役割との一致
- 日本語テキストの読みやすさ
- 実アプリUIとの整合性
- デザイン統一
- 不要な表現や誤解を招く表現の有無

この段階では、指示があるまで修正実装は行わず、まずレビュー結果だけを提示してください。
```

---

## Step 5: 残りスライドの実装

### 目的

試作で固めた方針に合わせて、残り7枚を実装する。

### 対象

- Slide 02
- Slide 03
- Slide 04
- Slide 05
- Slide 07
- Slide 08
- Slide 09

### 読むファイル

- `AGENTS.md`
- `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`
- `docs/slide-deck/deck-brief.md`
- `docs/slide-deck/product-facts.md`
- `docs/slide-deck/app-design-summary.md`
- `docs/slide-deck/design-tokens.md`
- `docs/slide-deck/visual-style.md`
- `docs/slide-deck/asset-policy.md`
- `docs/slide-deck/implementation-plan.md`
- `docs/slide-deck/slides/02-problem-drive.md`
- `docs/slide-deck/slides/03-problem-system.md`
- `docs/slide-deck/slides/04-solution-notification.md`
- `docs/slide-deck/slides/05-how-it-works.md`
- `docs/slide-deck/slides/07-benefits.md`
- `docs/slide-deck/slides/08-year-transition.md`
- `docs/slide-deck/slides/09-summary.md`
- 実装済みの Slide 01 / Slide 06 関連ファイル

### プロンプト例

```text
AGENTS.md、docs/slide-deck/handover_notifier_slide_plan_for_codex.md、docs/slide-deck/deck-brief.md、docs/slide-deck/product-facts.md、docs/slide-deck/app-design-summary.md、docs/slide-deck/design-tokens.md、docs/slide-deck/visual-style.md、docs/slide-deck/asset-policy.md、docs/slide-deck/implementation-plan.md と、残り7枚のスライド仕様ファイルを読んでください。

Slide 01 と Slide 06 の実装方針に合わせて、残り7枚を実装してください。

対象：
- Slide 02
- Slide 03
- Slide 04
- Slide 05
- Slide 07
- Slide 08
- Slide 09

日本語テキストは必ずHTMLテキストとして配置してください。
実UIスクショが必要なスライドでは、docs/ の既存スクリーンショット、または加工済みの slide-assets/references/ の画像を使用してください。
架空のUIや未実装の機能は追加しないでください。
```

---

## Step 6: 書き出しスクリプト作成

### 目的

HTML/CSSスライドをPNG/PDFとして出力できるようにする。

### 読むファイル

- `AGENTS.md`
- `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`
- `docs/slide-deck/implementation-plan.md`
- `slide-src/` 関連ファイル

### 作成・更新するファイル

- `slide-src/package.json`
- `slide-src/scripts/export-slides.js`
- `slide-output/png/`
- `slide-output/pdf/`

### プロンプト例

```text
AGENTS.md、docs/slide-deck/handover_notifier_slide_plan_for_codex.md、docs/slide-deck/implementation-plan.md を読んでください。

Playwrightを使って、9枚のスライドを1920×1080 PNGとして書き出すスクリプトを作成してください。

要件：
- 出力先は slide-output/png/
- ファイル名は slide01.png 〜 slide09.png
- 必要であればPDFも slide-output/pdf/ に出力
- 既存の slide-src/ 実装に合わせる
- src/ 配下のアプリ本体は変更しない
```

---

## Step 7: 最終レビュー

### 目的

完成した9枚のスライドを、仕様・レビュー基準・プロダクト事実に照らして確認する。

### 読むファイル

- `AGENTS.md`
- `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`
- `docs/slide-deck/deck-brief.md`
- `docs/slide-deck/product-facts.md`
- `docs/slide-deck/review-checklist.md`
- `docs/slide-deck/slides/*.md`
- `slide-src/` 関連ファイル
- `slide-output/png/` の出力画像

### プロンプト例

```text
AGENTS.md、docs/slide-deck/handover_notifier_slide_plan_for_codex.md、docs/slide-deck/deck-brief.md、docs/slide-deck/product-facts.md、docs/slide-deck/review-checklist.md、docs/slide-deck/slides/ 配下の全スライド仕様を読んでください。

生成された9枚のスライドを、仕様とレビュー基準に照らして確認してください。

各スライドについて、以下を確認してください。

- スライドの役割に合っているか
- 表示テキストが仕様と一致しているか
- プロダクト説明が正確か
- 未実装機能を示唆していないか
- 日本語が自然で読みやすいか
- 実アプリUIとの整合性があるか
- デザインの統一感があるか
- 画像・キャラクター・ロボットが情報を邪魔していないか

まずはレビュー結果と修正案だけを提示してください。
指示があるまで修正実装は行わないでください。
```