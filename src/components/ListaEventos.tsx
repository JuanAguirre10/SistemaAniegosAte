"use client";

import { useMemo, useState } from "react";
import { nombreTipo, tipos, type Evento, type Punto, type TipoPeligro } from "@/lib/tipos";

const selectClase = "border border-borde rounded-lg px-3 py-2 text-sm bg-white";

function fechaLarga(f: string) {
  const [a, m, d] = f.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" });
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

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Buscar zona o calle"
          className="border border-borde rounded-lg px-3 py-2 text-sm bg-white flex-1 min-w-48"
        />
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
      </div>

      <p className="text-sm text-gris">{lista.length} eventos</p>

      <div className="grid md:grid-cols-2 gap-4">
        {lista.map((e) => {
          const p = nombrePunto.get(e.punto_id);
          return (
            <article key={e.id} className="bg-white border border-borde rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-marca-suave text-marca">{nombreTipo[e.tipo]}</span>
                <span className="text-gris">{fechaLarga(e.fecha)}</span>
              </div>
              <h3 className="font-medium leading-snug">{p?.nombre}</h3>
              <p className="text-sm text-gris">{p?.zona}</p>
              <p className="text-sm">{e.descripcion}</p>
              <p className="text-sm">
                <span className="text-gris">Impacto: </span>
                {e.impacto}
              </p>
              <a
                href={e.fuente_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-marca hover:underline mt-auto"
              >
                Fuente: {e.fuente_nombre}
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
