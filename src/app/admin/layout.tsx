import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Heart, Hotel, Users } from "lucide-react";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/requests", label: "Requests", icon: Heart },
  { href: "/admin/stays", label: "Stays", icon: Hotel },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="font-semibold tracking-tight">
            Anniversary CRM
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t p-4 text-xs text-muted-foreground">{session.user.email}</div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center border-b bg-background px-6 md:hidden">
          <Link href="/admin" className="font-semibold tracking-tight">
            Anniversary CRM
          </Link>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
