import React from 'react';
import { motion as Motion } from 'framer-motion';
import { BadgeCheck, History, Network } from 'lucide-react';

const points = [
    {
        title: 'Proven Frameworks',
        description:
            'Our research is based on time-tested models that have been sharpened through 15 years of real-world application.',
        Icon: Network,
    },
    {
        title: '15+ Years of Experience',
        description:
            'We have seen the markets evolve. Our insights are seasoned, not just reactionary.',
        Icon: History,
    },
    {
        title: 'SEBI Registered INH000024480',
        description:
            'We operate with the highest level of legal accountability and transparency.',
        Icon: BadgeCheck,
    },
];

const WhyFactoSection = () => {
    return (
        <section className="section-padding why-facto-section">
            <div className="container">
                <h2 className="section-title">Why Facto Research</h2>
                <div className="why-facto-grid">
                    {points.map((point, index) => (
                        <Motion.article
                            key={point.title}
                            className="why-facto-card glass-card"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.55, delay: index * 0.08 }}
                        >
                            <div className="why-facto-head">
                                <point.Icon size={18} className="why-facto-icon" />
                                <h3>{point.title}</h3>
                            </div>
                            <p>{point.description}</p>
                        </Motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyFactoSection;
