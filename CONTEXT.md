# Adenium Labs Website – Project Context

You are assisting in the development of a marketing website for **Adenium Labs**, an umbrella company for mindful iOS apps.  
The first app being launched is **Sound Asleep**, a customizable soundscape app for sleep, focus, meditation, and relaxation.

---

## Tech Stack
- **Framework:** Vite + React + TypeScript  
- **Styling:** TailwindCSS  
- **Build pipeline:** PostCSS + Autoprefixer  
- **Deployment:** Cloudflare Pages (connected to GitHub)  
- **Assets:** stored in the `public/` folder  

---

## Project Structure
adenium-labs-site/
├── src/
│   ├── App.tsx      # Main site layout (hero, Sound Asleep card, screenshots, beta CTA, contact, footer)
│   ├── main.tsx     # React entry point
│   └── index.css    # Tailwind base imports
├── public/
│   ├── adenium-logo-256.png
│   ├── adenium-mark-256.png
│   ├── adenium-mark-1000.png
│   ├── soundasleep-icon.png
│   └── screens/
│       ├── screen-main.png
│       ├── screen-1.png
│       ├── screen-2.png
│       └── screen-3.png
├── tailwind.config.js
├── postcss.config.js
└── index.html

---

## Design Goals
- Minimal, modern, and beautiful landing page
- **Hero section**: tagline + large Adenium logo mark
- **Sound Asleep featured card**: gradient frame, “Now in Beta” label, CTAs for *Join Beta (TestFlight)* and *Get Notified*
- **Key Features card**: gradient background, bullet list
- **Phone mockup**: shows `/screens/screen-main.png`
- **Screenshots grid**: 3 smaller screenshots from `/screens`
- **Beta CTA section**: two cards (Beta Testing + Stay Updated) + “For Beta Testers” banner
- **Contact section**: three cards (Support, Press, Partnerships) with Partnerships centered below
- **Footer**: dark gray background with Adenium mark + punch line on left, “© YEAR Adenium Labs. All rights reserved.” and *Privacy Policy* button on right
- **Privacy Policy**: opens as a modal, not a separate page

---

## Current State
- The site runs locally at `http://localhost:5173`  
- Tailwind styling is applied  
- Assets are resized and placed in `/public/`  
- Sections implemented: Hero, Sound Asleep, Features, Screenshots, Beta CTA, Contact, Footer  

---

## Next Steps
- Polish gradients and colors to match references  
- Wire up email capture (`/api/subscribe`) with Cloudflare KV  
- Swap in the real TestFlight link once available  
- Deploy via GitHub → Cloudflare Pages  

---

## Notes
- Top nav contains only **Contact** link  
- **About** and **Apps** sections are removed for now  
- **Privacy Policy** is only accessible via the footer link  
- Images optimized (originals resized with `sips`)  
- Phone frame styling is provided by CSS, screenshots should be raw app screens  

---