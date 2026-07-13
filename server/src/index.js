import 'dotenv/config';
import { createHmac, timingSafeEqual } from 'node:crypto';
import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
import Razorpay from 'razorpay';

const app = express();
const port = Number(process.env.PORT || 3001);

const normalizeEnv = (value) => (typeof value === 'string' ? value.trim() : '');
const parseEnvBoolean = (value, fallback) => {
    const normalized = normalizeEnv(value).toLowerCase();
    if (!normalized) {
        return fallback;
    }
    return ['1', 'true', 'yes', 'on'].includes(normalized);
};
const parseEnvPort = (value, fallback) => {
    const parsed = Number(normalizeEnv(value));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
const parseEnvPositiveInt = (value, fallback) => {
    const parsed = Number(normalizeEnv(value));
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const razorpayKeyId = normalizeEnv(process.env.RAZORPAY_KEY_ID);
const razorpayKeySecret = normalizeEnv(process.env.RAZORPAY_KEY_SECRET);
const razorpay =
    razorpayKeyId && razorpayKeySecret
        ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
        : null;

const supportEmail = normalizeEnv(process.env.SUPPORT_EMAIL) || 'support@factoresearch.com';
const fromName = normalizeEnv(process.env.SMTP_FROM_NAME) || 'Facto Research';
const fromEmail = normalizeEnv(process.env.SMTP_FROM_EMAIL) || supportEmail;
const smtpHost = normalizeEnv(process.env.SMTP_HOST) || 'smtpout.secureserver.net';
const smtpPort = parseEnvPort(process.env.SMTP_PORT, 465);
const smtpSecure = parseEnvBoolean(process.env.SMTP_SECURE, true);
const smtpUser = normalizeEnv(process.env.SMTP_USER);
const smtpPass = typeof process.env.SMTP_PASS === 'string' ? process.env.SMTP_PASS.replace(/\r?\n/g, '') : '';
const smtpConnectionTimeoutMs = parseEnvPositiveInt(process.env.SMTP_CONNECTION_TIMEOUT_MS, 10000);
const smtpGreetingTimeoutMs = parseEnvPositiveInt(process.env.SMTP_GREETING_TIMEOUT_MS, 10000);
const smtpSocketTimeoutMs = parseEnvPositiveInt(process.env.SMTP_SOCKET_TIMEOUT_MS, 20000);
const smtpSendTimeoutMs = parseEnvPositiveInt(process.env.SMTP_SEND_TIMEOUT_MS, 25000);

const smtpConfigErrors = [];
if (!supportEmail) {
    smtpConfigErrors.push('SUPPORT_EMAIL is missing.');
}
if (!smtpUser) {
    smtpConfigErrors.push('SMTP_USER is missing.');
}
if (!smtpPass) {
    smtpConfigErrors.push('SMTP_PASS is missing.');
}
if (smtpConfigErrors.length > 0) {
    console.error('SMTP configuration error:', smtpConfigErrors.join(' '));
}

const DEFAULT_ALLOWED_ORIGINS = [
    'https://factoresearch.com',
    'https://www.factoresearch.com',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

const allowedOrigins = (process.env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(','))
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const normalizeOriginHost = (value) => normalizeEnv(value).replace(/^https?:\/\//i, '').replace(/\/+$/, '').toLowerCase();
const allowedOriginHosts = allowedOrigins.map((origin) => {
    try {
        return new URL(origin).hostname.toLowerCase();
    } catch {
        return normalizeOriginHost(origin);
    }
});

const isAllowedOrigin = (origin) => {
    if (!origin || allowedOrigins.length === 0) {
        return true;
    }

    if (allowedOrigins.includes(origin)) {
        return true;
    }

    try {
        const { hostname } = new URL(origin);
        const normalizedHostname = hostname.toLowerCase();
        return (
            allowedOriginHosts.includes(normalizedHostname) ||
            normalizedHostname === 'localhost' ||
            normalizedHostname === '127.0.0.1'
        );
    } catch {
        return false;
    }
};

const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    connectionTimeout: smtpConnectionTimeoutMs,
    greetingTimeout: smtpGreetingTimeoutMs,
    socketTimeout: smtpSocketTimeoutMs,
    auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
});

const sendMailWithTimeout = async (mailOptions) => {
    let timeoutId;

    try {
        return await Promise.race([
            transporter.sendMail(mailOptions),
            new Promise((_, reject) => {
                timeoutId = setTimeout(() => {
                    const timeoutError = new Error(`SMTP send timed out after ${smtpSendTimeoutMs}ms.`);
                    timeoutError.code = 'ETIMEDOUT';
                    reject(timeoutError);
                }, smtpSendTimeoutMs);
            }),
        ]);
    } finally {
        clearTimeout(timeoutId);
    }
};

if (smtpConfigErrors.length === 0) {
    transporter.verify().catch((error) => {
        console.error('SMTP verification failed:', {
            code: error?.code,
            responseCode: error?.responseCode,
            message: error?.message,
        });
    });
}

const corsOptions = {
    origin(origin, callback) {
        if (isAllowedOrigin(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error(`CORS origin blocked: ${origin || 'unknown origin'}`));
    },
    optionsSuccessStatus: 204,
};

const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '');

const escapeHtml = (value) =>
    value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');

const buildSubmission = (payload) => {
    const formType = normalizeText(payload.formType) || 'general';
    const name = normalizeText(payload.name);
    const email = normalizeText(payload.email).toLowerCase();
    const phone = normalizeText(payload.phone);
    const message = normalizeText(payload.message);
    const service = normalizeText(payload.service);
    const pageUrl = normalizeText(payload.pageUrl);

    if (!name || !email || !phone) {
        return { error: 'Name, email, and phone are required.' };
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
        return { error: 'Please provide a valid email address.' };
    }

    return {
        formType,
        name,
        email,
        phone,
        message,
        service,
        pageUrl,
    };
};

const buildSubject = (submission) => {
    switch (submission.formType) {
        case 'advice':
            return `Advice Request - ${submission.name}`;
        case 'chat':
            return `Chat Enquiry - ${submission.name}`;
        case 'contact':
            return `New Enquiry - ${submission.service || 'General'}`;
        default:
            return `Website Enquiry - ${submission.name}`;
    }
};

const buildTextBody = (submission) =>
    [
        `Form Type: ${submission.formType}`,
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Phone: ${submission.phone}`,
        submission.service ? `Service: ${submission.service}` : null,
        submission.pageUrl ? `Page URL: ${submission.pageUrl}` : null,
        '',
        'Message:',
        submission.message || 'No message provided.',
    ]
        .filter(Boolean)
        .join('\n');

const buildHtmlBody = (submission) => {
    const rows = [
        ['Form Type', submission.formType],
        ['Name', submission.name],
        ['Email', submission.email],
        ['Phone', submission.phone],
        submission.service ? ['Service', submission.service] : null,
        submission.pageUrl ? ['Page URL', submission.pageUrl] : null,
    ]
        .filter(Boolean)
        .map(
            ([label, value]) =>
                `<tr><td style="padding:8px 12px;font-weight:600;border:1px solid #dbe2ea;">${escapeHtml(
                    label
                )}</td><td style="padding:8px 12px;border:1px solid #dbe2ea;">${escapeHtml(value)}</td></tr>`
        )
        .join('');

    return `
        <div style="font-family:Arial,sans-serif;color:#0f172a;">
            <h2 style="margin-bottom:16px;">New website enquiry</h2>
            <table style="border-collapse:collapse;margin-bottom:16px;">${rows}</table>
            <h3 style="margin:0 0 8px;">Message</h3>
            <p style="margin:0;white-space:pre-wrap;">${escapeHtml(submission.message || 'No message provided.')}</p>
        </div>
    `;
};

const MARKET_REQUEST_TIMEOUT_MS = Number(process.env.MARKET_REQUEST_TIMEOUT_MS || 9000);
const MARKET_QUOTES_CACHE_TTL_MS = Number(process.env.MARKET_QUOTES_CACHE_TTL_MS || 900);
const MAX_MARKET_SYMBOLS = 20;
const MARKET_ENDPOINTS = [
    'https://query1.finance.yahoo.com',
    'https://query2.finance.yahoo.com',
];
const ALLOWED_MARKET_INTERVALS = new Set(['1m', '2m', '5m', '15m', '30m', '60m', '90m', '1d', '1wk', '1mo']);
const ALLOWED_MARKET_RANGES = new Set(['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max']);
const MARKET_SYMBOL_REGEX = /^[A-Z0-9^._=-]{1,24}$/;
const marketQuotesCache = new Map();
const marketQuotesInflight = new Map();

const normalizeQueryParam = (value, fallback, allowedValues) => {
    const normalized = normalizeText(value);
    return allowedValues.has(normalized) ? normalized : fallback;
};

const toFiniteNumber = (value) => {
    const parsed = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : null;
};

const parseMarketSymbols = (rawSymbols) => {
    const normalized = normalizeText(rawSymbols);
    if (!normalized) return [];

    const unique = new Set(
        normalized
            .split(',')
            .map((symbol) => normalizeText(symbol).toUpperCase())
            .filter(Boolean)
    );

    return Array.from(unique);
};

const fetchYahooMarketQuotes = async ({ symbols }) => {
    let rateLimited = false;
    let lastFailureStatus = 502;
    let lastFailureMessage = 'Market quote feed unavailable.';

    for (const endpoint of MARKET_ENDPOINTS) {
        const target = new URL(`${endpoint}/v7/finance/quote`);
        target.searchParams.set('symbols', symbols.join(','));
        target.searchParams.set('lang', 'en-IN');
        target.searchParams.set('region', 'IN');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), MARKET_REQUEST_TIMEOUT_MS);

        try {
            const response = await fetch(target, {
                cache: 'no-store',
                signal: controller.signal,
                headers: {
                    Accept: 'application/json,text/plain,*/*',
                    Referer: 'https://finance.yahoo.com/',
                    'User-Agent': 'Mozilla/5.0 (compatible; FactoResearch/1.0; +https://factoresearch.com)',
                },
            });

            if (response.ok) {
                return await response.json();
            }

            lastFailureStatus = response.status;
            lastFailureMessage = `Market quote request failed with status ${response.status}.`;
            if (response.status === 429) {
                rateLimited = true;
            }
        } catch (error) {
            if (error?.name === 'AbortError') {
                lastFailureStatus = 504;
                lastFailureMessage = 'Market quote request timed out.';
            } else {
                lastFailureStatus = 502;
                lastFailureMessage = error?.message || 'Market quote request failed.';
            }
        } finally {
            clearTimeout(timeoutId);
        }
    }

    const error = new Error(rateLimited ? 'Market quote feed rate-limited.' : lastFailureMessage);
    error.status = rateLimited ? 429 : lastFailureStatus;
    throw error;
};

const extractQuoteFromChartPayload = (symbol, payload) => {
    const result = payload?.chart?.result?.[0];
    const meta = result?.meta || {};
    const quoteSeries = result?.indicators?.quote?.[0] || {};
    const closes = Array.isArray(quoteSeries.close) ? quoteSeries.close.filter((value) => typeof value === 'number') : [];
    const lastClose = closes.length > 0 ? closes[closes.length - 1] : null;

    const regularMarketPrice = toFiniteNumber(meta.regularMarketPrice ?? lastClose);
    const regularMarketPreviousClose = toFiniteNumber(
        meta.chartPreviousClose ?? meta.previousClose ?? meta.regularMarketPreviousClose
    );

    let regularMarketChange = toFiniteNumber(meta.regularMarketChange);
    let regularMarketChangePercent = toFiniteNumber(meta.regularMarketChangePercent);

    if (
        regularMarketChange === null &&
        typeof regularMarketPrice === 'number' &&
        typeof regularMarketPreviousClose === 'number'
    ) {
        regularMarketChange = regularMarketPrice - regularMarketPreviousClose;
    }

    if (
        regularMarketChangePercent === null &&
        typeof regularMarketChange === 'number' &&
        typeof regularMarketPreviousClose === 'number' &&
        regularMarketPreviousClose !== 0
    ) {
        regularMarketChangePercent = (regularMarketChange / regularMarketPreviousClose) * 100;
    }

    return {
        symbol,
        regularMarketPrice,
        regularMarketChange,
        regularMarketChangePercent,
        regularMarketPreviousClose,
    };
};

const fetchYahooMarketChart = async ({ symbol, interval, range }) => {
    let rateLimited = false;
    let lastFailureStatus = 502;
    let lastFailureMessage = 'Market feed unavailable.';

    for (const endpoint of MARKET_ENDPOINTS) {
        const target = new URL(`${endpoint}/v8/finance/chart/${encodeURIComponent(symbol)}`);
        target.searchParams.set('interval', interval);
        target.searchParams.set('range', range);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), MARKET_REQUEST_TIMEOUT_MS);

        try {
            const response = await fetch(target, {
                cache: 'no-store',
                signal: controller.signal,
                headers: {
                    Accept: 'application/json,text/plain,*/*',
                    Referer: 'https://finance.yahoo.com/',
                    'User-Agent': 'Mozilla/5.0 (compatible; FactoResearch/1.0; +https://factoresearch.com)',
                },
            });

            if (response.ok) {
                return await response.json();
            }

            lastFailureStatus = response.status;
            lastFailureMessage = `Market feed request failed with status ${response.status}.`;
            if (response.status === 429) {
                rateLimited = true;
            }
        } catch (error) {
            if (error?.name === 'AbortError') {
                lastFailureStatus = 504;
                lastFailureMessage = 'Market feed request timed out.';
            } else {
                lastFailureStatus = 502;
                lastFailureMessage = error?.message || 'Market feed request failed.';
            }
        } finally {
            clearTimeout(timeoutId);
        }
    }

    const error = new Error(rateLimited ? 'Market feed rate-limited.' : lastFailureMessage);
    error.status = rateLimited ? 429 : lastFailureStatus;
    throw error;
};

const fetchMarketQuotesViaChartFallback = async ({ symbols }) => {
    const results = await Promise.all(
        symbols.map(async (symbol) => {
            try {
                const payload = await fetchYahooMarketChart({
                    symbol,
                    interval: '1m',
                    range: '1d',
                });
                return extractQuoteFromChartPayload(symbol, payload);
            } catch {
                return {
                    symbol,
                    regularMarketPrice: null,
                    regularMarketChange: null,
                    regularMarketChangePercent: null,
                    regularMarketPreviousClose: null,
                };
            }
        })
    );

    return {
        quoteResponse: {
            result: results.filter((item) => typeof item.regularMarketPrice === 'number'),
            error: null,
        },
    };
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
    res.json({ ok: true });
});

app.post('/api/create-order', async (req, res) => {
    const amount = Number(req.body?.amount);
    const currency = normalizeText(req.body?.currency).toUpperCase() || 'INR';
    const receipt = normalizeText(req.body?.receipt).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40);

    if (!Number.isSafeInteger(amount) || amount < 100) {
        res.status(400).json({ ok: false, error: 'Amount must be an integer of at least 100 paise.' });
        return;
    }

    if (currency !== 'INR') {
        res.status(400).json({ ok: false, error: 'Only INR payments are supported.' });
        return;
    }

    if (!razorpay) {
        res.status(500).json({ ok: false, error: 'Razorpay is not configured on the server.' });
        return;
    }

    try {
        const order = await razorpay.orders.create({
            amount,
            currency,
            receipt: receipt || `facto-${Date.now().toString(36)}`,
        });

        res.json({ order_id: order.id, amount: order.amount, currency: order.currency });
    } catch (error) {
        const status = Number(error?.statusCode || error?.status);
        const isAuthFailure = status === 401 || status === 403;

        console.error('Razorpay order creation failed', {
            status,
            message: error?.error?.description || error?.message,
        });
        res.status(isAuthFailure ? 401 : 500).json({
            ok: false,
            error: isAuthFailure
                ? 'Razorpay authentication failed on the server.'
                : 'Unable to create the payment order right now.',
        });
    }
});

app.post('/api/verify-payment', (req, res) => {
    const orderId = normalizeText(req.body?.razorpay_order_id);
    const paymentId = normalizeText(req.body?.razorpay_payment_id);
    const receivedSignature = normalizeText(req.body?.razorpay_signature);

    if (!orderId || !paymentId || !receivedSignature) {
        res.status(400).json({ ok: false, error: 'Payment verification fields are missing.' });
        return;
    }

    if (!razorpayKeySecret) {
        res.status(500).json({ ok: false, error: 'Razorpay is not configured on the server.' });
        return;
    }

    const expectedSignature = createHmac('sha256', razorpayKeySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const receivedBuffer = Buffer.from(receivedSignature, 'utf8');
    const isValid =
        expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);

    if (!isValid) {
        res.status(400).json({ ok: false, error: 'Payment signature verification failed.' });
        return;
    }

    res.json({ ok: true, message: 'Payment verified successfully.' });
});

app.get('/api/market-quotes', async (req, res) => {
    const symbols = parseMarketSymbols(req.query.symbols);
    if (!symbols.length) {
        res.status(400).json({ ok: false, error: 'At least one market symbol is required.' });
        return;
    }

    if (symbols.length > MAX_MARKET_SYMBOLS) {
        res.status(400).json({ ok: false, error: `A maximum of ${MAX_MARKET_SYMBOLS} symbols is allowed.` });
        return;
    }

    const invalidSymbol = symbols.find((symbol) => !MARKET_SYMBOL_REGEX.test(symbol));
    if (invalidSymbol) {
        res.status(400).json({ ok: false, error: `Invalid market symbol: ${invalidSymbol}` });
        return;
    }

    const cacheKey = symbols.join(',');
    const now = Date.now();
    const cached = marketQuotesCache.get(cacheKey);
    if (cached && now - cached.timestamp < MARKET_QUOTES_CACHE_TTL_MS) {
        res.set('Cache-Control', 'no-store, max-age=0');
        res.json(cached.payload);
        return;
    }

    let inflight = marketQuotesInflight.get(cacheKey);
    if (!inflight) {
        inflight = (async () => {
            try {
                const payload = await fetchYahooMarketQuotes({ symbols });
                const hasResults = Array.isArray(payload?.quoteResponse?.result) && payload.quoteResponse.result.length > 0;
                if (hasResults) {
                    return payload;
                }
                return await fetchMarketQuotesViaChartFallback({ symbols });
            } catch (error) {
                if (error?.status === 401 || error?.status === 403) {
                    const fallbackPayload = await fetchMarketQuotesViaChartFallback({ symbols });
                    const hasFallbackResults =
                        Array.isArray(fallbackPayload?.quoteResponse?.result) &&
                        fallbackPayload.quoteResponse.result.length > 0;
                    if (hasFallbackResults) {
                        return fallbackPayload;
                    }
                }
                throw error;
            }
        })();
        marketQuotesInflight.set(cacheKey, inflight);
    }

    try {
        const payload = await inflight;
        marketQuotesCache.set(cacheKey, {
            payload,
            timestamp: Date.now(),
        });
        res.set('Cache-Control', 'no-store, max-age=0');
        res.json(payload);
    } catch (error) {
        const status = Number.isInteger(error?.status) ? error.status : 502;
        console.error('Market quote proxy failed', {
            symbols,
            status,
            message: error?.message,
        });
        res.status(status).json({
            ok: false,
            error: 'Unable to fetch live market data right now.',
        });
    } finally {
        if (marketQuotesInflight.get(cacheKey) === inflight) {
            marketQuotesInflight.delete(cacheKey);
        }
    }
});

app.get('/api/market-chart/:symbol', async (req, res) => {
    const symbol = normalizeText(req.params.symbol).toUpperCase();
    const interval = normalizeQueryParam(req.query.interval, '1d', ALLOWED_MARKET_INTERVALS);
    const range = normalizeQueryParam(req.query.range, '5d', ALLOWED_MARKET_RANGES);

    if (!MARKET_SYMBOL_REGEX.test(symbol)) {
        res.status(400).json({ ok: false, error: 'Invalid market symbol.' });
        return;
    }

    try {
        const payload = await fetchYahooMarketChart({ symbol, interval, range });
        res.set('Cache-Control', 'no-store, max-age=0');
        res.json(payload);
    } catch (error) {
        const status = Number.isInteger(error?.status) ? error.status : 502;
        console.error('Market chart proxy failed', {
            symbol,
            interval,
            range,
            status,
            message: error?.message,
        });
        res.status(status).json({
            ok: false,
            error: 'Unable to fetch live market data right now.',
        });
    }
});

app.post('/api/contact', async (req, res) => {
    const submission = buildSubmission(req.body || {});

    if (submission.error) {
        res.status(400).json({ ok: false, error: submission.error });
        return;
    }

    if (smtpConfigErrors.length > 0) {
        res.status(500).json({ ok: false, error: 'SMTP is not configured on server.' });
        return;
    }

    try {
        await sendMailWithTimeout({
            from: `"${fromName}" <${fromEmail}>`,
            to: supportEmail,
            replyTo: submission.email,
            subject: buildSubject(submission),
            text: buildTextBody(submission),
            html: buildHtmlBody(submission),
        });

        res.json({ ok: true, message: 'Message sent successfully.' });
    } catch (error) {
        const isAuthError = error?.code === 'EAUTH' || Number(error?.responseCode) === 535;
        const isConnectivityError = ['ECONNECTION', 'ESOCKET', 'ENOTFOUND', 'ECONNREFUSED', 'EHOSTUNREACH'].includes(
            error?.code
        );
        const isTimeoutError = error?.code === 'ETIMEDOUT';

        if (isAuthError) {
            console.error('Mail send failed: SMTP authentication rejected.', {
                code: error?.code,
                responseCode: error?.responseCode,
                response: error?.response,
                command: error?.command,
            });
            res.status(502).json({
                ok: false,
                error: 'SMTP authentication failed. Check SMTP_USER/SMTP_PASS and provider SMTP settings.',
            });
            return;
        }

        if (isConnectivityError || isTimeoutError) {
            console.error('Mail send failed: SMTP server unreachable or timed out.', {
                code: error?.code,
                message: error?.message,
                host: smtpHost,
                port: smtpPort,
                secure: smtpSecure,
            });
            res.status(504).json({
                ok: false,
                error: 'SMTP server is unreachable or timed out. On Render free web services, outbound SMTP ports 25/465/587 are blocked. Upgrade Render instance or use a server where SMTP outbound is allowed.',
            });
            return;
        }

        console.error('Mail send failed', error);
        res.status(500).json({ ok: false, error: 'Unable to send email right now.' });
    }
});

app.listen(port, () => {
    console.log(`Mail API listening on port ${port}`);
});
