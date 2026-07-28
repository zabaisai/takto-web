import type { Metadata } from "next";
import {
  LegalHeading,
  LegalLayout,
  LegalList,
  LegalText,
  Pending,
} from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Borrador de los términos y condiciones de uso del sitio comercial de Tehus CRM, pendiente de revisión jurídica.",
  alternates: { canonical: "/terminos" },
  robots: { index: false, follow: true },
};

export default function TerminosPage() {
  return (
    <LegalLayout title="Términos y condiciones" updated="Borrador · 28 de julio de 2026">
      <LegalHeading>1. Objeto</LegalHeading>
      <LegalText>
        Estos términos regulan el acceso y uso del sitio web comercial de Tehus CRM. El sitio tiene
        carácter informativo: presenta las funcionalidades del producto y permite solicitar una
        demostración. No constituye el acceso al CRM, que se realiza desde una plataforma
        independiente y requiere credenciales otorgadas por la empresa contratante.
      </LegalText>

      <LegalHeading>2. Titular</LegalHeading>
      <LegalText>
        El sitio es operado por <Pending>razón social</Pending>, identificada con{" "}
        <Pending>NIT</Pending>, con domicilio en <Pending>dirección legal</Pending> y representada
        legalmente por <Pending>representante legal</Pending>.
      </LegalText>

      <LegalHeading>3. Uso del sitio</LegalHeading>
      <LegalText>Al utilizar este sitio el visitante se compromete a:</LegalText>
      <LegalList
        items={[
          "Proporcionar información veraz en el formulario de solicitud de demostración.",
          "No emplear medios automatizados para el envío masivo de solicitudes.",
          "No intentar acceder a áreas o sistemas no destinados al público.",
          "No utilizar el contenido del sitio con fines distintos a los informativos.",
        ]}
      />

      <LegalHeading>4. Alcance de la información publicada</LegalHeading>
      <LegalText>
        Las descripciones de funcionalidades y las interfaces mostradas son ilustrativas y
        corresponden a datos de ejemplo. La disponibilidad concreta de cada función para una empresa
        depende de su configuración, de su plan y, en el caso de la integración con WhatsApp, de la
        elegibilidad y aprobación de la cuenta ante Meta Platforms, Inc. La información publicada no
        constituye una oferta contractual vinculante.
      </LegalText>

      <LegalHeading>5. Propiedad intelectual</LegalHeading>
      <LegalText>
        Los contenidos, la marca Tehus CRM, los textos y los elementos gráficos de este sitio son
        propiedad de <Pending>razón social</Pending> o se utilizan bajo licencia. WhatsApp es una
        marca de Meta Platforms, Inc.; Tehus CRM no está afiliado a Meta ni cuenta con su patrocinio.
      </LegalText>

      <LegalHeading>6. Enlaces a otros sistemas</LegalHeading>
      <LegalText>
        El enlace «Iniciar sesión» dirige a la plataforma del CRM, que se rige por sus propias
        condiciones de uso y por el contrato suscrito con cada empresa cliente.
      </LegalText>

      <LegalHeading>7. Limitación de responsabilidad</LegalHeading>
      <LegalText>
        El sitio se ofrece «tal cual». Se procura mantener la información actualizada y el servicio
        disponible, sin que ello constituya una garantía de disponibilidad ininterrumpida ni de
        ausencia de errores.
      </LegalText>

      <LegalHeading>8. Modificaciones</LegalHeading>
      <LegalText>
        Estos términos pueden actualizarse. La versión vigente será siempre la publicada en esta
        página, con su fecha de actualización.
      </LegalText>

      <LegalHeading>9. Ley aplicable</LegalHeading>
      <LegalText>
        Estos términos se rigen por la legislación de <Pending>jurisdicción aplicable</Pending>.
      </LegalText>
    </LegalLayout>
  );
}
