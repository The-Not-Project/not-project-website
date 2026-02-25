# The Not Project

**Live site:** [www.thenotproject.com](https://www.thenotproject.com)

The Not Project is a storytelling platform based in New York City. Its goal is to share stories we believe are meaningful, whether they are discovered by us or submitted by completely random people. There's no rigid format or genre restriction. Whether it's a blog post, article, photo series, interview, short film, or even a music clip, if it carries value, it has a place on the platform.

This repository contains the complete source code for the web platform. It is built, maintained, and documented primarily for internal reference.

---

## ✍️ Founders

- **Lorenzo Gonzalez** — Creator of the concept and lead content producer
- **Tariq El Ghayate** — Lead developer of the platform
- **Sebastian Torres** — Creative Producer & Co-Developer

---

## 🛠️ Tech Stack

- **Frontend & Framework:** Next.js (App Router), TypeScript, Styled Components, SCSS
- **Backend:** REST API @api.thenotproject.com
- **Hosting:** Vercel
- **Authentication & Authorization:** Auth0
- **Version Control:** Git (private repo)

---

## 🚀 Setup

The project is intended for internal use. Local development is straightforward.

### 1. Clone the repository

```bash
git clone https://github.com/The-Not-Project/not-project-website
cd not-project-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env.local` file in the root directory. **Refer to Tariq** to obtain the current values for these keys:

- `APP_BASE_URL`
- `AUTH0_SECRET`
- `AUTH0_DOMAIN`
- `AUTH0_MANAGEMENT_API_DOMAIN`
- `AUTH0_CLIENT_ID`
- `AUTH0_CLIENT_SECRET`
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `INTERNAL_API_URL`
- `INTERNAL_API_KEY`

### 4. Run the development server

```bash
npm run dev
```

The app should now be running locally.

## 📁 Folder Structure

```bash
app/
├── (public)/                    # Public-facing routes
│   ├── about/
│   ├── contact/
│   ├── donate/
│   ├── profile/
│   ├── stories/[[...borough]]/  # All or borough-specific stories
│   └── story/[id]/              # Individual story pages
├── admin/                       # Admin dashboard sections
│   ├── categories/
│   ├── personal-info/
│   ├── radar/
│   ├── recommendations/
│   └── stories/
├── constants/                   # Shared constants
├── hooks/                       # Custom React hooks
├── types/                       # Shared TypeScript types
└── utils/                       # Utility functions

lib/
├── auth0/                       # Auth0 configuration and SDK setup
├── internal-api/                # Core communication layer with Express REST API
│   └── actions/                 # Next.js Server Actions (bridge between UI and API)
└── tiptap/                      # Rich-text editor configuration for story creation

public/
└── media/                       # Static assets (images, clips, etc.)
```
