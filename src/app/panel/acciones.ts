"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { claveCorrecta, firma, haySesion, nombreCookie } from "@/lib/sesion";

export async function ingresar(_: string | null, datos: FormData): Promise<string | null> {
  if (!claveCorrecta(String(datos.get("clave") ?? ""))) return "Clave incorrecta.";
  (await cookies()).set(nombreCookie, firma(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  revalidatePath("/panel");
  return null;
}

export async function salir() {
  (await cookies()).delete(nombreCookie);
  revalidatePath("/panel");
}

export async function cambiarEstado(datos: FormData) {
  if (!(await haySesion())) return;
  const id = Number(datos.get("id"));
  const estado = String(datos.get("estado"));
  if (!Number.isInteger(id) || !["pendiente", "verificado", "descartado"].includes(estado)) return;
  await sql()`update reportes set estado = ${estado} where id = ${id}`;
  revalidatePath("/panel");
  revalidatePath("/mapa");
}
