# Deploy ke GitHub Pages

## Step 1: Setup Repository
Pastikan repo Anda sudah di GitHub. Clone ke local jika belum.

## Step 2: Run Build
```bash
npm run build
```
Ini akan create folder `dist/public/` berisi semua static files.

## Step 3: Deploy ke gh-pages

### Opsi A: Manual (Langkah demi langkah)

```bash
# 1. Buat atau checkout gh-pages branch
git checkout --orphan gh-pages

# 2. Hapus semua file lama
rm -rf * .*

# 3. Copy built files
cp -r dist/public/* .

# 4. Create .nojekyll file (penting untuk GitHub Pages!)
touch .nojekyll

# 5. Add dan commit
git add .
git commit -m "Deploy to GitHub Pages"

# 6. Push ke GitHub
git push origin gh-pages -f

# 7. Kembali ke main branch
git checkout main
```

### Opsi B: Otomatis (Recommended)

```bash
chmod +x deploy-gh-pages.sh
./deploy-gh-pages.sh
```

## Step 4: Enable GitHub Pages

1. Buka repository di GitHub
2. Pergi ke **Settings** → **Pages**
3. Di "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Klik **Save**

## Step 5: Selesai! 🎉

Website Anda akan live di:
```
https://<username>.github.io/<repo-name>/
```

Tunggu 1-2 menit untuk GitHub pages build dan deploy.

## Tips:
- Setiap kali ada update, jalankan build dan deploy ulang
- File `.nojekyll` penting agar GitHub Pages serve semua file dengan benar
- Untuk update code: push ke `main` branch, jalankan build, push hasil ke `gh-pages`

## Troubleshoot:

❌ 404 Error?
- Pastikan `.nojekyll` file ada di gh-pages branch
- Clear browser cache (Ctrl+Shift+Delete)
- Tunggu 2-3 menit untuk deploy selesai

❌ Asset tidak load?
- Update `vite.config.ts` jika repo bukan di root domain
- Tambahkan `base: '/repo-name/'` di vite config jika URL seperti `/repo-name/`
