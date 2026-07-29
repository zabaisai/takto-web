import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalHeading,
  LegalLayout,
  LegalList,
  LegalText,
} from "@/components/legal/LegalLayout";

const CONTACT_EMAIL = "info@tehusrattan.com";
const CONTACT_SUBJECT = "Solicitud de eliminación de datos TAKTO";
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(CONTACT_SUBJECT)}`;

const DESCRIPTION =
  "Cómo solicitar la eliminación de los datos personales y de integración asociados a una cuenta o empresa en TAKTO.";

export const metadata: Metadata = {
  title: "Eliminación de datos",
  description: DESCRIPTION,
  alternates: { canonical: "/eliminacion-datos" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Eliminación de datos · TAKTO",
    description: DESCRIPTION,
    url: "/eliminacion-datos",
    type: "article",
  },
};

const legalLinkClass = "text-brand underline underline-offset-2 hover:text-ink";

export default function EliminacionDatosPage() {
  return (
    <LegalLayout
      title="Eliminación de datos"
      updated="Borrador · versión beta · 29 de julio de 2026"
      hasPendingFields={false}
    >
      <LegalText>
        TAKTO permite solicitar la eliminación de los datos personales y de integración asociados a
        una cuenta o empresa. TAKTO es la marca del producto CRM operado por Tehus Rattan.
      </LegalText>

      <LegalHeading>A. Usuario del CRM</LegalHeading>
      <LegalText>Como usuario del CRM puedes solicitar:</LegalText>
      <LegalList
        items={[
          "La eliminación de tus datos personales.",
          "El cierre de tu cuenta.",
          "La revocación de tus sesiones activas.",
          "La eliminación de tus tokens de recuperación.",
          "La desvinculación de las integraciones que hayas autorizado.",
          "La eliminación de los datos sujetos a la solicitud, cuando legalmente proceda.",
        ]}
      />

      <LegalHeading>B. Integración con Meta y WhatsApp</LegalHeading>
      <LegalText>El administrador de una empresa puede solicitar:</LegalText>
      <LegalList
        items={[
          "La desconexión de su cuenta de WhatsApp Business.",
          "La revocación de la autorización concedida a TAKTO.",
          "La eliminación de las credenciales cifradas almacenadas por la integración.",
          "La eliminación de los identificadores asociados a la cuenta de WhatsApp Business (WABA) y al número telefónico.",
          "La eliminación de los mensajes y metadatos almacenados por TAKTO, cuando proceda.",
          "Instrucciones para retirar los permisos directamente desde Meta.",
        ]}
      />

      <LegalHeading>Cómo solicitar la eliminación</LegalHeading>
      <LegalText>
        Envía tu solicitud por correo a{" "}
        <a href={MAILTO} className={legalLinkClass}>
          {CONTACT_EMAIL}
        </a>{" "}
        con el asunto «Solicitud de eliminación de datos TAKTO» e incluye:
      </LegalText>
      <LegalList
        items={[
          "Tu nombre.",
          "El correo de la cuenta.",
          "La empresa correspondiente.",
          "Tu relación con la empresa.",
          "El alcance que solicitas eliminar.",
          "Información suficiente para verificar tu identidad.",
        ]}
      />
      <LegalText>
        TAKTO confirmará la recepción de la solicitud y podrá solicitar una verificación de
        identidad antes de ejecutar una eliminación irreversible. La solicitud se atenderá dentro de
        los plazos legales aplicables y se te informará del resultado.
      </LegalText>

      <LegalHeading>Qué no debes enviar</LegalHeading>
      <LegalText>Por tu seguridad, no incluyas nunca en la solicitud:</LegalText>
      <LegalList
        items={[
          "Tu contraseña.",
          "Tokens de acceso.",
          "El App Secret de la aplicación.",
          "Códigos de un solo uso (OTP).",
          "Información financiera que no sea necesaria.",
        ]}
      />

      <LegalHeading>Consideraciones importantes</LegalHeading>
      <LegalList
        items={[
          "Algunos datos pueden conservarse cuando exista una obligación legal, o por motivos de seguridad, prevención del fraude o defensa de reclamaciones.",
          "La desconexión de WhatsApp no elimina necesariamente la información que Meta conserva bajo sus propias políticas.",
          "También puedes retirar los permisos concedidos a TAKTO directamente desde la configuración de tu cuenta de Meta o Facebook.",
        ]}
      />

      <LegalHeading>Documentos relacionados</LegalHeading>
      <LegalList
        items={[
          <Link key="privacidad" href="/privacidad" className={legalLinkClass}>
            Política de privacidad
          </Link>,
          <Link key="terminos" href="/terminos" className={legalLinkClass}>
            Términos y condiciones
          </Link>,
          <Link key="tratamiento" href="/tratamiento-datos" className={legalLinkClass}>
            Política de tratamiento de datos
          </Link>,
          <Link key="inicio" href="/" className={legalLinkClass}>
            Página de inicio
          </Link>,
        ]}
      />
    </LegalLayout>
  );
}
