import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import {
  LayoutDashboard,
  Heart,
  Hotel,
  Handshake,
  CheckSquare,
  Mail,
  FileText,
  LogOut,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/requests", label: "Requests", icon: Heart },
  { href: "/admin/stays", label: "Stays", icon: Hotel },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/admin/emails", label: "Emails", icon: Mail },
  { href: "/admin/templates", label: "Templates", icon: FileText },
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Heart className="h-5 w-5 text-primary" />
            <span>Anniversary CRM</span>
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
        <div className="border-t p-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <LogOut className="h-4 w-4" />
            <span>{session.user.email}</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center border-b px-6 md:hidden">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Heart className="h-5 w-5 text-primary" />
            <span>Anniversary CRM</span>
          </Link>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
