import type { Metadata } from "next";
import { Anek_Devanagari } from "next/font/google";
import "./globals.css";

const anek = Anek_Devanagari({
  subsets: ["latin"],
  variable: "--font-anek",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
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
    <html lang="nl" className={anek.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
