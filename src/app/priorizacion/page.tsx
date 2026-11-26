import type { Metadata } from "next";
import Encabezado from "@/components/Encabezado";
import Insignia from "@/components/Insignia";
import TablaPrioridad from "@/components/TablaPrioridad";
import { obtenerEventos, obtenerPuntos } from "@/lib/datos";
import { pesosBase } from "@/lib/prioridad";

export const metadata: Metadata = { title: "Priorización · Puntos Críticos Ate" };

const reglas = [
  {
    nombre: "Frecuencia",
    peso: pesosBase.frecuencia,
    texto: "Cuántas veces se repitió un evento en el mismo lugar entre 2023 y 2025.",
    escala: "1 evento = 1, 2 = 2, 3 = 3, 4 = 4, 5 o más = 5",
  },
  {
    nombre: "Severidad",
    peso: pesosBase.severidad,
    texto: "El daño más grave que dejó un evento en ese punto.",
    escala: "Solo calle anegada = 1 · tránsito cortado = 2 · viviendas o negocios afectados = 3 · varias viviendas inundadas o vía principal cerrada = 4 · damnificados o viviendas inhabitables = 5",
  },
  {
    nombre: "Exposición",
    peso: pesosBase.exposicion,
    texto: "Qué tanto hay alrededor que puede salir dañado: viviendas, colegios, vías y servicios.",
    escala: "Zona poco poblada = 1 hasta zona muy poblada con vía principal y servicios = 5",
  },
  {
    nombre: "Recencia",
    peso: pesosBase.recencia,
    texto: "Qué tan reciente fue el último evento.",
    escala: "Último evento en 2023 = 1, en 2024 = 3, en 2025 = 5",
  },
];

export default async function PaginaPriorizacion() {
  const [puntos, eventos] = await Promise.all([obtenerPuntos(), obtenerEventos()]);

  return (
    <div className="space-y-6">
      <Encabezado
        titulo="Priorización de puntos críticos"
        descripcion="Cada punto recibe una nota del 1 al 5 en cuatro criterios y con los pesos se calcula un puntaje de 0 a 100. Mueve los pesos para ver cómo cambia el orden."
      >
        <div className="flex flex-wrap gap-2">
          <Insignia nivel="Alta" texto="Alta: 55 o más" />
          <Insignia nivel="Media" texto="Media: 45 a 54" />
          <Insignia nivel="Baja" texto="Baja: menos de 45" />
        </div>
      </Encabezado>

      <TablaPrioridad puntos={puntos} eventos={eventos} />

      <section className="tarjeta p-6">
        <h2 className="font-bold mb-4">Cómo se califica cada criterio</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {reglas.map((r) => (
            <div key={r.nombre} className="rounded-xl border border-borde p-5 text-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold">{r.nombre}</p>
                <span className="rounded-lg bg-marca-suave px-2.5 py-1 text-xs font-bold text-marca-oscura">
                  {r.peso} %
                </span>
              </div>
              <p className="text-gris mt-2 leading-relaxed">{r.texto}</p>
              <p className="mt-3 border-t border-borde pt-3 leading-relaxed">{r.escala}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gris mt-4 rounded-xl bg-fondo px-4 py-3">
          Puntaje = (F × peso F + S × peso S + E × peso E + R × peso R) ÷ (5 × suma de pesos) × 100
        </p>
      </section>
    </div>
  );
}
