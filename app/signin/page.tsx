"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

function Form() {
  const router = useRouter(), sp = useSearchParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (sp.get("redirected")) toast.error("অনুগ্রহ করে লগইন করুন", { id: "auth-redirect" }); }, [sp]);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true);
    const f = new FormData(e.currentTarget);
    try {
      const { error } = await authClient.signIn.email({ email: String(f.get("email")), password: String(f.get("password")) });
      if (error) return toast.error(error.message || "লগইন ব্যর্থ হয়েছে");
      toast.success("সফলভাবে লগইন হয়েছে");
      router.push(sp.get("next") || "/"); router.refresh();
    } catch {
      toast.error("লগইন সার্ভারে সংযোগ করা যায়নি");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="max-w-md mx-auto card border border-base-300 bg-base-100 shadow-sm"><div className="card-body p-6 sm:p-8">
      <p className="market-kicker text-sm font-semibold text-secondary">বাজার দর</p>
      <h1 className="text-2xl font-bold">লগইন করুন</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input name="email" type="email" required placeholder="ইমেইল" className="input input-bordered" />
        <input name="password" type="password" required placeholder="পাসওয়ার্ড" className="input input-bordered" />
        <button className="btn btn-primary" disabled={loading}>{loading ? "অপেক্ষা করুন..." : "লগইন"}</button>
      </form>
      <div className="divider text-xs">অথবা</div>
      <SocialButtons />
      <p className="text-sm mt-2">অ্যাকাউন্ট নেই? <Link href="/signup" className="link link-primary">নিবন্ধন করুন</Link></p>
    </div></div>
  );
}
export default function SignIn() { return <Suspense><Form /></Suspense>; }
