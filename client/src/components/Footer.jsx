import React, { useMemo } from 'react';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { RouteLink } from '../router';
import { navLinks } from '../routes';
import { siteData } from '../data/siteData';
import { legalLinks } from '../data/legalData';
import WhatsAppBrandIcon from './WhatsAppBrandIcon';
import { FacebookBrandIcon, InstagramBrandIcon, LinkedInBrandIcon, XBrandIcon } from './SocialBrandIcons';
import sebiPaymentQr from '../assets/qr.jpeg';

const BUSINESS_HOURS = [
    { day: 'Mon', time: '09:00 am - 05:00 pm', open: true },
    { day: 'Tue', time: '09:00 am - 05:00 pm', open: true },
    { day: 'Wed', time: '09:00 am - 05:00 pm', open: true },
    { day: 'Thu', time: '09:00 am - 05:00 pm', open: true },
    { day: 'Fri', time: '09:00 am - 05:00 pm', open: true },
    { day: 'Sat', time: 'Closed', open: false },
    { day: 'Sun', time: 'Closed', open: false },
];

const Footer = () => {
    const complianceEmail = 'compliance@factoresearch.com';
    const phoneHref = `tel:${(siteData.contact.phone || '').replace(/[^\d+]/g, '')}`;
    const emailHref = `mailto:${siteData.contact.email || ''}`;
    const complianceEmailHref = `mailto:${complianceEmail}`;
    const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteData.contact.address || '')}`;
    const socialLinks = siteData.contact.socialLinks || {};
    const hasLink = (value) => typeof value === 'string' && value.trim().length > 0;
    const socialProfiles = [
        { key: 'twitter', href: socialLinks.twitter, className: 'social-twitter', label: 'X', Icon: XBrandIcon },
        {
            key: 'facebook',
            href: socialLinks.facebook,
            className: 'social-facebook',
            label: 'Facebook',
            Icon: FacebookBrandIcon,
        },
        {
            key: 'instagram',
            href: socialLinks.instagram,
            className: 'social-instagram',
            label: 'Instagram',
            Icon: InstagramBrandIcon,
        },
        {
            key: 'linkedin',
            href: socialLinks.linkedin,
            className: 'social-linkedin',
            label: 'LinkedIn',
            Icon: LinkedInBrandIcon,
        },
    ];
    const todayHours = useMemo(() => {
        const todayIndex = new Date().getDay();
        const todayKey = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][todayIndex];
        return BUSINESS_HOURS.find((entry) => entry.day === todayKey) || BUSINESS_HOURS[0];
    }, []);

    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-info">
                        <div className="footer-brand-assets">
                            {/* <div className="logo">
                                <img
                                    src={siteData.brand.logoUrl}
                                    alt={`${siteData.brand.name} Logo`}
                                    className="logo-img footer-logo-img"
                                />
                            </div> */}
                            <div className="footer-sebi-payment">
                                <h4>SEBI Verified UPI QR Code</h4>
                                <img
                                    src={sebiPaymentQr}
                                    alt="SEBI verified payment QR code"
                                    className="footer-sebi-payment-qr"
                                />
                            </div>
                        </div>
                        <p className="footer-brand-copy">
                            <b>Payment & UPI Disclaimer :</b><br></br>

Facto Research is a SEBI Registered Research Analyst(Registration No. INH000024480).

Clients are advised to make payments only through our <span style={{color:"blue",fontWeight:"bold"}}> SEBI-verified UPI ID ( facto.ra@validfdrl )</span> and official bank account details communicated through our official channels. Before making any payment, please verify the UPI ID, QR code, and beneficiary name <span style={{color:"#1B7FEA",fontWeight:"bold"}}>( FACTO RESEARCH )</span> displayed in the payment application.
                        </p>
                        
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            {navLinks.map((item) => (
                                <li key={item.path}>
                                    <RouteLink to={item.path}>
                                        {item.path === '/pricing' ? 'HNI Research' : item.label}
                                    </RouteLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Legal</h4>
                        <ul>
                            {legalLinks.map((item) => (
                                <li key={item.path}>
                                    <RouteLink to={item.path}>{item.label}</RouteLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4>Registered Address</h4>
                        <div className="contact-item">
                            <Phone size={18} />
                            <a className="contact-link" href={phoneHref}>
                                {siteData.contact.phone}
                            </a>
                        </div>
                        <a
                            className="footer-whatsapp-btn whatsapp-action-btn"
                            href={siteData.contact.whatsappUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <WhatsAppBrandIcon size={17} />
                            <span>Message us on WhatsApp</span>
                        </a>
                        <div className="contact-item">
                            <Mail size={18} />
                            <a className="contact-link" href={emailHref}>
                                {siteData.contact.email}
                            </a>
                        </div>
                        <div className="contact-item">
                            <ShieldCheck size={18} className="compliance-icon" />
                            <a className="contact-link" href={complianceEmailHref}>
                                {complianceEmail}
                            </a>
                        </div>
                        <div className="contact-item">
                            <MapPin size={18} />
                            <a className="contact-link" href={mapsHref} target="_blank" rel="noreferrer noopener">
                                {siteData.contact.address}
                            </a>
                        </div>
                        <p className="footer-open-today">
                            <span className="footer-open-today-prefix">
                                {todayHours.open ? 'Open today' : 'Closed today'}
                            </span>
                            {todayHours.open && (
                                <span className="footer-open-today-time"> {todayHours.time}</span>
                            )}
                        </p>
                        <b>Follow us on</b>
                        <div className="social-links">
                            {socialProfiles.map((profile) => {
                                const enabled = hasLink(profile.href);
                                return (
                                    <a
                                        key={profile.key}
                                        href={enabled ? profile.href : '#'}
                                        className={`${profile.className}${enabled ? '' : ' social-link-disabled'}`}
                                        target={enabled ? '_blank' : undefined}
                                        rel={enabled ? 'noreferrer noopener' : undefined}
                                        aria-label={profile.label}
                                        aria-disabled={!enabled}
                                        onClick={(event) => {
                                            if (!enabled) {
                                                event.preventDefault();
                                            }
                                        }}
                                    >
                                        <profile.Icon size={20} />
                                    </a>
                                );
                            })}
                            {siteData.contact.whatsappUrl && (
                                <a
                                    href={siteData.contact.whatsappUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    aria-label="WhatsApp"
                                    className="social-whatsapp-link"
                                >
                                    <WhatsAppBrandIcon size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="footer-large-wordmark">Facto Research</div>

                <div className="footer-bottom">
                    <p>© 2026 {siteData.brand.name}. All rights reserved.</p>
                </div>

                <div className="footer-disclosure">
                    <p>
                        {siteData.footer.disclosure}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
