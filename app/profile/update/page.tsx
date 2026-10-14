"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { runWithToast } from "@/lib/run-with-toast";
import UserAvatar from "@/components/UserAvatar";

export default function UpdateProfile() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const user = data?.user;

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const succeeded = await runWithToast(
      setLoading,
      () => authClient.updateUser({ name }),
      {
        error: "Update failed.",
        connectionError: "Could not update your information.",
        success: "Information updated successfully.",
      },
    );
    if (!succeeded) return;

    router.push("/profile");
    router.refresh();
  }

  if (isPending) return (
    <div role="status" className="mx-auto w-full max-w-[26rem]">
      <span className="sr-only">প্রোফাইলের তথ্য লোড হচ্ছে...</span>
      <div aria-hidden="true" className="skeleton h-64 rounded-2xl" />
    </div>
  );
  if (!user) return null;

  return (
    <div className="mx-auto w-full max-w-[26rem] py-4 sm:py-8">
      <header className="mb-4">
        <h1 className="text-xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-xs text-neutral/60">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </header>

      <section className="mb-3 flex items-center gap-3 rounded-xl border border-base-300 bg-base-100 p-3.5">
        <UserAvatar image={user.image} name={user.name} size="md" className="bg-base-200 text-primary" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-neutral/60">{user.email}</p>
        </div>
      </section>

      <section className="rounded-xl border border-base-300 bg-base-100 p-4">
        <h2 className="mb-3 text-sm font-bold">তথ্য</h2>
        <form onSubmit={onSubmit} className="grid gap-2.5">
          <label className="grid gap-1 text-xs font-medium" htmlFor="profile-name">নাম</label>
          <input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} required className="input input-bordered input-sm w-full rounded-lg" />
          <button className="btn btn-primary btn-sm mt-0.5 rounded-lg" disabled={loading}>
            {loading ? "অপেক্ষা করুন..." : "আপডেট"}
          </button>
        </form>
      </section>
    </div>
  );
}
