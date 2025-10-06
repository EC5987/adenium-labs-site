# Deployment Guide

This document explains how to deploy the Adenium Labs website to GitHub Pages.

## Understanding the Setup

### Branch Structure
- **`main` branch**: Contains the source code (React, TypeScript, Vite)
  - This is where you develop and make changes
  - Contains `src/`, `package.json`, build configs, etc.

- **`gh-pages` branch**: Contains only the built static files
  - Generated automatically from main branch
  - Contains compiled HTML, CSS, JS, and assets
  - This is what GitHub Pages serves as the live website

### How It Works
1. **Development**: Make changes on `main` branch
2. **Build**: `npm run build` compiles React code into static files
3. **Deploy**: Copy built files to `gh-pages` branch
4. **Serve**: GitHub Pages serves the `gh-pages` branch as live site

## Manual Deployment Process

### Step 1: Prepare on Main Branch
```bash
# Make sure you're on main and up to date
git checkout main
git pull origin main

# Test your changes locally
npm run dev
```

### Step 2: Build the Site
```bash
# Build for production
npm run build

# This creates a 'dist' folder with compiled files
```

### Step 3: Deploy to gh-pages
```bash
# Switch to gh-pages branch
git checkout gh-pages

# Move built files to root (replace existing)
rm -rf *.html *.js *.css assets/ icons/ screens/ *.png *.svg
mv dist/* .
rmdir dist

# Clean up build artifacts
rm -rf .vite node_modules public

# Commit and push
git add -A
git commit -m "deploy: [describe your changes]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin gh-pages
```

### Step 4: Return to Development
```bash
# Switch back to main for future development
git checkout main
```

## Automated Deployment (Recommended)

### Option 1: Add npm Script

**IMPORTANT: Configure Base URL First**
Before deploying, ensure the correct base URL is set in `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/adenium-labs-site/',  // Must match your GitHub repo name
  plugins: [react()],
  // ... other config
})
```

Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && npx gh-pages -d dist"
  }
}
```

Then deploy with:
```bash
npm run deploy
```

### Option 2: GitHub Actions (Future)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Important Notes

### Development Workflow
- ✅ **Always develop on `main` branch**
- ✅ **Never edit files directly on `gh-pages`**
- ✅ **Test with `npm run dev` before deploying**
- ✅ **Build and deploy when ready to go live**

### What Gets Deployed
- All files from the `dist` folder after build
- Includes: HTML, CSS, JS bundles, images, icons
- Excludes: Source code, node_modules, build configs

### Troubleshooting
- **White page/blank site**: Most common issue - check that `base` URL in `vite.config.ts` matches your repo name (e.g., `/adenium-labs-site/`)
- **Site not updating**: Check that you pushed to `gh-pages` branch
- **404 errors**: Verify GitHub Pages is set to serve from `gh-pages` branch
- **Missing files**: Make sure all assets are in `public/` folder before build
- **Assets not loading**: Ensure `base` URL is set correctly in `vite.config.ts` - should be `/your-repo-name/`

## Current Site Structure

```
main branch:
├── src/
│   ├── App.tsx          # Main React component
│   ├── index.css        # Global styles and animations
│   └── main.tsx         # React entry point
├── public/              # Static assets (copied to build)
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Build configuration
└── [other config files]

gh-pages branch:
├── index.html           # Built HTML
├── assets/              # Bundled CSS/JS
├── icons/               # iOS 26 app icon variants
├── screens/             # App screenshots
└── [other static files]
```

## Recent Deployment

The site was last deployed with:
- Redesigned Contact section with unified layout and gradient border
- Mobile-optimized responsive design with horizontal layout
- Prominent Adenium Labs logo with beautiful gradient background
- Automated deployment script (`npm run deploy`)
- Fixed base URL configuration for proper GitHub Pages deployment
- iOS 26 app icon variants and liquid glass design features

Live site: https://ec5987.github.io/adenium-labs-site/