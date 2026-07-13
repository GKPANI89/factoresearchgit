export const SERVICE_GST_RATE = 18;

const extractRupeeAmounts = (price) =>
    Array.from(String(price || '').matchAll(/₹\s*([\d,]+(?:\.\d{1,2})?)/g), (match) =>
        Math.round(Number(match[1].replaceAll(',', '')) * 100)
    ).filter((amount) => Number.isSafeInteger(amount) && amount > 0);

export const servicePriceToPaise = (price) => {
    return extractRupeeAmounts(price)[0] || null;
};
