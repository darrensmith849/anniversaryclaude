const legend = ["Safari", "Winelands", "Coastal", "City", "Adventure"];

export function CoverageSignal() {
  return (
    <div className="m-card p-5 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="m-overline">Concierge Coverage</p>
          <h3 className="m-display mt-2 text-2xl text-[var(--m-ink)] md:text-3xl">Signal Across South Africa</h3>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--m-muted)]">
          {legend.map((item) => (
            <span key={item} className="rounded-sm border border-[var(--m-border)] bg-[var(--m-surface)] px-2 py-1">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-[var(--m-border)] bg-[var(--m-surface-2)] p-3 md:p-4">
        <svg viewBox="0 0 760 180" role="img" aria-label="Coverage signal infographic" className="h-auto w-full">
          <defs>
            <linearGradient id="coverageLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--m-amethyst)" />
              <stop offset="100%" stopColor="var(--m-atlantic)" />
            </linearGradient>
          </defs>

          <path
            d="M18 146C90 132 102 56 170 68C236 80 256 156 326 146C390 136 432 38 500 58C570 78 590 154 742 130"
            fill="none"
            stroke="url(#coverageLine)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {[18, 170, 326, 500, 742].map((x, idx) => (
            <g key={x}>
              <circle cx={x} cy={idx % 2 === 0 ? 146 : idx === 1 ? 68 : 58} r="7" fill="var(--m-surface)" stroke="var(--m-border)" />
              <circle cx={x} cy={idx % 2 === 0 ? 146 : idx === 1 ? 68 : 58} r="3" fill={idx % 2 === 0 ? "var(--m-amethyst)" : "var(--m-atlantic)"} />
            </g>
          ))}

          <line x1="30" y1="26" x2="740" y2="26" stroke="var(--m-border)" strokeDasharray="4 8" />
          <text x="30" y="18" fill="var(--m-muted)" fontSize="10" style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Concierge network signal map
          </text>
        </svg>
      </div>
    </div>
  );
}
