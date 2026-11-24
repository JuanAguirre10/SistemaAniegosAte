"use client";

import { useActionState, useState } from "react";
import Mapa from "./Mapa";
import { enviarReporte, type EstadoFormulario } from "@/app/reportar/acciones";
import { nombreTipo, tipos } from "@/lib/tipos";

const campo = "w-full border border-borde rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-marca";

export default function FormularioReporte() {
  const [punto, setPunto] = useState<{ lat: number; lon: number } | null>(null);
  const [estado, accion, enviando] = useActionState<EstadoFormulario, FormData>(async (previo, datos) => {
    const resultado = await enviarReporte(previo, datos);
    if (resultado?.ok) setPunto(null);
    return resultado;
  }, null);
  const v = estado?.ok ? undefined : estado?.valores;

  return (
    <form action={accion} method="post" className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white border border-borde rounded-xl p-5 space-y-4">
        <label className="block text-sm">
          Tu nombre (opcional)
          <input name="nombre" defaultValue={v?.nombre} maxLength={80} className={`${campo} mt-1`} />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block text-sm">
            Zona o urbanización
            <input name="zona" defaultValue={v?.zona} required maxLength={80} placeholder="Ej. Huaycán zona D" className={`${campo} mt-1`} />
          </label>
          <label className="block text-sm">
            Tipo de problema
            <select name="tipo" required defaultValue={v?.tipo ?? ""} key={v?.tipo ?? "vacio"} className={`${campo} mt-1`}>
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
        <label className="block text-sm">
          Calle o referencia
          <input
            name="referencia"
            defaultValue={v?.referencia}
            required
            maxLength={160}
            placeholder="Ej. Av. Nicolás Ayllón cruce con..."
            className={`${campo} mt-1`}
          />
        </label>
        <label className="block text-sm">
          ¿Qué pasó?
          <textarea
            name="descripcion"
            defaultValue={v?.descripcion}
            required
            minLength={10}
            maxLength={600}
            rows={4}
            placeholder="Cuéntanos cuándo pasó, cuánta agua había y qué afectó."
            className={`${campo} mt-1`}
          />
        </label>
        <input name="web" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <input type="hidden" name="lat" value={punto?.lat ?? ""} />
        <input type="hidden" name="lon" value={punto?.lon ?? ""} />

        <p className="text-sm text-gris">
          {punto ? `Ubicación marcada: ${punto.lat}, ${punto.lon}` : "Falta marcar la ubicación en el mapa."}
        </p>

        {estado && (
          <p
            className={`text-sm rounded-lg px-3 py-2 ${
              estado.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {estado.mensaje}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-marca text-white rounded-lg py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-60"
        >
          {enviando ? "Enviando..." : "Enviar reporte"}
        </button>
      </div>

      <div className="bg-white border border-borde rounded-xl p-2 h-fit">
        <p className="text-sm text-gris px-2 pt-1 pb-2">Haz clic en el mapa donde ocurrió el aniego.</p>
        <Mapa alto="460px" marcador={punto} onElegir={(lat, lon) => setPunto({ lat, lon })} />
      </div>
    </form>
  );
}
