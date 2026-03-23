import React from 'react';
import PageHeader from '../components/PageHeader';
import Pricing from '../components/Pricing';

const PricingPage = ({ planSlug = 'stock-cash' }) => {
    return (
        <div className="inner-page">
            <PageHeader
                eyebrow="Get Started"
                title="Pricing"
                highlight="Plans"
                subtitle="Please contact us directly to discuss service suitability and onboarding."
            />
            <Pricing planSlug={planSlug} />
        </div>
    );
};

export default PricingPage;
