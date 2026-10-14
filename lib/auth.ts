import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const globalForAuth = globalThis as typeof globalThis & {
  authInstance?: ReturnType<typeof createAuthInstance>;
  mongoClient?: MongoClient;
};

function createAuthInstance(client: MongoClient, secret: string) {
  return betterAuth({
    database: mongodbAdapter(client.db(), { client, transaction: false }),
    secret,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: { enabled: true, autoSignIn: false, minPasswordLength: 6 },
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          socialProviders: {
            google: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
          },
        }
      : {}),
  });
}

export function getAuth() {
  if (globalForAuth.authInstance) return globalForAuth.authInstance;

  const uri = process.env.MONGODB_URI;
  const secret = process.env.BETTER_AUTH_SECRET;

  if (!uri) throw new Error("MONGODB_URI is required for authentication.");
  if (!secret || secret.length < 32) {
    throw new Error("BETTER_AUTH_SECRET must be at least 32 characters long.");
  }

  const client = globalForAuth.mongoClient ?? new MongoClient(uri);
  globalForAuth.mongoClient = client;

  globalForAuth.authInstance = createAuthInstance(client, secret);

  return globalForAuth.authInstance;
}
