# Handover Notifier Slide Design Tokens

## 目的

このドキュメントは、スライド実装時に使う色、文字、余白、カード、ボタン、UIパーツの基準をまとめる。

基準は `src/style.html`、`docs/slide-deck/app-design-summary.md`、既存スクリーンショットを優先する。スライドは実アプリと同じ空気感を持つ、大学サークル向けの清潔で親しみやすい紹介資料として作る。

## Canvas

| 用途 | 値 |
|---|---|
| スライド比率 | 16:9 |
| 標準サイズ | `1920px x 1080px` |
| 安全余白 | 外周 `96px` 以上 |
| 本文エリア | 左右2カラムまたは中央寄せ |
| 背景 | 白または淡いベージュ |

Slide 01 と Slide 09 は表紙・締めとして中央寄せまたは大きなビジュアルを使ってよい。Slide 06 は実UIスクリーンショットを大きく見せる。

## Color Tokens

### App Base

| Token | Value | 用途 |
|---|---:|---|
| `--slide-bg` | `#f0ede8` | 実アプリ由来の淡い背景 |
| `--slide-surface` | `#ffffff` | カード、UI面、スクリーンショット台紙 |
| `--slide-border` | `#e0dbd2` | カード枠線、区切り線 |
| `--slide-text` | `#1a1a1a` | 見出し、本文 |
| `--slide-text-sub` | `#777777` | 補足、キャプション |
| `--slide-text-mute` | `#bbbbbb` | 件数、弱いメタ情報 |

### Brand And Accent

| Token | Value | 用途 |
|---|---:|---|
| `--slide-accent` | `#3d6b52` | 見出し強調、主ボタン、ロゴ、矢印 |
| `--slide-accent-light` | `#e8f0eb` | グリーン系の薄い背景、選択状態 |
| `--slide-accent-mid` | `#5a8a6e` | リンク、小さな強調 |
| `--slide-yellow` | `#d08000` | 通知、年度複製、注意喚起の補助 |
| `--slide-yellow-light` | `#fef9ec` | 通知カード、複製バナー背景 |
| `--slide-yellow-border` | `#f0d080` | 黄色系パーツの枠線 |

### Destination Badges

| Token | Value | 用途 |
|---|---:|---|
| `--slide-slack` | `#4a154b` | Slackバッジ文字・アイコン |
| `--slide-slack-bg` | `#f3eef5` | Slackバッジ背景 |
| `--slide-gmail` | `#c5221f` | Gmailバッジ文字・アイコン |
| `--slide-gmail-bg` | `#fdf0ef` | Gmailバッジ背景 |

### Danger

| Token | Value | 用途 |
|---|---:|---|
| `--slide-danger` | `#c0392b` | 削除など危険操作を示す必要がある場合 |
| `--slide-danger-light` | `#fdf0ef` | 危険操作の薄い背景 |
| `--slide-danger-border` | `#f5c6c2` | 危険操作の枠線 |

## Typography

| 用途 | 推奨 |
|---|---|
| フォント | `Noto Sans JP`, system sans-serif |
| 大見出し | `64px - 82px`, weight `700`, line-height `1.18` |
| サブ見出し | `34px - 44px`, weight `700`, line-height `1.35` |
| 本文・箇条書き | `28px - 34px`, weight `500`, line-height `1.6` |
| 小ラベル | `20px - 24px`, weight `700`, line-height `1.4` |
| 注釈 | `18px - 22px`, weight `400`, line-height `1.5` |

日本語テキストはHTML/CSSで配置する。1スライド1メッセージを原則とし、箇条書きは最大3点にする。

## Layout Tokens

| 用途 | 値 |
|---|---|
| 基本グリッド | 12カラム相当 |
| 大きな左右余白 | `96px - 128px` |
| カラム間 | `64px - 96px` |
| セクション間 | `40px - 64px` |
| カード内余白 | `24px - 36px` |
| 小パーツ間 | `8px - 16px` |

スライドは情報を詰め込みすぎず、実アプリの「中央にまとまった管理画面」の印象を保つ。

## Card Tokens

| 用途 | 値 |
|---|---|
| 背景 | `#ffffff` |
| 枠線 | `1px solid #e0dbd2` |
| 通知カード角丸 | `10px` |
| フォームカード角丸 | `12px` |
| モーダル風カード角丸 | `14px` |
| 通常影 | なし、またはごく薄い影 |
| 強調影 | `0 8px 32px rgba(26, 26, 26, 0.12)` 以内 |

実アプリは影より枠線で区切るデザインなので、スライドでもカードを浮かせすぎない。

## Button And Badge Tokens

### Primary Button

```css
background: #3d6b52;
color: #ffffff;
border-radius: 8px;
padding: 11px 20px;
font-weight: 700;
```

### Secondary Button

```css
background: #ffffff;
color: #777777;
border: 1px solid #e0dbd2;
border-radius: 8px;
```

### Yellow Action

```css
background: #d08000;
color: #ffffff;
border-radius: 6px;
```

黄色は通知、年度複製、注意を引く補助表現に限定する。

### Destination Badge

```css
display: inline-flex;
align-items: center;
gap: 4px;
padding: 2px 8px;
border-radius: 20px;
font-size: 11px;
font-weight: 700;
```

Slack / Gmail の正確なUIを生成画像で作らず、バッジやカードはHTML/CSSで作る。

## Form And UI Tokens

| パーツ | 基準 |
|---|---|
| 入力欄 | 白背景、`1px solid #e0dbd2`、`8px`角丸 |
| メッセージ欄 | `1.5px solid #3d6b52`、`8px`角丸 |
| セグメントボタン | 白背景、選択時は `#e8f0eb` + `#3d6b52` |
| 通知カード | タイトル、本文プレビュー、日付、送信先バッジ |
| 年度複製バナー | `#fef9ec` 背景、`#f0d080` 枠線、黄色アイコン |

Slide 06 では `docs/screenshot-edit.png` を主役にし、実UIにない入力項目を足さない。

## Screenshot Tokens

| 素材 | 用途 |
|---|---|
| `docs/screenshot-home.png` | 通知一覧、年度複製、カードUI |
| `docs/screenshot-edit.png` | 追加・編集フォーム、登録の簡単さ |
| `docs/screenshot-settings.png` | Slack / Gmail 設定の説明が必要な場合 |

スクリーンショットは原則として元ファイルを直接参照する。加工が必要な場合だけ `slide-assets/references/` に加工済みファイルを置く。

## Generated Asset Tokens

生成画像は以下だけに使う。

- 背景
- 大学生風メンバー
- 小さな通知ボット・ロボット
- 通知ベル、チェック、カレンダーなどの装飾

生成画像には日本語・英語テキスト、実UI、正確なフォーム、Slack/Gmailの詳細UIを含めない。

## Implementation Guardrails

- 実アプリ由来のベージュ、白、グリーン、黄色を主役にする。
- `asset-policy.md` の青紫系指定は補助色として扱い、デッキ全体の主色にはしない。
- 企業向けSaaS風の濃い青、紫グラデーション、重いダッシュボード表現に寄せない。
- カード、ボタン、バッジは実アプリの角丸と枠線感に合わせる。
- スライド本文は短く、自然な日本語にする。
