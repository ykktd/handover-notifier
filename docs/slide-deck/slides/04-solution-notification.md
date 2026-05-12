# Slide 04: 解決策

## Role

Handover Notifier の価値を「引き継ぎを通知に変える」と一言で伝える。

## Audience reaction

資料を探しに行く代わりに、必要な日に通知として届くという変化を直感的に理解してもらう。

## Display text

```text
引き継ぎを
「通知」に変える。

・Slack や Gmail に自動通知
・タスク内容と日付を事前登録
・必要な日に思い出せる
```

## Visual direction

- Slack風通知カード
- Gmail風通知カード
- スマホやPCで通知を見る大学生
- 小さな通知ボット

## Required assets

- 通知カードはHTML/CSSまたは実例に基づくモック
- 人物・背景・ボットはGPT Images

## Avoid

- 未実装の通知形式を勝手に足さない
- 通知ごとにSlackチャンネルを選べるように見せない
- Slack/Gmailの正確なUIを生成画像に任せない

## Implementation notes

- 通知カードの文言やUIは実装済み機能と矛盾しない範囲にする
- ボットは補助的に配置し、主役は「通知に変わる」体験にする
