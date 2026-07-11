const APP_NAME = import.meta.env.VITE_APP_NAME || 'Facto Research';
const DEFAULT_SUPPORT_PHONE = '+91 99599 37373';
const DEFAULT_SUPPORT_EMAIL = 'support@factoresearch.com';
const DEFAULT_REGISTERED_ADDRESS =
    'D.No.7, SNO.432/4 Plot No.6, Opp JNTU College, KM Colony, Anantapur, Andhra Pradesh-515002.';
const DEFAULT_WHATSAPP_URL =
    'https://api.whatsapp.com/send/?phone=919959937373&text&type=phone_number&app_absent=0';
const DEFAULT_INSTAGRAM_URL =
    'https://www.instagram.com/factoresearchinsights?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';

const withFallback = (value, fallback) => {
    const normalized = typeof value === 'string' ? value.trim() : '';
    return normalized || fallback;
};

const SUPPORT_PHONE = withFallback(import.meta.env.VITE_SUPPORT_PHONE, DEFAULT_SUPPORT_PHONE);
const SUPPORT_EMAIL = withFallback(import.meta.env.VITE_SUPPORT_EMAIL, DEFAULT_SUPPORT_EMAIL);
const REGISTERED_ADDRESS = withFallback(import.meta.env.VITE_REGISTERED_ADDRESS, DEFAULT_REGISTERED_ADDRESS);
const WHATSAPP_URL = withFallback(import.meta.env.VITE_WHATSAPP_URL, DEFAULT_WHATSAPP_URL);
const TWITTER_URL = withFallback(import.meta.env.VITE_TWITTER_URL, '');
const INSTAGRAM_URL = withFallback(import.meta.env.VITE_INSTAGRAM_URL, DEFAULT_INSTAGRAM_URL);
const LINKEDIN_URL = withFallback(import.meta.env.VITE_LINKEDIN_URL, '');
const FACEBOOK_URL = withFallback(import.meta.env.VITE_FACEBOOK_URL, '');
const YOUTUBE_URL = withFallback(import.meta.env.VITE_YOUTUBE_URL, '');

export const siteData = {
    brand: {
        name: APP_NAME,
        logoUrl:
            'https://img1.wsimg.com/isteam/ip/890c2873-45ef-40f0-a650-7817ddb60ef4/Untitled%20(512%20x%20512%20px).png/:/rs=w:178,h:178,cg:true,m/cr=w:178,h:178/qt=q:95',
    },
    hero: {
        badge: '15 Years of Market Mastery',
        title: 'Research Built on Data\nReports Built on Facts.',
        description:
            `Facto Research is led by a veteran Research Analyst with over 15 years of deep-market experience. We help investors navigate Indian financial markets with clarity, confidence, and consistency through factoresearch.com.`,
        primaryAction: { label: 'Trading', path: '#trading-services-carousel' },
        secondaryAction: { label: 'Investments', path: '#investment-services-carousel' },
        stats: [
            { value: '15+', label: 'Years of Experience' },
            { value: 'SEBI', label: 'Reg. No. INH000024480' },
        ],
    },
    about: {
        title: `About ${APP_NAME}`,
        decadeTitle: '15 Years of Market Mastery',
        decadeParagraphs: [
            `${APP_NAME} is led by a veteran Research Analyst with over 15 years of deep-market experience in Indian equities.`,
            '15 years in the markets provide a perspective that charts alone cannot show. It brings the wisdom of having navigated diverse market cycles, economic shifts, and structural reforms.',
            `At ${APP_NAME}, we believe successful investing is not about following the noise. It is about following the facts. We provide institutional-grade market intelligence to help investors navigate the complexities of Indian financial markets with clarity and confidence.`,
        ],
        sebiTitle: 'Institutional Grade. SEBI Registered.',
        sebiParagraph:
            'We are a SEBI Registered Research Analyst firm (Registration No. INH000024480). Our foundation is built on the twin pillars of unmatched experience and regulatory excellence. We bring sophisticated research techniques used by institutional desks to the discerning individual investor.',
        philosophyTitle: 'The Facto Philosophy: "Truth Through Data"',
        philosophyIntro:
            'In a decade of research, we have learned that prices fluctuate, but facts eventually prevail. Our "Facto" methodology is a proprietary research framework refined over 15 years to:',
        philosophyPoints: [
            {
                title: 'Forensic Analysis',
                description: 'Going beyond the P&L statement to understand the true quality of earnings and management integrity.',
            },
            {
                title: 'Identify Structural Winners',
                description: 'Spotting companies that can grow consistently over 3, 5, and 10-year horizons.',
            },
            {
                title: 'Risk Mitigation',
                description: 'Using a decade of historical data to avoid "value traps" and speculative bubbles.',
            },
        ],
    },
    services: {
        title: 'Our Research Services',
        subtitle:
            'Research-first services with clear structure, risk context, and practical decision support.',
        categories: [
            {
                slug: 'equity-research',
                title: 'Equities | F&O | MCX Research Analysis',
                summary: 'Structured recommendations with clear levels, risk framing, and rationale.',
                overview:
                    'Action-focused ideas designed to help investors plan entries, exits, and risk with discipline.',
                points: [
                    {
                        title: 'Research rationale',
                        description:
                            'Every recommendation includes the "why" - key drivers, triggers, and risks behind the view.',
                        disclosure:
                            'Rationale is based on available information and analysis, and can be impacted by unforeseen events.',
                    },
                    {
                        title: 'Entry/Exit levels',
                        description:
                            'Clear price zones are shared to help you plan entries and exits with structure, avoiding emotional decisions.',
                        disclosure:
                            'Levels are research-based and indicative; actual execution depends on liquidity, volatility, and market conditions.',
                    },
                    {
                        title: 'Target/SL price',
                        description:
                            'Each idea includes a defined target and stop-loss to support risk-managed participation in the market.',
                        disclosure:
                            'Targets/SL are not guarantees and may change with trend, news flow, and price action.',
                    },
                    {
                        title: 'Time horizon & risk level',
                        description:
                            'Calls are tagged by expected holding period and risk grade so you can match them with your profile.',
                        disclosure:
                            'Suitability varies by investor; higher risk strategies can lead to faster losses as well.',
                    },
                ],
            },
            {
                slug: 'fundamental-research',
                title: 'Fundamental Research Reports',
                summary: 'In-depth business and valuation analysis for long-term decision making.',
                overview:
                    'Detailed research reports focused on business quality, financial strength, valuation, and industry context.',
                points: [
                    {
                        title: 'Business model',
                        description:
                            'We explain how the company earns, its competitive edge, and what can strengthen or weaken its moat.',
                        disclosure:
                            'Insights are based on public sources and sector context, without any assurance of future performance.',
                    },
                    {
                        title: 'Financial performance',
                        description:
                            'Detailed review of revenue, margins, cash flows, leverage, and key ratios to assess business health.',
                        disclosure:
                            'Financial trends can change with cycles, regulations, and management decisions.',
                    },
                    {
                        title: 'Valuation metrics',
                        description:
                            'Valuation using relevant multiples and frameworks to compare price vs fundamentals and peers.',
                        disclosure:
                            'Valuation is an estimate, not certainty; market prices can remain irrational for extended periods.',
                    },
                    {
                        title: 'Industry outlook',
                        description:
                            'Sector structure, demand drivers, risks, and cycle positioning to evaluate long-term opportunity.',
                        disclosure:
                            'Industry forecasts are indicative and may shift due to policy, competition, and macro factors.',
                    },
                ],
            },
            {
                slug: 'technical-analysis',
                title: 'Technical Analysis, Market Trends & Live Index Tracking',
                summary: 'Live index tracking and chart-based trend analysis for tactical market views.',
                overview:
                    'Market-structure and momentum coverage to track direction, setups, and risk zones in evolving conditions.',
                points: [
                    {
                        title: 'Live tracking of SENSEX & NIFTY',
                        description:
                            'Real-time monitoring of headline indices to understand market direction and risk-on/risk-off mood.',
                        disclosure: 'Live tracking supports decision-making but does not predict outcomes.',
                    },
                    {
                        title: 'Short term trends',
                        description:
                            'Short-horizon trend view to identify momentum phases and potential turning points.',
                        disclosure:
                            'Trends can reverse quickly; risk controls are essential in fast markets.',
                    },
                    {
                        title: 'Chart patterns',
                        description:
                            'Pattern-based study to spot breakouts, breakdowns, consolidations, and reversal setups.',
                        disclosure:
                            'Patterns work on probability, not certainty, and must be used with confirmation and discipline.',
                    },
                    {
                        title: 'Indicators & momentum studies',
                        description:
                            'Use of indicators (like momentum/volatility tools) to assess strength, weakness, and exhaustion.',
                        disclosure:
                            'Indicators can give false signals - always align with trend and risk management.',
                    },
                    {
                        title: 'Support & resistance levels',
                        description:
                            'Key zones are mapped to identify potential demand/supply areas for planning trades or entries.',
                        disclosure:
                            'These levels are dynamic and may fail during news events or high volatility.',
                    },
                ],
            },
            {
                slug: 'portfolio-baskets',
                title: 'Portfolio Baskets',
                summary: 'Curated baskets with rationale, allocation logic, and periodic review updates.',
                overview:
                    'Basket-based portfolio ideas designed for diversified exposure with ongoing review and transparent tracking.',
                points: [
                    {
                        title: 'Research rationale for each stock',
                        description:
                            'Each stock is included with a clear reason: fundamentals, trend strength, catalysts, and risk factors.',
                        disclosure: 'Inclusion is research-led, not a promise of returns.',
                    },
                    {
                        title: 'Entry range & outlook (indicative)',
                        description:
                            'We share an indicative entry range and outlook to help stagger buying and manage risk.',
                        disclosure:
                            'Ranges are indicative and may be updated based on price action and market conditions.',
                    },
                    {
                        title: 'Portfolio allocation logic',
                        description:
                            'Allocation is designed with diversification, risk contribution, and sector balance in mind.',
                        disclosure:
                            'Allocations should be customized to your objectives and risk tolerance.',
                    },
                    {
                        title: 'Periodic review updates',
                        description:
                            'Regular reviews highlight what changed - results, sector cues, trend shifts, or risk signals.',
                        disclosure:
                            'Reviews are informational; investors should act based on suitability and discipline.',
                    },
                    {
                        title: 'Performance tracking',
                        description:
                            "Transparent tracking to evaluate what worked, what didn't, and how the basket behaved in cycles.",
                        disclosure:
                            'Past performance is not indicative of future results, and tracking is for learning and review.',
                    },
                ],
            },
            {
                slug: 'thematic-sectoral',
                title: 'Thematic & Sectoral Research',
                summary: 'Sector and theme-focused research across cycles, policy shifts, and structural trends.',
                overview:
                    'Coverage across high-impact sectors and market cycles with explicit assumptions and risk notes.',
                points: [
                    {
                        title: 'Banking & financials',
                        description:
                            'Coverage of banks/NBFCs with focus on credit growth, asset quality, margins, and policy impact.',
                        disclosure:
                            'Financial stocks are sensitive to rates and cycles; views may change as data evolves.',
                    },
                    {
                        title: 'PSU stocks',
                        description:
                            'Research on PSU themes with triggers like reforms, capex cycles, valuations, and sentiment shifts.',
                        disclosure:
                            'PSUs can be volatile due to policy decisions; risk disclosure is integral to every view.',
                    },
                    {
                        title: 'Emerging sectors',
                        description:
                            'Identify early-stage sectors driven by structural growth, innovation, and changing consumption.',
                        disclosure:
                            'Emerging themes carry higher uncertainty; position sizing and patience are key.',
                    },
                    {
                        title: 'Market trends & cycles',
                        description:
                            'Cycle-based insights to understand where we are in the market, sector rotation, and risk regime.',
                        disclosure:
                            "Market cycles don't repeat exactly; signals are probabilistic, not predictive.",
                    },
                    {
                        title: 'Risk disclosure & suitability note',
                        description:
                            'Every note highlights key risks, assumptions, and suitability considerations for informed decisions.',
                        disclosure:
                            'Invest only if aligned to your financial goals, horizon, and ability to take loss.',
                    },
                ],
            },
            {
                slug: 'educational-content',
                title: 'Educational Content & Market Learning',
                summary: 'Courses, webinars, and practical frameworks to improve market learning discipline.',
                overview:
                    'Structured market education focused on process quality, tool usage, and decision discipline.',
                points: [
                    {
                        title: 'Stock market courses',
                        description:
                            'Structured courses covering basics to advanced concepts in investing, trading, and risk management.',
                        disclosure:
                            'Education improves skill and process; it does not assure profits or prevent losses.',
                    },
                    {
                        title: 'Webinars / seminars',
                        description:
                            'Live learning sessions on market structure, current themes, and practical analysis frameworks.',
                        disclosure:
                            'Sessions are educational and informational - not personalized investment advice.',
                    },
                    {
                        title: 'Research methodology training',
                        description:
                            'Learn step-by-step methods to evaluate businesses, screens, and decision frameworks.',
                        disclosure:
                            'Focus is on process and discipline; outcomes depend on market behavior and execution.',
                    },
                    {
                        title: 'Workshops on analysis tools',
                        description:
                            'Hands-on training on charting, indicators, financial statements, and tracking templates.',
                        disclosure:
                            'Tools support decisions but cannot eliminate risk or guarantee accuracy.',
                    },
                    {
                        title: 'Investing & trading discipline',
                        description:
                            'Training on psychology, journaling, risk rules, and consistency for better decision-making.',
                        disclosure:
                            'Discipline reduces avoidable mistakes, but losses remain possible in all market conditions.',
                    },
                ],
            },
        ],
    },
    pricingPlans: [
        {
            slug: 'stock-cash',
            menuLabel: 'Facto Equity Cash Alpha',
            title: 'Facto Equity Cash Alpha',
            prices: { monthly: '1,999', quarterly: '5,499', 'Half-Yearly': '9,999', yearly: '17,999' },
            features: [
                'Daily trading opportunities',
                'Entry Price',
                'Stop Loss',
                'Target Price',
                'Risk Management',
                'Holding Period: Intraday - 3 Days',
                'Risk-Reward Ratio: 1:2',
            ],
        },
        {
            slug: 'stock-future',
            menuLabel: 'Facto Stock Futures Pro',
            title: 'Facto Stock Futures Pro',
            prices: { monthly: '2,499', quarterly: '6,999', 'Half-Yearly': '12,999', yearly: '23,999' },
            features: [
                '5-10 swing trades monthly',
                'Entry Zone',
                'Stop Loss',
                'Multiple Targets',
                'Position Sizing',
                'Holding Period: 3-20 Days',
                'Risk-Reward Ratio: 1:2',
            ],
        },
        {
            slug: 'stock-option',
            menuLabel: 'Facto Stock Options Elite',
            title: 'Facto Stock Options Elite',
            prices: { monthly: '4,999', quarterly: '13,999', 'Half-Yearly': '24,999', yearly: '44,999' },
            features: [
                'Nifty & Bank Nifty setups',
                'Call & Put opportunities',
                'Option strategy reports',
                'Risk management framework',
                'Holding Period: Intraday to Weekly',
                'Risk-Reward Ratio: 1:2 to 1:4',
            ],
        },
        {
            slug: 'index-future',
            menuLabel: 'Facto Index Futures Momentum',
            title: 'Facto Index Futures Momentum',
            prices: { monthly: '2,999', quarterly: '7,999', 'Half-Yearly': '14,999', yearly: '26,999' },
            features: [
                'Breakout opportunities',
                'Volume analysis',
                'Trend strength analysis',
                'Target levels',
                'Exit strategy',
                'Holding Period: 2-15 Days',
                'Risk-Reward Ratio: 1:2',
            ],
        },
        {
            slug: 'index-option',
            menuLabel: 'Facto Index Options Elite',
            title: 'Facto Index Options Elite',
            prices: { monthly: '4,999', quarterly: '13,999', 'Half-Yearly': '24,999', yearly: '44,999' },
            features: [
                'Nifty & Bank Nifty setups',
                'Call & Put opportunities',
                'Option strategy reports',
                'Risk management framework',
                'Holding Period: Intraday to Weekly',
                'Risk-Reward Ratio: 1:2 to 1:4',
            ],
        },
        {
            slug: 'investment-services',
            menuLabel: 'Investment Services',
            title: 'Investment Services',
            prices: { quarterly: 'Custom', 'Half-Yearly': 'Custom', yearly: 'Custom' },
            features: [
                'Portfolio guidance',
                'Research-backed allocation ideas',
                'Thematic and sectoral insights',
                'Risk and suitability mapping',
                'Periodic review support',
                'Consultative onboarding',
            ],
            investorResearchTitle: 'Our Premium Research for Investors',
            investorPackages: [
                {
                    slug: 'facto-blueprint',
                    title: 'The Facto Blueprint',
                    validity: 'Validity 6 Months',
                    points: [
                        'Sector Insights',
                        'Forensic Stock Reports',
                        'Quarterly Earnings Logic',
                        'Strategic Investment Reports',
                    ],
                    price: '69999/-',
                    theme: 'blueprint',
                },
                {
                    slug: 'facto-strategy-basket',
                    title: 'Facto Strategy Basket',
                    validity: 'Validity One Year',
                    points: [
                        'Portfolio Facto Basket 25',
                        'Premium Reports for Investing',
                        'Earnings Analysis + Macro iew',
                        'All Everything in Facto Blueprint',
                    ],
                    price: '149999/-',
                    theme: 'strategy',
                },
            ],
            whatYouGetTitle: 'What You Get',
            whatYouGet: [
                {
                    title: 'Strategic Investment Frameworks',
                    description:
                        "At Facto Research, we don't guess. We apply a 15-year Strategic Investment Framework to every listed security, ensuring that every report is a product of forensic logic, not market hype.",
                },
                {
                    title: 'Deep-Dive Equity Intelligence',
                    description:
                        'Conducting forensic investigations into financial statements to bridge the gap between reported numbers and intrinsic truth. Exposing hidden risks and uncovering long-term value through institutional-grade modeling.',
                },
                {
                    title: 'The Facto Strategy Baskets',
                    description:
                        'Curated, high-conviction portfolios built on 15 years of forensic logic and verified market data. A structured blueprint of high-growth equities designed for disciplined, long-term wealth creation.',
                },
                {
                    title: 'Thematic/Macro Research',
                    description:
                        'Identifying high-impact megatrends and global shifts to capture the structural winners of tomorrow. Synthesizing macroeconomic data into actionable frameworks for long-term capital allocation.',
                },
                {
                    title: 'Whats App/Email alerts',
                    description:
                        'Delivering real-time research alerts and actionable updates directly to your preferred channel for instant execution. Ensuring you never miss a market move with seamless, high-priority notifications on technical triggers and fundamental shifts.',
                },
                {
                    title: '24/7 Client Support',
                    description:
                        'Providing round-the-clock accessibility to ensure your queries are addressed with expert clarity, any time of day. Ensuring seamless support and dedicated assistance to help you navigate the markets with confidence and constant peace of mind.',
                },
            ],
        },
    ],
    values: {
        heading: 'Our Values',
        statement:
            'Decisions based on facts, not hearsay. In an era of information overload, we act as a filter.',
        explanation:
            'We combine rigorous fundamental analysis with quantitative data to separate market hype from actual value.',
    },
    mission: {
        heading: 'Our Mission',
        statement:
            'To democratize high-quality equity research and empower our clients with the same level of insight typically reserved for institutional investors. Creating wealth with market research is our profession.',
    },
    vision: {
        heading: 'Our Vision',
        statement:
            'To be the most trusted name in independent equity research in India, where every recommendation is backed by 15 years of expertise and a commitment to the absolute facts.',
    },
    team: {
        heading: 'We Believe In Team Work',
        members: [
            {
                role: 'Chief Research Analyst',
                description:
                    'A SEBI-registered Research Analyst with 15 years of expertise in equity research. Fundamental and technical analysis to deliver comprehensive market insights.',
            },
            {
                role: 'Pro Research Team',
                description:
                    'Our team of specialized market analysts provides comprehensive, data-driven research across every market segment.',
            },
            {
                role: 'Client Support',
                description:
                    'Our dedicated support team ensures seamless service and rapid resolution of all client inquiries and requirements.',
            },
        ],
    },
    contact: {
        phone: SUPPORT_PHONE,
        whatsapp: SUPPORT_PHONE,
        whatsappUrl: WHATSAPP_URL,
        email: SUPPORT_EMAIL,
        address: REGISTERED_ADDRESS,
        intro: 'Please contact us directly with questions, comments, or scheduling inquiries.',
        social: ['Twitter', 'LinkedIn', 'Instagram', 'WhatsApp'],
        socialLinks: {
            twitter: TWITTER_URL,
            instagram: INSTAGRAM_URL,
            linkedin: LINKEDIN_URL,
            facebook: FACEBOOK_URL,
            youtube: YOUTUBE_URL,
            whatsapp: WHATSAPP_URL,
        },
    },
    footer: {
        disclosure:
            'SEBI Investment Risk Disclosure: Investment in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. Please read the Risk Disclosure Document prescribed by SEBI & exchange before investing.',
    },
};
