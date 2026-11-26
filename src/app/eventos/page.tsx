import type { Metadata } from "next";
import Encabezado from "@/components/Encabezado";
import ListaEventos from "@/components/ListaEventos";
import { obtenerEventos, obtenerPuntos } from "@/lib/datos";

export const metadata: Metadata = { title: "Eventos · Puntos Críticos Ate" };

export default async function PaginaEventos() {
  const [eventos, puntos] = await Promise.all([obtenerEventos(), obtenerPuntos()]);

  return (
    <div className="space-y-6">
      <Encabezado
        titulo="Eventos registrados"
        descripcion="Cada evento sale de una nota de prensa o de un reporte de una entidad pública. Puedes abrir la fuente para revisarla."
      />
      <ListaEventos eventos={eventos} puntos={puntos} />
    </div>
  );
}
