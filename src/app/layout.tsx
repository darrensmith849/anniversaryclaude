import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxury Anniversary Concierge | South Africa",
  description:
    "Bespoke anniversary experiences across South Africa — safari, winelands, coastal escapes, and more. Let us curate your perfect celebration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
