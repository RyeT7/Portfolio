import { Triangle } from 'lucide-react';
import { formatLevel } from '../format.ts';
import type { Direction } from '../types.ts';

export function Indicator(props: { level: number; direction: Direction | null }) {
  return (
    <div className="ev-indicator" role="status" aria-live="polite">
      <Triangle
        className={`ev-arrow ev-arrow--up ${props.direction === 'up' ? 'is-lit' : ''}`}
        size={11}
        fill="currentColor"
        strokeWidth={1}
        aria-hidden="true"
      />
      <span className="ev-digit">{formatLevel(props.level)}</span>
      <Triangle
        className={`ev-arrow ev-arrow--down ${props.direction === 'down' ? 'is-lit' : ''}`}
        size={11}
        fill="currentColor"
        strokeWidth={1}
        aria-hidden="true"
      />
    </div>
  );
}
