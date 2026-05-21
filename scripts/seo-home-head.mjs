/**
 * Remove duplicate / conflicting meta on index.html (keeps single canonical set + schema + extras)
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { DOMAIN } from "./config.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const path = join(root, "index.html");
let html = readFileSync(path, "utf8");

html = html.replace(/<meta\s+name="title"[^>]*>\s*/gi, "");
html = html.replace(
  /<meta\s+name="description"\s+content="Download Rummy Gold —[\s\S]*?\/>\s*/i,
  ""
);
html = html.replace(
  /<meta\s+name="keywords"\s+content="rummy gold, rummy gold app[\s\S]*?\/>\s*/i,
  ""
);
html = html.replace(
  /<meta\s+property="og:description"\s+content="Play 13-card[\s\S]*?\/>\s*/i,
  ""
);
html = html.replace(
  /<meta\s+name="twitter:description"\s+content="India's premium[\s\S]*?\/>\s*/i,
  ""
);

if (!html.includes('"@type": "WebSite"')) {
  const websiteSchema = `    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Rummy Gold",
        "url": "${DOMAIN}/",
        "description": "Official Rummy Gold website — download APK, bonuses, and online Indian rummy guides.",
        "publisher": { "@type": "Organization", "name": "Rummy Gold" },
        "inLanguage": "en-IN"
      }
    </script>
`;
  html = html.replace(
    /(<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema.org",\s*"@type": "SoftwareApplication")/,
    `${websiteSchema}$1`
  );
}

if (!html.includes("seo-pages.css")) {
  html = html.replace(
    /(<link rel="stylesheet" href="\/css\/landing.css" \/>)/,
    `$1\n    <link rel="stylesheet" href="/css/seo-pages.css" />`
  );
}

writeFileSync(path, html);
console.log("seo-home-head: deduped index.html meta");
