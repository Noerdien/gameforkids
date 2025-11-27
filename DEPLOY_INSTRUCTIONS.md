# 📦 Penyelamat Abjad Hutan - Deployment Guide

## 🎯 Deployment Options

### Option 1: GitHub Pages (Frontend Only) ✅ RECOMMENDED
**Best for**: Free, simple, static site
**Includes**: Full game (no backend needed)
**Time**: ~5 minutes setup

### Option 2: Vercel (Full Stack)
**Best for**: Full app with backend
**Includes**: Frontend + Backend API
**Cost**: Free tier available
**Note**: Requires serverless function setup

---

## 🚀 OPTION 1: GitHub Pages Deployment (RECOMMENDED)

### What You Get
- ✅ Full playable game
- ✅ All 43 animals/plants with 3D models
- ✅ All 5 game modes (Susun Huruf, Tebak Huruf, Cocokkan Gambar, Cari Huruf Hilang, Kuis Cepat)
- ✅ 43 levels
- ✅ Mobile responsive
- ✅ Dark mode toggle
- ✅ Keyboard + Touch controls
- ❌ No backend/database (games don't persist across sessions)

### Prerequisites
1. GitHub account (free)
2. Repository created: https://github.com/new
3. Clone/push code ke GitHub

### Step 1: Build Static Files
```bash
npm run build
```
Output: `dist/public/` (semua static files di sini)

### Step 2: Deploy ke GitHub Pages

**Method A: Automatic Script**
```bash
chmod +x deploy-gh-pages.sh
./deploy-gh-pages.sh
```
Ini akan:
- Build automatically
- Create gh-pages branch
- Push built files
- Print deployment URL

**Method B: Manual (Baris per baris)**
```bash
# 1. Checkout/create gh-pages branch
git checkout --orphan gh-pages

# 2. Hapus semua file
git rm -rf .

# 3. Copy built files
cp -r dist/public/* .

# 4. Create .nojekyll (CRUCIAL!)
touch .nojekyll

# 5. Stage & commit
git add .
git commit -m "Deploy to GitHub Pages"

# 6. Push
git push origin gh-pages -f

# 7. Back to main
git checkout main
```

### Step 3: Enable GitHub Pages Settings

1. Buka https://github.com/[username]/[repo]/settings
2. Scroll ke "Pages" section
3. **Source**: "Deploy from a branch"
4. **Branch**: Select `gh-pages` branch
5. **Folder**: Select `/ (root)`
6. Click "Save"

### Step 4: Done! 🎉

Your game live di:
```
https://[username].github.io/[repo-name]/
```

GitHub Pages akan build otomatis (1-2 menit).

---

## 🔧 OPTION 2: Vercel Deployment (Full Stack Alternative)

### Prerequisites
1. Vercel account: https://vercel.com/signup
2. vercel.json already configured ✅

### Deploy Steps

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy (first time)
vercel

# 4. Subsequent deploys
vercel --prod
```

**Or connect GitHub:**
1. https://vercel.com/new
2. Import GitHub repository
3. Auto-detected settings (should be good)
4. Deploy

### Result
- Website live at: `https://[project-name].vercel.app`
- Or custom domain

---

## ✅ Verification Checklist

After deployment:

- [ ] Website loads without errors
- [ ] Game starts on header screen
- [ ] Can select game mode
- [ ] Game mechanics work (can select letters, submit answers)
- [ ] All 43 animals/plants visible with 3D models
- [ ] Mobile responsive (test on phone/tablet)
- [ ] Dark mode toggle works
- [ ] Sound works
- [ ] Camera rotation works (360°)

---

## 🆘 Troubleshooting

### ❌ 404 Error / Blank Page

**For GitHub Pages:**
```bash
# Check .nojekyll exists
ls -la dist/public/.nojekyll

# If missing:
touch dist/public/.nojekyll
git add dist/public/.nojekyll
git commit -m "Add nojekyll"
git push origin gh-pages
```

**Clear cache:**
- Hard refresh: `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
- Then `Ctrl+Shift+R` to reload

### ❌ Assets not loading (CSS/JS/models)

Check browser DevTools (F12) → Console tab for 404 errors.

**GitHub Pages fix:**
```bash
# Verify assets exist
ls -la dist/public/assets/
ls -la dist/public/sounds/
ls -la dist/public/textures/

# Rebuild if missing
npm run build
```

### ❌ Game doesn't load / blank screen

1. Open browser console (F12)
2. Check for red errors
3. Screenshot the error
4. Check Network tab - any 404s?

**Common fix:**
```bash
# Full rebuild
rm -rf dist node_modules
npm install
npm run build
./deploy-gh-pages.sh
```

### ❌ Build fails

```bash
# Check for build errors
npm run build 2>&1 | tail -50

# If stuck:
rm -rf dist
npm run build
```

---

## 📱 Testing on Mobile

1. Deploy to GitHub Pages first
2. Open in browser, get URL
3. Open URL on phone/tablet
4. Test:
   - Game loads
   - Touch works
   - Responsive layout
   - Performance acceptable

---

## 🎓 Learning Resources

- GitHub Pages: https://docs.github.com/en/pages
- Vercel Docs: https://vercel.com/docs
- React Three Fiber: https://r3f.docs.pmnd.rs/

---

## 📞 Support

If still having issues:

1. Check GitHub Actions tab for detailed build logs
2. Open browser console (F12) for client-side errors
3. Search error message in documentation

**GitHub Actions Log:**
1. Go to repo → **Actions** tab
2. Click latest workflow
3. Expand "Build" step for full logs

---

## 🎮 Game Features Included

✅ **5 Game Modes:**
- Susun Huruf (Arrange Letters)
- Tebak Huruf Pertama (Guess First Letter)
- Cocokkan Gambar (Match Picture)
- Cari Huruf Hilang (Find Missing Letter)
- Kuis Cepat (Quick Quiz)

✅ **43 Levels** with diverse animals and plants

✅ **3D Models** for all 43 creatures

✅ **Mobile Optimized** - Full responsive design

✅ **Touch Controls** - Swipe, tap, touch-friendly

✅ **Dark Mode** - Toggle button included

✅ **Audio** - Background music + sound effects

✅ **Scoring System** - Points and progress tracking

---

**Ready to go live? Run:**
```bash
npm run build && ./deploy-gh-pages.sh
```

🚀 That's it! Your game will be live shortly.
