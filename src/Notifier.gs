/**
 * 引き継ぎ通知Bot — 通知送信 & 定期実行トリガー
 *
 * 送信先は notification.dest（'slack' / 'email'）で分岐。
 * Webhook URL は Script Properties、送信先メールは settings シートから読む。
 *
 * メッセージは限定 Markdown（`**太字**` と `[表示](URL)`）を受け付け、
 * Slack には mrkdwn + Block Kit、Gmail には HTML メールに変換して送る。
 */

function sendNotification(notification) {
  const settings = getSettings();
  if (notification.dest === 'slack') {
    sendToSlack_(notification, getSlackWebhookUrl_());
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
  let title = String(notification.title || '通知');
  if (title.length > 3000) title = title.slice(0, 2999) + '…';

  let rawMessage = String(notification.message || '');
  if (rawMessage.length > 3000) rawMessage = rawMessage.slice(0, 2999) + '…';

  // rich_text を使うことで通常サイズのテキストのまま太字を扱い、Slack mrkdwn の CJK 境界問題も回避する
  const blocks = [
    {
      type: 'rich_text',
      elements: [
        { type: 'rich_text_section', elements: [{ type: 'text', text: title, style: { bold: true } }] }
      ]
    },
    { type: 'divider' },
    {
      type: 'rich_text',
      elements: [
        { type: 'rich_text_section', elements: markdownToSlackRichText_(rawMessage) }
      ]
    }
  ];

  const webAppUrl = getWebAppUrl_();
  if (webAppUrl) {
    blocks.push({
      type: 'context',
      elements: [
        { type: 'mrkdwn', text: '通知内容の確認や編集は <' + webAppUrl + '|管理画面> から行えます。' }
      ]
    });
  }

  const payload = { text: title, blocks: blocks };

  const res = UrlFetchApp.fetch(webhookUrl, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
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

  const title = String(notification.title || '');
  const rawMessage = String(notification.message || '');
  const htmlMessage = markdownToHtml_(rawMessage);

  const webAppUrl = getWebAppUrl_();
  const footerHtml = webAppUrl
    ? '<p style="margin:20px 0 0;font-size:12px;color:#666">通知内容の確認や編集は<a href="' + webAppUrl + '" target="_blank" rel="noopener">管理画面</a>から行えます。</p>'
    : '';
  const footerText = webAppUrl ? '\n\n通知内容の確認や編集は管理画面から行えます: ' + webAppUrl : '';

  const htmlBody =
    '<div style="font-family:\'Noto Sans JP\',\'Hiragino Sans\',sans-serif;color:#1a1a1a;line-height:1.8;max-width:640px">' +
      '<h2 style="font-size:18px;margin:0 0 14px">' + escapeHtml_(title) + '</h2>' +
      '<div style="white-space:pre-wrap;font-size:14px">' + htmlMessage + '</div>' +
      footerHtml +
    '</div>';

  MailApp.sendEmail({
    to: to,
    subject: '【引き継ぎ通知】' + title,
    body: rawMessage + footerText,
    htmlBody: htmlBody
  });
}

/* ------------------------------------------------------------
 * Markdown 変換（限定サブセット：`**太字**` と `[表示](URL)`）
 * ------------------------------------------------------------ */

/** Slack rich_text 用の要素配列を返す。テキストはエスケープ不要（リテラル扱い）。 */
function markdownToSlackRichText_(md) {
  const elements = [];
  if (md == null) {
    return [{ type: 'text', text: '' }];
  }
  const s = String(md);
  const re = /\[([^\[\]\n]+)\]\((https?:\/\/[^\s)>|]+)\)|\*\*([^*\n]+)\*\*/g;
  let lastIndex = 0;
  let m;
  while ((m = re.exec(s)) !== null) {
    if (m.index > lastIndex) {
      elements.push({ type: 'text', text: s.substring(lastIndex, m.index) });
    }
    if (m[1] && m[2]) {
      elements.push({ type: 'link', url: m[2], text: m[1] });
    } else if (m[3]) {
      elements.push({ type: 'text', text: m[3], style: { bold: true } });
    }
    lastIndex = re.lastIndex;
  }
  if (lastIndex < s.length) {
    elements.push({ type: 'text', text: s.substring(lastIndex) });
  }
  return elements.length ? elements : [{ type: 'text', text: '' }];
}

function markdownToHtml_(md) {
  return convertMarkdown_(md, {
    bold: function (inner) { return '<strong>' + inner + '</strong>'; },
    link: function (text, url) {
      return '<a href="' + url + '" target="_blank" rel="noopener">' + text + '</a>';
    },
    escape: escapeHtml_
  });
}

function convertMarkdown_(md, opts) {
  if (md == null) return '';
  const s = String(md);
  const re = /\[([^\[\]\n]+)\]\((https?:\/\/[^\s)>|]+)\)|\*\*([^*\n]+)\*\*/g;
  let out = '';
  let lastIndex = 0;
  let m;
  while ((m = re.exec(s)) !== null) {
    if (m.index > lastIndex) {
      out += opts.escape(s.substring(lastIndex, m.index));
    }
    if (m[1] && m[2]) {
      out += opts.link(opts.escape(m[1]), opts.escape(m[2]));
    } else if (m[3]) {
      out += opts.bold(opts.escape(m[3]));
    }
    lastIndex = re.lastIndex;
  }
  if (lastIndex < s.length) {
    out += opts.escape(s.substring(lastIndex));
  }
  return out;
}

function escapeHtml_(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
