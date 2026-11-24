"use client";

import { useMemo, useState } from "react";
import Mapa from "./Mapa";
import { colorNivel, evaluar, type Nivel } from "@/lib/prioridad";
import { nombreTipo, tipos, type Evento, type Punto, type Reporte, type TipoPeligro } from "@/lib/tipos";

type Props = { puntos: Punto[]; eventos: Evento[]; reportes: Reporte[] };

const selectClase = "border border-borde rounded-lg px-3 py-2 text-sm bg-white";

export default function VistaMapa({ puntos, eventos, reportes }: Props) {
  const [anio, setAnio] = useState("todos");
  const [tipo, setTipo] = useState<"todos" | TipoPeligro>("todos");
  const [nivel, setNivel] = useState<"todos" | Nivel>("todos");
  const [verReportes, setVerReportes] = useState(true);

  const lista = useMemo(() => {
    const evs = anio === "todos" ? eventos : eventos.filter((e) => e.fecha.startsWith(anio));
    const ids = new Set(evs.map((e) => e.punto_id));
    return evaluar(puntos.filter((p) => ids.has(p.id)), evs).filter(
      (p) => (tipo === "todos" || p.tipo === tipo) && (nivel === "todos" || p.nivel === nivel)
    );
  }, [puntos, eventos, anio, tipo, nivel]);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-5">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <select value={anio} onChange={(e) => setAnio(e.target.value)} className={selectClase}>
            <option value="todos">Todos los años</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          <select value={tipo} onChange={(e) => setTipo(e.target.value as typeof tipo)} className={selectClase}>
            <option value="todos">Todos los peligros</option>
            {tipos.map((t) => (
              <option key={t} value={t}>
                {nombreTipo[t]}
              </option>
            ))}
          </select>
          <select value={nivel} onChange={(e) => setNivel(e.target.value as typeof nivel)} className={selectClase}>
            <option value="todos">Toda prioridad</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-gris px-2">
            <input type="checkbox" checked={verReportes} onChange={(e) => setVerReportes(e.target.checked)} />
            Reportes vecinales
          </label>
        </div>

        <div className="bg-white border border-borde rounded-xl p-2">
          <Mapa puntos={lista} reportes={verReportes ? reportes : []} alto="560px" />
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-gris">
          {(["Alta", "Media", "Baja"] as Nivel[]).map((n) => (
            <span key={n} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ background: colorNivel[n] }} />
              Prioridad {n.toLowerCase()}
            </span>
          ))}
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-[3px] border-marca bg-white" />
            Reporte vecinal verificado
          </span>
          <span>El tamaño del círculo crece con el puntaje.</span>
        </div>
      </div>

      <aside className="bg-white border border-borde rounded-xl p-4 h-fit lg:max-h-[640px] lg:overflow-y-auto">
        <h2 className="font-semibold mb-3">{lista.length} puntos en el mapa</h2>
        <ol className="space-y-2">
          {lista.map((p, i) => (
            <li key={p.id} className="flex gap-3 text-sm border-b border-borde last:border-0 pb-2">
              <span className="text-gris w-5 text-right">{i + 1}</span>
              <div className="flex-1">
                <p className="font-medium leading-snug">{p.nombre}</p>
                <p className="text-gris text-xs">
                  {nombreTipo[p.tipo]} · {p.eventos} evento{p.eventos === 1 ? "" : "s"}
                </p>
              </div>
              <span className="font-semibold" style={{ color: colorNivel[p.nivel] }}>
                {p.puntaje}
              </span>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
