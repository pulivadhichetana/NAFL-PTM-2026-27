# GitHub Pages Deployment - Step by Step

**Time Required:** 10 minutes  
**Difficulty:** Easy  
**Cost:** FREE

---

## Step 1: Create GitHub Account (if needed)

Go to: https://github.com/signup

- Enter username (e.g., `nafl-admin`)
- Enter email
- Create password
- Verify email
- ✅ Done!

---

## Step 2: Create Repository

1. **Go to:** https://github.com/new
2. **Fill in:**
   - Repository name: `nafl-ptm` (MUST be lowercase)
   - Description: "Parent Teacher Meeting Schedule Portal"
   - Visibility: **Public** (required for GitHub Pages)
   - Initialize with: Nothing (we'll upload files)
3. **Click:** "Create repository"
4. ✅ Your repo is created!

---

## Step 3: Upload Files to GitHub

### Option A: Web Upload (Easier)

1. **Open your repository** (you just created)
2. **Click:** "Add file" → "Upload files"
3. **Drag & drop** or select:
   - `index.html` (MOST IMPORTANT)
   - `NAFL_PTM_Portal.html` (backup)
   - `GoogleAppsScript.gs` (optional)
   - All `.md` files (documentation)
   - All `.html` files (guides)
4. **Commit message:** `Initial commit - NAFL PTM Portal`
5. **Click:** "Commit changes"
6. ✅ Files uploaded!

### Option B: Git Command Line (Advanced)

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/nafl-ptm.git
cd nafl-ptm

# Copy all files here (index.html, docs, etc.)

# Add all files
git add .

# Commit
git commit -m "Initial commit - NAFL PTM Portal"

# Push to GitHub
git push origin main
```

---

## Step 4: Enable GitHub Pages

1. **Go to your repository**
2. **Click:** Settings (top right)
3. **Click:** Pages (left sidebar)
4. **Under "Build and deployment":**
   - Source: **Main** (dropdown)
   - Folder: **(root)** (dropdown)
5. **Click:** Save
6. **Wait 1-2 minutes** for deployment
7. ✅ You'll see a message: "Your site is live at: https://..."

---

## Step 5: Get Your Live URL

After Step 4, GitHub will show:

```
Your site is live at https://YOUR_USERNAME.github.io/nafl-ptm/
```

**This is your public link!** Share it with your school.

---

## Step 6: Verify It Works

1. **Open the URL** from Step 5
2. **You should see:** NAFL PTM Portal home page
3. **Click:** "Admin Portal"
4. **Try login:** PTMCom / PTM@123
5. ✅ Admin screen appears!

---

## Step 7: Share with Your School

Send this link to your school:

```
https://YOUR_USERNAME.github.io/nafl-ptm/
```

Teachers can:
- Click "Teacher Portal" (no login)
- Generate their schedule
- Download as Excel
- Print

---

## 🎯 Troubleshooting

### "404 Not Found"

**Problem:** GitHub Pages not enabled  
**Solution:** Go to Settings → Pages → Enable

### "Page not loading"

**Problem:** Wrong URL  
**Solution:** Check URL in browser matches GitHub Settings → Pages

### "Changes not showing"

**Problem:** Cache  
**Solution:** 
1. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. Clear browser cache
3. Try incognito window

### "index.html shows code instead of portal"

**Problem:** File not uploaded correctly  
**Solution:**
1. Delete the file
2. Re-upload from web interface
3. Make sure it's in root folder (not subfolder)

---

## 📝 Update Files Later

If you need to update files:

1. **Go to repository**
2. **Click on file** (e.g., `index.html`)
3. **Click:** Edit (pencil icon)
4. **Make changes**
5. **Scroll down → "Commit changes"**
6. **Changes go live in 1-2 minutes!**

---

## 🔄 Sync with Local Computer

If you want to work on files locally:

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/nafl-ptm.git

# Make changes locally

# Upload changes
git add .
git commit -m "Update description"
git push origin main
```

---

## 🎨 Custom Domain (Advanced)

Want your own domain like `ptm.naflnorth.com`?

1. **Buy domain** (GoDaddy, Namecheap, Route53)
2. **Go to:** Repository → Settings → Pages
3. **Add custom domain** field
4. **Point DNS** to GitHub (instructions provided)
5. **Enable HTTPS** (automatic after DNS confirms)

---

## 🔒 Security Tips

- ✅ Don't commit credentials/passwords in code
- ✅ Use public repository only (for GitHub Pages)
- ✅ Change admin password: PTM@123 → Your password
- ✅ Enable HTTPS (automatic with GitHub Pages)
- ✅ Keep backups of important data

---

## 📊 GitHub Pages Limits

- ✅ **Free hosting:** Yes
- ✅ **Custom domain:** Yes
- ✅ **HTTPS:** Yes (automatic)
- ✅ **Bandwidth:** Unlimited
- ✅ **Storage:** 1GB per repository
- ⚠️ **Builds:** 10 per hour
- ⚠️ **Build time:** 10 minutes max

**Our portal uses <100MB, so no issues!**

---

## ✅ Checklist

- [ ] Created GitHub account
- [ ] Created repository (`nafl-ptm`)
- [ ] Uploaded `index.html` to root
- [ ] Uploaded other files (docs, guides)
- [ ] Enabled GitHub Pages in Settings
- [ ] URL shows in Settings → Pages
- [ ] Tested: Portal loads
- [ ] Tested: Can login
- [ ] Tested: Teacher portal works
- [ ] Shared link with school

---

## 🎉 Done!

Your NAFL PTM Portal is now **live online, free, forever!**

**Share this link with your school:**
```
https://YOUR_USERNAME.github.io/nafl-ptm/
```

---

## 📞 Need Help?

### GitHub Pages Help
- Official: https://pages.github.com/
- Troubleshooting: https://docs.github.com/en/pages

### Portal Help
- See: COMPLETE_PACKAGE_README.md
- See: FINAL_AUDIT_REPORT.md
- See: DEPLOYMENT_CHECKLIST.md

---

**That's it! Your portal is live!** 🚀
