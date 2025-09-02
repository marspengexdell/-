
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
                                <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
                                  <li><span className="font-medium text-gray-300">Three-Hit Combo:</span> A rapid sequence (Jab &rarr; Jab &rarr; Cross) designed to overwhelm the player. The final hit has increased knockback.</li>
                                  <li><span className="font-medium text-gray-300">Heavy Slam:</span> A slow, telegraphed overhead attack. The Brawler's weapon glows red, signaling an unblockable, high-damage move that must be parried or dodged.</li>
                                </ul>
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
                                <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
                                    <li><span className="font-medium text-gray-300">Standard Bolt:</span> Fires a quick, straight-flying energy projectile. Can be parried back at the Skirmisher.</li>
                                    <li><span className="font-medium text-gray-300">Charged Shot:</span> A brief charge-up animation precedes a larger, slightly slower projectile that has minor homing capabilities.</li>
                                    <li><span className="font-medium text-gray-300">Point-Blank Shot:</span> If the player gets too close, it performs a quick evasive hop backwards while firing a shotgun-like spread to create space.</li>
                                </ul>
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
                             <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
                                <li><span className="font-medium text-gray-300">Horizontal Sweep:</span> A wide, 180-degree cleave. Telegraph: The Guardian pulls its weapon back horizontally, with a faint trail of light tracing the attack's path before it swings.</li>
                                <li><span className="font-medium text-gray-300">Ground Stomp:</span> A powerful AoE attack. Telegraph: The Guardian raises a foot high, and the ground around it cracks with red energy for a full second before the stomp, defining the damage radius.</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold text-red-300">Defensive Tactics</h5>
                            <p className="text-sm text-gray-400">Frequently enters a blocking stance that deflects most attacks. Can only be damaged consistently after a parry or during its attack recovery. A failed player parry may trigger a powerful counter-attack.</p>
                        </div>
                    </div>
                  </div>
                </SectionCard>
              )}
              {section.id === 'ability-upgrades' && (
                <SectionCard title={section.title} id={section.id}>
                  <p className="mb-8 text-gray-400">{section.description}</p>
                  <div className="space-y-8">
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h4 className="text-xl font-bold text-red-400 mb-3">Unlocking New Abilities: Shrines of the Forgotten</h4>
                      <p className="text-gray-400 mb-4">New active abilities are not tied to a skill tree but are discovered as rare rewards within the labyrinth. Interacting with a "Shrine of the Forgotten" will bestow a new power upon the player.</p>
                      <p className="font-semibold text-gray-300">Visual Feedback:</p>
                      <ul className="list-disc list-inside text-gray-400 mt-2 pl-2">
                        <li>A bright, ethereal light envelops the player character upon acquisition.</li>
                        <li>A UI notification prominently displays the icon and name of the new ability.</li>
                        <li>A new icon is permanently added to the player's HUD, showing its availability and cooldown.</li>
                      </ul>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h4 className="text-xl font-bold text-red-400 mb-3">The Augment System: Enhancing Your Toolkit</h4>
                      <p className="text-gray-400 mb-6">Once an ability is unlocked, players can find "Augments" to modify its function. These are passive upgrades found from elite enemies or in hidden caches. Each ability can have one Augment applied at a time, forcing meaningful choices.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-900/60 p-4 rounded-md border border-gray-600">
                            <h5 className="font-semibold text-red-300">Dash Augment: Phase Echo</h5>
                            <p className="text-sm text-gray-400">Your Dash leaves an unstable echo at your starting position, or on the first enemy you pass through. The echo explodes for 50% weapon damage after 1 second.</p>
                          </div>
                          <div className="bg-gray-900/60 p-4 rounded-md border border-gray-600">
                            <h5 className="font-semibold text-red-300">Dash Augment: Kinetic Burst</h5>
                            <p className="text-sm text-gray-400">Upon landing after a Dash, release a small shockwave that deals 25% of your base weapon damage in an area around you.</p>
                          </div>
                          <div className="bg-gray-900/60 p-4 rounded-md border border-gray-600 md:col-span-2">
                            <h5 className="font-semibold text-red-300">Parry Augment: Vengeful Riposte</h5>
                            <p className="text-sm text-gray-400">Successfully parrying an attack unleashes a shockwave, staggering and lightly damaging nearby enemies.</p>
                          </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <h4 className="text-xl font-bold text-red-400 mb-3">Synergies & Player Expression</h4>
                      <p className="text-gray-400 mb-4">The true depth of the system emerges from combining augments. We will design these explicitly to create powerful, emergent strategies.</p>
                      <div className="bg-gray-900/60 p-4 rounded-md border border-gray-600">
                          <h5 className="font-semibold text-red-300">Example Synergy: "Echoing Vengeance"</h5>
                          <p className="text-sm text-gray-400">A player with both the <span className="font-bold text-red-400">Phase Echo</span> Dash and <span className="font-bold text-red-400">Vengeful Riposte</span> Parry can Dash through a group of enemies, leaving an echo in their midst, and then immediately parry an incoming attack. This triggers both the echo's explosion and the parry's shockwave simultaneously for massive area-of-effect damage and control.</p>
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