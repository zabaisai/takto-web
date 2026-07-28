import type { Metadata } from "next";
import {
  LegalHeading,
  LegalLayout,
  LegalList,
  LegalText,
  Pending,
} from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Política de tratamiento de datos personales",
  description:
    "Borrador de la política de tratamiento de datos personales de Tehus CRM, pendiente de revisión jurídica.",
  alternates: { canonical: "/tratamiento-datos" },
  robots: { index: false, follow: true },
};

export default function TratamientoDatosPage() {
  return (
    <LegalLayout
      title="Política de tratamiento de datos personales"
      updated="Borrador · 28 de julio de 2026"
    >
      <LegalHeading>1. Identificación del responsable</LegalHeading>
      <LegalText>
        <Pending>razón social</Pending>, identificada con <Pending>NIT</Pending>, con domicilio en{" "}
        <Pending>dirección legal</Pending>, teléfono <Pending>teléfono de contacto</Pending> y correo
        electrónico <Pending>correo para ejercer derechos</Pending>, actúa como responsable del
        tratamiento de los datos personales recogidos a través de este sitio.
      </LegalText>

      <LegalHeading>2. Ámbito</LegalHeading>
      <LegalText>
        Esta política aplica a los datos personales recogidos mediante el formulario de solicitud de
        demostración de este sitio comercial. El tratamiento de los datos que cada empresa cliente
        gestiona dentro del CRM se rige por el contrato suscrito con esa empresa, en el que Tehus CRM
        actúa como encargado del tratamiento y no como responsable.
      </LegalText>

      <LegalHeading>3. Datos tratados y finalidad</LegalHeading>
      <LegalList
        items={[
          "Nombre, empresa, correo electrónico y teléfono: identificar al solicitante y contactarlo.",
          "Cantidad aproximada de asesores y descripción de la necesidad: preparar una demostración ajustada a su caso.",
        ]}
      />
      <LegalText>
        No se recogen datos sensibles, datos de menores de edad ni datos biométricos. No se realiza
        elaboración de perfiles ni decisiones automatizadas.
      </LegalText>

      <LegalHeading>4. Autorización</LegalHeading>
      <LegalText>
        La autorización se obtiene de forma previa, expresa e informada mediante una casilla de
        aceptación que el titular debe marcar antes de enviar el formulario. La casilla no está
        premarcada y el envío no es posible sin ella. Queda constancia de la fecha y hora de la
        solicitud.
      </LegalText>

      <LegalHeading>5. Derechos del titular</LegalHeading>
      <LegalText>El titular de los datos tiene derecho a:</LegalText>
      <LegalList
        items={[
          "Conocer, actualizar y rectificar sus datos personales.",
          "Solicitar prueba de la autorización otorgada.",
          "Ser informado sobre el uso que se ha dado a sus datos.",
          "Revocar la autorización y solicitar la supresión de los datos.",
          "Acceder de forma gratuita a los datos que hayan sido objeto de tratamiento.",
          "Presentar reclamaciones ante la autoridad de protección de datos competente.",
        ]}
      />

      <LegalHeading>6. Procedimiento para ejercer los derechos</LegalHeading>
      <LegalText>
        Las consultas y reclamos pueden dirigirse a{" "}
        <Pending>correo para ejercer derechos</Pending>, indicando el nombre del titular, la
        descripción de la solicitud y los datos de contacto para la respuesta. Los plazos de
        respuesta serán los previstos en <Pending>normativa aplicable y plazos</Pending>.
      </LegalText>

      <LegalHeading>7. Encargados del tratamiento</LegalHeading>
      <LegalText>
        El destino de las solicitudes de demostración está{" "}
        <Pending>destino aprobado del formulario</Pending>. Cuando se defina, deberá indicarse aquí
        el proveedor utilizado, su ubicación y las garantías contractuales aplicables a cualquier
        transferencia internacional de datos.
      </LegalText>

      <LegalHeading>8. Medidas de seguridad</LegalHeading>
      <LegalText>
        Se aplican medidas razonables para preservar la confidencialidad, integridad y
        disponibilidad de la información: transmisión cifrada mediante HTTPS, validación de los
        datos en el servidor, límites de tamaño y frecuencia de envío, y ausencia de scripts de
        terceros en el sitio.
      </LegalText>

      <LegalHeading>9. Vigencia</LegalHeading>
      <LegalText>
        Esta política rige a partir de <Pending>fecha de entrada en vigor</Pending>. Los datos se
        conservarán durante <Pending>plazo de conservación</Pending>.
      </LegalText>
    </LegalLayout>
  );
}
