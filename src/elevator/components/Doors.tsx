export function Doors(props: { doorGap: number }) {
  const pct = Math.max(0, Math.min(1, props.doorGap)) * 100;

  return (
    <div className="ev-doors" aria-hidden="true">
      <div className="ev-door ev-door--left" style={{ transform: `translateX(-${pct}%)` }} />
      <div className="ev-door ev-door--right" style={{ transform: `translateX(${pct}%)` }} />
    </div>
  );
}
