# Sistema de puntos críticos de aniegos en Ate

Sistema web para identificar y priorizar los puntos críticos de inundación pluvial y aniegos en el distrito de Ate, Lima, con eventos registrados entre 2023 y 2025. Forma parte de un trabajo sobre el **ODS 13: Acción por el clima**, en especial la meta 13.1, que busca que las comunidades resistan mejor los desastres ligados al clima.

## Qué hace

- **Mapa**: muestra los puntos críticos de Ate con colores según su prioridad. Se puede filtrar por año, tipo de peligro y nivel.
- **Priorización**: ordena los puntos con un puntaje de 0 a 100 que sale de cuatro criterios. Los pesos se pueden mover para ver cómo cambia el orden.
- **Eventos**: lista los eventos con su fecha, el daño que causaron y el enlace a la fuente.
- **Reportar**: un vecino puede marcar en el mapa dónde vio un aniego y describir lo que pasó.
- **Panel** (`/panel`): con una clave se revisan los reportes. Los que se verifican pasan a verse en el mapa.

## Cómo se calcula la prioridad

Cada punto recibe una nota del 1 al 5 en:

| Criterio | Qué mide | Peso inicial |
|---|---|---|
| Frecuencia | Veces que se repitió un evento en el lugar | 35 % |
| Severidad | El daño más grave que dejó un evento | 30 % |
| Exposición | Viviendas, vías y servicios que hay alrededor | 20 % |
| Recencia | Qué tan reciente fue el último evento | 15 % |

`puntaje = Σ(nota × peso) / (5 × Σ pesos) × 100`

Desde 55 la prioridad es **alta**, de 45 a 54 es **media** y por debajo de 45 es **baja**.

## Tecnologías

- Next.js (App Router) con TypeScript y Tailwind CSS
- Leaflet y React Leaflet, con mapas de OpenStreetMap y CARTO
- Base de datos PostgreSQL en Neon, a la que se accede con `@neondatabase/serverless`
- Despliegue en Vercel

## Cómo correrlo

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Crear un archivo `.env.local` a partir de `.env.example`:

   ```
   DATABASE_URL=postgresql://...
   ADMIN_CLAVE=una-clave-para-el-panel
   ```

3. Crear las tablas y cargar los puntos y eventos de `data/`:

   ```bash
   npm run db
   ```

4. Levantar el proyecto:

   ```bash
   npm run dev
   ```

   Se abre en http://localhost:3000

Otros comandos: `npm run build`, `npm run lint` y `npm run typecheck`.

## Datos

Los puntos críticos están en `data/puntos.json` y los eventos en `data/eventos.json`. Cada evento sale de una nota de prensa o de un reporte de una entidad pública (INDECI, Sedapal, Municipalidad de Ate, entre otras) y guarda el enlace a su fuente. El script `scripts/db.mjs` borra y vuelve a cargar los puntos y los eventos, pero no toca los reportes de los vecinos.

## Integrantes

- Aguirre Saavedra, Juan Alexis
- Azañero Pillaca, Vidal Hotaru

Diseño y Desarrollo de Software
