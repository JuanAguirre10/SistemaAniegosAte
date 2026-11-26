import { colorNivel, type Nivel } from "@/lib/prioridad";

const estilos: Record<Nivel, string> = {
  Alta: "bg-red-50 text-red-800 ring-red-200",
  Media: "bg-amber-50 text-amber-800 ring-amber-200",
  Baja: "bg-emerald-50 text-emerald-800 ring-emerald-200",
};

export default function Insignia({ nivel, texto }: { nivel: Nivel; texto?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${estilos[nivel]}`}
    >
      <span className="w-2 h-2 rounded-full" style={{ background: colorNivel[nivel] }} />
      {texto ?? nivel}
    </span>
  );
}
