import type { ComponentType } from 'react';

export interface FloorMeta {
  id: string;
  label: string;
  level: number;
  hint?: string;
  accent?: string;
}

export interface FloorModule {
  meta: FloorMeta;
  defaultComponent: ComponentType;
}

export interface Floor extends FloorMeta {
  Component: ComponentType;
}

export type Direction = 'up' | 'down';

export type ElevatorPhase = 'idle' | 'closing' | 'traveling' | 'opening';
