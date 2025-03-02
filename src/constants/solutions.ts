import { Leaf, Droplet, LineChart } from 'lucide-react';
import type { Solution } from '../types/solutions';

export const SOLUTIONS: Solution[] = [
  {
    icon: Leaf,
    title: 'Sistemas de Control',
    description: 'Automatización inteligente para optimizar sus procesos agrícolas.',
    iconColor: 'text-green-600'
  },
  {
    icon: Droplet,
    title: 'Riego Inteligente',
    description: 'Sistemas de riego automatizados con control preciso del agua.',
    iconColor: 'text-blue-500'
  },
  {
    icon: LineChart,
    title: 'BioLabs Monitoreo en Tiempo Real',
    description: 'Seguimiento y análisis de datos para toma de decisiones informadas.',
    iconColor: 'text-purple-500'
  }
];
