"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNav } from "@/lib/config/navigation";
import type { RoleName } from "@/lib/types/database";
import { cn } from "@/lib/utils";

/**
 * Grouped dashboard navigation. Rendered inside the desktop aside and the
 * mobile sheet (via DashboardTopbar). Role-gated links are filtered here
 * for display; pages enforce access authoritatively on the server.
 */
export function DashboardSidebar({
  role,
  onNavigate,
}: {
  role: RoleName;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <nav aria-label="Dashboard" className="flex flex-col gap-7 px-3 py-5">
      {dashboardNav.map((group) => {
        const links = group.links.filter((link) => !link.roles || link.roles.includes(role));
        if (links.length === 0) return null;
        return (
          <div key={group.label}>
            <p className="px-3 pb-2 text-[0.68rem] font-semibold tracking-[0.2em] text-gold-300/80 uppercase">
              {group.label}
            </p>
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none",
                      isActive(link.href)
                        ? "bg-white/10 text-white before:absolute before:top-2.5 before:bottom-2.5 before:left-0 before:w-0.5 before:rounded-full before:bg-gold-300"
                        : "text-brand-200 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <link.icon aria-hidden className="size-[1.1rem] shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
