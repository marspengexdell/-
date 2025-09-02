
import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { SectionCard } from './components/SectionCard';
import { PillarCard } from './components/PillarCard';
import { EquipmentTable } from './components/EquipmentTable';
import { WeaponCard } from './components/WeaponCard';
import { AugmentCard } from './components/AugmentCard';
import { GDD_SECTIONS, PILLARS, WEAPONS, EQUIPMENT_SLOTS, CONTROLS } from './constants';
import type { Section } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(GDD_SECTIONS[0].id);
  const [selectedCoreAugments, setSelectedCoreAugments] = useState<string[]>([]);
  const [selectedUtilityAugments, setSelectedUtilityAugments] = useState<string[]>([]);
  const [selectedRelicAugment, setSelectedRelicAugment] = useState<string | null>(null);
  const [hasSaveData, setHasSaveData] = useState<boolean>(false);
  const [showSaveNotification, setShowSaveNotification] = useState<boolean>(false);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const savedData = localStorage.getItem('projectOutSaveData');
    if (savedData) {
      setHasSaveData(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px', threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current[id] = el;
    }
  };
  
  const handleCoreAugmentClick = (title: string) => {
    setSelectedCoreAugments(currentSelected => {
      if (currentSelected.includes(title)) {
        return currentSelected.filter(item => item !== title);
      }
      if (currentSelected.length < 2) {
        return [...currentSelected, title];
      }
      return currentSelected;
    });
  };

  const handleUtilityAugmentClick = (title: string) => {
    setSelectedUtilityAugments(currentSelected => {
      if (currentSelected.includes(title)) {
        // Deselect
        return currentSelected.filter(item => item !== title);
      }
      // Select, but only if less than 2 are already selected
      if (currentSelected.length < 2) {
        return [...currentSelected, title];
      }
      // If 2 are selected and we're trying to select a 3rd, do nothing
      return currentSelected;
    });
  };

  const handleSave = () => {
    const saveData = {
      selectedCoreAugments,
      selectedUtilityAugments,
      selectedRelicAugment,
      scrollPosition: window.scrollY,
    };
    localStorage.setItem('projectOutSaveData', JSON.stringify(saveData));
    setHasSaveData(true);
    setShowSaveNotification(true);
    setTimeout(() => {
      setShowSaveNotification(false);
    }, 3000);
  };

  const handleLoad = () => {
    const savedDataString = localStorage.getItem('projectOutSaveData');
    if (savedDataString) {
      const savedData = JSON.parse(savedDataString);
      setSelectedCoreAugments(savedData.selectedCoreAugments || []);
      setSelectedUtilityAugments(savedData.selectedUtilityAugments || []);
      setSelectedRelicAugment(savedData.selectedRelicAugment || null);
      
      // We scroll after a short timeout to let React re-render, ensuring the page height is correct.
      setTimeout(() => {
        window.scrollTo({ top: savedData.scrollPosition || 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const coreAugments = [
    {
      title: 'Dash Augment: Phase Echo',
      description: 'Your Dash leaves an unstable echo at your starting position, or on the first enemy you pass through. The echo explodes for 50% weapon damage after 1 second.',
      className: ''
    },
    {
      title: 'Dash Augment: Kinetic Burst',
      description: 'Upon landing after a Dash, release a small shockwave that deals 25% of your base weapon damage in an area around you.',
      className: ''
    },
    {
      title: 'Parry Augment: Vengeful Riposte',
      description: 'Successfully parrying an attack unleashes a shockwave, staggering and lightly damaging nearby enemies.',
      className: 'md:col-span-2'
    }
  ];

  const utilityAugments = [
    {
      title: 'Utility: Vampiric Strikes',
      description: 'Executing a staggered enemy restores a small amount of health.',
      className: ''
    },
    {
      title: 'Utility: Resourceful Extraction',
      description: 'Extracting from the labyrinth with a full health bar grants a bonus to meta-currency.',
      className: ''
    },
    {
        title: 'Utility: Shattered Defenses',
        description: 'Dealing damage to a blocking enemy has a chance to temporarily shatter their guard, making them vulnerable.',
        className: 'md:col-span-2'
    }
  ];

  const relicAugments = [
    {
      title: 'Relic: Soul of the Berserker',
      description: 'Below 30% health, your attack speed is increased by 50% but your armor is reduced to zero.',
      className: ''
    },
    {
      title: 'Relic: Temporal Anchor',
      description: 'Upon taking fatal damage, rewind time to your position and health from 4 seconds prior. Can only occur once per run.',
      className: ''
    },
    {
      title: 'Relic: Crystalline Carapace',
      description: 'The first instance of damage you take is completely nullified. The carapace reforms after 10 seconds of not taking damage.',
      className: 'md:col-span-2'
    }
  ];

  const handleRelicAugmentClick = (title: string) => {
    setSelectedRelicAugment(currentSelected => {
      if (currentSelected === title) {
        return null; // Deselect
      }
      return title; // Select
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <Sidebar sections={GDD_SECTIONS} activeSection={activeSection} />
      <div className="fixed top-0 right-0 p-4 z-50">
          {showSaveNotification && (
              <div className="animate-fade-in-out bg-green-500/80 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
                  Progress Saved!
              </div>
          )}
      </div>
      <main className="lg:ml-64 p-4 md:p-8 lg:p-12">
        <header className="mb-12 border-b-2 border-red-800/40 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-red-500 tracking-wider">出关 (Project Out)</h1>
            <p className="text-xl text-gray-400 mt-2">Game Design Document</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            >
              Save
            </button>
            <button 
              onClick={handleLoad}
              disabled={!hasSaveData}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Load
            </button>
          </div>
        </header>

        {GDD_SECTIONS.map((section) => {
          if (section.id === 'pillars') {
            return (
              <SectionCard
                key={section.id}
                id={section.id}
                title={section.title}
                setSectionRef={setSectionRef(section.id)}
              >
                <p className="text-lg text-gray-400 mb-8">{section.description}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {PILLARS.map((pillar) => (
                    <PillarCard key={pillar.title} {...pillar} />
                  ))}
                </div>
              </SectionCard>
            );
          }
           if (section.id === 'ability-upgrades') {
            return (
              <SectionCard
                key={section.id}
                id={section.id}
                title={section.title}
                setSectionRef={setSectionRef(section.id)}
              >
                <p className="text-lg text-gray-400 mb-8">{section.description}</p>
                <div>
                  <h4 className="text-2xl font-semibold text-red-400 mb-4">Core Augments (Choose 2)</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {coreAugments.map((augment) => (
                      <AugmentCard
                        key={augment.title}
                        {...augment}
                        isSelected={selectedCoreAugments.includes(augment.title)}
                        onClick={() => handleCoreAugmentClick(augment.title)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-red-400 mb-4">Utility Augments (Choose 2)</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {utilityAugments.map((augment) => (
                      <AugmentCard
                        key={augment.title}
                        {...augment}
                        isSelected={selectedUtilityAugments.includes(augment.title)}
                        onClick={() => handleUtilityAugmentClick(augment.title)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-red-400 mb-4">Relic Augments (Choose 1)</h4>
                   <div className="grid md:grid-cols-2 gap-4">
                    {relicAugments.map((augment) => (
                      <AugmentCard
                        key={augment.title}
                        {...augment}
                        isSelected={selectedRelicAugment === augment.title}
                        onClick={() => handleRelicAugmentClick(augment.title)}
                      />
                    ))}
                  </div>
                </div>
              </SectionCard>
            );
          }
          if (section.id === 'weapons') {
            return (
                <SectionCard 
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  setSectionRef={setSectionRef(section.id)}
                >
                    <p className="text-lg text-gray-400 mb-8">{section.description}</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {WEAPONS.map(weapon => <WeaponCard key={weapon.name} {...weapon} />)}
                    </div>
                </SectionCard>
            );
          }
          if (section.id === 'loot') {
            return (
                <SectionCard 
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  setSectionRef={setSectionRef(section.id)}
                >
                    <p className="text-lg text-gray-400 mb-8">{section.description}</p>
                    <EquipmentTable slots={EQUIPMENT_SLOTS} />
                </SectionCard>
            );
          }
          if (section.id === 'controls') {
            return (
              <SectionCard
                key={section.id}
                id={section.id}
                title={section.title}
                setSectionRef={setSectionRef(section.id)}
              >
                <p className="text-lg text-gray-400 mb-6">{section.description}</p>
                <div className="max-w-md mx-auto bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <ul className="space-y-3">
                    {CONTROLS.map(control => (
                      <li key={control.key} className="flex justify-between items-center text-lg">
                        <span className="font-semibold text-red-400">{control.action}</span>
                        <kbd className="px-3 py-1 text-base font-sans font-semibold text-gray-300 bg-gray-900 border border-gray-600 rounded-md">
                          {control.key}
                        </kbd>
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionCard>
            );
          }
          if (section.id === 'animations') {
            return (
                <SectionCard
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  setSectionRef={setSectionRef(section.id)}
                >
                  <p className="text-lg text-gray-400 mb-6">{section.description}</p>
                  <div className="mt-8">
                    <h4 className="text-2xl font-semibold text-red-400 mb-4">Visual Effects (VFX) & Juice</h4>
                    <p className="text-gray-400 mb-6">
                      To make combat feel impactful and responsive, we will implement a suite of visual and auditory feedback. These 'juice' elements are critical for player satisfaction and clearly communicating game states.
                    </p>
                    <ul className="space-y-4 list-disc list-inside text-gray-400 pl-4">
                      <li>
                        <strong className="text-red-300">Player Dash:</strong> A directional blur and subtle chromatic aberration effect will be applied to the screen for the duration of the dash. The player character will leave a faint, fading after-image trail. Dust particles will be kicked up from the ground at the start and end points of the dash.
                      </li>
                      <li>
                        <strong className="text-red-300">Weapon Attacks:</strong> Light attacks generate a clean, sharp, white weapon trail, while heavy attacks have a thicker, red-orange trail. On impact, particle effects will burst: bright yellow sparks for hitting armor, and dark red particles for hitting flesh. Successful heavy attacks will also trigger a minor, sharp screen shake.
                      </li>
                      <li>
                        <strong className="text-red-300">Successful Parry:</strong> This key moment is heavily emphasized. The point of impact will feature a bright, hexagonal flare. The action will freeze for a fraction of a second (hitstop), followed by a brief slow-motion effect to highlight the counter-attack window.
                      </li>
                    </ul>
                  </div>
                </SectionCard>
            );
          }
          if (section.id === 'enemy-ai') {
              return (
                <SectionCard
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  setSectionRef={setSectionRef(section.id)}
                >
                  <p className="text-lg text-gray-400 mb-6">{section.description}</p>
                   <div className="mt-8">
                    <h4 className="text-2xl font-semibold text-red-400 mb-4">Advanced AI Reactivity: Countering Player Augments</h4>
                    <p className="text-gray-400 mb-6">
                      Enemy archetypes are designed to recognize and adapt to the player's most powerful augments, forcing tactical shifts and preventing any single build from becoming a one-size-fits-all solution. This creates a dynamic combat puzzle where the player must not only master their own build but also understand how the enemy will react to it.
                    </p>
                    <ul className="space-y-4 list-disc list-inside text-gray-400 pl-4">
                      <li>
                        <strong className="text-red-300">Countering 'Phase Echo':</strong> Skirmisher-type enemies will perform a rapid evasive hop away from the echo's spawn location just before it detonates. This shifts the augment's utility from guaranteed damage to an area-denial tool, forcing players to use it to control space rather than as a simple damage supplement.
                      </li>
                      <li>
                        <strong className="text-red-300">Countering 'Soul of the Berserker':</strong> When a player is below the 30% health threshold and the Berserker state is active, heavily-armored Brawler enemies will shift their behavior. They cease their aggressive combo strings and adopt a defensive stance, baiting the player's frenzied attacks and looking for an opening to deliver a single, devastating counter-attack.
                      </li>
                      <li>
                        <strong className="text-red-300">Countering 'Crystalline Carapace':</strong> Enemies that utilize multi-hit combos will intentionally use a quick, low-damage opening attack to shatter the player's carapace. This bait-and-break tactic ensures their subsequent, more powerful attacks in the combo chain are not nullified, punishing players who rely on the carapace as an infallible shield.
                      </li>
                    </ul>
                  </div>
                  <div className="mt-12">
                    <h4 className="text-2xl font-semibold text-red-400 mb-4">Enemy Synergy & Group Tactics</h4>
                    <p className="text-gray-400 mb-6">
                      Beyond individual behaviors, enemy groups coordinate their abilities to create complex combat challenges that test the player's situational awareness and target prioritization.
                    </p>
                    <ul className="space-y-4 list-disc list-inside text-gray-400 pl-4">
                      <li>
                        <strong className="text-red-300">Suppression & Flank:</strong> Ranged 'Harrier' enemies will lay down suppressing fire to force the player behind cover, while melee 'Brawler' enemies take advantage of the player's divided attention to close the distance and attack from a flanking angle.
                      </li>
                      <li>
                        <strong className="text-red-300">Shield Push & Swarm:</strong> Shield-bearing 'Bulwark' enemies will use a wide, telegraphed shield bash to force a dodge, creating an opening for faster 'Skirmisher' types to dash in and land quick strikes while the player is in recovery frames.
                      </li>
                      <li>
                        <strong className="text-red-300">Area Denial & Punish:</strong> Support 'Alchemist' enemies will lob vials that create hazardous pools on the ground, restricting player movement. This makes it significantly easier for slow, heavy-hitting 'Brawlers' to land their powerful but easily-avoided attacks.
                      </li>
                    </ul>
                  </div>
                </SectionCard>
              );
          }
          return (
            <SectionCard
              key={section.id}
              id={section.id}
              title={section.title}
              setSectionRef={setSectionRef(section.id)}
            >
              <p className="text-lg text-gray-400">{section.description}</p>
            </SectionCard>
          );
        })}
      </main>
    </div>
  );
};

export default App;
