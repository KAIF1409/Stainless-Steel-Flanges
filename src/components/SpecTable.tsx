import { MoveHorizontal } from "lucide-react";

const ROWS = [
  { type: "Weld Neck (WN)", size: "\u00bd\u2033 \u2013 24\u2033 NB", pressure: "150 \u2013 2500", face: "RF / RTJ" },
  { type: "Slip-On (SO)", size: "\u00bd\u2033 \u2013 24\u2033 NB", pressure: "150 \u2013 1500", face: "RF / FF" },
  { type: "Blind (BL)", size: "\u00bd\u2033 \u2013 24\u2033 NB", pressure: "150 \u2013 2500", face: "RF / RTJ" },
  { type: "Socket Weld (SW)", size: "\u00bd\u2033 \u2013 4\u2033 NB", pressure: "150 \u2013 1500", face: "RF" },
  { type: "Lap Joint (LJ)", size: "\u00bd\u2033 \u2013 24\u2033 NB", pressure: "150 \u2013 1500", face: "RF" },
];

const HEAD_CELL =
  "border-b-2 border-steel-900 px-4 py-3 font-medium text-steel-900";

export default function SpecTable() {
  return (
    <section className="border-b border-steel-200" aria-labelledby="specs-heading">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="specs-heading" className="text-xl font-semibold text-steel-900 md:text-2xl">
            Specifications
          </h2>
          <span className="hidden shrink-0 font-mono text-[11px] text-steel-600 sm:block">
            ASME B16.5
          </span>
        </div>

        <p className="mt-5 font-mono text-xs text-steel-600">
          Flange types, size ranges and pressure classes
        </p>

        <div className="spec-scroll mt-3 border border-steel-200 bg-white">
          <table className="w-full min-w-[620px] border-collapse text-sm">
            <caption className="sr-only">
              Flange type, size range, pressure class and face type specifications
            </caption>
            <thead>
              <tr className="text-left">
                <th scope="col" className={`sticky left-0 z-10 bg-white ${HEAD_CELL}`}>
                  Flange type
                </th>
                <th scope="col" className={`${HEAD_CELL} text-right`}>
                  Size range
                </th>
                <th scope="col" className={`${HEAD_CELL} text-right`}>
                  Pressure class
                </th>
                <th scope="col" className={`${HEAD_CELL} text-right`}>
                  Face type
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.type} className="border-b border-steel-200 last:border-b-0">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-4 py-3 text-left font-medium text-steel-900"
                  >
                    {r.type}
                  </th>
                  <td className="px-4 py-3 text-right tabular-nums text-steel-700">{r.size}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-steel-700">{r.pressure}</td>
                  <td className="px-4 py-3 text-right text-steel-700">{r.face}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          data-spec-hint
          className="mt-2 flex items-center gap-1.5 font-mono text-[11px] text-steel-600 md:hidden"
        >
          <MoveHorizontal size={14} strokeWidth={2} aria-hidden="true" />
          swipe to see pressure class and face type
        </p>

        <p className="mt-3 max-w-[64ch] text-xs leading-relaxed text-steel-600">
          Standard: ASTM A182 / ASME B16.5. Custom sizes and non-standard
          pressure classes manufactured on request.
        </p>
      </div>
    </section>
  );
}
