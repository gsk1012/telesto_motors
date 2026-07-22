import InstagramSlider, { type InstagramPost } from "./InstagramSlider";

const IG_URL = "https://www.instagram.com/telesto.motors";

/*
 * Demo-build: geen live Instagram-koppeling, alleen de lokale vierkanten in
 * public/images/instagram/.
 */
const FALLBACK: InstagramPost[] = [
  { src: "/images/instagram/post-1.jpg", alt: "Telesto Motors selectie", href: IG_URL },
  { src: "/images/instagram/post-2.jpg", alt: "Audi", href: IG_URL },
  { src: "/images/instagram/post-3.jpg", alt: "Porsche", href: IG_URL },
  { src: "/images/instagram/post-4.jpg", alt: "Telesto Motors", href: IG_URL },
  { src: "/images/instagram/post-5.jpg", alt: "Droomauto", href: IG_URL },
];

export default function SocialInstagram() {
  return <InstagramSlider posts={FALLBACK} />;
}
