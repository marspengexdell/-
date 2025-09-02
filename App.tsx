
import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { SectionCard } from './components/SectionCard';
import { PillarCard } from './components/PillarCard';
import { EquipmentTable } from './components/EquipmentTable';
import { WeaponCard } from './components/WeaponCard';
import { GDD_SECTIONS, PILLARS, WEAPONS, EQUIPMENT_SLOTS, CONTROLS } from './constants';
import type { Section } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(GDD_SECTIONS[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
       <div className="fixed inset-0 bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] bg-cover bg-center opacity-10 z-0"></div>
       <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900 z-10"></div>

      <div className="relative z-20 flex max-w-7xl mx-auto">
        <Sidebar sections={GDD_SECTIONS} activeSection={activeSection} />

        <main className="flex-1 min-w-0 pl-4 md:pl-8 lg:pl-72 py-10 pr-4">
          <header className="mb-12 border-b-2 border-red-800/50 pb-4">
            <h1 className="text-5xl md:text-6xl font-bold text-red-500 tracking-wider">出关</h1>
            <p className="text-2xl text-gray-400 mt-2">Project Out</p>
            <p className="text-sm mt-3 text-gray-500">Game Design Document</p>
          </header>

          {GDD_SECTIONS.map((section: Section) => (
            <div key={section.id} ref={setSectionRef(section.id)} id={section.id}>
              {section.id === 'pillars' && (
                <SectionCard title={section.title} id={section.id}>
                  <p className="mb-8 text-gray-400">{section.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PILLARS.map((pillar, index) => (
                      <PillarCard key={index} title={pillar.title} description={pillar.description} icon={pillar.icon} />
                    ))}
                  </div>
                </SectionCard>
              )}
              {section.id === 'core-loop' && (
                <SectionCard title={section.title} id={section.id}>
                  <p className="mb-8 text-gray-400">{section.description}</p>
                </SectionCard>
              )}
              {section.id === 'combat' && (
                <SectionCard title={section.title} id={section.id}>
                    <p className="mb-6 text-gray-400">{section.description}</p>
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                        <h4 className="text-xl font-bold text-red-400 mb-3">Parry & Execute System</h4>
                        <p className="text-gray-400">The core of the combat loop. A successful parry briefly staggers enemies, opening them up for a high-damage "Execute" attack (2.75x damage). Bosses require a sequence of parries to become vulnerable, turning encounters into rhythmic duels.</p>
                    </div>
                </SectionCard>
              )}
              {section.id === 'combat-mechanics' && (
                <SectionCard title={section.title} id={section.id}>
                  <p className="mb-6 text-gray-400">{section.description}</p>
                  <div className="space-y-8">
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h4 className="text-xl font-bold text-red-400 mb-3">The Blade's Edge: Parry &amp; Execute</h4>
                      <p className="text-gray-400">The Parry system is the heart of our high-stakes combat. Given the permadeath nature of a run, every action carries weight. A missed parry can result in devastating damage, potentially ending a run. A successful one, however, completely turns the tide, offering a massive damage opportunity. This creates a constant, thrilling tension: play it safe with dodges and blocks, or risk it all for the glory of a perfect riposte? This choice is central to the player's moment-to-moment experience.</p>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h4 className="text-xl font-bold text-red-400 mb-3">Player's Defensive &amp; Movement Toolkit</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="bg-gray-900/60 p-4 rounded-md border border-gray-600">
                          <h5 className="font-semibold text-red-300">Block</h5>
                          <p className="text-sm text-gray-400">Reduces incoming damage but can be broken by heavy attacks. A reliable, low-risk defensive option.</p>
                        </div>
                        <div className="bg-gray-900/60 p-4 rounded-md border border-gray-600">
                          <h5 className="font-semibold text-red-300">Dash</h5>
                          <p className="text-sm text-gray-400">A quick burst of speed with brief invincibility frames, allowing passage through enemies and attacks.</p>
                        </div>
                        <div className="bg-gray-900/60 p-4 rounded-md border border-gray-600">
                          <h5 className="font-semibold text-red-300">Slide</h5>
                          <p className="text-sm text-gray-400">A low-profile maneuver to slip under high attacks and projectiles while repositioning.</p>
                        </div>
                        <div className="bg-gray-900/60 p-4 rounded-md border border-gray-600">
                          <h5 className="font-semibold text-red-300">Double Jump</h5>
                          <p className="text-sm text-gray-400">Essential for vertical mobility in both combat and exploration, allowing for aerial dodges and repositioning.</p>
                        </div>
                         <div className="bg-gray-900/60 p-4 rounded-md border border-gray-600 md:col-span-2">
                          <h5 className="font-semibold text-red-300">Flash</h5>
                          <p className="text-sm text-gray-400">An advanced, resource-consuming short-range teleport that replaces the Dash. It provides instant repositioning, opening up high-level offensive and defensive strategies.</p>
                        </div>
                      </div>
                    </div>
                     <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h4 className="text-xl font-bold text-red-400 mb-3">Readable Hostility: Enemy Telegraphing</h4>
                      <p className="text-gray-400">For high-stakes combat to feel fair, it must be predictable. Every enemy attack is preceded by a clear, consistent, and distinct visual and auditory "tell." This design philosophy shifts the challenge from pure reaction time to pattern recognition and learning. Players are not defeated by cheap shots, but by failing to read the "language" of the enemy. Mastering this language is key to mastering the game.</p>
                    </div>
                  </div>
                </SectionCard>
              )}
              {section.id === 'animations' && (
                <SectionCard title={section.title} id={section.id}>
                  <p className="mb-8 text-gray-400">{section.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h4 className="text-xl font-bold text-red-400 mb-3">Standard Attack: Responsive & Low-Commitment</h4>
                      <p className="text-gray-400 mb-4">The animation must feel immediate and crisp, allowing players to react quickly. It is a low-commitment action that can be canceled by a dodge or parry during its recovery frames.</p>
                      <div className="text-center bg-gray-900/60 border border-gray-600 rounded p-3">
                        <p className="text-sm text-gray-300 font-mono tracking-widest">Anticipation &rarr; Hit Frame &rarr; Recovery</p>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h4 className="text-xl font-bold text-red-400 mb-3">Heavy Attack: Deliberate & High-Impact</h4>
                      <p className="text-gray-400 mb-4">A high-damage, high-commitment attack. The longer wind-up makes it risky but rewarding. This animation cannot be canceled early, emphasizing its weight.</p>
                      <div className="text-center bg-gray-900/60 border border-gray-600 rounded p-3">
                        <p className="text-sm text-gray-300 font-mono tracking-widest">Charge/Anticipation &rarr; Hit Frames &rarr; Long Recovery</p>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h4 className="text-xl font-bold text-red-400 mb-3">Parry: The Perfect Riposte</h4>
                      <p className="text-gray-400 mb-4">A swift, sharp defensive stance. The active parry window is very brief, demanding precise timing. Success is met with a bright flash and distinct sound cue.</p>
                       <div className="text-center bg-gray-900/60 border border-gray-600 rounded p-3">
                        <p className="text-sm text-gray-300 font-mono tracking-widest">Startup &rarr; Active Window &rarr; Recovery</p>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h4 className="text-xl font-bold text-red-400 mb-3">Dodge: Fluid Evasion</h4>
                      <p className="text-gray-400 mb-4">A quick dash/slide providing a short burst of invincibility frames (i-frames), used for avoiding damage and repositioning. A faint afterimage VFX communicates the i-frame window.</p>
                       <div className="text-center bg-gray-900/60 border border-gray-600 rounded p-3">
                        <p className="text-sm text-gray-300 font-mono tracking-widest">Startup (I-Frames) &rarr; Slide &rarr; Recovery</p>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              )}
               {section.id === 'enemy-ai' && (
                <SectionCard title={section.title} id={section.id}>
                  <p className="mb-8 text-gray-400">{section.description}</p>
                  <div className="space-y-8">
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h4 className="text-xl font-bold text-red-400 mb-3">Core AI Philosophy</h4>
                      <p className="text-gray-400">The AI is built to react to player actions, not just follow rigid scripts. Enemies will recognize and attempt to counter player patterns. If a player relies too heavily on blocking, enemies will use block-breaking attacks. If a player is evasive, they will use attacks to control space and limit movement. This creates a dynamic where players must adapt their strategy, making each combat encounter a unique challenge.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Brawler */}
                        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 space-y-4">
                            <h4 className="text-xl font-bold text-red-400">Archetype: The Brawler</h4>
                            <div>
                                <h5 className="font-semibold text-red-300">Movement</h5>
                                <p className="text-sm text-gray-400">Aggressively closes distance to maintain optimal melee range. Will attempt to flank and reposition if the player is defensive.</p>
                            </div>
                            <div>
                                <h5 className="font-semibold text-red-300">Attack Patterns</h5>
                                <p className="text-sm text-gray-400">Uses a mix of quick 2-3 hit combos and a slower, telegraphed heavy attack that breaks blocks.</p>
                            </div>
                            <div>
                                <h5 className="font-semibold text-red-300">Defensive Tactics</h5>
                                <p className="text-sm text-gray-400">Can perform a quick back-step to evade. If the player successfully parries it, its aggression is temporarily lowered.</p>
                            </div>
                        </div>
                        {/* Skirmisher */}
                        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 space-y-4">
                            <h4 className="text-xl font-bold text-red-400">Archetype: The Skirmisher</h4>
                            <div>
                                <h5 className="font-semibold text-red-300">Movement</h5>
                                <p className="text-sm text-gray-400">Prioritizes maintaining a safe distance from the player. Will kite backwards while attacking and use the environment for cover.</p>
                            </div>
                             <div>
                                <h5 className="font-semibold text-red-300">Attack Patterns</h5>
                                <p className="text-sm text-gray-400">Fires ranged projectiles at a consistent rhythm. Has a close-range "get off me" pushback attack if cornered.</p>
                            </div>
                             <div>
                                <h5 className="font-semibold text-red-300">Defensive Tactics</h5>
                                <p className="text-sm text-gray-400">Relies on superior mobility to dodge incoming attacks. Will prioritize dodging a projectile that has been parried by the player.</p>
                            </div>
                        </div>
                    </div>
                    {/* Guardian */}
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 space-y-4">
                        <h4 className="text-xl font-bold text-red-400">Archetype: The Guardian</h4>
                        <div>
                            <h5 className="font-semibold text-red-300">Movement</h5>
                            <p className="text-sm text-gray-400">Slow, deliberate, and territorial. Prefers to hold its ground rather than chase, acting as a formidable battlefield obstacle.</p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-red-300">Attack Patterns</h5>
                            <p className="text-sm text-gray-400">Utilizes powerful, wide-arcing swings with significant wind-up and recovery. May also have a ground-stomp area-of-effect (AoE) attack to punish players who stay too close.</p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-red-300">Defensive Tactics</h5>
                            <p className="text-sm text-gray-400">Frequently enters a blocking stance that deflects most attacks. Can only be damaged consistently after a parry or during its attack recovery. A failed player parry may trigger a powerful counter-attack.</p>
                        </div>
                    </div>
                  </div>
                </SectionCard>
              )}
              {section.id === 'controls' && (
                <SectionCard title={section.title} id={section.id}>
                  <p className="mb-6 text-gray-400">{section.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                    {CONTROLS.map(control => (
                      <div key={control.key} className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                        <kbd className="px-3 py-1.5 text-lg font-semibold text-gray-200 bg-gray-900 border border-gray-600 rounded-lg">{control.key}</kbd>
                        <p className="mt-2 text-gray-400">{control.action}</p>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}
              {section.id === 'weapons' && (
                 <SectionCard title={section.title} id={section.id}>
                    <p className="mb-8 text-gray-400">{section.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {WEAPONS.map(weapon => <WeaponCard key={weapon.name} {...weapon} />)}
                    </div>
                 </SectionCard>
              )}
              {section.id === 'customization' && (
                <SectionCard title={section.title} id={section.id}>
                    <p className="mb-6 text-gray-400">{section.description}</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                            <h4 className="text-xl font-bold text-red-400 mb-3">Paper Doll System</h4>
                            <p className="text-gray-400">A layered sprite system where each piece of equipped gear is visually represented on the character in real-time. This provides strong player expression and a tangible sense of progression.</p>
                        </div>
                         <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                            <h4 className="text-xl font-bold text-red-400 mb-3">Transmogrification</h4>
                            <p className="text-gray-400">An endgame system allowing players to apply the appearance of one item to another. This creates a powerful long-term retention hook, encouraging collection for cosmetic purposes.</p>
                        </div>
                    </div>
                </SectionCard>
              )}
              {section.id === 'loot' && (
                <SectionCard title={section.title} id={section.id}>
                    <p className="mb-8 text-gray-400">{section.description}</p>
                    <EquipmentTable slots={EQUIPMENT_SLOTS} />
                </SectionCard>
              )}
               {section.id === 'progression' && (
                <SectionCard title={section.title} id={section.id}>
                    <p className="mb-6 text-gray-400">{section.description}</p>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                            <h4 className="text-xl font-bold text-red-400 mb-3">Hub Town & Permanent Upgrades</h4>
                            <p className="text-gray-400">Players spend meta-currency in the hub town for permanent upgrades (e.g., more base HP, new weapon unlocks), turning failure into a step forward.</p>
                        </div>
                         <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                            <h4 className="text-xl font-bold text-red-400 mb-3">Narrative Through Death</h4>
                            <p className="text-gray-400">Inspired by Hades, each return to the hub town, even after death, can advance the story, making death an integral and sometimes rewarding part of the experience.</p>
                        </div>
                    </div>
                </SectionCard>
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default App;