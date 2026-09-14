import type { CSSProperties } from 'react';
import type { ElevatorState } from '../useElevator.ts';
import { formatLevel } from '../format.ts';
import { Indicator } from './Indicator.tsx';

export function Panel(props: { elevator: ElevatorState }) {
  const { elevator } = props;
  const busy = elevator.phase !== 'idle';

  const selectFloor = (id: string) => {
    if (id === elevator.currentFloor.id && !busy) return;
    elevator.goToId(id);
  };

  return (
    <aside className="ev-panel" aria-label="Elevator control panel">
      <Indicator level={elevator.displayedLevel} direction={elevator.direction} />

      <div className="ev-buttons">
        {elevator.floors.map((floor) => {
          const isCurrent = floor.id === elevator.currentFloor.id;
          const isLit = floor.id === elevator.renderedFloor.id;
          const isQueued = floor.id === elevator.queuedId;
          const style = { '--ev-accent': floor.accent ?? 'var(--ev-amber)' } as CSSProperties;
          return (
            <button
              key={floor.id}
              type="button"
              className={`ev-floor-btn ${isLit ? 'is-lit' : ''} ${isQueued ? 'is-queued' : ''}`}
              style={style}
              onClick={() => selectFloor(floor.id)}
              title={floor.label}
              aria-current={isCurrent}
            >
              {formatLevel(floor.level)}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
