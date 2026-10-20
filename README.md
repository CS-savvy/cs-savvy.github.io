# Mukul - Deep Learning Engineer portfolio

Built with **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript** and **Tailwind CSS v4**.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are statically prerendered)
npm run lint
```

## Editing content

Content is managed in [Sanity](https://www.sanity.io). The Studio is embedded at **`/studio`** (e.g. `http://localhost:3000/studio`):

- **Site settings** - name, role, hero, About text, stats, résumé PDF, socials, contact text and section headings
- **Résumé** - experience, publications, patents, skills, education, certifications (drag to reorder)
- **Projects** - each gets a page at `/projects/<slug>`; sort with the `order` field
- **Blog posts** & **Blog categories** - personal posts at `/blog/<slug>`, filterable at `/blog/category/<slug>`

Sections with no entries are hidden automatically. Published changes appear on the live site within seconds (via `<SanityLive />`) without a redeploy.

**First-time setup**

1. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local` (and in Vercel).
2. In [sanity.io/manage](https://www.sanity.io/manage) → API → CORS origins, add `http://localhost:3000` and your production URL (with credentials allowed).
3. Import the existing content: `npx sanity login`, then `npm run seed`.

Until a *Site settings* document exists, the site renders the bundled fallback content in [`src/content/fallback.ts`](src/content/fallback.ts).

## Contact form

The form posts to a Server Action ([`src/app/actions.ts`](src/app/actions.ts)) that sends mail via [Resend](https://resend.com).
Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (also add them in Vercel → Project → Environment Variables).

## Deploy

Push to the connected Vercel project - `vercel.json` sets the framework to Next.js.
