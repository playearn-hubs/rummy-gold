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
  /<meta\s+name="description"\s+content="Download Teen Patti Gold —[\s\S]*?\/>\s*/i,
  ""
);
html = html.replace(
  /<meta\s+name="keywords"\s+content="teen patti gold, teen patti gold app[\s\S]*?\/>\s*/i,
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
  description: "Official Teen Patti Gold website — download APK, play Teen Patti online, card games, bonuses & guides.",
  inLanguage: "en-IN",
  publisher: { "@type": "Organization", "@id": `${DOMAIN}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${DOMAIN}/download?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  url: `${DOMAIN}/`,
  applicationCategory: "GameApplication",
  operatingSystem: "Android, iOS",
  downloadUrl: `${DOMAIN}/download`,
  installUrl: `${DOMAIN}/download`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SITE.rating,
    ratingCount: SITE.ratingCount,
    bestRating: "5",
    worstRating: "1",
  },
  description:
    "Teen Patti Gold is the official Teen Patti app for live tables, real cash play, rummy, poker, and secure instant withdrawals.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${DOMAIN}/#organization`,
  name: SITE.name,
  url: `${DOMAIN}/`,
  logo: OG_IMAGE,
  description: "Leading online Teen Patti and card games platform with secure gameplay, bonuses, and 24/7 customer support.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: SITE.supportEmail,
    availableLanguage: ["English", "Hindi"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I download Teen Patti Gold APK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit teenpattigoldx.com, tap Download APK, allow installation on Android or use the iOS link, then register and play Teen Patti.",
      },
    },
    {
      "@type": "Question",
      name: "Is Teen Patti Gold a real cash Teen Patti app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Teen Patti Gold offers real cash Teen Patti and card games where permitted by law. Players must be 18+ and play responsibly.",
      },
    },
    {
      "@type": "Question",
      name: "What games are available on Teen Patti Gold?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Teen Patti Gold includes Teen Patti, rummy, poker, fantasy cricket, casino games, and slots — all in one app download.",
      },
    },
    {
      "@type": "Question",
      name: "Is Teen Patti Gold safe and legal in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Teen Patti Gold uses encrypted transactions, certified fair play, and operates where online skill gaming is legally permitted. Always check your state laws.",
      },
    },
    {
      "@type": "Question",
      name: "How fast are withdrawals on Teen Patti Gold?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Verified players enjoy fast, secure withdrawals to UPI, bank transfer, and other supported payment methods.",
      },
    },
  ],
};

const schemaBlocks = [websiteSchema, softwareAppSchema, organizationSchema, faqSchema]
  .map((schema) => `<script type="application/ld+json">\n${JSON.stringify(schema, null, 6)}\n    </script>`)
  .join("\n");

html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "\n");
html = html.replace(
  /(<meta name="apple-mobile-web-app-title"[^>]*>\s*)/,
  `$1\n${schemaBlocks}\n    `
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
