import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { PAGES, DOMAIN } from "./seo-pages-data.mjs";
import { ROUTES } from "./url-routes.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fileByClean = new Map(ROUTES.map((r) => [r.clean, r.file]));

function escape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function slugFromPath(path) {
  return path.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home";
}

function pageUrl(page) {
  return page.path === "/" ? `${DOMAIN}/` : `${DOMAIN}${page.path}`;
}

function buildMetaTags(page) {
  const url = pageUrl(page);
  const robots = page.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const canonical = page.noindex ? "" : `    <link rel="canonical" href="${url}" />\n`;
  return `<title>${escape(page.title)}</title>
    <meta name="description" content="${escape(page.description)}" />
    <meta name="keywords" content="${escape(page.keywords)}" />
    <meta name="robots" content="${robots}" />
${canonical}    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:image" content="${DOMAIN}/public/favicon/web-app-manifest-512x512.png" />
    <meta property="og:site_name" content="Rummy Gold" />
    <meta property="og:locale" content="en_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="${DOMAIN}/public/favicon/web-app-manifest-512x512.png" />`;
}

function breadcrumbItems(path) {
  const items = [{ name: "Home", path: "/" }];
  if (path === "/") return items;
  const parts = path.split("/").filter(Boolean);
  let acc = "";
  for (const part of parts) {
    acc += `/${part}`;
    const label = part
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    items.push({ name: label, path: acc });
  }
  return items;
}

function buildPageSchema(page) {
  if (page.path === "/" || page.skipSeoBlock) return "";
  const url = pageUrl(page);
  const crumbs = breadcrumbItems(page.path);
  const blocks = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url,
      inLanguage: "en-IN",
      isPartOf: { "@type": "WebSite", name: "Rummy Gold", url: `${DOMAIN}/` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.path === "/" ? `${DOMAIN}/` : `${DOMAIN}${c.path}`,
      })),
    },
  ];
  if (page.faq?.length > 0) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return blocks
    .map(
      (b) =>
        `    <script type="application/ld+json" data-seo-page-schema>\n${JSON.stringify(b, null, 6).replace(/^/gm, "      ").trim()}\n    </script>`
    )
    .join("\n");
}

function upsertPageSchema(html, page) {
  const schema = buildPageSchema(page);
  html = html.replace(/\s*<script type="application\/ld\+json" data-seo-page-schema>[\s\S]*?<\/script>\s*/g, "\n");
  if (!schema) return html;
  return html.replace("</head>", `${schema}\n</head>`);
}

function buildSeoBlock(page) {
  const id = slugFromPath(page.path);
  const tags = page.tags
    .map((t) => `            <span class="keyword-tag">${escape(t)}</span>`)
    .join("\n");
  const faqItems = page.faq
    .map(
      (f) =>
        `          <details class="faq-item">\n            <summary>${escape(f.q)}</summary>\n            <p>${escape(f.a)}</p>\n          </details>`
    )
    .join("\n");
  const faqSection =
    page.faq.length > 0
      ? `
        <section class="page-mini-faq" aria-labelledby="page-faq-${id}">
          <h2 id="page-faq-${id}" class="section-heading page-seo-heading">Frequently asked questions</h2>
${faqItems}
          <p class="faq-hub-link"><a href="/#faq"><strong>View all Rummy Gold FAQ</strong> — download, bonuses, withdrawals &amp; more →</a></p>
        </section>`
      : `
        <section class="page-mini-faq page-mini-faq--link-only" aria-label="FAQ">
          <p class="faq-hub-link"><a href="/#faq"><strong>Rummy Gold FAQ</strong> — answers about download, APK, bonuses, legality &amp; payouts →</a></p>
        </section>`;

  return `
        <!-- SEO-PAGE-BLOCK -->
        <section class="page-keywords-section" aria-label="Related keywords">
          <h2 class="section-heading page-seo-heading">Related searches</h2>
          <div class="keywords-cloud">
${tags}
          </div>
        </section>${faqSection}
        <!-- /SEO-PAGE-BLOCK -->`;
}

function upsertMeta(html, page) {
  html = html.replace(/<title>[\s\S]*?<\/title>/, "");
  html = html.replace(/<meta name="description"[^>]*>\s*/g, "");
  html = html.replace(/<meta name="keywords"[^>]*>\s*/g, "");
  html = html.replace(/<meta name="robots"[^>]*>\s*/g, "");
  html = html.replace(/<link rel="canonical"[^>]*>\s*/g, "");
  html = html.replace(/<link rel="sitemap"[^>]*>\s*/g, "");
  html = html.replace(/<meta property="og:[^"]+"[^>]*>\s*/g, "");
  html = html.replace(/<meta name="twitter:[^"]+"[^>]*>\s*/g, "");

  const meta = buildMetaTags(page);
  return html.replace(/(<meta name="viewport"[^>]*>\s*)/, `$1${meta}\n    `);
}

function upsertSeoBlock(html, page) {
  if (page.skipSeoBlock) return html;
  const block = buildSeoBlock(page);
  html = html.replace(/\s*<!-- SEO-PAGE-BLOCK -->[\s\S]*?<!-- \/SEO-PAGE-BLOCK -->\s*/g, "\n");

  if (html.includes('class="seo-cta-box"')) {
    return html.replace(/(\s*)(<div class="seo-cta-box")/, `${block}$1$2`);
  }
  if (html.includes("</article>")) {
    return html.replace("</article>", `${block}\n      </article>`);
  }
  return html.replace(/<\/main>/, `${block}\n    </main>`);
}

function headerHasFaq(html) {
  const nav = html.match(/<nav aria-label="Main navigation" class="header-nav">[\s\S]*?<\/nav>/);
  return nav && nav[0].includes('href="/#faq"');
}

function mobileHasFaq(html) {
  const nav = html.match(/<nav id="mobile-nav"[\s\S]*?<\/nav>/);
  return nav && nav[0].includes('href="/#faq"');
}

function addFaqToNav(html) {
  if (headerHasFaq(html)) return html;
  return html.replace(
    /(<nav aria-label="Main navigation" class="header-nav">)/,
    `$1\n            <a href="/#faq">FAQ</a>`
  );
}

function addFaqToMobileNav(html) {
  if (mobileHasFaq(html)) return html;
  return html.replace(
    /(<nav id="mobile-nav"[\s\S]*?<ul>)/,
    `$1\n            <li><a href="/#faq">FAQ</a></li>`
  );
}

function fixLogoAlt(html) {
  return html.replace(/<img(\s[\s\S]*?class="logo-img"[\s\S]*?)>/g, (tag) => {
    if (tag.includes('alt="Rummy Gold logo"')) return tag;
    if (/\salt=""/.test(tag)) return tag.replace(/\salt=""/, ' alt="Rummy Gold logo"');
    return tag.replace(/>$/, ' alt="Rummy Gold logo">');
  });
}

function processFile(absPath, page) {
  let html = readFileSync(absPath, "utf8");
  html = upsertMeta(html, page);
  html = upsertPageSchema(html, page);
  html = upsertSeoBlock(html, page);
  html = fixLogoAlt(html);
  if (!page.noindex) {
    html = addFaqToNav(html);
    html = addFaqToMobileNav(html);
  }
  writeFileSync(absPath, html);
  console.log("seo:", page.path);
}

function resolveRel(page) {
  if (page.file) return page.file;
  const fromRoute = fileByClean.get(page.path);
  if (fromRoute) return fromRoute;
  if (page.path === "/") return "index.html";
  if (page.path.startsWith("/pages/")) return page.path.slice(1);
  return null;
}

for (const page of PAGES) {
  const rel = resolveRel(page);
  if (!rel) {
    console.warn("skip (no file):", page.path);
    continue;
  }
  const abs = join(root, rel);
  try {
    processFile(abs, page);
  } catch (e) {
    console.warn("skip", rel, e.message);
  }
}
