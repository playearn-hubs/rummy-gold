/**
 * Local dev server with clean URL rewrites (same rules as serve.json / vercel.json)
 * Usage: node scripts/dev-server.mjs
 */
import { createServer } from "http";
import { readFileSync, existsSync, statSync } from "fs";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";
import { ROUTES } from "./url-routes.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.argv[2] || process.env.PORT) || 3000;

const rewriteMap = new Map();
for (const { clean, file } of ROUTES) {
  if (clean !== "/") rewriteMap.set(clean, join(root, file));
}

const redirectMap = new Map();
for (const { clean, file } of ROUTES) {
  if (clean === "/") continue;
  redirectMap.set(`/${file}`, clean);
  redirectMap.set(`/${file.replace(/\.html$/, "")}`, clean);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

function serveFile(res, filePath) {
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(`Not found: ${filePath}`);
    return;
  }
  const ext = extname(filePath);
  const type = MIME[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type });
  res.end(readFileSync(filePath));
}

createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  if (redirectMap.has(pathname)) {
    res.writeHead(301, { Location: redirectMap.get(pathname) });
    res.end();
    return;
  }

  if (rewriteMap.has(pathname)) {
    serveFile(res, rewriteMap.get(pathname));
    return;
  }

  if (pathname === "/") {
    serveFile(res, join(root, "index.html"));
    return;
  }

  const diskPath = join(root, pathname.slice(1));
  if (existsSync(diskPath) && statSync(diskPath).isFile()) {
    serveFile(res, diskPath);
    return;
  }

  if (existsSync(diskPath + ".html")) {
    serveFile(res, diskPath + ".html");
    return;
  }

  const notFound = join(root, "pages/404.html");
  if (existsSync(notFound)) {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(readFileSync(notFound));
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end(`Cannot GET ${pathname}`);
}).listen(PORT, () => {
  console.log(`Teen Patti Gold dev server: http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/games`);
});
