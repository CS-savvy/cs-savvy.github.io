const layers = [3, 5, 5, 2];
const W = 360;
const H = 300;

const nodes = layers.map((count, li) => {
  const x = 40 + (li * (W - 80)) / (layers.length - 1);
  return Array.from({ length: count }, (_, ni) => ({ x, y: ((ni + 1) * H) / (count + 1) }));
});

/** Decorative feed-forward network diagram for the hero. */
export function NeuralGraphic() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden>
      <defs>
        <linearGradient id="edge" x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {nodes.slice(0, -1).map((layer, li) =>
        layer.flatMap((a, ai) =>
          nodes[li + 1].map((b, bi) => (
            <line
              key={`${li}-${ai}-${bi}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#edge)"
              strokeWidth={0.8}
              opacity={0.25 + (((ai + bi + li) * 37) % 60) / 100}
            />
          )),
        ),
      )}
      {nodes.flatMap((layer, li) =>
        layer.map((n, ni) => (
          <g key={`${li}-${ni}`}>
            <circle cx={n.x} cy={n.y} r={11} fill="var(--card)" stroke="var(--border)" />
            <circle
              cx={n.x}
              cy={n.y}
              r={5}
              fill={li % 2 ? "var(--accent-2)" : "var(--accent)"}
              style={{ animation: `pulse-node 3s ease-in-out ${(li * 0.6 + ni * 0.25).toFixed(2)}s infinite` }}
            />
          </g>
        )),
      )}
    </svg>
  );
}
