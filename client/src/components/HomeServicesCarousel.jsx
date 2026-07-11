import React, { useEffect } from 'react';
import {
    Activity,
    ArrowUpRight,
    BarChart3,
    ChartCandlestick,
    ChevronLeft,
    ChevronRight,
    Compass,
    Gem,
    Layers3,
    LineChart,
    Radar,
    ScanSearch,
    ShieldCheck,
    Sprout,
    Target,
    TrendingUp,
    WalletCards,
} from 'lucide-react';
import { RouteLink } from '../router';
import { investmentServices, tradingServices } from '../data/homeServicesData';

const AUTO_SCROLL_DURATION_MS = 650;
const AUTO_SCROLL_INTERVAL_MS = 5000;
const LOOP_COPIES = 3;

const serviceIcons = {
    'facto-bluechip-core': Gem,
    'facto-portfolio-xray': ScanSearch,
    'facto-midcap-alpha': TrendingUp,
    'facto-valuelens': Target,
    'facto-smallcap-edge': Sprout,
    'facto-wealth-baskets': WalletCards,
    'facto-market-pulse': Activity,
    'facto-tradeedge': ChartCandlestick,
    'facto-swing-radar': Radar,
    'facto-momentum-radar': BarChart3,
    'facto-options-shield': ShieldCheck,
    'facto-commodity-compass': Compass,
};

const cardGroups = [
    {
        id: 'trading-services-carousel',
        eyebrow: 'Trading Services',
        // title: 'Trading Services',
        // description: 'Compact trading research services with clear levels, risk control, and scanner-backed pricing paths.',
        icon: LineChart,
        items: tradingServices,
    },
    {
        id: 'investment-services-carousel',
        eyebrow: 'Investing Services',
        // title: 'Investing Services',
        // description: 'Investment research packages for conservative, growth, value, small-cap, and basket-focused investors.',
        icon: BarChart3,
        items: investmentServices,
    },
];

const scrollTrack = (trackId, direction) => {
    const track = document.getElementById(trackId);
    if (!track) return;

    animateTrackScroll(track, track.scrollLeft + direction * getCardScrollDistance(track), 650);
};

const getLoopWidth = (track) => {
    const itemsPerCopy = Number(track.dataset.itemsPerCopy || 0);
    if (itemsPerCopy > 0) {
        return getCardScrollDistance(track) * itemsPerCopy;
    }

    const copies = Number(track.dataset.loopCopies || LOOP_COPIES);
    return copies > 1 ? track.scrollWidth / copies : track.scrollWidth;
};

const normalizeLoopPosition = (track) => {
    const loopWidth = getLoopWidth(track);
    if (!loopWidth) return;

    if (track.scrollLeft <= 1) {
        track.scrollLeft += loopWidth;
        return;
    }

    if (track.scrollLeft >= loopWidth * 2) {
        track.scrollLeft -= loopWidth;
    }
};

const getCardScrollDistance = (track) => {
    const firstCard = track.querySelector('.home-service-mini-card');
    if (!firstCard) return Math.min(track.clientWidth * 0.82, 360);

    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || 0);

    return firstCard.getBoundingClientRect().width + (Number.isFinite(gap) ? gap : 0);
};

const easeInOutCubic = (progress) => {
    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
};

const animateTrackScroll = (track, targetLeft, duration = AUTO_SCROLL_DURATION_MS) => {
    if (track.dataset.autoScrolling === 'true') return;

    const startLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const normalizedTarget = Math.max(0, Math.min(targetLeft, maxScroll));
    const distance = normalizedTarget - startLeft;

    if (Math.abs(distance) < 1) return;

    const startTime = performance.now();
    track.dataset.autoScrolling = 'true';
    track.classList.add('is-auto-scrolling');

    const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        track.scrollLeft = startLeft + distance * easeInOutCubic(progress);

        if (progress < 1) {
            window.requestAnimationFrame(step);
            return;
        }

        track.scrollLeft = normalizedTarget;
        normalizeLoopPosition(track);
        track.classList.remove('is-auto-scrolling');
        delete track.dataset.autoScrolling;
    };

    window.requestAnimationFrame(step);
};

const AutoCard = ({ item, Icon, isClone = false }) => {
    const CardIcon = serviceIcons[item.slug] || Icon;

    return (
        <article className="home-service-mini-card" aria-hidden={isClone || undefined}>
            <span className="home-service-mini-icon" aria-hidden="true">
                <CardIcon size={22} />
            </span>
            <div className="home-service-mini-copy">
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <RouteLink to={item.path || '/services'} className="home-service-mini-btn" tabIndex={isClone ? -1 : undefined}>
                    Explore More <ArrowUpRight size={15} />
                </RouteLink>
            </div>
        </article>
    );
};

const CarouselGroup = ({ group }) => {
    const Icon = group.icon;
    const groupTitle = group.title || group.eyebrow;
    const scrollLabel = groupTitle || 'services';
    const loopedItems = Array.from({ length: LOOP_COPIES }, (_, copyIndex) =>
        group.items.map((item) => ({ item, copyIndex }))
    ).flat();

    return (
        <div className={`home-services-group home-services-group--${group.id}`}>
            <div className="home-services-group-head">
                <div>
                    <span className="home-services-eyebrow">{group.eyebrow}</span>
                    {group.title && <h3>{group.title}</h3>}
                    {group.description && <p>{group.description}</p>}
                </div>
                <div className="home-services-scroll-controls" aria-label={`${scrollLabel} carousel controls`}>
                    <button type="button" onClick={() => scrollTrack(group.id, -1)} aria-label={`Scroll ${scrollLabel} left`}>
                        <ChevronLeft size={20} />
                    </button>
                    <button type="button" onClick={() => scrollTrack(group.id, 1)} aria-label={`Scroll ${scrollLabel} right`}>
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
            <div
                id={group.id}
                className="home-services-track"
                tabIndex={0}
                aria-label={`${scrollLabel} carousel`}
                data-loop-copies={LOOP_COPIES}
                data-items-per-copy={group.items.length}
            >
                {loopedItems.map(({ item, copyIndex }) => (
                    <AutoCard
                        key={`${group.id}-${copyIndex}-${item.title}`}
                        item={item}
                        Icon={Icon}
                        isClone={copyIndex !== 1}
                    />
                ))}
            </div>
        </div>
    );
};

const HomeServicesCarousel = () => {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return undefined;

        const tracks = Array.from(document.querySelectorAll('.home-services-track'));
        const trackHandlers = tracks.map((track) => {
            const loopWidth = getLoopWidth(track);
            if (loopWidth > 0) {
                track.scrollLeft = loopWidth;
            }

            const pause = () => {
                track.dataset.paused = 'true';
            };
            const resume = () => {
                delete track.dataset.paused;
            };

            track.addEventListener('pointerenter', pause);
            track.addEventListener('pointerleave', resume);
            track.addEventListener('focusin', pause);
            track.addEventListener('focusout', resume);

            return { track, pause, resume };
        });

        const timer = window.setInterval(() => {
            tracks.forEach((track) => {
                if (track.dataset.paused === 'true' || track.dataset.autoScrolling === 'true') return;

                normalizeLoopPosition(track);
                animateTrackScroll(track, track.scrollLeft + getCardScrollDistance(track));
            });
        }, AUTO_SCROLL_INTERVAL_MS);

        return () => {
            window.clearInterval(timer);
            trackHandlers.forEach(({ track, pause, resume }) => {
                track.removeEventListener('pointerenter', pause);
                track.removeEventListener('pointerleave', resume);
                track.removeEventListener('focusin', pause);
                track.removeEventListener('focusout', resume);
                track.classList.remove('is-auto-scrolling');
            });
        };
    }, []);

    return (
        <section className="section-padding home-services-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">Our Services</span>
                    {/* <h2 className="section-title">Trading, Investing, and HNI Services</h2> */}
                </div>

                {cardGroups.map((group) => (
                    <CarouselGroup key={group.id} group={group} />
                ))}
            </div>
        </section>
    );
};

export default HomeServicesCarousel;
