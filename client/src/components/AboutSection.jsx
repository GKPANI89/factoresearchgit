import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Database, Sparkles, Target, Eye } from 'lucide-react';
import { siteData } from '../data/siteData';

const AboutSection = ({ showActions = false, RouteLink = null }) => {
    const canRenderActions = showActions && RouteLink;
    const trustCards = [
        { key: 'values', icon: Sparkles },
        { key: 'mission', icon: Target },
        { key: 'vision', icon: Eye },
    ];
    const revealProps = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
    };

    return (
        <section id="about" className="section-padding about-v2-section">
            <div className="container about-v2-stack">
                <div className="about-v2-hero">
                    <Motion.article
                        {...revealProps}
                        transition={{ duration: 0.6 }}
                        className="glass-card about-v2-story"
                    >
                        <h2>{siteData.about.decadeTitle}</h2>
                        {siteData.about.decadeParagraphs.map((text, index) => (
                            <Motion.p
                                key={text}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.45, delay: 0.12 + index * 0.1 }}
                            >
                                {text}
                            </Motion.p>
                        ))}
                    </Motion.article>

                    <aside className="about-v2-side">
                        <Motion.article
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.55, delay: 0.18 }}
                            className="glass-card about-v2-mini"
                        >
                            <div className="about-v2-mini-logos">
                                <img src="/images/market/nse.svg" alt="NSE logo" />
                                <img src="/images/market/bse.svg" alt="BSE logo" />
                            </div>
                            <ShieldCheck size={18} />
                            <h3>{siteData.about.sebiTitle}</h3>
                            <p>{siteData.about.sebiParagraph}</p>
                        </Motion.article>
                        <Motion.article
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.55, delay: 0.32 }}
                            className="glass-card about-v2-mini"
                        >
                            <Database size={18} />
                            <h3>{siteData.about.philosophyTitle}</h3>
                            <p>{siteData.about.philosophyIntro}</p>
                            <ul className="philosophy-list">
                                {siteData.about.philosophyPoints.map((point) => (
                                    <li key={point.title}>
                                        <strong>{point.title}:</strong> {point.description}
                                    </li>
                                ))}
                            </ul>
                        </Motion.article>
                    </aside>
                </div>

                <div className="about-v2-trust">
                    {trustCards.map((trustCard, index) => {
                        const item = siteData[trustCard.key];
                        const IconComponent = trustCard.icon;
                        return (
                            <Motion.article
                                key={trustCard.key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.55, delay: index * 0.08 }}
                                className="glass-card about-v2-trust-card"
                            >
                                <div className="about-v2-trust-head">
                                    <IconComponent size={18} />
                                    <h3>{item.heading}</h3>
                                </div>
                                <p>{item.statement}</p>
                                {item.explanation && <p>{item.explanation}</p>}
                            </Motion.article>
                        );
                    })}
                </div>

                <div className="about-v2-team-wrap">
                    <h2 className="section-title">{siteData.team.heading}</h2>
                    <div className="about-v2-team-grid">
                        {siteData.team.members.map((member, index) => (
                            <Motion.article
                                key={member.role}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ duration: 0.55, delay: index * 0.08 }}
                                className="glass-card about-v2-team-card"
                            >
                                <h3>{member.role}</h3>
                                <p>{member.description}</p>
                            </Motion.article>
                        ))}
                    </div>
                </div>

                {canRenderActions && (
                    <div className="home-cta-row">
                        <RouteLink to="/services" className="btn-outline">Our Research Services</RouteLink>
                        <RouteLink to="/contact" className="btn-primary">
                            Talk to Research Desk <ArrowRight size={16} />
                        </RouteLink>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AboutSection;
