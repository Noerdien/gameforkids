# 🚀 GitHub Pages Deployment - Quick Start

## Prerequisites
- Repository sudah di GitHub (public atau private)
- Git sudah configured dengan GitHub credentials

## Step 1: Build Aplikasi
```bash
npm run build
```
Ini create folder `dist/public/` dengan semua static files.

## Step 2: Siapkan gh-pages Branch

**Opsi A: Automatic (Recommended)**
```bash
chmod +x deploy-gh-pages.sh
./deploy-gh-pages.sh
```

**Opsi B: Manual Step-by-Step**
```bash
# Create gh-pages branch
git checkout --orphan gh-pages

# Clear existing files
git rm -rf .

# Copy built files
cp -r dist/public/* .

# Create .nojekyll (PENTING!)
touch .nojekyll

# Add dan commit
git add .
git commit -m "Deploy to GitHub Pages"

# Push
git push origin gh-pages -f

# Kembali ke main
git checkout main
```

## Step 3: Enable di GitHub

1. Buka repo → **Settings**
2. Pilih **Pages** (sidebar kiri)
3. **Source**: Deploy from a branch
4. **Branch**: `gh-pages` → `/ (root)`
5. Klik **Save**

## Step 4: Tunggu Deploy ✨

GitHub Pages build otomatis. Cek di:
```
https://[username].github.io/[repo-name]/
```

Biasanya selesai dalam 1-2 menit.

## ✅ Checklist
- [ ] `npm run build` berhasil (dist/public/ ada)
- [ ] `.nojekyll` file ada di gh-pages branch
- [ ] GitHub Pages Settings sudah dikonfig ke gh-pages branch
- [ ] Build selesai (cek di Actions tab)
- [ ] Site live (cek URL)

## 🆘 Troubleshoot

**❌ 404 Error**
```
✓ Clear browser cache (Ctrl+Shift+Delete)
✓ Check .nojekyll file exists di gh-pages
✓ Tunggu 3-5 menit, refresh
✓ Check GitHub Actions untuk error
```

**❌ Blank Page**
```
✓ Check browser console untuk error
✓ Verify dist/public/index.html ada
✓ Check asset paths di built files
```

**❌ Asset tidak load (CSS, JS)**
```
✓ Check dist/public/assets/ ada
✓ Browser console cek 404 mana
✓ Verify vite.config.ts output path
```

## 📝 Setiap Update

1. Edit code
2. Commit ke main: `git add . && git commit -m "Update"`
3. Build: `npm run build`
4. Deploy: `./deploy-gh-pages.sh` atau manual steps
5. Push hasil ke gh-pages branch
6. Done! ✨

---

**Need help?**
- Check GitHub Pages docs: https://docs.github.com/pages
- Check Actions tab untuk full build logs
