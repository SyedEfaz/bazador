"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);

    try {
      const { error } = await authClient.signIn.email({
        email: String(form.get("email")),
        password: String(form.get("password")),
      });

      if (error) {
        toast.error(error.message || "Sign-in failed");
        return;
      }

      toast.success("Signed in successfully.");
      const callbackURL = new URL(window.location.href).searchParams.get("callbackURL");
      const destination = callbackURL?.startsWith("/") && !callbackURL.startsWith("//") ? callbackURL : "/";
      window.location.assign(destination);
    } catch {
      toast.error("Could not connect to the sign-in server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card mx-auto w-full max-w-sm rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body p-6 sm:p-8">
        <p className="market-kicker text-sm font-semibold text-secondary">বাজার দর</p>
        <h1 className="text-2xl font-bold">লগইন করুন</h1>
        <form onSubmit={onSubmit} className="form-control gap-3">
          <input name="email" type="email" required placeholder="ইমেইল" className="input input-bordered w-full" />
          <input name="password" type="password" required placeholder="পাসওয়ার্ড" className="input input-bordered w-full" />
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "অপেক্ষা করুন..." : "লগইন করুন"}
          </button>
        </form>
        <SocialButtons />
        <p className="text-sm">
          অ্যাকাউন্ট নেই? <Link href="/signup" onClick={(event) => {
            const search = window.location.search;
            if (search) { event.preventDefault(); window.location.assign(`/signup${search}`); }
          }} className="link link-primary">নিবন্ধন করুন</Link>
        </p>
      </div>
    </section>
  );
}
