import Link from "next/link";
import Icono from "./Icono";

export default function Marca() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-500 to-marca-oscura text-white grid place-items-center">
        <Icono nombre="gota" className="w-5 h-5" />
      </span>
      <span className="leading-tight">
        <span className="block font-bold text-texto">Puntos Críticos Ate</span>
        <span className="block text-xs text-gris">Distrito de Ate, Lima</span>
      </span>
    </Link>
  );
}
