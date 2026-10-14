"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import UserAvatar from "@/components/UserAvatar";

export default function AuthActions() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) return (
    <div role="status">
      <span className="sr-only">অ্যাকাউন্ট লোড হচ্ছে...</span>
      <div aria-hidden="true" className="skeleton h-9 w-24 rounded-full" />
    </div>
  );

  const user = data?.user;
  if (!user) {
    return (
      <div className="flex gap-2">
        <Link href="/signin" className="btn btn-xs rounded-lg btn-outline btn-primary sm:btn-sm">সাইন ইন</Link>
        <Link href="/signup" className="btn btn-xs rounded-lg btn-primary sm:btn-sm">সাইন আপ</Link>
      </div>
    );
  }

  async function signOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "Sign-out failed");
      return;
    }

    toast.success("Signed out successfully.");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="flex max-w-52 items-center gap-2 rounded-full px-1.5 py-1 text-left hover:bg-base-200" aria-label="ব্যবহারকারীর মেনু">
        <UserAvatar image={user.image} name={user.name} size="sm" className="bg-base-200 text-primary" />
        <span className="truncate text-xs font-semibold sm:text-sm">{user.name}</span>
      </button>
      <div className="dropdown-content z-50 mt-2 w-64 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg">
        <div className="border-b border-base-300 px-3 py-2">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs opacity-60">{user.email}</p>
        </div>
        <ul className="menu menu-sm mt-1 p-0">
          <li><Link href="/profile">আমার প্রোফাইল</Link></li>
          <li><Link href="/profile/update">তথ্য আপডেট করুন</Link></li>
        </ul>
        <div className="mt-1 border-t border-base-300 pt-1">
          <button className="btn btn-ghost btn-sm h-9 min-h-9 w-full justify-start text-error" onClick={signOut}>সাইন আউট</button>
        </div>
      </div>
    </div>
  );
}
