import Link from "next/link";

export default function NotFound() {
  return (
    <section className="market-hero relative mx-auto grid min-h-[26rem] max-w-4xl place-items-center overflow-hidden rounded-3xl border market-rule px-6 py-14 text-center sm:px-12">
      <div className="absolute -right-8 -top-12 select-none text-[11rem] opacity-[0.08]" aria-hidden="true">🥬</div>
      <div className="absolute -bottom-12 -left-8 select-none text-[11rem] opacity-[0.08]" aria-hidden="true">🍅</div>
      <div className="relative max-w-xl">
        <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-3xl border border-base-300 bg-base-100 text-5xl shadow-sm" aria-hidden="true">
          🧺
        </div>
        <p className="market-kicker text-sm font-semibold text-secondary">৪০৪ · গলিটা বোধহয় ভুল হয়েছে</p>
        <h1 className="my-3 text-4xl font-bold sm:text-5xl">এই পাতার কোনো দর পাওয়া গেল না</h1>
        <p className="mx-auto mb-7 max-w-md leading-relaxed opacity-70">
          ঠিকানাটি ভুল হতে পারে, অথবা এই পাতাটি আর বাজারে নেই। চলুন, বাজারের মূল ফটকে ফিরে যাই।
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">হোম পেজে ফিরুন</Link>
          <Link href="/#সব-পণ্য" className="btn btn-outline">সব পণ্য দেখুন</Link>
        </div>
      </div>
    </section>
  );
}
