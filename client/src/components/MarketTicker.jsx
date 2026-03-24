import React, { useEffect, useState } from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { getApiBaseUrl } from '../utils/apiBaseUrl';

const LIVE_REFRESH_INTERVAL_MS = 1000;
const OFF_MARKET_REFRESH_INTERVAL_MS = 60000;
const REQUEST_TIMEOUT_MS = 8500;
const MIN_QUOTES_FOR_FEED = 1;
const DAY_SNAPSHOT_KEY = 'marketTickerDaySnapshotV1';
const MARKET_API_BASE_URL = getApiBaseUrl();
const MARKET_TIMEZONE = 'Asia/Kolkata';
const MARKET_OPEN_HHMM = 915;
const MARKET_CLOSE_HHMM = 1530;

const MARKET_INDEXES = [
    { label: 'SENSEX', symbol: '^BSESN', logo: '/images/market/bse.svg' },
    { label: 'BANKNIFTY', symbol: '^NSEBANK', logo: '/images/market/nse.svg' },
    { label: 'NIFTY 50', symbol: '^NSEI', logo: '/images/market/nse.svg' },
    { label: 'FINNIFTY', symbol: '^CNXFIN', logo: '/images/market/nse.svg' },
    { label: 'NIFTY MIDCAP 50', symbol: '^NSEMDCP50', logo: '/images/market/nse.svg' },
    { label: 'NIFTY IT', symbol: '^CNXIT', logo: '/images/market/nse.svg' },
];

const emptyQuote = (index) => ({
    ...index,
    price: null,
    change: null,
    changePercent: null,
});

const getTodayKey = () => new Date().toISOString().slice(0, 10);

const readDaySnapshot = () => {
    try {
        const raw = localStorage.getItem(DAY_SNAPSHOT_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed?.day !== getTodayKey() || !Array.isArray(parsed?.quotes)) return null;
        return parsed.quotes;
    } catch {
        return null;
    }
};

const writeDaySnapshot = (quotes) => {
    try {
        localStorage.setItem(
            DAY_SNAPSHOT_KEY,
            JSON.stringify({
                day: getTodayKey(),
                quotes,
            })
        );
    } catch {
        // Ignore storage failures; ticker can still run from in-memory state.
    }
};

const toFiniteNumber = (value) => {
    const parsed = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : null;
};

const formatSigned = (value) => {
    if (typeof value !== 'number') return '--';
    const formatted = Math.abs(value).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return `${value >= 0 ? '+' : '-'}${formatted}`;
};

const formatPrice = (value) => {
    if (typeof value !== 'number') return '--';
    return value.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

const getIndianMarketClock = () => {
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: MARKET_TIMEZONE,
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).formatToParts(new Date());

    const byType = (type) => parts.find((part) => part.type === type)?.value || '';
    const weekday = byType('weekday');
    const hour = Number(byType('hour'));
    const minute = Number(byType('minute'));
    const hhmm = Number.isFinite(hour) && Number.isFinite(minute) ? hour * 100 + minute : -1;

    return { weekday, hhmm };
};

const isIndianMarketRunning = () => {
    const { weekday, hhmm } = getIndianMarketClock();
    if (weekday === 'Sat' || weekday === 'Sun') return false;
    return hhmm >= MARKET_OPEN_HHMM && hhmm <= MARKET_CLOSE_HHMM;
};

const fetchJsonWithTimeout = async (url) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            cache: 'no-store',
            signal: controller.signal,
            headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
            const error = new Error(`Ticker fetch failed with status ${response.status}`);
            error.status = response.status;
            throw error;
        }

        return await response.json();
    } finally {
        clearTimeout(timeoutId);
    }
};

const buildQuoteEndpoints = () => {
    const symbols = MARKET_INDEXES.map((index) => index.symbol).join(',');
    const encoded = encodeURIComponent(symbols);
    const serverProxy = `${MARKET_API_BASE_URL}/api/market-quotes?symbols=${encoded}`;
    const direct = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encoded}`;
    const cors = `https://api.allorigins.win/raw?url=${encodeURIComponent(direct)}`;

    return import.meta.env.DEV ? [serverProxy, cors] : [serverProxy];
};

const extractQuoteMapFromPayload = (payload) => {
    const results = Array.isArray(payload?.quoteResponse?.result) ? payload.quoteResponse.result : [];
    const quoteMap = new Map();

    for (const result of results) {
        const symbol = typeof result?.symbol === 'string' ? result.symbol.toUpperCase() : '';
        if (!symbol) continue;

        const price = toFiniteNumber(result.regularMarketPrice);
        const previousClose = toFiniteNumber(result.regularMarketPreviousClose);
        let change = toFiniteNumber(result.regularMarketChange);
        let changePercent = toFiniteNumber(result.regularMarketChangePercent);

        if (change === null && typeof price === 'number' && typeof previousClose === 'number') {
            change = price - previousClose;
        }

        if (changePercent === null && typeof change === 'number' && typeof previousClose === 'number' && previousClose !== 0) {
            changePercent = (change / previousClose) * 100;
        }

        quoteMap.set(symbol, { price, change, changePercent });
    }

    return quoteMap;
};

const fetchLiveQuotes = async () => {
    let sawRateLimit = false;

    for (const endpoint of buildQuoteEndpoints()) {
        try {
            const payload = await fetchJsonWithTimeout(endpoint);
            const quoteMap = extractQuoteMapFromPayload(payload);
            const mapped = MARKET_INDEXES.map((index) => {
                const parsed = quoteMap.get(index.symbol.toUpperCase());
                return parsed ? { ...index, ...parsed } : emptyQuote(index);
            });
            const hasLiveData = mapped.some((item) => typeof item.price === 'number');
            if (hasLiveData) {
                return mapped;
            }
        } catch (error) {
            if (error?.status === 429) {
                sawRateLimit = true;
            }
        }
    }

    if (sawRateLimit) {
        const error = new Error('Ticker request rate-limited.');
        error.status = 429;
        throw error;
    }

    return MARKET_INDEXES.map(emptyQuote);
};

const getNextRefreshIntervalMs = () =>
    isIndianMarketRunning() ? LIVE_REFRESH_INTERVAL_MS : OFF_MARKET_REFRESH_INTERVAL_MS;

const MarketTicker = () => {
    const [quotes, setQuotes] = useState(() => readDaySnapshot() || MARKET_INDEXES.map(emptyQuote));
    const [hasError, setHasError] = useState(false);
    const [isTickerPaused, setIsTickerPaused] = useState(false);
    const [isTickerVisible, setIsTickerVisible] = useState(true);

    useEffect(() => {
        let isMounted = true;
        let timerId = null;

        const pollQuotes = async () => {
            const cycleStartedAt = Date.now();

            try {
                const mappedQuotes = await fetchLiveQuotes();
                if (!isMounted) return;

                const liveQuotes = mappedQuotes.filter((item) => typeof item.price === 'number');
                const hasLiveData = liveQuotes.length >= MIN_QUOTES_FOR_FEED;
                if (hasLiveData) {
                    setQuotes(liveQuotes);
                    writeDaySnapshot(liveQuotes);
                    setHasError(false);
                } else {
                    const snapshot = readDaySnapshot();
                    if (snapshot?.length) {
                        setQuotes(snapshot);
                        setHasError(false);
                    } else {
                        setQuotes(mappedQuotes);
                        setHasError(true);
                    }
                }
            } catch {
                if (!isMounted) return;
                const snapshot = readDaySnapshot();
                if (snapshot?.length) {
                    setQuotes(snapshot);
                    setHasError(false);
                } else {
                    setHasError(true);
                }
            }

            if (isMounted) {
                const targetInterval = getNextRefreshIntervalMs();
                const elapsed = Date.now() - cycleStartedAt;
                const nextDelay = Math.max(250, targetInterval - elapsed);
                timerId = window.setTimeout(pollQuotes, nextDelay);
            }
        };

        pollQuotes();

        return () => {
            isMounted = false;
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, []);

    return (
        <section className={`market-ticker ${isTickerVisible ? '' : 'is-hidden'}`.trim()} aria-label="Live market values">
            <div className="ticker-shell">
                <button
                    type="button"
                    className="ticker-toggle-btn ticker-visibility-btn"
                    onClick={() => setIsTickerVisible((visible) => !visible)}
                    aria-expanded={isTickerVisible}
                    aria-controls="market-ticker-marquee"
                >
                    {isTickerVisible ? 'Hide Ticker' : 'Show Ticker'}
                </button>

                {isTickerVisible && (
                    <button
                        type="button"
                        className="ticker-toggle-btn ticker-play-btn"
                        onClick={() => setIsTickerPaused((paused) => !paused)}
                        aria-pressed={isTickerPaused}
                    >
                        {isTickerPaused ? 'Play Ticker' : 'Pause Ticker'}
                    </button>
                )}

                {isTickerVisible && (
                    <div className="ticker-marquee" aria-live="off" id="market-ticker-marquee">
                        <div className={`ticker-track ${isTickerPaused ? 'paused' : ''}`}>
                            {[0, 1].map((copyIndex) => (
                                <div className="ticker-group" key={copyIndex}>
                                    {quotes.map((quote) => {
                                        const isUp = typeof quote.change === 'number' && quote.change > 0;
                                        const isDown = typeof quote.change === 'number' && quote.change < 0;
                                        const trendClass = isUp ? 'up' : isDown ? 'down' : 'flat';

                                        return (
                                            <div className="ticker-item" key={`${copyIndex}-${quote.label}`}>
                                                <img src={quote.logo} alt={`${quote.label} exchange logo`} className="ticker-logo" />
                                                <span className="ticker-symbol">{quote.label}</span>
                                                <span className="ticker-price">{formatPrice(quote.price)}</span>
                                                <span className={`ticker-change ${trendClass}`}>
                                                    {isUp && <TrendingUp size={12} />}
                                                    {isDown && <TrendingDown size={12} />}
                                                    {typeof quote.change === 'number' && typeof quote.changePercent === 'number'
                                                        ? `${formatSigned(quote.change)} (${formatSigned(quote.changePercent)}%)`
                                                        : '--'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {isTickerVisible && hasError && <p className="ticker-fallback">Live market feed is temporarily unavailable.</p>}
            </div>
        </section>
    );
};

export default MarketTicker;
