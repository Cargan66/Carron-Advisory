/**
 * Decorative "management dashboard" illustration — on-brand fake charts
 * (cash-flow line, revenue bars, KPI tiles) in emerald & gold. Pure SVG, so it
 * stays crisp at any size and needs no external image. Illustrative only.
 */
export function DashboardArt({ className = "" }: { className?: string }) {
  // Cash-flow line points (lower y = higher value → an upward trend).
  // Kept within the chart panel (y ≈ 196–262) so it never overlaps the KPI tiles.
  const line = "30,262 90,250 150,256 210,236 270,244 330,220 390,206 450,212 500,196";

  return (
    <svg
      viewBox="0 0 530 400"
      className={className}
      role="img"
      aria-label="Illustrative management dashboard showing cash flow, revenue and key figures"
    >
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C766" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
      </defs>

      {/* Card */}
      <rect x="1" y="1" width="528" height="398" rx="20" fill="#08251A" stroke="#D4AF37" strokeOpacity="0.25" />

      {/* Header */}
      <text x="28" y="42" fill="#EFE9DA" fontSize="17" fontWeight="700" fontFamily="inherit">
        Management dashboard
      </text>
      <text x="28" y="62" fill="#9A9686" fontSize="11" fontFamily="inherit">
        June 2026 · updated today
      </text>
      <circle cx="478" cy="38" r="5" fill="#D4AF37" fillOpacity="0.5" />
      <circle cx="496" cy="38" r="5" fill="#D4AF37" fillOpacity="0.8" />
      <circle cx="514" cy="38" r="5" fill="#E8C766" />

      {/* KPI tiles */}
      <g fontFamily="inherit">
        {[
          { x: 28, label: "Cash on hand", value: "R 1.24m" },
          { x: 195, label: "Gross margin", value: "38.2%" },
          { x: 362, label: "Cash runway", value: "5.2 mo" },
        ].map((k) => (
          <g key={k.label}>
            <rect x={k.x} y="82" width="140" height="62" rx="10" fill="#0F3D2A" stroke="#FFFFFF" strokeOpacity="0.08" />
            <text x={k.x + 14} y="106" fill="#9A9686" fontSize="10.5" letterSpacing="0.5">
              {k.label.toUpperCase()}
            </text>
            <text x={k.x + 14} y="130" fill="#EFE9DA" fontSize="20" fontWeight="700">
              {k.value}
            </text>
          </g>
        ))}
      </g>

      {/* Cash-flow line chart */}
      <text x="28" y="182" fill="#9A9686" fontSize="10.5" letterSpacing="0.5" fontFamily="inherit">
        CASH FLOW — 13-WEEK FORECAST
      </text>
      <g>
        {/* baseline grid */}
        {[200, 230, 260].map((y) => (
          <line key={y} x1="28" y1={y} x2="502" y2={y} stroke="#FFFFFF" strokeOpacity="0.06" />
        ))}
        <polygon points={`30,270 ${line} 500,270`} fill="url(#areaFill)" />
        <polyline points={line} fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {line.split(" ").map((p) => {
          const [cx, cy] = p.split(",");
          return <circle key={p} cx={cx} cy={cy} r="3" fill="#08251A" stroke="#E8C766" strokeWidth="2" />;
        })}
      </g>

      {/* Revenue bars */}
      <text x="28" y="306" fill="#9A9686" fontSize="10.5" letterSpacing="0.5" fontFamily="inherit">
        REVENUE BY MONTH
      </text>
      <g>
        {[40, 34, 52, 46, 64, 72].map((h, i) => {
          const x = 30 + i * 82;
          const y = 372 - h;
          return <rect key={i} x={x} y={y} width="52" height={h} rx="4" fill="url(#barFill)" />;
        })}
      </g>
    </svg>
  );
}
