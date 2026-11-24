import type { Evento, Punto } from "./tipos";

export type Pesos = {
  frecuencia: number;
  severidad: number;
  exposicion: number;
  recencia: number;
};

export const pesosBase: Pesos = {
  frecuencia: 35,
  severidad: 30,
  exposicion: 20,
  recencia: 15,
};

export type Nivel = "Alta" | "Media" | "Baja";

export type PuntoEvaluado = Punto & {
  eventos: number;
  ultimaFecha: string;
  notas: { frecuencia: number; severidad: number; exposicion: number; recencia: number };
  puntaje: number;
  nivel: Nivel;
};

export function notaFrecuencia(n: number) {
  if (n >= 5) return 5;
  if (n >= 4) return 4;
  if (n === 3) return 3;
  if (n === 2) return 2;
  return 1;
}

export function notaRecencia(fecha: string) {
  const anio = Number(fecha.slice(0, 4));
  if (anio >= 2025) return 5;
  if (anio === 2024) return 3;
  return 1;
}

export function nivelDe(puntaje: number): Nivel {
  if (puntaje >= 70) return "Alta";
  if (puntaje >= 45) return "Media";
  return "Baja";
}

export const colorNivel: Record<Nivel, string> = {
  Alta: "#e05252",
  Media: "#e9a23b",
  Baja: "#4caf7d",
};

export function evaluar(puntos: Punto[], eventos: Evento[], pesos: Pesos = pesosBase): PuntoEvaluado[] {
  const total = pesos.frecuencia + pesos.severidad + pesos.exposicion + pesos.recencia || 1;

  return puntos
    .map((p) => {
      const propios = eventos.filter((e) => e.punto_id === p.id);
      const ultimaFecha = propios.reduce((max, e) => (e.fecha > max ? e.fecha : max), "2023-01-01");
      const notas = {
        frecuencia: notaFrecuencia(propios.length),
        severidad: propios.reduce((max, e) => Math.max(max, e.severidad), 1),
        exposicion: p.exposicion,
        recencia: notaRecencia(ultimaFecha),
      };
      const suma =
        notas.frecuencia * pesos.frecuencia +
        notas.severidad * pesos.severidad +
        notas.exposicion * pesos.exposicion +
        notas.recencia * pesos.recencia;
      const puntaje = Math.round((suma / (5 * total)) * 100);
      return { ...p, eventos: propios.length, ultimaFecha, notas, puntaje, nivel: nivelDe(puntaje) };
    })
    .sort((a, b) => b.puntaje - a.puntaje || b.eventos - a.eventos);
}
