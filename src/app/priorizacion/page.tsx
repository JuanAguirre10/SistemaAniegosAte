import type { Metadata } from "next";
import TablaPrioridad from "@/components/TablaPrioridad";
import { obtenerEventos, obtenerPuntos } from "@/lib/datos";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Priorización · Puntos Críticos Ate" };

const reglas = [
  {
    nombre: "Frecuencia",
    texto: "Cuántas veces se repitió un evento en el mismo lugar entre 2023 y 2025.",
    escala: "1 evento = 1, 2 = 2, 3 = 3, 4 = 4, 5 o más = 5",
  },
  {
    nombre: "Severidad",
    texto: "El daño más grave que dejó un evento en ese punto.",
    escala: "Solo calle anegada = 1 · tránsito cortado = 2 · viviendas o negocios afectados = 3 · varias viviendas inundadas o vía principal cerrada = 4 · damnificados o viviendas inhabitables = 5",
  },
  {
    nombre: "Exposición",
    texto: "Qué tanto hay alrededor que puede salir dañado: viviendas, colegios, vías y servicios.",
    escala: "Zona poco poblada = 1 hasta zona muy poblada con vía principal y servicios = 5",
  },
  {
    nombre: "Recencia",
    texto: "Qué tan reciente fue el último evento.",
    escala: "Último evento en 2023 = 1, en 2024 = 3, en 2025 = 5",
  },
];

export default async function PaginaPriorizacion() {
  const [puntos, eventos] = await Promise.all([obtenerPuntos(), obtenerEventos()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Priorización de puntos críticos</h1>
        <p className="text-gris mt-1 max-w-3xl">
          Cada punto recibe una nota del 1 al 5 en cuatro criterios. Con los pesos se calcula un puntaje de 0 a 100:
          desde 70 la prioridad es alta, entre 45 y 69 es media y por debajo de 45 es baja. Puedes mover los pesos para
          ver cómo cambia el orden.
        </p>
      </div>

      <TablaPrioridad puntos={puntos} eventos={eventos} />

      <section className="bg-white border border-borde rounded-xl p-5">
        <h2 className="font-semibold mb-3">Cómo se califica cada criterio</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {reglas.map((r) => (
            <div key={r.nombre} className="rounded-lg bg-fondo p-4 text-sm">
              <p className="font-medium">{r.nombre}</p>
              <p className="text-gris mt-1">{r.texto}</p>
              <p className="mt-2">{r.escala}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gris mt-4">
          Puntaje = (F × peso F + S × peso S + E × peso E + R × peso R) ÷ (5 × suma de pesos) × 100
        </p>
      </section>
    </div>
  );
}
