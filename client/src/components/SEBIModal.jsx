import React, { useEffect, useRef, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';
import { useRouter } from '../useRouter';
import { submitContactForm } from '../utils/contactApi';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = {
    name: '',
    email: '',
    phone: '',
    enquiryMessage: '',
};

const EMPTY_ERRORS = {
    name: '',
    phone: '',
    email: '',
};

const getFocusableElements = (container) => {
    if (!container) return [];

    return Array.from(
        container.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
    ).filter((element) => {
        if (!(element instanceof HTMLElement)) return false;
        if (element.hasAttribute('disabled')) return false;
        if (element.getAttribute('aria-hidden') === 'true') return false;
        if (element.tabIndex < 0) return false;
        return element.offsetParent !== null || element === document.activeElement;
    });
};

const SEBIModal = () => {
    const { navigate } = useRouter();
    const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
    const [isAdviceOpen, setIsAdviceOpen] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [formErrors, setFormErrors] = useState(EMPTY_ERRORS);
    const [formStatus, setFormStatus] = useState('');
    const [formStatusType, setFormStatusType] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const disclaimerDialogRef = useRef(null);
    const adviceDialogRef = useRef(null);
    const disclaimerCloseButtonRef = useRef(null);
    const adviceCloseButtonRef = useRef(null);
    const adviceNameInputRef = useRef(null);
    const lastFocusedElementRef = useRef(null);
    const wasAnyModalOpenRef = useRef(false);

    const isAnyModalOpen = isDisclaimerOpen || isAdviceOpen;

    useEffect(() => {
        const timer = setTimeout(() => setIsDisclaimerOpen(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const appShell = document.getElementById('app-main-shell');
        if (!appShell) return;

        if (isAnyModalOpen) {
            appShell.setAttribute('aria-hidden', 'true');
            return () => appShell.removeAttribute('aria-hidden');
        }

        appShell.removeAttribute('aria-hidden');
        return undefined;
    }, [isAnyModalOpen]);

    useEffect(() => {
        if (isAnyModalOpen && !wasAnyModalOpenRef.current) {
            const current = document.activeElement;
            lastFocusedElementRef.current = current instanceof HTMLElement ? current : null;
        }

        if (!isAnyModalOpen && wasAnyModalOpenRef.current) {
            if (lastFocusedElementRef.current && document.contains(lastFocusedElementRef.current)) {
                lastFocusedElementRef.current.focus();
            }
        }

        wasAnyModalOpenRef.current = isAnyModalOpen;
    }, [isAnyModalOpen]);

    useEffect(() => {
        if (!isDisclaimerOpen) return;

        const focusId = window.requestAnimationFrame(() => {
            disclaimerCloseButtonRef.current?.focus();
        });

        return () => window.cancelAnimationFrame(focusId);
    }, [isDisclaimerOpen]);

    useEffect(() => {
        if (!isAdviceOpen) return;

        const focusId = window.requestAnimationFrame(() => {
            adviceNameInputRef.current?.focus();
        });

        return () => window.cancelAnimationFrame(focusId);
    }, [isAdviceOpen]);

    useEffect(() => {
        if (!isAnyModalOpen) return;

        const closeActiveModal = () => {
            if (isAdviceOpen) {
                setIsAdviceOpen(false);
                setFormStatus('');
                setFormStatusType('');
                setFormErrors(EMPTY_ERRORS);
                setIsSubmitted(false);
                return;
            }

            if (isDisclaimerOpen) {
                setIsDisclaimerOpen(false);
                setIsAdviceOpen(true);
                setFormStatus('');
                setFormStatusType('');
                setFormErrors(EMPTY_ERRORS);
                setIsSubmitted(false);
            }
        };

        const activeDialog = isAdviceOpen ? adviceDialogRef.current : disclaimerDialogRef.current;
        if (!activeDialog) return undefined;

        const handleDialogTabKeyDown = (event) => {
            if (event.key !== 'Tab') return;

            const focusable = getFocusableElements(activeDialog);

            if (!focusable.length) {
                event.preventDefault();
                const fallback = isAdviceOpen ? adviceCloseButtonRef.current : disclaimerCloseButtonRef.current;
                fallback?.focus();
                return;
            }

            const firstElement = focusable[0];
            const lastElement = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
                return;
            }

            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        const handleEscapeKeyDown = (event) => {
            if (event.key !== 'Escape' && event.key !== 'Esc') return;
            event.preventDefault();
            closeActiveModal();
        };

        activeDialog.addEventListener('keydown', handleDialogTabKeyDown);
        document.addEventListener('keydown', handleEscapeKeyDown, true);

        return () => {
            activeDialog.removeEventListener('keydown', handleDialogTabKeyDown);
            document.removeEventListener('keydown', handleEscapeKeyDown, true);
        };
    }, [isAnyModalOpen, isAdviceOpen, isDisclaimerOpen]);

    const clearAdviceFormStatus = () => {
        if (formStatus) {
            setFormStatus('');
            setFormStatusType('');
        }
    };

    const openAdviceModal = () => {
        setIsAdviceOpen(true);
        setFormStatus('');
        setFormStatusType('');
        setFormErrors(EMPTY_ERRORS);
        setIsSubmitted(false);
    };

    const handleAccept = () => {
        setIsDisclaimerOpen(false);
        openAdviceModal();
    };

    const handleCloseDisclaimer = () => {
        setIsDisclaimerOpen(false);
        openAdviceModal();
    };

    const handleCloseAdvice = () => {
        setIsAdviceOpen(false);
        setFormStatus('');
        setFormStatusType('');
        setFormErrors(EMPTY_ERRORS);
        setIsSubmitted(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name in formErrors && formErrors[name]) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }

        clearAdviceFormStatus();
    };

    const validateAdviceForm = (payload) => {
        const nextErrors = { ...EMPTY_ERRORS };

        if (!payload.name) {
            nextErrors.name = 'Please enter your full name.';
        }

        if (!payload.phone) {
            nextErrors.phone = 'Please enter your mobile number.';
        }

        if (!payload.email) {
            nextErrors.email = 'Please enter your email address.';
        } else if (!EMAIL_PATTERN.test(payload.email)) {
            nextErrors.email = 'Please provide a valid email address (e.g. yourname@example.com).';
        }

        return nextErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            enquiryMessage: formData.enquiryMessage.trim(),
        };

        const nextErrors = validateAdviceForm(payload);
        const hasErrors = Object.values(nextErrors).some(Boolean);

        if (hasErrors) {
            setFormErrors(nextErrors);
            setFormStatus('');
            setFormStatusType('');
            return;
        }

        setFormErrors(EMPTY_ERRORS);
        setIsSubmitted(true);

        submitContactForm({
            formType: 'advice',
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            service: '',
            message: payload.enquiryMessage,
            pageUrl: window.location.href,
        })
            .then(() => {
                setFormStatus('Your enquiry has been sent. We will be in touch shortly.');
                setFormStatusType('success');

                setTimeout(() => {
                    setIsAdviceOpen(false);
                    setFormData(EMPTY_FORM);
                    navigate('/');
                }, 1800);
            })
            .catch((error) => {
                setIsSubmitted(false);
                setFormStatus(error.message || 'Unable to submit enquiry right now.');
                setFormStatusType('error');
            });
    };

    return (
        <AnimatePresence>
            {isDisclaimerOpen && (
                <div className="modal-overlay">
                    <Motion.div
                        ref={disclaimerDialogRef}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="modal-content glass-card"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="regulatory-disclosure-title"
                    >
                        <div className="modal-header">
                            <ShieldAlert className="warning-icon" size={32} />
                            <h2 id="regulatory-disclosure-title">Regulatory Disclosure</h2>
                            <button
                                id="disclaimer-close-btn"
                                ref={disclaimerCloseButtonRef}
                                type="button"
                                className="modal-close-btn"
                                onClick={handleCloseDisclaimer}
                                aria-label="Close regulatory disclosure dialog"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Facto Research is a SEBI Registered Research Analyst (Registration No: INH000024480).
                                Investment in securities market are subject to market risks. Read all the related documents
                                carefully before investing.
                            </p>
                            <p>
                                Registration granted by SEBI and certification from NISM in no way guarantee performance of
                                the intermediary or provide any assurance of returns to investors.
                            </p>
                            <div className="disclosure-box">
                                <strong>Important:</strong> We do not provide profit sharing services or guaranteed returns.
                                Beware of fraudsters using our name.
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-primary full-width" onClick={handleAccept}>
                                I Understand & Accept
                            </button>
                        </div>
                    </Motion.div>
                </div>
            )}

            {isAdviceOpen && (
                <div className="modal-overlay">
                    <Motion.div
                        ref={adviceDialogRef}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="modal-content glass-card advice-modal-content"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="advice-modal-title"
                    >
                        <div className="modal-header advice-modal-header">
                            <div>
                                <h2 id="advice-modal-title">Get In Touch!</h2>
                                <p>Your Information will never be shared with any third party</p>
                            </div>
                            <button
                                id="modal-close-btn"
                                ref={adviceCloseButtonRef}
                                type="button"
                                className="modal-close-btn"
                                onClick={handleCloseAdvice}
                                aria-label="Close Get In Touch dialog"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form className="advice-form" onSubmit={handleSubmit} noValidate>
                            <div className="advice-form-field">
                                <label htmlFor="m-name">Full Name *</label>
                                <input
                                    ref={adviceNameInputRef}
                                    id="m-name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Priya Sharma"
                                    autoComplete="name"
                                    aria-invalid={Boolean(formErrors.name)}
                                    aria-describedby={formErrors.name ? 'm-name-error' : undefined}
                                    required
                                    disabled={isSubmitted}
                                />
                                {formErrors.name && (
                                    <span id="m-name-error" role="alert" className="advice-field-error">
                                        {formErrors.name}
                                    </span>
                                )}
                            </div>

                            <div className="advice-form-field">
                                <label htmlFor="m-phone">Mobile Number *</label>
                                <input
                                    id="m-phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="e.g. +91 99999 99999"
                                    autoComplete="tel"
                                    aria-invalid={Boolean(formErrors.phone)}
                                    aria-describedby={formErrors.phone ? 'm-phone-error' : undefined}
                                    required
                                    disabled={isSubmitted}
                                />
                                {formErrors.phone && (
                                    <span id="m-phone-error" role="alert" className="advice-field-error">
                                        {formErrors.phone}
                                    </span>
                                )}
                            </div>

                            <div className="advice-form-field">
                                <label htmlFor="m-email">Email Address *</label>
                                <input
                                    id="m-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="e.g. yourname@email.com"
                                    autoComplete="email"
                                    aria-invalid={Boolean(formErrors.email)}
                                    aria-describedby={formErrors.email ? 'm-email-error' : undefined}
                                    required
                                    disabled={isSubmitted}
                                />
                                {formErrors.email && (
                                    <span id="m-email-error" role="alert" className="advice-field-error">
                                        {formErrors.email}
                                    </span>
                                )}
                            </div>

                            <div className="advice-form-field">
                                <label htmlFor="m-msg">Enquiry Message (Optional)</label>
                                <textarea
                                    id="m-msg"
                                    name="enquiryMessage"
                                    value={formData.enquiryMessage}
                                    onChange={handleChange}
                                    placeholder="Share your requirement"
                                    rows="2"
                                    disabled={isSubmitted}
                                />
                            </div>

                            <button className="btn-primary advice-submit-btn" type="submit" disabled={isSubmitted}>
                                {isSubmitted ? 'Submitting...' : 'Send enquiry'}
                            </button>

                            {formStatus && (
                                <p
                                    className={`advice-form-status${
                                        formStatusType ? ` advice-form-status-${formStatusType}` : ''
                                    }`}
                                    role={formStatusType === 'success' ? 'status' : 'alert'}
                                >
                                    {formStatus}
                                </p>
                            )}
                        </form>
                    </Motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SEBIModal;
