import React, { Suspense, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import ErrorBoundary from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';

const MemoizedFooter = memo(Footer);
const MemoizedNavbar = memo(Navbar);
const MemoizedWhatsAppButton = memo(WhatsAppButton);

export const Layout = memo(({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
      <MemoizedNavbar />
      <main className="flex-grow pt-16">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </main>
      <MemoizedFooter />
      <MemoizedWhatsAppButton />
    </div>
  );
});

Layout.displayName = 'Layout';
