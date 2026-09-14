export function formatLevel(level: number): string {
  if (level === 0) return 'G';
  if (level < 0) return `B${Math.abs(level)}`;
  return String(level);
}
