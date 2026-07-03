import React, { useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, MessageSquare } from 'lucide-react';
import { siteData } from '../data/siteData';
import { submitContactForm } from '../utils/contactApi';
import WhatsAppBrandIcon from './WhatsAppBrandIcon';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;

const EMPTY_ERRORS = {
    fullName: '',
    email: '',
    phone: '',
    message: '',
};

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState('');
    const [formStatusType, setFormStatusType] = useState('');
    const [formErrors, setFormErrors] = useState(EMPTY_ERRORS);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fieldRefs = {
        fullName: useRef(null),
        phone: useRef(null),
        email: useRef(null),
        message: useRef(null),
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (formStatus) {
            setFormStatus('');
            setFormStatusType('');
        }
        if (formErrors[name]) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        const trimmedName = formData.fullName.trim();
        const trimmedEmail = formData.email.trim();
        const normalizedPhone = formData.phone.replace(/\D/g, '');
        const trimmedMessage = formData.message.trim();
        const nextErrors = { ...EMPTY_ERRORS };

        if (trimmedName.length < 2) {
            nextErrors.fullName = 'Please enter your full name with at least 2 characters.';
        }

        if (!EMAIL_PATTERN.test(trimmedEmail)) {
            nextErrors.email = 'Please enter a valid email address, e.g. name@example.com.';
        }

        if (!INDIAN_MOBILE_PATTERN.test(normalizedPhone)) {
            nextErrors.phone = 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
        }

        if (trimmedMessage.length < 20) {
            nextErrors.message = 'Please write a message of at least 20 characters so we can understand your enquiry.';
        }

        return nextErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedName = formData.fullName.trim();
        const trimmedEmail = formData.email.trim();
        const trimmedPhone = formData.phone.replace(/\D/g, '');
        const trimmedMessage = formData.message.trim();
        const nextErrors = validateForm();
        const firstInvalidField = Object.keys(nextErrors).find((fieldName) => nextErrors[fieldName]);

        if (firstInvalidField) {
            setFormErrors(nextErrors);
            setFormStatus('Please correct the highlighted fields and submit the form again.');
            setFormStatusType('error');
            fieldRefs[firstInvalidField].current?.focus();
            return;
        }

        setFormErrors(EMPTY_ERRORS);
        setFormStatus('');
        setFormStatusType('');
        setIsSubmitting(true);

        try {
            await submitContactForm({
                formType: 'contact',
                name: trimmedName,
                email: trimmedEmail,
                phone: trimmedPhone,
                service: '',
                message: trimmedMessage,
                pageUrl: window.location.href,
            });
            setFormStatus('Thank you. Your enquiry was sent successfully.');
            setFormStatusType('success');
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                message: '',
            });
        } catch (error) {
            setFormStatus(error.message || 'Unable to send message right now.');
            setFormStatusType('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getDescribedBy = (fieldName, hintId) => {
        const ids = [hintId];
        if (formErrors[fieldName]) {
            ids.push(`${fieldName}-error`);
        }
        return ids.join(' ');
    };

    const renderFieldError = (fieldName) =>
        formErrors[fieldName] ? (
            <p id={`${fieldName}-error`} className="form-field-error">
                <AlertTriangle size={14} aria-hidden="true" />
                <span>{formErrors[fieldName]}</span>
            </p>
        ) : null;

    return (
        <section id="contact" className="contact-section-v3 section-padding">
            <div className="container">
                <div className="contact-header-v3">
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="contact-badge"
                    >
                        <MessageSquare size={14} /> <span>Direct Communication</span>
                    </Motion.div>
                    <h1 className="section-title">
                        Contact <span className="gradient-text">Facto Research</span>
                    </h1>
                    <p className="section-subtitle">
                        Please contact us directly with questions, comments, or scheduling inquiries.
                    </p>
                </div>
                <div className="contact-main-wrapper contact-form-only glass-card">
                    <div className="contact-form-panel">
                        <div className="contact-form-head">
                            <h2>Send Your Requirement</h2>
                            <p>Our onboarding team responds within one business day.</p>
                        </div>
                        <form className="luxury-form" onSubmit={handleSubmit} noValidate>
                            <div className="form-row">
                                <div className="form-group-v3">
                                    <label htmlFor="contact-full-name">Full Name *</label>
                                    <input
                                        ref={fieldRefs.fullName}
                                        id="contact-full-name"
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="e.g. Ramesh Kumar Sharma"
                                        autoComplete="name"
                                        aria-invalid={Boolean(formErrors.fullName)}
                                        aria-describedby={getDescribedBy('fullName', 'fullName-hint')}
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <span id="fullName-hint" className="form-field-hint">
                                        Enter your full name as you prefer us to address you.
                                    </span>
                                    {renderFieldError('fullName')}
                                </div>
                                <div className="form-group-v3">
                                    <label htmlFor="contact-phone">Phone Number * (10 digits, India)</label>
                                    <input
                                        ref={fieldRefs.phone}
                                        id="contact-phone"
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="e.g. 9811735353"
                                        inputMode="numeric"
                                        autoComplete="tel"
                                        aria-invalid={Boolean(formErrors.phone)}
                                        aria-describedby={getDescribedBy('phone', 'phone-hint')}
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <span id="phone-hint" className="form-field-hint">
                                        Start with 6-9. No spaces, dashes, or country code needed.
                                    </span>
                                    {renderFieldError('phone')}
                                </div>
                            </div>
                            <div className="form-group-v3">
                                <label htmlFor="contact-email">Email Address *</label>
                                <input
                                    ref={fieldRefs.email}
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="e.g. name@example.com"
                                    autoComplete="email"
                                    aria-invalid={Boolean(formErrors.email)}
                                    aria-describedby={getDescribedBy('email', 'email-hint')}
                                    required
                                    disabled={isSubmitting}
                                />
                                <span id="email-hint" className="form-field-hint">
                                    Use the email address where you want to receive our response.
                                </span>
                                {renderFieldError('email')}
                            </div>
                            <div className="form-group-v3">
                                <label htmlFor="contact-message">Message *</label>
                                <textarea
                                    ref={fieldRefs.message}
                                    id="contact-message"
                                    rows="4"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your enquiry in detail..."
                                    aria-invalid={Boolean(formErrors.message)}
                                    aria-describedby={getDescribedBy('message', 'message-hint')}
                                    required
                                    disabled={isSubmitting}
                                />
                                <span id="message-hint" className="form-field-hint">
                                    Minimum 20 characters.
                                </span>
                                {renderFieldError('message')}
                            </div>
                            <div className="contact-form-actions">
                                <Motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary luxury-submit"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Submit Enquiry'} <ArrowRight size={18} />
                                </Motion.button>
                                <a
                                    className="contact-whatsapp-btn whatsapp-action-btn"
                                    href={siteData.contact.whatsappUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <WhatsAppBrandIcon size={17} />
                                    <span>Message us on WhatsApp</span>
                                </a>
                            </div>
                            {formStatus && (
                                <p
                                    className={`contact-form-status contact-form-status-${formStatusType}`}
                                    role={formStatusType === 'success' ? 'status' : 'alert'}
                                    aria-live={formStatusType === 'success' ? 'polite' : 'assertive'}
                                >
                                    {formStatus}
                                </p>
                            )}
                        </form>
                        {/* <div className="contact-trust-row"> */}
                            {/* <span className="contact-trust-pill">SEBI Registered RA</span> */}
                            {/* <span className="contact-trust-pill">Dedicated Human Support</span> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
