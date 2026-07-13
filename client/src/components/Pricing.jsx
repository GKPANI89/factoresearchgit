import React from 'react';
import {
    BarChart3,
    Bell,
    CheckCircle2,
    Clock3,
    LineChart,
    RefreshCw,
    ShieldCheck,
    Target,
    TrendingUp,
} from 'lucide-react';
import { RouteLink } from '../router';
import { siteData } from '../data/siteData';
import { investmentServices } from '../data/homeServicesData';
import RazorpayCheckoutButton from './RazorpayCheckoutButton';
import ServicePrice from './ServicePrice';
import heroImage from '../assets/image.jpeg';

const rupee = '\u20b9';

const durations = [
    { key: 'monthly', label: '1 Month Plan', badge: 'Starter' },
    { key: 'quarterly', label: '3 Months Plan', badge: 'Flexible Choice' },
    { key: 'Half-Yearly', label: '6 Months Plan', badge: 'Popular' },
    { key: 'yearly', label: '1 Year Plan', badge: 'Best Value' },
];

const premiumPricingContent = {
    'stock-cash': {
        title: 'Facto Equity Cash Alpha',
        plans: [
            { title: 'Quarterly', price: `${rupee}50000` },
            { title: 'Half-Yearly', price: `${rupee}75000` },
            { title: 'Yearly', price: `${rupee}115000` },
        ],
        features: [
            'Daily Limit Orders',
            'Market Analysis Reports',
            'Entry and Exit levels',
            'Target & Stop loss Support',
            'WhatsApp/SMS alerts',
            '24/7 customer support',
        ],
    },
    'stock-future': {
        title: 'Facto Stock Future Pro',
        plans: [
            { title: 'Quarterly', price: `${rupee}75000` },
            { title: 'Half-Yearly', price: `${rupee}125000` },
            { title: 'Yearly', price: `${rupee}150000` },
        ],
        features: [
            'Stock futures setups',
            'Trend and momentum analysis',
            'Risk management logic',
            'Daily strategy updates',
            'WhatsApp support',
            'Research desk access',
        ],
    },
    'stock-option': {
        title: 'Facto Stock Option Elite',
        plans: [
            { title: 'Quarterly', price: `${rupee}75000` },
            { title: 'Half-Yearly', price: `${rupee}125000` },
            { title: 'Yearly', price: `${rupee}150000` },
        ],
        features: [
            'Option strategy recommendations',
            'Strike selection guidance',
            'Volatility and momentum studies',
            'Hedged risk framework',
            'Expiry-focused updates',
            'Priority support',
        ],
    },
    'index-future': {
        title: 'Facto Index Future Momentum',
        plans: [
            { title: 'Quarterly', price: `${rupee}75000` },
            { title: 'Half-Yearly', price: `${rupee}125000` },
            { title: 'Yearly', price: `${rupee}150000` },
        ],
        features: [
            'Index futures recommendations',
            'Nifty and Bank Nifty focus',
            'Short-term and swing setups',
            'Support and resistance levels',
            'Live market support',
            'Risk-first execution plan',
        ],
    },
    'index-option': {
        title: 'Facto Index Option Elite',
        plans: [
            { title: 'Quarterly', price: `${rupee}75000` },
            { title: 'Half-Yearly', price: `${rupee}125000` },
            { title: 'Yearly', price: `${rupee}150000` },
        ],
        features: [
            'Index option strategies',
            'Hedging and adjustment plans',
            'Expiry trend analytics',
            'Position sizing guidance',
            'WhatsApp/SMS alerts',
            'Dedicated support',
        ],
    },
};

const pricingTabs = [
    ['Equity Cash Alpha', '/pricing/stock-cash', 'stock-cash'],
    [' Stock Futures Pro', '/pricing/stock-future', 'stock-future'],
    ['Stock Option Elite', '/pricing/stock-option', 'stock-option'],
    ['Index Futures Momentum', '/pricing/index-future', 'index-future'],
    ['Index Option Elite', '/pricing/index-option', 'index-option'],
];

const planMeta = {
    'stock-cash': {
        eyebrow: 'HNI Equity Cash Strategy',
        title: 'Trade Equity Cash Alpha',
        highlight: 'with Research Discipline',
        summary:
            'Premium equity cash recommendations designed for active clients who want clear entry, exit, target, and risk guidance.',
        risk: 'High',
        horizon: 'Intraday to 3 Days',
        start: 'Premium',
        heroTone: 'Cash Alpha',
        whyIntro:
            'Facto Equity Cash Alpha provides cash-market opportunities with a research-first process, scanner support, and timely follow-up through the trading cycle.',
        benefits: [
            ['Daily Recommendations', '1-3 researched cash stock ideas during market hours', Target],
            ['Risk-Controlled Levels', 'Entry, target, stop-loss, and invalidation guidance', ShieldCheck],
            ['Momentum Focus', 'Tracks volume, trend strength, and short-term movement', TrendingUp],
            ['App-Based Alerts', 'Real-time buy, hold, and exit updates', Bell],
        ],
        why: [
            ['Expert-Led Technical Analysis', 'Run by experienced research professionals using price action, volume, and trend filters.'],
            ['Quality Over Quantity', 'Prioritizes high-quality opportunities instead of noisy overtrading.'],
            ['Timely Follow-Up Notifications', 'Keeps users informed from initiation to closure with practical risk context.'],
        ],
    },
    'stock-future': {
        eyebrow: 'HNI Stock Futures Strategy',
        title: 'Trade Stock Futures Pro',
        highlight: 'with Trend Precision',
        summary: 'Stock futures research for active HNI traders using trend, momentum, and risk-managed execution rules.',
        risk: 'High',
        horizon: 'Intraday to Weekly',
        start: 'Premium',
        heroTone: 'Futures Pro',
        whyIntro:
            'Facto Stock Futures Pro is built for clients who need structured futures setups, directional clarity, and disciplined risk management.',
        benefits: [
            ['Futures Setups', 'Stock futures ideas based on trend and momentum', LineChart],
            ['Trend Confirmation', 'Market structure and strength checks before action', TrendingUp],
            ['Risk Framework', 'Defined stop-loss and position planning', ShieldCheck],
            ['Research Updates', 'Timely updates through active market conditions', Bell],
        ],
        why: [
            ['Trend-Led Research', 'Uses momentum, price structure, and volatility context before shortlisting futures opportunities.'],
            ['Defined Trade Logic', 'Every view is supported by entry, exit, and invalidation levels.'],
            ['Built for Active Traders', 'Designed for users who understand leverage and need faster decision support.'],
        ],
    },
    'stock-option': {
        eyebrow: 'HNI Stock Options Strategy',
        title: 'Trade Stock Options Elite',
        highlight: 'with Defined Risk',
        summary: 'Stock options research with strike selection, risk-reward planning, volatility context, and scanner support.',
        risk: 'Very High',
        horizon: 'Intraday to Weekly',
        start: 'Premium',
        heroTone: 'Options Elite',
        whyIntro:
            'Facto Stock Options Elite helps advanced traders evaluate stock option opportunities with disciplined strike and risk planning.',
        benefits: [
            ['Strike Guidance', 'Call and put opportunities with strike context', Target],
            ['Volatility View', 'Options research aligned with movement and risk', BarChart3],
            ['Scenario Planning', 'Clear trade logic for changing market conditions', LineChart],
            ['Risk Controls', 'Defined loss control and position discipline', ShieldCheck],
        ],
        why: [
            ['Options-Specific Process', 'Focuses on strike quality, volatility behaviour, and practical risk-reward.'],
            ['Advanced Trader Fit', 'Designed for users who understand options risk and need structured research support.'],
            ['Scanner-Supported View', 'Uses screening logic to identify cleaner setups and avoid random trades.'],
        ],
    },
    'index-future': {
        eyebrow: 'HNI Index Futures Strategy',
        title: 'Trade Index Futures Momentum',
        highlight: 'in Nifty & Bank Nifty',
        summary: 'Index futures momentum research for Nifty and Bank Nifty with levels, trend view, and risk control.',
        risk: 'High',
        horizon: 'Intraday to Weekly',
        start: 'Premium',
        heroTone: 'Index Momentum',
        whyIntro:
            'Facto Index Futures Momentum supports active index traders with directional research, important levels, and market structure updates.',
        benefits: [
            ['Index Focus', 'Nifty and Bank Nifty futures opportunities', BarChart3],
            ['Momentum View', 'Trend strength and key level tracking', TrendingUp],
            ['Fast Updates', 'Timely market direction and level changes', Bell],
            ['Risk Planning', 'Defined entry, exit, and stop-loss approach', ShieldCheck],
        ],
        why: [
            ['Index-First Analysis', 'Studies market breadth, index structure, and momentum before building a view.'],
            ['Clear Trading Levels', 'Helps active traders plan around support, resistance, and trend shifts.'],
            ['Disciplined Execution', 'Built to reduce emotional trading during volatile index moves.'],
        ],
    },
    'index-option': {
        eyebrow: 'HNI Index Options Strategy',
        title: 'Trade Index Options Elite',
        highlight: 'with Expiry Intelligence',
        summary: 'Index options research for Nifty and Bank Nifty opportunities with expiry planning and scanner-backed risk structure.',
        risk: 'Very High',
        horizon: 'Intraday to Weekly',
        start: 'Premium',
        heroTone: 'Index Options',
        whyIntro:
            'Facto Index Options Elite is designed for advanced traders who need structured index option ideas, expiry context, and risk control.',
        benefits: [
            ['Call & Put Setups', 'Index option opportunities with directional context', Target],
            ['Expiry Planning', 'Research support around weekly and monthly expiry', Clock3],
            ['Scanner Support', 'Opportunity filtering using movement and volatility cues', BarChart3],
            ['Risk Framework', 'Risk-reward planning before participation', ShieldCheck],
        ],
        why: [
            ['Expiry-Aware Research', 'Considers time decay, movement potential, and volatility before highlighting opportunities.'],
            ['Clear Risk Boundaries', 'Designed to help traders define position risk before entry.'],
            ['Built for Advanced Users', 'Suitable for users who understand index options and need faster research support.'],
        ],
    },
    'investment-services': {
        eyebrow: 'Investor Research Services',
        title: 'Build Wealth',
        highlight: 'with Research Frameworks',
        summary: 'Longer-horizon investment services covering stock research, model portfolios, allocation logic, and periodic reviews.',
        risk: 'Profile Based',
        horizon: '6 Months to 5 Years',
        start: 'Custom',
        heroTone: 'Investor Desk',
        whyIntro:
            'Investment services help investors move from random stock holding to research-backed allocation, review discipline, and portfolio clarity.',
        benefits: [
            ['Research Reports', 'Business, valuation, sector, and risk analysis', BarChart3],
            ['Portfolio Strategy', 'Allocation logic and structured basket thinking', Target],
            ['Review Discipline', 'Quarterly tracking and rebalancing guidance', RefreshCw],
            ['Suitability Mapping', 'Risk and horizon alignment before onboarding', ShieldCheck],
        ],
        why: [
            ['Research Before Allocation', 'Ideas are supported by business quality, valuation, sector context, and risk checks.'],
            ['Built for Long-Term Investors', 'Suitable for investors who want a structured framework instead of random tips.'],
            ['Ongoing Review Support', 'Periodic updates help users decide whether to hold, reduce, exit, or add.'],
        ],
    },
};

const formatPlanPrice = (price) => (price === 'Custom' ? 'Custom' : `${rupee}${price}`);

const Pricing = ({ planSlug = 'stock-cash' }) => {
    const selectedPlan =
        siteData.pricingPlans.find((plan) => plan.slug === planSlug) || siteData.pricingPlans[0];
    const meta = planMeta[selectedPlan.slug] || planMeta['stock-cash'];
    const isInvestmentServices = selectedPlan.slug === 'investment-services';
    const premiumContent = premiumPricingContent[selectedPlan.slug];
    const packages = isInvestmentServices ? investmentServices : [];
    const startPrice = isInvestmentServices
        ? packages[0]?.pricing?.[0]?.[1] || meta.start
        : formatPlanPrice(selectedPlan.prices.monthly);

    if (premiumContent) {
        return (
            <main className="service-pricing-page stock-cash-premium-page">
                <section className="stock-cash-pricing-hero">
                    <div className="container">
                        <div className="stock-cash-pricing-header">
                            <span>Get Started</span>
                            <h1>HNI Plans</h1>
                            <p>Please contact us directly to discuss service suitability and onboarding.</p>
                            <div className="hni-contact-details">
                                <a href="mailto:info@factoresearch.com">info@factoresearch.com</a>
                                <a href={`tel:${siteData.contact.phone.replace(/[^\d+]/g, '')}`}>
                                    {siteData.contact.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="stock-cash-premium-section">
                    <div className="container">
                        <nav className="stock-cash-pricing-tabs" aria-label="Pricing categories">
                            {pricingTabs.map(([label, path, slug]) => (
                                <RouteLink
                                    key={slug}
                                    to={path}
                                    className={`stock-cash-pricing-tab ${selectedPlan.slug === slug ? 'active' : ''}`}
                                >
                                    {label}
                                </RouteLink>
                            ))}
                        </nav>

                        <h2>{premiumContent.title}</h2>

                        <div className="stock-cash-premium-grid">
                            {premiumContent.plans.map((plan) => (
                                <article key={plan.title} className="stock-cash-premium-card">
                                    <h3>{plan.title}</h3>
                                    <ul>
                                        {premiumContent.features.map((feature) => (
                                            <li key={`${plan.title}-${feature}`}>
                                                <CheckCircle2 size={18} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <strong><ServicePrice price={plan.price} /></strong>
                                    <RazorpayCheckoutButton
                                        amount={plan.price}
                                        serviceName={premiumContent.title}
                                        planName={plan.title}
                                    />
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
        );
    }

    return (
        <main className="service-pricing-page">
            <section className="service-hero-section">
                <div className="service-hero-bg" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
                <div className="container service-hero-grid">
                    <div className="service-hero-copy">
                        <span className="service-hero-eyebrow">{meta.eyebrow}</span>
                        <h1>
                            {meta.title}
                            <span>{meta.highlight}</span>
                        </h1>
                        <p>{meta.summary}</p>
                    </div>

                    <article className="service-hero-card">
                        <div className="service-hero-mark">{meta.heroTone}</div>
                        <div className="service-hero-stat">
                            <ShieldCheck size={34} />
                            <div>
                                <span>Risk Level</span>
                                <strong>{meta.risk}</strong>
                            </div>
                        </div>
                        <div className="service-hero-stat">
                            <Clock3 size={34} />
                            <div>
                                <span>Trade Horizon</span>
                                <strong>{meta.horizon}</strong>
                            </div>
                        </div>
                        <div className="service-hero-stat">
                            <Target size={34} />
                            <div>
                                <span>Get started at</span>
                                <strong><ServicePrice price={startPrice} /></strong>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            <section className="service-benefits-band">
                <div className="container service-benefits-grid">
                    {meta.benefits.map(([title, description, benefitIcon]) => (
                        <article key={title} className="service-benefit-item">
                            <span>
                                {React.createElement(benefitIcon, { size: 24 })}
                            </span>
                            <div>
                                <h3>{title}</h3>
                                <p>{description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section id="pricing" className="service-plan-section">
                <div className="container">
                    <div className="pricing-plan-switch">
                        {siteData.pricingPlans.filter((plan) => plan.slug !== 'investment-services').map((plan) => (
                            <RouteLink
                                key={plan.slug}
                                to={`/pricing/${plan.slug}`}
                                className={`plan-switch-btn ${selectedPlan.slug === plan.slug ? 'active' : ''}`}
                            >
                                {plan.menuLabel}
                            </RouteLink>
                        ))}
                    </div>

                    <h2 className="service-section-title">Select the Plan That Fits You</h2>

                    {isInvestmentServices ? (
                        <div className="service-package-grid">
                            {packages.map((pkg) => (
                                <article key={pkg.title} className="service-plan-card">
                                    <span className="service-plan-badge">{pkg.tag}</span>
                                    <h3>{pkg.title}</h3>
                                    <strong className="service-plan-price">
                                        <ServicePrice price={pkg.pricing[0]?.[1]} />
                                    </strong>
                                    <ul>
                                        {pkg.features.slice(0, 5).map((point) => (
                                            <li key={`${pkg.title}-${point}`}>
                                                <CheckCircle2 size={16} />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                        {pkg.metrics.map(([label, value]) => (
                                            <li key={`${pkg.title}-${label}`}>
                                                <CheckCircle2 size={16} />
                                                <span>{label}: {value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="service-price-mini-table">
                                        {pkg.pricing.map(([duration, price]) => (
                                            <div key={`${pkg.title}-${duration}`}>
                                                <span>{duration}</span>
                                                <strong><ServicePrice price={price} /></strong>
                                                <RazorpayCheckoutButton
                                                    amount={price}
                                                    serviceName={pkg.title}
                                                    planName={duration}
                                                    className="service-price-subscribe-btn"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="service-plan-grid">
                            {durations.map((duration) => (
                                <article key={duration.key} className={`service-plan-card ${duration.key === 'yearly' ? 'featured' : ''}`}>
                                    <span className="service-plan-badge">{duration.badge}</span>
                                    <h3>{duration.label}</h3>
                                    <strong className="service-plan-price">
                                        <ServicePrice price={formatPlanPrice(selectedPlan.prices[duration.key])} />
                                    </strong>
                                    <ul>
                                        {selectedPlan.features.map((feature) => (
                                            <li key={`${duration.key}-${feature}`}>
                                                <CheckCircle2 size={16} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <RazorpayCheckoutButton
                                        amount={formatPlanPrice(selectedPlan.prices[duration.key])}
                                        serviceName={selectedPlan.title}
                                        planName={duration.label}
                                    />
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="service-why-section">
                <div className="container service-why-grid">
                    <div>
                        <h2>Why This Service?</h2>
                        <p className="service-why-intro">{meta.whyIntro}</p>
                        <div className="service-why-list">
                            {meta.why.map(([title, description], index) => (
                                <article key={title} className="service-why-item">
                                    <span>{index + 1}</span>
                                    <div>
                                        <h3>{title}</h3>
                                        <p>{description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                    <div className="service-illustration-card" aria-hidden="true">
                        <div className="service-chart-window">
                            <div className="service-chart-line" />
                            <span />
                            <span />
                            <span />
                        </div>
                        <div className="service-check-panel">
                            <CheckCircle2 />
                            <CheckCircle2 />
                            <CheckCircle2 />
                        </div>
                    </div>
                </div>
            </section>

            <section className="service-data-section">
                <div className="container service-data-grid">
                    <div className="service-data-visual">
                        <span className="service-data-pill">
                            <ShieldCheck size={16} /> Verified Data
                        </span>
                        <div className="service-data-chart">
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                        </div>
                    </div>
                    <form className="service-data-form">
                        <span className="service-hero-eyebrow">Verified & Reliable for your Evaluation</span>
                        <h2>Get Historical Returns Data</h2>
                        <p>Fill in your details to access verified performance information for evaluation.</p>
                        <input type="text" placeholder="Name*" aria-label="Name" />
                        <input type="tel" placeholder="+91 Mobile Number*" aria-label="Mobile number" />
                        <input type="email" placeholder="Email*" aria-label="Email" />
                        <label className="service-data-checkbox">
                            <input type="checkbox" />
                            <span>I understand that the performance data shared is confidential.</span>
                        </label>
                        <button type="button">
                            <RefreshCw size={18} /> Get Returns Data
                        </button>
                        <p className="service-data-disclaimer">
                            Disclaimer: Past performance is not indicative of future results. Historical performance data is shared only on request.
                        </p>
                    </form>
                </div>
            </section>

        </main>
    );
};

export default Pricing;
