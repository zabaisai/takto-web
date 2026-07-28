import type { Metadata, Viewport } from "next";
import { Sora, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { allowIndexing, brand, site, siteUrl } from "@/lib/site";
import "@/styles/globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0B0E0F",
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  alternateName: `${site.name} — ${brand.concept}`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: siteUrl,
  inLanguage: site.lang,
  description: site.description,
  slogan: brand.claim,
  audience: {
    "@type": "Audience",
    audienceType: "Equipos comerciales",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${sora.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-bone"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // El objeto es estático y está definido en este archivo: no hay entrada de usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
