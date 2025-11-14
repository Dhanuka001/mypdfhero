import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-purple-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-[#4b3b63] md:flex-row md:items-center md:justify-between">
        <p>&copy; {year} MyPDFHero. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-[#120529]">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-[#120529]">
            Terms
          </Link>
          <a
            href="mailto:hello@mypdfhero.com"
            className="hover:text-[#120529]"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
