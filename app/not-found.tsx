import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-12 text-center">
      <h1 className="text-2xl font-bold">পাতাটি পাওয়া যায়নি</h1>
      <p className="my-4">এই ঠিকানায় কোনো পৃষ্ঠা নেই।</p>
      <Link href="/" className="btn btn-primary">হোমে ফিরুন</Link>
    </section>
  );
}
