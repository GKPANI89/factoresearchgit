import React, { useState } from 'react';
import { RouteLink } from '../router';

const steps = [
    { id: 1, label: 'KYC' },
    { id: 2, label: 'DOC' },
    { id: 3, label: 'SERVICES' },
    { id: 4, label: 'E-SIGN' },
    { id: 5, label: 'PAYMENT' },
];

const OnboardingPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Move to the next step for demo purposes
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <div className="onboarding-page">
            <div className="onboarding-left">
                <div className="onboarding-left-content">
                    <h1>Setting Up<br />Your Account</h1>
                    <p>Please provide your basic details to get started with your investment journey.</p>
                </div>
            </div>

            <div className="onboarding-right">
                <div className="onboarding-form-container">
                    <div className="stepper-wrapper">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <div className="step-item">
                                    <div className={`step-circle ${currentStep >= step.id ? 'active' : ''}`}>
                                        {step.id}
                                    </div>
                                    <span className={`step-label ${currentStep >= step.id ? 'active' : ''}`}>
                                        {step.label}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`step-line ${currentStep > step.id ? 'active' : ''}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="form-header">
                        <h2>Basic Details</h2>
                        <p>Let's get to know you.</p>
                    </div>

                    <form className="onboarding-form" onSubmit={handleSubmit}>
                        <div className="form-group-onboard">
                            <label><div className="p-4">Full Name</div></label>
                            <input type="text" placeholder="Enter your full name" required />
                        </div>

                        <div className="form-group-onboard">
                            <label>Mobile Number</label>
                            <input type="tel" placeholder="Enter mobile number" required />
                        </div>

                        <button type="submit" className="onboarding-submit-btn">
                            Save & Continue
                        </button>
                    </form>

                    <div className="onboarding-footer">
                        By continuing you agree to our <RouteLink to="/legal/terms-and-conditions">Terms</RouteLink> & <RouteLink to="/legal/privacy-policy">Privacy</RouteLink>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
