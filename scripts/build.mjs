/**
 * Production build: routing config + SEO meta + sitemap + robots
 */
import { spawnSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const node = process.execPath;

function run(script) {
  const r = spawnSync(node, [join(root, "scripts", script)], { stdio: "inherit", cwd: root });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

console.log("=== Teen Patti Gold production build ===\n");
run("write-vercel-routes.mjs");
run("write-htaccess.mjs");
run("apply-page-seo.mjs");
run("seo-home-head.mjs");
run("generate-sitemap.mjs");
run("copy-clean-urls.mjs");
console.log("\n=== Build complete — deploy the repo root to Vercel or Hostinger ===");
