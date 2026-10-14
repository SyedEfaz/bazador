"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const PROVIDERS = [["google", "Google"], ["github", "GitHub"], ["discord", "Discord"]] as const;
export default function SocialButtons() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  async function signIn(provider: (typeof PROVIDERS)[number][0]) {
    setLoadingProvider(provider);
    try {
      const { error } = await authClient.signIn.social({ provider, callbackURL: "/" });
      if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
    } catch {
      toast.error("সোশ্যাল লগইন সার্ভারে সংযোগ করা যায়নি");
    } finally {
      setLoadingProvider(null);
    }
  }

  return (
    <div className="grid gap-2">
      {PROVIDERS.map(([id, label]) => (
        <button key={id} type="button" className="btn btn-outline btn-sm sm:btn-md"
          disabled={loadingProvider !== null} onClick={() => signIn(id)}>
          {loadingProvider === id ? "অপেক্ষা করুন..." : `${label} দিয়ে চালিয়ে যান`}
        </button>
      ))}
    </div>
  );
}
