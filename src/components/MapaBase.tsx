"use client";

import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip, useMapEvents } from "react-leaflet";
import { colorNivel, type PuntoEvaluado } from "@/lib/prioridad";
import { nombreTipo, type Reporte } from "@/lib/tipos";

export type MapaBaseProps = {
  puntos?: PuntoEvaluado[];
  reportes?: Reporte[];
  alto?: string;
  marcador?: { lat: number; lon: number } | null;
  onElegir?: (lat: number, lon: number) => void;
};

function Clic({ onElegir }: { onElegir: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) {
      onElegir(Number(e.latlng.lat.toFixed(6)), Number(e.latlng.lng.toFixed(6)));
    },
  });
  return null;
}

export default function MapaBase({ puntos = [], reportes = [], alto = "520px", marcador, onElegir }: MapaBaseProps) {
  const vista =
    puntos.length > 1
      ? { bounds: puntos.map((p) => [p.lat, p.lon] as [number, number]), boundsOptions: { padding: [30, 30] as [number, number] } }
      : { center: [-12.035, -76.89] as [number, number], zoom: 12 };

  return (
    <MapContainer
      {...vista}
      scrollWheelZoom
      style={{ height: alto, width: "100%", borderRadius: 12 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="capa-clara"
      />

      {onElegir && <Clic onElegir={onElegir} />}

      {puntos.map((p) => (
        <CircleMarker
          key={p.id}
          center={[p.lat, p.lon]}
          radius={8 + p.puntaje / 9}
          pathOptions={{ color: colorNivel[p.nivel], fillColor: colorNivel[p.nivel], fillOpacity: 0.45, weight: 2 }}
        >
          <Tooltip>{p.nombre}</Tooltip>
          <Popup>
            <strong>{p.nombre}</strong>
            <br />
            {p.zona} · {p.referencia}
            <br />
            Peligro: {nombreTipo[p.tipo]}
            <br />
            Eventos registrados: {p.eventos} (último: {p.ultimaFecha})
            <br />
            Prioridad:{" "}
            <span style={{ color: colorNivel[p.nivel], fontWeight: 600 }}>
              {p.nivel} ({p.puntaje}/100)
            </span>
          </Popup>
        </CircleMarker>
      ))}

      {reportes.map((r) => (
        <CircleMarker
          key={`r${r.id}`}
          center={[r.lat, r.lon]}
          radius={6}
          pathOptions={{ color: "#2b7bb9", fillColor: "#ffffff", fillOpacity: 1, weight: 3 }}
        >
          <Popup>
            <strong>Reporte vecinal #{r.id}</strong>
            <br />
            {nombreTipo[r.tipo]} · {r.zona}
            <br />
            {r.referencia}
            <br />
            {r.descripcion}
            <br />
            <span style={{ color: "#5d6b78" }}>{r.creado}</span>
          </Popup>
        </CircleMarker>
      ))}

      {marcador && (
        <CircleMarker
          center={[marcador.lat, marcador.lon]}
          radius={10}
          pathOptions={{ color: "#2b7bb9", fillColor: "#2b7bb9", fillOpacity: 0.6, weight: 2 }}
        />
      )}
    </MapContainer>
  );
}
