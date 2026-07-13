import { getApiBaseUrl } from './apiBaseUrl';

const readResponse = async (response) => {
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(payload.error || 'The payment service is unavailable right now.');
    }

    return payload;
};

export const createRazorpayOrder = async ({ amount, currency = 'INR', receipt }) => {
    const response = await fetch(`${getApiBaseUrl()}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, receipt }),
    });

    return readResponse(response);
};

export const verifyRazorpayPayment = async (payment) => {
    const response = await fetch(`${getApiBaseUrl()}/api/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment),
    });

    return readResponse(response);
};
