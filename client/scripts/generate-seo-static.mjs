import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SITE_ORIGIN, ORDERED_ROUTE_PATHS, ROUTE_SEO } from '../src/seo/routeSeoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

const siteOrigin = (
    process.env.VITE_SITE_URL ||
    process.env.SITE_URL ||
    DEFAULT_SITE_ORIGIN
)
    .trim()
    .replace(/\/$/, '');

const escapeHtml = (value) =>
    String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');

const replaceOrInjectInHead = (html, pattern, replacement) => {
    if (pattern.test(html)) {
        return html.replace(pattern, replacement);
    }
    return html.replace('</head>', `  ${replacement}\n  </head>`);
};

const toCanonicalUrl = (routePath) => (routePath === '/' ? siteOrigin : `${siteOrigin}${routePath}`);

const buildStructuredDataJson = (seo, canonicalUrl) =>
    JSON.stringify(
        [
            {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Facto Research',
                alternateName: ['factoresearch', 'FactoResearch'],
                url: siteOrigin,
                email: 'support@factoresearch.com',
                logo: 'https://img1.wsimg.com/isteam/ip/890c2873-45ef-40f0-a650-7817ddb60ef4/Untitled%20(512%20x%20512%20px).png/:/rs=w:178,h:178,cg:true,m/cr=w:178,h:178/qt=q:95',
            },
            {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Facto Research',
                alternateName: ['factoresearch', 'FactoResearch'],
                url: siteOrigin,
            },
            {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: seo.heading,
                url: canonicalUrl,
                description: seo.description,
                isPartOf: {
                    '@type': 'WebSite',
                    name: 'Facto Research',
                    url: siteOrigin,
                },
            },
        ],
        null,
        2
    ).replace(/</g, '\\u003c');

const fallbackLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
];

const buildFallbackHtml = (routePath, seo) => {
    const currentPath = routePath === '/' ? 'Home' : seo.heading;
    const links = fallbackLinks
        .map((item) => `<a href="${item.path}">${escapeHtml(item.label)}</a>`)
        .join(' | ');

    return `<main id="seo-static-content" aria-label="Facto Research Overview">
      <h1>${escapeHtml(seo.heading)}</h1>
      <p>${escapeHtml(seo.description)}</p>
      <p>Current page: ${escapeHtml(currentPath)}</p>
      <p>${links}</p>
    </main>`;
};

const applySeoToHtml = (baseHtml, routePath, seo) => {
    const canonicalUrl = toCanonicalUrl(routePath);
    let html = baseHtml;

    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);

    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="description" content="${escapeHtml(seo.description)}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="googlebot"\s+content="[\s\S]*?"\s*\/?>/i,
        '<meta name="googlebot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />'
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="author"\s+content="[\s\S]*?"\s*\/?>/i,
        '<meta name="author" content="Facto Research" />'
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="theme-color"\s+content="[\s\S]*?"\s*\/?>/i,
        '<meta name="theme-color" content="#0f172a" />'
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:title" content="${escapeHtml(seo.title)}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:description" content="${escapeHtml(seo.description)}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/i,
        '<meta property="og:image" content="https://img1.wsimg.com/isteam/ip/890c2873-45ef-40f0-a650-7817ddb60ef4/Untitled%20(512%20x%20512%20px).png/:/rs=w:512,h:512,cg:true,m/cr=w:512,h:512/qt=q:95" />'
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/?>/i,
        '<meta name="twitter:image" content="https://img1.wsimg.com/isteam/ip/890c2873-45ef-40f0-a650-7817ddb60ef4/Untitled%20(512%20x%20512%20px).png/:/rs=w:512,h:512,cg:true,m/cr=w:512,h:512/qt=q:95" />'
    );
    html = replaceOrInjectInHead(
        html,
        /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
        `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<script\s+id="seo-jsonld"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
        `<script id="seo-jsonld" type="application/ld+json">\n${buildStructuredDataJson(
            seo,
            canonicalUrl
        )}\n    </script>`
    );

    html = html.replace(/<main\s+id="seo-static-content"[\s\S]*?<\/main>/i, buildFallbackHtml(routePath, seo));

    return html;
};

const writeRouteHtml = async (routePath, html) => {
    if (routePath === '/') {
        await fs.writeFile(indexHtmlPath, html, 'utf8');
        return;
    }

    const routeDir = path.join(distDir, routePath.slice(1));
    await fs.mkdir(routeDir, { recursive: true });
    await fs.writeFile(path.join(routeDir, 'index.html'), html, 'utf8');
};

const buildSitemap = () => {
    const today = new Date().toISOString().slice(0, 10);

    const urls = ORDERED_ROUTE_PATHS.map((routePath) => {
        const seo = ROUTE_SEO[routePath];
        return `  <url>
    <loc>${escapeHtml(toCanonicalUrl(routePath))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${seo.changefreq}</changefreq>
    <priority>${seo.priority}</priority>
  </url>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

const buildRobots = () => `User-agent: *
Allow: /

Sitemap: ${siteOrigin}/sitemap.xml
`;

const run = async () => {
    const baseHtml = await fs.readFile(indexHtmlPath, 'utf8');

    for (const routePath of ORDERED_ROUTE_PATHS) {
        const seo = ROUTE_SEO[routePath];
        const routeHtml = applySeoToHtml(baseHtml, routePath, seo);
        await writeRouteHtml(routePath, routeHtml);
    }

    await fs.writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(), 'utf8');
    await fs.writeFile(path.join(distDir, 'robots.txt'), buildRobots(), 'utf8');

    console.log(`Generated SEO static pages for ${ORDERED_ROUTE_PATHS.length} routes.`);
};

run().catch((error) => {
    console.error('Failed to generate SEO static assets:', error);
    process.exitCode = 1;
});
