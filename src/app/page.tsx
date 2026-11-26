import Image from "next/image";
import Link from "next/link";
import { BarrasHorizontales, Columnas, Proporcion } from "@/components/Graficos";
import Icono, { type NombreIcono } from "@/components/Icono";
import Insignia from "@/components/Insignia";
import Leyenda from "@/components/Leyenda";
import Mapa from "@/components/Mapa";
import { obtenerEventos, obtenerPuntos, obtenerReportes } from "@/lib/datos";
import { colorNivel, evaluar, niveles } from "@/lib/prioridad";
import { nombreTipo, tipos } from "@/lib/tipos";

export default async function Inicio() {
  const [puntos, eventos, reportes] = await Promise.all([obtenerPuntos(), obtenerEventos(), obtenerReportes()]);
  const evaluados = evaluar(puntos, eventos);

  const porAnio = ["2023", "2024", "2025"].map((a) => ({
    etiqueta: a,
    valor: eventos.filter((e) => e.fecha.startsWith(a)).length,
  }));
  const porTipo = tipos
    .map((t) => ({ etiqueta: nombreTipo[t], valor: eventos.filter((e) => e.tipo === t).length }))
    .filter((d) => d.valor > 0)
    .sort((a, b) => b.valor - a.valor);
  const porNivel = niveles.map((n) => ({
    etiqueta: `Prioridad ${n.toLowerCase()}`,
    valor: evaluados.filter((p) => p.nivel === n).length,
    color: colorNivel[n],
  }));
  const fuentes = [...new Set(eventos.map((e) => e.fuente_nombre))].sort((a, b) => a.localeCompare(b, "es"));

  const tarjetas: { valor: number; texto: string; icono: NombreIcono }[] = [
    { valor: puntos.length, texto: "Puntos críticos", icono: "pin" },
    { valor: eventos.length, texto: "Eventos 2023–2025", icono: "calendario" },
    { valor: porNivel[0].valor, texto: "Puntos de prioridad alta", icono: "alerta" },
    { valor: reportes.length, texto: "Reportes de vecinos", icono: "mensaje" },
  ];

  return (
    <div className="space-y-5">
      <section className="tarjeta overflow-hidden grid lg:grid-cols-[1fr_1.05fr]">
        <div className="p-6 md:p-10 flex flex-col justify-center bg-linear-to-br from-marca-suave via-white to-white">
          <div className="flex items-center gap-3">
            <Image
              src="/ods13.png"
              alt="Objetivo de Desarrollo Sostenible 13"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <p className="text-sm leading-tight">
              <span className="block font-bold">Acción por el clima</span>
              <span className="block text-gris mt-0.5">Meta 13.1: resiliencia ante desastres</span>
            </p>
          </div>
          <h1 className="text-3xl md:text-[2.5rem] font-extrabold tracking-tight leading-[1.14] text-balance mt-6">
            Puntos críticos de inundación y aniegos en Ate
          </h1>
          <p className="text-gris mt-4 leading-relaxed">
            Eventos del distrito entre 2023 y 2025, ubicados en un mapa y ordenados por prioridad para saber dónde
            conviene actuar primero.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href="/mapa" className="boton boton-principal">
              <Icono nombre="mapa" className="w-4 h-4" />
              Ver el mapa
            </Link>
            <Link href="/reportar" className="boton boton-secundario">
              Reportar un aniego
            </Link>
          </div>
        </div>
        <div className="relative border-t lg:border-t-0 lg:border-l border-borde p-3">
          <Mapa puntos={evaluados} alto="440px" vistaPrevia />
          <div className="absolute left-6 bottom-6 right-6 sm:right-auto rounded-xl border border-borde bg-white/95 px-3.5 py-2.5">
            <Leyenda />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tarjetas.map((t) => (
          <div key={t.texto} className="tarjeta p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <span className="w-12 h-12 shrink-0 rounded-xl bg-marca-suave text-marca grid place-items-center">
              <Icono nombre={t.icono} className="w-6 h-6" />
            </span>
            <div>
              <p className="text-3xl font-extrabold leading-none">{t.valor}</p>
              <p className="text-sm text-gris mt-1.5 leading-snug">{t.texto}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="tarjeta p-6 flex flex-col">
          <h2 className="font-bold mb-5">Eventos por año</h2>
          <Columnas datos={porAnio} />
        </div>
        <div className="tarjeta p-6">
          <h2 className="font-bold mb-5">Eventos por tipo de peligro</h2>
          <BarrasHorizontales datos={porTipo} />
        </div>
        <div className="tarjeta p-6">
          <h2 className="font-bold mb-5">Puntos por prioridad</h2>
          <Proporcion datos={porNivel} />
        </div>
      </section>

      <section className="grid lg:grid-cols-[1.7fr_1fr] gap-4">
        <div className="tarjeta p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h2 className="font-bold">Puntos con mayor prioridad</h2>
            <Link href="/priorizacion" className="flex items-center gap-1.5 text-sm font-semibold text-marca hover:underline">
              Ver ranking completo
              <Icono nombre="flecha" className="w-4 h-4" />
            </Link>
          </div>
          <ol className="divide-y divide-borde">
            {evaluados.slice(0, 5).map((p, i) => (
              <li key={p.id} className="py-3.5 flex items-center gap-3 sm:gap-4 text-sm">
                <span className="w-8 h-8 shrink-0 rounded-lg bg-fondo grid place-items-center font-bold text-gris">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{p.nombre}</p>
                  <p className="text-gris text-xs mt-0.5">
                    {p.zona} · {nombreTipo[p.tipo]} · {p.eventos} evento{p.eventos === 1 ? "" : "s"}
                  </p>
                </div>
                <Insignia nivel={p.nivel} texto={`${p.nivel} · ${p.puntaje}`} />
              </li>
            ))}
          </ol>
        </div>

        <div className="tarjeta p-6 flex flex-col">
          <h2 className="font-bold">Fuentes de los datos</h2>
          <p className="text-sm text-gris mt-2 leading-relaxed">Cada evento se puede comprobar en su publicación original.</p>
          <ul className="flex flex-wrap gap-2 mt-4">
            {fuentes.map((f) => (
              <li key={f} className="rounded-lg border border-borde bg-fondo px-3 py-1.5 text-xs font-medium">
                {f}
              </li>
            ))}
          </ul>
          <Link href="/eventos" className="boton boton-secundario mt-6 lg:mt-auto">
            Revisar los eventos
          </Link>
        </div>
      </section>
    </div>
  );
}
