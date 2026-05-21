/**
 * Clean URL map — public path (no .html) → file on disk
 */
import { DOMAIN } from "./config.mjs";
export { DOMAIN };

export const ROUTES = [
  { clean: "/", file: "index.html" },
  { clean: "/download", file: "pages/download.html" },
  { clean: "/contact-us", file: "pages/contact.html" },
  { clean: "/privacy-policy", file: "pages/privacy.html" },
  { clean: "/disclaimer", file: "pages/terms.html" },
  { clean: "/responsible-gaming", file: "pages/responsible-gaming.html" },
  { clean: "/refer-and-earn", file: "pages/refer.html" },
  { clean: "/blog", file: "pages/blog.html" },
  { clean: "/games", file: "pages/games/index.html" },
  { clean: "/games/online-rummy", file: "pages/games/online-rummy.html" },
  { clean: "/games/teen-patti", file: "pages/games/teen-patti.html" },
  { clean: "/games/poker", file: "pages/games/poker.html" },
  { clean: "/games/fantasy-cricket", file: "pages/games/fantasy-cricket.html" },
  { clean: "/games/casino-games", file: "pages/games/casino-games.html" },
  { clean: "/games/slots", file: "pages/games/slots.html" },
  { clean: "/bonuses", file: "pages/bonuses/index.html" },
  { clean: "/bonuses/welcome-bonus", file: "pages/bonuses/welcome-bonus.html" },
  { clean: "/bonuses/referral-bonus", file: "pages/bonuses/referral-bonus.html" },
  { clean: "/bonuses/daily-cashback", file: "pages/bonuses/daily-cashback.html" },
  { clean: "/bonuses/first-deposit", file: "pages/bonuses/first-deposit.html" },
  { clean: "/how-to-play", file: "pages/how-to-play/index.html" },
  { clean: "/how-to-play/rummy", file: "pages/how-to-play/how-to-play-rummy.html" },
  { clean: "/how-to-play/rummy-rules", file: "pages/how-to-play/rummy-rules.html" },
  { clean: "/how-to-play/teen-patti-rules", file: "pages/how-to-play/teen-patti-rules.html" },
  { clean: "/how-to-play/poker-hand-rankings", file: "pages/how-to-play/poker-hand-rankings.html" },
];

/** Legacy paths → clean (longest first when sorting) */
export function buildLegacyMap() {
  const map = new Map();
  for (const { clean, file } of ROUTES) {
    if (clean === "/") continue;
    const legacyHtml = `/${file}`;
    const legacyClean = legacyHtml.replace(/\.html$/, "");
    map.set(legacyHtml, clean);
    map.set(legacyClean, clean);
    // old /pages/... only
    if (file.startsWith("pages/")) {
      map.set(`/${file.replace(/^pages\//, "pages/")}`, clean);
    }
  }
  return map;
}

export function getLegacyReplacements() {
  const pairs = [];
  for (const { clean, file } of ROUTES) {
    if (clean === "/") continue;
    pairs.push([`/${file}`, clean]);
    pairs.push([`/${file.replace(/\.html$/, "")}`, clean]);
    pairs.push([`${DOMAIN}/${file}`, `${DOMAIN}${clean}`]);
    pairs.push([`${DOMAIN}/${file.replace(/\.html$/, "")}`, `${DOMAIN}${clean}`]);
  }
  pairs.sort((a, b) => b[0].length - a[0].length);
  return pairs;
}

export function canonicalUrl(clean) {
  return clean === "/" ? `${DOMAIN}/` : `${DOMAIN}${clean}`;
}

/** Update seo-pages-data path: fields */
export const SEO_PATH_UPDATES = ROUTES.filter((r) => r.clean !== "/").map((r) => ({
  from: `/${r.file}`,
  to: r.clean,
}));
