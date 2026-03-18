"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Building2,
  Users,
  CheckSquare,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Requests", href: "/admin/requests", icon: FileText },
  { label: "Stays", href: "/admin/stays", icon: Building2 },
  { label: "Partners", href: "/admin/partners", icon: Users },
  { label: "Tasks", href: "/admin/tasks", icon: CheckSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-56 flex-col border-r border-neutral-200 bg-white">
      <div className="px-5 py-5 border-b border-neutral-100">
        <Link href="/admin" className="text-sm font-serif font-semibold text-ink">
          Concierge CRM
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-neutral-100 text-neutral-900 font-medium"
                  : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-100 px-3 py-4">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
