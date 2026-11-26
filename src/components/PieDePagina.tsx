import Link from "next/link";
import Marca from "./Marca";

const enlaces = [
  { href: "/mapa", texto: "Mapa de puntos críticos" },
  { href: "/priorizacion", texto: "Priorización" },
  { href: "/eventos", texto: "Eventos registrados" },
  { href: "/reportar", texto: "Reportar un aniego" },
];

export default function PieDePagina() {
  return (
    <footer className="mt-6 border-t border-borde bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] text-sm">
        <div className="space-y-3">
          <Marca />
          <p className="text-gris max-w-sm leading-relaxed">
            Registro de lugares del distrito afectados por lluvias, huaicos y aniegos entre 2023 y 2025.
          </p>
        </div>
        <div>
          <p className="font-bold mb-3">Secciones</p>
          <ul className="space-y-2">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="text-gris hover:text-marca">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold mb-3">Datos</p>
          <p className="text-gris leading-relaxed">
            Información tomada de entidades públicas y medios de comunicación. Cada evento incluye el enlace a su fuente.
          </p>
        </div>
      </div>
    </footer>
  );
}
