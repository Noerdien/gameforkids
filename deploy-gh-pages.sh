#!/bin/bash
# Deploy to GitHub Pages

echo "🔨 Building frontend..."
npm run build

echo "📦 Creating gh-pages branch..."
git checkout --orphan gh-pages 2>/dev/null || git checkout gh-pages

echo "🗑️ Removing old files..."
rm -rf * .* 2>/dev/null || true

echo "📁 Copying built files..."
cp -r dist/public/* .
cp dist/public/.* . 2>/dev/null || true

echo "✅ Creating .nojekyll file..."
touch .nojekyll

echo "🔗 Git adding files..."
git add .
git commit -m "Deploy to GitHub Pages"

echo "🚀 Pushing to gh-pages..."
git push origin gh-pages -f

echo "✨ Done! Your site is live at: https://<your-github-username>/<repo-name>.github.io"
