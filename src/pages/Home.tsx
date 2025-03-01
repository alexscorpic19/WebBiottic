import { Hero } from '../components/Hero';
import { ArrowRight } from 'lucide-react';
import { SOLUTIONS } from '../constants/solutions';
import { Helmet } from 'react-helmet-async';

export function Home() {
  return (
    <>
      <Helmet>
        <title>Biottic - Soluciones Tecnológicas Agrícolas</title>
        <meta 
          name="description" 
          content="Soluciones tecnológicas innovadoras para el sector agropecuario. Sistemas de control, riego inteligente y monitoreo en tiempo real." 
        />
      </Helmet>

      <div>
        <Hero />
        
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
              {SOLUTIONS.map((solution) => (
                <div 
                  key={solution.title} 
                  className="bg-white p-6 rounded-lg shadow-lg"
                  role="listitem"
                >
                  <div 
                    className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4"
                    aria-hidden="true"
                  >
                    <solution.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {solution.description}
                  </p>
                  <a 
                    href="/products" 
                    className="text-green-600 flex items-center hover:text-green-700 group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                    aria-label={`Ver más sobre ${solution.title}`}
                  >
                    <span>Ver más</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
