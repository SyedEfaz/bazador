# বাজার দর / BazarDor

A Bangla marketplace interface with sample grocery and household prices.

## How it works

Market categories, products, and example prices are stored in local project data. They are not live market data and do not use a market data API.

Email sign-up and sign-in use Better Auth with MongoDB. Set these variables in a local `.env.local` file:

```env
MONGODB_URI=your-mongodb-connection-string
BETTER_AUTH_SECRET=your-secret-at-least-32-characters-long
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
```

Google sign-in is enabled when both Google variables are set. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI in Google Cloud, and use your deployed URL in production. Keep the MongoDB URI, auth secret, and Google client secret private.

## Technologies

- Next.js 15
- React 19
- TypeScript
- Better Auth
- MongoDB
- Tailwind CSS
- DaisyUI

## Run locally

```bash
npm install
npm run dev
```

Build and start the Next.js app with `npm run build` and `npm start`.
