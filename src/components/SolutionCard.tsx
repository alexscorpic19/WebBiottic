import { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Solution } from '../types/solutions';

interface SolutionCardProps {
  solution: Solution;
  index: number;
}

function SolutionCardComponent({ solution, index }: SolutionCardProps) {
  const Icon = solution.icon;
  
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-lg"
      role="listitem"
      data-testid={`solution-card-${index}`}
    >
      <div 
        className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4"
        aria-hidden="true"
      >
        <Icon className="w-6 h-6 text-green-600" />
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
  );
}

export const SolutionCard = memo(SolutionCardComponent);