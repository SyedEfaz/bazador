import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

const font = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-bn" });
export const metadata: Metadata = {
  title: { default: "বাজার দর | বাংলাদেশের নিত্যপণ্যের দাম", template: "%s | বাজার দর" },
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের গড় দাম, বাজারভিত্তিক দর এবং দামের ওঠানামা দেখুন।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="bazar" className={font.variable}>
      <body className="font-sans min-h-screen flex flex-col bg-base-100 text-neutral">
        <Navbar />
        <Ticker />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
