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

- **Frontend & Framework:** Next.js 16 (App Router), TypeScript, Styled Components, SCSS
- **Backend:** Live REST API at `https://api.thenotproject.com` (Managed internally)
- **Authentication & Authorization:** Auth0
- **Deployment:** Vercel
- **Version Control:** Git (private repo)

---

## 🚀 Setup

The project is intended for internal use. Local development is straightforward.

### Prerequisites

Before starting, make sure you have the following installed:

- Git
- Node.js ^20.9x (LTS recommended)

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

Copy the example environment file and fill in the values:

```bash
cp .env.example .env.local
```

> [!IMPORTANT]
> **Refer to Tariq** to obtain the current values for the keys in .env.local. Make sure all keys are populated before starting the development server to avoid authentication or API errors.

### 4. Development & Build

To run the local development server:

```bash
npm run dev
```
To test a production build locally:

```bash
npm run build
npm start
```
---

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

## 🌐 Deployment

- **Production:** Every push to master is automatically built and deployed to [thenotproject.com](https://www.thenotproject.com).
- **Previews:** Pushes to develop (and all open pull requests) trigger a Preview Deployment for testing before merging to production.