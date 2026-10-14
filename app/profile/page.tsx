"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
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
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({ name });
      if (error) {
        toast.error(error.message || "Could not update your profile.");
        return;
      }

      toast.success("Profile updated successfully.");
      router.refresh();
    } catch {
      toast.error("Could not update your profile.");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) return <div className="skeleton mx-auto h-80 w-full max-w-md rounded-2xl" />;
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
