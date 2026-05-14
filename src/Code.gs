/**
 * 引き継ぎ通知Bot — エントリーポイントと API 公開層
 *
 * onOpen: スプレッドシートを開いたとき自動実行。カスタムメニューを追加する
 * doGet: Web アプリ表示
 * include: HTML テンプレートで他の HTML ファイルを取り込むヘルパー
 * initialize: 初回セットアップ（シート作成 + 日次トリガー登録）
 * showDeployGuide: ウェブアプリのデプロイ手順をダイアログで表示
 * api*: フロントエンドから google.script.run で呼ぶ API
 */

/** スプレッドシートを開くたびに自動で呼ばれ、カスタムメニューを追加する */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('引き継ぎBot')
    .addItem('① 初回セットアップを実行する', 'initialize')
    .addSeparator()
    .addItem('② ウェブアプリのデプロイ手順を確認する', 'showDeployGuide')
    .addToUi();
}

function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setTitle("引き継ぎ通知Bot")
    .setFaviconUrl(getFaviconUrl_())
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getFaviconUrl_() {
  // Google ドライブのファイルID
  // 元のリンク: https://drive.google.com/file/d/1_cDpKMQqB7oxOqtjRdaVpVaccOQZlD6B/view?usp=drive_link
  const fileId = "1_cDpKMQqB7oxOqtjRdaVpVaccOQZlD6B";
  // ファイル拡張子を付ける（GAS が画像形式を判別するため）
  return "https://drive.google.com/uc?id=" + fileId + "&.png";
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/** 初回セットアップ：シート作成 + 日次トリガー登録。完了後に次のステップを案内する */
function initialize() {
  ensureSheets();
  setupDailyTrigger();
  SpreadsheetApp.getUi().alert(
    'セットアップ完了',
    'シートとトリガーの設定が完了しました。\n\n' +
      '次のステップ：\n' +
      'メニュー「引き継ぎBot」→「② ウェブアプリのデプロイ手順を確認する」\n' +
      'を開き、手順に従ってウェブアプリを公開してください。',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/** デプロイ手順をダイアログで表示する */
function showDeployGuide() {
  SpreadsheetApp.getUi().alert(
    'ウェブアプリのデプロイ手順',
    '1. 上部メニュー「拡張機能」→「Apps Script」でGASエディタを開く\n' +
      '2. 右上「デプロイ」→「新しいデプロイ」\n' +
      '3. 種類：ウェブアプリ\n' +
      '4. 次のユーザーとして実行：自分（デプロイする本人）\n' +
      '5. アクセスできるユーザー：Googleアカウントを持つ全員\n' +
      '6. 「デプロイ」→ 表示されるURLが管理画面の入口になります',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

// ===== Frontend API（google.script.run から呼ばれる）=====

function apiBootstrap() {
  return {
    notifications: listNotifications(),
    settings: getSettings(),
  };
}

function apiSaveNotification(data) {
  return saveNotification(data);
}

function apiDeleteNotification(id) {
  deleteNotification(id);
  return true;
}

function apiSendNow(id) {
  const n = getNotification(id);
  if (!n) throw new Error("通知が見つかりません");
  sendNotification(n);
  setSent(id, true);
  return true;
}

function apiGetSettings() {
  return getSettings();
}

function apiSaveSettings(settings) {
  saveSettings(settings);
  return true;
}

function apiDuplicateForNewYear() {
  return duplicateForNewYear();
}

function apiDeleteAll() {
  deleteAllNotifications();
  return true;
}
