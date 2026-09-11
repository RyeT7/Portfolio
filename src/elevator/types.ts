import type { ComponentType } from 'react';

export interface FloorMeta {
  id: string;
  label: string;
  level: number;
  hint?: string;
}

/** Shape of a `import()`ed floor module. */
export interface FloorModule {
  meta: FloorMeta;
  defaultComponent: ComponentType;
}

/** A registered floor: its metadata plus the component to render. */
export interface Floor extends FloorMeta {
  Component: ComponentType;
}

export type Direction = 'up' | 'down';
