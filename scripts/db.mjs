import { neon } from "@neondatabase/serverless";
import { readFileSync, existsSync } from "node:fs";

for (const archivo of [".env.local", ".env"]) {
  if (!existsSync(archivo)) continue;
  for (const linea of readFileSync(archivo, "utf8").split(/\r?\n/)) {
    const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const sql = neon(process.env.DATABASE_URL);
const puntos = JSON.parse(readFileSync("data/puntos.json", "utf8"));
const eventos = JSON.parse(readFileSync("data/eventos.json", "utf8"));

await sql.transaction([
  sql`create table if not exists puntos (
    id text primary key,
    nombre text not null,
    zona text not null,
    referencia text not null,
    lat double precision not null,
    lon double precision not null,
    tipo text not null,
    exposicion int not null check (exposicion between 1 and 5),
    detalle_exposicion text not null
  )`,
  sql`create table if not exists eventos (
    id text primary key,
    punto_id text not null references puntos(id) on delete cascade,
    fecha date not null,
    tipo text not null,
    descripcion text not null,
    impacto text not null,
    severidad int not null check (severidad between 1 and 5),
    fuente_nombre text not null,
    fuente_titulo text not null,
    fuente_url text not null
  )`,
  sql`create table if not exists reportes (
    id serial primary key,
    nombre text,
    zona text not null,
    referencia text not null,
    tipo text not null,
    descripcion text not null,
    lat double precision not null,
    lon double precision not null,
    estado text not null default 'pendiente',
    creado timestamptz not null default now()
  )`,
]);

await sql.transaction([
  sql`delete from eventos`,
  sql`delete from puntos`,
  ...puntos.map(
    (p) => sql`insert into puntos values (${p.id}, ${p.nombre}, ${p.zona}, ${p.referencia}, ${p.lat}, ${p.lon}, ${p.tipo}, ${p.exposicion}, ${p.detalle_exposicion})`
  ),
  ...eventos.map(
    (e) => sql`insert into eventos values (${e.id}, ${e.punto_id}, ${e.fecha}, ${e.tipo}, ${e.descripcion}, ${e.impacto}, ${e.severidad}, ${e.fuente_nombre}, ${e.fuente_titulo}, ${e.fuente_url})`
  ),
]);

const [conteo] = await sql`select (select count(*) from puntos) as puntos, (select count(*) from eventos) as eventos, (select count(*) from reportes) as reportes`;
console.log(conteo);
