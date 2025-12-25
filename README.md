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
- **Backend:** MySQL with Prisma ORM  
- **Hosting:** Vercel (frontend) and AWS RDS (database)  
- **Auth & State:** Auth0 for authentication, Zustand for global state  
- **Media Storage:** AWS S3 
- **Email:** Resend  
- **Version Control:** Git (private repo)

---

## 📁 Folder Structure

```bash
app/
├── (public)/               # Public-facing routes
│   ├── about/
│   ├── contact/
│   ├── donate/
│   ├── profile/
│   ├── stories/[borough]/  # Borough-specific story lists
│   └── story/[id]/         # Individual story pages
├── admin/                  # Admin dashboard sections
│   ├── categories/
│   ├── personal-info/
│   ├── radar/
│   ├── recommendations/
│   └── stories/
├── api/                    # API routes
│   ├── auth/[auth0]/
│   ├── contact/
│   └── files/
├── auth-actions/           # Server actions related to auth
├── constants/              # Shared constants
├── contexts/               # React context providers
├── database/               # Prisma client and repo helpers
│   ├── prisma.ts
│   ├── helpers/
│   └── repositories/
├── hooks/                  # Custom React hooks
├── types/                  # Shared TypeScript types
├── utils/                  # Utility functions
└── zustand/                # Global state stores

prisma/
├── schema.prisma           # Database schema
└── migrations/             # Prisma migrations

public/
└── media/                  # Static assets (images, clips, etc.)
```