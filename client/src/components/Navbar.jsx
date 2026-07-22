import React, { useState, useEffect, useRef } from 'react';
import {
    Menu,
    X,
    ArrowUpRight,
    ChevronDown,
    Moon,
    Sun,
    BarChart3,
    BadgeDollarSign,
    BriefcaseBusiness,
    TrendingUp,
    Activity,
    ChartCandlestick,
    Layers3,
    PackageCheck,
    SearchCheck,
    ScanSearch,
    Sprout,
    Target,
} from 'lucide-react';
import { RouteLink } from '../router';
import { useRouter } from '../useRouter';
import { navLinks, pricingLinks } from '../routes';
import { siteData } from '../data/siteData';

const FONT_SCALE_STORAGE_KEY = 'factoFontScale';
const THEME_MODE_STORAGE_KEY = 'factoThemeMode';
const LEGACY_HIGH_CONTRAST_STORAGE_KEY = 'factoHighContrastMode';
const MIN_FONT_SCALE = 0.9;
const MAX_FONT_SCALE = 1.4;
const FONT_STEP = 0.1;
const ONBOARDING_URL = 'https://onboarding.cognifyai.in/Facto/';

const clampFontScale = (value) => {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 1;
    return Math.min(MAX_FONT_SCALE, Math.max(MIN_FONT_SCALE, numeric));
};

const serviceMenuGroups = [
    {
        title: 'Trading',
        items: [
            {
                key: 'facto-market-pulse',
                label: 'Market Pulse',
                path: '/services/trading/facto-market-pulse',
                Icon: BarChart3,
                accent: '#16a34a',
            },
            
            {
                key: 'facto-tradeedge',
                label: 'TradeEdge',
                path: '/services/trading/facto-tradeedge',
                Icon: TrendingUp,
                accent: '#dc2626',
                // subtitle: 'Cash market trading ideas with entry, target, and stop-loss.',
            },
            {
                key: 'facto-swing-radar',
                label: 'Swing Radar',
                path: '/services/trading/facto-swing-radar',
                Icon: Activity,
                accent: '#f97316',
                // subtitle: 'Swing trades with entry zone, multiple targets, and sizing.',
            },
            {
                key: 'facto-momentum-radar',
                label: 'Momentum Navigator',
                path: '/services/trading/facto-momentum-radar',
                Icon: BadgeDollarSign,
                accent: '#ca8a04',
                // subtitle: 'Breakout and volume-led momentum opportunities.',
            },
            {
                key: 'facto-options-shield',
                label: 'Options Shield',
                path: '/services/trading/facto-options-shield',
                Icon: Target,
                accent: '#7c3aed',
                // subtitle: 'Nifty and Bank Nifty option setups with risk controls.',
            },
            {
                key: 'facto-commodity-compass',
                label: 'Commodity Compass',
                path: '/services/trading/facto-commodity-compass',
                Icon: Layers3,
                accent: '#92400e',
                // subtitle: 'MCX research for gold, silver, crude oil, and natural gas.',
            },
        ],
    },
    {
        title: 'Investing',
        items: [
            {
                key: 'facto-bluechip-core',
                label: 'BlueChip Core',
                path: '/pricing/investment-services/facto-bluechip-core',
                Icon: BriefcaseBusiness,
                accent: '#0f766e',
                // subtitle: 'Large-cap research for conservative investors.',
            },
            {
                key: 'facto-portfolio-xray',
                label: 'Portfolio X-Ray',
                path: '/pricing/investment-services/facto-portfolio-xray',
                Icon: ScanSearch,
                accent: '#9333ea',
            },
            {
                key: 'facto-midcap-alpha',
                label: 'MidCap Alpha',
                path: '/pricing/investment-services/facto-midcap-alpha',
                Icon: ChartCandlestick,
                accent: '#ea580c',
                // subtitle: 'Mid-cap opportunities for growth investors.',
            },
            {
                key: 'facto-smallcap-edge',
                label: 'SmallCap Edge',
                path: '/pricing/investment-services/facto-smallcap-edge',
                Icon: Sprout,
                accent: '#be123c',
                // subtitle: 'Small-cap ideas for aggressive investors.',
            },
            {
                key: 'facto-valuelens',
                label: 'ValueLens',
                path: '/pricing/investment-services/facto-valuelens',
                Icon: SearchCheck,
                accent: '#15803d',
                // subtitle: 'Undervalued stocks with margin-of-safety analysis.',
            },
            {
                key: 'facto-wealth-baskets',
                label: 'Wealth Baskets',
                path: '/pricing/investment-services/facto-wealth-baskets',
                Icon: PackageCheck,
                accent: '#a16207',
                // subtitle: 'Ready-made model portfolios with rebalancing.',
            },
        ],
    },
];

const pricingMenuMeta = {
    '/pricing/stock-cash': {
        Icon: BriefcaseBusiness,
        accent: '#0ea5e9',
        // subtitle: 'Premium equity cash research with clear entry and exit levels.',
    },
    '/pricing/stock-future': {
        Icon: ChartCandlestick,
        accent: '#f97316',
        // subtitle: 'Trend-driven stock futures setups with risk-managed execution.',
    },
    '/pricing/stock-option': {
        Icon: Target,
        accent: '#e11d48',
        // subtitle: 'Stock options research with strike and volatility guidance.',
    },
    '/pricing/index-future': {
        Icon: Layers3,
        accent: '#16a34a',
        // subtitle: 'Nifty and Bank Nifty futures momentum for active traders.',
    },
    '/pricing/index-option': {
        Icon: ScanSearch,
        accent: '#7c3aed',
        // subtitle: 'Index options elite plans for expiry-based opportunities.',
    },
};

const productMenuItems = pricingLinks.map((item) => {
    const meta = pricingMenuMeta[item.path] || {};
    return {
        key: item.path,
        label: item.label,
        path: item.path,
        Icon: meta.Icon || BarChart3,
        accent: meta.accent || '#1B7FEA',
    };
});

const servicesDropdownGroups = serviceMenuGroups;

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
    const [fontScale, setFontScale] = useState(() => {
        if (typeof window === 'undefined') return 1;
        return clampFontScale(window.localStorage.getItem(FONT_SCALE_STORAGE_KEY) || 1);
    });
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window === 'undefined') return false;
        const storedThemeMode = window.localStorage.getItem(THEME_MODE_STORAGE_KEY);
        if (storedThemeMode === 'dark') return true;
        if (storedThemeMode === 'light') return false;
        return window.localStorage.getItem(LEGACY_HIGH_CONTRAST_STORAGE_KEY) === 'true';
    });
    const { path } = useRouter();
    const servicesMenuRef = useRef(null);
    const pricingMenuRef = useRef(null);
    const servicesTriggerRef = useRef(null);
    const pricingTriggerRef = useRef(null);
    const servicesDropdownRef = useRef(null);
    const pricingDropdownRef = useRef(null);
    const servicesCloseTimerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.style.fontSize = `${Math.round(fontScale * 100)}%`;
        window.localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(fontScale));
    }, [fontScale]);

    useEffect(() => {
        document.body.classList.toggle('theme-dark', isDarkMode);
        window.localStorage.setItem(THEME_MODE_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        return () => window.clearTimeout(servicesCloseTimerRef.current);
    }, []);

    useEffect(() => {
        const handleOpenServicesMenu = () => {
            const isMobile = window.matchMedia('(max-width: 900px)').matches;

            setIsPricingMenuOpen(false);
            setIsMobilePricingMenuOpen(false);

            if (isMobile) {
                setIsMobileMenuOpen(true);
                setIsMobileServicesMenuOpen(true);
                setIsServicesMenuOpen(false);
            } else {
                setIsMobileMenuOpen(false);
                setIsMobileServicesMenuOpen(false);
                setIsServicesMenuOpen(true);
                window.requestAnimationFrame(() => servicesTriggerRef.current?.focus());
            }
        };

        window.addEventListener('open-services-menu', handleOpenServicesMenu);
        return () => window.removeEventListener('open-services-menu', handleOpenServicesMenu);
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

    const serviceItemClassName = (item, baseClassName) => {
        return `${baseClassName} ${path === item.path ? 'active' : ''}`.trim();
    };

    const isServicesActive = path === '/services' || path.startsWith('/services/') || path.startsWith('/pricing/');
    const isPricingActive = path === '/pricing' || path.startsWith('/pricing/');
    const primaryNavLinks = navLinks.filter(
        (item) => item.path !== '/services' && item.path !== '/pricing' && item.path !== '/contact'
    );
    const contactLink = navLinks.find((item) => item.path === '/contact');

    const openServicesMenu = () => {
        window.clearTimeout(servicesCloseTimerRef.current);
        setIsPricingMenuOpen(false);
        setIsServicesMenuOpen(true);
    };

    const scheduleCloseServicesMenu = () => {
        window.clearTimeout(servicesCloseTimerRef.current);
        servicesCloseTimerRef.current = window.setTimeout(() => {
            setIsServicesMenuOpen(false);
        }, 180);
    };

    const openPricingMenu = () => {
        window.clearTimeout(servicesCloseTimerRef.current);
        setIsServicesMenuOpen(false);
        setIsPricingMenuOpen(true);
    };

    const scheduleClosePricingMenu = () => {
        window.clearTimeout(servicesCloseTimerRef.current);
        servicesCloseTimerRef.current = window.setTimeout(() => {
            setIsPricingMenuOpen(false);
        }, 140);
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

    const handleMobileClose = () => {
        setIsMobileMenuOpen(false);
        setIsMobileServicesMenuOpen(false);
        setIsMobilePricingMenuOpen(false);
    };

    const adjustFontScale = (direction) => {
        if (direction === 0) {
            setFontScale(1);
            return;
        }

        setFontScale((previousScale) => clampFontScale(previousScale + direction * FONT_STEP));
    };

    const toggleDarkMode = () => {
        setIsDarkMode((previous) => !previous);
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
                        onMouseLeave={scheduleCloseServicesMenu}
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
                                window.clearTimeout(servicesCloseTimerRef.current);
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
                                className="pricing-dropdown services-dropdown glass-card"
                                role="menu"
                                aria-labelledby="services-trigger"
                                onMouseEnter={openServicesMenu}
                                onMouseLeave={scheduleCloseServicesMenu}
                                onKeyDown={(event) => handleDesktopMenuKeyDown('services', event)}
                            >
                                {servicesDropdownGroups.map((group) => (
                                    <div key={group.title} className="pricing-dropdown-group">
                                        <span className="pricing-dropdown-group-title">{group.title}</span>
                                        {group.items.map((item) => (
                                            <RouteLink
                                                key={item.key}
                                                to={item.path}
                                                className={serviceItemClassName(item, 'pricing-dropdown-link')}
                                                onClick={() => {
                                                    setIsServicesMenuOpen(false);
                                                }}
                                                role="menuitem"
                                            >
                                                <span
                                                    className="services-menu-item-icon"
                                                    style={{ '--service-menu-accent': item.accent }}
                                                    aria-hidden="true"
                                                >
                                                    <item.Icon size={13} />
                                                </span>
                                                <span className="dropdown-link-copy">
                                                    <span className="dropdown-link-title">{item.label}</span>
                                                </span>
                                            </RouteLink>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div
                        className="pricing-menu"
                        ref={pricingMenuRef}
                        onMouseEnter={openPricingMenu}
                        onMouseLeave={scheduleClosePricingMenu}
                        onBlur={(event) => handleDesktopMenuBlur('pricing', event)}
                    >
                        <button
                            id="hni-research-trigger"
                            ref={pricingTriggerRef}
                            type="button"
                            className={`pricing-trigger ${isPricingActive ? 'active' : ''}`}
                            aria-haspopup="menu"
                            aria-expanded={isPricingMenuOpen}
                            aria-controls="pricing-dropdown-menu"
                            onKeyDown={(event) => handleDesktopTriggerKeyDown('pricing', event)}
                            onClick={() => {
                                window.clearTimeout(servicesCloseTimerRef.current);
                                setIsServicesMenuOpen(false);
                                setIsPricingMenuOpen((open) => !open);
                            }}
                        >
                            HNI Research <ChevronDown size={14} className={isPricingMenuOpen ? 'open' : ''} />
                        </button>
                        {isPricingMenuOpen && (
                            <div
                                id="pricing-dropdown-menu"
                                ref={pricingDropdownRef}
                                className="pricing-dropdown hni-research-dropdown glass-card"
                                role="menu"
                                aria-labelledby="hni-research-trigger"
                                onMouseEnter={openPricingMenu}
                                onMouseLeave={scheduleClosePricingMenu}
                                onKeyDown={(event) => handleDesktopMenuKeyDown('pricing', event)}
                            >
                                <div className="pricing-dropdown-group">
                                    <span className="pricing-dropdown-group-title">HNI Insights</span>
                                    {productMenuItems.map((item) => (
                                        <RouteLink
                                            key={item.key}
                                            to={item.path}
                                            className={serviceItemClassName(item, 'pricing-dropdown-link')}
                                            onClick={() => setIsPricingMenuOpen(false)}
                                            role="menuitem"
                                        >
                                            <span
                                                className="services-menu-item-icon"
                                                style={{ '--service-menu-accent': item.accent }}
                                                aria-hidden="true"
                                            >
                                                <item.Icon size={13} />
                                            </span>
                                            <span className="dropdown-link-copy">
                                                <span className="dropdown-link-title">{item.label}</span>
                                            </span>
                                        </RouteLink>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {contactLink && (
                        <RouteLink to={contactLink.path} className={linkClassName(contactLink.path)}>
                            {contactLink.label}
                        </RouteLink>
                    )}
                    <div className="nav-accessibility-controls" aria-label="Accessibility settings">
                        <button
                            type="button"
                            className="nav-a11y-btn"
                            onClick={() => adjustFontScale(-1)}
                            aria-label="Decrease text size"
                        >
                            A-
                        </button>
                        <button
                            type="button"
                            className="nav-a11y-btn"
                            onClick={() => adjustFontScale(0)}
                            aria-label="Reset text size"
                        >
                            A
                        </button>
                        <button
                            type="button"
                            className="nav-a11y-btn"
                            onClick={() => adjustFontScale(1)}
                            aria-label="Increase text size"
                        >
                            A+
                        </button>
                        <button
                            type="button"
                            className={`nav-a11y-btn ${isDarkMode ? 'is-active' : ''}`.trim()}
                            onClick={toggleDarkMode}
                            aria-pressed={isDarkMode}
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? (
                                <>
                                    <Sun size={13} />
                                    <span>Light</span>
                                </>
                            ) : (
                                <>
                                    <Moon size={13} />
                                    <span>Dark</span>
                                </>
                            )}
                        </button>
                    </div>
                    <RouteLink
                        to={ONBOARDING_URL}
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
                            {servicesDropdownGroups.map((group) => (
                                <div key={group.title} className="mobile-pricing-link-group">
                                    <span className="pricing-dropdown-group-title">{group.title}</span>
                                    {group.items.map((item) => (
                                        <RouteLink
                                            key={item.key}
                                            to={item.path}
                                            className={serviceItemClassName(item, 'mobile-pricing-link-card')}
                                            onClick={() => {
                                                handleMobileClose();
                                            }}
                                        >
                                            <span
                                                className="services-menu-item-icon"
                                                style={{ '--service-menu-accent': item.accent }}
                                                aria-hidden="true"
                                            >
                                                <item.Icon size={13} />
                                            </span>
                                            <span className="dropdown-link-copy">
                                                <span className="dropdown-link-title">{item.label}</span>
                                            </span>
                                        </RouteLink>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                    <button
                        type="button"
                        className={`mobile-pricing-trigger ${isPricingActive ? 'active' : ''}`}
                        aria-expanded={isMobilePricingMenuOpen}
                        aria-controls="mobile-hni-research-dropdown"
                        onClick={() => {
                            setIsMobileServicesMenuOpen(false);
                            setIsMobilePricingMenuOpen((open) => !open);
                        }}
                    >
                        HNI Research <ChevronDown size={14} className={isMobilePricingMenuOpen ? 'open' : ''} />
                    </button>
                    {isMobilePricingMenuOpen && (
                        <div id="mobile-hni-research-dropdown" className="mobile-pricing-links">
                            <span className="pricing-dropdown-group-title">HNI Insights</span>
                            {productMenuItems.map((item) => (
                                <RouteLink
                                    key={item.key}
                                    to={item.path}
                                    className={serviceItemClassName(item, 'mobile-pricing-link-card')}
                                    onClick={handleMobileClose}
                                >
                                    <span
                                        className="services-menu-item-icon"
                                        style={{ '--service-menu-accent': item.accent }}
                                        aria-hidden="true"
                                    >
                                        <item.Icon size={13} />
                                    </span>
                                    <span className="dropdown-link-copy">
                                        <span className="dropdown-link-title">{item.label}</span>
                                    </span>
                                </RouteLink>
                            ))}
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
                    <div className="mobile-a11y-controls" aria-label="Accessibility settings">
                        <button
                            type="button"
                            className="nav-a11y-btn"
                            onClick={() => adjustFontScale(-1)}
                            aria-label="Decrease text size"
                        >
                            A-
                        </button>
                        <button
                            type="button"
                            className="nav-a11y-btn"
                            onClick={() => adjustFontScale(0)}
                            aria-label="Reset text size"
                        >
                            A
                        </button>
                        <button
                            type="button"
                            className="nav-a11y-btn"
                            onClick={() => adjustFontScale(1)}
                            aria-label="Increase text size"
                        >
                            A+
                        </button>
                        <button
                            type="button"
                            className={`nav-a11y-btn ${isDarkMode ? 'is-active' : ''}`.trim()}
                            onClick={toggleDarkMode}
                            aria-pressed={isDarkMode}
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? (
                                <>
                                    <Sun size={13} />
                                    <span>Light</span>
                                </>
                            ) : (
                                <>
                                    <Moon size={13} />
                                    <span>Dark</span>
                                </>
                            )}
                        </button>
                    </div>
                    <RouteLink
                        to={ONBOARDING_URL}
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
