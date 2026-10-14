"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfile() {
  const { data } = authClient.useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (data?.user) setName(data.user.name);
  }, [data?.user]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.updateUser({ name });
    setLoading(false);
    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile"); router.refresh();
  }
  return (
    <div className="max-w-md mx-auto card border border-base-300 bg-base-100 shadow-sm"><div className="card-body p-6 sm:p-8">
      <p className="market-kicker text-sm font-semibold text-secondary">বাজার দর</p>
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <label className="form-control"><span className="label-text mb-1">নাম</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="input input-bordered" /></label>
        <button className="btn btn-primary" disabled={loading}>{loading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}</button>
      </form>
    </div></div>
  );
}
