import { DOMAIN, SITE } from "./config.mjs";

export const OG_IMAGE = `${DOMAIN}/public/favicon/web-app-manifest-512x512.png`;
export const OG_IMAGE_ALT = "Teen Patti Gold — official online teen patti app logo";

export function pageUrl(path) {
  return path === "/" ? `${DOMAIN}/` : `${DOMAIN}${path}`;
}

export function hreflangLinks(path) {
  const url = pageUrl(path);
  return `    <link rel="alternate" hreflang="en-IN" href="${url}" />
    <link rel="alternate" hreflang="en" href="${url}" />
    <link rel="alternate" hreflang="x-default" href="${url}" />`;
}

export function sharedHeadExtras() {
  return `    <meta name="author" content="${SITE.name}" />
    <meta name="theme-color" content="#2d0505" />
    <meta name="geo.region" content="IN" />
    <meta name="geo.placename" content="India" />
    <link rel="icon" href="/public/favicon/favicon.ico" sizes="any" />
    <link rel="icon" href="/public/favicon/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/public/favicon/favicon-96x96.png" type="image/png" sizes="96x96" />
    <link rel="apple-touch-icon" href="/public/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="/public/favicon/site.webmanifest" />`;
}

export function socialMeta(page, escape) {
  const url = pageUrl(page.path);
  return `    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:alt" content="${OG_IMAGE_ALT}" />
    <meta property="og:image:width" content="512" />
    <meta property="og:image:height" content="512" />
    <meta property="og:site_name" content="${SITE.name}" />
    <meta property="og:locale" content="en_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <meta name="twitter:image:alt" content="${OG_IMAGE_ALT}" />`;
}
