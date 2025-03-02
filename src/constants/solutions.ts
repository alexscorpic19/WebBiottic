import { LineChart, Cloud, Droplets } from 'lucide-react';
import type { Solution } from '../types/solutions';

export const SOLUTIONS: Solution[] = [
  {
    icon: LineChart,
    title: 'BioLabs Monitoreo en Tiempo Real',
    description: 'Seguimiento y análisis de datos para toma de decisiones informadas.',
    iconColor: 'text-purple-500',
    link: '/products'
  },
  {
    icon: Cloud,
    title: 'Sistemas de Control',
    description: 'Automatización inteligente para optimizar sus procesos agrícolas.',
    iconColor: 'text-green-600',
    link: '/products'
  },
  {
    icon: Droplets,
    title: 'Riego Inteligente',
    description: 'Sistemas de riego automatizados con control preciso del agua.',
    iconColor: 'text-blue-500',
    link: '/products'
  }
];
