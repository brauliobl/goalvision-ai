import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoalVision AI — Inteligência desportiva",
  description: "Análises desportivas claras, dados e probabilidades para várias modalidades.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}