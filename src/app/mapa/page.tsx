import type { Metadata } from "next";
import Encabezado from "@/components/Encabezado";
import VistaMapa from "@/components/VistaMapa";
import { obtenerEventos, obtenerPuntos, obtenerReportes } from "@/lib/datos";

export const metadata: Metadata = { title: "Mapa · Puntos Críticos Ate" };

export default async function PaginaMapa() {
  const [puntos, eventos, reportes] = await Promise.all([
    obtenerPuntos(),
    obtenerEventos(),
    obtenerReportes("verificado"),
  ]);

  return (
    <div className="space-y-6">
      <Encabezado
        titulo="Mapa de puntos críticos"
        descripcion="Lugares de Ate con aniegos, inundaciones por lluvia o huaicos entre 2023 y 2025. Elige un punto en la lista o en el mapa para ver el detalle."
      />
      <VistaMapa puntos={puntos} eventos={eventos} reportes={reportes} />
    </div>
  );
}
