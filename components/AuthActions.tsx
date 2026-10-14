"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthActions() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  if (isPending) return <div className="skeleton h-8 w-24" />;
  if (!data?.user)
    return (
      <div className="flex gap-2">
        <Link href="/signin" className="btn btn-sm sm:btn-md btn-outline btn-primary">সাইন ইন</Link>
        <Link href="/signup" className="btn btn-sm sm:btn-md btn-primary">সাইন আপ</Link>
      </div>
    );
  const u = data.user;
  return (
    <div className="flex items-center gap-2">
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-ghost btn-circle avatar" aria-label="প্রোফাইল">
          <div className="w-9 rounded-full bg-primary text-primary-content grid place-items-center">
            {u.image ? <img src={u.image} alt={u.name} /> : <span>{u.name?.[0]?.toUpperCase()}</span>}
          </div>
        </button>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box shadow z-50 w-52 p-2 border border-base-300">
          <li className="menu-title">{u.name}</li>
          <li><Link href="/profile">আমার প্রোফাইল</Link></li>
          <li><Link href="/profile/update">তথ্য আপডেট করুন</Link></li>
        </ul>
      </div>
      <button className="btn btn-sm sm:btn-md btn-outline btn-error" onClick={async () => {
        await authClient.signOut();
        toast.success("সফলভাবে সাইন আউট হয়েছে");
        router.push("/"); router.refresh();
      }}>সাইন আউট</button>
    </div>
  );
}
