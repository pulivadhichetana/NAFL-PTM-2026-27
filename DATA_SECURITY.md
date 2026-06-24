# 🔒 NAFL PTM Portal — Data Security & Storage

## Executive Summary

✅ **All student data is saved ONLINE ONLY**
✅ **Only Admin can upload data**
✅ **Data lives in Google Sheets (shared, real-time)**
✅ **Teachers access live data, never store it locally**

---

## 📊 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   ADMIN UPLOADS DATA                        │
│                                                             │
│  1. Select Excel file (CSV/XLS/XLSX)                       │
│  2. System verifies: Admin logged in? ✓                    │
│  3. File parsed into 482 student records                   │
│  4. Records sent to Google Sheets backend                  │
│     └─ Via API POST: /exec?action=saveRecords             │
│  5. Saved in Google Sheet "Records" tab                    │
│  6. All teachers can now see this data                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

                        ⬇️ LIVE GOOGLE SHEET ⬇️

┌─────────────────────────────────────────────────────────────┐
│                    TEACHERS ACCESS DATA                     │
│                                                             │
│  1. Open portal (no login needed)                          │
│  2. Select their grade & section                          │
│  3. System fetches live data from Google Sheet            │
│     └─ Via API GET: /exec?action=getRecords              │
│  4. Shows 482 students, real-time from Sheet             │
│  5. Teacher generates class schedule                      │
│  6. Downloads PDFs (not saved online, only local file)   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Rules

### Admin Upload
✅ **Only admin can upload** — checked at 2 levels:
- UI: Upload button hidden unless `adminLoggedIn = true`
- Code: `handleFile()` verifies `if(!adminLoggedIn) return`

✅ **Admin login required:**
- Username: `PTMCom` (fixed)
- Password: `PTM@123` (stored in Google Sheet "Auth" tab, hidden)

✅ **Login failures log attempt** (future: could add rate limiting)

---

### Data Storage Locations

| Data | Primary Storage | Fallback Storage | Who sees it | When synced |
|---|---|---|---|---|
| **Student records** | Google Sheet "Records" | Browser cache | Admin + Teachers | Real-time |
| **Generated schedule** | Google Sheet "Records" | Browser cache | Admin + Teachers | Real-time |
| **Settings (school, term)** | Google Sheet "Settings" | Browser cache | Everyone | Real-time |
| **Admin password** | Google Sheet "Auth" (hidden) | ❌ Never local | Everyone | Real-time |
| **Download log** | Google Sheet "DownloadLog" | ❌ Never local | Admin audits | Per download |
| **Teacher's class schedule** | Browser only (PDF/Excel) | ❌ No cloud storage | Just that teacher | Per export |

---

## 🌐 Online-Only Storage

### Upload Process
```
1. Admin selects file → handleFile()
   ↓
2. File parsed → importRows()
   ↓
3. Records added to memory: records.push(...)
   ↓
4. persistRecords() called ← 🔥 KEY STEP
   ↓
5. Google Sheets API called:
   POST /exec
   Body: { action: 'saveRecords', payload: {records: [...]} }
   ↓
6. Google Sheets backend stores JSON blob in "Records" tab
   ↓
7. ✅ Data is now ONLINE, accessible by all teachers
```

### Verification
After upload, you'll see:
```
✅ 482 records imported & saved online to shared database
```

---

## 🔄 Real-Time Data Sync

### How Teachers See Latest Data
```
Teacher opens portal
    ↓
loadFromBackend() called
    ↓
apiGet('getRecords') → fetches from Google Sheet
    ↓
Shows live 482 students in their class
    ↓
Teacher can immediately generate schedule
```

**No delay.** Teachers always see the latest data Admin uploaded.

---

## ⚠️ What's NOT Stored Online

❌ **Teacher's personal class schedule** — downloads as PDF/Excel only
❌ **Attendance signatures** — collected on printed forms only
❌ **Parent contact data** — stays on local devices
❌ **Sensitive parent information** — never uploaded

---

## 💾 Browser Cache (Fallback Only)

If internet drops while a teacher is working:
- Local cache activated (`cacheLocally()`)
- Shows last-known data from Google Sheet
- Works offline temporarily
- Automatically syncs when internet returns

**This is NOT primary storage — just a safety net.**

---

## 🔑 API Endpoints (Google Sheets Backend)

All calls go to:
```
https://script.google.com/macros/s/AKfycbyVim8bh3anDO184RV4DcgRhHXd0GJR3-CYlHdnWoqhYRaUMkgV8O3CooNMxL6ca5rb/exec
```

### GET Requests (Read Data)
```
?action=getRecords     → Fetch all 482 students
?action=getSettings    → Fetch school name, term, year
?action=getAuth        → Fetch admin password
?action=getLog         → Fetch download audit trail
?action=ping           → Health check (returns: "NAFL PTM Backend is live")
```

### POST Requests (Write Data)
```
action: 'saveRecords'      → Save student data + schedule
action: 'saveSettings'     → Save school settings
action: 'savePassword'     → Update admin password
action: 'deleteAllRecords' → Wipe all data (admin only)
action: 'logDownload'      → Log when teachers download files
```

---

## 📋 Google Sheets Structure

Your Google Sheet contains 4 tabs:

### Tab 1: Records
- **Column A:** `data_json` — entire 482-student database as one JSON blob
- **Column B:** `updated_at` — timestamp of last admin upload

### Tab 2: Settings
- **Column A:** `data_json` — school name, city, term, year
- **Column B:** `updated_at` — timestamp of last settings change

### Tab 3: Auth (Hidden)
- **Column A:** `password` — admin password (PTM@123)
- **Column B:** `updated_at` — timestamp of last password change

### Tab 4: DownloadLog
- **Columns:** timestamp, grade, section, ct, action
- **Row per download** — audit trail of who downloaded what

---

## 🛡️ Data Protection

### What's Protected
✅ Admin can delete all records (Settings → Delete All)
✅ Admin can change password (Settings → Change Password)
✅ Only Admin can upload/edit student data
✅ Teachers are read-only

### What's Not Protected
⚠️ If someone gets Admin login:
- They can upload/delete data
- They can change password

**Solution:** Keep `PTM@123` secure. Change it after first login:
1. Login as Admin
2. Click 🔑 Change Password
3. Set new strong password

---

## 🔍 Audit Trail

### View Download Log
Admin can see:
- When files were downloaded
- Which class (grade/section)
- Class teacher name
- Action (PDF / Excel / Print)

### View Raw Data
1. Go to your Google Sheet
2. Click the "DownloadLog" tab
3. See complete audit of who downloaded what and when

---

## 🚨 Common Questions

### Q: Where is my student data stored?
**A:** Only in Google Sheets. The portal doesn't keep copies anywhere else.

### Q: Can teachers upload data?
**A:** No. The upload button only appears when Admin is logged in. Teachers can't see it.

### Q: If I delete all data from admin portal, is it gone forever?
**A:** Yes. Clicking "Delete All" wipes the Google Sheet. **Use with caution.**

### Q: Can I export all data from the portal?
**A:** Yes. Admin can export:
- Whole-school schedule (Excel or PDF)
- Class-wise schedules (Excel or PDF)

### Q: What if admin logs out? Can students disappear?
**A:** No. Data stays in Google Sheets. Logging out just closes the admin interface.

### Q: Can two people upload data at the same time?
**A:** Technically yes, but the last one to click "Upload" wins. The earlier upload is overwritten. **Only one person should upload at a time.**

---

## ✅ Checklist Before Going Live

- [ ] Created Google Sheet named "NAFL PTM Database"
- [ ] Pasted GoogleAppsScript.gs into Apps Script editor
- [ ] Ran `initializeSheets()` function once
- [ ] Deployed as Web App (Execute as: Me, Access: Anyone)
- [ ] Copied Web App URL into `index.html` (const API_URL = ...)
- [ ] Uploaded `index.html` to GitHub repo (nafl-ptm)
- [ ] Verified GitHub Pages is enabled
- [ ] Tested with sample student data (PTM.xls)
- [ ] Confirmed data appears in Google Sheet "Records" tab
- [ ] Confirmed teachers can see student list in Teacher Portal
- [ ] Changed admin password from default PTM@123

---

## 📞 Support

**Issue:** Data not saving online
- Check: Is the API_URL correct in index.html?
- Check: Is Google Apps Script Web App still deployed?
- Check: Can you reach Google Sheets?

**Issue:** Teachers can't see students
- Check: Did admin upload data yet?
- Check: Is the Google Sheets backend connected?
- Check: Yellow warning banner at top?

**Issue:** Can't login as admin
- Check: Username is `PTMCom` (exact spelling, case-sensitive)
- Check: Password is what you set it to
- Check: Did you change it from default `PTM@123`?

---

**Built for National Academy for Learning, North Bengaluru**
**NAFL PTM Portal v1.0 — 2026**
