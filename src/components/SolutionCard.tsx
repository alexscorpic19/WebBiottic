import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Solution } from '../types/solutions';

export const SolutionCard = memo(({ solution, index }: { solution: Solution; index?: number }) => {
  const Icon = solution.icon;
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(solution.link);
    window.scrollTo(0, 0);
  };

  return (
    <div 
      className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      role="listitem"
      data-testid={index !== undefined ? `solution-card-${index}` : undefined}
    >
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-lg shadow-md bg-primary-50 dark:bg-primary-900/30">
          <Icon 
            className={`w-12 h-12 ${solution.iconColor} dark:${solution.iconColor}`}
            aria-hidden="true"
          />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-center mb-2 text-gray-900 dark:text-gray-100">
        {solution.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
        {solution.description}
      </p>
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-center space-x-2 text-primary-600 dark:text-primary-400 
                 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
      >
        <span>Saber más</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
});

SolutionCard.displayName = 'SolutionCard';
