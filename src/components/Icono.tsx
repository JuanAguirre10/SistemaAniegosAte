const trazos = {
  gota: "M12 3.2c2.2 2.7 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 3.8-8.3 6-11Z",
  pin: "M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  calendario: "M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7A1.5 1.5 0 0 1 5 5.5ZM3.5 10h17M8 3.5v4M16 3.5v4",
  alerta: "M10.3 4.5 2.9 17.4A2 2 0 0 0 4.6 20.4h14.8a2 2 0 0 0 1.7-3L13.7 4.5a2 2 0 0 0-3.4 0ZM12 9.5v4.5M12 17.2v.1",
  mensaje: "M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v9.5A1.5 1.5 0 0 1 19 17h-7l-5 3.5V17H5a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 5 4.5ZM8 9h8M8 12.5h5",
  flecha: "M5 12h14M13 6l6 6-6 6",
  enlace: "M14 4.5h5.5V10M19.5 4.5 11 13M17.5 13.5v5a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 18.5V8a1.5 1.5 0 0 1 1.5-1.5h5",
  buscar: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4",
  mapa: "M9 4.5 3.5 6.5v13L9 17.5l6 2 5.5-2v-13l-5.5 2-6-2ZM9 4.5v13M15 6.5v13",
  mas: "M12 5v14M5 12h14",
  menu: "M4 7h16M4 12h16M4 17h16",
  cerrar: "M6 6l12 12M18 6 6 18",
  check: "m5 12.5 4.5 4.5L19 7.5",
  reiniciar: "M4.5 12a7.5 7.5 0 1 0 2.4-5.5M4.5 4v4.5H9",
} as const;

export type NombreIcono = keyof typeof trazos;

export default function Icono({ nombre, className = "w-5 h-5" }: { nombre: NombreIcono; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={trazos[nombre]} />
    </svg>
  );
}
