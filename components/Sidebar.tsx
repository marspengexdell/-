
import React from 'react';
import type { Section } from '../types';
import { KeyboardIcon } from './IconComponents';

interface SidebarProps {
  sections: Section[];
  activeSection: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, activeSection }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="hidden lg:block fixed top-0 left-0 h-screen w-64 bg-gray-900/70 backdrop-blur-sm border-r border-gray-800 p-8">
      <div className="flex items-center gap-3 mb-10">
        <KeyboardIcon />
        <h2 className="text-2xl font-bold text-gray-200">GDD Sections</h2>
      </div>
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.id} className="mb-3">
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left text-lg px-4 py-2 rounded-md transition-all duration-200 ease-in-out transform hover:bg-red-800/40 hover:text-red-300 hover:translate-x-2 ${
                  activeSection === section.id
                    ? 'bg-red-900/50 text-red-400 font-semibold border-l-4 border-red-500'
                    : 'text-gray-400'
                }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
