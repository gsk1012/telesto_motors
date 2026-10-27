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
  async headers() {
    // CSP staat eerst op "report-only": schendingen verschijnen in de browserconsole
    // zonder iets te blokkeren. Zet hem op "Content-Security-Policy" zodra een
    // rondje door de site geen meldingen meer geeft. frame-ancestors werkt niet in
    // report-only, daarom blokkeert X-Frame-Options het insluiten alvast.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
      "font-src 'self' data:",
      "media-src 'self'",
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
      "frame-src https://calendly.com https://assets.calendly.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy-Report-Only", value: csp },
        ],
      },
    ];
  },
  async redirects() {
    return [{ source: "/plans", destination: "/pakketten", permanent: true }];
  },
};

export default nextConfig;
