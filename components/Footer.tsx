export default function Footer() {
  return (
    <footer className="mt-12 border-t border-base-300 bg-base-100">
      <div className="market-shell flex flex-col justify-between gap-2 py-5 text-xs opacity-75 md:flex-row sm:text-sm">
        <p><span className="font-semibold">বাজার দর</span> <span className="opacity-75">· প্রতিদিনের বাজারের হিসাব</span></p>
        <p>বাজার ও সময়ভেদে প্রকৃত দাম পরিবর্তিত হতে পারে।</p>
      </div>
    </footer>
  );
}
