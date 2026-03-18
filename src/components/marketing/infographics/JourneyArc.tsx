export function JourneyArc() {
  return (
    <div className="journey-arc m-card relative overflow-hidden p-4 md:p-6" aria-label="Journey arc map infographic">
      <svg viewBox="0 0 760 420" role="img" aria-labelledby="journey-arc-title" className="h-auto w-full">
        <title id="journey-arc-title">How the anniversary concierge journey flows from brief to celebration.</title>
        <defs>
          <linearGradient id="journeyMain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--m-amethyst)" />
            <stop offset="100%" stopColor="var(--m-iris)" />
          </linearGradient>
          <linearGradient id="journeySecondary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--m-atlantic)" />
            <stop offset="100%" stopColor="rgba(24,182,164,0.24)" />
          </linearGradient>
        </defs>

        <path
          className="journey-arc-animated"
          d="M44 306C126 302 158 196 246 188C332 179 372 293 468 282C552 272 600 130 716 136"
          fill="none"
          stroke="url(#journeyMain)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 342C150 352 220 312 300 322C430 338 506 392 716 368"
          fill="none"
          stroke="url(#journeySecondary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 8"
          opacity="0.8"
        />

        {[
          { x: 44, y: 306, label: "Brief" },
          { x: 246, y: 188, label: "Curate" },
          { x: 350, y: 228, label: "Enquire" },
          { x: 468, y: 282, label: "Perks" },
          { x: 600, y: 170, label: "Confirm" },
          { x: 716, y: 136, label: "Celebrate" },
        ].map((node) => (
          <g key={node.label}>
            <circle cx={node.x} cy={node.y} r="11" fill="rgba(255,255,255,0.95)" stroke="var(--m-border)" strokeWidth="1.5" />
            <circle cx={node.x} cy={node.y} r="4" fill="var(--m-amethyst)" />
            <text
              x={node.x}
              y={node.y - 20}
              textAnchor="middle"
              fill="var(--m-ink)"
              fontSize="11"
              fontFamily="var(--m-sans), sans-serif"
              style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
