import { Leaf, Droplet, LineChart } from 'lucide-react';
import type { Solution } from '../types/solutions';

export const SOLUTIONS: Solution[] = [
  {
    icon: Leaf,
    title: 'Sistemas de Control',
    description: 'Automatización inteligente para optimizar sus procesos agrícolas.'
  },
  {
    icon: Droplet,
    title: 'Riego Inteligente',
    description: 'Sistemas de riego automatizados con control preciso del agua.'
  },
  {
    icon: LineChart,
    title: 'Monitoreo en Tiempo Real',
    description: 'Seguimiento y análisis de datos para toma de decisiones informadas.'
  }
];