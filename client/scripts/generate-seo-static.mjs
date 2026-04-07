import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    BRAND_ALIASES,
    BRAND_REGISTRATION_NUMBER,
    DEFAULT_SEO_KEYWORDS,
    DEFAULT_SITE_ORIGIN,
    ORDERED_ROUTE_PATHS,
    ROUTE_SEO,
} from '../src/seo/routeSeoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const brandName = 'Facto Research';
const brandEmail = 'support@factoresearch.com';
const brandPhone = '+91 99599 37373';
const brandOgImageUrl =
    'https://img1.wsimg.com/isteam/ip/890c2873-45ef-40f0-a650-7817ddb60ef4/Untitled%20(512%20x%20512%20px).png/:/rs=w:512,h:512,cg:true,m/cr=w:512,h:512/qt=q:95';
const brandLogoUrl =
    'https://img1.wsimg.com/isteam/ip/890c2873-45ef-40f0-a650-7817ddb60ef4/Untitled%20(512%20x%20512%20px).png/:/rs=w:178,h:178,cg:true,m/cr=w:178,h:178/qt=q:95';
const brandOgImageAlt = 'Facto Research official brand logo';
const brandSocialUrls = [
    process.env.VITE_TWITTER_URL || process.env.TWITTER_URL || '',
    process.env.VITE_INSTAGRAM_URL || process.env.INSTAGRAM_URL || '',
    process.env.VITE_LINKEDIN_URL || process.env.LINKEDIN_URL || '',
    process.env.VITE_FACEBOOK_URL || process.env.FACEBOOK_URL || '',
    process.env.VITE_YOUTUBE_URL || process.env.YOUTUBE_URL || '',
]
    .map((value) => String(value || '').trim())
    .filter(Boolean);
const googleSiteVerification = (
    process.env.VITE_GOOGLE_SITE_VERIFICATION ||
    process.env.GOOGLE_SITE_VERIFICATION ||
    ''
)
    .trim();

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

const toPublicUrl = (routePath) => (routePath === '/' ? `${siteOrigin}/` : `${siteOrigin}${routePath}/`);

const resolveKeywords = (routeKeywords) => {
    if (typeof routeKeywords !== 'string' || !routeKeywords.trim()) {
        return DEFAULT_SEO_KEYWORDS;
    }

    const items = routeKeywords
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

    const seen = new Set(items.map((item) => item.toLowerCase()));
    for (const fallbackKeyword of DEFAULT_SEO_KEYWORDS.split(',').map((item) => item.trim())) {
        const key = fallbackKeyword.toLowerCase();
        if (!seen.has(key)) {
            seen.add(key);
            items.push(fallbackKeyword);
        }
    }

    return items.join(', ');
};

const buildStructuredDataJson = (seo, pageUrl) =>
    JSON.stringify(
        [
            {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': `${siteOrigin}/#organization`,
                name: brandName,
                alternateName: BRAND_ALIASES,
                url: siteOrigin,
                email: brandEmail,
                logo: brandLogoUrl,
                description: 'Official website of Facto Research, a SEBI-registered Research Analyst in India.',
                areaServed: 'IN',
                knowsAbout: ['Equity Research', 'Stock Market Analysis', 'Technical Analysis', 'Portfolio Research'],
                ...(brandSocialUrls.length ? { sameAs: brandSocialUrls } : {}),
                contactPoint: [
                    {
                        '@type': 'ContactPoint',
                        contactType: 'customer support',
                        email: brandEmail,
                        telephone: brandPhone,
                        areaServed: 'IN',
                        availableLanguage: ['en', 'hi', 'te'],
                    },
                ],
            },
            {
                '@context': 'https://schema.org',
                '@type': 'FinancialService',
                '@id': `${siteOrigin}/#financial-service`,
                name: brandName,
                alternateName: BRAND_ALIASES,
                url: siteOrigin,
                image: brandOgImageUrl,
                logo: brandLogoUrl,
                email: brandEmail,
                telephone: brandPhone,
                areaServed: 'IN',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Anantapur',
                    addressRegion: 'Andhra Pradesh',
                    addressCountry: 'IN',
                },
                description:
                    'Facto Research is a SEBI-registered Research Analyst in India providing equity research, market analysis, and investor-focused insights.',
                identifier: {
                    '@type': 'PropertyValue',
                    name: 'SEBI Registration Number',
                    value: BRAND_REGISTRATION_NUMBER,
                },
            },
            {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': `${siteOrigin}/#website`,
                name: brandName,
                alternateName: BRAND_ALIASES,
                url: siteOrigin,
                publisher: {
                    '@id': `${siteOrigin}/#organization`,
                },
                potentialAction: {
                    '@type': 'SearchAction',
                    target: `${siteOrigin}/?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                },
            },
            {
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                '@id': `${pageUrl}#webpage`,
                name: seo.heading,
                url: pageUrl,
                description: seo.description,
                isPartOf: {
                    '@id': `${siteOrigin}/#website`,
                },
                about: {
                    '@id': `${siteOrigin}/#organization`,
                },
                primaryImageOfPage: brandOgImageUrl,
            },
        ],
        null,
        2
    ).replace(/</g, '\\u003c');

const fallbackLinks = [
    { path: '/', label: 'Home' },
    { path: '/about/', label: 'About' },
    { path: '/services/', label: 'Services' },
    { path: '/pricing/', label: 'Pricing' },
    { path: '/contact/', label: 'Contact' },
    { path: '/accessibility/', label: 'Accessibility Statement' },
    { path: '/sitemap/', label: 'HTML Sitemap' },
];

const buildFallbackHtml = (routePath, seo) => {
    const currentPath = routePath === '/' ? 'Home' : seo.heading;
    const links = fallbackLinks
        .map((item) => `<a href="${item.path}">${escapeHtml(item.label)}</a>`)
        .join(' | ');

    return `<main id="seo-static-content" aria-label="Facto Research Overview">
      <h1>${escapeHtml(seo.heading)}</h1>
      <p>${escapeHtml(seo.description)}</p>
      <p>Facto Research is the official website of FactoResearch, a SEBI-registered Research Analyst in India.</p>
      <p>SEBI Registration Number: ${escapeHtml(BRAND_REGISTRATION_NUMBER)}</p>
      <p>Brand reference: FactoResearch (factoresearch.com).</p>
      <p>Current page: ${escapeHtml(currentPath)}</p>
      <p>${links}</p>
    </main>`;
};

const applySeoToHtml = (baseHtml, routePath, seo) => {
    const pageUrl = toPublicUrl(routePath);
    let html = baseHtml;

    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);

    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="description" content="${escapeHtml(seo.description)}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="robots"\s+content="[\s\S]*?"\s*\/?>/i,
        '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />'
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="keywords"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="keywords" content="${escapeHtml(resolveKeywords(seo.keywords))}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/?>/i,
        '<meta property="og:type" content="website" />'
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+property="og:site_name"\s+content="[\s\S]*?"\s*\/?>/i,
        '<meta property="og:site_name" content="Facto Research" />'
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
        /<meta\s+name="application-name"\s+content="[\s\S]*?"\s*\/?>/i,
        '<meta name="application-name" content="Facto Research" />'
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="theme-color"\s+content="[\s\S]*?"\s*\/?>/i,
        '<meta name="theme-color" content="#0f172a" />'
    );
    if (googleSiteVerification) {
        html = replaceOrInjectInHead(
            html,
            /<meta\s+name="google-site-verification"\s+content="[\s\S]*?"\s*\/?>/i,
            `<meta name="google-site-verification" content="${escapeHtml(googleSiteVerification)}" />`
        );
    }
    html = replaceOrInjectInHead(
        html,
        /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:title" content="${escapeHtml(seo.title)}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+property="og:locale"\s+content="[\s\S]*?"\s*\/?>/i,
        '<meta property="og:locale" content="en_IN" />'
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:description" content="${escapeHtml(seo.description)}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:image" content="${brandOgImageUrl}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+property="og:image:alt"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:image:alt" content="${brandOgImageAlt}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="twitter:card"\s+content="[\s\S]*?"\s*\/?>/i,
        '<meta name="twitter:card" content="summary_large_image" />'
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
        `<meta name="twitter:image" content="${brandOgImageUrl}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<meta\s+name="twitter:image:alt"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="twitter:image:alt" content="${brandOgImageAlt}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
        `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`
    );
    html = replaceOrInjectInHead(
        html,
        /<script\s+id="seo-jsonld"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
        `<script id="seo-jsonld" type="application/ld+json">\n${buildStructuredDataJson(seo, pageUrl)}\n    </script>`
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
    <loc>${escapeHtml(toPublicUrl(routePath))}</loc>
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
