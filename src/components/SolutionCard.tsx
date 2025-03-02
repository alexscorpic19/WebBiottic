import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Solution } from '../types/solutions';

export const SolutionCard = memo(({ solution, index }: { solution: Solution; index?: number }) => {
  const Icon = solution.icon;
  const navigate = useNavigate();
  const bgColorClass = solution.iconColor.replace('text-', 'bg-').replace('-600', '-50').replace('-500', '-50');
  
  const handleNavigation = () => {
    navigate('/products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      role="listitem"
      data-testid={index !== undefined ? `solution-card-${index}` : undefined}
    >
      <div className="flex justify-center mb-4">
        <div className={`p-3 rounded-lg shadow-md ${bgColorClass}`}>
          <Icon 
            className={`w-12 h-12 ${solution.iconColor}`} 
            aria-hidden="true" 
          />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">
        {solution.title}
      </h3>
      <p className="text-gray-600 text-center mb-4">
        {solution.description}
      </p>
      <button
        onClick={handleNavigation}
        className={`w-full flex items-center justify-center ${solution.iconColor} hover:opacity-80 transition-opacity gap-1 mt-2`}
        aria-label={`Ver más sobre ${solution.title}`}
      >
        Ver más <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
});

SolutionCard.displayName = 'SolutionCard';
