import { BRAND_ALIASES, DEFAULT_SEO_KEYWORDS, DEFAULT_SITE_ORIGIN, ROUTE_SEO } from '../seo/routeSeoData';

const BRAND_NAME = 'Facto Research';
const BRAND_EMAIL = 'support@factoresearch.com';
const BRAND_LOGO_URL =
    'https://img1.wsimg.com/isteam/ip/890c2873-45ef-40f0-a650-7817ddb60ef4/Untitled%20(512%20x%20512%20px).png/:/rs=w:178,h:178,cg:true,m/cr=w:178,h:178/qt=q:95';
const BRAND_OG_IMAGE_URL =
    'https://img1.wsimg.com/isteam/ip/890c2873-45ef-40f0-a650-7817ddb60ef4/Untitled%20(512%20x%20512%20px).png/:/rs=w:512,h:512,cg:true,m/cr=w:512,h:512/qt=q:95';
const BRAND_OG_IMAGE_ALT = 'Facto Research official brand logo';

const normalizePath = (path) => {
    if (!path) return '/';
    const cleanPath = path.split('?')[0].split('#')[0] || '/';
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
        return cleanPath.slice(0, -1);
    }
    return cleanPath;
};

const escapeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

const getSiteOrigin = () => {
    const configured =
        (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) || '';
    if (typeof configured === 'string' && configured.trim()) {
        return configured.trim().replace(/\/$/, '');
    }

    if (typeof window !== 'undefined' && window.location?.origin) {
        return window.location.origin;
    }

    return DEFAULT_SITE_ORIGIN;
};

const toCanonicalUrl = (origin, path) => {
    if (path === '/') return origin;
    return `${origin}${path}`;
};

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

const upsertMeta = (attribute, key, content) => {
    const selector = `meta[${attribute}="${key}"]`;
    let tag = document.head.querySelector(selector);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
    }
    link.setAttribute('href', href);
};

const upsertStructuredData = (payload) => {
    const scriptId = 'seo-jsonld';
    let script = document.getElementById(scriptId);
    if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    script.textContent = escapeJson(payload);
};

export const applyRouteSeo = (path, options = {}) => {
    const { noindex = false } = options;
    const normalizedPath = normalizePath(path);
    const seo = ROUTE_SEO[normalizedPath] || ROUTE_SEO['/'];
    const origin = getSiteOrigin();
    const canonicalUrl = toCanonicalUrl(origin, normalizedPath);

    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta(
        'name',
        'robots',
        noindex
            ? 'noindex,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
            : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
    );
    upsertMeta(
        'name',
        'googlebot',
        noindex
            ? 'noindex,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
            : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
    );
    upsertMeta('name', 'author', BRAND_NAME);
    upsertMeta('name', 'application-name', BRAND_NAME);
    upsertMeta('name', 'keywords', resolveKeywords(seo.keywords));
    upsertMeta('name', 'theme-color', '#0f172a');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', BRAND_NAME);
    upsertMeta('property', 'og:locale', 'en_IN');
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', BRAND_OG_IMAGE_URL);
    upsertMeta('property', 'og:image:alt', BRAND_OG_IMAGE_ALT);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', BRAND_OG_IMAGE_URL);
    upsertMeta('name', 'twitter:image:alt', BRAND_OG_IMAGE_ALT);
    upsertLink('canonical', canonicalUrl);

    const organizationId = `${origin}/#organization`;
    const websiteId = `${origin}/#website`;

    const structuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': organizationId,
            name: BRAND_NAME,
            alternateName: BRAND_ALIASES,
            url: origin,
            email: BRAND_EMAIL,
            logo: BRAND_LOGO_URL,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': websiteId,
            name: BRAND_NAME,
            alternateName: BRAND_ALIASES,
            url: origin,
            publisher: {
                '@id': organizationId,
            },
            potentialAction: {
                '@type': 'SearchAction',
                target: `${origin}/?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
            },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${canonicalUrl}#webpage`,
            name: seo.heading,
            url: canonicalUrl,
            description: seo.description,
            isPartOf: {
                '@id': websiteId,
            },
            about: {
                '@id': organizationId,
            },
        },
    ];

    upsertStructuredData(structuredData);
};
