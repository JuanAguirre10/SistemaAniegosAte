import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navegacion from "@/components/Navegacion";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Puntos Críticos Ate",
  description: "Identificación y priorización de puntos críticos de inundación pluvial y aniegos en el distrito de Ate, Lima (2023–2025).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navegacion />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-borde bg-white">
          <div className="max-w-6xl mx-auto px-4 py-5 text-sm text-gris flex flex-col sm:flex-row gap-2 justify-between">
            <span>Puntos Críticos Ate · Distrito de Ate, Lima</span>
            <span>Datos de fuentes públicas, periodo 2023–2025</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
