# Asif Shahriar Tauhid Portfolio

Personal portfolio website built with React, Vite, Tailwind CSS, DaisyUI, Framer Motion, and PostgreSQL (via Supabase).

## Tech Stack (PERN)

- **Frontend**: React 18, Vite 5, Tailwind CSS 3, DaisyUI 4, Framer Motion
- **Backend/Database**: PostgreSQL hosted on Supabase (accessed securely via `@supabase/supabase-js`)
- **Icons**: Lucide React + React Icons

---

## Features

- **Dynamic Hydration**: Pulls projects and blog posts dynamically from your live PostgreSQL tables on page load, automatically falling back to local static JSON archives in case of fetch errors.
- **Secret Administrative Panel**: A hidden login console (`#/login`) allowing the owner to authenticate using Supabase Auth.
- **Interactive CMS Dashboard**: A sleek owner dashboard (`#/dashboard`) supporting:
  - Compose, update, and delete blog posts using a custom markdown parser.
  - Create, edit, and delete project items.
  - Automatically initialize/seed tables with default backup data safely.
- **Fully Responsive**: Optimizations for mobile, tablet, and desktop views.
- **Theme Support**: Smooth transition between `figmaLight` and `figmaDark` modes.

---

## Getting Started

### 1. Prerequisites

- Node.js 18+ recommended
- A free account on [Supabase](https://supabase.com)

### 2. Environment Configurations

Create a `.env` file in the root directory and define the following variables with your Supabase credentials (this file is ignored by git to protect credentials):

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
```

### 3. Database Initialization

Execute the SQL script inside `supabase_setup.sql` in the **SQL Editor** of your Supabase Dashboard to create the tables and set up Row Level Security (RLS) policies:

- **Projects Table**: Stores metadata, links, status, and image paths.
- **Blogs Table**: Stores article text, excerpt summaries, and tags.

### 4. Create Admin Account

Navigate to your Supabase project under **Authentication > Users** and click **Add User > Create User** to set up your admin email and password.

### 5. Running Locally

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

---

## Project Structure

```text
.
├── public/                # Static assets (images, CV PDF)
├── src/
│   ├── components/        # Layout elements (Navbar, Footer)
│   ├── data/              # Default JSON fallback databases
│   ├── hooks/             # Theme and scroll controllers
│   ├── sections/          # Page layouts (Hero, Skills, Projects, Blog, CMS Admin)
│   ├── utils/             # Supabase client instantiation
│   ├── App.jsx            # Routing and initialization logic
│   └── index.css          # Styling system rules
├── supabase_setup.sql     # Database setup queries
├── tailwind.config.js
└── package.json
```

## CMS Console Gates
- **Login screen**: Accessed via appending `#/login` to the URL.
- **Dashboard screen**: Accessed via appending `#/dashboard` (only accessible to authenticated administrators).
