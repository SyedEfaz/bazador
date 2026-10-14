"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthActions() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  if (isPending) return <div className="skeleton h-9 w-24 rounded-full" />;
  if (!data?.user)
    return (
      <div className="flex gap-2">
        <Link href="/signin" className="btn btn-xs rounded-lg btn-outline btn-primary sm:btn-sm">সাইন ইন</Link>
        <Link href="/signup" className="btn btn-xs rounded-lg btn-primary sm:btn-sm">সাইন আপ</Link>
      </div>
    );
  const u = data.user;

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="flex max-w-40 items-center gap-2 rounded-full px-1.5 py-1 text-left hover:bg-base-200 sm:max-w-52" aria-label="ব্যবহারকারীর মেনু">
        <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-base-200 text-sm font-semibold text-primary">
          {u.image ? <img src={u.image} alt="" className="h-full w-full object-cover" /> : <span>{u.name?.[0]?.toUpperCase()}</span>}
        </div>
        <span className="truncate text-xs font-semibold sm:text-sm">{u.name}</span>
        <span className="text-[10px] opacity-60" aria-hidden="true">▾</span>
      </button>
      <div tabIndex={0} className="dropdown-content z-50 mt-2 w-64 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg">
        <div className="border-b border-base-300 px-3 py-2">
          <p className="truncate text-sm font-semibold">{u.name}</p>
          <p className="truncate text-xs opacity-60">{u.email}</p>
        </div>
        <ul className="menu menu-sm mt-1 p-0">
          <li><Link href="/profile">👤 আমার প্রোফাইল</Link></li>
          <li><Link href="/profile/update">✎ তথ্য আপডেট করুন</Link></li>
        </ul>
        <div className="mt-1 border-t border-base-300 pt-1">
          <button className="btn btn-ghost btn-sm h-9 min-h-9 w-full justify-start text-error" onClick={async () => {
            await authClient.signOut();
            toast.success("সফলভাবে সাইন আউট হয়েছে");
            router.push("/"); router.refresh();
          }}>↪ সাইন আউট</button>
        </div>
      </div>
    </div>
  );
}
