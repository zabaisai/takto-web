import type { Metadata } from "next";
import {
  LegalHeading,
  LegalLayout,
  LegalList,
  LegalText,
  Pending,
} from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Borrador de la política de privacidad de TAKTO, pendiente de revisión jurídica.",
  alternates: { canonical: "/privacidad" },
  robots: { index: false, follow: true },
};

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Política de privacidad" updated="Borrador · 28 de julio de 2026">
      <LegalHeading>1. Responsable del tratamiento</LegalHeading>
      <LegalText>
        El responsable del tratamiento de los datos personales recogidos a través de este sitio es{" "}
        <Pending>razón social</Pending>, identificada con <Pending>NIT</Pending>, con domicilio en{" "}
        <Pending>dirección legal</Pending> y correo de contacto{" "}
        <Pending>correo de privacidad</Pending>.
      </LegalText>

      <LegalHeading>2. Datos que recogemos</LegalHeading>
      <LegalText>
        Este sitio es una página comercial informativa. Solo se recogen los datos que el visitante
        introduce voluntariamente en el formulario de solicitud de demostración:
      </LegalText>
      <LegalList
        items={[
          "Nombre de la persona que realiza la solicitud.",
          "Nombre de la empresa.",
          "Correo electrónico de contacto.",
          "Número de teléfono de contacto.",
          "Cantidad aproximada de asesores del equipo comercial.",
          "Descripción libre de la principal necesidad.",
        ]}
      />
      <LegalText>
        El sitio no utiliza cookies de analítica, publicidad ni seguimiento, y no incorpora scripts
        de terceros.
      </LegalText>

      <LegalHeading>3. Finalidad</LegalHeading>
      <LegalText>
        Los datos se utilizan exclusivamente para responder la solicitud, agendar la demostración y
        mantener la comunicación comercial relacionada con esa solicitud. No se emplean para
        finalidades distintas ni se ceden a terceros con fines comerciales.
      </LegalText>

      <LegalHeading>4. Base de legitimación</LegalHeading>
      <LegalText>
        El tratamiento se basa en la autorización previa, expresa e informada que el titular otorga
        al marcar la casilla de aceptación del formulario.
      </LegalText>

      <LegalHeading>5. Conservación</LegalHeading>
      <LegalText>
        Los datos se conservarán durante <Pending>plazo de conservación</Pending> o hasta que el
        titular solicite su supresión.
      </LegalText>

      <LegalHeading>6. Encargados y transferencias</LegalHeading>
      <LegalText>
        El destino final de las solicitudes de demostración está{" "}
        <Pending>destino aprobado del formulario</Pending>. Si se utiliza un proveedor externo para
        recibir o almacenar estos datos, deberá identificarse aquí junto con su ubicación y las
        garantías aplicables antes de la publicación definitiva de este documento.
      </LegalText>

      <LegalHeading>7. Derechos del titular</LegalHeading>
      <LegalText>
        El titular puede conocer, actualizar, rectificar y suprimir sus datos, así como revocar la
        autorización otorgada, escribiendo a <Pending>correo de privacidad</Pending>.
      </LegalText>

      <LegalHeading>8. Seguridad</LegalHeading>
      <LegalText>
        Se aplican medidas técnicas y organizativas razonables para proteger la información: cifrado
        en tránsito mediante HTTPS, validación de los datos recibidos y limitación de la cantidad de
        envíos por origen.
      </LegalText>

      <LegalHeading>9. Cambios</LegalHeading>
      <LegalText>
        Cualquier cambio en esta política se publicará en esta misma página indicando su fecha de
        actualización.
      </LegalText>
    </LegalLayout>
  );
}
