export const elevatorConfig = {
  baseTravelMs: 260,
  perFloorMs: 190,
  minTravelMs: 430,
  maxTravelMs: 2400,

  doors: true,
  doorCloseMs: 550,
  doorOpenMs: 650,

  startFloor: 'AboutMe' as string,
} as const;

export function getTravelDuration(distance: number): number {
  const raw = elevatorConfig.baseTravelMs + elevatorConfig.perFloorMs * Math.abs(distance);
  return Math.min(elevatorConfig.maxTravelMs, Math.max(elevatorConfig.minTravelMs, raw));
}
