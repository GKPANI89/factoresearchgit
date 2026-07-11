import React from 'react';
import PageHeader from '../components/PageHeader';
import AboutSection from '../components/AboutSection';

const AboutPage = () => {
    return (
        <div className="inner-page">
            <PageHeader
                eyebrow="Who We Are"
                title="About"
                highlight="Facto Research"
                // subtitle="15 years of market mastery, institutional-grade analysis, and a commitment to truth through data."
            />
            <AboutSection />
        </div>
    );
};

export default AboutPage;
