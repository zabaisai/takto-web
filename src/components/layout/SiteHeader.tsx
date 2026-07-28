import Link from "next/link";
import { cta, nav } from "@/data/landing-content";
import { crmLoginUrl } from "@/lib/site";
import { LogoMark, LogoWordmark } from "./Logo";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-60 border-b border-line bg-bone/[0.82] backdrop-blur-[14px]">
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
                <Link
                  href={`/${item.href}`}
                  className="block px-0.5 py-2 text-[14px] leading-none font-medium text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
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
          </a>
          <Link
            href="/#demo"
            className="hidden min-h-11 items-center rounded-[10px] bg-ink px-[18px] text-[14px] leading-none font-semibold text-bone shadow-[0_1px_0_rgba(229,185,79,.5)_inset,0_6px_18px_rgba(11,14,15,.18)] transition-transform duration-200 hover:-translate-y-px hover:text-white motion-reduce:transition-none sm:inline-flex"
          >
            {cta.primaryShort}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
