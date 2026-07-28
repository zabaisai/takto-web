import type { Metadata } from "next";
import { Hero } from "@/components/landing/Hero";
import { ValueStrip } from "@/components/landing/ValueStrip";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { WhatsappSection } from "@/components/landing/WhatsappSection";
import { ConversationsSection } from "@/components/landing/ConversationsSection";
import { ContactsSection } from "@/components/landing/ContactsSection";
import { PipelineSection } from "@/components/landing/PipelineSection";
import { TasksSection } from "@/components/landing/TasksSection";
import { QuotesSection } from "@/components/landing/QuotesSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { NotificationsSection } from "@/components/landing/NotificationsSection";
import { CompaniesSection } from "@/components/landing/CompaniesSection";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { faq } from "@/data/landing-content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <ProblemSection />
      <FeaturesSection />
      <WhatsappSection />
      <ConversationsSection />
      <ContactsSection />
      <PipelineSection />
      <TasksSection />
      <QuotesSection />
      <TeamSection />
      <NotificationsSection />
      <CompaniesSection />
      <SecuritySection />
      <ProcessSection />
      <DemoSection />
      <FaqSection />
      <FinalCta />
      <script
        type="application/ld+json"
        // Contenido estático definido en `landing-content.ts`: sin entrada de usuario.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
