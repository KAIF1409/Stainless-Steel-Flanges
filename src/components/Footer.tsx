import { PHONE_DISPLAY, EMAIL } from "./Header";

export default function Footer() {
  return (
    <footer className="bg-steel-900 text-steel-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-8">
        <p>&copy; {new Date().getFullYear()} Bhansali Stainless &mdash; Flanges Division</p>
        <p className="flex flex-wrap gap-x-4">
          <span>{PHONE_DISPLAY}</span>
          <span>{EMAIL}</span>
        </p>
      </div>
      <div className="mx-auto max-w-6xl border-t border-steel-700 px-4 py-3 font-mono text-[11px] text-steel-300 md:px-8">
        doc. BS/FLG/SS-01 &middot; rev. C
      </div>
    </footer>
  );
}
