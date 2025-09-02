import React from 'react';
import type { Weapon } from '../types';

export const WeaponCard: React.FC<Weapon> = ({ name, description, style, icon: Icon }) => {
    return (
        <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700 flex flex-col hover:border-red-800/70 transition-colors duration-200">
            <div className="flex items-center gap-3 mb-3">
                <div className="text-red-500">
                  <Icon />
                </div>
                <h5 className="text-lg font-bold text-red-400">{name}</h5>
            </div>
            <p className="text-gray-400 flex-grow">{description}</p>
            <p className="mt-3 text-xs text-gray-500 bg-gray-900/50 self-start px-2 py-1 rounded">Style: {style}</p>
        </div>
    );
};