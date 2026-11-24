"use client";

import { useMemo, useState } from "react";
import { colorNivel, evaluar, pesosBase, type Pesos } from "@/lib/prioridad";
import { nombreTipo, type Evento, type Punto } from "@/lib/tipos";

const criterios: { clave: keyof Pesos; nombre: string }[] = [
  { clave: "frecuencia", nombre: "Frecuencia" },
  { clave: "severidad", nombre: "Severidad" },
  { clave: "exposicion", nombre: "Exposición" },
  { clave: "recencia", nombre: "Recencia" },
];

export default function TablaPrioridad({ puntos, eventos }: { puntos: Punto[]; eventos: Evento[] }) {
  const [pesos, setPesos] = useState<Pesos>(pesosBase);
  const total = pesos.frecuencia + pesos.severidad + pesos.exposicion + pesos.recencia;
  const lista = useMemo(() => evaluar(puntos, eventos, pesos), [puntos, eventos, pesos]);

  return (
    <div className="space-y-5">
      <div className="bg-white border border-borde rounded-xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h2 className="font-semibold">Pesos de los criterios</h2>
          <button
            type="button"
            onClick={() => setPesos(pesosBase)}
            className="text-sm text-marca hover:underline"
          >
            Volver a los pesos iniciales
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {criterios.map((c) => (
            <label key={c.clave} className="text-sm">
              <span className="flex justify-between mb-1">
                <span>{c.nombre}</span>
                <span className="text-gris">{total ? Math.round((pesos[c.clave] / total) * 100) : 0}%</span>
              </span>
              <input
                type="range"
                min={0}
                max={50}
                value={pesos[c.clave]}
                onChange={(e) => setPesos({ ...pesos, [c.clave]: Number(e.target.value) })}
                className="w-full accent-marca"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white border border-borde rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-fondo text-gris text-left">
            <tr>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Punto crítico</th>
              <th className="px-4 py-3 font-medium">Peligro</th>
              <th className="px-3 py-3 font-medium text-center">Eventos</th>
              {criterios.map((c) => (
                <th key={c.clave} className="px-3 py-3 font-medium text-center">
                  {c.nombre.slice(0, 3)}.
                </th>
              ))}
              <th className="px-4 py-3 font-medium text-center">Puntaje</th>
              <th className="px-4 py-3 font-medium">Prioridad</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((p, i) => (
              <tr key={p.id} className="border-t border-borde">
                <td className="px-4 py-3 text-gris">{i + 1}</td>
                <td className="px-4 py-3">
                  <p className="font-medium">{p.nombre}</p>
                  <p className="text-xs text-gris">{p.zona}</p>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{nombreTipo[p.tipo]}</td>
                <td className="px-3 py-3 text-center">{p.eventos}</td>
                {criterios.map((c) => (
                  <td key={c.clave} className="px-3 py-3 text-center">
                    {p.notas[c.clave]}
                  </td>
                ))}
                <td className="px-4 py-3 text-center font-semibold">{p.puntaje}</td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ background: colorNivel[p.nivel] }}
                  >
                    {p.nivel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
