import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Target } from 'lucide-react';
import { RouteLink } from '../router';
import { useRouter } from '../useRouter';
import { tradingServices } from '../data/homeServicesData';
import RazorpayCheckoutButton from '../components/RazorpayCheckoutButton';
import ServicePrice from '../components/ServicePrice';
import NotFoundPage from './NotFoundPage';

const TradingServiceDetailPage = () => {
    const { path } = useRouter();
    const service = tradingServices.find((item) => item.path === path);

    if (!service) {
        return <NotFoundPage />;
    }

    const relatedServices = tradingServices.filter((item) => item.slug !== service.slug);
    const startPrice = service.pricing[0]?.[1] || 'Custom';

    return (
        <main className="investment-detail-page trading-detail-page">
            <section className="investment-detail-hero">
                <div className="container investment-detail-hero-grid">
                    <div>
                        <RouteLink
                            to="/services"
                            className="investment-detail-back"
                            onClick={(event) => {
                                event.preventDefault();
                                window.dispatchEvent(new Event('open-services-menu'));
                            }}
                        >
                            <ArrowLeft size={18} /> Back to Services
                        </RouteLink>
                        <h1>{service.title}</h1>
                        <p
                            className="service-detail-description"
                            style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}
                        >
                            {service.summary}
                        </p>
                        <div className="investment-detail-actions">
                            <RazorpayCheckoutButton
                                amount={startPrice}
                                serviceName={service.title}
                                planName={service.pricing[0]?.[0]}
                                plans={service.pricing}
                            />
                        </div>
                    </div>

                    <article className="investment-detail-summary-card">
                        <span>Starts at</span>
                        <strong><ServicePrice price={startPrice} /></strong>
                        <div className="investment-detail-metric-list">
                            {service.metrics.map(([label, value]) => (
                                <div key={label}>
                                    <span>{label}</span>
                                    <b>{value}</b>
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </section>

            <section id="service-pricing-details" className="investment-detail-body">
                <div className="container investment-detail-layout">
                    <article className="investment-detail-panel">
                        <div className="investment-detail-panel-head">
                            <ShieldCheck size={24} />
                            <h2>What You Get</h2>
                        </div>
                        <ul className="investment-detail-feature-list">
                            {service.features.map((feature) => (
                                <li key={feature}>
                                    <CheckCircle2 size={17} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </article>

                    <article className="investment-detail-panel">
                        <div className="investment-detail-panel-head">
                            <Target size={24} />
                            <h2>Pricing</h2>
                        </div>
                        <div className="investment-detail-price-table">
                            <div>
                                <span>Duration</span>
                                <span>Price</span>
                                <span>Action</span>
                            </div>
                            {service.pricing.map(([duration, price]) => (
                                <div key={duration}>
                                    <span>{duration}</span>
                                    <strong><ServicePrice price={price} /></strong>
                                    <RazorpayCheckoutButton
                                        amount={price}
                                        serviceName={service.title}
                                        planName={duration}
                                        plans={service.pricing}
                                        className="service-price-subscribe-btn"
                                    />
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </section>

            <section className="investment-detail-related">
                <div className="container">
                    <h2>Explore Other Trading Services</h2>
                    <div className="investment-detail-related-grid">
                        {relatedServices.map((item) => (
                            <RouteLink key={item.slug} to={item.path} className="investment-detail-related-card">
                                <span>{item.tag}</span>
                                <h3>{item.title}</h3>
                                <p>{item.summary}</p>
                            </RouteLink>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TradingServiceDetailPage;
