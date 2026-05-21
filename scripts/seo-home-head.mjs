/**
 * Optimize index.html head for maximum SEO (schema, social, lang, no junk meta)
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { DOMAIN, SITE } from "./config.mjs";
import { hreflangLinks, OG_IMAGE, OG_IMAGE_ALT } from "./seo-meta.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const path = join(root, "index.html");
let html = readFileSync(path, "utf8");

html = html.replace(/<html[^>]*>/, '<html lang="en-IN">');

html = html.replace(/<meta\s+name="title"[^>]*>\s*/gi, "");
html = html.replace(/<meta\s+name="revisit-after"[^>]*>\s*/gi, "");
html = html.replace(
  /<meta\s+name="description"\s+content="Download Rummy Gold —[\s\S]*?\/>\s*/i,
  ""
);
html = html.replace(
  /<meta\s+name="keywords"\s+content="rummy gold, rummy gold app[\s\S]*?\/>\s*/i,
  ""
);
html = html.replace(/<meta\s+property="og:description"\s+content="Play 13-card[\s\S]*?\/>\s*/i, "");
html = html.replace(/<meta\s+name="twitter:description"\s+content="India's premium[\s\S]*?\/>\s*/i, "");

if (!html.includes("og:image:alt")) {
  html = html.replace(
    /(<meta property="og:image" content="[^"]+" \/>)/,
    `$1\n    <meta property="og:image:alt" content="${OG_IMAGE_ALT}" />\n    <meta property="og:image:width" content="512" />\n    <meta property="og:image:height" content="512" />`
  );
  html = html.replace(
    /(<meta name="twitter:image" content="[^"]+" \/>)/,
    `$1\n    <meta name="twitter:image:alt" content="${OG_IMAGE_ALT}" />`
  );
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${DOMAIN}/#website`,
  name: SITE.name,
  url: `${DOMAIN}/`,
  description: "Official Rummy Gold website — download APK, play online Indian rummy, Teen Patti, bonuses & guides.",
  inLanguage: "en-IN",
  publisher: { "@type": "Organization", "@id": `${DOMAIN}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${DOMAIN}/download?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

html = html.replace(
  /<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema.org",\s*"@type": "WebSite"[\s\S]*?<\/script>\s*/,
  `<script type="application/ld+json">\n${JSON.stringify(websiteSchema, null, 6)}\n    </script>\n`
);

html = html.replace(
  /"@type": "SoftwareApplication"/,
  '"@type": "SoftwareApplication"'
);
html = html.replace(
  /("applicationCategory": "GameApplication",)/,
  `$1\n        "downloadUrl": "${DOMAIN}/download",\n        "installUrl": "${DOMAIN}/download",`
);
html = html.replace(
  /("@type": "Organization",\s*"name": "Rummy Gold",)/,
  `$1\n        "@id": "${DOMAIN}/#organization",`
);

if (!html.includes('rel="alternate" hreflang')) {
  html = html.replace(/(<link rel="canonical"[^>]*>\s*)/, `$1${hreflangLinks("/")}\n    `);
}

if (!html.includes("seo-pages.css")) {
  html = html.replace(
    /(<link rel="stylesheet" href="\/css\/landing.css" \/>)/,
    `$1\n    <link rel="stylesheet" href="/css/seo-pages.css" />`
  );
}

writeFileSync(path, html);
console.log("seo-home-head: optimized index.html");
