import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const nombreCookie = "panel_ate";

export function firma() {
  const clave = process.env.ADMIN_CLAVE ?? "";
  return createHash("sha256").update(`panel:${clave}`).digest("hex");
}

export function claveCorrecta(intento: string) {
  const clave = process.env.ADMIN_CLAVE;
  if (!clave) return false;
  const a = createHash("sha256").update(intento).digest();
  const b = createHash("sha256").update(clave).digest();
  return timingSafeEqual(a, b);
}

export async function haySesion() {
  if (!process.env.ADMIN_CLAVE) return false;
  const valor = (await cookies()).get(nombreCookie)?.value;
  return valor === firma();
}
