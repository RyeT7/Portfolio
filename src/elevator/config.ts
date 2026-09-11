export const elevatorConfig = {
  baseTravelMs: 260,
  perFloorMs: 190,
  minTravelMs: 430,
  maxTravelMs: 2400,

  doors: true,

  soundOnByDefault: true,

  startFloor: 'lowest' as string,
} as const;
