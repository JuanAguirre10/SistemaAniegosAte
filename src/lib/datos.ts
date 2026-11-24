import { connection } from "next/server";
import { sql } from "./db";
import type { Evento, Punto, Reporte } from "./tipos";

export async function obtenerPuntos(): Promise<Punto[]> {
  await connection();
  const filas = await sql()`
    select id, nombre, zona, referencia, lat, lon, tipo, exposicion, detalle_exposicion
    from puntos order by nombre`;
  return filas as Punto[];
}

export async function obtenerEventos(): Promise<Evento[]> {
  await connection();
  const filas = await sql()`
    select id, punto_id, to_char(fecha, 'YYYY-MM-DD') as fecha, tipo, descripcion, impacto,
           severidad, fuente_nombre, fuente_titulo, fuente_url
    from eventos order by fecha desc`;
  return filas as Evento[];
}

export async function obtenerReportes(estado?: string): Promise<Reporte[]> {
  await connection();
  const filas = estado
    ? await sql()`
        select id, nombre, zona, referencia, tipo, descripcion, lat, lon, estado,
               to_char(creado at time zone 'America/Lima', 'YYYY-MM-DD HH24:MI') as creado
        from reportes where estado = ${estado} order by creado desc`
    : await sql()`
        select id, nombre, zona, referencia, tipo, descripcion, lat, lon, estado,
               to_char(creado at time zone 'America/Lima', 'YYYY-MM-DD HH24:MI') as creado
        from reportes order by creado desc`;
  return filas as Reporte[];
}
