"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { tipos, type TipoPeligro } from "@/lib/tipos";

export type EstadoFormulario = { ok: boolean; mensaje: string; valores?: Record<string, string> } | null;

const limites = { latMin: -12.12, latMax: -11.95, lonMin: -77.0, lonMax: -76.8 };

export async function enviarReporte(_: EstadoFormulario, datos: FormData): Promise<EstadoFormulario> {
  if (String(datos.get("web") ?? "")) return { ok: true, mensaje: "Reporte enviado." };

  const nombre = String(datos.get("nombre") ?? "").trim().slice(0, 80);
  const zona = String(datos.get("zona") ?? "").trim().slice(0, 80);
  const referencia = String(datos.get("referencia") ?? "").trim().slice(0, 160);
  const tipo = String(datos.get("tipo") ?? "") as TipoPeligro;
  const descripcion = String(datos.get("descripcion") ?? "").trim().slice(0, 600);
  const lat = Number(datos.get("lat"));
  const lon = Number(datos.get("lon"));
  const valores = { nombre, zona, referencia, tipo, descripcion };

  if (!zona || !referencia || descripcion.length < 10) {
    return { ok: false, mensaje: "Completa la zona, la referencia y una descripción de al menos 10 letras.", valores };
  }
  if (!tipos.includes(tipo)) return { ok: false, mensaje: "Elige el tipo de problema.", valores };
  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    lat < limites.latMin ||
    lat > limites.latMax ||
    lon < limites.lonMin ||
    lon > limites.lonMax
  ) {
    return { ok: false, mensaje: "Marca en el mapa el lugar del aniego dentro del distrito de Ate.", valores };
  }

  try {
    await sql()`
      insert into reportes (nombre, zona, referencia, tipo, descripcion, lat, lon)
      values (${nombre || null}, ${zona}, ${referencia}, ${tipo}, ${descripcion}, ${lat}, ${lon})`;
  } catch {
    return { ok: false, mensaje: "No se pudo guardar el reporte. Inténtalo de nuevo en un momento.", valores };
  }

  revalidatePath("/panel");
  return { ok: true, mensaje: "Reporte enviado. Lo revisaremos antes de mostrarlo en el mapa." };
}
