# Adenium Labs Marketing Site

The Adenium Labs marketing site introduces our mindful digital experiences with a spotlight on **Sound Asleep**, a wellness soundscape app for sleep, focus, and creativity. The single-page experience pairs tailored storytelling with rich visuals, screenshots, and clear calls to action for beta testers, newsletter subscribers, and press inquiries.

## Tech Stack
- React 19 with TypeScript powered by Vite
- Tailwind CSS for utility-first styling and animation helpers
- ESLint + TypeScript ESLint for linting and type-aware rules

## Running Locally
1. Install dependencies: `npm install`
2. Start the local dev server: `npm run dev`
3. Visit the printed localhost URL (defaults to `http://localhost:5173`)

### Additional Scripts
- `npm run build` – type-check and generate a production build in `dist`
- `npm run preview` – serve the production build locally for QA
- `npm run lint` – run ESLint across the project

## Page Structure
- **Hero** – brand introduction, tagline, and CTA to explore Sound Asleep
- **Sound Asleep Feature Section** – feature highlights, testimonial copy, and iPhone mockups sourced from `public/screens`
- **Screenshots Gallery** – masonry of app screens with descriptive captions
- **Download Call to Action** – App Store link plus mailing list form wired to `/api/subscribe`
- **Contact Section** – quick access to support, press, and partnership emails
- **Privacy Modal** – accessible via footer link with placeholder policy copy

## Managing Content & Assets
- Logos, wordmarks, and device frames live in `public/`
- Hero and gallery screenshots live in `public/screens/`
- Update CTA links (e.g., App Store URL, mailing list endpoint) in `src/App.tsx`
- Tailwind utility classes for layout live directly inside JSX; adjust global styles in `src/index.css`

## Deployment
1. Run `npm run build`
2. Deploy the generated `dist/` folder to your hosting platform (e.g., Netlify, Vercel, Cloudflare Pages, or static object storage)
3. Ensure asset paths remain root-relative for images referenced from `public/`

## Contact
- Support: `support@adeniumlabs.com`
- Press: `press@adeniumlabs.com`
- Partnerships: `partnerships@adeniumlabs.com`

For project-specific questions, open an issue or reach out via the contact emails above.
