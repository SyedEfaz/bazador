"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getSafeCallbackUrl } from "@/lib/callback-url";

export default function SocialButtons() {
  const [loading, setLoading] = useState(false);
  const googleConfigured = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  async function signInWithGoogle() {
    setLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: getSafeCallbackUrl(new URL(window.location.href).searchParams.get("callbackURL")) ?? "/",
      });

      if (error) toast.error(error.message || "Could not sign in with Google.");
    } catch {
      toast.error("Could not sign in with Google.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="divider text-xs">অথবা</div>
      <button type="button" className="btn btn-outline w-full" onClick={signInWithGoogle} disabled={loading || !googleConfigured}>
        {!googleConfigured ? "Google sign-in needs configuration" : loading ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
      </button>
    </>
  );
}
