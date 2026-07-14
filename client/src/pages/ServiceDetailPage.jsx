import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { RouteLink } from '../router';
import { useRouter } from '../useRouter';
import { siteData } from '../data/siteData';
import NotFoundPage from './NotFoundPage';

const toServicePath = (slug) => `/services/${slug}`;

const ServiceDetailPage = () => {
    const { path } = useRouter();

    const service = siteData.services.categories.find((category) => toServicePath(category.slug) === path);

    if (!service) {
        return <NotFoundPage />;
    }

    const serviceIndex = siteData.services.categories.findIndex((category) => category.slug === service.slug);
    const serviceTag = String(serviceIndex + 1).padStart(2, '0');
    const otherServices = siteData.services.categories.filter((category) => category.slug !== service.slug);

    return (
        <div className="inner-page services-page service-detail-page">
            <div className="services-page-bg" aria-hidden="true">
                <span className="services-orb orb-a" />
                <span className="services-orb orb-b" />
                <span className="services-orb orb-c" />
                <span className="services-grid-lines" />
            </div>

            <section className="page-header">
                <div className="container">
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="page-header-card glass-card services-detail-header-card"
                    >
                        <RouteLink
                            to="/services"
                            className="service-detail-back"
                            onClick={(event) => {
                                event.preventDefault();
                                window.dispatchEvent(new Event('open-services-menu'));
                            }}
                        >
                            <ArrowLeft size={16} /> Back to Services
                        </RouteLink>
                        <span className="page-header-eyebrow">Service {serviceTag}</span>
                        <h1 className="page-header-title">{service.title}</h1>
                        <p className="page-header-subtitle">{service.overview}</p>
                    </Motion.div>
                </div>
            </section>

            <section className="section-padding services-v2-section service-detail-main">
                <div className="container">
                    <Motion.article
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="glass-card services-v3-detail-panel"
                    >
                        <header className="services-v3-detail-head">
                            <span className="service-card-tag">{serviceTag}</span>
                            <h2>{service.title}</h2>
                        </header>

                        <div className="services-v3-point-grid">
                            {service.points.map((point, pointIndex) => (
                                <Motion.article
                                    key={`${service.slug}-${point.title}`}
                                    className="services-v3-point-card"
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.38, delay: pointIndex * 0.05 }}
                                >
                                    <h3>
                                        <CheckCircle2 size={16} className="check-icon" />
                                        <span>{point.title}</span>
                                    </h3>
                                    <p>{point.description}</p>
                                    <p className="services-v3-point-disclosure">{point.disclosure}</p>
                                </Motion.article>
                            ))}
                        </div>
                    </Motion.article>

                    <div className="services-v3-related-wrap">
                        <h2 className="section-title">Explore Other Services</h2>
                        <div className="services-v3-related-grid">
                            {otherServices.map((category, index) => (
                                <RouteLink
                                    key={category.slug}
                                    to={toServicePath(category.slug)}
                                    className="services-v3-related-link"
                                >
                                    <Motion.article
                                        className="glass-card services-v3-related-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.45, delay: index * 0.05 }}
                                    >
                                        <div className="services-v3-selector-head">
                                            <span className="service-card-tag">
                                                {String(
                                                    siteData.services.categories.findIndex(
                                                        (item) => item.slug === category.slug
                                                    ) + 1
                                                ).padStart(2, '0')}
                                            </span>
                                            <ArrowUpRight size={14} className="services-v3-selector-arrow" />
                                        </div>
                                        <h3>{category.title}</h3>
                                        <p>{category.summary}</p>
                                    </Motion.article>
                                </RouteLink>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetailPage;
