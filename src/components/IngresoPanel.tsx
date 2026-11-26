"use client";

import { useActionState } from "react";
import { ingresar } from "@/app/panel/acciones";

export default function IngresoPanel() {
  const [error, accion, enviando] = useActionState(ingresar, null);

  return (
    <form action={accion} method="post" className="tarjeta max-w-sm mx-auto my-10 p-7 space-y-4">
      <div>
        <h1 className="text-xl font-extrabold">Panel de revisión</h1>
        <p className="text-sm text-gris mt-1.5">Ingresa la clave para revisar los reportes de los vecinos.</p>
      </div>
      <input type="password" name="clave" required aria-label="Clave" placeholder="Clave" className="campo" />
      {error && <p className="text-sm text-red-800 bg-red-50 rounded-xl px-4 py-3">{error}</p>}
      <button type="submit" disabled={enviando} className="boton boton-principal w-full">
        Ingresar
      </button>
    </form>
  );
}
