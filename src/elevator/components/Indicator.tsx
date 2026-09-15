import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { formatLevel } from '../format.ts';
import type { Direction } from '../types.ts';

export function Indicator(props: { level: number; direction: Direction | null }) {
  return (
    <div className="ev-indicator" role="status" aria-live="polite">
      <FaCaretUp
        className={`ev-arrow ${props.direction === 'up' ? 'is-lit' : ''}`}
        size={14}
        aria-hidden="true"
      />
      <span className="ev-digit">{formatLevel(props.level)}</span>
      <FaCaretDown
        className={`ev-arrow ${props.direction === 'down' ? 'is-lit' : ''}`}
        size={14}
        aria-hidden="true"
      />
    </div>
  );
}
