# Handover Notifier アプリ紹介スライド作成計画書

## この計画書の目的

このドキュメントは、Handover Notifier をサークルメンバーに紹介するためのスライド制作で、Codex が最初に読む入口です。

計画書本体は全体方針と参照先を示すハブとして使い、詳細なスライド仕様、画像生成方針、実装方針、レビュー基準、作業手順は用途別ファイルを参照します。

## 前提

リポジトリ直下の `AGENTS.md` は作成済みです。

この計画書は以下のパスに配置します。

```text
docs/slide-deck/handover_notifier_slide_plan_for_codex.md
```

Codex でスライド制作を進める際は、必ず以下の順に参照します。

1. `AGENTS.md`
2. `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`
3. 必要な分割資料
4. 既存アプリのソースコード・スクリーンショット

## 参照すべき既存ファイル

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

## 分割した設計資料

詳細は以下を参照します。

- 全体目的: `docs/slide-deck/deck-brief.md`
- プロダクト事実: `docs/slide-deck/product-facts.md`
- アプリデザイン要約: `docs/slide-deck/app-design-summary.md`
- デザイントークン: `docs/slide-deck/design-tokens.md`
- アセット方針: `docs/slide-deck/asset-policy.md`
- 実装方針: `docs/slide-deck/implementation-plan.md`
- レビュー基準: `docs/slide-deck/review-checklist.md`
- Codex作業手順: `docs/slide-deck/codex-workflow.md`
- 各スライド仕様: `docs/slide-deck/slides/`

## スライド構成

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

各スライドの詳細仕様は `docs/slide-deck/slides/` を参照します。

## 推奨制作順序

最初から9枚すべてを実装せず、まず以下の2枚を試作します。

1. **Slide 01：表紙**
2. **Slide 06：使い方**

Slide 01 で全体のビジュアルトーンを確認し、Slide 06 で実UIスクショの扱い、文字サイズ、カード表現を確認します。この2枚が成立すれば、他のスライドへ展開しやすくなります。

詳しい段階的な依頼手順は `docs/slide-deck/codex-workflow.md` を参照します。

## 最初に実行するべきCodexプロンプト

最初は、実装ではなく調査と設計資料の作成に限定します。

```text
AGENTS.md と docs/slide-deck/handover_notifier_slide_plan_for_codex.md を読んでください。

このリポジトリで、Handover Notifier をサークルメンバーに紹介するための9枚構成のスライドを作成します。

スライドはHTML/CSSで実装し、日本語テキストは画像生成ではなくHTMLテキストとして配置します。
実アプリのUIとデザインを優先し、docs/screenshot-home.png、docs/screenshot-edit.png、docs/screenshot-settings.png、src/style.html、src/app.html を参照してください。

まず、既存ファイルを調査して、以下の2つのレビューのみを行なってください。
内容に改善すべき点があれば、ユーザーに提案を行ってください。

1. docs/slide-deck/app-design-summary.md
2. docs/slide-deck/product-facts.md

この段階では、slide-src/ の作成やスライド実装はまだ行わないでください。

注意：
- 架空のUIや未実装の機能を作らないでください。
- 「予定の変更を自動でキャッチ」「見逃しゼロ」「Google Calendar連携」のような表現は使わないでください。
- 通常ユーザーがGoogle Sheetsを直接編集するようには見せないでください。
- GPT Imagesは背景、人物、ロボット、装飾素材の生成にだけ使う前提で設計してください。
```
