import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anniversary Concierge | Luxury Celebrations in South Africa",
  description:
    "Bespoke anniversary planning for discerning couples. Luxury stays, curated experiences, and unforgettable moments across South Africa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div aria-hidden="true" className="site-backdrop" />
        {children}
      </body>
    </html>
  );
}
