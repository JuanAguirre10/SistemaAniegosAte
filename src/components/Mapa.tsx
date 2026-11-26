"use client";

import dynamic from "next/dynamic";
import type { MapaBaseProps } from "./MapaBase";

const MapaBase = dynamic(() => import("./MapaBase"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-marca-suave grid place-items-center text-sm text-gris">Cargando mapa...</div>
  ),
});

export default function Mapa({ alto = "520px", ...props }: MapaBaseProps & { alto?: string }) {
  return (
    <div className="isolate w-full overflow-hidden rounded-xl" style={{ height: alto }}>
      <MapaBase {...props} />
    </div>
  );
}
