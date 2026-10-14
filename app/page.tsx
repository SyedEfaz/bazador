import Image from "next/image";
import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

export const revalidate = 300;
const Section = ({ title, sub, id, children }: { title: string; sub?: string; id?: string; children: React.ReactNode }) => (
  <section id={id} className="mt-7 sm:mt-9">
    <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
      <h2 className="flex items-center gap-2 text-lg font-bold sm:text-xl"><span className="text-primary" aria-hidden="true">▸</span>{title}</h2>
      {sub && <p className="text-xs opacity-65 sm:text-sm">{sub}</p>}
    </div>
    {children}
  </section>
);

export default async function Home() {
  const all = await getProducts();
  const up = all.filter((p) => p.change!.dir === "up").sort((a, b) => b.change!.pct - a.change!.pct).slice(0, 6);
  const down = all.filter((p) => p.change!.dir === "down").sort((a, b) => b.change!.pct - a.change!.pct).slice(0, 6);
  return (
    <>
      <section className="market-hero grid items-center gap-3 overflow-hidden rounded-2xl border market-rule px-5 py-5 sm:grid-cols-[1.25fr_.75fr] sm:gap-6 sm:px-7 sm:py-6">
        <div className="max-w-xl">
          <p className="market-kicker inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">হালনাগাদ: {new Intl.DateTimeFormat("bn-BD", { dateStyle: "long" }).format(new Date())}</p>
          <h1 className="my-2.5 text-2xl font-bold leading-tight sm:text-3xl">আজকের বাজারের দাম এক নজরে</h1>
          <p className="mb-4 max-w-lg text-xs leading-relaxed opacity-75 sm:text-sm">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দর — বাজারভিত্তিক বিস্তৃত, নির্ভরযোগ্য ও সর্বশেষ পণ্যের বাজার দর এক জায়গায়।</p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm min-h-9 rounded-lg px-4">সব পণ্য দেখুন <span aria-hidden="true">→</span></a>
        </div>
        <Image src="/hero.png" alt="তাজা শাকসবজির ঝুড়ি" width={320} height={250} priority className="mx-auto h-auto w-full max-w-[10rem] drop-shadow-sm sm:max-w-[13rem]" />
      </section>
      <Section title="দাম বেড়েছে" sub="গতকালের তুলনায়"><ProductGrid items={up} /></Section>
      <Section title="দাম কমেছে" sub="গতকালের তুলনায়"><ProductGrid items={down} /></Section>
      <Section id="সব-পণ্য" title="আজকের পণ্যের দর" sub="নিত্যপ্রয়োজনীয় পণ্যের গড় দাম">
        {all.length ? <ProductGrid items={all} /> : <p className="opacity-70">এই মুহূর্তে দাম লোড করা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।</p>}
      </Section>
    </>
  );
}
