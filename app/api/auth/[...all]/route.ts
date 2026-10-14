import { getAuth } from "@/lib/auth";

async function handleAuthRequest(request: Request) {
  return getAuth().handler(request);
}

export const GET = handleAuthRequest;
export const POST = handleAuthRequest;
