import type { Metadata } from "next";
import Encabezado from "@/components/Encabezado";
import FormularioReporte from "@/components/FormularioReporte";

export const metadata: Metadata = { title: "Reportar · Puntos Críticos Ate" };

export default function PaginaReportar() {
  return (
    <div className="space-y-6">
      <Encabezado
        titulo="Reportar un aniego"
        descripcion="Si viste una calle inundada, un buzón rebalsando o la activación de una quebrada en Ate, avísanos. El reporte se revisa y, si se confirma, aparece en el mapa."
      />
      <FormularioReporte />
    </div>
  );
}
