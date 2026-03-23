import React from 'react';
import { legalDocuments, sebiRiskDisclosure } from '../data/legalData';

const REWRITTEN_LINKS = [
    {
        regex: /scores\.sebi\.gov\.in\b/i,
        href: 'https://scores.sebi.gov.in',
        label: 'Visit SEBI SCORES Portal',
    },
    {
        regex: /igrs\.sebi\.gov\.in\b/i,
        href: 'https://igrs.sebi.gov.in',
        label: 'Visit SEBI Investor Grievance Portal',
    },
    {
        regex: /smartodr\.in\b/i,
        href: 'https://smartodr.in',
        label: 'Visit SMART ODR Portal',
    },
    {
        regex: /sebi@sebi\.gov\.in\b/i,
        href: 'mailto:sebi@sebi.gov.in',
        label: 'Email SEBI Complaints',
    },
];

const EXTERNAL_URL_REGEX = /(https?:\/\/[^\s)]+|www\.[^\s)]+)/gi;
const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

const cleanUrlText = (value) => value.replace(/[.,;:!?]+$/, '');

const toUrlHref = (value) => (value.startsWith('http') ? value : `https://${value}`);

const buildLinkNode = (rawText, keyPrefix, index) => {
    const normalized = cleanUrlText(rawText);
    const trailing = rawText.slice(normalized.length);

    const rewritten = REWRITTEN_LINKS.find((entry) => entry.regex.test(normalized));
    if (rewritten) {
        return (
            <React.Fragment key={`${keyPrefix}-rewritten-${index}`}>
                <a href={rewritten.href} target="_blank" rel="noreferrer noopener">
                    {rewritten.label}
                </a>
                {trailing}
            </React.Fragment>
        );
    }

    if (normalized.includes('@')) {
        return (
            <React.Fragment key={`${keyPrefix}-email-${index}`}>
                <a href={`mailto:${normalized}`}>{normalized}</a>
                {trailing}
            </React.Fragment>
        );
    }

    return (
        <React.Fragment key={`${keyPrefix}-url-${index}`}>
            <a href={toUrlHref(normalized)} target="_blank" rel="noreferrer noopener">
                {normalized}
            </a>
            {trailing}
        </React.Fragment>
    );
};

const renderTextWithLinks = (text, keyPrefix) => {
    if (typeof text !== 'string' || !text.trim()) {
        return text;
    }

    const matcher = new RegExp(`(${EXTERNAL_URL_REGEX.source}|${EMAIL_REGEX.source})`, 'gi');
    const matches = Array.from(text.matchAll(matcher));

    if (!matches.length) {
        return text;
    }

    const pieces = [];
    let cursor = 0;

    matches.forEach((match, index) => {
        const fullMatch = match[0];
        const start = match.index || 0;

        if (start > cursor) {
            pieces.push(text.slice(cursor, start));
        }

        pieces.push(buildLinkNode(fullMatch, keyPrefix, index));
        cursor = start + fullMatch.length;
    });

    if (cursor < text.length) {
        pieces.push(text.slice(cursor));
    }

    return pieces;
};

const renderParagraphs = (paragraphs, sectionKey) =>
    paragraphs?.map((paragraph, paragraphIndex) => (
        <p key={`${sectionKey}-paragraph-${paragraphIndex}`} className="legal-paragraph">
            {renderTextWithLinks(paragraph, `${sectionKey}-paragraph-${paragraphIndex}`)}
        </p>
    ));

const renderBullets = (bullets, sectionKey) =>
    bullets?.length ? (
        <ul className="legal-list">
            {bullets.map((bullet, bulletIndex) => (
                <li key={`${sectionKey}-bullet-${bulletIndex}`}>
                    {renderTextWithLinks(bullet, `${sectionKey}-bullet-${bulletIndex}`)}
                </li>
            ))}
        </ul>
    ) : null;

const renderNumbered = (items, sectionKey) =>
    items?.length ? (
        <ol className="legal-list legal-list-ordered">
            {items.map((item, itemIndex) => (
                <li key={`${sectionKey}-numbered-${itemIndex}`}>
                    {renderTextWithLinks(item, `${sectionKey}-numbered-${itemIndex}`)}
                </li>
            ))}
        </ol>
    ) : null;

const LegalDocument = ({ documentKey, pageHeading }) => {
    const documentData = legalDocuments[documentKey];

    if (!documentData) {
        return null;
    }

    return (
        <div className="inner-page legal-page">
            <section className="page-header legal-header">
                <div className="container">
                    <div className="page-header-card glass-card">
                        <span className="page-header-eyebrow">Legal</span>
                        <h1 className="page-header-title">{pageHeading || documentData.title}</h1>
                        <p className="page-header-subtitle">{documentData.subtitle}</p>
                    </div>
                </div>
            </section>

            <section className="section-padding legal-section">
                <div className="container legal-container">
                    {documentData.warning && (
                        <article className="glass-card legal-card legal-warning-card">
                            <h2>Investment Risk Warning</h2>
                            <p>{documentData.warning}</p>
                        </article>
                    )}

                    {documentData.sections.map((section, sectionIndex) => {
                        const sectionKey = `${documentData.title}-section-${sectionIndex}`;
                        return (
                            <article key={sectionKey} className="glass-card legal-card">
                                {section.heading && <h2>{section.heading}</h2>}
                                {renderParagraphs(section.paragraphs, sectionKey)}
                                {renderBullets(section.bullets, sectionKey)}
                                {renderNumbered(section.numbered, sectionKey)}

                                {section.subSections?.map((subSection, subSectionIndex) => {
                                    const subSectionKey = `${sectionKey}-subsection-${subSectionIndex}`;
                                    return (
                                        <div key={subSectionKey} className="legal-subsection">
                                            <h3>{subSection.heading}</h3>
                                            {renderParagraphs(subSection.paragraphs, subSectionKey)}
                                            {renderBullets(subSection.bullets, subSectionKey)}
                                            {renderNumbered(subSection.numbered, subSectionKey)}
                                        </div>
                                    );
                                })}
                            </article>
                        );
                    })}

                    {documentData.contact && (
                        <article className="glass-card legal-card legal-contact-card">
                            <h2>{documentData.contact.title}</h2>
                            {documentData.contact.lines.map((line, lineIndex) => (
                                <p key={`${documentData.title}-contact-line-${lineIndex}`} className="legal-paragraph">
                                    {renderTextWithLinks(line, `${documentData.title}-contact-line-${lineIndex}`)}
                                </p>
                            ))}
                        </article>
                    )}

                    <article className="glass-card legal-card legal-risk-card">
                        <h2>SEBI Investment Risk Disclosure</h2>
                        <p>{sebiRiskDisclosure}</p>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default LegalDocument;
