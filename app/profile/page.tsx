"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { runWithToast } from "@/lib/run-with-toast";
import UserAvatar from "@/components/UserAvatar";

export default function Profile() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const user = data?.user;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const succeeded = await runWithToast(
      setLoading,
      () => authClient.updateUser({ name }),
      {
        error: "Could not update your profile.",
        connectionError: "Could not update your profile.",
        success: "Profile updated successfully.",
      },
    );
    if (succeeded) router.refresh();
  }

  if (isPending) return (
    <div role="status" className="mx-auto w-full max-w-md">
      <span className="sr-only">প্রোফাইল লোড হচ্ছে...</span>
      <div aria-hidden="true" className="skeleton h-80 rounded-2xl" />
    </div>
  );
  if (!user) return null;

  return (
    <section className="card mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body p-5 sm:p-7">
        <header className="mb-2 flex flex-col items-center text-center">
          <UserAvatar image={user.image} name={user.name} size="lg" />
          <h1 className="mt-3 text-xl font-bold">আমার প্রোফাইল</h1>
          <p className="text-sm text-neutral/60">আপনার অ্যাকাউন্টের তথ্য</p>
        </header>

        <form onSubmit={onSubmit} className="mt-2 grid gap-3">
          <label htmlFor="profile-name" className="grid gap-1.5 text-sm font-medium">
            নাম
            <input
              id="profile-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="input input-bordered w-full rounded-lg"
            />
          </label>
          <label htmlFor="profile-email" className="grid gap-1.5 text-sm font-medium">
            ইমেইল
            <input id="profile-email" type="email" value={user.email} readOnly className="input input-bordered w-full rounded-lg bg-base-200" />
          </label>
          <button className="btn btn-primary mt-1 w-full rounded-lg" disabled={loading || name.trim() === ""}>
            {loading ? "অপেক্ষা করুন..." : "পরিবর্তন সংরক্ষণ করুন"}
          </button>
        </form>
      </div>
    </section>
  );
}
