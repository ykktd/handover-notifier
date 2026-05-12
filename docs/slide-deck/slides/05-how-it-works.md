# Slide 05: 仕組み

## Role

ユーザー視点で、通知が届くまでの流れを簡潔に説明する。

## Audience reaction

日付を決めて登録すれば、Apps Script がチェックして Slack / Gmail に送る、という大まかな流れを安心して理解してもらう。

## Display text

```text
日付を決めれば、
その日に届く。

・Webアプリから予定を登録
・Apps Script が毎朝チェック
・Slack / Gmail に通知
```

## Visual direction

横方向のフロー図をHTML/CSSで作る。

```text
Webアプリ
  → 登録された通知
  → Apps Script がチェック
  → Slack / Gmail に通知
```

## Required assets

- フロー図はHTML/CSS
- 背景装飾のみGPT ImagesまたはCSS
- 可能であれば実アプリの画面スクショを小さく添える

## Avoid

- Google Calendarのように見せない
- Google Sheetsをユーザーが直接編集するように見せない
- Apps Script の説明は詳細化しすぎない

## Implementation notes

- 技術の正確さより、ユーザーが理解しやすい流れを優先する
- ただし、Apps Script / Slack / Gmail の関係は `product-facts.md` と矛盾させない
