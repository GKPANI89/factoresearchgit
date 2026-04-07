import React from 'react';
import { RouteLink } from '../router';

const MAIN_PAGES = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Onboarding', path: '/onboarding' },
];

const SERVICE_PAGES = [
    { label: 'Equities | F&O | MCX Research Analysis', path: '/services/equity-research' },
    { label: 'Fundamental Research Reports', path: '/services/fundamental-research' },
    { label: 'Technical Analysis, Market Trends & Live Index Tracking', path: '/services/technical-analysis' },
    { label: 'Portfolio Baskets', path: '/services/portfolio-baskets' },
    { label: 'Thematic & Sectoral Research', path: '/services/thematic-sectoral' },
    { label: 'Educational Content & Market Learning', path: '/services/educational-content' },
];

const PRICING_PAGES = [
    { label: 'Stock Cash', path: '/pricing/stock-cash' },
    { label: 'Stock Future', path: '/pricing/stock-future' },
    { label: 'Stock Option', path: '/pricing/stock-option' },
    { label: 'Index Future', path: '/pricing/index-future' },
    { label: 'Index Option', path: '/pricing/index-option' },
    { label: 'Investment Services', path: '/pricing/investment-services' },
];

const LEGAL_PAGES = [
    { label: 'Disclaimer', path: '/legal/disclaimer' },
    { label: 'MITC', path: '/legal/mitc' },
    { label: 'Privacy Policy', path: '/legal/privacy-policy' },
    { label: 'Terms & Conditions', path: '/legal/terms-and-conditions' },
    { label: 'Return & Refund Policy', path: '/legal/return-and-refund-policy' },
    { label: 'Grievance Redressal', path: '/legal/grievance-redressal' },
    { label: 'Investor Charter', path: '/legal/investor-charter' },
    { label: 'Complaint Board', path: '/legal/complaint-board' },
    { label: 'Compliance Audit Status', path: '/legal/compliance-audit-status' },
    { label: 'Accessibility Statement', path: '/accessibility' },
];

const renderLinkGroup = (title, links) => (
    <article className="glass-card legal-card">
        <h2>{title}</h2>
        <ul className="legal-list">
            {links.map((item) => (
                <li key={item.path}>
                    <RouteLink to={item.path}>{item.label}</RouteLink>
                </li>
            ))}
        </ul>
    </article>
);

const SitemapPage = () => {
    return (
        <div className="inner-page legal-page">
            <section className="page-header legal-header">
                <div className="container">
                    <div className="page-header-card glass-card">
                        <span className="page-header-eyebrow">Navigation</span>
                        <h1 className="page-header-title">HTML Sitemap</h1>
                        <p className="page-header-subtitle">
                            Browse all major pages using a simple, accessible page index.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding legal-section">
                <div className="container legal-container">
                    {renderLinkGroup('Main Pages', MAIN_PAGES)}
                    {renderLinkGroup('Services', SERVICE_PAGES)}
                    {renderLinkGroup('Pricing', PRICING_PAGES)}
                    {renderLinkGroup('Legal & Compliance', LEGAL_PAGES)}
                </div>
            </section>
        </div>
    );
};

export default SitemapPage;
