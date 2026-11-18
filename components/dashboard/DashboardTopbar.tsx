"use client";

import { ChevronDown, ExternalLink, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { logoutDemo } from "@/lib/actions/auth";
import { company } from "@/lib/config/company";
import { dashboardNav } from "@/lib/config/navigation";
import { enumLabel } from "@/lib/types/database";
import type { SessionUser } from "@/lib/types/user";
import { cn } from "@/lib/utils";

export function DashboardTopbar({ user }: { user: SessionUser }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const pageLabel =
    dashboardNav
      .flatMap((group) => group.links)
      .filter((link) => (link.href === "/dashboard" ? pathname === link.href : pathname.startsWith(link.href)))
      .sort((a, b) => b.href.length - a.href.length)[0]?.label ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b bg-background/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className={cn(buttonVariants({ variant: "outline", size: "icon-lg" }), "size-11 lg:hidden")}
            aria-label="Open navigation"
          >
            <Menu aria-hidden className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[18rem] max-w-[85vw] overflow-y-auto border-0 bg-brand-950 p-0 pb-[env(safe-area-inset-bottom)] text-white [&_button]:text-white [&_button:hover]:bg-white/10">
            <SheetHeader className="border-b border-white/10">
              <SheetTitle className="flex items-center gap-2 text-left text-white">
                <BrandLogo height={28} inverted />
                {company.shortName} Portal
              </SheetTitle>
            </SheetHeader>
            <DashboardSidebar role={user.role} onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="min-w-0 leading-tight">
          <p className="hidden text-xs text-muted-foreground sm:block">{company.shortName} Portal</p>
          <p className="truncate font-display text-lg font-semibold tracking-tight">{pageLabel}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-11 gap-2 rounded-full px-2")}
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white uppercase">
            {user.username.slice(0, 2)}
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm leading-tight font-medium">{user.username}</span>
            <span className="block text-xs leading-tight text-muted-foreground capitalize">
              {enumLabel(user.role)}
            </span>
          </span>
          <ChevronDown aria-hidden className="size-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Signed in as <span className="font-medium">{user.username}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/" />}>
              <ExternalLink aria-hidden />
              View public website
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                void logoutDemo();
              }}
            >
              <LogOut aria-hidden />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
