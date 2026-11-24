import { neon } from "@neondatabase/serverless";

let cliente: ReturnType<typeof neon> | null = null;

export function sql() {
  if (!cliente) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("Falta la variable DATABASE_URL");
    cliente = neon(url);
  }
  return cliente;
}
