import type { Metadata } from "next";
import FormularioReporte from "@/components/FormularioReporte";

export const metadata: Metadata = { title: "Reportar · Puntos Críticos Ate" };

export default function PaginaReportar() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Reportar un aniego</h1>
        <p className="text-gris mt-1 max-w-3xl">
          Si viste una calle inundada, un buzón rebalsando o la activación de una quebrada en Ate, avísanos. El reporte
          se revisa y, si se confirma, aparece en el mapa.
        </p>
      </div>
      <FormularioReporte />
    </div>
  );
}
