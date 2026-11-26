import { colorNivel, niveles } from "@/lib/prioridad";

export default function Leyenda({ conReportes = false }: { conReportes?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-gris">
      {niveles.map((n) => (
        <span key={n} className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: colorNivel[n] }} />
          Prioridad {n.toLowerCase()}
        </span>
      ))}
      {conReportes && (
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full border-[3px] border-marca bg-white" />
          Reporte vecinal
        </span>
      )}
    </div>
  );
}
