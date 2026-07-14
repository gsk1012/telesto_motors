import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://telestomotors.nl"),
  title: {
    default: "Telesto Motors — Jouw droomauto, zonder gedoe",
    template: "%s | Telesto Motors",
  },
  description:
    "De onafhankelijke auto-adviseur die luistert naar jouw wensen. Onafhankelijk advies, technische keuring en prijsonderhandeling — actief sinds 2008.",
  keywords: [
    "auto-adviseur",
    "onafhankelijk auto-advies",
    "auto kopen Nederland",
    "technische keuring auto",
    "prijsonderhandeling auto",
    "auto begeleiding",
    "elektrische auto advies",
    "hybride auto",
    "autobegeleiding particulieren",
    "Telesto Motors",
  ],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://telestomotors.nl",
    siteName: "Telesto Motors",
    title: "Telesto Motors — Jouw droomauto, zonder gedoe",
    description:
      "De onafhankelijke auto-adviseur die luistert naar jouw wensen. Onafhankelijk advies, technische keuring en prijsonderhandeling — actief sinds 2008.",
    images: [
      {
        url: "/images/hero-bmw.jpg",
        width: 1200,
        height: 630,
        alt: "Telesto Motors — Onafhankelijk auto-advies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Telesto Motors — Jouw droomauto, zonder gedoe",
    description:
      "De onafhankelijke auto-adviseur die luistert naar jouw wensen. Onafhankelijk advies, technische keuring en prijsonderhandeling.",
    images: ["/images/hero-bmw.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://telestomotors.nl",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://telestomotors.nl",
  name: "Telesto Motors",
  description:
    "Onafhankelijke auto-adviseur voor particulieren en bedrijven in Nederland. Persoonlijke autoselectie, technische keuring en prijsonderhandeling.",
  url: "https://telestomotors.nl",
  telephone: "+31620929214",
  email: "info@telestomotors.nl",
  foundingDate: "2008",
  areaServed: {
    "@type": "Country",
    name: "Nederland",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "NL",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:30",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "00:00",
      closes: "00:00",
      description: "Op afspraak",
    },
  ],
  image: "https://telestomotors.nl/images/hero-bmw.jpg",
  logo: "https://telestomotors.nl/images/telesto-logo-color.svg",
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Auto-advies diensten",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Persoonlijke autoselectie",
          description:
            "Objectief zoeken naar de auto die bij jouw leven, wensen en budget past.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Technische keuring",
          description:
            "Grondig voertuig keuren voor aankoop zodat je weet wat je koopt.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Prijsonderhandeling",
          description:
            "Namens jou onderhandelen voor de scherpste prijs en voorwaarden.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={openSans.variable}>
      <head>
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Zonder JS reveal't ScrollAnimator niets — toon de inhoud dan direct. */}
        <noscript>
          {/* eslint-disable-next-line react/no-danger */}
          <style dangerouslySetInnerHTML={{ __html: '.animate-on-scroll{opacity:1 !important}' }} />
        </noscript>
      </head>
      <body className="font-sans">
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
