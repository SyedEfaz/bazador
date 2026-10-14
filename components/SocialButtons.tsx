"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    setLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: (() => {
          const value = new URL(window.location.href).searchParams.get("callbackURL");
          return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
        })(),
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
      <button type="button" className="btn btn-outline w-full" onClick={signInWithGoogle} disabled={loading}>
        {loading ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
      </button>
    </>
  );
}
