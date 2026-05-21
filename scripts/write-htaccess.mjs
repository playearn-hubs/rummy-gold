import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ROUTES } from "./url-routes.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const rules = [];
const redirects = [];

for (const { clean, file } of ROUTES) {
  if (clean === "/") continue;
  const legacy = file;
  rules.push(`  RewriteRule ^${clean.slice(1)}$ ${legacy} [L]`);
  redirects.push(`  RewriteRule ^${legacy.replace(/\./g, "\\.")}$ ${clean} [R=301,L]`);
  redirects.push(`  RewriteRule ^${legacy.replace(/\.html$/, "").replace(/\./g, "\\.")}$ ${clean} [R=301,L]`);
}

const htaccess = `# Hostinger (Apache) — upload site contents to public_html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirect old /pages/*.html URLs to clean URLs (SEO)
${redirects.join("\n")}

  # Serve clean URLs from page files
${rules.join("\n")}

  # Remove trailing slash
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)/$ /$1 [L,R=301]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 day"
  ExpiresByType application/javascript "access plus 1 day"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

ErrorDocument 404 /pages/404.html
`;

writeFileSync(join(root, ".htaccess"), htaccess);
console.log("Wrote .htaccess with clean URL rules");
