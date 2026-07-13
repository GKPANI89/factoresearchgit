export const SERVICE_TAX_LABEL = '+GST(incl. of taxes)';

export const formatServicePrice = (price) => {
    const normalized = String(price || '').trim();

    if (!normalized || normalized.toLowerCase() === 'custom') {
        return normalized || 'Custom';
    }

    return `${normalized} ${SERVICE_TAX_LABEL}`;
};

export const servicePriceToPaise = (price) => {
    const firstAmount = String(price || '').match(/[\d,]+/);

    if (!firstAmount) {
        return null;
    }

    const rupees = Number(firstAmount[0].replaceAll(',', ''));
    return Number.isSafeInteger(rupees) && rupees > 0 ? rupees * 100 : null;
};
