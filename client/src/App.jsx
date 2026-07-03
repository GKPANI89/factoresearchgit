import React, { useCallback, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import MarketTicker from './components/MarketTicker';
import Footer from './components/Footer';
import SEBIModal from './components/SEBIModal';
import FestivalOverlay from './components/FestivalOverlay';
import FloatingChatWidget from './components/FloatingChatWidget';
import NotFoundPage from './pages/NotFoundPage';
import { routeComponents } from './routes';
import { RouterProvider } from './router';
import { useRouter } from './useRouter';
import { applyRouteSeo } from './utils/seo';
import './App.css';

const AppShell = () => {
    const { path } = useRouter();
    const isKnownRoute = Boolean(routeComponents[path]);
    const PageComponent = routeComponents[path] || NotFoundPage;
    const didHydrateRef = useRef(false);

    useEffect(() => {
        applyRouteSeo(path, { noindex: !isKnownRoute });
    }, [path, isKnownRoute]);

    const handleSkipToMain = useCallback((event) => {
        event.preventDefault();

        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        const pageHeading = mainContent.querySelector('h1');
        const focusTarget = pageHeading || mainContent;

        if (pageHeading && !pageHeading.hasAttribute('tabindex')) {
            pageHeading.setAttribute('tabindex', '-1');
        }

        focusTarget.focus({ preventScroll: true });

        const topOffset = parseFloat(
            window.getComputedStyle(document.documentElement).getPropertyValue('--top-offset')
        );
        const scrollTop =
            mainContent.getBoundingClientRect().top +
            window.scrollY -
            (Number.isFinite(topOffset) ? topOffset : 0);

        window.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: 'smooth',
        });
    }, []);

    useEffect(() => {
        if (!didHydrateRef.current) {
            didHydrateRef.current = true;
            return undefined;
        }

        const focusRaf = window.requestAnimationFrame(() => {
            const pageHeading = document.querySelector('#main-content h1');
            if (!pageHeading) return;
            pageHeading.setAttribute('tabindex', '-1');
            pageHeading.focus({ preventScroll: true });
        });

        return () => window.cancelAnimationFrame(focusRaf);
    }, [path]);

    return (
        <div className="app-wrapper">
            <a id="skip-to-main-content" href="#main-content" className="skip-link" onClick={handleSkipToMain}>
                Skip to main content
            </a>
            <div id="app-main-shell">
                <FestivalOverlay />
                <Navbar />
                <MarketTicker />
                <main id="main-content" className="main-content" tabIndex={-1}>
                    <PageComponent />
                </main>
                <FloatingChatWidget />
                <Footer />
            </div>
            <SEBIModal />
        </div>
    );
};

function App() {
    return (
        <RouterProvider>
            <AppShell />
        </RouterProvider>
    );
}

export default App;
