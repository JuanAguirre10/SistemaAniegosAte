"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icono from "./Icono";
import Marca from "./Marca";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/mapa", texto: "Mapa" },
  { href: "/priorizacion", texto: "Priorización" },
  { href: "/eventos", texto: "Eventos" },
];

export default function Navegacion() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);

  const activo = (href: string) => (href === "/" ? ruta === "/" : ruta.startsWith(href));
  const clase = (href: string) =>
    `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
      activo(href) ? "bg-marca-suave text-marca-oscura" : "text-gris hover:bg-fondo hover:text-texto"
    }`;

  return (
    <header className="sticky top-0 z-[1000] border-b border-borde bg-white/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        <Marca />

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-1">
            {enlaces.map((e) => (
              <Link key={e.href} href={e.href} className={clase(e.href)} aria-current={activo(e.href) ? "page" : undefined}>
                {e.texto}
              </Link>
            ))}
          </nav>
          <Link href="/reportar" className="boton boton-principal">
            <Icono nombre="mas" className="w-4 h-4" />
            Reportar aniego
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setAbierto(!abierto)}
          className="md:hidden p-2 rounded-lg text-gris hover:bg-fondo cursor-pointer"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
        >
          <Icono nombre={abierto ? "cerrar" : "menu"} className="w-6 h-6" />
        </button>
      </div>

      {abierto && (
        <nav className="md:hidden border-t border-borde bg-white px-4 py-3 flex flex-col gap-1">
          {enlaces.map((e) => (
            <Link key={e.href} href={e.href} onClick={() => setAbierto(false)} className={clase(e.href)}>
              {e.texto}
            </Link>
          ))}
          <Link href="/reportar" onClick={() => setAbierto(false)} className="boton boton-principal mt-2">
            Reportar aniego
          </Link>
        </nav>
      )}
    </header>
  );
}
