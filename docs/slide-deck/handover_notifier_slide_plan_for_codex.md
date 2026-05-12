# Handover Notifier アプリ紹介スライド作成計画書

## 1. この計画書の目的

このドキュメントは、Handover Notifier をサークルメンバーに紹介するためのスライドを、Codex を使って安定的に作成するための制作計画書です。

今回のスライド制作では、GPT Images にスライド全体を一枚絵として生成させるのではなく、以下の分担で作成します。

- **HTML / CSS**：スライドの文字、レイアウト、余白、図解、UI配置を制御する
- **既存アプリ素材**：実際のアプリUI、アイコン、スクリーンショットを活用する
- **GPT Images**：人物、ロボット、背景、装飾などのビジュアル素材を生成する
- **Codex**：既存アプリのデザインを読み取り、スライド全体の統一感を保ちながら実装する

この方式により、日本語テキストの崩れ、誤った機能説明、スライド間のデザインブレを減らしつつ、視覚的に魅力のある紹介スライドを作成することを目指します。

---

## 2. 前提

### 2.1 AGENTS.md

リポジトリ直下の `AGENTS.md` は、すでに作成済みである前提です。

Codexでスライド制作を進める際は、必ず以下の順に参照します。

1. `AGENTS.md`
2. `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`
3. 既存アプリのソースコード・スクリーンショット

この計画書は、`AGENTS.md` から参照されるスライド制作の詳細計画です。

### 2.2 このファイルの配置場所

この計画書は、以下のパスに保存してください。

```text
docs/slide-deck/handover_notifier_slide_plan_for_codex.md
```

ファイル名に `(1)` などの重複サフィックスが付いている場合は削除し、`AGENTS.md` 内の参照パスと一致させてください。

---

## 3. 既存リポジトリ構成

現状のリポジトリ構成は以下です。

```text
.
├── LICENSE
├── README.md
├── bot-wireframe.jsx
├── docs
│   ├── ARCHITECTURE.md
│   ├── handover-bot-spec.md
│   ├── screenshot-edit.png
│   ├── screenshot-home.png
│   ├── screenshot-settings.png
│   ├── screenshot-step1-extensions.png
│   ├── screenshot-step3-initialize.png
│   └── screenshot-step4-deploy.png
├── preview.html
└── src
    ├── Code.gs
    ├── Models.gs
    ├── Notifier.gs
    ├── app.html
    ├── appsscript.json
    ├── index.html
    └── style.html
```

このうち、スライド制作で特に参照するべきファイルは以下です。

| ファイル | 用途 |
|---|---|
| `README.md` | プロダクト概要、機能説明、導入手順の確認 |
| `docs/handover-bot-spec.md` | 仕様、画面、運用思想の確認 |
| `docs/ARCHITECTURE.md` | 技術構成、Apps Script / Sheets / Slack / Gmail の関係確認 |
| `docs/screenshot-home.png` | 通知一覧画面の実UI素材 |
| `docs/screenshot-edit.png` | 追加・編集フォームの実UI素材 |
| `docs/screenshot-settings.png` | 設定画面の実UI素材 |
| `bot-wireframe.jsx` | UIデザインの原型、コンポーネント構成の参考 |
| `preview.html` | 画面プレビュー、UI確認の参考 |
| `src/index.html` | WebアプリのHTML構成確認 |
| `src/app.html` | アプリ画面のHTML構成確認 |
| `src/style.html` | 実アプリのデザインテーマ、色、余白、カード、ボタンの確認 |
| `src/Code.gs` | Webアプリ、トリガー、初期化などの処理確認 |
| `src/Notifier.gs` | Slack / Gmail 通知処理の確認 |
| `src/Models.gs` | 通知データ構造、スプレッドシート構造の確認 |

---

## 4. 追加する推奨フォルダ構成

既存アプリ本体とスライド制作物が混ざらないように、以下のフォルダを追加します。

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

### 方針

- `docs/slide-deck/` はスライドの設計資料を置く場所
- `slide-assets/` はスライドで使う画像素材を置く場所
- `slide-assets/generated/` はGPT Imagesなどで生成した素材を置く場所
- `slide-assets/references/` は、必要に応じて加工済みの参照画像を置く場所
- `slide-src/` はHTML/CSSでスライドを実装する場所
- `slide-output/` は書き出したPNG、PDFを置く場所
- 既存の `src/` はアプリ本体なので、原則としてスライド制作では変更しない

### スクリーンショットの扱い

既存のスクリーンショットは、原則として以下の元ファイルを直接参照します。

```text
docs/screenshot-home.png
docs/screenshot-edit.png
docs/screenshot-settings.png
```

同じ画像を `slide-assets/references/` に無条件でコピーして二重管理しないでください。

ただし、スライド用にトリミング・マスキング・個人情報除去などの加工をした場合は、加工済みファイルを `slide-assets/references/` に保存して使用して構いません。

---

## 5. Codexへの基本指示

Codexに作業させる際は、まず以下の方針を共有します。

```text
このリポジトリ内で、Handover Notifier をサークルメンバーに紹介するためのスライドを作成します。

既存アプリのUI、デザイン、スクリーンショット、仕様を尊重してください。
スライドはHTML/CSSで実装し、日本語テキストは画像生成に含めず、HTMLテキストとして配置してください。
GPT Imagesは背景、人物、ロボット、装飾素材の生成にのみ使う想定です。
実アプリUIは、docs内のスクリーンショットやsrc内の実装を参照してください。
架空のUIや未実装の機能を勝手に作らないでください。
```

---

## 6. 最初にCodexへ依頼する作業

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

---

## 7. スライド全体のコンセプト

### コアメッセージ

```text
探す引き継ぎから、届く引き継ぎへ。
```

### 伝えたいこと

従来の引き継ぎでは、資料をGoogle Driveなどに置いておいても、後輩が必要なタイミングで自分から探しに行く必要がありました。

Handover Notifier は、引き継ぎ内容をあらかじめ登録しておくことで、必要な日にSlackやGmailへ通知を届けます。

これにより、仕事の抜け漏れを防ぎやすくなり、後輩が常に引き継ぎ資料を気にし続ける心理的負担を減らせます。

---

## 8. スライド構成

全9枚構成とします。

| # | タイトル | 役割 | 主な制作方式 |
|---|---|---|---|
| 1 | 引き継ぎ、ちゃんと届いていますか？ | 問題提起 | 生成背景 + HTML文字 + 実UI要素 |
| 2 | 資料はある。でも見に行かない。 | 従来方式の課題 | 生成背景 + HTML文字 |
| 3 | 抜け漏れは、努力不足ではなく仕組みの問題。 | 課題の再定義 | 生成背景 + HTML文字 |
| 4 | 引き継ぎを「通知」に変える。 | 解決策提示 | 通知UI + 生成キャラクター |
| 5 | 日付を決めれば、その日に届く。 | 仕組み説明 | HTML/CSS図解 + 実UI |
| 6 | 登録するのは、たったこれだけ。 | 使いやすさ訴求 | 実WebアプリUI中心 |
| 7 | もう、ずっと追い続けなくていい。 | 導入メリット | 生成キャラクター + 通知カード |
| 8 | 来年の引き継ぎにも、そのまま使える。 | 継続運用の価値 | HTML/CSS図解 + ロボット素材 |
| 9 | 探す引き継ぎから、届く引き継ぎへ。 | 締め | Before/After構成 + 生成背景 |

---

## 9. 推奨制作順序

最初から9枚すべてを実装しないでください。

まず、以下の2枚を試作します。

1. **Slide 01：表紙**
2. **Slide 06：使い方**

### 理由

- Slide 01で全体のビジュアルトーンを確認できる
- Slide 06で実UIスクショの扱い、文字サイズ、カード表現を確認できる
- この2枚が成立すれば、他のスライドへ展開しやすい
- いきなり9枚作るより、デザインの手戻りを減らせる

### Codexへの試作依頼例

```text
まずは slide-src/ にHTML/CSSスライドの最小構成を作り、
Slide 01 と Slide 06 だけを実装してください。

この段階では残り7枚は実装しないでください。
Slide 01 では全体のビジュアルトーンを確認し、
Slide 06 では docs/screenshot-edit.png を使った実UI中心のレイアウトを確認します。
```

---

## 10. 各スライド仕様

以下の内容を `docs/slide-deck/slides/` 配下に1ファイルずつ分けて保存します。

### Slide 01: 表紙

#### 目的

最初に「引き継ぎって本当に届いているのか？」と問いかけ、聞き手の関心を引く。

#### 表示テキスト

```text
引き継ぎ、
ちゃんと届いていますか？

Handover Notifier
```

#### ビジュアル

- 通知を受け取る大学生風メンバー
- 実アプリアイコンまたはアプリ名
- Slack/Gmail風の通知カード
- 明るく期待感のある背景

#### 制作方式

- 背景・人物はGPT Imagesで素材生成
- 文字はHTML/CSS
- アプリアイコンがある場合は実素材を使用

### Slide 02: 従来の課題

#### 目的

「資料があるだけでは、必要なタイミングで見てもらえない」という問題を提示する。

#### 表示テキスト

```text
資料はある。
でも見に行かない。

・年度初めに資料を作成
・Google Drive に置いて共有
・必要な時は自分で探す
```

#### ビジュアル

- Drive風のクラウドストレージに資料が埋もれている
- どの資料を見るべきか迷っている後輩
- 散らかったファイル、フォルダ、検索アイコン

#### 制作方式

- 背景と人物はGPT Images
- 文字はHTML/CSS
- 背景内に文字を入れない

### Slide 03: 課題の本質

#### 目的

抜け漏れは個人の努力不足ではなく、仕組みで改善できる問題だと示す。

#### 表示テキスト

```text
抜け漏れは、
努力不足ではなく仕組みの問題。

・忙しいと確認を忘れる
・資料の場所を思い出せない
・後輩が常に気にし続ける
```

#### ビジュアル

- 予定、資料、チャット、タスクカードに囲まれて焦る学生
- 忘れていたタスクを示すアイコン
- 重すぎないが、課題感が伝わる雰囲気

#### 制作方式

- 背景と人物はGPT Images
- 文字はHTML/CSS

### Slide 04: 解決策

#### 目的

Handover Notifier の価値を「引き継ぎを通知に変える」と一言で伝える。

#### 表示テキスト

```text
引き継ぎを
「通知」に変える。

・Slack や Gmail に自動通知
・タスク内容と日付を事前登録
・必要な日に思い出せる
```

#### ビジュアル

- Slack風通知カード
- Gmail風通知カード
- スマホやPCで通知を見る大学生
- 小さな通知ボット

#### 制作方式

- 通知カードはHTML/CSSまたは実例に基づくモック
- 人物・背景・ボットはGPT Images
- 未実装の通知形式を勝手に足さない

### Slide 05: 仕組み

#### 目的

ユーザー視点で、通知が届くまでの流れを簡潔に説明する。

#### 表示テキスト

```text
日付を決めれば、
その日に届く。

・Webアプリから予定を登録
・Apps Script が毎朝チェック
・Slack / Gmail に通知
```

#### ビジュアル

横方向のフロー図をHTML/CSSで作る。

```text
Webアプリ
  → 登録された通知
  → Apps Script がチェック
  → Slack / Gmail に通知
```

#### 注意

- Google Calendarのように見せない
- Google Sheetsをユーザーが直接編集するように見せない
- Apps Script の説明は詳細化しすぎない

#### 制作方式

- フロー図はHTML/CSS
- 背景装飾のみGPT ImagesまたはCSS
- 可能であれば実アプリの画面スクショを小さく添える

### Slide 06: 使い方

#### 目的

「これなら自分でも通知を登録できそう」と感じてもらう。

#### 表示テキスト

```text
登録するのは、
たったこれだけ。

・通知タイトル
・本文・参考リンク
・送信日・送信先

Webアプリから入力して、通知を予約。
```

#### ビジュアル

- `docs/screenshot-edit.png` を中心に使用
- Webアプリの追加・編集フォームを大きく見せる
- 右側または下部に通知プレビューカード
- 小さなチェックマークやボットを補助的に配置

#### 注意

- 「期待できる効果」という内容にしない
- 「生産性」「リードタイム」「見逃しゼロ」は使わない
- 予定変更を自動検知するような表現は使わない

#### 制作方式

- 実UIスクショ中心
- テキストはHTML/CSS
- 装飾のみGPT ImagesまたはCSS

### Slide 07: 導入メリット

#### 目的

機能説明から、聞き手にとってのメリットへ戻す。

#### 表示テキスト

```text
もう、ずっと
追い続けなくていい。

・抜け漏れを防ぎやすい
・確認の心理的負担が減る
・引き継ぎ品質が安定する
```

#### ビジュアル

- 通知を見て安心している後輩メンバー
- チェック済みタスク
- 整理されたカレンダーやタスクカード

#### 注意

- 「見逃しゼロ」と断定しない
- 企業向けSaaSのような過度な業務改善表現にしない

#### 制作方式

- 人物・背景はGPT Images
- 通知カードと文字はHTML/CSS

### Slide 08: 年度交代への対応

#### 目的

このツールが単発ではなく、毎年の役職交代で使えることを示す。

#### 表示テキスト

```text
来年の引き継ぎにも、
そのまま使える。

・前年度の予定をベースにできる
・通知日を次年度に更新
・送信済み状態をリセット
```

#### ビジュアル

- 2025年度の通知一覧から2026年度の通知一覧へコピーされる図
- 通知日が1年進む表現
- 小さなロボットが年度更新を手伝う

#### 制作方式

- 年度比較と通知カードはHTML/CSS
- ロボットはGPT Images
- 実装にない機能を足さない

### Slide 09: まとめ

#### 目的

最初の問題提起に戻り、導入価値を一言で締める。

#### 表示テキスト

```text
探す引き継ぎから、
届く引き継ぎへ。

必要な情報を、必要な日に。
```

#### ビジュアル

Before / After 構成。

```text
Before：資料を探す
After：通知が届く
```

#### 制作方式

- 背景と人物はGPT Images
- Before/Afterラベルと本文はHTML/CSS
- 最後にアプリ名またはアイコンを配置

---

## 11. GPT Imagesで生成する素材

GPT Imagesでは、完成スライド全体ではなく、以下の素材を生成します。

### 背景素材

| 素材 | 使用スライド |
|---|---|
| 明るい通知テーマ背景 | 1 |
| 資料が埋もれる背景 | 2 |
| 忙しさ・不安を表す背景 | 3 |
| 通知で安心する背景 | 7 |
| Before/After背景 | 9 |

### キャラクター素材

| 素材 | 使用スライド |
|---|---|
| 通知を受け取る大学生 | 1, 4 |
| 困っている後輩 | 2, 3 |
| PCで登録する大学生 | 6 |
| 安心して作業するメンバー | 7 |
| 年度更新を手伝うロボット | 8 |

### 装飾素材

| 素材 | 使用スライド |
|---|---|
| 通知ベル | 複数 |
| チェックマーク | 複数 |
| カレンダー | 5, 7, 8 |
| タスクカード | 3, 7, 8 |
| 小さな通知ボット | 4, 6, 8 |
| 淡い波形背景 | 複数 |

---

## 12. GPT Images用の共通プロンプト方針

画像生成で使う素材は、以下の共通方針に従います。

```text
16:9 horizontal presentation visual asset.
Clean Japanese IT service introduction style.
White background, soft blue and purple main colors, yellow/orange notification accents.
Friendly university club atmosphere.
Soft flat illustration, clean lighting, spacious composition.
No Japanese text, no English text, no logos, no UI text.
```

日本語で指示する場合は以下です。

```text
16:9横長プレゼン用のビジュアル素材。
白背景、淡いブルーと紫、通知を表す黄色・オレンジのアクセント。
大学サークル向けの親しみやすいITサービス紹介風。
やわらかいフラットイラスト。
清潔感があり、余白を広めに取る。
文字なし、ロゴなし、具体的なUI文字なし。
```

### 重要ルール

- 画像内に日本語テキストを入れない
- 実UIは生成せず、既存スクリーンショットを使う
- 人物、ロボット、背景、装飾だけを生成する
- スライドの意味や文言はHTML/CSS側で固定する

---

## 13. 画像素材のレイヤールール

生成素材をHTML/CSSスライドに合成しやすくするため、以下を守ります。

### 背景素材

- 文字・具体的UI・ロゴを含めない
- 左側または中央にテキストを置ける余白を残す
- 実UIスクリーンショットより目立ちすぎない
- スライドの主役ではなく雰囲気作りに使う

### キャラクター素材

- できるだけ背景なし、透過背景、または単色背景で生成する
- スライド上では補助的に配置する
- 実UIスクリーンショットの上に重なりすぎない
- 人物の表情やポーズはスライドの目的に合わせる

### ロボット・装飾素材

- 小さめに使う前提で生成する
- アプリの機能を誤解させる動作はさせない
- 通知、チェック、年度更新など、スライドの理解を補助する用途に限定する

---

## 14. HTML/CSSスライド実装方針

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

---

## 15. 書き出し方法

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

---

## 16. 品質確認チェックリスト

各スライド完成後、以下を確認します。

### 内容チェック

- スライドの役割に合っているか
- 伝えたいメッセージが一目でわかるか
- 誤った機能説明がないか
- 未実装の機能を示唆していないか
- サークルメンバー向けの言葉遣いになっているか

### デザインチェック

- 実アプリのデザインと違和感がないか
- 文字が読みやすいか
- 余白が十分か
- UIスクショが小さすぎないか
- 背景が主張しすぎていないか
- スライド間で色、角丸、影、余白が統一されているか

### 画像チェック

- 画像内に不要な文字が入っていないか
- 人物やロボットが主役を奪っていないか
- 実UIと矛盾する描写がないか
- 視覚的に楽しいが、情報を邪魔していないか

---

## 17. Codexに段階的に依頼する流れ

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

---

## 18. 最終成果物

最終的に以下を作成します。

| 成果物 | 内容 | 必須 |
|---|---|---|
| `slide-output/png/slide01.png` 〜 `slide09.png` | 各スライド画像 | 必須 |
| `slide-output/pdf/handover-notifier-intro.pdf` | PDF版スライド | 必須 |
| `docs/slide-deck/` | スライド設計資料一式 | 必須 |
| `slide-src/` | HTML/CSSスライド実装 | 必須 |
| `slide-assets/` | 参照画像・生成素材 | 必須 |
| `slide-output/pptx/handover-notifier-intro.pptx` | PowerPoint版。必要な場合のみ、画像貼り込み形式で作成 | 任意 |

---

## 19. 重要な制作判断

この制作では、スライドの意味を画像生成に委ねないことを最優先にします。

具体的には、以下を守ります。

- スライドの見出し・本文はHTML/CSSで固定する
- 実アプリUIはスクリーンショットを使う
- GPT Imagesには背景、人物、ロボット、装飾だけを任せる
- 仕様にない機能を視覚的にも文章的にも入れない
- スライドごとの役割を混同しない
- 最初に全9枚を一気に作らず、Slide 01 と Slide 06 で方針を検証する

この方針により、画像生成の魅力を活かしながら、誤情報やデザインのブレを最小化します。

---

## 20. 最初に実行するべきCodexプロンプト

最初は、実装ではなく調査と設計資料の作成に限定します。

```text
AGENTS.md と docs/slide-deck/handover_notifier_slide_plan_for_codex.md を読んでください。

このリポジトリで、Handover Notifier をサークルメンバーに紹介するための9枚構成のスライドを作成します。

スライドはHTML/CSSで実装し、日本語テキストは画像生成ではなくHTMLテキストとして配置します。
実アプリのUIとデザインを優先し、docs/screenshot-home.png、docs/screenshot-edit.png、docs/screenshot-settings.png、src/style.html、src/app.html、bot-wireframe.jsx、preview.html を参照してください。

まず、既存ファイルを調査して、以下の2つだけを作成してください。

1. docs/slide-deck/app-design-summary.md
2. docs/slide-deck/product-facts.md

この段階では、slide-src/ の作成やスライド実装はまだ行わないでください。

注意：
- 架空のUIや未実装の機能を作らないでください。
- 「予定の変更を自動でキャッチ」「見逃しゼロ」「Google Calendar連携」のような表現は使わないでください。
- 通常ユーザーがGoogle Sheetsを直接編集するようには見せないでください。
- GPT Imagesは背景、人物、ロボット、装飾素材の生成にだけ使う前提で設計してください。
```
