import type { Metadata } from "next";
import ListaEventos from "@/components/ListaEventos";
import { obtenerEventos, obtenerPuntos } from "@/lib/datos";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Eventos · Puntos Críticos Ate" };

export default async function PaginaEventos() {
  const [eventos, puntos] = await Promise.all([obtenerEventos(), obtenerPuntos()]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Eventos registrados</h1>
        <p className="text-gris mt-1 max-w-3xl">
          Cada evento sale de una nota de prensa o de un reporte de una entidad pública. Puedes abrir la fuente para
          revisarla.
        </p>
      </div>
      <ListaEventos eventos={eventos} puntos={puntos} />
    </div>
  );
}
