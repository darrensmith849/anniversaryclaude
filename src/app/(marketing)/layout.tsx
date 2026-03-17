import Link from "next/link";
import { Heart } from "lucide-react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Heart className="h-5 w-5 text-primary" />
            <span>Anniversary Concierge</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/plan"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Plan Your Anniversary
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Anniversary Concierge. Luxury
          celebrations across South Africa.
        </div>
      </footer>
    </div>
  );
}
