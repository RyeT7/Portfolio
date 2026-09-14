import { useEffect, useMemo, useRef, useState } from 'react';
import type { Direction, ElevatorPhase, Floor } from './types.ts';
import { elevatorConfig, getTravelDuration } from './config.ts';

export interface ElevatorState {
  floors: Floor[];
  currentFloor: Floor;
  renderedFloor: Floor;
  displayedLevel: number;
  phase: ElevatorPhase;
  direction: Direction | null;
  queuedId: string | null;
  doorGap: number;
  goToId: (id: string) => void;
  goUp: () => void;
  goDown: () => void;
  scrub: (deltaPx: number) => void;
  releaseGesture: () => void;
}

const SCROLL_DISTANCE_PX = 650;
const ARM_PX = 24;
const COMMIT_MIN = 0.1;
const SETTLE_DELAY_MS = 150;
const MIN_ANIM_MS = 140;
const EPSILON = 0.0005;
const MIN_STEP = EPSILON * 2;

interface Segments {
  closeEnd: number;
  openStart: number;
  totalMs: number;
}

interface Pending {
  fromIndex: number;
  toIndex: number;
  direction: Direction;
  seg: Segments;
  source: 'gesture' | 'command';
}

function computeSegments(distance: number): Segments {
  const doorsEnabled = elevatorConfig.doors;
  const closeMs = doorsEnabled ? elevatorConfig.doorCloseMs : 0;
  const openMs = doorsEnabled ? elevatorConfig.doorOpenMs : 0;
  const travelMs = getTravelDuration(distance);
  const totalMs = Math.max(1, closeMs + travelMs + openMs);
  return { closeEnd: closeMs / totalMs, openStart: (closeMs + travelMs) / totalMs, totalMs };
}

function doorGapFor(progress: number, seg: Segments): number {
  if (progress <= seg.closeEnd) {
    return seg.closeEnd <= 0 ? 0 : 1 - progress / seg.closeEnd;
  }
  if (progress < seg.openStart) return 0;
  const span = 1 - seg.openStart;
  return span <= 0 ? 1 : (progress - seg.openStart) / span;
}

function resolveStartIndex(floors: Floor[]): number {
  const cfg = elevatorConfig.startFloor;
  if (cfg === 'highest') return 0;
  if (cfg === 'lowest') return floors.length - 1;
  const idx = floors.findIndex((f) => f.id === cfg);
  return idx === -1 ? floors.length - 1 : idx;
}

export function useElevator(floors: Floor[]): ElevatorState {
  if (floors.length === 0) throw new Error('useElevator requires at least one floor.');

  const startIndex = useMemo(() => resolveStartIndex(floors), [floors]);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [pending, setPending] = useState<Pending | null>(null);
  const [progress, setProgress] = useState(0);
  const [queuedId, setQueuedId] = useState<string | null>(null);

  const currentIndexRef = useRef(startIndex);
  const pendingRef = useRef<Pending | null>(null);
  const progressRef = useRef(0);

  const forwardRef = useRef(true);
  const armRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);

  function clearSettleTimer() {
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
  }

  function stopRaf() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      stopRaf();
      clearSettleTimer();
    };
  }, []);

  useEffect(() => {
    if (!pending) return;
    if (rafRef.current !== null || settleTimerRef.current !== null) return;
    scheduleSettle();
  });

  useEffect(() => {
    if (pending || queuedId === null) return;
    const idx = floors.findIndex((f) => f.id === queuedId);
    setQueuedId(null);
    if (idx !== -1 && idx !== currentIndexRef.current) beginAutoTravel(idx);
  });

  function applyProgress(target: number) {
    const pend = pendingRef.current;
    if (!pend) return;
    const clamped = Math.max(0, Math.min(1, target));

    if (clamped <= EPSILON) {
      pendingRef.current = null;
      progressRef.current = 0;
      setPending(null);
      setProgress(0);
      return;
    }

    if (clamped >= 1 - EPSILON) {
      const toIndex = pend.toIndex;
      pendingRef.current = null;
      progressRef.current = 0;
      currentIndexRef.current = toIndex;
      setCurrentIndex(toIndex);
      setPending(null);
      setProgress(0);
      return;
    }

    progressRef.current = clamped;
    setProgress(clamped);
  }

  function animateTo(target: 0 | 1, durationMs: number) {
    stopRaf();
    const startVal = progressRef.current;
    const span = target - startVal;
    const duration = Math.max(MIN_ANIM_MS, durationMs);

    let startTime: number | null = null;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const t = Math.max(0, (now - startTime) / duration);
      if (t >= 1) {
        rafRef.current = null;
        applyProgress(target);
        return;
      }
      const value = startVal + span * t;
      applyProgress(Math.min(1 - MIN_STEP, Math.max(MIN_STEP, value)));
      rafRef.current = pendingRef.current ? requestAnimationFrame(step) : null;
    };

    rafRef.current = requestAnimationFrame(step);
  }

  function runSettle() {
    const pend = pendingRef.current;
    if (!pend) return;
    const commit =
      pend.source === 'command' || (forwardRef.current && progressRef.current >= COMMIT_MIN);
    const target: 0 | 1 = commit ? 1 : 0;
    const remaining = Math.abs(target - progressRef.current);
    animateTo(target, remaining * pend.seg.totalMs);
  }

  function scheduleSettle() {
    clearSettleTimer();
    settleTimerRef.current = window.setTimeout(() => {
      settleTimerRef.current = null;
      armRef.current = 0;
      runSettle();
    }, SETTLE_DELAY_MS);
  }

  function beginPending(direction: Direction): Pending | null {
    const fromIndex = currentIndexRef.current;
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= floors.length) return null;
    return { fromIndex, toIndex, direction, seg: computeSegments(1), source: 'gesture' };
  }

  function scrub(deltaPx: number) {
    if (Math.abs(deltaPx) < 1) return;
    if (pendingRef.current?.source === 'command') return;
    stopRaf();

    const dir: Direction = deltaPx > 0 ? 'down' : 'up';
    const magnitude = Math.abs(deltaPx) / SCROLL_DISTANCE_PX;
    const pend = pendingRef.current;

    if (!pend) {
      if (armRef.current !== 0 && Math.sign(armRef.current) !== Math.sign(deltaPx)) {
        armRef.current = 0;
      }
      armRef.current += deltaPx;
      scheduleSettle();
      if (Math.abs(armRef.current) < ARM_PX) return;

      const next = beginPending(dir);
      armRef.current = 0;
      if (!next) return;
      pendingRef.current = next;
      forwardRef.current = true;
      setPending(next);
      applyProgress(magnitude);
      scheduleSettle();
      return;
    }

    const forward = dir === pend.direction;
    forwardRef.current = forward;
    applyProgress(progressRef.current + (forward ? magnitude : -magnitude));
    scheduleSettle();
  }

  function releaseGesture() {
    clearSettleTimer();
    runSettle();
  }

  function beginAutoTravel(targetIndex: number) {
    if (pendingRef.current) return;
    const fromIndex = currentIndexRef.current;
    if (targetIndex === fromIndex || targetIndex < 0 || targetIndex >= floors.length) return;

    const direction: Direction = floors[targetIndex].level > floors[fromIndex].level ? 'up' : 'down';
    const distance = Math.abs(floors[targetIndex].level - floors[fromIndex].level);
    const next: Pending = {
      fromIndex,
      toIndex: targetIndex,
      direction,
      seg: computeSegments(distance),
      source: 'command',
    };

    clearSettleTimer();
    pendingRef.current = next;
    progressRef.current = 0;
    forwardRef.current = true;
    setPending(next);
    setProgress(0);
    animateTo(1, next.seg.totalMs);
  }

  function requestIndex(targetIndex: number) {
    if (targetIndex < 0 || targetIndex >= floors.length) return;

    const inFlight = pendingRef.current;
    if (!inFlight) {
      beginAutoTravel(targetIndex);
      return;
    }
    if (targetIndex === inFlight.toIndex) {
      if (inFlight.source === 'gesture') {
        clearSettleTimer();
        forwardRef.current = true;
        const confirmed: Pending = { ...inFlight, source: 'command' };
        pendingRef.current = confirmed;
        setPending(confirmed);
        animateTo(1, (1 - progressRef.current) * confirmed.seg.totalMs);
      }
      return;
    }

    if (inFlight.source === 'gesture') {
      clearSettleTimer();
      forwardRef.current = true;

      if (targetIndex === inFlight.fromIndex) {
        animateTo(0, progressRef.current * inFlight.seg.totalMs);
        return;
      }

      const retarget: Pending = {
        ...inFlight,
        toIndex: targetIndex,
        direction: floors[targetIndex].level > floors[inFlight.fromIndex].level ? 'up' : 'down',
        source: 'command',
      };
      pendingRef.current = retarget;
      setPending(retarget);
      animateTo(1, (1 - progressRef.current) * retarget.seg.totalMs);
      return;
    }

    setQueuedId(floors[targetIndex].id);
  }

  const baseIndex = () => pendingRef.current?.toIndex ?? currentIndexRef.current;

  const goToId = (id: string) => {
    const idx = floors.findIndex((f) => f.id === id);
    if (idx !== -1) requestIndex(idx);
  };
  const goUp = () => requestIndex(baseIndex() - 1);
  const goDown = () => requestIndex(baseIndex() + 1);

  const phase: ElevatorPhase = !pending
    ? 'idle'
    : progress < pending.seg.closeEnd
      ? 'closing'
      : progress < pending.seg.openStart
        ? 'traveling'
        : 'opening';

  const doorGap = !pending ? 1 : doorGapFor(progress, pending.seg);

  const renderedFloor = !pending
    ? floors[currentIndex]
    : progress < pending.seg.closeEnd
      ? floors[pending.fromIndex]
      : floors[pending.toIndex];

  return {
    floors,
    currentFloor: floors[currentIndex],
    renderedFloor,
    displayedLevel: renderedFloor.level,
    phase,
    direction: pending?.direction ?? null,
    queuedId,
    doorGap,
    goToId,
    goUp,
    goDown,
    scrub,
    releaseGesture,
  };
}
