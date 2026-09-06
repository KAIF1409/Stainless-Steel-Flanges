/*
 * Weld-neck flange fabrication drawing — the page's single bold moment.
 * Server-rendered SVG; the stroke draw-in is pure CSS (see globals.css
 * `.anim-draw`), so this ships zero JS.
 */

const INK = "#2F3D44";
const DIM = "#4A5A62";
const RULE = "#8FA1A8";
const PAPER = "#F6F7F7";
const SIGNAL = "#0E7C86";

// Bolt-hole positions on the bolt-circle diameter (8 holes, top view)
const BOLT_HOLES = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return { cx: 230 + 124 * Math.cos(a), cy: 190 + 124 * Math.sin(a) };
});

export default function FlangeDiagram() {
  return (
    <figure className="w-full border border-steel-700 bg-paper text-ink">
      <svg
        viewBox="0 0 460 600"
        role="img"
        aria-label="Fabrication drawing of a stainless steel weld-neck flange: front view showing outer diameter, bolt circle and bore, sectioned side profile with hatching, dimensions, and title block"
        className="block h-auto w-full"
      >
        <defs>
          <pattern
            id="sect-hatch"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="7" stroke={RULE} strokeWidth="1" />
          </pattern>
        </defs>

        {/* drawing sheet frame */}
        <rect
          x="10" y="10" width="440" height="580"
          fill="none" stroke={RULE} strokeWidth="1"
        />

        {/* centre lines (dash-dot, drawing convention) */}
        <line x1="230" y1="34" x2="230" y2="490" stroke={RULE} strokeWidth="0.75" strokeDasharray="16 4 2 4" />
        <line x1="44" y1="190" x2="416" y2="190" stroke={RULE} strokeWidth="0.75" strokeDasharray="16 4 2 4" />

        {/* ── front view ─────────────────────────────────────────── */}
        <circle cx="230" cy="190" r="140" fill="none" stroke={INK} strokeWidth="2"
          pathLength={1} className="anim-draw" style={{ animationDelay: "0.05s" }} />
        <circle cx="230" cy="190" r="124" fill="none" stroke={RULE} strokeWidth="1" strokeDasharray="4 5"
          className="anim-fade" style={{ animationDelay: "0.9s" }} />
        <circle cx="230" cy="190" r="108" fill="none" stroke={SIGNAL} strokeWidth="2.5"
          pathLength={1} className="anim-draw" style={{ animationDelay: "0.35s" }} />
        <circle cx="230" cy="190" r="52" fill="none" stroke={INK} strokeWidth="2"
          pathLength={1} className="anim-draw" style={{ animationDelay: "0.5s" }} />
        {BOLT_HOLES.map((h, i) => (
          <circle key={i} cx={h.cx} cy={h.cy} r="8" fill="none" stroke={DIM} strokeWidth="1.5"
            pathLength={1} className="anim-draw"
            style={{ animationDelay: `${0.55 + i * 0.05}s` }} />
        ))}

        {/* OD dimension: extension lines, dimension line, arrowheads */}
        <g className="anim-fade" style={{ animationDelay: "1.05s" }}>
          <line x1="90" y1="188" x2="90" y2="36" stroke={RULE} strokeWidth="0.75" />
          <line x1="370" y1="188" x2="370" y2="36" stroke={RULE} strokeWidth="0.75" />
          <line x1="90" y1="30" x2="370" y2="30" stroke={DIM} strokeWidth="1" />
          <polygon points="90,30 98,27.5 98,32.5" fill={DIM} />
          <polygon points="370,30 362,27.5 362,32.5" fill={DIM} />
          <text x="230" y="24" textAnchor="middle" fill={DIM} fontSize="11" className="font-mono">
            OD &#216; 350
          </text>
        </g>

        {/* ── sectioned side profile (weld-neck) ─────────────────── */}
        <g className="anim-fade" style={{ animationDelay: "0.95s" }}>
          {/* left half of the cut section */}
          <path
            d="M 90 400 L 120 400 L 152 340 L 178 340 L 178 436 L 90 436 Z"
            fill="url(#sect-hatch)" stroke={INK} strokeWidth="1.5" strokeLinejoin="round"
          />
          {/* right half */}
          <path
            d="M 282 340 L 308 340 L 340 400 L 370 400 L 370 436 L 282 436 Z"
            fill="url(#sect-hatch)" stroke={INK} strokeWidth="1.5" strokeLinejoin="round"
          />
          {/* raised face */}
          <rect x="122" y="436" width="216" height="6" fill="url(#sect-hatch)" stroke={INK} strokeWidth="1" />
          {/* bolt holes in section */}
          <rect x="98" y="400" width="16" height="36" fill={PAPER} stroke={INK} strokeWidth="1" />
          <rect x="346" y="400" width="16" height="36" fill={PAPER} stroke={INK} strokeWidth="1" />
        </g>

        {/* weld call-out */}
        <g className="anim-fade" style={{ animationDelay: "1.2s" }}>
          <line x1="112" y1="306" x2="120" y2="393" stroke={DIM} strokeWidth="1" />
          <polygon points="120,396 116.5,388.5 123.5,389.5" fill={DIM} />
          <text x="36" y="306" fill={DIM} fontSize="10" className="font-mono">
            3 mm fillet weld
          </text>
        </g>

        {/* bore dimension under the section */}
        <g className="anim-fade" style={{ animationDelay: "1.15s" }}>
          <line x1="178" y1="444" x2="178" y2="478" stroke={RULE} strokeWidth="0.75" />
          <line x1="282" y1="444" x2="282" y2="478" stroke={RULE} strokeWidth="0.75" />
          <line x1="178" y1="472" x2="282" y2="472" stroke={DIM} strokeWidth="1" />
          <polygon points="178,472 186,469.5 186,474.5" fill={DIM} />
          <polygon points="282,472 274,469.5 274,474.5" fill={DIM} />
          <text x="230" y="466" textAnchor="middle" fill={DIM} fontSize="11" className="font-mono">
            &#216; 104
          </text>
        </g>

        {/* plate thickness dimension */}
        <g className="anim-fade" style={{ animationDelay: "1.25s" }}>
          <line x1="372" y1="400" x2="404" y2="400" stroke={RULE} strokeWidth="0.75" />
          <line x1="372" y1="436" x2="404" y2="436" stroke={RULE} strokeWidth="0.75" />
          <line x1="398" y1="400" x2="398" y2="436" stroke={DIM} strokeWidth="1" />
          <polygon points="398,400 395.5,408 400.5,408" fill={DIM} />
          <polygon points="398,436 395.5,428 400.5,428" fill={DIM} />
          <text x="406" y="421" fill={DIM} fontSize="11" className="font-mono">
            T 36
          </text>
        </g>

        {/* ── title block ────────────────────────────────────────── */}
        <g className="anim-fade" style={{ animationDelay: "1.35s" }}>
          <line x1="10" y1="518" x2="450" y2="518" stroke={INK} strokeWidth="1" />
          <line x1="10" y1="542" x2="450" y2="542" stroke={INK} strokeWidth="0.75" />
          <line x1="10" y1="566" x2="450" y2="566" stroke={INK} strokeWidth="0.75" />
          <line x1="230" y1="518" x2="230" y2="590" stroke={INK} strokeWidth="0.75" />
          {[
            { x: 20, y: 518, label: "DRG NO.", value: "BS/FLG/WN-350" },
            { x: 240, y: 518, label: "STANDARD", value: "ASME B16.5" },
            { x: 20, y: 542, label: "MATERIAL", value: "A182 F316/L" },
            { x: 240, y: 542, label: "SCALE", value: "NTS" },
            { x: 20, y: 566, label: "FINISH", value: "RF \u2014 raised face" },
            { x: 240, y: 566, label: "BOLTS", value: "8 \u00D7 \u00D8 22" },
          ].map((cell) => (
            <g key={cell.label}>
              <text x={cell.x} y={cell.y + 10} fill={DIM} fontSize="8" className="font-mono">
                {cell.label}
              </text>
              <text
                x={cell.x} y={cell.y + 21}
                fill="#12181B" fontSize="11.5" fontWeight="600" className="font-mono"
              >
                {cell.value}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <figcaption className="sr-only">
        Reference drawing, not to scale. Weld-neck flange with raised face.
      </figcaption>
    </figure>
  );
}
