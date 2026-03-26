# EcoConnect – Circular Economy Marketplace

> **Connecting Waste to Value** — A full-stack web application that lists recyclable materials, matches suppliers with buyers, tracks material provenance, and supports informal waste workers.

## Features

- Lists available recyclable materials (type, quantity, quality grade, location)
- Matches suppliers with buyers using smart algorithms (price, location, material type, quality)
- Tracks material provenance from collection to remanufacturing with blockchain-inspired transparency
- Provides fair market pricing based on real-time demand and material specifications
- Onboards informal waste workers with simplified digital wallets and transaction records
- SMS/WhatsApp notifications for low-connectivity users in Tier 3 areas

## Tech Stack

- **Framework:** React 19 + Vite 7
- **Routing:** React Router DOM 7
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## Getting Started (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment

### Option 1 — GitHub Pages (Recommended, automatic)

This repository includes a GitHub Actions workflow that automatically builds and deploys the app to GitHub Pages whenever you push to the `main` branch.

**One-time setup:**

1. Go to your repository on GitHub → **Settings** → **Pages**.
2. Under **Source**, select **GitHub Actions**.
3. Push a commit to `main` — the workflow (`.github/workflows/deploy.yml`) will build the project and publish it automatically.

The live site will be available at:
```
https://<your-github-username>.github.io/Waste-to-Value-/
```

### Option 2 — Netlify

1. Push the repository to GitHub (if not already done).
2. Log in to [Netlify](https://app.netlify.com) and click **Add new site → Import an existing project**.
3. Choose GitHub and select this repository.
4. Set the following build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**.

> **Note:** When deploying to Netlify you can remove the `base` option from `vite.config.js` (or set it to `'/'`), and add a `public/_redirects` file containing `/* /index.html 200` to support client-side routing.

### Option 3 — Vercel

1. Push the repository to GitHub.
2. Log in to [Vercel](https://vercel.com) and click **Add New → Project**.
3. Import this repository — Vercel auto-detects Vite and sets the correct build settings.
4. Click **Deploy**.

> **Note:** When deploying to Vercel you can remove the `base` option from `vite.config.js` (or set it to `'/'`).

### Option 4 — Manual / Self-hosted

```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview
```

The `dist/` folder contains the static files ready to be served by any web server (Nginx, Apache, Caddy, etc.).

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the app for production into `dist/` |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint across the project |
