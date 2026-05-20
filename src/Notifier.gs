/**
 * 引き継ぎ通知Bot — 通知送信 & 定期実行トリガー
 *
 * 送信先は notification.dest（'slack' / 'email'）で分岐。
 * 設定値（Webhook URL・送信先メール）は settings シートから読む。
 */

function sendNotification(notification) {
  const settings = getSettings();
  if (notification.dest === 'slack') {
    sendToSlack_(notification, settings.slackWebhookUrl);
  } else if (notification.dest === 'email') {
    sendToEmail_(notification, settings.gmailAddresses);
  } else {
    throw new Error('未対応の送信先: ' + notification.dest);
  }
}

function sendToSlack_(notification, webhookUrl) {
  if (!webhookUrl) {
    throw new Error('Slack Webhook URL が未設定です（設定画面から登録してください）');
  }
  const text = '*' + notification.title + '*\n\n' + notification.message;

  const res = UrlFetchApp.fetch(webhookUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ text: text }),
    muteHttpExceptions: true
  });
  if (res.getResponseCode() >= 300) {
    throw new Error('Slack 送信失敗: ' + res.getContentText());
  }
}

function sendToEmail_(notification, addresses) {
  if (!addresses) {
    throw new Error('送信先メールアドレスが未設定です（設定画面から登録してください）');
  }
  const to = addresses.split(',').map(s => s.trim()).filter(Boolean).join(',');
  if (!to) throw new Error('有効なメールアドレスがありません');

  MailApp.sendEmail({
    to: to,
    subject: '【引き継ぎ通知】' + notification.title,
    body: notification.message
  });
}

/** 時間主導型トリガーから 1 日 1 回呼ばれる。当日の未送信通知を送る。 */
function dailyTrigger() {
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  listNotifications().forEach(n => {
    if (n.date === today && !n.sent) {
      try {
        sendNotification(n);
        setSent(n.id, true);
      } catch (e) {
        console.error('送信失敗 id=' + n.id + ' / ' + e.message);
        MailApp.sendEmail(
          Session.getEffectiveUser().getEmail(),
          '[Handover Notifier] 送信エラー',
          '通知 id=' + n.id + ' の送信に失敗しました。\n\nエラー: ' + e.message
        );
      }
    }
  });
}

/** 初回セットアップ時のみ実行。毎朝 8 時に dailyTrigger を回す。 */
function setupDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'dailyTrigger') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('dailyTrigger')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
}
