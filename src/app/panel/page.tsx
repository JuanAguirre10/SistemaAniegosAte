import type { Metadata } from "next";
import IngresoPanel from "@/components/IngresoPanel";
import { obtenerReportes } from "@/lib/datos";
import { haySesion } from "@/lib/sesion";
import { nombreEstado, nombreTipo, type EstadoReporte } from "@/lib/tipos";
import { cambiarEstado, salir } from "./acciones";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Panel · Puntos Críticos Ate", robots: { index: false } };

const colorEstado: Record<EstadoReporte, string> = {
  pendiente: "bg-amber-50 text-amber-700",
  verificado: "bg-green-50 text-green-700",
  descartado: "bg-gray-100 text-gray-600",
};

export default async function PaginaPanel() {
  if (!(await haySesion())) return <IngresoPanel />;

  const reportes = await obtenerReportes();
  const pendientes = reportes.filter((r) => r.estado === "pendiente").length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Reportes de vecinos</h1>
          <p className="text-gris mt-1">
            {reportes.length} reportes en total, {pendientes} por revisar. Los verificados se muestran en el mapa.
          </p>
        </div>
        <form action={salir}>
          <button className="text-sm text-marca hover:underline">Cerrar sesión</button>
        </form>
      </div>

      {reportes.length === 0 && (
        <p className="bg-white border border-borde rounded-xl p-6 text-gris text-sm">Todavía no hay reportes.</p>
      )}

      <div className="space-y-3">
        {reportes.map((r) => (
          <article key={r.id} className="bg-white border border-borde rounded-xl p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-1 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">#{r.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${colorEstado[r.estado]}`}>
                  {nombreEstado[r.estado]}
                </span>
                <span className="text-gris">{r.creado}</span>
              </div>
              <p>
                {nombreTipo[r.tipo]} · {r.zona} · {r.referencia}
              </p>
              <p className="text-gris">{r.descripcion}</p>
              <p className="text-xs text-gris">
                {r.nombre ? `Enviado por ${r.nombre} · ` : ""}
                <a
                  href={`https://www.openstreetmap.org/?mlat=${r.lat}&mlon=${r.lon}#map=18/${r.lat}/${r.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-marca hover:underline"
                >
                  Ver ubicación
                </a>
              </p>
            </div>
            <div className="flex md:flex-col gap-2">
              {(["verificado", "descartado", "pendiente"] as EstadoReporte[])
                .filter((e) => e !== r.estado)
                .map((e) => (
                  <form key={e} action={cambiarEstado}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="estado" value={e} />
                    <button className="w-full text-sm border border-borde rounded-lg px-3 py-1.5 hover:bg-fondo">
                      {e === "verificado" ? "Verificar" : e === "descartado" ? "Descartar" : "Volver a pendiente"}
                    </button>
                  </form>
                ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
