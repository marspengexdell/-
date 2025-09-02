
import React from 'react';

interface AugmentCardProps {
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export const AugmentCard: React.FC<AugmentCardProps> = ({ title, description, isSelected, onClick, className = '' }) => {
  const baseClasses = 'bg-gray-900/60 p-4 rounded-md border transition-all duration-300 ease-in-out cursor-pointer';
  const selectedClasses = 'border-red-500 ring-2 ring-red-500/50 scale-105 shadow-lg shadow-red-900/40';
  const unselectedClasses = 'border-gray-600 hover:border-red-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/40';

  return (
    <div
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses} ${className}`}
      onClick={onClick}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <div className="flex justify-between items-start gap-2">
        <h5 className="font-semibold text-red-300">{title}</h5>
        {isSelected && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
  );
};
