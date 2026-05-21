# Rummy Gold — Marketing Site

Static SEO site for **Rummy Gold** (HTML/CSS/JS). Deploy the repository root to **Vercel** or **Hostinger**.

## Production deploy

1. Set your live domain and APK URL in `js/site-config.js` and `scripts/config.mjs` (keep both in sync).
2. Run the production build:

   ```bash
   npm run build
   ```

3. Deploy the whole project root (not a subfolder).
4. In **Google Search Console**, submit `https://www.rummygold.com/sitemap.xml`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local server with clean URLs (`/games`, `/download`, …) |
| `npm run build` | Regenerate `vercel.json`, `.htaccess`, SEO meta, `sitemap.xml`, `robots.txt` |
| `npm run seo` | Meta tags + sitemap only (after editing page copy) |

## SEO structure

- **25 indexable URLs** in `sitemap.xml` (clean paths, no `.html`)
- Per-page: title, description, keywords, canonical, Open Graph, Twitter, JSON-LD (WebPage, Breadcrumb, FAQ where applicable)
- Home: SoftwareApplication, Organization, FAQPage, WebSite schema
- `robots.txt` at site root; `/404` disallowed

## URL map

Defined in `scripts/url-routes.mjs`. Page copy and SEO data in `scripts/seo-pages-data.mjs`.

## Before launch checklist

- [ ] Update `downloadUrl` in `js/site-config.js`
- [ ] Confirm domain in `scripts/config.mjs`
- [ ] Verify app store ratings match JSON-LD on the home page
- [ ] Add real blog posts or set `/blog` to `noindex` in `seo-pages-data.mjs`
