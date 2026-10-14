export default function Footer() {
  return (
    <footer className="bg-neutral text-base-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-3 text-sm">
        <p><span className="font-semibold">বাজার দর</span> <span className="opacity-75">· প্রতিদিনের বাজারের হিসাব</span></p>
        <p className="opacity-80">বাজার ও সময়ভেদে প্রকৃত দাম পরিবর্তিত হতে পারে।</p>
      </div>
    </footer>
  );
}
