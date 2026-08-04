import React from 'react';
import { RouteLink } from '../router';

const MAIN_PAGES = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'HNI Research', path: '/pricing' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Onboarding', path: 'https://onboarding.cognifyai.in/Facto/' },
];

const SERVICE_PAGES = [
    { label: 'Facto TradeEdge', path: '/services/trading/facto-tradeedge' },
    { label: 'Facto Swing Radar', path: '/services/trading/facto-swing-radar' },
    { label: 'Facto Momentum Radar', path: '/services/trading/facto-momentum-radar' },
    { label: 'Facto Options Shield', path: '/services/trading/facto-options-shield' },
    { label: 'Facto Commodity Compass', path: '/services/trading/facto-commodity-compass' },
];

const PRICING_PAGES = [
    { label: 'Facto Equity Cash Alpha', path: '/pricing/stock-cash' },
    { label: 'Facto Stock Futures Pro', path: '/pricing/stock-future' },
    { label: 'Facto Stock Options Elite', path: '/pricing/stock-option' },
    { label: 'Facto Index Futures Momentum', path: '/pricing/index-future' },
    { label: 'Facto Index Options Elite', path: '/pricing/index-option' },
    { label: 'Facto BlueChip Core', path: '/pricing/investment-services/facto-bluechip-core' },
    { label: 'Facto MidCap Alpha', path: '/pricing/investment-services/facto-midcap-alpha' },
    { label: 'Facto ValueLens', path: '/pricing/investment-services/facto-valuelens' },
    { label: 'Facto SmallCap Edge', path: '/pricing/investment-services/facto-smallcap-edge' },
    { label: 'Facto Wealth Baskets', path: '/pricing/investment-services/facto-wealth-baskets' },
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
                    {renderLinkGroup('HNI Research', PRICING_PAGES)}
                    {renderLinkGroup('Legal & Compliance', LEGAL_PAGES)}
                </div>
            </section>
        </div>
    );
};

export default SitemapPage;
