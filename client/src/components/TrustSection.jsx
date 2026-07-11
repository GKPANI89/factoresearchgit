import React from 'react';
import { Rocket, Scale, Telescope } from 'lucide-react';
import { siteData } from '../data/siteData';

const valueCards = [
    { key: 'values', icon: Scale },
    { key: 'mission', icon: Rocket },
    { key: 'vision', icon: Telescope },
];

const TrustSection = () => {
    return (
        <section className="section-padding trust-section bg-darker">
            <div className="container">
                <div className="trust-grid">
                    {valueCards.map((valueCard) => {
                        const item = siteData[valueCard.key];
                        const IconComponent = valueCard.icon;

                        return (
                            <article key={valueCard.key} className="trust-card glass-card value-card">
                                <div className="trust-heading">
                                    <IconComponent size={18} className="trust-icon" />
                                    <h3>{item.heading}</h3>
                                </div>
                                <p>{item.statement}</p>
                                {item.explanation && <p>{item.explanation}</p>}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
