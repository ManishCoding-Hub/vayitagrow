"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Magnetic } from "@/components/shared/motion/Magnetic";
import { company } from "@/lib/config/company";
import { publicNav } from "@/lib/config/navigation";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function Wordmark({ onDark }: { onDark: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <BrandLogo height={38} inverted={onDark} className="-my-1 transition-[filter] duration-300" />
      <span
        className={cn(
          "font-display text-lg leading-none font-semibold tracking-tight transition-colors duration-300",
          onDark ? "text-white" : "text-foreground",
        )}
      >
        {company.shortName}
        <span
          className={cn(
            "block font-sans text-[0.65rem] font-medium tracking-[0.18em] uppercase transition-colors duration-300",
            onDark ? "text-brand-200" : "text-muted-foreground",
          )}
        >
          Bioorganics
        </span>
      </span>
    </Link>
  );
}

/**
 * Public header: transparent over each page's dark hero, solid once scrolled,
 * tucks away on scroll-down and returns on scroll-up. Full-screen mobile menu.
 */
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > 240 && latest > previous);
  });

  // Close the menu on navigation (state reset during render, per React docs).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const toggle = toggleRef.current;
    const overlay = overlayRef.current;
    document.documentElement.style.overflow = "hidden";
    overlay?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key !== "Tab" || !overlay) return;
      const focusable = [
        ...overlay.querySelectorAll<HTMLElement>("a[href], button"),
        ...(toggle ? [toggle] : []),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const onDark = !scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-[transform,background-color,box-shadow,backdrop-filter] duration-500 ease-out",
          hidden && !menuOpen && "-translate-y-full",
          scrolled && !menuOpen
            ? "bg-background/85 shadow-[0_1px_0_0_var(--border)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Wordmark onDark={onDark} />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {publicNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "group relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-300",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  onDark ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground",
                  isActive(link.href) && (onDark ? "text-white" : "text-foreground"),
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3.5 bottom-1 h-px origin-left bg-gold-500 transition-transform duration-500 ease-out",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden lg:inline-block">
              <Link
                href="/login"
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors duration-300",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
                  onDark
                    ? "bg-white text-brand-900 hover:bg-gold-100"
                    : "bg-primary text-primary-foreground hover:bg-brand-700",
                )}
              >
                <LogIn aria-hidden className="size-4" />
                Portal Login
              </Link>
            </Magnetic>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                onDark ? "border-white/30 text-white" : "border-border text-foreground",
              )}
            >
              {menuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.25rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.25rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.25rem)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-brand-950 px-6 pt-28 pb-10 text-white lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1">
              {publicNav.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + index * 0.06, duration: 0.6, ease: EASE } }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-md py-2 font-display text-5xl tracking-tight focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none",
                      isActive(link.href) ? "text-gold-300" : "text-white/90",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link
              href="/login"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-medium text-brand-900 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
            >
              <LogIn aria-hidden className="size-4" />
              Portal Login
            </Link>
            <p className="mt-6 text-sm text-brand-200">{company.contact.mobiles.join(" · ")}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
