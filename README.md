# Teen Patti Gold — Marketing Site

Static SEO site for **Teen Patti Gold** (HTML/CSS/JS). Deploy the repository root to **Vercel** or **Hostinger**.

## Production deploy

1. Set your live domain and APK URL in `js/site-config.js` and `scripts/config.mjs` (keep both in sync).
2. Run the production build:

   ```bash
   npm run build
   ```

3. Deploy the whole project root (not a subfolder). Vercel runs `copy-clean-urls` on deploy so `/privacy-policy` etc. work as real folders.

**Vercel project settings (if routes still 404):**
- Root Directory: leave empty (repo root)
- Framework Preset: **Other**
- Build Command: `node scripts/copy-clean-urls.mjs` (or leave blank if `vercel.json` sets it)
- Output Directory: `.` or leave empty
4. In **Google Search Console**, submit `https://www.teenpattigoldx.com/sitemap.xml`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local server with clean URLs (`/games`, `/download`, …) |
| `npm run build` | Regenerate `vercel.json`, `.htaccess`, SEO meta, `sitemap.xml`, `robots.txt` |
| `npm run seo` | Meta tags + sitemap only (after editing page copy) |

## SEO structure

- **24 indexable URLs** in `sitemap.xml` (clean paths; `/blog` noindex until you add posts)
- Per-page: title, description, keywords, canonical, hreflang, Open Graph/Twitter (with image alt), JSON-LD (Article on guides, WebPage, Breadcrumb, FAQ), internal related links, microdata FAQ
- Home: SoftwareApplication, Organization, FAQPage, WebSite schema
- `robots.txt` at site root; `/404` disallowed

## URL map

Defined in `scripts/url-routes.mjs`. Page copy and SEO data in `scripts/seo-pages-data.mjs`.

## Before launch checklist

- [ ] Update `downloadUrl` in `js/site-config.js`
- [ ] Confirm domain in `scripts/config.mjs`
- [ ] Verify app store ratings match JSON-LD on the home page
- [ ] Add real blog posts or set `/blog` to `noindex` in `seo-pages-data.mjs`
