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

All copy, skills, projects, experience and social links live in [`src/content/site.ts`](src/content/site.ts).
Each project automatically gets a page at `/projects/<slug>`. The Experience section appears once you add entries.

## Contact form

The form posts to a Server Action ([`src/app/actions.ts`](src/app/actions.ts)) that sends mail via [Resend](https://resend.com).
Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (also add them in Vercel → Project → Environment Variables).

## Deploy

Push to the connected Vercel project - `vercel.json` sets the framework to Next.js.
