import React from 'react';
import { complianceAuditStatus, sebiRiskDisclosure } from '../../data/legalData';

const ComplianceAuditStatusPage = () => {
    return (
        <div className="inner-page legal-page">
            <section className="page-header legal-header">
                <div className="container">
                    <div className="page-header-card glass-card">
                        <span className="page-header-eyebrow">Legal</span>
                        <h1 className="page-header-title">{complianceAuditStatus.title}</h1>
                        <p className="page-header-subtitle">{complianceAuditStatus.subtitle}</p>
                    </div>
                </div>
            </section>

            <section className="section-padding legal-section">
                <div className="container legal-container">
                    <article className="glass-card legal-card">
                        <h2>Current Status</h2>
                        <p>{complianceAuditStatus.status}</p>
                        <ul className="legal-list">
                            {complianceAuditStatus.points.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </article>

                    <article className="glass-card legal-card legal-download-card">
                        <h2>Download</h2>
                        <p>Download the latest compliance audit status note.</p>
                        <a className="btn-primary legal-download-btn" href="/documents/compliance-audit-status-january-2026.txt" download>
                            Download Compliance Audit Status (TXT) – January 2026
                        </a>
                    </article>

                    <article className="glass-card legal-card legal-risk-card">
                        <h2>SEBI Investment Risk Disclosure</h2>
                        <p>{sebiRiskDisclosure}</p>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default ComplianceAuditStatusPage;
