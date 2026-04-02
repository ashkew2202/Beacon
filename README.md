# Beacon — Car Health Monitoring Dashboard

## 🚀 Deploy to Vercel via GitHub

### Step 1 — Push to GitHub
```bash
# In your terminal
git init
git add .
git commit -m "Initial commit: Beacon dashboard"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/beacon-dashboard.git
git branch -M main
git push -u origin main
```

### Step 2 — Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in (or sign up)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"** → select your `beacon-dashboard` repo
4. Vercel auto-detects Vite — settings are pre-filled via `vercel.json`
5. Click **"Deploy"** — done! ✅

### Step 3 — Automatic deployments
Every `git push` to `main` triggers a new production deployment automatically.

---

## 🛠 Local Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

## 📁 Project Structure

```
beacon-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx        # React entry point
│   └── App.jsx         # Beacon dashboard (all-in-one)
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
└── .gitignore
```
