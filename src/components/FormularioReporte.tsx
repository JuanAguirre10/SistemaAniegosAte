"use client";

import { useActionState, useState } from "react";
import Icono from "./Icono";
import Mapa from "./Mapa";
import { enviarReporte, type EstadoFormulario } from "@/app/reportar/acciones";
import { nombreTipo, tipos } from "@/lib/tipos";

const etiqueta = "block text-sm font-semibold";

export default function FormularioReporte() {
  const [punto, setPunto] = useState<{ lat: number; lon: number } | null>(null);
  const [estado, accion, enviando] = useActionState<EstadoFormulario, FormData>(async (previo, datos) => {
    const resultado = await enviarReporte(previo, datos);
    if (resultado?.ok) setPunto(null);
    return resultado;
  }, null);
  const v = estado?.ok ? undefined : estado?.valores;

  return (
    <form action={accion} method="post" className="grid lg:grid-cols-2 gap-4 items-start">
      <div className="tarjeta p-6 space-y-4">
        <h2 className="font-bold">Datos del reporte</h2>
        <label className={etiqueta}>
          Tu nombre <span className="font-normal text-gris">(opcional)</span>
          <input name="nombre" defaultValue={v?.nombre} maxLength={80} className="campo mt-1.5 font-normal" />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className={etiqueta}>
            Zona o urbanización
            <input
              name="zona"
              defaultValue={v?.zona}
              required
              maxLength={80}
              placeholder="Ej. Huaycán zona D"
              className="campo mt-1.5 font-normal"
            />
          </label>
          <label className={etiqueta}>
            Tipo de problema
            <select
              name="tipo"
              required
              defaultValue={v?.tipo ?? ""}
              key={v?.tipo ?? "vacio"}
              className="campo mt-1.5 font-normal"
            >
              <option value="" disabled>
                Elegir
              </option>
              {tipos.map((t) => (
                <option key={t} value={t}>
                  {nombreTipo[t]}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className={etiqueta}>
          Calle o referencia
          <input
            name="referencia"
            defaultValue={v?.referencia}
            required
            maxLength={160}
            placeholder="Ej. Av. Nicolás Ayllón cruce con..."
            className="campo mt-1.5 font-normal"
          />
        </label>
        <label className={etiqueta}>
          ¿Qué pasó?
          <textarea
            name="descripcion"
            defaultValue={v?.descripcion}
            required
            minLength={10}
            maxLength={600}
            rows={4}
            placeholder="Cuéntanos cuándo pasó, cuánta agua había y qué afectó."
            className="campo mt-1.5 font-normal"
          />
        </label>
        <input name="web" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <input type="hidden" name="lat" value={punto?.lat ?? ""} />
        <input type="hidden" name="lon" value={punto?.lon ?? ""} />

        {estado && (
          <p
            role="status"
            className={`text-sm rounded-xl px-4 py-3 ${
              estado.ok ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
            }`}
          >
            {estado.mensaje}
          </p>
        )}

        <button type="submit" disabled={enviando} className="boton boton-principal w-full py-3!">
          {enviando ? "Enviando..." : "Enviar reporte"}
        </button>
      </div>

      <div className="tarjeta p-3 lg:sticky lg:top-[88px]">
        <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-1 pb-3">
          <div>
            <h2 className="font-bold">Ubicación</h2>
            <p className="text-sm text-gris">Haz clic en el mapa donde ocurrió el aniego.</p>
          </div>
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
              punto ? "bg-emerald-50 text-emerald-800" : "bg-fondo text-gris"
            }`}
          >
            <Icono nombre={punto ? "check" : "pin"} className="w-4 h-4" />
            {punto ? `${punto.lat}, ${punto.lon}` : "Sin marcar"}
          </span>
        </div>
        <Mapa alto="470px" marcador={punto} onElegir={(lat, lon) => setPunto({ lat, lon })} />
      </div>
    </form>
  );
}
