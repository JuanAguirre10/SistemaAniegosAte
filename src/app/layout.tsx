import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navegacion from "@/components/Navegacion";
import PieDePagina from "@/components/PieDePagina";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Puntos Críticos Ate",
  description: "Identificación y priorización de puntos críticos de inundación pluvial y aniegos en el distrito de Ate, Lima (2023–2025).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navegacion />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">{children}</main>
        <PieDePagina />
      </body>
    </html>
  );
}
