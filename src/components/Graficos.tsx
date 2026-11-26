type Dato = { etiqueta: string; valor: number };

export function Columnas({ datos }: { datos: Dato[] }) {
  const max = Math.max(1, ...datos.map((d) => d.valor));
  return (
    <div className="flex-1 flex flex-col justify-end">
      <div className="h-40 flex items-end justify-around border-b border-borde">
        {datos.map((d) => (
          <div
            key={d.etiqueta}
            title={`${d.etiqueta}: ${d.valor}`}
            className="group h-full w-16 flex flex-col items-center justify-end"
          >
            <span className="text-sm font-bold mb-1">{d.valor}</span>
            <div
              className="w-9 rounded-t bg-marca transition-colors group-hover:bg-marca-oscura"
              style={{ height: `${(d.valor / max) * 82}%`, minHeight: d.valor ? 4 : 0 }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-around mt-2">
        {datos.map((d) => (
          <span key={d.etiqueta} className="w-16 text-center text-xs text-gris">
            {d.etiqueta}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BarrasHorizontales({ datos }: { datos: Dato[] }) {
  const max = Math.max(1, ...datos.map((d) => d.valor));
  return (
    <div className="space-y-3.5">
      {datos.map((d) => (
        <div key={d.etiqueta} title={`${d.etiqueta}: ${d.valor}`} className="group text-sm">
          <div className="flex justify-between gap-3 mb-1.5">
            <span className="text-gris">{d.etiqueta}</span>
            <span className="font-bold">{d.valor}</span>
          </div>
          <div className="h-2 bg-fondo rounded-r">
            <div
              className="h-full rounded-r bg-marca transition-colors group-hover:bg-marca-oscura"
              style={{ width: `${(d.valor / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Proporcion({ datos }: { datos: (Dato & { color: string })[] }) {
  const total = datos.reduce((s, d) => s + d.valor, 0) || 1;
  return (
    <div>
      <div className="flex gap-0.5 h-4 overflow-hidden rounded">
        {datos
          .filter((d) => d.valor > 0)
          .map((d) => (
            <div key={d.etiqueta} title={`${d.etiqueta}: ${d.valor}`} style={{ flexGrow: d.valor, background: d.color }} />
          ))}
      </div>
      <ul className="mt-4 divide-y divide-borde">
        {datos.map((d) => (
          <li key={d.etiqueta} className="flex items-center gap-2.5 py-2.5 text-sm">
            <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
            <span className="flex-1 text-gris">{d.etiqueta}</span>
            <span className="font-bold">{d.valor}</span>
            <span className="w-11 text-right text-xs text-gris">{Math.round((d.valor / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
