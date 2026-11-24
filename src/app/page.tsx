import Link from "next/link";
import { obtenerEventos, obtenerPuntos, obtenerReportes } from "@/lib/datos";
import { colorNivel, evaluar } from "@/lib/prioridad";
import { nombreTipo, tipos } from "@/lib/tipos";

function Barras({ datos }: { datos: { etiqueta: string; valor: number }[] }) {
  const max = Math.max(1, ...datos.map((d) => d.valor));
  return (
    <div className="space-y-2.5">
      {datos.map((d) => (
        <div key={d.etiqueta} className="grid grid-cols-[130px_1fr_32px] items-center gap-3 text-sm">
          <span className="text-gris">{d.etiqueta}</span>
          <div className="h-3 rounded-full bg-marca-suave overflow-hidden">
            <div className="h-full rounded-full bg-marca" style={{ width: `${(d.valor / max) * 100}%` }} />
          </div>
          <span className="text-right font-medium">{d.valor}</span>
        </div>
      ))}
    </div>
  );
}

export default async function Inicio() {
  const [puntos, eventos, reportes] = await Promise.all([obtenerPuntos(), obtenerEventos(), obtenerReportes()]);
  const evaluados = evaluar(puntos, eventos);
  const altos = evaluados.filter((p) => p.nivel === "Alta").length;

  const porAnio = ["2023", "2024", "2025"].map((a) => ({
    etiqueta: a,
    valor: eventos.filter((e) => e.fecha.startsWith(a)).length,
  }));
  const porTipo = tipos
    .map((t) => ({ etiqueta: nombreTipo[t], valor: eventos.filter((e) => e.tipo === t).length }))
    .filter((d) => d.valor > 0);

  const tarjetas = [
    { valor: puntos.length, texto: "puntos críticos identificados" },
    { valor: eventos.length, texto: "eventos registrados 2023–2025" },
    { valor: altos, texto: "puntos con prioridad alta" },
    { valor: reportes.length, texto: "reportes enviados por vecinos" },
  ];

  return (
    <div className="space-y-8">
      <section className="bg-white border border-borde rounded-2xl p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold leading-tight">
            Puntos críticos de inundación por lluvia y aniegos en Ate
          </h1>
          <p className="text-gris mt-3 max-w-2xl">
            Juntamos los eventos ocurridos en el distrito entre 2023 y 2025, los ubicamos en un mapa y los ordenamos según
            su prioridad para saber dónde conviene actuar primero. Los vecinos también pueden reportar nuevos casos.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link href="/mapa" className="bg-marca text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:opacity-90">
              Ver el mapa
            </Link>
            <Link
              href="/reportar"
              className="border border-borde rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-fondo"
            >
              Reportar un aniego
            </Link>
          </div>
        </div>
        <div className="rounded-xl bg-[#3f7e44] text-white p-5 w-full md:w-56">
          <p className="text-4xl font-bold">13</p>
          <p className="font-semibold mt-1">Acción por el clima</p>
          <p className="text-sm text-white/85 mt-2">Meta 13.1: fortalecer la resiliencia ante desastres ligados al clima.</p>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tarjetas.map((t) => (
          <div key={t.texto} className="bg-white border border-borde rounded-xl p-5">
            <p className="text-3xl font-semibold text-marca">{t.valor}</p>
            <p className="text-sm text-gris mt-1">{t.texto}</p>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white border border-borde rounded-xl p-5">
          <h2 className="font-semibold mb-4">Eventos por año</h2>
          <Barras datos={porAnio} />
        </div>
        <div className="bg-white border border-borde rounded-xl p-5">
          <h2 className="font-semibold mb-4">Eventos por tipo de peligro</h2>
          <Barras datos={porTipo} />
        </div>
      </section>

      <section className="bg-white border border-borde rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Los 5 puntos con mayor prioridad</h2>
          <Link href="/priorizacion" className="text-sm text-marca hover:underline">
            Ver ranking completo
          </Link>
        </div>
        <ol className="divide-y divide-borde">
          {evaluados.slice(0, 5).map((p, i) => (
            <li key={p.id} className="py-3 flex items-center gap-4 text-sm">
              <span className="text-gris w-4">{i + 1}</span>
              <div className="flex-1">
                <p className="font-medium">{p.nombre}</p>
                <p className="text-gris text-xs">
                  {p.zona} · {nombreTipo[p.tipo]} · {p.eventos} evento{p.eventos === 1 ? "" : "s"}
                </p>
              </div>
              <span className="px-2 py-1 rounded-full text-xs text-white" style={{ background: colorNivel[p.nivel] }}>
                {p.nivel} · {p.puntaje}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
