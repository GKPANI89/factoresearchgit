import React from 'react';
import Pricing from '../components/Pricing';

const PricingPage = ({ planSlug = 'stock-cash' }) => {
    return (
        <div className="inner-page pricing-detail-page">
            <Pricing planSlug={planSlug} />
        </div>
    );
};

export default PricingPage;
