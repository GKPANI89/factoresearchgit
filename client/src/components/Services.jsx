import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { RouteLink } from '../router';
import { hniServices, investmentServices, tradingServices } from '../data/homeServicesData';

const serviceGroups = [
    {
        eyebrow: 'Trading Services',
        title: 'Trading Services',
        description: 'Short-term trading research with clear levels, stop-loss discipline, and practical market execution.',
        items: tradingServices.filter((service) => service.slug !== 'facto-commodity-compass'),
    },
    {
        eyebrow: 'Investment Services',
        title: 'Investment Services',
        description: 'Research-led stock ideas and portfolio services for investors with defined holding periods and reviews.',
        items: investmentServices,
    },
    {
        eyebrow: 'HNI Services',
        title: 'HNI Services',
        description: 'Premium cash, futures, options, and index research services for experienced market participants.',
        items: hniServices,
    },
];

const Services = () => {
    return (
        <section id="services" className="section-padding services-v2-section">
            <div className="container">
                <Motion.div
                    className="glass-card services-v2-head"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-eyebrow">Our Services</span>
                    <h2 className="section-title">Trading, Investment, and HNI Services</h2>
                    <p className="services-v2-subtitle">
                        Choose the right Facto Research service with clear descriptions, risk context, and direct service pages.
                    </p>
                </Motion.div>

                <div className="services-complete-wrap">
                    {serviceGroups.map((group, groupIndex) => (
                        <Motion.div
                            key={group.title}
                            className="services-complete-group"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.18 }}
                            transition={{ delay: groupIndex * 0.06, duration: 0.56 }}
                        >
                            <div className="services-complete-group-head">
                                <div>
                                    <span className="service-card-tag">{group.eyebrow}</span>
                                    <h3>{group.title}</h3>
                                </div>
                                <p>{group.description}</p>
                            </div>

                            <div className="services-complete-card-grid" aria-label={group.title}>
                                {group.items.map((service, index) => (
                                    <RouteLink
                                        key={service.slug || service.path}
                                        to={service.path}
                                        className="services-complete-card-link"
                                        aria-label={`Open ${service.title}`}
                                    >
                                        <Motion.article
                                            className="glass-card services-complete-card"
                                            initial={{ opacity: 0, y: 22 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.15 }}
                                            transition={{ delay: index * 0.035, duration: 0.42 }}
                                        >
                                            <div className="services-v3-selector-head">
                                                <span className="services-complete-index">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <ArrowUpRight size={15} className="services-v3-selector-arrow" />
                                            </div>

                                            <div className="services-complete-copy">
                                                <span>{service.tag}</span>
                                                <h4>{service.title}</h4>
                                                <p>{service.summary}</p>
                                            </div>

                                            <ul className="services-v3-preview-points">
                                                {service.features.slice(0, 3).map((feature) => (
                                                    <li key={`${service.title}-${feature}`}>
                                                        <CheckCircle2 size={14} className="check-icon" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <span className="services-v3-open-indicator">View Service</span>
                                        </Motion.article>
                                    </RouteLink>
                                ))}
                            </div>
                        </Motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
