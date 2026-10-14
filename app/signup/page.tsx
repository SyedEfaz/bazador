"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true);
    const f = new FormData(e.currentTarget);
    try {
      const { error } = await authClient.signUp.email({ name: String(f.get("name")), email: String(f.get("email")), password: String(f.get("password")) });
      if (error) return toast.error(error.message || "নিবন্ধন ব্যর্থ হয়েছে");
      toast.success("নিবন্ধন সফল হয়েছে। এখন লগইন করুন");
      router.push("/signin");
    } catch {
      toast.error("নিবন্ধন সার্ভারে সংযোগ করা যায়নি");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="max-w-md mx-auto card border border-base-300 bg-base-100 shadow-sm"><div className="card-body p-6 sm:p-8">
      <p className="market-kicker text-sm font-semibold text-secondary">বাজার দর</p>
      <h1 className="text-2xl font-bold">নতুন অ্যাকাউন্ট খুলুন</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input name="name" required placeholder="নাম" className="input input-bordered" />
        <input name="email" type="email" required placeholder="ইমেইল" className="input input-bordered" />
        <input name="password" type="password" required minLength={6} placeholder="পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)" className="input input-bordered" />
        <button className="btn btn-primary" disabled={loading}>{loading ? "অপেক্ষা করুন..." : "নিবন্ধন করুন"}</button>
      </form>
      <div className="divider text-xs">অথবা</div>
      <SocialButtons />
      <p className="text-sm mt-2">আগে থেকেই অ্যাকাউন্ট আছে? <Link href="/signin" className="link link-primary">লগইন করুন</Link></p>
    </div></div>
  );
}
