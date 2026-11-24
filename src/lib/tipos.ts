export type TipoPeligro = "lluvia" | "quebrada" | "colector" | "canal" | "rio";

export type Punto = {
  id: string;
  nombre: string;
  zona: string;
  referencia: string;
  lat: number;
  lon: number;
  tipo: TipoPeligro;
  exposicion: number;
  detalle_exposicion: string;
};

export type Evento = {
  id: string;
  punto_id: string;
  fecha: string;
  tipo: TipoPeligro;
  descripcion: string;
  impacto: string;
  severidad: number;
  fuente_nombre: string;
  fuente_titulo: string;
  fuente_url: string;
};

export type EstadoReporte = "pendiente" | "verificado" | "descartado";

export type Reporte = {
  id: number;
  nombre: string | null;
  zona: string;
  referencia: string;
  tipo: TipoPeligro;
  descripcion: string;
  lat: number;
  lon: number;
  estado: EstadoReporte;
  creado: string;
};

export const nombreTipo: Record<TipoPeligro, string> = {
  lluvia: "Lluvia intensa",
  quebrada: "Huaico / quebrada",
  colector: "Colapso de colector",
  canal: "Desborde de canal",
  rio: "Desborde de río",
};

export const tipos = Object.keys(nombreTipo) as TipoPeligro[];

export const nombreEstado: Record<EstadoReporte, string> = {
  pendiente: "Pendiente",
  verificado: "Verificado",
  descartado: "Descartado",
};
