import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Telesto Motors — Jouw droomauto, zonder gedoe",
  description:
    "De onafhankelijke auto-adviseur die luistert naar jouw wensen. Onafhankelijk advies, technische keuring en prijsonderhandeling — sinds 2008.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={montserrat.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
