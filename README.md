# 🏫 NAFL PTM Portal
### National Academy for Learning — North Bengaluru
**Parent Teacher Meeting Schedule Management System**

---

## 🌐 Live URL
Once deployed, your portal will be at:
```
https://YOUR-USERNAME.github.io/nafl-ptm/
```
Share this link with all teachers — works on any device, browser, phone.

---

## ✅ What This Does
| Feature | Who |
|---|---|
| Upload student data (CSV/Excel) | Admin only |
| Generate whole-school PTM schedule | Admin only |
| Manage sibling timings (20–30 min gap, locked) | Admin only |
| Set Term, Year, School Name | Admin only |
| Change/Reset password | Admin only |
| Generate class schedule with breaks & dates | Teachers |
| Download **PTM Circular** (Sl. No · Time · Name) | Teachers |
| Download **Attendance Sheet** (+ Parent Signature) | Teachers |
| Print both sheets in NAFL format | Teachers |
| View sibling timings (bold, locked) | Teachers |
| Download log with timestamps | Teachers |

---

## 🔐 Admin Login
| Field | Value |
|---|---|
| **Username** | `PTMCom` |
| **Password** | `PTM@123` |
| **Reset email** | `bchethana@naflnorth.com` |

> Change the password after first login using the **🔑 Change Password** button.

---

## 💾 Data Storage
- All student records and schedules are saved in the **browser's localStorage**
- Data **persists across page refreshes** and browser restarts
- Data is **per-browser** — Admin uploads data, generates schedule → teachers open the same URL and see the schedule
- Storage limit: ~5MB (~2000–3000 student records)
- To clear all data: Admin → Delete All Records

---

## 🚀 How to Deploy on GitHub Pages (Free, Forever)

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) → Sign Up (free)

### Step 2 — Create a new repository
1. Click **+** → **New repository**
2. Name it: `nafl-ptm`
3. Set to **Public**
4. Click **Create repository**

### Step 3 — Upload the file
1. Click **uploading an existing file**
2. Drag and drop `index.html` from this folder
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to repository **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source** → select **Deploy from a branch**
4. Branch: **main** → Folder: **/ (root)**
5. Click **Save**

### Step 5 — Wait 2 minutes, then visit:
```
https://YOUR-GITHUB-USERNAME.github.io/nafl-ptm/
```

**That's it! Free forever. No subscription. No expiry.**

---

## 📱 Sharing With Teachers
Just send them the URL:
```
https://YOUR-USERNAME.github.io/nafl-ptm/
```
- Works on Chrome, Firefox, Safari, Edge
- Works on phone and tablet
- No app download needed
- No login needed for Teacher Portal

---

## ⚠️ Important Notes
1. **Admin uploads student data first** → generates schedule → then teachers can use Teacher Portal
2. **Sibling timings are locked** by Admin — teachers cannot change them
3. **Data is browser-local** — if a teacher opens on a different browser/device, they won't see the admin's uploaded data unless the admin shares the exported Excel file
4. For **true multi-device data sharing**, contact us to upgrade to a cloud database version

---

## 🆘 Support
Email: bchethana@naflnorth.com

---
*Built for National Academy for Learning, North Bengaluru*
*PTM Schedule Portal — Term 1 · 2025-26*
