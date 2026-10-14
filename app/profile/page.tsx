"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Profile() {
  const { data, isPending } = authClient.useSession();
  if (isPending) return <div className="skeleton h-48 max-w-md mx-auto" />;
  const u = data?.user;
  if (!u) return null;
  return (
    <div className="max-w-md mx-auto card border border-base-300 bg-base-100 shadow-sm"><div className="card-body items-center p-6 text-center sm:p-8">
      <div className="avatar"><div className="w-24 rounded-full bg-primary text-primary-content grid place-items-center text-4xl">
        {u.image ? <img src={u.image} alt={u.name} /> : <span>{u.name?.[0]?.toUpperCase()}</span>}
      </div></div>
      <h1 className="text-2xl font-bold">{u.name}</h1>
      <p className="opacity-70">{u.email}</p>
      <Link href="/profile/update" className="btn btn-primary mt-3">তথ্য আপডেট করুন</Link>
    </div></div>
  );
}
