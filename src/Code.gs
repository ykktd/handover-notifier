/**
 * 引き継ぎ通知Bot — エントリーポイントと API 公開層
 *
 * doGet: Web アプリ表示
 * include: HTML テンプレートで他の HTML ファイルを取り込むヘルパー
 * initialize: 初回セットアップ（GAS エディタから 1 度だけ手動実行）
 * api*: フロントエンドから google.script.run で呼ぶ API
 */

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

/** GAS エディタから 1 度だけ実行：シート作成 + 日次トリガー登録 */
function initialize() {
  ensureSheets();
  setupDailyTrigger();
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
