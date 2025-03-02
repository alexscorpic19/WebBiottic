import { Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SolutionCard } from '../components/SolutionCard';
import { SOLUTIONS } from '../constants/solutions';
import { Helmet } from 'react-helmet-async';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  Award, 
  Users, 
  Leaf, 
  Target, 
  TrendingUp, 
  Shield,
  Clock,
  LucideIcon
} from 'lucide-react';
import { APP_CONFIG } from '../config';

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STATS: Stat[] = [
  {
    icon: Award,
    value: "+10 años",
    label: "De experiencia en el sector"
  },
  {
    icon: Users,
    value: "+500",
    label: "Clientes satisfechos"
  },
  {
    icon: Leaf,
    value: "+1000",
    label: "Hectáreas optimizadas"
  }
];

const BENEFITS: Benefit[] = [
  {
    icon: Target,
    title: "Precisión",
    description: "Control exacto de sus sistemas agrícolas"
  },
  {
    icon: TrendingUp,
    title: "Eficiencia",
    description: "Optimización de recursos y costos"
  },
  {
    icon: Shield,
    title: "Confiabilidad",
    description: "Sistemas robustos y seguros"
  },
  {
    icon: Clock,
    title: "24/7",
    description: "Monitoreo continuo de sus operaciones"
  }
];

// StatsSection y BenefitsSection se han eliminado ya que no se están usando

export function Home() {
  const seoData = useMemo(() => ({
    pageTitle: "Biottic - Soluciones Tecnológicas Agrícolas",
    pageDescription: "Soluciones tecnológicas innovadoras para el sector agropecuario. Sistemas de control, riego inteligente y monitoreo en tiempo real."
  }), []);

  return (
    <>
      <Helmet>
        <title>{seoData.pageTitle}</title>
        <meta name="description" content={seoData.pageDescription} />
        <meta property="og:title" content={seoData.pageTitle} />
        <meta property="og:description" content={seoData.pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={APP_CONFIG.NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preload" href="/placeholder.jpg" as="image" />
      </Helmet>

      <main className="overflow-x-hidden bg-white dark:bg-dark-900 transition-colors duration-200">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        
        {/* Stats Section */}
        <section className="py-20 bg-gray-50 dark:bg-dark-800 transition-colors duration-200">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
                    <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-200 dark:bg-dark-900 transition-colors duration-200">
          <div className="container px-4 mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
              ¿Por qué elegir Biottic?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {BENEFITS.map((benefit) => (
                <div 
                  key={benefit.title} 
                  className="p-6 rounded-xl bg-white dark:bg-dark-800 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
                    <benefit.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-20 bg-gray-100 dark:bg-dark-800 transition-colors duration-200">
          <div className="container px-4 mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
              Nuestras Soluciones
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* CTA Section */}
        <section className="relative py-20 bg-primary-600 dark:bg-primary-700 overflow-hidden transition-colors duration-200">
          <div 
            className="absolute inset-0 opacity-10 dark:opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8 text-white dark:text-white">
                ¿Listo para transformar tu agricultura?
              </h2>
              <p className="text-xl mb-8 text-white dark:text-white/90">
                Únete a cientos de agricultores que ya están optimizando sus cultivos con nuestra tecnología.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-block bg-white text-primary-600 hover:bg-primary-50 rounded-lg text-lg px-8 py-3 font-medium transition-colors duration-200"
                >
                  Contáctanos
                </Link>
                <Link
                  to="/products"
                  className="inline-block bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg text-lg px-8 py-3 font-medium transition-colors duration-200"
                >
                  Ver Productos
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
