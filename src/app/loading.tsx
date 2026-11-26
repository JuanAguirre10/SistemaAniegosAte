export default function Cargando() {
  return (
    <div className="space-y-5 animate-pulse" aria-label="Cargando">
      <div className="space-y-3">
        <div className="h-8 w-72 max-w-full rounded-lg bg-borde" />
        <div className="h-4 w-full max-w-xl rounded bg-borde" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="tarjeta h-24" />
        ))}
      </div>
      <div className="tarjeta h-[420px]" />
    </div>
  );
}
