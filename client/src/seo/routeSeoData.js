export const DEFAULT_SITE_ORIGIN = 'https://factoresearch.com';
export const BRAND_ALIASES = ['Facto Research', 'facto research', 'FactoResearch', 'factoresearch', 'factoresearch.com'];
export const DEFAULT_SEO_KEYWORDS = [
    'Facto Research',
    'facto research',
    'FactoResearch',
    'factoresearch',
    'factoresearch.com',
    'SEBI registered research analyst',
    'stock market research India',
    'equity research India',
    'NSE BSE market analysis',
].join(', ');

export const ROUTE_SEO = {
    '/': {
        title: 'Facto Research | FactoResearch | SEBI Registered Research Analyst & Stock Market Analysis',
        description:
            'Facto Research (also searched as FactoResearch and factoresearch.com) is a SEBI-registered research analyst brand offering data-driven equity research, stock market analysis, and investment insights for Indian markets.',
        keywords: DEFAULT_SEO_KEYWORDS,
        heading: 'Facto Research',
        changefreq: 'daily',
        priority: '1.0',
    },
    '/about': {
        title: 'About Facto Research | 15 Years Of Market Experience',
        description:
            'Learn about Facto Research, our 15 years of market experience, SEBI-registered foundation, and truth-through-data research philosophy.',
        heading: 'About Facto Research',
        changefreq: 'monthly',
        priority: '0.8',
    },
    '/services': {
        title: 'Research Services | Facto Research',
        description:
            'Explore Facto Research services including equity recommendations, fundamental research, technical analysis, portfolio baskets, and sectoral insights.',
        heading: 'Facto Research Services',
        changefreq: 'weekly',
        priority: '0.9',
    },
    '/services/equity-research': {
        title: 'EQUITIES | F&O | MCX Research Analysis Facto Research',
        description:
            'Detailed equity research service with entry/exit levels, target and stop-loss structure, time horizon, and rationale.',
        heading: 'EQUITIES | F&O | MCX Research Analysis',
        changefreq: 'weekly',
        priority: '0.85',
    },
    '/services/fundamental-research': {
        title: 'Fundamental Research Reports | Facto Research',
        description:
            'Business model, financial performance, valuation, and industry outlook focused fundamental research reports.',
        heading: 'Fundamental Research Reports',
        changefreq: 'weekly',
        priority: '0.85',
    },
    '/services/technical-analysis': {
        title: 'Technical Analysis & Market Trends | Facto Research',
        description:
            'Technical analysis coverage including trend tracking, chart patterns, momentum studies, and support/resistance levels.',
        heading: 'Technical Analysis, Market Trends & Live Index Tracking',
        changefreq: 'weekly',
        priority: '0.85',
    },
    '/services/portfolio-baskets': {
        title: 'Portfolio Baskets | Facto Research',
        description:
            'Research-backed portfolio baskets with allocation logic, indicative entry ranges, periodic updates, and tracking.',
        heading: 'Portfolio Baskets',
        changefreq: 'weekly',
        priority: '0.85',
    },
    '/services/thematic-sectoral': {
        title: 'Thematic & Sectoral Research | Facto Research',
        description:
            'Thematic and sectoral research across banking, PSU, emerging sectors, and cycle-based market insights.',
        heading: 'Thematic & Sectoral Research',
        changefreq: 'weekly',
        priority: '0.85',
    },
    '/services/educational-content': {
        title: 'Educational Content & Market Learning | Facto Research',
        description:
            'Market learning resources including courses, webinars, methodology training, and investing discipline workshops.',
        heading: 'Educational Content & Market Learning',
        changefreq: 'weekly',
        priority: '0.85',
    },
    '/pricing': {
        title: 'Pricing Plans | Facto Research',
        description:
            'View transparent pricing plans from Facto Research across stock cash, futures, options, and investment services.',
        heading: 'Facto Research Pricing',
        changefreq: 'weekly',
        priority: '0.8',
    },
    '/pricing/stock-cash': {
        title: 'Stock Cash Pricing | Facto Research',
        description:
            'Review Stock Cash Premium pricing, features, and plan options from Facto Research for equity cash market research support.',
        heading: 'Stock Cash Premium',
        changefreq: 'weekly',
        priority: '0.7',
    },
    '/pricing/stock-future': {
        title: 'Stock Future Pricing | Facto Research',
        description:
            'Review Stock Future Premium pricing and features from Facto Research for futures strategy and trend-focused setups.',
        heading: 'Stock Future Premium',
        changefreq: 'weekly',
        priority: '0.7',
    },
    '/pricing/stock-option': {
        title: 'Stock Option Pricing | Facto Research',
        description:
            'Review Stock Option Premium pricing and plan features from Facto Research for options strategy and risk-focused guidance.',
        heading: 'Stock Option Premium',
        changefreq: 'weekly',
        priority: '0.7',
    },
    '/pricing/index-future': {
        title: 'Index Future Pricing | Facto Research',
        description:
            'Review Index Future Premium pricing from Facto Research for Nifty and Bank Nifty futures market research and strategy support.',
        heading: 'Index Future Premium',
        changefreq: 'weekly',
        priority: '0.7',
    },
    '/pricing/index-option': {
        title: 'Index Option Pricing | Facto Research',
        description:
            'Review Index Option Premium pricing and plan benefits from Facto Research for index options research and trading insights.',
        heading: 'Index Option Premium',
        changefreq: 'weekly',
        priority: '0.7',
    },
    '/pricing/investment-services': {
        title: 'Investment Services Pricing | Facto Research',
        description:
            'Review Investment Services pricing from Facto Research for research-led portfolio and investment planning support.',
        heading: 'Investment Services',
        changefreq: 'weekly',
        priority: '0.7',
    },
    '/contact': {
        title: 'Contact Facto Research | Get In Touch',
        description:
            'Contact Facto Research for market research enquiries, onboarding support, and service-related assistance.',
        heading: 'Contact Facto Research',
        changefreq: 'monthly',
        priority: '0.8',
    },
    '/onboarding': {
        title: 'Onboarding | Facto Research',
        description:
            'Begin your onboarding journey with Facto Research for research-driven market insights and support.',
        heading: 'Onboarding',
        changefreq: 'monthly',
        priority: '0.6',
    },
    '/legal/disclaimer': {
        title: 'Disclaimer | Facto Research',
        description:
            'Read the official disclaimer for Facto Research and important information related to market risk and research services.',
        heading: 'Disclaimer',
        changefreq: 'yearly',
        priority: '0.4',
    },
    '/legal/privacy-policy': {
        title: 'Privacy Policy | Facto Research',
        description:
            'Read the Facto Research privacy policy to understand how personal information is collected, used, and protected.',
        heading: 'Privacy Policy',
        changefreq: 'yearly',
        priority: '0.4',
    },
    '/legal/terms-and-conditions': {
        title: 'Terms & Conditions | Facto Research',
        description:
            'Read the terms and conditions governing the use of Facto Research services and website access.',
        heading: 'Terms & Conditions',
        changefreq: 'yearly',
        priority: '0.4',
    },
    '/legal/mitc': {
        title: 'MITC | Facto Research',
        description:
            'Read the Most Important Terms and Conditions (MITC) applicable to Facto Research services.',
        heading: 'MITC',
        changefreq: 'yearly',
        priority: '0.4',
    },
    '/legal/return-and-refund-policy': {
        title: 'Return & Refund Policy | Facto Research',
        description:
            'Read the return and refund policy for Facto Research services including eligibility, timelines, and process details.',
        heading: 'Return & Refund Policy',
        changefreq: 'yearly',
        priority: '0.4',
    },
    '/legal/grievance-redressal': {
        title: 'Grievance Redressal | Facto Research',
        description:
            'View the grievance redressal process for Facto Research including complaint channels and escalation framework.',
        heading: 'Grievance Redressal',
        changefreq: 'yearly',
        priority: '0.4',
    },
    '/legal/investor-charter': {
        title: 'Investor Charter | Facto Research',
        description:
            'Read the Facto Research investor charter outlining investor rights, responsibilities, and service standards.',
        heading: 'Investor Charter',
        changefreq: 'yearly',
        priority: '0.4',
    },
    '/legal/complaint-board': {
        title: 'Complaint Board | Facto Research',
        description:
            'View complaint statistics and complaint-handling disclosures published by Facto Research.',
        heading: 'Complaint Board',
        changefreq: 'monthly',
        priority: '0.4',
    },
    '/legal/compliance-audit-status': {
        title: 'Compliance Audit Status | Facto Research',
        description:
            'View the current compliance audit status and related disclosures for Facto Research.',
        heading: 'Compliance Audit Status',
        changefreq: 'monthly',
        priority: '0.4',
    },
};

export const ORDERED_ROUTE_PATHS = Object.keys(ROUTE_SEO);
