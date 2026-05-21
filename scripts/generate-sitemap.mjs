import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { PAGES } from "./seo-pages-data.mjs";
import { DOMAIN } from "./config.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const lastmod = new Date().toISOString().slice(0, 10);

const urls = PAGES.filter((p) => !p.noindex && p.priority > 0)
  .sort((a, b) => b.priority - a.priority)
  .map((p) => {
    const loc = p.path === "/" ? `${DOMAIN}/` : `${DOMAIN}${p.path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(2)}</priority>
  </url>`;
  });

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync(join(root, "sitemap.xml"), xml);

const robots = `# Rummy Gold — https://www.rummygold.com
User-agent: *
Allow: /

Disallow: /404

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;

writeFileSync(join(root, "robots.txt"), robots);
console.log(`sitemap.xml: ${urls.length} URLs (${lastmod})`);
console.log("robots.txt: written at site root");
