import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { company } from "@/lib/config/company";
import type { SessionUser } from "@/lib/types/user";

/**
 * Dashboard chrome: fixed dark sidebar on desktop, drawer on narrow screens
 * (in the topbar). The shell spans the viewport; only the page content is
 * width-capped.
 */
export function DashboardShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh w-full">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col overflow-y-auto bg-brand-950 text-white lg:flex">
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-6">
          <BrandLogo height={30} inverted />
          <div className="leading-tight">
            <p className="font-display text-base font-semibold">{company.shortName}</p>
            <p className="text-[0.65rem] font-medium tracking-[0.18em] text-brand-300 uppercase">
              Management Portal
            </p>
          </div>
        </div>
        <DashboardSidebar role={user.role} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar user={user} />
        <main
          id="main-content"
          className="flex-1 bg-muted/40 px-4 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-6 lg:px-8 lg:pt-8"
        >
          <div className="mx-auto w-full max-w-[1280px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
