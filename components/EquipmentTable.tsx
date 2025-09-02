
import React from 'react';
import type { EquipmentSlot } from '../types';

interface EquipmentTableProps {
  slots: EquipmentSlot[];
}

const getGroupColor = (group: string) => {
    switch(group) {
        case 'Core Armor': return 'bg-blue-900/30 text-blue-300';
        case 'Core Trinkets': return 'bg-purple-900/30 text-purple-300';
        case 'Rings': return 'bg-green-900/30 text-green-300';
        default: return 'bg-gray-700 text-gray-300';
    }
}

export const EquipmentTable: React.FC<EquipmentTableProps> = ({ slots }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800/60">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Group</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Slot Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Primary Role</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Example Affixes</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Visual</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900/50 divide-y divide-gray-800">
          {slots.map((slot, index) => (
            <tr key={index} className="hover:bg-gray-800/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getGroupColor(slot.group)}`}>{slot.group}</span></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{slot.name}</td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-400">{slot.role}</td>
              <td className="px-6 py-4 whitespace-normal text-sm text-gray-400">{slot.affixes}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                {slot.visual ? <span className="text-green-400">Yes</span> : <span className="text-red-400">No</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
