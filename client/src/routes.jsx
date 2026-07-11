import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import OnboardingPage from './pages/OnboardingPage';
import StockCashPricingPage from './pages/pricing/StockCashPricingPage';
import StockFuturePricingPage from './pages/pricing/StockFuturePricingPage';
import StockOptionPricingPage from './pages/pricing/StockOptionPricingPage';
import IndexFuturePricingPage from './pages/pricing/IndexFuturePricingPage';
import IndexOptionPricingPage from './pages/pricing/IndexOptionPricingPage';
import InvestmentServiceDetailPage from './pages/InvestmentServiceDetailPage';
import TradingServiceDetailPage from './pages/TradingServiceDetailPage';
import DisclaimerPage from './pages/legal/DisclaimerPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsConditionsPage from './pages/legal/TermsConditionsPage';
import MITCPage from './pages/legal/MITCPage';
import ReturnRefundPolicyPage from './pages/legal/ReturnRefundPolicyPage';
import GrievanceRedressalPage from './pages/legal/GrievanceRedressalPage';
import InvestorCharterPage from './pages/legal/InvestorCharterPage';
import ComplaintBoardPage from './pages/legal/ComplaintBoardPage';
import ComplianceAuditStatusPage from './pages/legal/ComplianceAuditStatusPage';
import AccessibilityStatementPage from './pages/AccessibilityStatementPage';
import SitemapPage from './pages/SitemapPage';
import { ROUTE_SEO } from './seo/routeSeoData';

export const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact Us', path: '/contact' },
];

export const pricingLinks = [
    { label: 'Facto Equity Cash Alpha', path: '/pricing/stock-cash' },
    { label: 'Facto Stock Futures Pro', path: '/pricing/stock-future' },
    { label: 'Facto Stock Options Elite', path: '/pricing/stock-option' },
    { label: 'Facto Index Futures Momentum', path: '/pricing/index-future' },
    { label: 'Facto Index Options Elite', path: '/pricing/index-option' },
];

export const routeComponents = {
    '/': HomePage,
    '/services': ServicesPage,
    '/services/equity-research': ServiceDetailPage,
    '/services/fundamental-research': ServiceDetailPage,
    '/services/technical-analysis': ServiceDetailPage,
    '/services/portfolio-baskets': ServiceDetailPage,
    '/services/thematic-sectoral': ServiceDetailPage,
    '/services/educational-content': ServiceDetailPage,
    '/services/trading/facto-market-pulse': TradingServiceDetailPage,
    '/services/trading/facto-tradeedge': TradingServiceDetailPage,
    '/services/trading/facto-swing-radar': TradingServiceDetailPage,
    '/services/trading/facto-momentum-radar': TradingServiceDetailPage,
    '/services/trading/facto-options-shield': TradingServiceDetailPage,
    '/services/trading/facto-commodity-compass': TradingServiceDetailPage,
    '/pricing': PricingPage,
    '/pricing/stock-cash': StockCashPricingPage,
    '/pricing/stock-future': StockFuturePricingPage,
    '/pricing/stock-option': StockOptionPricingPage,
    '/pricing/index-future': IndexFuturePricingPage,
    '/pricing/index-option': IndexOptionPricingPage,
    '/pricing/investment-services/facto-bluechip-core': InvestmentServiceDetailPage,
    '/pricing/investment-services/facto-portfolio-xray': InvestmentServiceDetailPage,
    '/pricing/investment-services/facto-midcap-alpha': InvestmentServiceDetailPage,
    '/pricing/investment-services/facto-valuelens': InvestmentServiceDetailPage,
    '/pricing/investment-services/facto-smallcap-edge': InvestmentServiceDetailPage,
    '/pricing/investment-services/facto-wealth-baskets': InvestmentServiceDetailPage,
    '/about': AboutPage,
    '/contact': ContactPage,
    '/onboarding': OnboardingPage,
    '/legal/disclaimer': DisclaimerPage,
    '/legal/privacy-policy': PrivacyPolicyPage,
    '/legal/terms-and-conditions': TermsConditionsPage,
    '/legal/mitc': MITCPage,
    '/legal/return-and-refund-policy': ReturnRefundPolicyPage,
    '/legal/grievance-redressal': GrievanceRedressalPage,
    '/legal/investor-charter': InvestorCharterPage,
    '/legal/complaint-board': ComplaintBoardPage,
    '/legal/compliance-audit-status': ComplianceAuditStatusPage,
    '/accessibility': AccessibilityStatementPage,
    '/sitemap': SitemapPage,
};

export const routeTitles = Object.fromEntries(
    Object.entries(ROUTE_SEO).map(([path, seo]) => [path, seo.title])
);
