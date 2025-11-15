import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const baseMetadata = buildMetadata({
  title: "MyPDFHero | Free PDF Tools for Everyday Workflows",
  description: siteConfig.description,
});

export const metadata: Metadata = {
  ...baseMetadata,
  icons: {
    icon: "/mypdfhero_logo.png",
    shortcut: "/mypdfhero_logo.png",
    apple: "/mypdfhero_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.variable} min-h-screen bg-[#FCFAFF] text-[#120529] antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
