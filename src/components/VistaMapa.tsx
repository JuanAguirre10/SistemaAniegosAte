"use client";

import { useMemo, useRef, useState } from "react";
import Leyenda from "./Leyenda";
import Mapa from "./Mapa";
import { colorNivel, evaluar, niveles, type Nivel } from "@/lib/prioridad";
import { nombreTipo, tipos, type Evento, type Punto, type Reporte, type TipoPeligro } from "@/lib/tipos";

type Props = { puntos: Punto[]; eventos: Evento[]; reportes: Reporte[] };

export default function VistaMapa({ puntos, eventos, reportes }: Props) {
  const [anio, setAnio] = useState("todos");
  const [tipo, setTipo] = useState<"todos" | TipoPeligro>("todos");
  const [nivel, setNivel] = useState<"todos" | Nivel>("todos");
  const [verReportes, setVerReportes] = useState(true);
  const [seleccion, setSeleccion] = useState<{ id: string; vez: number } | null>(null);

  const lista = useMemo(() => {
    const evs = anio === "todos" ? eventos : eventos.filter((e) => e.fecha.startsWith(anio));
    const ids = new Set(evs.map((e) => e.punto_id));
    return evaluar(puntos.filter((p) => ids.has(p.id)), evs).filter(
      (p) => (tipo === "todos" || p.tipo === tipo) && (nivel === "todos" || p.nivel === nivel)
    );
  }, [puntos, eventos, anio, tipo, nivel]);

  const tarjetaMapa = useRef<HTMLDivElement>(null);
  const elegir = (id: string) => {
    setSeleccion((s) => ({ id, vez: (s?.vez ?? 0) + 1 }));
    if (window.matchMedia("(max-width: 1023px)").matches) {
      tarjetaMapa.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="tarjeta p-3 flex flex-wrap items-center gap-3">
        <select
          aria-label="Año"
          value={anio}
          onChange={(e) => {
            setSeleccion(null);
            setAnio(e.target.value);
          }}
          className="campo sm:w-auto!"
        >
          <option value="todos">Todos los años</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <select
          aria-label="Tipo de peligro"
          value={tipo}
          onChange={(e) => {
            setSeleccion(null);
            setTipo(e.target.value as "todos" | TipoPeligro);
          }}
          className="campo sm:w-auto!"
        >
          <option value="todos">Todos los peligros</option>
          {tipos.map((t) => (
            <option key={t} value={t}>
              {nombreTipo[t]}
            </option>
          ))}
        </select>
        <div role="group" aria-label="Prioridad" className="flex rounded-xl bg-fondo p-1">
          {(["todos", ...niveles] as const).map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={nivel === n}
              onClick={() => {
                setSeleccion(null);
                setNivel(n);
              }}
              className={`cursor-pointer rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                nivel === n ? "bg-white text-texto shadow-sm" : "text-gris hover:text-texto"
              }`}
            >
              {n === "todos" ? "Todas" : n}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-gris sm:ml-auto px-1 cursor-pointer">
          <input
            type="checkbox"
            checked={verReportes}
            onChange={(e) => setVerReportes(e.target.checked)}
            className="w-4 h-4 accent-marca"
          />
          Reportes vecinales
        </label>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-4">
        <div ref={tarjetaMapa} className="tarjeta p-3 min-w-0 scroll-mt-[84px] [--alto-mapa:420px] lg:[--alto-mapa:600px]">
          <Mapa puntos={lista} reportes={verReportes ? reportes : []} seleccion={seleccion} alto="var(--alto-mapa)" />
          <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-3 pb-1">
            <Leyenda conReportes />
            <span className="text-xs text-gris">Un círculo más grande indica un puntaje mayor.</span>
          </div>
        </div>

        <aside className="tarjeta flex flex-col max-h-[520px] lg:max-h-none lg:h-[660px] overflow-hidden">
          <div className="flex items-baseline justify-between px-5 py-4 border-b border-borde">
            <h2 className="font-bold">
              {lista.length} punto{lista.length === 1 ? "" : "s"}
            </h2>
            <span className="text-xs text-gris">Puntaje de 0 a 100</span>
          </div>
          {lista.length === 0 && <p className="px-5 py-6 text-sm text-gris">No hay puntos con esos filtros.</p>}
          <ol className="overflow-y-auto p-2">
            {lista.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => elegir(p.id)}
                  aria-pressed={seleccion?.id === p.id}
                  className={`w-full cursor-pointer text-left flex items-start gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${
                    seleccion?.id === p.id ? "bg-marca-suave" : "hover:bg-fondo"
                  }`}
                >
                  <span className="w-5 shrink-0 text-right font-semibold text-gris">{i + 1}</span>
                  <span className="flex-1">
                    <span className="block font-semibold leading-snug">{p.nombre}</span>
                    <span className="block text-gris text-xs mt-1">
                      {nombreTipo[p.tipo]} · {p.eventos} evento{p.eventos === 1 ? "" : "s"}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: colorNivel[p.nivel] }} />
                    {p.puntaje}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
