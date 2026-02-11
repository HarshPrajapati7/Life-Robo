# LIFE ROBO — Robotics Club, University of Lucknow

Learn and Innovation in the Field of Engineering.

A modern web platform for the Robotics Club of University of Lucknow, featuring 3D simulations, a browser-based code editor, and dynamic content management.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Design System](#design-system)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Authentication and Roles](#authentication-and-roles)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)

---

## Overview

This project is a modern rebuild of the LIFE ROBO website, replacing the original static HTML site with a dynamic Next.js application.

Key capabilities:

- **3D Interactive Simulations**: Drive rovers and control humanoid robots in the browser
- **Browser-Based IDE**: Write, compile, and run C/C++ code with a built-in terminal
- **Content Management**: Admin dashboard for updating events, team, and gallery
- **Secure Authentication**: Role-based access for members and administrators

---

## Tech Stack

| Layer          | Technology          | Purpose                          |
| -------------- | ------------------- | -------------------------------- |
| Framework      | Next.js 14          | React framework with App Router  |
| Language       | TypeScript          | Type-safe development            |
| Styling        | Tailwind CSS        | Utility-first CSS with dark theme|
| 3D Graphics    | React Three Fiber   | Three.js wrapper for React       |
| 3D Helpers     | @react-three/drei   | Useful R3F components            |
| Animations     | Framer Motion       | Scroll and page transitions      |
| Backend        | Supabase            | Auth, Database, Storage          |
| Code Editor    | Monaco Editor       | VS Code editor component         |

---

## Features

### Public Pages

| Feature         | Route              | Description                                              |
| --------------- | ------------------ | -------------------------------------------------------- |
| Landing Page    | `/`                | 3D animated hero with robot model, section previews      |
| Team            | `/team`            | Patrons, faculty, and coordinator profiles               |
| Events          | `/events`          | Event cards with overlay viewer for details               |
| Gallery         | `/gallery`         | Masonry photo grid with category filters                  |
| Contact         | `/contact`         | Contact form                                              |
| Playground      | `/playground`      | Hub for 3D simulations, code editor, electronics tools    |
| IDE             | `/ide`             | Browser-based C/C++ code editor (accessed via Playground) |

### Member Features

| Feature          | Description                      |
| ---------------- | -------------------------------- |
| Project Saving   | Save code snippets to the cloud  |
| Profile          | Manage personal information      |

### Admin Features

| Feature      | Route             | Description                    |
| ------------ | ----------------- | ------------------------------ |
| Dashboard    | `/admin`          | Overview of site content       |
| Events CMS   | `/admin/events`   | Create, edit, delete events    |
| Team CMS     | `/admin/team`     | Manage team member profiles    |
| Gallery CMS  | `/admin/gallery`  | Upload and organize photos     |

---

## Design System

The site uses a minimal dark theme with intentional restraint.

### Colors

| Token            | Value                     | Usage                   |
| ---------------- | ------------------------- | ----------------------- |
| Background       | `#060608`                 | All page backgrounds    |
| Text primary     | `#e0e0e0`                 | Body text               |
| Text muted       | `rgba(255,255,255,0.30)`  | Secondary text          |
| Border           | `rgba(255,255,255,0.05)`  | Dividers, card borders  |
| Accent (buttons) | `#ffffff`                 | Primary buttons         |

### Typography

| Font             | Family          | Usage                  |
| ---------------- | --------------- | ---------------------- |
| Display          | Orbitron         | Headings, logo         |
| Body             | Rajdhani         | Paragraphs, UI text    |
| Mono             | Share Tech Mono  | Labels, metadata       |

### Design Principles

- Flat dark backgrounds — no gradient section backgrounds
- No decorative orbs, scanlines, or grain textures
- Section dividers use `border-t border-white/5`
- Page headers are left-aligned with muted subtitle below
- Buttons are solid white with black text or ghost borders
- No cyber/sci-fi jargon in UI copy
- Hover states use subtle opacity transitions
- Cards use `gap-px` grid pattern with `bg-white/5` borders

---

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, providers
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles, CSS variables
│   ├── events/page.tsx         # Events listing
│   ├── gallery/page.tsx        # Photo gallery
│   ├── team/page.tsx           # Team members
│   ├── contact/page.tsx        # Contact form
│   ├── playground/
│   │   ├── page.tsx            # Playground hub (sims, IDE, electronics)
│   │   └── [simId]/page.tsx    # Individual simulation view
│   ├── ide/page.tsx            # Code editor
│   ├── login/page.tsx          # Authentication
│   ├── dashboard/page.tsx      # Member dashboard
│   └── admin/
│       ├── page.tsx            # Admin dashboard
│       ├── events/page.tsx     # Events CMS
│       ├── team/page.tsx       # Team CMS
│       └── gallery/page.tsx    # Gallery CMS
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Site footer
│   │   └── Preloader.tsx       # Initial loading screen
│   ├── 3d/
│   │   ├── HeroRobot.tsx       # Landing page 3D robot
│   │   ├── PlaygroundScene.tsx  # Simulation 3D scene
│   │   ├── Rover.tsx           # Rover model and physics
│   │   └── SimulationLoader.tsx # 3D loading screen
│   ├── sections/
│   │   ├── AboutSection.tsx    # About preview
│   │   ├── PlaygroundSection.tsx # Playground preview
│   │   ├── EventsPreview.tsx   # Events preview
│   │   ├── TeamPreview.tsx     # Team preview
│   │   └── GalleryPreview.tsx  # Gallery preview
│   └── ui/
│       ├── SimulationCard.tsx   # Simulation selector card
│       ├── TeamCard.tsx         # Team member card
│       ├── EventCard.tsx        # Event card
│       ├── GalleryCard.tsx      # Gallery image card
│       └── OverlayViewer.tsx    # Lightbox overlay
├── lib/
│   ├── simulations.ts          # Simulation definitions
│   ├── team-data.ts            # Team member data
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       └── server.ts           # Server Supabase client
└── middleware.ts               # Route protection
```

---

## Database Schema

### Events

| Column        | Type      | Description         |
| ------------- | --------- | ------------------- |
| id            | uuid      | Primary key         |
| title         | text      | Event name          |
| description   | text      | Full description    |
| date          | date      | Event date          |
| type          | enum      | workshop, competition, lecture |
| image_url     | text      | Poster image        |
| external_link | text      | YouTube or external |
| created_at    | timestamp | Creation time       |

### Team Members

| Column    | Type | Description      |
| --------- | ---- | ---------------- |
| id        | uuid | Primary key      |
| name      | text | Full name        |
| role      | text | Position title   |
| category  | enum | patron, faculty, coordinator |
| image_url | text | Profile picture  |
| linkedin  | text | LinkedIn URL     |
| instagram | text | Instagram URL    |
| order     | int  | Display order    |

### Projects (IDE)

| Column     | Type      | Description        |
| ---------- | --------- | ------------------ |
| id         | uuid      | Primary key        |
| user_id    | uuid      | Owner              |
| title      | text      | Project name       |
| code       | text      | Source code         |
| language   | enum      | c, cpp             |
| created_at | timestamp | Creation time      |

---

## Authentication and Roles

| Role     | Access                                   |
| -------- | ---------------------------------------- |
| Public   | All public pages, Playground, IDE        |
| Member   | Above + save projects, personal profile  |
| Admin    | Above + full CMS access                  |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account (for backend features)

### Installation

```bash
git clone https://github.com/your-org/life-robo.git
cd life-robo
npm install
cp .env.example .env.local
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Development

```bash
npm run lint      # Lint code
npm run build     # Build for production
npm start         # Start production server
```

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Self-hosted

```bash
npm run build
npm start
```

---

## License

All rights reserved © Robotics Club, University of Lucknow

---

Built with care by the LIFE ROBO Web Team
