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
- **Email:** Resend
- **Version Control:** Git (private repo)

---

## 📁 Folder Structure

```bash
app/
├── (public)/                    # Public-facing routes
│   ├── about/
│   ├── contact/
│   ├── donate/
│   ├── profile/
│   ├── stories/[[...borough]]/  # All or ugh-specificstory lists
│   └── story/[id]/              # Individual story pages
├── admin/                       # Admin dashboard sections
│   ├── categories/
│   ├── personal-info/
│   ├── radar/
│   ├── recommendations/
│   └── stories/
├── api/                         # API routes
│   └── contact/
├── auth-actions/                # Server actions related to auth
├── constants/                   # Shared constants
├── database/                    # Prisma client and repo helpers
│   ├── prisma.ts
│   ├── helpers/
│   └── repositories/
├── hooks/                       # Custom React hooks
├── types/                       # Shared TypeScript types
└── utils/                       # Utility functions

lib/
├── auth0/
├── internal-api/          
│   └── actions/
└── tiptap/

public/
└── media/                       # Static assets (images, clips, etc.)
```
