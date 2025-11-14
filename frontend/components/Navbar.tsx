import Link from "next/link";

const links = [
  { href: "/tools/compress-pdf", label: "Compress" },
  { href: "/tools/merge-pdf", label: "Merge" },
  { href: "/tools/jpg-to-pdf", label: "JPG to PDF" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-purple-100/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-[#120529]">
          MyPDFHero
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#4b3b63] transition hover:text-[#120529]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          className="rounded-full bg-[#7c3aed] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-[#6931c9]"
        >
          Free & Secure
        </Link>
      </div>
    </header>
  );
}
