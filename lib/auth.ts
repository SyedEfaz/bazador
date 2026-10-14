import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const social = (id?: string, secret?: string) => (id && secret ? { clientId: id, clientSecret: secret } : undefined);
const e = process.env;
if (!e.MONGODB_URI) throw new Error("MONGODB_URI is required to connect Better Auth to MongoDB.");
if (!e.BETTER_AUTH_SECRET || e.BETTER_AUTH_SECRET.length < 32) {
  throw new Error("BETTER_AUTH_SECRET is required and must be at least 32 characters long.");
}
if (!e.BETTER_AUTH_URL) throw new Error("BETTER_AUTH_URL is required to configure Better Auth.");
const globalForMongo = globalThis as typeof globalThis & { mongoClient?: MongoClient };
const mongoClient = globalForMongo.mongoClient ?? new MongoClient(e.MONGODB_URI);
globalForMongo.mongoClient = mongoClient;
const mongoDb = mongoClient.db();
const socialProviders = Object.fromEntries(
  Object.entries({
    google: social(e.GOOGLE_CLIENT_ID, e.GOOGLE_CLIENT_SECRET),
    github: social(e.GITHUB_CLIENT_ID, e.GITHUB_CLIENT_SECRET),
    discord: social(e.DISCORD_CLIENT_ID, e.DISCORD_CLIENT_SECRET),
  }).filter(([, v]) => v)
);

export const auth = betterAuth({
  database: mongodbAdapter(mongoDb, { client: mongoClient, transaction: false }),
  secret: e.BETTER_AUTH_SECRET,
  baseURL: e.BETTER_AUTH_URL,
  // No email verification / password reset by design
  emailAndPassword: { enabled: true, autoSignIn: false, minPasswordLength: 6 },
  socialProviders,
});
