/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Instagram-beelden komen van de Behold-feed. Door de host hier toe te
    // staan gaan ze door de Next-optimizer (AVIF/WebP + resize op maat van de
    // slide) in plaats van als originele JPEG's van ~150 KB per stuk.
    remotePatterns: [{ protocol: "https", hostname: "behold.pictures" }],
    // Next cachet geoptimaliseerde afbeeldingen standaard maar 60 seconden —
    // terugkerende bezoekers halen dan elk beeld opnieuw op. 30 dagen vangt
    // vrijwel alle herhaalbezoeken. Bewust geen jaar: wordt een foto ooit onder
    // dezelfde bestandsnaam vervangen, dan blijft de oude niet eindeloos hangen.
    minimumCacheTTL: 2592000,
  },
  // Bespaart een paar honderd bytes per response en scheelt een render-stap.
  poweredByHeader: false,
};

export default nextConfig;
