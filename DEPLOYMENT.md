# Deployment Guide

This site now deploys from the `main` branch through **Cloudflare Pages** and serves the production domain `https://adeniumlabs.com`. The legacy GitHub Pages workflow (`gh-pages` branch + `npm run deploy`) has been retired.

## Overview

- `main` is both the development and production branch. Every push to `main` triggers a new Cloudflare Pages deployment.
- Feature branches are optional. When you open a pull request, Cloudflare creates preview builds automatically so you can validate before merging.
- The Vite project builds with `npm run build`; the output in `dist/` is what Cloudflare hosts.

## Local workflow

```bash
# install once
npm install

# iterate locally
npm run dev

# sanity-check the production build before merging
npm run build
```

> The Vite config sets `base` to `'/'`, which matches the root-domain hosting on Cloudflare. If you ever need a different base path (e.g., for a temporary GitHub Pages build), override it with `VITE_BASE=/some-path npm run build`.

## Cloudflare Pages pipeline

1. Cloudflare Pages project: `adeniumlabs-site` (or whatever name you used).
2. Connected repository: this GitHub repo.
3. Production branch: `main`.
4. Build command: `npm ci && npm run build`.
5. Output directory: `dist`.
6. Environment: default Node version from Cloudflare Pages (currently Node 18). Adjust in project settings if you need a newer runtime.

Cloudflare automatically caches the previous production deployment. You can promote a preview build to production or roll back instantly from the Pages UI if a release needs to be reverted.

## Custom domain

- `adeniumlabs.com` and `www.adeniumlabs.com` should both point to the Pages project (`<project>.pages.dev`). Use Page Rules or Bulk Redirects so only one canonical hostname remains (e.g., redirect `www` ⇒ apex).
- HTTPS is managed by Cloudflare automatically. Wait for the “Active” certificate status before announcing a new deployment.

## Manual redeploys

- If you need to re-run the build without pushing new code, use Cloudflare Pages → Deployments → “Retry deployment” on the desired commit.
- Environment variables (for analytics keys, etc.) can be added under Pages → Settings → Environment variables. Remember to document them if they are required for local testing.

## Cleaning up legacy artifacts

- The `gh-pages` branch is no longer required. Delete it once Cloudflare production is verified and close any automation that referenced `npm run deploy`.
- The `deploy` npm script and `gh-pages` dependency were removed in favor of the Cloudflare pipeline.

## Checklist before merging to `main`

- [ ] `npm run build` succeeds locally.
- [ ] Preview URL from Cloudflare (if applicable) looks correct on desktop + mobile.
- [ ] Any new environment variables are added to Cloudflare and documented.
- [ ] Update `docs/` or `DEPLOYMENT.md` if the process or tooling changes.
