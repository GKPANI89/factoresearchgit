import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, ChevronDown, X, XCircle } from 'lucide-react';
import { createRazorpayOrder, verifyRazorpayPayment } from '../utils/razorpayApi';
import { servicePriceToPaise } from '../utils/servicePricing';
import ServicePrice from './ServicePrice';

const buildReceipt = (serviceName) => {
    const slug = String(serviceName || 'service')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 18);

    return `${slug || 'service'}-${Date.now().toString(36)}`.slice(0, 40);
};

const normalizePlans = (plans, planName, amount) => {
    const options = Array.isArray(plans)
        ? plans
              .map((plan) => {
                  if (Array.isArray(plan)) {
                      return { name: String(plan[0] || ''), price: plan[1] };
                  }

                  return { name: String(plan?.name || plan?.title || ''), price: plan?.price };
              })
              .filter((plan) => plan.name && plan.price)
        : [];

    return options.length ? options : [{ name: planName || 'Subscription', price: amount }];
};

const RazorpayCheckoutButton = ({
    amount,
    serviceName,
    planName,
    plans,
    className = 'service-plan-btn',
}) => {
    const planOptions = normalizePlans(plans, planName, amount);
    const initialPlanName = planOptions.some((plan) => plan.name === planName)
        ? planName
        : planOptions[0]?.name;
    const [selectedPlanName, setSelectedPlanName] = useState(initialPlanName);
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);
    const selectedPlan =
        planOptions.find((plan) => plan.name === selectedPlanName) || planOptions[0];

    const showResult = (type, message) => {
        setIsConfigOpen(false);
        setIsProcessing(false);
        setResult({ type, message });
    };

    const openConfiguration = () => {
        setSelectedPlanName(initialPlanName);
        setResult(null);
        setIsConfigOpen(true);
    };

    const closeConfiguration = () => {
        if (!isProcessing) {
            setIsConfigOpen(false);
        }
    };

    const handleCheckout = async () => {
        const amountInPaise = servicePriceToPaise(selectedPlan?.price);

        if (!amountInPaise) {
            showResult('error', 'This plan requires a custom quote. Please contact support to subscribe.');
            return;
        }

        if (!window.Razorpay) {
            showResult('error', 'Razorpay Checkout could not be loaded. Please refresh and try again.');
            return;
        }

        setIsProcessing(true);
        setResult(null);

        try {
            const order = await createRazorpayOrder({
                amount: amountInPaise,
                currency: 'INR',
                receipt: buildReceipt(serviceName),
            });
            const checkoutKey = order.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID;

            if (!checkoutKey) {
                throw new Error('Razorpay public key is missing from the server configuration.');
            }

            const checkout = new window.Razorpay({
                key: checkoutKey,
                amount: order.amount,
                currency: order.currency,
                name: 'Facto Research',
                description: `${serviceName}${selectedPlan?.name ? ` - ${selectedPlan.name}` : ''} (incl. 18% GST)`,
                order_id: order.order_id,
                handler: async (payment) => {
                    try {
                        await verifyRazorpayPayment(payment);
                        showResult('success', 'Payment successful and verified. Your subscription payment is complete.');
                    } catch (error) {
                        showResult(
                            'error',
                            error.message || 'Payment was received but verification failed. Please contact support.'
                        );
                    }
                },
                modal: {
                    ondismiss: () => showResult('error', 'Payment cancelled. No payment was completed.'),
                },
                theme: { color: '#1B7FEA' },
            });

            checkout.on('payment.failed', (response) => {
                checkout.close();
                showResult(
                    'error',
                    response?.error?.description || 'Payment failed. Please check your details and try again.'
                );
            });

            setIsConfigOpen(false);
            setIsProcessing(false);
            checkout.open();
        } catch (error) {
            showResult('error', error.message || 'Unable to start payment. Please try again.');
        }
    };

    return (
        <>
            <button type="button" className={className} onClick={openConfiguration}>
                SUBSCRIBE
            </button>

            {isConfigOpen && createPortal(
                <div className="subscription-config-overlay" role="presentation" onMouseDown={(event) => {
                    if (event.target === event.currentTarget) closeConfiguration();
                }}>
                    <div
                        className="subscription-config-dialog"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="subscription-config-title"
                    >
                        <header className="subscription-config-header">
                            <div>
                                <span>Subscription</span>
                                {/* <h2 id="subscription-config-title">Configure Your Service</h2> */}
                            </div>
                            <button type="button" onClick={closeConfiguration} aria-label="Close configuration">
                                <X size={24} />
                            </button>
                        </header>

                        <div className="subscription-config-body">
                            <div className="subscription-config-service">
                                <span>Service</span>
                                <strong>{serviceName}</strong>
                            </div>

                            <label className="subscription-period-field">
                                <span>Subscription Period</span>
                                <div>
                                    <select
                                        value={selectedPlan?.name || ''}
                                        onChange={(event) => setSelectedPlanName(event.target.value)}
                                        disabled={isProcessing}
                                    >
                                        {planOptions.map((plan) => (
                                            <option key={plan.name} value={plan.name}>{plan.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={20} aria-hidden="true" />
                                </div>
                            </label>

                            <div className="subscription-config-price">
                                <span>Price</span>
                                <strong><ServicePrice price={selectedPlan?.price} /></strong>
                                <small>18% GST will be included in the checkout total.</small>
                            </div>
                        </div>

                        <footer className="subscription-config-actions">
                            <button type="button" className="subscription-continue-btn" onClick={closeConfiguration}>
                                Continue Shopping
                            </button>
                            <button
                                type="button"
                                className="subscription-checkout-btn"
                                onClick={handleCheckout}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Preparing Checkout...' : 'Proceed to Checkout'}
                            </button>
                        </footer>
                    </div>
                </div>,
                document.body
            )}

            {result && createPortal(
                <div className="payment-result-overlay" role="presentation">
                    <div
                        className={`payment-result-dialog payment-result-${result.type}`}
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="payment-result-title"
                    >
                        {result.type === 'success' ? <CheckCircle2 size={42} /> : <XCircle size={42} />}
                        <h2 id="payment-result-title">
                            {result.type === 'success' ? 'Payment Successful' : 'Payment Not Completed'}
                        </h2>
                        <p>{result.message}</p>
                        <button type="button" onClick={() => setResult(null)}>
                            <X size={16} /> Close
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default RazorpayCheckoutButton;
