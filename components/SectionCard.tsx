
import React from 'react';

interface SectionCardProps {
  title: string;
  id: string;
  children: React.ReactNode;
  // FIX: Add setSectionRef to props to allow parent component to get a reference to the section element.
  setSectionRef: (el: HTMLElement | null) => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, id, children, setSectionRef }) => {
  return (
    // FIX: Apply the setSectionRef callback to the section element's ref attribute.
    <section ref={setSectionRef} id={id} className="mb-16 scroll-mt-20">
      <div className="bg-black/20 backdrop-blur-md border border-gray-800 rounded-xl shadow-lg shadow-black/20 overflow-hidden">
        <header className="p-6 bg-gray-800/40 border-b border-gray-700">
            <h3 className="text-3xl font-bold text-red-500 tracking-wide">{title}</h3>
        </header>
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </section>
  );
};
