import Link from "next/link";
import { cta, footer } from "@/data/landing-content";
import { crmLoginUrl } from "@/lib/site";
import { LogoMark } from "./Logo";

const linkClass =
  "text-[13.5px] leading-none text-bone/[0.78] transition-colors hover:text-brand-gold";

export function SiteFooter() {
  return (
    <footer
      id="contacto"
      className="on-dark bg-ink-deep px-[clamp(18px,4vw,44px)] pt-[clamp(44px,5vw,72px)] pb-[30px] text-bone"
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-[clamp(24px,3vw,44px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
        <div className="min-w-[200px]">
          <span className="flex items-center gap-[10px]">
            <LogoMark size={30} />
            <b className="font-display text-[16px] leading-none font-semibold">
              Tehus<span className="text-brand"> CRM</span>
            </b>
          </span>
          <p className="mt-[14px] max-w-[30ch] text-[13.5px] leading-[1.6] text-bone/55">
            {footer.tagline}
          </p>
          <p className="mt-3 text-[12.5px] leading-[1.6] text-bone/[0.38]">
            {footer.contactPending}
            <br />
            {footer.whatsappPending}
          </p>
        </div>

        {footer.columns.map((column) => (
          <div key={column.title}>
            <h2 className="font-sans text-[11px] leading-none font-semibold tracking-[0.1em] text-bone/45 uppercase">
              {column.title}
            </h2>
            <ul className="mt-[14px] grid gap-[10px]">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="font-sans text-[11px] leading-none font-semibold tracking-[0.1em] text-bone/45 uppercase">
            Acceso
          </h2>
          <ul className="mt-[14px] grid gap-[10px]">
            <li>
              <a href={crmLoginUrl} rel="noopener noreferrer" className={linkClass}>
                {cta.login}
              </a>
            </li>
            <li>
              <Link href="/#demo" className={linkClass}>
                Solicitar acceso
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-[clamp(30px,3.5vw,48px)] flex w-full max-w-[1240px] flex-wrap justify-between gap-3 border-t border-bone/10 pt-5">
        <span className="text-[12px] leading-[1.5] text-bone/[0.38]">{footer.copyright}</span>
        <span className="text-[12px] leading-[1.5] text-bone/[0.38]">{footer.trademark}</span>
      </div>
    </footer>
  );
}
