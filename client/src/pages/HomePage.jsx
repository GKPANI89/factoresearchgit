import React from 'react';
import Hero from '../components/Hero';
import HomeWhatWeDo from '../components/HomeWhatWeDo';
import HomeServicesCarousel from '../components/HomeServicesCarousel';
import WhyFactoSection from '../components/WhyFactoSection';
import TrustSection from '../components/TrustSection';

const HomePage = () => {
    return (
        <>
            <Hero />
            <HomeWhatWeDo />
            <HomeServicesCarousel />
            <WhyFactoSection />
            <TrustSection />
        </>
    );
};

export default HomePage;
