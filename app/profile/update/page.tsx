"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfile() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (data?.user) setName(data.user.name);
  }, [data?.user]);



  async function onSubmit(e: React.FormEvent) {
    
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name });
      if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট সার্ভারে সংযোগ করা যায়নি");
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি");
    }
  }

  if (isPending) return <div className="skeleton mx-auto h-64 w-full max-w-[26rem] rounded-2xl" />;
  const user = data?.user;
  if (!user) return null;

  return (
    <div className="mx-auto w-full max-w-[26rem] py-4 sm:py-8">
      <header className="mb-4">
        <h1 className="text-xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-xs text-neutral/60">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </header>

      <section className="mb-3 flex items-center gap-3 rounded-xl border border-base-300 bg-base-100 p-3.5">
        <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-base-200 text-xl font-semibold text-primary">
          {user.image ? <img src={user.image} alt="" className="h-full w-full object-cover" /> : user.name?.[0]?.toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-neutral/60">{user.email}</p>
        </div>
        <button type="button" onClick={signOut} className="btn btn-xs rounded-lg border-error/50 bg-base-100 text-error hover:bg-error/10 sm:btn-sm">
          ↪ সাইন আউট
        </button>
      </section>

      <section className="rounded-xl border border-base-300 bg-base-100 p-4">
        <h2 className="mb-3 text-sm font-bold">তথ্য</h2>
        <form onSubmit={onSubmit} className="grid gap-2.5">
          <label className="grid gap-1 text-xs font-medium" htmlFor="profile-name">নাম</label>
          <input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} required className="input input-bordered input-sm w-full rounded-lg" />
          <button className="btn btn-primary btn-sm mt-0.5 rounded-lg" disabled={loading}>{loading ? "অপেক্ষা করুন..." : "আপডেট"}</button>
        </form>
      </section>
    </div>
  );
}
