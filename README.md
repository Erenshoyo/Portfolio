# Asif Shahriar Tauhid Portfolio

Personal portfolio website built with React, Vite, Tailwind CSS, DaisyUI, and Framer Motion.

## Overview

This project is a single-page portfolio with the following sections:

- Hero with resume CTA and WhatsApp contact CTA
- Skills cards grouped by category
- Involvement timeline
- Project showcase cards with GitHub and live links
- Contact section with email draft generation (mailto)
- Footer with social links

The site supports light and dark themes (`figmaLight` and `figmaDark`) and smooth in-page navigation with active-section highlighting.

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- DaisyUI 4
- Framer Motion
- Lucide React + React Icons
- ESLint 9 (flat config)

## Project Structure

```text
.
├── public/
│   ├── Asif Shahriar Tauhid_CVF.pdf
│   ├── profile.png
│   └── projects/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── portfolioData.js
│   ├── hooks/
│   │   ├── useScrollSpy.js
│   │   └── useTheme.js
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── Skills.jsx
│   │   ├── Involvement.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
├── eslint.config.js
├── vite.config.js
├── screenshot.js
└── download_profile.js
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Configuration and Customization

### 1) Personal Content

Edit `src/data/portfolioData.js`:

- `personalInfo` for name, email, social links, availability
- `skillsData` for skills categories/items
- `involvementData` for timeline entries
- `projectsData` for project cards

Note: social and calendar links are conditionally shown using `isConfiguredLink()`. Placeholder values (containing `placeholder`) are hidden in the UI.

### 2) Resume File

The Hero resume button links to:

`/Asif%20Shahriar%20Tauhid_CVF.pdf`

If you rename the PDF, update `src/sections/Hero.jsx` accordingly.

### 3) WhatsApp CTA

Hero "Contact Now" uses:

`https://wa.me/8801570234257`

To change number, update the link in `src/sections/Hero.jsx`.

### 4) Theme Colors

Customize theme tokens in `tailwind.config.js` under DaisyUI themes:

- `figmaDark`
- `figmaLight`

### 5) Global Styles

Global gradient background and base behavior live in `src/index.css`.

## Interaction Model

- Navbar section highlighting uses `useScrollSpy` with a passive scroll listener and `requestAnimationFrame` batching.
- Theme toggle persists user selection in `localStorage` via `useTheme`.
- Contact form builds a `mailto:` draft from input fields instead of sending data to a backend API.

## Utility Scripts

### `screenshot.js`

Captures screenshots of project URLs and writes them to `public/projects/` using Puppeteer.

Run manually with:

```bash
node screenshot.js
```

### `download_profile.js`

Fetches a hosted image and stores it as `public/profile.png`.

Run manually with:

```bash
node download_profile.js
```

## Deployment

This is a static Vite app and can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

Typical deployment flow:

1. Run `npm run build`
2. Deploy the generated `dist/` directory

## Known Constraints

- Contact form is `mailto`-based, so behavior depends on the visitor's device email client.
- Calendar card remains in "coming soon" state until a non-placeholder `calendarForm` URL is provided.
- `src/App.css` is a leftover template stylesheet and is currently unused.

## License

No license file is currently defined in this repository.
