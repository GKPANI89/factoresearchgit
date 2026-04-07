const APP_NAME = import.meta.env.VITE_APP_NAME || 'Facto Research';
const SUPPORT_PHONE = import.meta.env.VITE_SUPPORT_PHONE || '';
const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || '';
const REGISTERED_ADDRESS = import.meta.env.VITE_REGISTERED_ADDRESS || '';
const WHATSAPP_URL = import.meta.env.VITE_WHATSAPP_URL || '';
const INFO_EMAIL = import.meta.env.VITE_INFO_EMAIL || SUPPORT_EMAIL;
const GRIEVANCE_EMAIL = import.meta.env.VITE_GRIEVANCE_EMAIL || SUPPORT_EMAIL;
const WEBSITE_URL = import.meta.env.VITE_SITE_URL || '';

export const sebiRiskDisclosure =
    'SEBI Investment Risk Disclosure: Investment in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. Please read the Risk Disclosure Document prescribed by SEBI & exchange before investing.';

export const legalLinks = [
    { label: 'Disclaimer', path: '/legal/disclaimer' },
    { label: 'MITC', path: '/legal/mitc' },
    { label: 'Privacy Policy', path: '/legal/privacy-policy' },
    { label: 'Terms & Conditions', path: '/legal/terms-and-conditions' },
    { label: 'Refund Policy', path: '/legal/return-and-refund-policy' },
    { label: 'Grievance Redressal', path: '/legal/grievance-redressal' },
    { label: 'Investor Charter', path: '/legal/investor-charter' },
    { label: 'Complaint Board', path: '/legal/complaint-board' },
    { label: 'Compliance Audit Status', path: '/legal/compliance-audit-status' },
    { label: 'Accessibility Statement', path: '/accessibility' },
    { label: 'HTML Sitemap', path: '/sitemap' },
];

const registeredOfficeAddress = REGISTERED_ADDRESS;

export const legalDocuments = {
    disclaimer: {
        title: 'Disclaimer',
        subtitle: 'Please review this disclaimer carefully before using our services.',
        warning:
            'INVESTMENT IN SECURITIES MARKET ARE SUBJECT TO MARKET RISKS. READ ALL THE RELATED DOCUMENTS CAREFULLY BEFORE INVESTING.',
        sections: [
            {
                heading: 'General Disclaimer',
                paragraphs: [
                    `The information provided by ${APP_NAME} (Registration No: INH000024480) is for educational and informational purposes only.`,
                    'This website and its content are not intended to provide investment, financial, legal, tax, or any other professional advice.',
                    'All information, opinions, research, analysis, and recommendations are based on sources we believe to be reliable, but we make no representation or warranty as to their accuracy, completeness, or correctness.',
                ],
            },
            {
                heading: 'Market Risks',
                paragraphs: [
                    'All investments in securities are subject to market risks. The value of investments can go up or down, and past performance is not indicative of future results.',
                    'Investors may lose some or all of their invested capital. The volatility of stock prices can result in substantial losses over short periods of time.',
                ],
            },
            {
                heading: 'No Guarantee of Returns',
                paragraphs: [
                    `${APP_NAME} does not guarantee any returns on investments. All investment recommendations are subject to market conditions and individual risk tolerance.`,
                    'We strongly advise investors to:',
                ],
                bullets: [
                    'Conduct their own research and due diligence.',
                    'Consult with qualified financial advisors.',
                    'Consider their financial situation and risk tolerance.',
                    'Diversify their investment portfolio.',
                    'Invest only what they can afford to lose.',
                ],
            },
            {
                heading: 'Research Limitations',
                paragraphs: [
                    'Our research reports and recommendations are based on analysis of publicly available information.',
                    'We cannot guarantee the accuracy, completeness, or timeliness of such information.',
                    'Market conditions change rapidly, and recommendations may become outdated. Investors should verify all information independently before making investment decisions.',
                ],
            },
            {
                heading: 'Conflicts of Interest',
                paragraphs: [
                    `${APP_NAME} and its associates may have financial interests in the securities mentioned in our research reports.`,
                    'We may hold positions in recommended stocks and may trade in such securities. Any such positions or trading activities will be disclosed as per SEBI regulations.',
                ],
            },
            {
                heading: 'Liability Limitation',
                paragraphs: [
                    `${APP_NAME}, its directors, employees, and associates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our research reports or recommendations.`,
                    'This includes but is not limited to:',
                ],
                bullets: [
                    'Financial losses from investment decisions.',
                    'Missed investment opportunities.',
                    'Technical failures or service interruptions.',
                    'Errors in data or analysis.',
                    'Third-party actions or omissions.',
                ],
            },
            {
                heading: 'Regulatory Compliance',
                paragraphs: [
                    'This disclaimer is in compliance with SEBI (Research Analysts) Regulations, 2014.',
                    'All our research reports and recommendations comply with applicable laws and regulations.',
                    'We reserve the right to modify this disclaimer without prior notice.',
                ],
            },
            {
                heading: 'Client Responsibilities',
                paragraphs: ['Clients and users of our services are responsible for:'],
                bullets: [
                    'Understanding the risks associated with securities trading.',
                    'Making independent investment decisions.',
                    'Complying with applicable tax laws and regulations.',
                    'Maintaining the confidentiality of research reports.',
                    'Using our services only for legitimate investment purposes.',
                ],
            },
            {
                heading: 'Data Protection',
                paragraphs: [
                    'We collect and process personal data in accordance with applicable privacy laws.',
                    'Client information is kept confidential and is not shared with third parties without consent, except as required by law or regulatory authorities.',
                ],
            },
            {
                heading: 'Termination of Services',
                paragraphs: [
                    'We reserve the right to terminate or suspend our services at any time without prior notice.',
                    'This disclaimer shall survive the termination of our services.',
                ],
            },
            {
                heading: 'Governing Law',
                paragraphs: [
                    'This disclaimer and all matters arising from or relating to our services shall be governed by Indian law.',
                    'Any disputes shall be subject to the exclusive jurisdiction of courts in Anantapur, Andhra Pradesh.',
                ],
            },
        ],
        contact: {
            title: 'Contact Information',
            lines: [
                'For any queries regarding this disclaimer or our services, please contact:',
                `${APP_NAME} (SEBI Registration No: INH000024480)`,
                registeredOfficeAddress,
                `Email: support@factorsearch.com`,
                `Phone: +91 99599 37373`,
            ],
        },
    },
    privacyPolicy: {
        title: 'Privacy Policy',
        subtitle: 'How we collect, process, and protect your information.',
        sections: [
            {
                paragraphs: [
                    `${APP_NAME} (Registration No: INH000024480) is committed to protecting your privacy and ensuring the security of your personal information.`,
                    'This Privacy Policy explains how we collect, use, process, and protect your information when you use our website, services, or interact with us.',
                ],
            },
            {
                heading: '1. Information We Collect',
                subSections: [
                    {
                        heading: 'Personal Information',
                        bullets: [
                            'Identity Data: Name, PAN number, and KYC documents.',
                            'Contact Data: Email address, phone number, and postal address.',
                            'Financial Data: Bank account details and billing information.',
                            'Investment Profile: Trading experience, demographic information, and investment preferences.',
                            'Usage Data: Communication preferences and service interaction data.',
                        ],
                    },
                    {
                        heading: 'Technical Information',
                        bullets: [
                            'IP address, browser type, and device information.',
                            'Website usage data, page views, and login logs.',
                            'Cookies and similar tracking technologies.',
                        ],
                    },
                ],
            },
            {
                heading: '2. How We Use Your Information',
                paragraphs: ['We use your information for the following purposes:'],
                bullets: [
                    'Providing research reports and investment advisory services.',
                    'Processing service subscriptions and payments.',
                    'Communicating important updates and recommendations.',
                    'Compliance: Meeting SEBI regulations and other legal requirements.',
                    'Improving our services, user experience, and account security.',
                    'Marketing our services (only with your explicit consent).',
                ],
            },
            {
                heading: '3. Legal Basis for Processing',
                paragraphs: ['We process your personal information based on:'],
                bullets: [
                    'Contract: To provide services you have subscribed to.',
                    'Legal Obligation: To comply with SEBI and other regulatory mandates.',
                    'Legitimate Interest: To improve services and prevent fraudulent activity.',
                    'Consent: For marketing communications and optional service features.',
                ],
            },
            {
                heading: '4. Information Sharing and Disclosure',
                paragraphs: ['We do not sell, rent, or trade your personal information. We may share data with:'],
                bullets: [
                    'Regulatory Authorities: SEBI, tax authorities, and government agencies as required by law.',
                    'Service Providers: Payment processors, IT hosting, and communication platforms.',
                    'Professional Advisors: Lawyers and auditors bound by confidentiality.',
                    'Business Transfers: In the event of a merger, acquisition, or sale of assets.',
                ],
            },
            {
                heading: '5. Data Security & Retention',
                subSections: [
                    {
                        heading: 'Security',
                        paragraphs: [
                            'We implement SSL encryption, secure servers with strict access controls, multi-factor authentication, and regular security audits to safeguard your data.',
                        ],
                    },
                    {
                        heading: 'Retention',
                        bullets: [
                            'Client Data: For the duration of the relationship plus 7 years (as per SEBI requirements).',
                            'KYC Documents: As required by applicable Indian regulations.',
                            'Marketing/Analytics: Until you unsubscribe or for up to 2 years.',
                        ],
                    },
                ],
            },
            {
                heading: '6. Your Rights',
                paragraphs: [
                    'You have the right to Access, Correct, or Delete your personal information (subject to legal/regulatory retention requirements).',
                    'You may also object to processing, request data portability, or withdraw your consent at any time.',
                ],
            },
            {
                heading: "7. Third-Party Links & Children's Privacy",
                bullets: [
                    'Links: We are not responsible for the privacy practices of external sites linked on our platform.',
                    'Minors: Our services are not intended for individuals under 18 years of age. We do not knowingly collect data from children.',
                ],
            },
        ],
        contact: {
            title: '8. Contact Information',
            lines: [
                `For questions about this privacy policy or to exercise your rights, please contact ${APP_NAME} at:`,
                `${APP_NAME} (SEBI Registration No: INH000024480)`,
                registeredOfficeAddress,
                `Email: support@factoresearch.com`,
                `Phone: +91 99599 37373`,
            ],
        },
    },
    termsAndConditions: {
        title: 'Terms & Conditions',
        subtitle: `Terms governing your access and use of ${APP_NAME} services.`,
        sections: [
            {
                heading: '1. Acceptance of Terms',
                paragraphs: [
                    `By accessing and using the services provided by ${APP_NAME} (SEBI Registration No: INH000024480), you agree to be bound by these Terms and Conditions.`,
                    'If you do not agree to these terms, please do not use our services.',
                ],
            },
            {
                heading: `2. About ${APP_NAME}`,
                paragraphs: [
                    `${APP_NAME} is a SEBI registered research analyst providing investment advisory services, research reports, and market analysis.`,
                    'Our services are regulated by the Securities and Exchange Board of India (SEBI) under the SEBI (Research Analysts) Regulations, 2014.',
                ],
            },
            {
                heading: '3. Services Offered',
                bullets: [
                    'Equity cash research and recommendations.',
                    'Futures & Options advisory services.',
                    'Commodity trading recommendations.',
                    'Portfolio management guidance.',
                    'Market analysis and research reports.',
                    'Educational content and webinars.',
                ],
            },
            {
                heading: '4. Eligibility and Registration',
                paragraphs: ['To use our services, you must:'],
                bullets: [
                    'Be at least 18 years of age.',
                    'Have the legal capacity to enter into binding agreements.',
                    'Provide accurate and complete registration information and complete the KYC process.',
                    'Have a valid demat and trading account with a registered broker.',
                    'Possess basic knowledge of securities markets.',
                ],
            },
            {
                heading: '5. Subscription and Payment Terms',
                subSections: [
                    {
                        heading: 'Service Plans',
                        paragraphs: ['We offer various subscription plans (Quarterly, Half-yearly, Annual, and Institutional).'],
                    },
                    {
                        heading: 'Payment Terms',
                        bullets: [
                            'All fees are payable in advance through authorized channels.',
                            'Subscription fees are non-refundable except as specified in our refund policy.',
                            'GST (as applicable) will be charged extra.',
                            "We reserve the right to modify pricing with 30 days' notice.",
                        ],
                    },
                ],
            },
            {
                heading: '6. Investment Risks and Disclaimers',
                paragraphs: [
                    'Important Risk Warning: All investments in securities are subject to market risks. Past performance is not indicative of future results. You may lose some or all of your invested capital.',
                    'By using our services, you acknowledge that:',
                ],
                bullets: [
                    'Recommendations are based on research, not guarantees.',
                    'Market conditions can change rapidly, affecting recommendation validity.',
                    'You are solely responsible for your investment decisions.',
                    'We do not guarantee any returns or profits.',
                ],
            },
            {
                heading: '7. Intellectual Property Rights',
                paragraphs: [
                    `All content provided by ${APP_NAME}, including research reports, analysis, and proprietary methodologies, are protected by intellectual property rights.`,
                    'You may not reproduce, distribute, or use our content for commercial purposes without written permission.',
                ],
            },
            {
                heading: '8. Limitation of Liability',
                paragraphs: [
                    `To the maximum extent permitted by law, ${APP_NAME} and its directors, employees, and associates shall not be liable for:`,
                ],
                bullets: [
                    'Financial losses arising from investment decisions.',
                    'Errors or omissions in research reports.',
                    'Technical failures or service interruptions.',
                ],
            },
            {
                heading: '9. Termination',
                bullets: [
                    'By User: You may terminate your subscription at any time; it will remain effective until the end of the current billing period.',
                    `By ${APP_NAME}: We may terminate your access for violations of these terms, fraudulent activities, or non-payment.`,
                ],
            },
            {
                heading: '10. Dispute Resolution & Governing Law',
                paragraphs: ['Any disputes arising from these terms shall be resolved through:'],
                bullets: [
                    'Good faith negotiations.',
                    'Mediation if negotiations fail.',
                    'Arbitration in Anantapur, Andhra Pradesh, under Indian Arbitration laws.',
                    'Courts in Anantapur, Andhra Pradesh as the exclusive jurisdiction.',
                ],
            },
            {
                heading: 'Governing Law',
                paragraphs: [
                    'These terms are governed by the laws of India. Courts in Anantapur, Andhra Pradesh shall have exclusive jurisdiction.',
                ],
            },
            {
                heading: 'Severability',
                paragraphs: [
                    'If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable to the fullest extent permitted by law.',
                ],
            },
        ],
        contact: {
            title: '11. Contact Information',
            lines: [
                'For questions about these terms and conditions, please contact us:',
                `${APP_NAME} (SEBI Registration No: INH000024480)`,
                registeredOfficeAddress,
                `Email: support@factoresearch.com`,
                `Phone: +91 99599 37373`,
            ],
        },
    },
    mitc: {
        title: 'Most Important Terms and Conditions (MITC)',
        subtitle: 'Annexure A',
        sections: [
            {
                paragraphs: [
                    'Most Important Terms and Conditions (MITC) [Forming part of the Terms and Conditions for providing research services]',
                    'These terms and conditions, and consent thereon are for the research services provided by the Research Analyst (RA) and RA cannot execute/carry out any trade (purchase/sell transaction) on behalf of, the client. Thus, the clients are advised not to permit RA to execute any trade on their behalf.',
                    'The fee charged by RA to the client will be subject to the maximum of amount prescribed by SEBI/ Research Analyst Administration and Supervisory Body (RAASB) from time to time (applicable only for Individual and HUF Clients).',
                ],
                bullets: [
                    '2.1. The current fee limit is Rs 1,51,000/- per annum per family of client for all research services of the RA.',
                    '2.2. The fee limit does not include statutory charges.',
                    '2.3. The fee limits do not apply to a non-individual client/accredited investor.',
                ],
            },
            {
                paragraphs: [
                    'RA may charge fees in advance if agreed by the client. Such advance shall not exceed the period stipulated by SEBI; presently it is one quarter. In case of pre-mature termination of the RA services by either the client or the RA, the client shall be entitled to seek refund of proportionate fees only for unexpired period.',
                    'Fees to RA may be paid by the client through any of the specified modes like cheque, online bank transfer, UPI, etc. Cash payment is not allowed. Optionally the client can make payments through Centralized Fee Collection Mechanism (CeFCoM) managed by BSE Limited (i.e. currently recognized RAASB).',
                    'The RA is required to abide by the applicable regulations/circulars/ directions specified by SEBI and RAASB from time to time in relation to disclosure and mitigation of any actual or potential conflict of interest. The RA will endeavor to promptly inform the client of any conflict of interest that may affect the services being rendered to the client.',
                    'Any assured/guaranteed/fixed returns schemes or any other schemes of similar nature are prohibited by law. No scheme of this nature shall be offered to the client by the RA.',
                    'The RA cannot guarantee returns, profits, accuracy, or risk-free investments from the use of the RA’s research services. All opinions, projections, estimates of the RA are based on the analysis of available data under certain assumptions as of the date of preparation/publication of research report.',
                    'Any investment made based on recommendations in research reports are subject to market risks, and recommendations do not provide any assurance of returns. There is no recourse to claim any losses incurred on the investments made based on the recommendations in the research report. Any reliance placed on the research report provided by the RA shall be as per the client’s own judgement and assessment of the conclusions contained in the research report.',
                    'The SEBI registration, Enlistment with RAASB, and NISM certification do not guarantee the performance of the RA or assure any returns to the client.',
                ],
            },
            {
                heading: 'Grievances',
                numbered: [
                    'Step 1: the client should first contact the RA using the details on its website or following contact details: (RA to provide details as per "Grievance Redressal / Escalation Matrix").',
                    "Step 2: If the resolution is unsatisfactory, the client can also lodge grievances through SEBI'S SCORES platform at www.scores.sebi.gov.in.",
                    'Step 3: The client may also consider the Online Dispute Resolution (ODR) through the Smart ODR portal at https://smartodr.in.',
                ],
            },
            {
                paragraphs: [
                    'Clients are required to keep contact details, including email id and mobile number/s updated with the RA at all times.',
                    'The RA shall never ask for the client’s login credentials and OTPs for the client’s Trading Account Demat Account and Bank Account. Never share such information with anyone including RA.',
                ],
            },
        ],
    },
    mitcFormatted: {
        title: 'Most Important Terms and Conditions (MITC)',
        subtitle: 'Annexure A',
        sections: [
            {
                paragraphs: ['Most Important Terms and Conditions (MITC) [Forming part of the Terms and Conditions for providing research services]'],
            },
            {
                heading: '1.',
                paragraphs: [
                    'These terms and conditions, and consent thereon are for the research services provided by the Research Analyst (RA) and RA cannot execute/carry out any trade (purchase/sell transaction) on behalf of, the client. Thus, the clients are advised not to permit RA to execute any trade on their behalf.',
                ],
            },
            {
                heading: '2.',
                paragraphs: [
                    'The fee charged by RA to the client will be subject to the maximum of amount prescribed by SEBI/ Research Analyst Administration and Supervisory Body (RAASB) from time to time (applicable only for Individual and HUF Clients). Note:',
                ],
                bullets: [
                    '2.1. The current fee limit is Rs 1,51,000/- per annum per family of client for all research services of the RA.',
                    '2.2. The fee limit does not include statutory charges.',
                    '2.3. The fee limits do not apply to a non-individual client/accredited investor.',
                ],
            },
            {
                heading: '3.',
                paragraphs: [
                    'RA may charge fees in advance if agreed by the client. Such advance shall not exceed the period stipulated by SEBI; presently it is one quarter. In case of pre-mature termination of the RA services by either the client or the RA, the client shall be entitled to seek refund of proportionate fees only for unexpired period.',
                ],
            },
            {
                heading: '4.',
                paragraphs: [
                    'Fees to RA may be paid by the client through any of the specified modes like cheque, online bank transfer, UPI, etc. Cash payment is not allowed. Optionally the client can make payments through Centralized Fee Collection Mechanism (CeFCoM) managed by BSE Limited (i.e. currently recognized RAASB).',
                ],
            },
            {
                heading: '5.',
                paragraphs: [
                    'The RA is required to abide by the applicable regulations/circulars/ directions specified by SEBI and RAASB from time to time in relation to disclosure and mitigation of any actual or potential conflict of interest. The RA will endeavor to promptly inform the client of any conflict of interest that may affect the services being rendered to the client.',
                ],
            },
            {
                heading: '6.',
                paragraphs: [
                    'Any assured/guaranteed/fixed returns schemes or any other schemes of similar nature are prohibited by law. No scheme of this nature shall be offered to the client by the RA.',
                ],
            },
            {
                heading: '7.',
                paragraphs: [
                    "The RA cannot guarantee returns, profits, accuracy, or risk-free investments from the use of the RA's research services. All opinions, projections, estimates of the RA are based on the analysis of available data under certain assumptions as of the date of preparation/publication of research report.",
                ],
            },
            {
                heading: '8.',
                paragraphs: [
                    "Any investment made based on recommendations in research reports are subject to market risks, and recommendations do not provide any assurance of returns. There is no recourse to claim any losses incurred on the investments made based on the recommendations in the research report. Any reliance placed on the research report provided by the RA shall be as per the client's own judgement and assessment of the conclusions contained in the research report.",
                ],
            },
            {
                heading: '9.',
                paragraphs: [
                    'The SEBI registration, Enlistment with RAASB, and NISM certification do not guarantee the performance of the RA or assure any returns to the client.',
                ],
            },
            {
                heading: '10.',
                paragraphs: ['For any grievances:'],
                numbered: [
                    'Step 1: the client should first contact the RA using the details on its website or following contact details: (RA to provide details as per "Grievance Redressal / Escalation Matrix").',
                    "Step 2: If the resolution is unsatisfactory, the client can also lodge grievances through SEBI'S SCORES platform at www.scores.sebi.gov.in.",
                    'Step 3: The client may also consider the Online Dispute Resolution (ODR) through the Smart ODR portal at https://smartodr.in.',
                ],
            },
            {
                heading: '11.',
                paragraphs: [
                    'Clients are required to keep contact details, including email id and mobile number/s updated with the RA at all times.',
                ],
            },
            {
                heading: '12.',
                paragraphs: [
                    "The RA shall never ask for the client's login credentials and OTPs for the client's Trading Account Demat Account and Bank Account. Never share such information with anyone including RA.",
                ],
            },
        ],
    },
    returnAndRefundPolicy: {
        title: 'Refund Policy',
        subtitle: '',
        sections: [
            {
                paragraphs: [
                    `${APP_NAME} doesn't entertain any type of money back policy, refund or cancellation policy.`,
                    "As its customer's sole responsibility to access his risk by risk profiling, and go through our terms & conditions & all information associated about services and pricing before making payments.",
                    'Do not allow children or other unauthorized family members or friends to access your credit cards or your account at the payment site to ensure that no one pays for a Membership without your permission. By making a payment for Membership to our site, you acknowledge that you have read and agree to the above No Refund and no cancellation Policy.',
                ],
                bullets: [
                    'Read all information about our products, services and support given to our clients.',
                    'Complete risk profile and kyc.',
                    'Read all About Us',
                    'Read our Terms of Use.',
                    'Read our Privacy Policy.',
                ],
            },
        ],
    },
    grievanceRedressal: {
        title: 'Grievance Redressal',
        subtitle: 'Complaint handling and resolution process for clients.',
        sections: [
            {
                heading: 'Quick Grievance Contact',
                bullets: [
                    `Email: support@factoresearch.com`,
                    `Phone: +91 99599 37373`,
                    'Response Time: Within 72 hours',
                ],
            },
            {
                heading: 'Our Commitment',
                paragraphs: [
                    `${APP_NAME} (SEBI Registration No: INH000024480) is committed to providing excellent service and maintaining high standards of client satisfaction.`,
                    'We have established a comprehensive grievance redressal mechanism to address and resolve concerns in a timely and fair manner.',
                ],
            },
            {
                heading: 'Types of Grievances',
                subSections: [
                    {
                        heading: 'Service Related',
                        bullets: [
                            'Delayed or missed recommendations.',
                            'Quality of research reports.',
                            'Technical issues with platform.',
                            'Customer service concerns.',
                        ],
                    },
                    {
                        heading: 'Billing & Payment',
                        bullets: [
                            'Billing discrepancies.',
                            'Unauthorized charges.',
                            'Refund requests.',
                            'Subscription issues.',
                        ],
                    },
                    {
                        heading: 'Compliance Issues',
                        bullets: [
                            'Regulatory violations.',
                            'Mis-selling of services.',
                            'Unauthorized transactions.',
                            'Data privacy concerns.',
                        ],
                    },
                    {
                        heading: 'General Concerns',
                        bullets: [
                            'Communication issues.',
                            'Policy clarifications.',
                            'Account access problems.',
                            'Other service concerns.',
                        ],
                    },
                ],
            },
            {
                heading: 'How to File a Grievance',
                subSections: [
                    {
                        heading: 'Step 1: Initial Contact',
                        bullets: [
                            `Phone: +91 99599 37373 (9:15 AM - 3:30 PM IST, Monday-Friday).`,
                            `Email: support@factoresearch.com.`,
                            `WhatsApp: +91 99599 37373.`,
                            'Live Chat: Available on our website during business hours.',
                        ],
                    },
                    {
                        heading: 'Step 2: Formal Grievance Submission',
                        paragraphs: ['Required Information:'],
                        bullets: [
                            'Full name and contact details.',
                            'Client ID or subscription number.',
                            'Date and time of incident.',
                            'Detailed description of issue.',
                            'Supporting documents (if any).',
                            'Expected resolution.',
                            'Previous communication reference numbers.',
                        ],
                    },
                    {
                        heading: 'Submission Methods',
                        bullets: [
                            `Email:  support@factoresearch.com.`,
                            'Written Application: Mail to our registered office address.',
                            'Online Form: Available on our website.',
                            `Phone: +91 99599 37373 (followed by written confirmation).`,
                        ],
                    },
                ],
            },
            {
                heading: 'Resolution Process Timeline',
                numbered: [
                    'Acknowledgment: Within 24 hours of receipt.',
                    'Investigation: 3-5 business days for review and analysis.',
                    'Resolution: Within 7-10 business days of acknowledgment.',
                    'Follow-up: Satisfaction confirmation within 3 days.',
                ],
            },
            {
                heading: 'Escalation Matrix',
                bullets: [
                    `Level 1 - Customer Support Team: support@factoresearch.com (0-2 days).`,
                    `Level 2 - Grievance Office: support@factoresearch.com (3-7 days).`,
                    `Level 3 - Senior Management: info@factoresearch.com (8-15 days).`,
                    'Level 4 - SEBI Complaints: scores.sebi.gov.in (external escalation).',
                ],
            },
            {
                heading: 'Grievance Officer Details',
                bullets: [
                    'Name: Godina Kodandpani.',
                    'Designation: Chief Research Analyst & Compliance Officer.',
                    `Email: info@factoresearch.com.`,
                    `Phone: +91 99599 37373.`,
                    'Available: Monday-Friday, 9:15 AM - 3:30 PM IST.',
                ],
            },
            {
                heading: 'External Grievance Channels',
                subSections: [
                    {
                        heading: 'SEBI Complaints Redress System (SCORES)',
                        bullets: [
                            'Website: scores.sebi.gov.in.',
                            'Email: sebi@sebi.gov.in.',
                            'Phone: 1800-22-7575 (Toll Free).',
                        ],
                    },
                    {
                        heading: 'Investor Grievance Portal',
                        bullets: [
                            'Website: igrs.sebi.gov.in.',
                            'Arbitration: Available for eligible disputes.',
                            'Mediation: Alternative dispute resolution.',
                        ],
                    },
                ],
            },
            {
                heading: 'Our Commitment to Resolution',
                bullets: [
                    'Fair and impartial investigation of all grievances.',
                    'Timely resolution within specified timeframes.',
                    'Clear communication throughout the process.',
                    'Implementing corrective measures to prevent recurrence.',
                    'Maintaining confidentiality of grievance information.',
                    'Continuous improvement based on client feedback.',
                ],
            },
            {
                heading: 'Record Keeping',
                bullets: [
                    'All grievances are logged with unique reference numbers.',
                    'Monthly reports are submitted to SEBI as required.',
                    'Trends and patterns are analyzed for service improvement.',
                    'Records are maintained for the prescribed regulatory period.',
                ],
            },
            {
                heading: 'Emergency Grievances',
                paragraphs: [
                    `For urgent matters requiring immediate attention (unauthorized transactions, security breaches), contact us immediately at +91 99599 37373 or support@factoresearch.com with "URGENT" in the subject line.`,
                ],
            },
        ],
        contact: {
            title: 'Registered Office Address',
            lines: [
                `${APP_NAME} (SEBI Registration No: INH000024480)`,
                registeredOfficeAddress,
                `Email:  support@factoresearch.com`,
                `Phone: +91 99599 37373`,
            ],
        },
    },
    investorCharter: {
        title: 'Investor Charter',
        subtitle: 'Rights, responsibilities, and service standards for investors.',
        sections: [
            {
                heading: 'Preamble',
                paragraphs: [
                    `This Investor Charter sets out the rights and responsibilities of investors/clients and ${APP_NAME} as a SEBI registered research analyst.`,
                    'This charter aims to ensure transparency, fairness, and professionalism in all our interactions with investors.',
                ],
            },
            {
                heading: 'Our Vision',
                paragraphs: [
                    'To be a trusted partner in your investment journey, providing research-backed insights that help you make informed financial decisions while maintaining the highest standards of integrity and compliance.',
                ],
            },
            {
                heading: 'Our Mission',
                paragraphs: [
                    'To democratize access to professional stock market research and provide retail investors with institutional-quality investment insights that enable informed decision-making and financial success.',
                ],
            },
            {
                heading: 'Your Rights as an Investor',
                bullets: [
                    'Right to Fair Treatment.',
                    'Right to Transparency.',
                    'Right to Suitability.',
                    'Right to Privacy.',
                    'Right to Grievance Redressal.',
                    'Right to Exit.',
                ],
            },
            {
                heading: 'Your Responsibilities as an Investor',
                bullets: [
                    'Provide Accurate Information.',
                    'Understand the Risks.',
                    'Make Informed Decisions.',
                    'Monitor Your Investments.',
                    'Comply with Regulations.',
                    'Report Changes.',
                ],
            },
            {
                heading: 'Our Service Standards',
                bullets: [
                    'Research Quality: Evidence-based, unbiased analysis.',
                    'Timeliness: Prompt delivery of recommendations.',
                    'Accessibility: Clear, understandable communication.',
                    'Support: Responsive customer service.',
                    'Compliance: Adherence to all regulatory requirements.',
                    'Integrity: Honest and ethical business practices.',
                ],
            },
            {
                heading: 'Professional Standards',
                bullets: [
                    'Maintain professional competence through continuous education and training.',
                    'Provide research and recommendations based on thorough analysis.',
                    'Disclose all material conflicts of interest.',
                    'Maintain confidentiality of client information.',
                    'Comply with all SEBI regulations and guidelines.',
                    'Update recommendations based on changing market conditions.',
                ],
            },
            {
                heading: 'Our Services Details',
                subSections: [
                    {
                        heading: 'What We Provide',
                        bullets: [
                            'Equity research and recommendations.',
                            'Market analysis and insights.',
                            'Sector and stock reports.',
                            'Model portfolios.',
                            'Technical and fundamental analysis.',
                        ],
                    },
                    {
                        heading: 'What We Do NOT Provide',
                        bullets: [
                            'Portfolio management services (we do not handle client funds).',
                            'Guaranteed returns or assured profits.',
                            'Execution of trades on your behalf.',
                            'Tax advice or legal counsel.',
                            'Insurance or other financial products.',
                            'Margin funding or lending services.',
                        ],
                    },
                ],
            },
            {
                heading: 'Fee Structure & Transparency',
                bullets: [
                    'All fees are clearly disclosed before service commencement.',
                    'No hidden charges or surprise fees.',
                    'GST is applicable as per government regulations.',
                    'Fee structure is available on our website and service agreements.',
                    'We do not receive any commission from third parties for recommendations.',
                ],
            },
            {
                heading: 'Risk Disclosure',
                bullets: [
                    'All investments in securities markets are subject to market risks.',
                    'Past performance is not indicative of future results.',
                    'Investment values can go up or down.',
                    'You may lose some or all of your invested capital.',
                    'High volatility can result in substantial losses over short periods.',
                    'Derivative instruments carry additional risks.',
                ],
            },
            {
                heading: 'Grievance Redressal',
                subSections: [
                    {
                        heading: 'Internal Redressal',
                        bullets: [
                            'Grievance Officer: Godina Kodandpani.',
                            `Email: support@factoresearch.com.`,
                            `Phone: +91 99599 37373.`,
                            'Resolution Time: 30 business days.',
                        ],
                    },
                    {
                        heading: 'External Escalation',
                        bullets: [
                            'SEBI SCORES: scores.sebi.gov.in.',
                            'Investor Helpline: 1800-22-7575.',
                            'Email: sebi@sebi.gov.in.',
                            'Arbitration: Available for eligible disputes.',
                        ],
                    },
                ],
            },
            {
                heading: 'Regulatory Framework',
                bullets: [
                    'SEBI (Research Analysts) Regulations, 2014.',
                    'SEBI (Prohibition of Insider Trading) Regulations, 2015.',
                    'SEBI (Prohibition of Fraudulent and Unfair Trade Practices) Regulations, 2003.',
                    'Companies Act, 2013 and related rules.',
                    'Income Tax Act, 1961 (for tax implications).',
                ],
            },
            {
                heading: 'Charter Acknowledgment',
                paragraphs: [
                    'By availing our services, you acknowledge that you have read, understood, and accept this Investor Charter.',
                    'This charter is effective from January 1, 2024, and may be updated periodically to reflect regulatory changes or service improvements.',
                ],
            },
        ],
        contact: {
            title: 'Contact Information',
            lines: [
                `${APP_NAME} (SEBI Registration No: INH000024480)`,
                'Registered Office Address:',
                registeredOfficeAddress,
                `Email: support@factoresearch.com`,
                `Phone: +91 99599 37373`,
                `Website: factoresearch.com`,
                'Working Hours: Monday-Friday, 9:15 AM - 3:30 PM IST',
            ],
        },
    },
};

export const complaintBoardData = {
    title: 'Complaint Board',
    monthEnding: 'March 2026',
    sourceTable: {
        headers: [
            'S.No.',
            'Received from',
            'Pending at the end of last month',
            'Received',
            'Resolved',
            'Total Pending',
            'Pending complaints > 3 months',
            'Average Resolution time',
        ],
        rows: [
            ['1', 'Directly from Investors', '0', '0', '0', '0', '0', '0'],
            ['2', 'SEBI (SCORES)', '0', '0', '0', '0', '0', '0'],
            ['3', 'Other Sources (if any)', '0', '0', '0', '0', '0', '0'],
            ['', 'Total', '0', '0', '0', '0', '0', '0'],
        ],
    },
    monthlyTrendTable: {
        headers: ['S.No', 'Month', 'Carried forward from previous month', 'Received', 'Resolved', 'Pending'],
        rows: [
            ['1', 'March - 2026', '0', '0', '0', '0'],
            ['', 'Total', '0', '0', '0', '0'],
        ],
    },
    annualTrendTable: {
        headers: ['S.No', 'Year', 'Carried Forwarded from previous Year', 'Received', 'Resolved', 'Pending'],
        rows: [['1', '2025-2026', '0', '0', '0', '0']],
    },
};

export const complianceAuditStatus = {
    title: 'Compliance Audit Status',
    subtitle: 'Current compliance audit publication status.',
    status: 'Latest status updated for January 2026.',
    points: [
        'Compliance audit status records are maintained in accordance with applicable SEBI regulations.',
        'Detailed audit status documents are published through official disclosures.',
        'For verification requests, contact our compliance desk.',
    ],
};
