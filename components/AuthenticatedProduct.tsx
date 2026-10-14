"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ProductDetails from "@/components/ProductDetails";
import type { Market, Product } from "@/lib/types";

export default function AuthenticatedProduct({ product }: { product: Product & { markets: Market[] } }) {
  const { data, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !data?.user) {
      router.replace(`/signin?callbackURL=${encodeURIComponent(pathname)}`);
    }
  }, [data?.user, isPending, pathname, router]);

  if (isPending || !data?.user) {
    return <div className="mx-auto max-w-5xl rounded-2xl border border-base-300 bg-base-100 p-6 text-center">সাইন ইন যাচাই করা হচ্ছে…</div>;
  }

  return <ProductDetails product={product} />;
}
