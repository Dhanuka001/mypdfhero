"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/tools/compress-pdf", label: "Compress" },
  { href: "/tools/merge-pdf", label: "Merge" },
  { href: "/tools/jpg-to-pdf", label: "JPG to PDF" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-purple-100/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-8">
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-2.5"
        >
          <Image
            src="/mypdfhero_logo.png"
            alt="MyPDFHero logo"
            width={90}
            height={90}
            className="h-16 w-16 md:h-10 md:w-10"
          />
          <span className="text-lg font-semibold tracking-tight text-[#120529] md:text-xl">
            MyPDFHero
          </span>
        </Link>

        {/* Center Nav (desktop) */}
        <nav className="hidden flex-1 items-center justify-center gap-2 text-md font-medium md:flex">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-1 text-[#4b3b63] transition-all hover:text-[#120529] ${
                  isActive ? "bg-[#efe7ff] font-semibold text-[#120529] shadow-sm shadow-purple-100" : ""
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-6 bottom-0 h-[3px] rounded-full bg-[#7c3aed]" aria-hidden />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            className="rounded-full bg-[#7c3aed] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-[#6931c9] md:px-5 md:text-sm"
          >
            Free & Secure
          </Link>
        </div>
      </div>
    </header>
  );
}
