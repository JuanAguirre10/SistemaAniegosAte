"use client";

import { useMemo, useState } from "react";
import Icono from "./Icono";
import Insignia from "./Insignia";
import { colorNivel, evaluar, pesosBase, type Pesos } from "@/lib/prioridad";
import { nombreTipo, type Evento, type Punto } from "@/lib/tipos";

const criterios: { clave: keyof Pesos; nombre: string }[] = [
  { clave: "frecuencia", nombre: "Frecuencia" },
  { clave: "severidad", nombre: "Severidad" },
  { clave: "exposicion", nombre: "Exposición" },
  { clave: "recencia", nombre: "Recencia" },
];

const tonoNota = [
  "bg-sky-50 text-sky-900",
  "bg-sky-100 text-sky-900",
  "bg-sky-200 text-sky-950",
  "bg-sky-700 text-white",
  "bg-sky-900 text-white",
];

export default function TablaPrioridad({ puntos, eventos }: { puntos: Punto[]; eventos: Evento[] }) {
  const [pesos, setPesos] = useState<Pesos>(pesosBase);
  const total = pesos.frecuencia + pesos.severidad + pesos.exposicion + pesos.recencia;
  const lista = useMemo(() => evaluar(puntos, eventos, pesos), [puntos, eventos, pesos]);

  return (
    <div className="space-y-4">
      <div className="tarjeta p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="font-bold">Pesos de los criterios</h2>
          <button type="button" onClick={() => setPesos(pesosBase)} className="boton boton-secundario py-2!">
            <Icono nombre="reiniciar" className="w-4 h-4" />
            Pesos iniciales
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {criterios.map((c) => (
            <label key={c.clave} className="block rounded-xl bg-fondo p-4">
              <span className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-medium text-gris">{c.nombre}</span>
                <span className="text-xl font-extrabold">{total ? Math.round((pesos[c.clave] / total) * 100) : 0}%</span>
              </span>
              <input
                type="range"
                min={0}
                max={50}
                value={pesos[c.clave]}
                onChange={(e) => setPesos({ ...pesos, [c.clave]: Number(e.target.value) })}
                className="w-full accent-marca cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="tarjeta overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-borde bg-fondo/70 text-gris text-left">
            <tr>
              <th className="px-4 py-3.5 font-semibold">N.°</th>
              <th className="px-4 py-3.5 font-semibold">Punto crítico</th>
              <th className="px-4 py-3.5 font-semibold">Peligro</th>
              <th className="px-3 py-3.5 font-semibold text-center">Eventos</th>
              {criterios.map((c) => (
                <th key={c.clave} className="px-2 py-3.5 font-semibold text-center" title={c.nombre}>
                  {c.nombre.slice(0, 3)}.
                </th>
              ))}
              <th className="px-4 py-3.5 font-semibold">Puntaje</th>
              <th className="px-4 py-3.5 font-semibold">Prioridad</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((p, i) => (
              <tr key={p.id} className="border-t border-borde first:border-t-0 hover:bg-fondo/60">
                <td className="px-4 py-3 font-semibold text-gris">{i + 1}</td>
                <td className="px-4 py-3 min-w-56">
                  <p className="font-semibold leading-snug">{p.nombre}</p>
                  <p className="text-xs text-gris mt-0.5">{p.zona}</p>
                </td>
                <td className="px-4 py-3 text-gris">{nombreTipo[p.tipo]}</td>
                <td className="px-3 py-3 text-center">{p.eventos}</td>
                {criterios.map((c) => (
                  <td key={c.clave} className="px-2 py-3 text-center">
                    <span
                      className={`inline-grid w-8 h-8 place-items-center rounded-lg font-semibold ${tonoNota[p.notas[c.clave] - 1]}`}
                    >
                      {p.notas[c.clave]}
                    </span>
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 font-extrabold">{p.puntaje}</span>
                    <span className="block w-14 h-1.5 bg-fondo rounded-r">
                      <span
                        className="block h-full rounded-r"
                        style={{ width: `${p.puntaje}%`, background: colorNivel[p.nivel] }}
                      />
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Insignia nivel={p.nivel} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
