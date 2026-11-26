type Props = { titulo: string; descripcion: React.ReactNode; children?: React.ReactNode };

export default function Encabezado({ titulo, descripcion, children }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{titulo}</h1>
        <p className="text-gris mt-2 leading-relaxed">{descripcion}</p>
      </div>
      {children}
    </div>
  );
}
