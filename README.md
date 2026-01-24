# TokenCentric Landing Page

Marketing site for [TokenCentric](https://github.com/helrabelo/tokencentric) - the dashboard for AI coding assistants.

**Live**: https://tokencentric.app

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Analytics**: Umami (self-hosted)
- **Hosting**: Vercel

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

Push to `main` branch to deploy to Vercel.

## Structure

```
src/
├── app/
│   ├── page.tsx        # Landing page
│   ├── layout.tsx      # Root layout with metadata
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # Reusable UI components
│   ├── providers/      # Context providers
│   └── seo/            # SEO components (JsonLd)
└── messages/
    └── en.json         # English translations
```

## Brand Assets

Copy from `/brand/tokencentric/web/` to `/public/` when updating brand.

## License

MIT
