import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-base-200 text-4xl" aria-hidden="true">🧺</div>
      <p className="market-kicker text-sm font-semibold text-secondary">৪০৪ · পাতা পাওয়া যায়নি</p>
      <h1 className="text-3xl font-bold mb-2">এই বাজারের পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mb-6 opacity-70">লিংকটি ভুল হতে পারে, অথবা পাতাটি সরানো হয়েছে।</p>
      <Link href="/" className="btn btn-primary">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
