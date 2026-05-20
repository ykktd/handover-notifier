/**
 * 引き継ぎ通知Bot — データ層（スプレッドシート操作）
 *
 * シート構成
 *   notifications: id, title, message, date, dest, link, sent
 *   settings:      key, value （slackWebhookUrl / gmailAddresses）
 *
 * 全データを「現役データ」として 1 シートで管理する設計（仕様書参照）。
 */

const SHEET_NOTIFICATIONS = 'notifications';
const SHEET_SETTINGS = 'settings';
const COLS = ['id', 'title', 'message', 'date', 'dest', 'link', 'sent'];

/** 初回呼び出し時にシートを作成。既にあれば何もしない。 */
function ensureSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let nSheet = ss.getSheetByName(SHEET_NOTIFICATIONS);
  if (!nSheet) {
    nSheet = ss.insertSheet(SHEET_NOTIFICATIONS);
    nSheet.appendRow(COLS);
    nSheet.getRange(1, 1, 1, COLS.length).setFontWeight('bold');
    nSheet.setFrozenRows(1);
    // date 列を文字列扱いにしてシートの自動日付変換を抑止
    const dateCol = COLS.indexOf('date') + 1;
    nSheet.getRange(2, dateCol, nSheet.getMaxRows() - 1).setNumberFormat('@');
  }

  let sSheet = ss.getSheetByName(SHEET_SETTINGS);
  if (!sSheet) {
    sSheet = ss.insertSheet(SHEET_SETTINGS);
    sSheet.appendRow(['key', 'value']);
    sSheet.getRange(1, 1, 1, 2).setFontWeight('bold');
    sSheet.setFrozenRows(1);
    sSheet.appendRow(['slackWebhookUrl', '']);
    sSheet.appendRow(['gmailAddresses', '']);
    sSheet.appendRow(['roleName', '']);
  }
}

function getSheet_(name) {
  ensureSheets();
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
}
function getNotificationsSheet_() { return getSheet_(SHEET_NOTIFICATIONS); }
function getSettingsSheet_()      { return getSheet_(SHEET_SETTINGS); }

function rowToObj_(row) {
  const obj = {};
  COLS.forEach((col, i) => { obj[col] = row[i]; });
  obj.sent = obj.sent === true || String(obj.sent).toLowerCase() === 'true';
  if (obj.date instanceof Date) {
    obj.date = Utilities.formatDate(obj.date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  } else {
    obj.date = String(obj.date || '');
  }
  obj.title = String(obj.title || '');
  obj.message = String(obj.message || '');
  obj.dest = String(obj.dest || 'slack');
  obj.link = String(obj.link || '');
  obj.id = String(obj.id || '');
  return obj;
}

function objToRow_(obj) {
  return COLS.map(col => obj[col] === undefined || obj[col] === null ? '' : obj[col]);
}

function listNotifications() {
  const sheet = getNotificationsSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, COLS.length).getValues();
  return values.map(rowToObj_);
}

function getNotification(id) {
  return listNotifications().find(n => n.id === id) || null;
}

function findRowById_(id) {
  const sheet = getNotificationsSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(id)) return i + 2;
  }
  return -1;
}

/** 新規 or 更新。新規時は id と sent を補完して返す。 */
function saveNotification(data) {
  const sheet = getNotificationsSheet_();
  if (!data.id) {
    data.id = Utilities.getUuid();
    data.sent = false;
    sheet.appendRow(objToRow_(data));
    return data;
  }
  const rowIdx = findRowById_(data.id);
  if (rowIdx === -1) {
    sheet.appendRow(objToRow_(data));
    return data;
  }
  sheet.getRange(rowIdx, 1, 1, COLS.length).setValues([objToRow_(data)]);
  return data;
}

function deleteNotification(id) {
  const rowIdx = findRowById_(id);
  if (rowIdx > 0) getNotificationsSheet_().deleteRow(rowIdx);
}

function setSent(id, sent) {
  const rowIdx = findRowById_(id);
  if (rowIdx > 0) {
    const sentCol = COLS.indexOf('sent') + 1;
    getNotificationsSheet_().getRange(rowIdx, sentCol).setValue(sent);
  }
}

function getSettings() {
  const sheet = getSettingsSheet_();
  const lastRow = sheet.getLastRow();
  const settings = { slackWebhookUrl: '', gmailAddresses: '', roleName: '' };
  if (lastRow < 2) return settings;
  const values = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  values.forEach(row => {
    if (row[0]) settings[row[0]] = row[1] || '';
  });
  return settings;
}

function saveSettings(settings) {
  const sheet = getSettingsSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow >= 2) sheet.getRange(2, 1, lastRow - 1, 2).clearContent();
  Object.keys(settings).forEach(key => {
    sheet.appendRow([key, settings[key] === undefined ? '' : settings[key]]);
  });
}

/** 全通知の date を +1 年し、sent を false にリセット。 */
function duplicateForNewYear() {
  const sheet = getNotificationsSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  const values = sheet.getRange(2, 1, lastRow - 1, COLS.length).getValues();
  const dateColIdx = COLS.indexOf('date');
  const sentColIdx = COLS.indexOf('sent');
  const tz = Session.getScriptTimeZone();

  const updated = values.map(row => {
    const newRow = row.slice();
    const v = row[dateColIdx];
    const dateStr = v instanceof Date ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : String(v);
    const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) newRow[dateColIdx] = (parseInt(m[1], 10) + 1) + '-' + m[2] + '-' + m[3];
    newRow[sentColIdx] = false;
    return newRow;
  });

  sheet.getRange(2, 1, updated.length, COLS.length).setValues(updated);
  return updated.length;
}

function deleteAllNotifications() {
  const sheet = getNotificationsSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow >= 2) sheet.deleteRows(2, lastRow - 1);
}
