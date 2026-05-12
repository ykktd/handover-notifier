# Slide 06: 使い方

## Role

「これなら自分でも通知を登録できそう」と感じてもらう。

## Audience reaction

入力する項目が少なく、Webアプリから簡単に通知予約できると感じてもらう。

## Display text

```text
登録するのは、
たったこれだけ。

・通知タイトル
・本文・参考リンク
・送信日・送信先

Webアプリから入力して、通知を予約。
```

## Visual direction

- `docs/screenshot-edit.png` を中心に使用
- Webアプリの追加・編集フォームを大きく見せる
- 右側または下部に通知プレビューカード
- 小さなチェックマークやボットを補助的に配置

## Required assets

- `docs/screenshot-edit.png`
- 装飾のみGPT ImagesまたはCSS

## Avoid

- 「期待できる効果」という内容にしない
- 「生産性」「リードタイム」「見逃しゼロ」は使わない
- 予定変更を自動検知するような表現は使わない
- 実UIにない入力項目を足さない

## Implementation notes

- 実UIスクショ中心で構成する
- テキストはHTML/CSSで配置する
- Slide 01 と並ぶ試作対象として、スクショの扱い、文字サイズ、カード表現を確認する
