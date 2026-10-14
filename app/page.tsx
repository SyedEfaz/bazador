import Image from "next/image";
import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

export const revalidate = 300;
const Section = ({ title, sub, id, children }: { title: string; sub?: string; id?: string; children: React.ReactNode }) => (
  <section id={id} className="mt-12">
    <div className="section-heading mb-5 flex flex-wrap items-end justify-between gap-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      {sub && <p className="text-sm opacity-70">{sub}</p>}
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
      <section className="market-hero grid md:grid-cols-2 gap-6 items-center overflow-hidden rounded-2xl border market-rule p-6 sm:p-10">
        <div className="max-w-xl">
          <p className="market-kicker text-sm font-semibold text-secondary">বাংলাদেশের নিত্যপণ্যের দর</p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight my-3">বাজারে যাওয়ার আগে, দামের খবর জেনে নিন</h1>
          <p className="opacity-75 mb-6">চাল-ডাল থেকে মাছ-সবজি—আজকের দর আর কোন পণ্যের দাম বাড়ল বা কমল, দেখে নিন এক জায়গায়।</p>
          <a href="#সব-পণ্য" className="btn btn-primary">পণ্যের তালিকা দেখুন <span aria-hidden="true">→</span></a>
        </div>
        <Image src="/hero.png" alt="তাজা শাকসবজির ঝুড়ি" width={420} height={340} priority className="mx-auto h-auto w-full max-w-sm drop-shadow-sm" />
      </section>
      <Section title="দাম বেড়েছে" sub="গতকালের তুলনায়"><ProductGrid items={up} /></Section>
      <Section title="দাম কমেছে" sub="গতকালের তুলনায়"><ProductGrid items={down} /></Section>
      <Section id="সব-পণ্য" title="আজকের পণ্যের দর" sub="নিত্যপ্রয়োজনীয় পণ্যের গড় দাম">
        {all.length ? <ProductGrid items={all} /> : <p className="opacity-70">এই মুহূর্তে দাম লোড করা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।</p>}
      </Section>
    </>
  );
}
