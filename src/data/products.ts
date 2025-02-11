import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Sistema de Riego Solar Automatizado Pro',
    description: 'Sistema completo de riego automatizado con alimentación solar, ideal para optimizar el uso del agua en cultivos de mediana y gran escala.',
    price: 15000000,
    category: 'irrigation',
    image: '/src/assets/images/product1.png',
    features: [
      'Panel solar de 200W con batería de respaldo',
      'Control automático basado en humedad del suelo',
      'Programación por zonas y horarios',
      'Monitoreo remoto vía aplicación móvil',
      'Válvulas inteligentes con sensores integrados',
      'Ahorro de hasta 40% en consumo de agua'
    ]
  },
  {
    id: '2',
    name: 'Sistema de Monitoreo Biolabs-servicio',
    description: 'Plataforma integral de monitoreo en tiempo real para el seguimiento de variables críticas en su cultivo, con análisis predictivo y alertas automáticas.',
    price: 50000,
    category: 'monitoring',
    image: '/src/assets/images/product2.png',
    features: [
      'El precio es por un servicio mensual',
      'Dashboard personalizable en tiempo real',
      'Análisis predictivo de rendimiento',
      'Alertas tempranas de plagas y enfermedades',
      'Integración con estaciones meteorológicas',
      'Exportación de datos y reportes',
      'Soporte para múltiples usuarios'
    ]
  },
  {
    id: '3',
    name: 'Sensor Ambiental SmartFarm',
    description: 'Sensor de alta precisión para la medición de temperatura y humedad, con conectividad inalámbrica y largo alcance.',
    price: 160000,
    category: 'monitoring',
    image: '/src/assets/images/product3.jpg',
    features: [
      'Medición precisa de temperatura (-40°C a 80°C)',
      'Sensor de humedad relativa (0-100%)',
      'Batería de larga duración (hasta 2 años)',
      'Conectividad LoRaWAN',
      'Carcasa resistente IP67',
      'Calibración automática'
    ]
  }
];