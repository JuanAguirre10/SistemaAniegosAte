import type { Metadata } from "next";
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
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Mapa de puntos críticos</h1>
        <p className="text-gris mt-1">
          Lugares de Ate donde se registraron aniegos, inundaciones por lluvia o huaicos entre 2023 y 2025. Haz clic en un
          círculo para ver el detalle.
        </p>
      </div>
      <VistaMapa puntos={puntos} eventos={eventos} reportes={reportes} />
    </div>
  );
}
