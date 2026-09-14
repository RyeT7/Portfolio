import { useEffect, useRef } from 'react';
import type { Floor } from './types.ts';
import { useElevator } from './useElevator.ts';
import { elevatorConfig } from './config.ts';
import { Doors } from './components/Doors.tsx';
import { Panel } from './components/Panel.tsx';

function normalizeWheelDelta(e: WheelEvent): number {
  if (e.deltaMode === 1) return e.deltaY * 16;
  if (e.deltaMode === 2) return e.deltaY * window.innerHeight;
  return e.deltaY;
}

function atScrollBoundary(viewport: HTMLDivElement | null, deltaY: number): boolean {
  if (!viewport) return true;
  if (deltaY > 0) return viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 1;
  return viewport.scrollTop <= 0;
}

export function Elevator(props: { floors: Floor[] }) {
  const elevator = useElevator(props.floors);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const elevatorRef = useRef(elevator);
  elevatorRef.current = elevator;

  useEffect(() => {
    let touchLastY: number | null = null;

    const onWheel = (e: WheelEvent) => {
      const deltaY = normalizeWheelDelta(e);
      if (Math.abs(deltaY) < 1) return;

      if (elevatorRef.current.phase === 'idle' && !atScrollBoundary(viewportRef.current, deltaY)) {
        return;
      }

      e.preventDefault();
      elevatorRef.current.scrub(deltaY);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        elevatorRef.current.goDown();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        elevatorRef.current.goUp();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchLastY = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchLastY === null) return;
      const y = e.touches[0]?.clientY;
      if (y === undefined) return;
      const deltaY = touchLastY - y;

      if (elevatorRef.current.phase === 'idle' && !atScrollBoundary(viewportRef.current, deltaY)) {
        touchLastY = y;
        return;
      }

      e.preventDefault();
      touchLastY = y;
      elevatorRef.current.scrub(deltaY);
    };

    const onTouchEnd = () => {
      touchLastY = null;
      elevatorRef.current.releaseGesture();
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const Content = elevator.renderedFloor.Component;

  return (
    <div className="ev-shaft">
      <div className={`ev-cab ${elevator.phase === 'traveling' ? 'is-traveling' : ''}`}>
        <div className="ev-viewport" ref={viewportRef}>
          <Content key={elevator.renderedFloor.id} />
        </div>
        {elevatorConfig.doors && <Doors doorGap={elevator.doorGap} />}
        <div className="ev-frame" />
      </div>
      <Panel elevator={elevator} />
    </div>
  );
}
