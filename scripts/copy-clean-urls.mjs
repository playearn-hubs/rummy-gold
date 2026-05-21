/**
 * Copy HTML to clean URL folders so Vercel/Apache serve /privacy-policy without rewrites.
 * e.g. pages/privacy.html → privacy-policy/index.html
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ROUTES } from "./url-routes.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

for (const { clean, file } of ROUTES) {
  if (clean === "/") continue;
  const outDir = join(root, clean.slice(1));
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
}

for (const { clean, file } of ROUTES) {
  if (clean === "/") continue;
  const src = join(root, file);
  const outDir = join(root, clean.slice(1));
  const dest = join(outDir, "index.html");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(dest, readFileSync(src, "utf8"));
}

console.log(`copy-clean-urls: ${ROUTES.length - 1} routes → */index.html at site root`);
