# Dubai House

An architectural, editorial Dubai real-estate website based on the supplied Dubai House visual reference. Built with React, Vite, Express, and SQLite. This is a development preview with illustrative inventory and content, not a live brokerage deployment.

## Development

```sh
docker compose -f docker-compose.base44.yml up -d --build
```

Visit port **3000**. The frontend uses live reload; the API uses Node's file watcher. Dependencies install from `package-lock.json` in a one-shot Compose service. No external credentials are needed to start.

- `/` — complete asymmetric editorial homepage
- `/properties` — URL-driven search, filters, sorting, load more
- `/properties/:id` — gallery, details, favorites, agent/viewing inquiries
- `/favorites` — collection persisted in browser storage
- `/invest` — investment guide and illustrative interactive chart
- `/about` — story, mission, values, advisory disciplines
- `/blog` and `/blog/:slug` — filterable journal and articles
- `/contact` — validated, database-backed inquiry form
- `/privacy`, `/terms` — clearly marked preview policies

Queries support `purpose`, `location`, `type`, `minPrice`, `maxPrice`, `beds`, `baths`, `area`, `sort`, and `q`. Listings and testimonials are defined in `src/data.js`. Forms POST to same-origin `/api/inquiries` and `/api/newsletter`. The database persists in the `application_data` Docker volume and is not exposed through a public read endpoint.

## Verification

```sh
docker compose -f docker-compose.base44.yml exec -T web npm run build
docker compose -f docker-compose.base44.yml exec -T api npm test
curl --fail http://localhost:3000/api/status
```

API tests run against a separate temporary SQLite database. The tests cover input validation, persisted inquiry records, duplicate-safe newsletter subscription, and bot honeypots.

## Assets

Responsive architectural photographs (480, 960, and 1800 widths) are served locally from `public/images`. Cormorant Garamond and Inter Latin webfonts are served from `public/fonts`. Photography originates from Unsplash; verify suitability, licensing, and attribution requirements before launch. These images are visual illustrations, not verified photos of the named properties. Google Fonts font-family licences must be retained when distributing the fonts.

## Production preparation

A successful build is **not** a deployment. Hosting has not been configured. A Node 22.13+ host can install with `npm ci`, build with `npm run build`, then run `npm start`; set `PORT` to the hosting platform's port and `DATA_DIR` to a durable storage location. Express serves `dist` and handles clean frontend routes. Use HTTPS, backups, monitoring, and appropriate proxy/rate-limit configuration. SQLite needs durable disk and a single writer service; use a managed database before horizontal scaling.

Before commercial launch:

1. Replace illustrative inventory, photography, testimonials, investment figures, and brand experience claims with verified content. Confirm property advertising permits and brokerage/RERA details where required.
2. Supply verified business phone, email, address, social links, actual office hours, and consultant identities. Current channel buttons request contact through the inquiry form; no phone numbers or WhatsApp identities have been invented.
3. Connect an email/CRM provider and an authorised staff workflow. Current forms only save records; they do not send notifications, subscriptions, or transactional email. Obtain provider credentials securely through the platform Secrets interface and wire `/run/base44/app.env` last in any consuming service's env-file list. Do not put provider credentials in source or Compose environment defaults.
4. Complete legal/privacy review, consent/unsubscribe processes, retention/deletion practices, and a verified data-controller contact. Ensure access controls protect any future staff interface.
5. Configure the real domain, canonical URLs, sitemap, page-specific social metadata, monitoring, image/font licensing, and hosting. The current SPA has semantic content and metadata; prerendering/SSR is recommended for production listing/article discoverability.
6. Perform final accessibility, real-device, security, regulatory, and operational testing against the chosen production setup.

No production hosting provider or public commercial domain has been selected.
