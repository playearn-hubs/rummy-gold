import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ROUTES } from "./url-routes.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const rewrites = [
  { source: "/favicon.ico", destination: "/public/favicon/favicon.ico" },
  ...ROUTES.filter((r) => r.clean !== "/").map((r) => ({
    source: r.clean,
    destination: `/${r.file}`,
  })),
];

const redirects = [];
for (const { clean, file } of ROUTES) {
  if (clean === "/") continue;
  const legacy = `/${file}`;
  const legacyNoExt = legacy.replace(/\.html$/, "");
  redirects.push({ source: legacy, destination: clean, permanent: true });
  if (legacyNoExt !== legacy) {
    redirects.push({ source: legacyNoExt, destination: clean, permanent: true });
  }
}

const vercel = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  buildCommand: null,
  outputDirectory: ".",
  cleanUrls: true,
  trailingSlash: false,
  redirects,
  rewrites,
  headers: [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
    {
      source: "/public/favicon/(.*)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
    {
      source: "/public/assets/(.*)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
    {
      source: "/css/(.*)",
      headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
    },
    {
      source: "/js/(.*)",
      headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
    },
  ],
};

writeFileSync(join(root, "vercel.json"), JSON.stringify(vercel, null, 2) + "\n");
console.log(`vercel.json: ${rewrites.length} rewrites, ${redirects.length} redirects (no legacy routes block)`);
