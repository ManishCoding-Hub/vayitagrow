import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { company } from "@/lib/config/company";
import { publicNav } from "@/lib/config/navigation";

const linkClass =
  "rounded-sm text-sm text-brand-200 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none";

/** Site footer - all facts and links come from lib/config (single source). */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-brand-950 text-brand-100">
      <div className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <BrandLogo height={40} inverted />
              <p className="font-display text-lg font-semibold text-white">
                {company.shortName} Bioorganics
              </p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-brand-200">
              {company.supportingMessage}
            </p>
          </div>

          <nav aria-label="Footer" className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Company</p>
            <ul className="space-y-3">
              {publicNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
              Where We Operate
            </p>
            <ul className="space-y-3 text-sm text-brand-200">
              {company.operatingStates.map((state) => (
                <li key={state} className="flex items-center gap-2">
                  <MapPin aria-hidden className="size-4 shrink-0 text-brand-400" />
                  {state}
                </li>
              ))}
            </ul>
            <p className="text-xs text-brand-300">Registered office: {company.registeredState}</p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">Contact</p>
            <ul className="space-y-3 text-sm text-brand-200">
              <li className="flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-400" />
                <span>{company.contact.addressLines.join(", ")}</span>
              </li>
              {company.contact.mobiles.map((mobile) => (
                <li key={mobile} className="flex items-center gap-2">
                  <Phone aria-hidden className="size-4 shrink-0 text-brand-400" />
                  <a href={`tel:${mobile.replaceAll(" ", "")}`} className={linkClass}>
                    {mobile}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Mail aria-hidden className="size-4 shrink-0 text-brand-400" />
                <a href={`mailto:${company.contact.email}`} className={`${linkClass} break-all`}>
                  {company.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          aria-hidden
          className="mt-16 flex items-baseline gap-[0.25em] text-[clamp(2.5rem,13vw,11.5rem)] text-white opacity-[0.06] select-none"
        >
          <span className="relative block aspect-square h-[0.8em] shrink-0">
            <Image
              src="/vayitagrow_mark.svg"
              alt=""
              fill
              unoptimized
              className="object-contain brightness-0 invert"
            />
          </span>
          <span className="-mb-[0.18em] font-display leading-none font-semibold tracking-tighter">
            {company.shortName}
          </span>
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6">
          <p className="text-xs text-brand-300">
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-brand-300">{company.contact.hours}</p>
        </div>
      </div>
    </footer>
  );
}
