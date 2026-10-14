# Bazar Dor

Bangladesh market prices, product categories, and price trends.

## Setup

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Set `MONGODB_URI` (including a database name) and `BETTER_AUTH_SECRET` in `.env`. For OAuth, add provider credentials and register callbacks:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`
- Discord: `http://localhost:3000/api/auth/callback/discord`

Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your site origin. Use a hosted MongoDB database in production.
