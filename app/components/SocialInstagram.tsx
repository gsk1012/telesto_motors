import InstagramSlider from "./InstagramSlider";
import { getInstagramPosts, IG_URL, type InstagramPost } from "../lib/instagram";

/*
 * Fallback: lokale vierkanten in public/images/instagram/. Deze worden getoond
 * zolang de Behold-feed (nog) niet is geconfigureerd of onbereikbaar is, zodat
 * de sectie nooit leeg staat.
 */
const FALLBACK: InstagramPost[] = [
  { src: "/images/instagram/post-1.jpg", alt: "Telesto Motors selectie", href: IG_URL },
  { src: "/images/instagram/post-2.jpg", alt: "Audi", href: IG_URL },
  { src: "/images/instagram/post-3.jpg", alt: "Porsche", href: IG_URL },
  { src: "/images/instagram/post-4.jpg", alt: "Telesto Motors", href: IG_URL },
  { src: "/images/instagram/post-5.jpg", alt: "Droomauto", href: IG_URL },
];

export default async function SocialInstagram() {
  const live = await getInstagramPosts();
  const posts = live && live.length ? live : FALLBACK;
  return <InstagramSlider posts={posts} />;
}
