# NEXT BASE

[日本語版はこちら](./README.ja.md)

A portfolio site built with **Next.js 16 (App Router)**, **TypeScript**, **microCMS** and **GSAP**.

**Live:** https://nextbase-gsap.vercel.app/

## Features

- **Cache Components** — microCMS data is cached with `'use cache'`, `cacheLife` and `cacheTag`, and pages are prerendered as static HTML.
- **Instant updates** — a microCMS webhook calls `/api/revalidate`, which expires the cache with `revalidateTag`.
- **Server Action contact form** — `useActionState` + nodemailer (Gmail), with optional reCAPTCHA v3.
- **Scroll animations** — GSAP + ScrollTrigger via `@gsap/react` (`useGSAP`): loader, split-text headings, horizontal blog scroll, parallax.
- **Blog** — post list with category filter, article pages with an auto-generated table of contents and reading time.
- **Metadata** — Metadata API, generated OG image (`next/og`), `sitemap.xml` and `robots.txt`.
- **React Compiler**, typed routes, `next/font` and `next/image`.
- **SCSS** split into abstracts / base / components / pages.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript |
| CMS | microCMS (`microcms-js-sdk`) |
| Animation | GSAP, ScrollTrigger, `@gsap/react` |
| Styling | Sass (SCSS) |
| Mail | nodemailer |
| Hosting | Vercel |

## Getting started

Requires Node.js 24.

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Open http://localhost:3000.

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type check |

## Environment variables

| Name | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | – | Public URL used for metadata and the sitemap |
| `MICROCMS_SERVICE_DOMAIN` | ✓ | microCMS service domain |
| `MICROCMS_API_KEY` | ✓ | microCMS API key |
| `MICROCMS_WEBHOOK_SECRET` | – | Secret for the revalidation webhook |
| `CONTACT_TO_EMAIL` | ✓ | Where contact messages are delivered |
| `SMTP_HOST` / `SMTP_PORT` | – | Defaults to `smtp.gmail.com` / `465` |
| `SMTP_USER` / `SMTP_PASS` | ✓ | SMTP account (use a Gmail app password) |
| `RECAPTCHA_SECRET_KEY` | – | reCAPTCHA v3 secret key (verification is skipped when empty) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | – | reCAPTCHA v3 site key |

## microCMS

API endpoint: `blogs` (list format)

| Field ID | Type |
| --- | --- |
| `title` | Text |
| `content` | Rich editor |
| `eyecatch` | Image |
| `category` | Content reference (an API with a `name` field) |

### Webhook (optional)

In microCMS, go to **API settings → Webhook → Custom notification** and add:

- URL: `https://<your-domain>/api/revalidate`
- Secret: the same value as `MICROCMS_WEBHOOK_SECRET`

Without the webhook, content still refreshes about once a minute.

## Project structure

```
app/
  layout.tsx            Root layout (fonts, metadata, header)
  template.tsx          Re-created on each navigation (footer, scroll animations)
  page.tsx              Home
  articles/             Post list and article pages
  actions/contact.ts    Server Action for the contact form
  api/revalidate/       microCMS webhook
  opengraph-image.tsx   Generated OG image
  sitemap.ts, robots.ts
components/             UI components (home/, blog/, motion/)
lib/                    microCMS client, GSAP setup, helpers
styles/                 SCSS (abstracts, base, components, pages)
public/img/             Images
```

## Sister sites

- [NUXT BASE](https://nuxtbase-gsap.vercel.app/)
- [GATSBY BASE](https://gatsbybase.vercel.app/)
- [ASTRO BASE](https://astrobase.vercel.app/)
