# Bazar Dor

A Next.js app for viewing prices of everyday essentials in Bangladesh, price changes, and market-specific pricing information.

## Features

- The homepage highlights products with rising and falling prices and shows the current average price of all products.
- Browse products by category and sort them by price.
- View minimum, maximum, and average product prices, along with market prices by division.
- Sign in with email and password or with Google, GitHub, and Discord.
- View your profile and update your name.
- Price data is fetched from two API endpoints; if the first is unavailable, the app tries the fallback endpoint.

## Run Locally

Start a MongoDB server or create a MongoDB Atlas cluster. Copy `.env.example` to `.env.local` and provide your MongoDB connection string, Better Auth secret, and any OAuth credentials you need. In PowerShell:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Set `MONGODB_URI` to a connection string that includes the database name, such as `mongodb://127.0.0.1:27017/bazardor` or an Atlas URI like `mongodb+srv://.../bazardor`. `BETTER_AUTH_SECRET` is also required. To enable OAuth sign-in, add the real client ID and client secret from each provider's developer console to `.env.local`; blank or sample values from `.env.example` will not work. Add these redirect/callback URLs to the respective providers:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`
- Discord: `http://localhost:3000/api/auth/callback/discord`

In production, replace `localhost:3000` with your deployed site's origin and set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to that same origin. To use email and password, create an account at `/signup`, then sign in at `/signin`. Better Auth's MongoDB adapter creates the required collections and indexes; no separate database migration command is needed.

## Deployment

When deploying to Vercel, use MongoDB Atlas or another hosted MongoDB database. Add the required values from `.env.example` to your deployment environment settings. Include the database name in `MONGODB_URI`, and set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your deployed site's URL. Product detail and category routes can also be opened directly or refreshed.

This app no longer uses the old PostgreSQL `DATABASE_URL`. Existing accounts in PostgreSQL are not automatically copied to MongoDB; migrate user data separately if needed.
