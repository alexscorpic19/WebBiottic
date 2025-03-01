import React, { Suspense } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import ErrorBoundary from './ErrorBoundary';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-16">
        <ErrorBoundary>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          }>
            {children}
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}