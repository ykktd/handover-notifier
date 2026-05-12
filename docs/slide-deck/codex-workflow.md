# Codex Workflow

## Codexへの基本指示

Codexに作業させる際は、まず以下の方針を共有します。

```text
このリポジトリ内で、Handover Notifier をサークルメンバーに紹介するためのスライドを作成します。

既存アプリのUI、デザイン、スクリーンショット、仕様を尊重してください。
スライドはHTML/CSSで実装し、日本語テキストは画像生成に含めず、HTMLテキストとして配置してください。
GPT Imagesは背景、人物、ロボット、装飾素材の生成にのみ使う想定です。
実アプリUIは、docs内のスクリーンショットやsrc内の実装を参照してください。
架空のUIや未実装の機能を勝手に作らないでください。
```

## 最初にCodexへ依頼する作業

いきなりスライドを実装させず、まず既存アプリのデザインと仕様を棚卸しします。

### 依頼1：アプリデザインの要約

```text
AGENTS.md と docs/slide-deck/handover_notifier_slide_plan_for_codex.md を読んだうえで、
src/index.html、src/app.html、src/style.html、bot-wireframe.jsx、preview.html、
docs/screenshot-home.png、docs/screenshot-edit.png、docs/screenshot-settings.png を参照し、
Handover Notifier の実アプリデザインを整理してください。

以下の観点でまとめてください。
- メインカラー
- アクセントカラー
- 背景色
- カードデザイン
- ボタンデザイン
- 角丸
- 影
- 余白
- フォント感
- アイコンや装飾の使い方
- 画面全体の雰囲気

出力先：docs/slide-deck/app-design-summary.md
```

### 依頼2：プロダクト事実の整理

```text
AGENTS.md と docs/slide-deck/handover_notifier_slide_plan_for_codex.md を読んだうえで、
README.md、docs/handover-bot-spec.md、docs/ARCHITECTURE.md、
src/Code.gs、src/Notifier.gs、src/Models.gs を参照して、
スライドで正しく説明すべきプロダクト事実を整理してください。

出力先：docs/slide-deck/product-facts.md

特に以下を明確にしてください。
- このアプリでできること
- 通知登録の流れ
- Slack通知の仕組み
- Gmail通知の仕組み
- Apps Scriptの役割
- Google Sheetsの役割
- 年度更新・前年度スケジュール複製に関する機能
- スライドで言ってはいけない誤解を招く表現
```

### 依頼3：デザイントークンの作成

```text
docs/slide-deck/app-design-summary.md と src/style.html をもとに、
スライド制作で再利用するデザイントークンを作成してください。

出力先：docs/slide-deck/design-tokens.md

含める項目：
- 色
- 文字サイズ
- 余白
- 角丸
- 影
- カード
- ボタン
- 通知カード
- スライド背景
```

## 段階的に依頼する流れ

### Step 1: 設計資料の初期作成

```text
AGENTS.md と docs/slide-deck/handover_notifier_slide_plan_for_codex.md を読んでください。

まず、既存ファイルを調査して、以下の2つを作成してください。

1. docs/slide-deck/app-design-summary.md
2. docs/slide-deck/product-facts.md

この段階では slide-src/ の実装はまだ行わないでください。
```

### Step 2: デザイン・スライド仕様の作成

```text
docs/slide-deck/app-design-summary.md と docs/slide-deck/product-facts.md をもとに、
以下を作成してください。

1. docs/slide-deck/design-tokens.md
2. docs/slide-deck/visual-style.md
3. docs/slide-deck/slide-plan.md
4. docs/slide-deck/slides/ 配下の9枚分のスライド仕様Markdown

この段階でも、まだ slide-src/ の本実装は行わないでください。
```

### Step 3: 試作スライドの実装

```text
slide-src/ にHTML/CSSスライドのテンプレートを作成してください。
まずは Slide 01 と Slide 06 だけを実装してください。

Slide 01 では全体のビジュアルトーンを確認します。
Slide 06 では docs/screenshot-edit.png を使用し、実UI中心のレイアウトを確認します。

この段階では、残り7枚はまだ実装しないでください。
```

### Step 4: 試作レビュー

```text
実装した Slide 01 と Slide 06 を、docs/slide-deck/slides/ の仕様と照合してください。
内容の正確性、デザイン統一、読みやすさ、不要な表現の有無をチェックし、
修正点をリストアップしてください。
```

### Step 5: 残りスライドの実装

```text
Slide 01 と Slide 06 の方針に合わせて、残り7枚を実装してください。
日本語テキストは必ずHTMLテキストとして配置してください。
実UIスクショが必要なスライドでは、docs/ の既存スクリーンショット、または加工済みの slide-assets/references/ の画像を使用してください。
```

### Step 6: 書き出しスクリプト作成

```text
Playwrightを使って、9枚のスライドを1920×1080 PNGとして書き出すスクリプトを作成してください。
出力先は slide-output/png/ としてください。
必要であればPDFも slide-output/pdf/ に出力してください。
```

### Step 7: 最終レビュー

```text
生成されたスライドを、docs/slide-deck/slides/ の仕様と照合してください。
各スライドについて、内容の正確性、デザイン統一、読みやすさ、不要な表現の有無をチェックし、修正案を出してください。
```

## 試作依頼例

```text
まずは slide-src/ にHTML/CSSスライドの最小構成を作り、
Slide 01 と Slide 06 だけを実装してください。

この段階では残り7枚は実装しないでください。
Slide 01 では全体のビジュアルトーンを確認し、
Slide 06 では docs/screenshot-edit.png を使った実UI中心のレイアウトを確認します。
```
