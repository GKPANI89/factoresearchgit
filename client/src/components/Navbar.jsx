import React, { useState, useEffect, useRef } from 'react';
import {
    Menu,
    X,
    ArrowUpRight,
    ChevronDown,
    BarChart3,
    TrendingUp,
    Activity,
    Layers3,
    Target,
    Sparkles,
} from 'lucide-react';
import { RouteLink } from '../router';
import { useRouter } from '../useRouter';
import { navLinks, pricingLinks } from '../routes';
import { siteData } from '../data/siteData';

const serviceLinks = [
    {
        key: 'equity-research',
        label: 'EQUITIES | F&O | MCX Research Analysis',
        path: '/services/equity-research',
        Icon: TrendingUp,
        subtitle: 'Research-backed stock ideas with entry, exit, and risk guidance.',
    },
    {
        key: 'fundamental-research',
        label: 'Fundamental Research Reports',
        path: '/services/fundamental-research',
        Icon: BarChart3,
        subtitle: 'Business, valuation, and financial quality analysis for investors.',
    },
    {
        key: 'technical-analysis',
        label: 'Technical Analysis, Market Trends & Live Index Tracking',
        path: '/services/technical-analysis',
        Icon: Activity,
        subtitle: 'Momentum, charts, index tracking, and short-term market structure.',
    },
    {
        key: 'portfolio-baskets',
        label: 'Portfolio Baskets',
        path: '/services/portfolio-baskets',
        Icon: Layers3,
        subtitle: 'Curated baskets with allocation logic and periodic review updates.',
    },
    {
        key: 'thematic-sectoral',
        label: 'Thematic & Sectoral Research',
        path: '/services/thematic-sectoral',
        Icon: Target,
        subtitle: 'Sector-focused research across emerging trends and market cycles.',
    },
    {
        key: 'educational-content',
        label: 'Educational Content & Market Learning',
        path: '/services/educational-content',
        Icon: Sparkles,
        subtitle: 'Courses, webinars, and practical market-learning resources.',
    },
];

const pricingMenuMeta = {
    '/pricing/stock-cash': {
        Icon: BarChart3,
        subtitle: 'Cash market recommendations with clear entry and exit levels.',
    },
    '/pricing/stock-future': {
        Icon: TrendingUp,
        subtitle: 'Trend-driven futures setups with risk-managed execution.',
    },
    '/pricing/stock-option': {
        Icon: Activity,
        subtitle: 'Stock option strategies with strike and volatility guidance.',
    },
    '/pricing/index-future': {
        Icon: Layers3,
        subtitle: 'Nifty and Bank Nifty futures calls for active traders.',
    },
    '/pricing/index-option': {
        Icon: Target,
        subtitle: 'Index option plans for expiry-based market opportunities.',
    },
    '/pricing/investment-services': {
        Icon: Sparkles,
        subtitle: 'Research-led portfolio and investment planning support.',
    },
};

const getMenuItems = (menuElement) => {
    if (!menuElement) return [];

    return Array.from(
        menuElement.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
    const [isPricingMenuOpen, setIsPricingMenuOpen] = useState(false);
    const [isMobileServicesMenuOpen, setIsMobileServicesMenuOpen] = useState(false);
    const [isMobilePricingMenuOpen, setIsMobilePricingMenuOpen] = useState(false);
    const { path } = useRouter();
    const servicesMenuRef = useRef(null);
    const pricingMenuRef = useRef(null);
    const servicesTriggerRef = useRef(null);
    const pricingTriggerRef = useRef(null);
    const servicesDropdownRef = useRef(null);
    const pricingDropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target)) {
                setIsServicesMenuOpen(false);
            }
            if (pricingMenuRef.current && !pricingMenuRef.current.contains(event.target)) {
                setIsPricingMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key !== 'Escape') return;

            if (isServicesMenuOpen) {
                setIsServicesMenuOpen(false);
                servicesTriggerRef.current?.focus();
            }

            if (isPricingMenuOpen) {
                setIsPricingMenuOpen(false);
                pricingTriggerRef.current?.focus();
            }

            if (isMobileMenuOpen || isMobileServicesMenuOpen || isMobilePricingMenuOpen) {
                setIsMobileMenuOpen(false);
                setIsMobileServicesMenuOpen(false);
                setIsMobilePricingMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isServicesMenuOpen, isPricingMenuOpen, isMobileMenuOpen, isMobileServicesMenuOpen, isMobilePricingMenuOpen]);

    useEffect(() => {
        const resetId = window.requestAnimationFrame(() => {
            setIsServicesMenuOpen(false);
            setIsPricingMenuOpen(false);
            setIsMobileMenuOpen(false);
            setIsMobileServicesMenuOpen(false);
            setIsMobilePricingMenuOpen(false);
        });

        return () => window.cancelAnimationFrame(resetId);
    }, [path]);

    const linkClassName = (targetPath) => {
        const normalizedTargetPath = (targetPath || '').split('?')[0].split('#')[0] || '/';
        return path === normalizedTargetPath ? 'active' : '';
    };

    const isServicesActive = path === '/services' || path.startsWith('/services/');
    const isPricingActive = path === '/pricing' || path.startsWith('/pricing/');
    const primaryNavLinks = navLinks.filter(
        (item) => item.path !== '/services' && item.path !== '/pricing' && item.path !== '/contact'
    );
    const contactLink = navLinks.find((item) => item.path === '/contact');

    const openServicesMenu = () => {
        setIsPricingMenuOpen(false);
        setIsServicesMenuOpen(true);
    };

    const openPricingMenu = () => {
        setIsServicesMenuOpen(false);
        setIsPricingMenuOpen(true);
    };

    const handleDesktopMenuBlur = (menuType, event) => {
        const rootRef = menuType === 'services' ? servicesMenuRef : pricingMenuRef;
        const setOpen = menuType === 'services' ? setIsServicesMenuOpen : setIsPricingMenuOpen;
        const nextFocused = event.relatedTarget;

        if (rootRef.current && nextFocused && rootRef.current.contains(nextFocused)) {
            return;
        }

        setOpen(false);
    };

    const focusMenuItem = (menuType, itemIndex) => {
        const dropdownRef = menuType === 'services' ? servicesDropdownRef : pricingDropdownRef;
        const items = getMenuItems(dropdownRef.current);

        if (!items.length) return;

        const normalizedIndex = ((itemIndex % items.length) + items.length) % items.length;
        items[normalizedIndex]?.focus();
    };

    const handleDesktopTriggerKeyDown = (menuType, event) => {
        const isServices = menuType === 'services';
        const isOpen = isServices ? isServicesMenuOpen : isPricingMenuOpen;

        if (event.key === 'Escape') {
            if (!isOpen) return;
            event.preventDefault();
            if (isServices) {
                setIsServicesMenuOpen(false);
                servicesTriggerRef.current?.focus();
            } else {
                setIsPricingMenuOpen(false);
                pricingTriggerRef.current?.focus();
            }
            return;
        }

        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
            return;
        }

        event.preventDefault();

        if (isServices) {
            openServicesMenu();
        } else {
            openPricingMenu();
        }

        const targetIndex = event.key === 'ArrowUp' ? -1 : 0;
        window.requestAnimationFrame(() => {
            focusMenuItem(menuType, targetIndex);
        });
    };

    const handleDesktopMenuKeyDown = (menuType, event) => {
        const dropdownRef = menuType === 'services' ? servicesDropdownRef : pricingDropdownRef;
        const setOpen = menuType === 'services' ? setIsServicesMenuOpen : setIsPricingMenuOpen;
        const triggerRef = menuType === 'services' ? servicesTriggerRef : pricingTriggerRef;

        if (event.key === 'Escape') {
            event.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
            return;
        }

        const items = getMenuItems(dropdownRef.current);
        if (!items.length) return;

        const currentIndex = items.indexOf(document.activeElement);

        if (event.key === 'Home') {
            event.preventDefault();
            items[0]?.focus();
            return;
        }

        if (event.key === 'End') {
            event.preventDefault();
            items[items.length - 1]?.focus();
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
            focusMenuItem(menuType, nextIndex);
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            const nextIndex = currentIndex >= 0 ? currentIndex - 1 : items.length - 1;
            focusMenuItem(menuType, nextIndex);
        }
    };

    const renderRichDropdownLink = (item, metaMap, FallbackIcon, className, onClick, extraProps = {}) => {
        const meta = metaMap[item.path] || {};
        const Icon = meta.Icon || FallbackIcon;
        return (
            <RouteLink key={item.path} to={item.path} className={className} onClick={onClick} {...extraProps}>
                <span className="dropdown-link-icon">
                    <Icon size={16} />
                </span>
                <span className="dropdown-link-copy">
                    <span className="dropdown-link-title">{item.label}</span>
                    <span className="dropdown-link-subtitle">{meta.subtitle}</span>
                </span>
            </RouteLink>
        );
    };

    const handleMobileClose = () => {
        setIsMobileMenuOpen(false);
        setIsMobileServicesMenuOpen(false);
        setIsMobilePricingMenuOpen(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <div className="logo">
                    <RouteLink to="/">
                        <img
                            src={siteData.brand.logoUrl}
                            alt={`${siteData.brand.name} Logo`}
                            className="logo-img"
                        />
                    </RouteLink>
                </div>

                <div className="nav-links desktop">
                    {primaryNavLinks.map((item) => (
                        <RouteLink key={item.path} to={item.path} className={linkClassName(item.path)}>
                            {item.label}
                        </RouteLink>
                    ))}
                    <div
                        className="pricing-menu"
                        ref={servicesMenuRef}
                        onMouseEnter={openServicesMenu}
                        onBlur={(event) => handleDesktopMenuBlur('services', event)}
                    >
                        <button
                            id="services-trigger"
                            ref={servicesTriggerRef}
                            type="button"
                            className={`pricing-trigger ${isServicesActive ? 'active' : ''}`}
                            aria-haspopup="menu"
                            aria-expanded={isServicesMenuOpen}
                            aria-controls="services-dropdown-menu"
                            onKeyDown={(event) => handleDesktopTriggerKeyDown('services', event)}
                            onClick={() => {
                                setIsPricingMenuOpen(false);
                                setIsServicesMenuOpen((open) => !open);
                            }}
                        >
                            Services <ChevronDown size={14} className={isServicesMenuOpen ? 'open' : ''} />
                        </button>
                        {isServicesMenuOpen && (
                            <div
                                id="services-dropdown-menu"
                                ref={servicesDropdownRef}
                                className="pricing-dropdown glass-card"
                                role="menu"
                                aria-labelledby="services-trigger"
                                onKeyDown={(event) => handleDesktopMenuKeyDown('services', event)}
                            >
                                {serviceLinks.map((item) => (
                                    <RouteLink
                                        key={item.key}
                                        to={item.path}
                                        className={`pricing-dropdown-link ${linkClassName(item.path)}`}
                                        onClick={() => setIsServicesMenuOpen(false)}
                                        role="menuitem"
                                    >
                                        <span className="dropdown-link-icon">
                                            <item.Icon size={16} />
                                        </span>
                                        <span className="dropdown-link-copy">
                                            <span className="dropdown-link-title">{item.label}</span>
                                            <span className="dropdown-link-subtitle">{item.subtitle}</span>
                                        </span>
                                    </RouteLink>
                                ))}
                            </div>
                        )}
                    </div>
                    <div
                        className="pricing-menu"
                        ref={pricingMenuRef}
                        onMouseEnter={openPricingMenu}
                        onBlur={(event) => handleDesktopMenuBlur('pricing', event)}
                    >
                        <button
                            id="pricing-trigger"
                            ref={pricingTriggerRef}
                            type="button"
                            className={`pricing-trigger ${isPricingActive ? 'active' : ''}`}
                            aria-haspopup="menu"
                            aria-expanded={isPricingMenuOpen}
                            aria-controls="pricing-dropdown-menu"
                            onKeyDown={(event) => handleDesktopTriggerKeyDown('pricing', event)}
                            onClick={() => {
                                setIsServicesMenuOpen(false);
                                setIsPricingMenuOpen((open) => !open);
                            }}
                        >
                            Pricing <ChevronDown size={14} className={isPricingMenuOpen ? 'open' : ''} />
                        </button>
                        {isPricingMenuOpen && (
                            <div
                                id="pricing-dropdown-menu"
                                ref={pricingDropdownRef}
                                className="pricing-dropdown glass-card"
                                role="menu"
                                aria-labelledby="pricing-trigger"
                                onKeyDown={(event) => handleDesktopMenuKeyDown('pricing', event)}
                            >
                                {pricingLinks.map((item) =>
                                    renderRichDropdownLink(
                                        item,
                                        pricingMenuMeta,
                                        BarChart3,
                                        `pricing-dropdown-link ${linkClassName(item.path)}`,
                                        () => setIsPricingMenuOpen(false),
                                        { role: 'menuitem' }
                                    )
                                )}
                            </div>
                        )}
                    </div>
                    {contactLink && (
                        <RouteLink to={contactLink.path} className={linkClassName(contactLink.path)}>
                            {contactLink.label}
                        </RouteLink>
                    )}
                    <RouteLink
                        to={siteData.hero.primaryAction.path}
                        className="nav-cta"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Onboarding <ArrowUpRight size={16} />
                    </RouteLink>
                </div>

                <button
                    type="button"
                    className="mobile-menu-btn"
                    aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={isMobileMenuOpen}
                    onClick={() => {
                        setIsMobileMenuOpen(!isMobileMenuOpen);
                    }}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    {primaryNavLinks.map((item) => (
                        <RouteLink
                            key={item.path}
                            to={item.path}
                            className={linkClassName(item.path)}
                            onClick={handleMobileClose}
                        >
                            {item.label}
                        </RouteLink>
                    ))}
                    <button
                        type="button"
                        className={`mobile-pricing-trigger ${isServicesActive ? 'active' : ''}`}
                        aria-expanded={isMobileServicesMenuOpen}
                        aria-controls="mobile-services-dropdown"
                        onClick={() => {
                            setIsMobilePricingMenuOpen(false);
                            setIsMobileServicesMenuOpen((open) => !open);
                        }}
                    >
                        Services <ChevronDown size={14} className={isMobileServicesMenuOpen ? 'open' : ''} />
                    </button>
                    {isMobileServicesMenuOpen && (
                        <div id="mobile-services-dropdown" className="mobile-pricing-links">
                            {serviceLinks.map((item) => (
                                <RouteLink
                                    key={item.key}
                                    to={item.path}
                                    className={`mobile-pricing-link-card ${linkClassName(item.path)}`}
                                    onClick={handleMobileClose}
                                >
                                    <span className="dropdown-link-icon">
                                        <item.Icon size={16} />
                                    </span>
                                    <span className="dropdown-link-copy">
                                        <span className="dropdown-link-title">{item.label}</span>
                                        <span className="dropdown-link-subtitle">{item.subtitle}</span>
                                    </span>
                                </RouteLink>
                            ))}
                        </div>
                    )}
                    <button
                        type="button"
                        className={`mobile-pricing-trigger ${isPricingActive ? 'active' : ''}`}
                        aria-expanded={isMobilePricingMenuOpen}
                        aria-controls="mobile-pricing-dropdown"
                        onClick={() => {
                            setIsMobileServicesMenuOpen(false);
                            setIsMobilePricingMenuOpen((open) => !open);
                        }}
                    >
                        Pricing <ChevronDown size={14} className={isMobilePricingMenuOpen ? 'open' : ''} />
                    </button>
                    {isMobilePricingMenuOpen && (
                        <div id="mobile-pricing-dropdown" className="mobile-pricing-links">
                            {pricingLinks.map((item) =>
                                renderRichDropdownLink(
                                    item,
                                    pricingMenuMeta,
                                    BarChart3,
                                    `mobile-pricing-link-card ${linkClassName(item.path)}`,
                                    handleMobileClose
                                )
                            )}
                        </div>
                    )}
                    {contactLink && (
                        <RouteLink
                            to={contactLink.path}
                            className={linkClassName(contactLink.path)}
                            onClick={handleMobileClose}
                        >
                            {contactLink.label}
                        </RouteLink>
                    )}
                    <RouteLink
                        to={siteData.hero.primaryAction.path}
                        className="nav-cta"
                        onClick={handleMobileClose}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Onboarding
                    </RouteLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
