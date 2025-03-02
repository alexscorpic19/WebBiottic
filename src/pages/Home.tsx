import { Suspense, memo, useMemo } from 'react';
import { Hero } from '../components/Hero';
import { SolutionCard } from '../components/SolutionCard';
import { SOLUTIONS } from '../constants/solutions';
import { Helmet } from 'react-helmet-async';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  ArrowRight, 
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

const StatCard = memo(({ stat }: { stat: Stat }) => (
  <div 
    className="text-center transform hover:scale-105 transition-transform duration-300"
    role="listitem"
  >
    <div className="flex justify-center mb-4">
      <stat.icon className="w-12 h-12 text-green-600" aria-hidden="true" />
    </div>
    <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
    <p className="text-gray-600">{stat.label}</p>
  </div>
));

const BenefitCard = memo(({ benefit }: { benefit: Benefit }) => (
  <div 
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    role="listitem"
  >
    <div className="flex justify-center mb-4">
      <benefit.icon className="w-10 h-10 text-green-600" aria-hidden="true" />
    </div>
    <h3 className="text-xl font-semibold text-center mb-2">
      {benefit.title}
    </h3>
    <p className="text-gray-600 text-center">
      {benefit.description}
    </p>
  </div>
));

// Memoizar los componentes de sección para evitar re-renders innecesarios
const StatsSection = memo(() => (
  <section className="py-16 bg-white" aria-labelledby="stats-heading">
    <div className="max-w-7xl mx-auto px-4">
      <h2 id="stats-heading" className="sr-only">Nuestras estadísticas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
        {STATS.map((stat) => (
          <StatCard key={stat.value} stat={stat} />
        ))}
      </div>
    </div>
  </section>
));

const BenefitsSection = memo(() => (
  <section className="py-20 bg-gray-100" aria-labelledby="benefits-heading">
    <div className="max-w-7xl mx-auto px-4">
      <h2 id="benefits-heading" className="text-4xl font-bold text-center mb-16 text-gray-900">
        ¿Por qué elegir Biottic?
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
        {BENEFITS.map((benefit) => (
          <BenefitCard key={benefit.title} benefit={benefit} />
        ))}
      </div>
    </div>
  </section>
));

export function Home() {
  // Usar useMemo para datos estáticos
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

      <main className="overflow-x-hidden">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        
        <StatsSection />
        <BenefitsSection />
        
        {/* Solutions Section */}
        <section 
          className="py-20 px-4 bg-white" 
          aria-labelledby="solutions-heading"
        >
          <div className="max-w-7xl mx-auto">
            <h2 
              id="solutions-heading"
              className="text-4xl font-bold text-center mb-16 text-gray-900"
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

        {/* CTA Section */}
        <section 
          className="py-24 bg-green-600 relative overflow-hidden"
          aria-labelledby="cta-heading"
        >
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h2 
              id="cta-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              ¿Listo para optimizar su producción agrícola?
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Descubra cómo nuestras soluciones tecnológicas pueden transformar su operación agrícola
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contáctenos
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="/products"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Ver productos
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
