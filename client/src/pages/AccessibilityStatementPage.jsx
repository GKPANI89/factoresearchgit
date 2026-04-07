import React from 'react';
import { RouteLink } from '../router';

const AccessibilityStatementPage = () => {
    return (
        <div className="inner-page legal-page">
            <section className="page-header legal-header">
                <div className="container">
                    <div className="page-header-card glass-card">
                        <span className="page-header-eyebrow">Accessibility</span>
                        <h1 className="page-header-title">Accessibility Statement</h1>
                        <p className="page-header-subtitle">
                            Facto Research is committed to making factoresearch.com accessible for all users.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding legal-section">
                <div className="container legal-container">
                    <article className="glass-card legal-card">
                        <h2>Conformance Status</h2>
                        <p className="legal-paragraph">
                            We aim to conform to WCAG 2.1 Level AA. As of April 7, 2026, this website is partially
                            conformant while ongoing improvements continue.
                        </p>
                    </article>

                    <article className="glass-card legal-card">
                        <h2>Accessibility Features</h2>
                        <ul className="legal-list">
                            <li>Skip to main content link available as the first keyboard focus target.</li>
                            <li>Keyboard-operable modal dialogs with managed focus and Escape close support.</li>
                            <li>Descriptive links and semantic table structure on legal disclosure pages.</li>
                            <li>User controls for text size adjustment and high contrast mode.</li>
                        </ul>
                    </article>

                    <article className="glass-card legal-card">
                        <h2>Known Limitations</h2>
                        <p className="legal-paragraph">
                            We continuously audit and remediate accessibility issues. If you find a problem that is not
                            listed here, please report it to us and we will investigate promptly.
                        </p>
                    </article>

                    <article className="glass-card legal-card">
                        <h2>Feedback & Contact</h2>
                        <p className="legal-paragraph">
                            To report an accessibility issue, email{' '}
                            <a href="mailto:support@factoresearch.com">support@factoresearch.com</a> or call{' '}
                            <a href="tel:+919959937373">+91 99599 37373</a>.
                        </p>
                        <p className="legal-paragraph">Statement last reviewed: April 7, 2026.</p>
                    </article>

                    <article className="glass-card legal-card">
                        <h2>Quick Navigation</h2>
                        <p className="legal-paragraph">
                            Need a complete page list? Open our <RouteLink to="/sitemap">HTML sitemap</RouteLink>.
                        </p>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default AccessibilityStatementPage;
