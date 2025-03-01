import { Suspense } from 'react';
import { Hero } from '../components/Hero';
import { SolutionCard } from '../components/SolutionCard';
import { SOLUTIONS } from '../constants/solutions';
import { Helmet } from 'react-helmet-async';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function Home() {
  const pageTitle = "Biottic - Soluciones Tecnológicas Agrícolas";
  const pageDescription = "Soluciones tecnológicas innovadoras para el sector agropecuario. Sistemas de control, riego inteligente y monitoreo en tiempo real.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={pageTitle} />
        <meta name="og:description" content={pageDescription} />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </Helmet>

      <main className="overflow-x-hidden">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        
        <section 
          className="py-20 px-4 bg-gray-50" 
          aria-labelledby="solutions-heading"
        >
          <div className="max-w-7xl mx-auto">
            <h2 
              id="solutions-heading"
              className="text-4xl font-bold text-center mb-12 text-gray-900"
            >
              Nuestras Soluciones
            </h2>
            
            <div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
              aria-label="Lista de soluciones"
            >
              {SOLUTIONS.map((solution, index) => (
                <SolutionCard 
                  key={solution.title}
                  solution={solution}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
