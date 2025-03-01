import { Suspense } from 'react';
import { Hero } from '../components/Hero';
import { SolutionCard } from '../components/SolutionCard';
import { SOLUTIONS } from '../constants/solutions';
import { Helmet } from 'react-helmet-async';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function Home() {
  return (
    <>
      <Helmet>
        <title>Biottic - Soluciones Tecnológicas Agrícolas</title>
        <meta 
          name="description" 
          content="Soluciones tecnológicas innovadoras para el sector agropecuario. Sistemas de control, riego inteligente y monitoreo en tiempo real." 
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </Helmet>

      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        
        <section 
          className="py-20 px-4" 
          aria-labelledby="solutions-heading"
        >
          <div className="max-w-7xl mx-auto">
            <h2 
              id="solutions-heading"
              className="text-4xl font-bold text-center mb-12"
            >
              Nuestras Soluciones
            </h2>
            
            <div 
              className="grid md:grid-cols-3 gap-8"
              role="list"
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
