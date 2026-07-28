import Link from "next/link";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { cta, nav } from "@/data/landing-content";
import { crmLoginUrl } from "@/lib/site";
import { HeaderShell } from "./HeaderShell";
import { LogoMark, LogoWordmark } from "./Logo";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="mx-auto flex w-full max-w-[1280px] items-center gap-[clamp(16px,3vw,40px)] px-[clamp(18px,4vw,44px)] py-[14px]">
        <Link href="/" className="flex flex-none items-center gap-[10px] text-ink">
          <LogoMark />
          <LogoWordmark />
          <span className="sr-only">— inicio</span>
        </Link>

        <nav aria-label="Navegación principal" className="ml-auto hidden lg:block">
          <ul className="flex flex-wrap items-center gap-[clamp(10px,1.6vw,24px)]">
            {nav.map((item) => (
              <li key={item.href}>
                <AnchorLink
                  href={`/${item.href}`}
                  className="group relative block px-0.5 py-2 text-[14px] leading-none font-medium text-muted transition-colors duration-200 hover:text-ink motion-reduce:transition-none"
                >
                  {item.label}
                  {/* Subrayado que crece desde el centro al pasar el cursor */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-px origin-center scale-x-0 bg-brand transition-transform duration-200 group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <a
            href={crmLoginUrl}
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center px-1 text-[14px] leading-none font-medium text-ink sm:inline-flex"
          >
            {cta.login}
            <span className="sr-only"> al CRM (se abre en el mismo sitio del CRM de pruebas)</span>
          </a>
          <AnchorLink
            href="/#demo"
            className="hidden min-h-11 items-center rounded-[10px] bg-ink px-[18px] text-[14px] leading-none font-semibold text-bone shadow-[0_1px_0_rgba(229,185,79,.5)_inset,0_6px_18px_rgba(11,14,15,.18)] transition-transform duration-200 hover:-translate-y-px hover:text-white motion-reduce:transition-none sm:inline-flex"
          >
            {cta.primaryShort}
          </AnchorLink>
          <MobileNav />
        </div>
      </div>
    </HeaderShell>
  );
}
