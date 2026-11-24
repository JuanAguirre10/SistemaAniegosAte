"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/mapa", texto: "Mapa" },
  { href: "/priorizacion", texto: "Priorización" },
  { href: "/eventos", texto: "Eventos" },
  { href: "/reportar", texto: "Reportar" },
];

export default function Navegacion() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);

  const activo = (href: string) => (href === "/" ? ruta === "/" : ruta.startsWith(href));

  return (
    <header className="bg-white border-b border-borde sticky top-0 z-[1000]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-texto">
          <span className="w-8 h-8 rounded-lg bg-marca-suave text-marca grid place-items-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M12 2.5c-.3 0-.6.2-.8.4C9.4 5.3 5.5 10.6 5.5 14a6.5 6.5 0 0 0 13 0c0-3.4-3.9-8.7-5.7-11.1a1 1 0 0 0-.8-.4Z" />
            </svg>
          </span>
          Puntos Críticos Ate
        </Link>

        <nav className="hidden md:flex gap-1">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className={`px-3 py-2 rounded-lg text-sm ${
                activo(e.href) ? "bg-marca-suave text-marca font-medium" : "text-gris hover:text-texto hover:bg-fondo"
              }`}
            >
              {e.texto}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setAbierto(!abierto)}
          className="md:hidden p-2 rounded-lg text-gris hover:bg-fondo"
          aria-label="Abrir menú"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {abierto && (
        <nav className="md:hidden border-t border-borde px-4 py-2 flex flex-col bg-white">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              onClick={() => setAbierto(false)}
              className={`px-3 py-2 rounded-lg text-sm ${activo(e.href) ? "bg-marca-suave text-marca font-medium" : "text-gris"}`}
            >
              {e.texto}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
