import React from 'react';

const ServicePrice = ({ price }) => {
    const normalized = String(price || '').trim() || 'Custom';
    const hasFixedAmount = normalized.toLowerCase() !== 'custom' && /₹\s*[\d,]+/.test(normalized);

    return (
        <>
            <span>{normalized}</span>
            {hasFixedAmount && <small className="service-gst-label">+18% GST</small>}
        </>
    );
};

export default ServicePrice;
