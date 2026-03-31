# Spark Consultancy Website

Spark is a React + TypeScript web app for a placement and mentorship consultancy. It includes a modern landing experience, student outcomes pages, events listing, contact form, and admin workflow for local data management.

## Tech Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- shadcn/ui components

## Pages

- Home: redesigned landing page with testimonials, metrics, and client highlights.
- Students: richer outcome cards and placement support sections.
- Companies: partner network showcase.
- Events: multi-event listing for users.
- About: company values and approach.
- Contact: user inquiry form with required name, email, phone, and message.
- Admin Dashboard: manage incoming contact queries, add client companies, and add placed student details.

## Data Handling

This project currently uses browser localStorage for lightweight persistence:

- Contact submissions are saved to spark-contact-queries.
- Admin-added clients are saved to spark-client-companies.
- Admin-added placement records are saved to spark-placed-students.

Note: This is suitable for demo/local use. For production, replace with a backend and database.

## Run Locally

1. Install dependencies:

```sh
npm install
```

2. Start development server:

```sh
npm run dev
```

3. Build for production:

```sh
npm run build
```

4. Preview production build:

```sh
npm run preview
```

## Test and Lint

- Run tests:

```sh
npm run test
```

- Run linter:

```sh
npm run lint
```

## Project Structure

- src/pages: route-level pages (Home, Students, Events, Contact, Admin, etc.)
- src/components: shared UI pieces (Navbar, Footer, UI primitives)
- src/assets: image assets
- public: static files (robots, favicon)

## Branding

- Browser tab title is set to Spark Consultancy.
- Custom favicon is served from public/spark-favicon.svg.

## Next Recommended Improvements

- Add authentication and role-based access for Admin Dashboard.
- Move localStorage data to API + database.
- Add server-side validation and spam protection for contact form.
- Add CRUD edit/delete for clients and placements in admin panel.
