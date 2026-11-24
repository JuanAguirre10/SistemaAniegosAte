"use client";

import { useActionState } from "react";
import { ingresar } from "@/app/panel/acciones";

export default function IngresoPanel() {
  const [error, accion, enviando] = useActionState(ingresar, null);

  return (
    <form action={accion} method="post" className="max-w-sm mx-auto bg-white border border-borde rounded-xl p-6 space-y-4">
      <h1 className="text-xl font-semibold">Panel de revisión</h1>
      <p className="text-sm text-gris">Ingresa la clave para revisar los reportes de los vecinos.</p>
      <input
        type="password"
        name="clave"
        required
        placeholder="Clave"
        className="w-full border border-borde rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-marca"
      />
      {error && <p className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-marca text-white rounded-lg py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-60"
      >
        Ingresar
      </button>
    </form>
  );
}
