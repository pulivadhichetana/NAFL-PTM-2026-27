# 🚀 NAFL PTM Portal — Deployment Checklist

## ✅ Complete Deployment in 15 Minutes

### PHASE 1: Google Sheets Backend (5 min)

- [ ] Go to **sheets.new** → create blank Google Sheet
- [ ] Rename to `NAFL PTM Database`
- [ ] Click **Extensions → Apps Script**
- [ ] Delete default code, paste entire **GoogleAppsScript.gs** file
- [ ] Click **💾 Save**
- [ ] Click function dropdown → select `initializeSheets`
- [ ] Click **▶ Run**
- [ ] **Authorize access** to your Google Sheet
- [ ] Verify: 4 new tabs created (Records, Settings, Auth, DownloadLog)

**✅ Backend complete!**

---

### PHASE 2: Configure Web App (3 min)

- [ ] In Apps Script, click **Deploy → New deployment**
- [ ] Click ⚙️ → select **Web app**
- [ ] **Execute as:** Me (your Google account)
- [ ] **Who has access:** Anyone
- [ ] Click **Deploy**
- [ ] **Authorize** again when prompted
- [ ] A dialog shows **Web app URL** — **COPY THIS ENTIRE URL**
- [ ] Paste it somewhere safe (you'll need it next)

**✅ Web App deployed!**

---

### PHASE 3: Configure Portal (2 min)

- [ ] Download **index.html** (latest version)
- [ ] Open in **Notepad** (right-click → Edit)
- [ ] Press **Ctrl+F** → search for:
  ```
  const API_URL = 
  ```
- [ ] Replace the entire line with:
  ```javascript
  const API_URL = 'https://script.google.com/macros/s/[YOUR-WEB-APP-URL]/exec';
  ```
  (Use the URL you copied from Apps Script)
- [ ] Press **Ctrl+S** to save

**✅ Portal configured!**

---

### PHASE 4: Upload to GitHub (3 min)

- [ ] Go to **github.com** → your **nafl-ptm** repository
- [ ] Click **Add file → Upload files**
- [ ] **Drag & drop** the edited `index.html` file
- [ ] Click **Commit changes**
- [ ] GitHub will process for ~2 minutes

**✅ Uploaded to GitHub!**

---

### PHASE 5: Test (2 min)

- [ ] Wait 2 minutes
- [ ] Visit: `https://YOUR-GITHUB-USERNAME.github.io/nafl-ptm/`
- [ ] **🟢 GREEN banner** = ✅ Connected to Google Sheets backend
- [ ] **🟡 YELLOW banner** = ⚠️ Check API_URL in index.html

---

## 🧪 Testing Workflow

### 1️⃣ Admin Portal Test

- [ ] Open portal → click **Admin Portal**
- [ ] Login: 
  - Username: `PTMCom`
  - Password: `PTM@123`
- [ ] Step 2 → click "Choose file" → select **PTM.xls** sample
- [ ] Verify: Shows "482 students found"
- [ ] Click **Import**
- [ ] Verify: Green success message
  ```
  ✅ 482 records imported & saved online to shared database
  ```
- [ ] Go back → verify **Google Sheet "Records"** tab has data
  (You should see a JSON blob with all 482 students)

### 2️⃣ Teacher Portal Test

- [ ] Open portal → click **Teacher Portal**
- [ ] Select: Grade = `Kindergarten - 1`, Section = `A`
- [ ] Should show: **~30 students** (actual count)
- [ ] Click **Generate My PTM Schedule**
- [ ] Verify: Schedule generated with all students
- [ ] Click **PDF / Excel / Print** buttons
  - All should work
  - Downloads go to your computer (not online)

### 3️⃣ Class Link Test

- [ ] Go back to **Admin Portal**
- [ ] Step 5 → Click **🔗 Get Class Links**
- [ ] Click **Copy All**
- [ ] Paste into Notepad — should see links like:
  ```
  Kindergarten1A_Timeslot: https://...#class=Kindergarten1A
  Grade1A_Timeslot: https://...#class=Grade1A
  Grade9A_Timeslot: https://...#class=Grade9A
  ```
- [ ] Click one → Opens that class's schedule page
- [ ] Verify: Can download PDF/Excel from class page

---

## 📊 Verify Data is Online Only

### Check 1: Google Sheet Has Data
1. Open your **NAFL PTM Database** Google Sheet
2. Click **Records** tab
3. Should see one row with all 482 students in JSON format
4. If empty → Admin didn't upload yet or API_URL is wrong

### Check 2: All Teachers See Same Data
1. Have 2 teachers open the portal (different browsers/devices)
2. Both select same grade/section
3. Should see **identical** student lists
4. If different → Data isn't synced online (check API_URL)

### Check 3: Data Persists After Logout
1. Admin uploads data
2. Admin clicks **Home** (logout)
3. Open portal again in incognito window
4. Teacher Portal → should still see students
5. If gone → Data isn't saved online

---

## 🆘 Troubleshooting

| Issue | Solution |
|---|---|
| **Yellow banner: "Not connected"** | API_URL in index.html is wrong. Check the URL in Google Apps Script. |
| **Upload button missing** | You're not logged in as admin. Click Admin Portal → login first. |
| **Uploaded data doesn't appear for teachers** | Wait 30 seconds. Refresh browser. Check Google Sheet "Records" tab for data. |
| **Teachers see different data** | Not all teachers are seeing the shared backend. Check if they got latest index.html from GitHub. |
| **Download buttons don't work** | Try incognito window. Some ad-blockers break downloads. |
| **Can't login as admin** | Password: exact case matters. Default is `PTM@123`. Did you change it? |

---

## 🎓 Go-Live Checklist

Before you share with all teachers:

- [ ] Test with real student data (PTM.xls or your data)
- [ ] Verify 482 students show in teacher portal
- [ ] Download PDF/Excel/Print — all work
- [ ] Generate class links — all work
- [ ] Generate whole-school schedule — no errors
- [ ] Test on phone/tablet — responsive design works
- [ ] Test in different browsers — Chrome, Safari, Firefox
- [ ] Have admin change password from default
- [ ] Document the GitHub Pages URL for all teachers
- [ ] Send this URL to all teachers:
  ```
  https://YOUR-USERNAME.github.io/nafl-ptm/
  ```

---

## 📋 What Each File Does

| File | Purpose | Location |
|---|---|---|
| `index.html` | Main portal (all features) | Upload to GitHub |
| `GoogleAppsScript.gs` | Google Sheets backend | Paste into Apps Script |
| `DATA_SECURITY.md` | Security documentation | For your reference |
| `HOW_TO_DEPLOY.html` | Detailed setup guide | Share with new admins |
| `README.md` | Project overview | GitHub repo |
| `TEACHER_GUIDE.html` | Teacher quick reference | Print for teachers |

---

## 🔑 Important Credentials

**Admin Login (never share this password):**
```
Username: PTMCom
Password: PTM@123  ← CHANGE THIS AFTER FIRST LOGIN
```

**Where password is stored:**
- Google Sheet → "Auth" tab → column A → row 2
- Never visible to teachers
- Only admin can change it

---

## 💡 Pro Tips

1. **Always use the latest index.html** — it has all bug fixes
2. **Test locally before going live** — make sure everything works
3. **Save the Google Sheet URL** — you'll need it for backups
4. **Change admin password immediately** — security best practice
5. **Keep Google Sheet private** — use "Anyone with the link" but don't share the link widely
6. **Download audit log monthly** — track who accessed what

---

## ✨ You're Ready!

Once you complete all 5 phases, your portal is:
- ✅ Live on GitHub Pages (globally accessible)
- ✅ Connected to Google Sheets backend (real-time data)
- ✅ Admin-only upload (secure)
- ✅ Data saved online only (no local copies)
- ✅ Teachers can use immediately (no setup needed)

**Questions? Check DATA_SECURITY.md or contact: bchethana@naflnorth.com**

---

**National Academy for Learning, North Bengaluru**
**NAFL PTM Portal v1.0 — Ready to Deploy**
