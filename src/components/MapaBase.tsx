"use client";

import "leaflet/dist/leaflet.css";
import type { CircleMarker as Circulo } from "leaflet";
import { useEffect, useRef, type RefObject } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import { colorNivel, type PuntoEvaluado } from "@/lib/prioridad";
import { nombreTipo, type Reporte } from "@/lib/tipos";

export type MapaBaseProps = {
  puntos?: PuntoEvaluado[];
  reportes?: Reporte[];
  marcador?: { lat: number; lon: number } | null;
  onElegir?: (lat: number, lon: number) => void;
  seleccion?: { id: string; vez: number } | null;
  vistaPrevia?: boolean;
};

function Clic({ onElegir }: { onElegir: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) {
      onElegir(Number(e.latlng.lat.toFixed(6)), Number(e.latlng.lng.toFixed(6)));
    },
  });
  return null;
}

function Enfoque({
  seleccion,
  circulos,
}: {
  seleccion: MapaBaseProps["seleccion"];
  circulos: RefObject<Map<string, Circulo>>;
}) {
  const mapa = useMap();

  useEffect(() => {
    if (!seleccion) return;
    const circulo = circulos.current.get(seleccion.id);
    if (!circulo) return;
    const abrir = () => circulo.openPopup();
    mapa.once("moveend", abrir);
    mapa.flyTo(circulo.getLatLng(), 15, { duration: 0.8 });
    return () => {
      mapa.off("moveend", abrir);
    };
  }, [seleccion, mapa, circulos]);

  return null;
}

export default function MapaBase({
  puntos = [],
  reportes = [],
  marcador,
  onElegir,
  seleccion,
  vistaPrevia = false,
}: MapaBaseProps) {
  const circulos = useRef(new Map<string, Circulo>());
  const vista =
    puntos.length > 1
      ? { bounds: puntos.map((p) => [p.lat, p.lon] as [number, number]), boundsOptions: { padding: [36, 36] as [number, number] } }
      : { center: [-12.035, -76.89] as [number, number], zoom: 12 };

  return (
    <MapContainer
      {...vista}
      zoomSnap={0.25}
      scrollWheelZoom={!vistaPrevia}
      dragging={!vistaPrevia}
      doubleClickZoom={!vistaPrevia}
      touchZoom={!vistaPrevia}
      zoomControl={!vistaPrevia}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="capa-clara"
      />

      {onElegir && <Clic onElegir={onElegir} />}
      <Enfoque seleccion={seleccion} circulos={circulos} />

      {[...puntos].reverse().map((p) => (
        <CircleMarker
          key={p.id}
          ref={(c) => {
            if (c) circulos.current.set(p.id, c);
            else circulos.current.delete(p.id);
          }}
          center={[p.lat, p.lon]}
          radius={5 + p.puntaje / 10}
          pathOptions={{ color: "#ffffff", fillColor: colorNivel[p.nivel], fillOpacity: 0.9, weight: 2.5 }}
        >
          <Tooltip>{p.nombre}</Tooltip>
          {!vistaPrevia && (
            <Popup>
              <p style={{ fontWeight: 700, marginBottom: 4 }}>{p.nombre}</p>
              <p style={{ color: "#566879", marginBottom: 8 }}>
                {p.zona} · {p.referencia}
              </p>
              <p>Peligro: {nombreTipo[p.tipo]}</p>
              <p>
                Eventos: {p.eventos} (último: {p.ultimaFecha})
              </p>
              <p style={{ marginTop: 6, fontWeight: 700, color: colorNivel[p.nivel] }}>
                Prioridad {p.nivel.toLowerCase()} · {p.puntaje}/100
              </p>
            </Popup>
          )}
        </CircleMarker>
      ))}

      {reportes.map((r) => (
        <CircleMarker
          key={`r${r.id}`}
          center={[r.lat, r.lon]}
          radius={6}
          pathOptions={{ color: "#1d6fa8", fillColor: "#ffffff", fillOpacity: 1, weight: 3 }}
        >
          <Popup>
            <p style={{ fontWeight: 700, marginBottom: 4 }}>Reporte vecinal #{r.id}</p>
            <p>
              {nombreTipo[r.tipo]} · {r.zona}
            </p>
            <p>{r.referencia}</p>
            <p style={{ marginTop: 6 }}>{r.descripcion}</p>
            <p style={{ color: "#566879", marginTop: 6 }}>{r.creado}</p>
          </Popup>
        </CircleMarker>
      ))}

      {marcador && (
        <CircleMarker
          center={[marcador.lat, marcador.lon]}
          radius={11}
          pathOptions={{ color: "#ffffff", fillColor: "#1d6fa8", fillOpacity: 1, weight: 3 }}
        />
      )}
    </MapContainer>
  );
}
