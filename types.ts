import type React from 'react';

export interface Section {
  id: string;
  title: string;
  description: string;
}

export interface Pillar {
    title: string;
    description: string;
    // FIX: Changed icon type to React.ComponentType to avoid using JSX in .ts files.
    // This allows passing the component function itself instead of a rendered JSX element.
    icon: React.ComponentType;
}

export interface Weapon {
    name: string;
    description: string;
    style: string;
    icon: React.ComponentType;
}

export interface EquipmentSlot {
    group: string;
    name: string;
    role: string;
    affixes: string;
    visual: boolean;
}

export interface Control {
    key: string;
    action: string;
}