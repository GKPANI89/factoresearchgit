import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, TrendingUp, X, XCircle } from 'lucide-react';
import { createRazorpayOrder, verifyRazorpayPayment } from '../utils/razorpayApi';
import { servicePriceToPaise } from '../utils/servicePricing';

const buildReceipt = (serviceName) => {
    const slug = String(serviceName || 'service')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 18);

    return `${slug || 'service'}-${Date.now().toString(36)}`.slice(0, 40);
};

const RazorpayCheckoutButton = ({ amount, serviceName, planName, className = 'service-plan-btn' }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState(null);

    const showResult = (type, message) => {
        setIsProcessing(false);
        setResult({ type, message });
    };

    const handleCheckout = async () => {
        const amountInPaise = servicePriceToPaise(amount);

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
                description: `${serviceName}${planName ? ` - ${planName}` : ''} (incl. 18% GST)`,
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

            checkout.open();
        } catch (error) {
            showResult('error', error.message || 'Unable to start payment. Please try again.');
        }
    };

    return (
        <>
            <button type="button" className={className} onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? 'Opening checkout…' : 'Subscribe'} <TrendingUp size={16} />
            </button>

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
