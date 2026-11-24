"use client";

import dynamic from "next/dynamic";

const Mapa = dynamic(() => import("./MapaBase"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-xl bg-marca-suave grid place-items-center text-sm text-gris">
      Cargando mapa...
    </div>
  ),
});

export default Mapa;
