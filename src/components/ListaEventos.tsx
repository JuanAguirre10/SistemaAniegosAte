"use client";

import { useMemo, useState } from "react";
import Icono from "./Icono";
import { nombreTipo, tipos, type Evento, type Punto, type TipoPeligro } from "@/lib/tipos";

function partesFecha(f: string) {
  const [a, m, d] = f.split("-").map(Number);
  const mes = new Date(a, m - 1, d).toLocaleDateString("es-PE", { month: "short" }).replace(".", "");
  return { dia: d, mes };
}

export default function ListaEventos({ eventos, puntos }: { eventos: Evento[]; puntos: Punto[] }) {
  const [anio, setAnio] = useState("todos");
  const [tipo, setTipo] = useState<"todos" | TipoPeligro>("todos");
  const [texto, setTexto] = useState("");

  const nombrePunto = useMemo(() => new Map(puntos.map((p) => [p.id, p])), [puntos]);

  const lista = eventos.filter((e) => {
    const p = nombrePunto.get(e.punto_id);
    const busqueda = `${p?.nombre} ${p?.zona} ${e.descripcion}`.toLowerCase();
    return (
      (anio === "todos" || e.fecha.startsWith(anio)) &&
      (tipo === "todos" || e.tipo === tipo) &&
      busqueda.includes(texto.toLowerCase().trim())
    );
  });
  const anios = [...new Set(lista.map((e) => e.fecha.slice(0, 4)))];

  return (
    <div className="space-y-6">
      <div className="tarjeta p-3 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-52">
          <Icono nombre="buscar" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gris" />
          <input
            aria-label="Buscar zona o calle"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Buscar zona o calle"
            className="campo pl-10!"
          />
        </div>
        <select aria-label="Año" value={anio} onChange={(e) => setAnio(e.target.value)} className="campo sm:w-auto!">
          <option value="todos">Todos los años</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <select
          aria-label="Tipo de peligro"
          value={tipo}
          onChange={(e) => setTipo(e.target.value as "todos" | TipoPeligro)}
          className="campo sm:w-auto!"
        >
          <option value="todos">Todos los peligros</option>
          {tipos.map((t) => (
            <option key={t} value={t}>
              {nombreTipo[t]}
            </option>
          ))}
        </select>
      </div>

      {lista.length === 0 && <p className="tarjeta p-6 text-sm text-gris">No hay eventos con esa búsqueda.</p>}

      {anios.map((a) => {
        const delAnio = lista.filter((e) => e.fecha.startsWith(a));
        return (
          <section key={a}>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xl font-extrabold">{a}</h2>
              <span className="text-sm text-gris">
                {delAnio.length} evento{delAnio.length === 1 ? "" : "s"}
              </span>
              <span className="flex-1 border-b border-borde" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {delAnio.map((e) => {
                const p = nombrePunto.get(e.punto_id);
                const f = partesFecha(e.fecha);
                return (
                  <article key={e.id} className="tarjeta p-5 flex flex-col gap-4">
                    <div className="flex gap-4">
                      <time
                        dateTime={e.fecha}
                        className="w-14 h-14 shrink-0 rounded-xl bg-marca-suave text-marca-oscura flex flex-col items-center justify-center leading-none"
                      >
                        <span className="text-xl font-extrabold">{f.dia}</span>
                        <span className="text-xs font-semibold mt-1">{f.mes}</span>
                      </time>
                      <div>
                        <h3 className="font-bold leading-snug">{p?.nombre}</h3>
                        <p className="text-xs text-gris mt-1">
                          {p?.zona} · {nombreTipo[e.tipo]}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed">{e.descripcion}</p>
                    <p className="text-sm leading-relaxed rounded-xl bg-fondo px-4 py-3">
                      <span className="font-semibold">Impacto: </span>
                      {e.impacto}
                    </p>
                    <a
                      href={e.fuente_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-marca hover:underline"
                    >
                      <Icono nombre="enlace" className="w-4 h-4" />
                      Fuente: {e.fuente_nombre}
                    </a>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
