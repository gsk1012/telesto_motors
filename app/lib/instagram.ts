import "server-only";

export const IG_URL = "https://www.instagram.com/telesto.motors";

export type InstagramPost = { src: string; alt: string; href: string };

// Hoeveel posts we tonen (Behold gratis tier levert er t/m 6 in de JSON-feed).
const LIMIT = 6;

// Behold verversen we hoogstens elke 6 uur, gedeeld over alle bezoekers.
// Dat houdt het gratis maandbudget van 1.200 "views" ruim binnen bereik,
// ongeacht hoeveel mensen de site openen.
const REVALIDATE_SECONDS = 6 * 60 * 60;

// Eerste regel van het onderschrift, zonder hashtags, als beeldbeschrijving.
function captionToAlt(caption?: string): string {
  if (!caption) return "Telesto Motors";
  const firstLine = caption
    .split("\n")[0]
    .replace(/#[^\s]+/g, "")
    .trim();
  return firstLine ? firstLine.slice(0, 120) : "Telesto Motors";
}

type BeholdSize = { mediaUrl: string; width: number; height: number };

type BeholdPost = {
  permalink?: string;
  prunedCaption?: string;
  caption?: string;
  sizes?: { large?: BeholdSize; medium?: BeholdSize; small?: BeholdSize };
};

type BeholdFeed = { posts?: BeholdPost[] };

/**
 * Leest de Behold JSON-feed. Geeft `null` terug bij elke fout of als de
 * feed-URL niet is geconfigureerd, zodat de aanroeper op de lokale
 * fallback-afbeeldingen kan terugvallen.
 */
export async function getInstagramPosts(): Promise<InstagramPost[] | null> {
  const feedUrl = process.env.BEHOLD_FEED_URL;
  if (!feedUrl) return null;

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["instagram"] },
    });
    if (!res.ok) return null;

    const data: BeholdFeed = await res.json();
    const posts = (data.posts ?? [])
      .slice(0, LIMIT)
      .map((p): InstagramPost | null => {
        const src = p.sizes?.large?.mediaUrl ?? p.sizes?.medium?.mediaUrl;
        if (!src) return null;
        return {
          src,
          href: p.permalink ?? IG_URL,
          alt: captionToAlt(p.prunedCaption ?? p.caption),
        };
      })
      .filter((p): p is InstagramPost => p !== null);

    return posts.length ? posts : null;
  } catch {
    return null;
  }
}
