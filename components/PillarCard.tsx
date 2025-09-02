import React from 'react';

interface PillarCardProps {
  title: string;
  description: string;
  // FIX: Changed icon prop type to React.ComponentType to accept a component function.
  icon: React.ComponentType;
}

// FIX: Destructure icon prop to a capitalized variable `Icon` so it can be rendered as a component.
export const PillarCard: React.FC<PillarCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/80 hover:bg-gray-800/80 hover:border-red-800 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="text-red-500 mt-1">
          {/* FIX: Render the icon component. */}
          <Icon />
        </div>
        <div>
            <h4 className="text-xl font-bold text-red-400 mb-2">{title}</h4>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};