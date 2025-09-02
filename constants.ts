import React from 'react';
import type { Section, Pillar, Weapon, EquipmentSlot, Control } from './types';
import { 
  SkullIcon, 
  SwordIcon, 
  GemIcon, 
  RecycleIcon, 
  KeyboardIcon,
  DaggerIcon,
  BowIcon,
  CrossbowIcon,
  SpearIcon,
  MusketIcon,
  WhipIcon,
  ChainBladeIcon
} from './components/IconComponents';

// FIX: Pass icon components as functions, not JSX elements, to avoid JSX syntax in a .ts file.
export const PILLARS: Pillar[] = [
  {
    title: 'Calculated Risk',
    description: 'Every decision, from engaging an enemy to delving deeper into the dungeon, is a weighty risk/reward calculation.',
    icon: SkullIcon,
  },
  {
    title: 'Deep Customization',
    description: 'Player expression through a fully visualized paper doll system and an exceptionally deep loot and equipment system.',
    icon: GemIcon,
  },
  {
    title: 'Skillful Rhythmic Combat',
    description: 'A fast-paced, responsive combat system that rewards mastery of its core parry-and-execute mechanics.',
    icon: SwordIcon,
  },
  {
    title: 'Endless Replayability',
    description: 'Procedurally generated levels, randomized loot, and a robust meta-progression system ensure no two runs are the same.',
    icon: RecycleIcon,
  },
];


export const GDD_SECTIONS: Section[] = [
  { 
    id: 'pillars', 
    title: 'Foundational Pillars', 
    description: 'A high-stakes, dark fantasy action game blending the deep exploration of Metroidvanias with the procedural generation, permadeath, and build diversity of Roguelites.' 
  },
  { 
    id: 'core-loop', 
    title: 'Core Loop: Search, Fight, Extract', 
    description: 'Players delve into a changing labyrinth in a tense "loot, fight, extract" cycle where death means losing all gathered gear for that run. The innovative "Extract" mechanic allows players to retreat at any time, but with a significant penalty, creating a compelling risk/reward choice beyond the simple binary of success or failure.' 
  },
  { 
    id: 'combat', 
    title: 'System Design: Combat', 
    description: 'Combat is designed to be a fluid, readable, and rewarding, supporting a high skill ceiling through responsive controls and clear feedback.' 
  },
  {
    id: 'combat-mechanics',
    title: 'Combat Mechanics Deep Dive',
    description: 'A detailed breakdown of the player\'s defensive toolkit and the design philosophy behind enemy encounters.'
  },
  {
    id: 'animations',
    title: 'Animation Philosophy & Placeholders',
    description: 'Defining the visual language of combat through keyframe breakdowns for core player actions. These placeholders establish the timing, feel, and readability essential for our high-stakes combat.'
  },
  {
    id: 'enemy-ai',
    title: 'Enemy AI & Behavior',
    description: 'Enemies are designed to be more than just obstacles; they are reactive combatants that test the player\'s mastery of the game\'s mechanics. Our AI philosophy emphasizes readability, reactivity, and creating dynamic combat puzzles.'
  },
  {
    id: 'controls',
    title: 'Player Controls',
    description: 'The game utilizes a classic keyboard layout for precise 2D action-platforming.',
  },
  {
    id: 'weapons',
    title: 'The Armory: Weapon Design',
    description: 'Eight distinct weapon types ensure build diversity by fundamentally altering gameplay, extending beyond simple DPS metrics to include moveset, range, and attack area.'
  },
  {
    id: 'customization',
    title: 'Canvas of Self: Customization',
    description: 'The character customization system is the primary visual representation of a player\'s progress and choices within a run.'
  },
  {
    id: 'loot',
    title: 'System Design: Loot & Growth',
    description: 'An exceptionally deep item system with 21 total equipment slots, managed through a clear design philosophy to ensure meaningful decisions and prevent cognitive overload.'
  },
  {
    id: 'progression',
    title: 'The Endless Cycle: Meta-Progression',
    description: 'Compelling systems that persist and grow across multiple runs, keeping players engaged for hundreds of hours.'
  }
];

export const WEAPONS: Weapon[] = [
    { name: 'Knife/Dagger', description: 'Extremely fast with low base damage but high critical multipliers.', style: 'High-risk, high-reward precision.', icon: DaggerIcon },
    { name: 'Sword', description: 'A balanced weapon with moderate speed, damage, and a wide swing arc.', style: 'Versatile and reliable.', icon: SwordIcon },
    { name: 'Bow', description: 'Ranged weapon requiring a short draw time for full damage.', style: 'Sustained ranged damage.', icon: BowIcon },
    { name: 'Crossbow', description: 'Slower than a bow but with higher single-shot damage and armor penetration.', style: 'Calculated, powerful shots.', icon: CrossbowIcon },
    { name: 'Spear', description: 'Longest melee reach with thrusting attacks, ideal for controlling space.', style: 'Safe, positional combat.', icon: SpearIcon },
    { name: 'Musket', description: 'High-damage, instantaneous hitscan weapon with a very slow reload cycle.', style: 'Every shot counts.', icon: MusketIcon },
    { name: 'Whip', description: 'Mid-range melee with a wide arc, capable of hitting multiple foes.', style: 'Crowd control.', icon: WhipIcon },
    { name: 'Chain-Blade', description: 'A hybrid weapon with fast, close-range attacks and a slower, charged whip attack.', style: 'High skill ceiling.', icon: ChainBladeIcon },
];

export const EQUIPMENT_SLOTS: EquipmentSlot[] = [
    { group: 'Core Armor', name: 'Head', role: 'Primary defensive stats & utility.', affixes: '+Health, +Armor, +Elemental Resist', visual: true },
    { group: 'Core Armor', name: 'Chest', role: 'Primary defense & damage mitigation.', affixes: '+Health, +% Armor, Damage Reduction', visual: true },
    { group: 'Core Armor', name: 'Hands', role: 'Offensive utility stats.', affixes: '+Attack Speed, +Crit Chance', visual: true },
    { group: 'Core Armor', name: 'Waist', role: 'Utility and resource management.', affixes: '+Potion Capacity, +Stamina Regen', visual: true },
    { group: 'Core Armor', name: 'Legs', role: 'Mobility and defensive stats.', affixes: '+Move Speed, +Dodge Chance', visual: true },
    { group: 'Core Armor', name: 'Feet', role: 'Mobility and special movement.', affixes: '+Move Speed, +Sprint Speed', visual: true },
    { group: 'Core Trinkets', name: 'Necklace', role: 'Build-defining unique effects.', affixes: 'Skill-altering effects, On-hit procs', visual: true },
    { group: 'Core Trinkets', name: 'Bracelets (2)', role: 'Medium-power offensive/defensive procs.', affixes: 'On-hit effects, Aura effects', visual: true },
    { group: 'Core Trinkets', name: 'Waist Hangers (2)', role: 'Medium-power utility/resource procs.', affixes: 'Resource gain, Potion enhancement', visual: true },
    { group: 'Rings', name: 'Rings (10)', role: 'Minor, incremental stat boosts.', affixes: '+% Elemental Dmg, +% Crit Damage', visual: false },
];

export const CONTROLS: Control[] = [
  { key: 'A / D', action: 'Move Left / Right' },
  { key: 'W / S', action: 'Aim Up / Down' },
  { key: 'L', action: 'Jump' },
  { key: 'J', action: 'Attack' },
  { key: 'K', action: 'Heavy Attack' },
  { key: 'B / N / M', action: 'Use Skills / Spells' },
];