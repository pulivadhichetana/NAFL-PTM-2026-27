/**
 * ═══════════════════════════════════════════════════════════════
 * NAFL PTM PORTAL — GOOGLE SHEETS BACKEND
 * National Academy for Learning, North Bengaluru
 * ═══════════════════════════════════════════════════════════════
 *
 * WHAT THIS DOES:
 * This script turns a Google Sheet into a free shared database for
 * the PTM Portal. Admin uploads data from any device → saved here →
 * every teacher on every device sees the same live data instantly.
 *
 * SETUP INSTRUCTIONS (one-time, ~10 minutes):
 * See HOW_TO_DEPLOY.html for the full step-by-step guide with screenshots.
 *
 * Quick summary:
 * 1. Create a new Google Sheet (sheets.new)
 * 2. Extensions → Apps Script
 * 3. Delete the default code, paste THIS ENTIRE FILE
 * 4. Click Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL it gives you
 * 6. Paste that URL into index.html where it says API_URL
 *
 * ═══════════════════════════════════════════════════════════════
 */

// ── Sheet names used internally (auto-created if missing) ─────────
const SHEET_RECORDS  = 'Records';
const SHEET_SETTINGS = 'Settings';
const SHEET_AUTH     = 'Auth';
const SHEET_LOG      = 'DownloadLog';

/**
 * Entry point for all GET requests (used for reading data)
 * Examples:
 *   ?action=getRecords
 *   ?action=getSettings
 *   ?action=getAuth
 */
function doGet(e) {
  const action = e.parameter.action || '';
  let result;

  try {
    if (action === 'getRecords') {
      result = { ok: true, data: getRecords() };
    } else if (action === 'getSettings') {
      result = { ok: true, data: getSettings() };
    } else if (action === 'getAuth') {
      result = { ok: true, data: getAuth() };
    } else if (action === 'getLog') {
      result = { ok: true, data: getLog() };
    } else if (action === 'ping') {
      result = { ok: true, message: 'NAFL PTM Backend is live', time: new Date().toISOString() };
    } else {
      result = { ok: false, error: 'Unknown action: ' + action };
    }
  } catch (err) {
    result = { ok: false, error: err.message };
  }

  return jsonResponse(result);
}

/**
 * Entry point for all POST requests (used for writing data)
 * Body must be JSON: { action: "...", payload: {...} }
 */
function doPost(e) {
  let result;
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;
    const payload = body.payload;

    if (action === 'saveRecords') {
      saveRecords(payload.records);
      result = { ok: true };
    } else if (action === 'saveSettings') {
      saveSettings(payload.settings);
      result = { ok: true };
    } else if (action === 'savePassword') {
      savePassword(payload.password);
      result = { ok: true };
    } else if (action === 'deleteAllRecords') {
      deleteAllRecords();
      result = { ok: true };
    } else if (action === 'logDownload') {
      logDownload(payload.entry);
      result = { ok: true };
    } else {
      result = { ok: false, error: 'Unknown action: ' + action };
    }
  } catch (err) {
    result = { ok: false, error: err.message };
  }

  return jsonResponse(result);
}

// ═══════════════════════════════════════════════════════════════
// RECORDS — student data + schedule (stored as one JSON blob per row-batch)
// ═══════════════════════════════════════════════════════════════

function getRecordsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_RECORDS);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_RECORDS);
    sheet.appendRow(['data_json', 'updated_at']);
  }
  return sheet;
}

function getRecords() {
  const sheet = getRecordsSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const json = sheet.getRange(2, 1).getValue();
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch (e) {
    return [];
  }
}

function saveRecords(records) {
  const sheet = getRecordsSheet_();
  const lastRow = sheet.getLastRow();
  const json = JSON.stringify(records || []);
  if (lastRow < 2) {
    sheet.appendRow([json, new Date().toISOString()]);
  } else {
    sheet.getRange(2, 1, 1, 2).setValues([[json, new Date().toISOString()]]);
  }
}

function deleteAllRecords() {
  saveRecords([]);
}

// ═══════════════════════════════════════════════════════════════
// SETTINGS — school name, term, year, admin email
// ═══════════════════════════════════════════════════════════════

function getSettingsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_SETTINGS);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_SETTINGS);
    sheet.appendRow(['data_json', 'updated_at']);
    const defaultSettings = {
      schoolName: 'National Academy for Learning',
      schoolCity: 'North Bengaluru',
      term: '1',
      year: '2025-26',
      adminEmail: 'bchethana@naflnorth.com'
    };
    sheet.appendRow([JSON.stringify(defaultSettings), new Date().toISOString()]);
  }
  return sheet;
}

function getSettings() {
  const sheet = getSettingsSheet_();
  const json = sheet.getRange(2, 1).getValue();
  try {
    return JSON.parse(json);
  } catch (e) {
    return {
      schoolName: 'National Academy for Learning',
      schoolCity: 'North Bengaluru',
      term: '1',
      year: '2025-26',
      adminEmail: 'bchethana@naflnorth.com'
    };
  }
}

function saveSettings(settings) {
  const sheet = getSettingsSheet_();
  sheet.getRange(2, 1, 1, 2).setValues([[JSON.stringify(settings), new Date().toISOString()]]);
}

// ═══════════════════════════════════════════════════════════════
// AUTH — admin password (username is fixed in the frontend: PTMCom)
// ═══════════════════════════════════════════════════════════════

function getAuthSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_AUTH);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_AUTH);
    sheet.appendRow(['password', 'updated_at']);
    sheet.appendRow(['PTM@123', new Date().toISOString()]);
    // Hide this sheet from casual viewers (still accessible via API)
    sheet.hideSheet();
  }
  return sheet;
}

function getAuth() {
  const sheet = getAuthSheet_();
  const pwd = sheet.getRange(2, 1).getValue();
  return { password: pwd || 'PTM@123' };
}

function savePassword(newPassword) {
  const sheet = getAuthSheet_();
  sheet.getRange(2, 1, 1, 2).setValues([[newPassword, new Date().toISOString()]]);
}

// ═══════════════════════════════════════════════════════════════
// DOWNLOAD LOG — timestamped record of who downloaded what
// ═══════════════════════════════════════════════════════════════

function getLogSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_LOG);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_LOG);
    sheet.appendRow(['timestamp', 'grade', 'section', 'ct', 'action']);
  }
  return sheet;
}

function getLog() {
  const sheet = getLogSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const range = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
  return range.map(row => ({
    timestamp: row[0],
    grade: row[1],
    section: row[2],
    ct: row[3],
    action: row[4]
  })).reverse().slice(0, 50); // most recent 50
}

function logDownload(entry) {
  const sheet = getLogSheet_();
  sheet.appendRow([
    new Date().toISOString(),
    entry.grade || '',
    entry.section || '',
    entry.ct || '',
    entry.action || ''
  ]);
}

// ═══════════════════════════════════════════════════════════════
// UTILITY
// ═══════════════════════════════════════════════════════════════

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run this once manually from the Apps Script editor (click ▶ Run)
 * to initialize all sheets with correct headers before deploying.
 * Select "initializeSheets" from the function dropdown, then click Run.
 */
function initializeSheets() {
  getRecordsSheet_();
  getSettingsSheet_();
  getAuthSheet_();
  getLogSheet_();
  Logger.log('All sheets initialized successfully.');
}
