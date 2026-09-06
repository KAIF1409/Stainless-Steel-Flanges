"use client";

import { useRef, useState } from "react";

type Grade = {
  id: string;
  label: string;
  standard: string;
  composition: string;
  resistance: string;
  typicalUse: string;
};

const GRADES: Grade[] = [
  {
    id: "304",
    label: "SS 304",
    standard: "UNS S30400",
    composition: "18% Cr / 8% Ni austenitic stainless steel",
    resistance:
      "Good general corrosion resistance; suited to moderate atmospheric and freshwater exposure.",
    typicalUse: "Construction, food processing, general industrial piping.",
  },
  {
    id: "316",
    label: "SS 316",
    standard: "UNS S31600",
    composition: "16% Cr / 10% Ni / 2% Mo austenitic stainless steel",
    resistance:
      "Molybdenum addition gives markedly better resistance to chloride pitting than 304 \u2014 the standard choice for coastal Gulf installations.",
    typicalUse: "Oil & gas, marine, desalination, chemical processing.",
  },
  {
    id: "316L",
    label: "SS 316L",
    standard: "UNS S31603",
    composition: "Low-carbon variant of 316 (\u2264 0.03% C)",
    resistance:
      "Reduced carbon limits carbide precipitation during welding, preserving corrosion resistance at weld joints.",
    typicalUse: "Welded assemblies, petrochemical plant piping, sour service.",
  },
];

const ROW_CLASS =
  "grid gap-x-8 gap-y-1 border-b border-steel-200 py-4 last:border-b-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:py-3.5";
const DT_CLASS = "pt-0.5 font-mono text-[11px] text-steel-600";
const DD_CLASS = "text-sm leading-relaxed text-steel-700";

export default function GradeSelector() {
  const [active, setActive] = useState<Grade>(GRADES[1]);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleTabKeys(e: React.KeyboardEvent<HTMLDivElement>) {
    const idx = GRADES.findIndex((g) => g.id === active.id);
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % GRADES.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + GRADES.length) % GRADES.length;
    if (next === -1) return;
    e.preventDefault();
    setActive(GRADES[next]);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="border-b border-steel-200" aria-labelledby="grades-heading">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="grades-heading" className="text-xl font-semibold text-steel-900 md:text-2xl">
            Grade variants
          </h2>
          <span className="hidden shrink-0 font-mono text-[11px] text-steel-600 sm:block">
            UNS designations
          </span>
        </div>
        <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-steel-700">
          Select a grade to compare composition and where it&rsquo;s typically
          specified.
        </p>

        <div
          role="tablist"
          aria-label="Stainless steel grade"
          onKeyDown={handleTabKeys}
          className="mt-7 flex border-b border-steel-200"
        >
          {GRADES.map((g, i) => (
            <button
              key={g.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`grade-tab-${g.id}`}
              aria-selected={active.id === g.id}
              aria-controls="grade-panel"
              tabIndex={active.id === g.id ? 0 : -1}
              onClick={() => setActive(g)}
              className={`focus-ring -mb-px border-b-2 px-5 py-3 font-mono text-sm ${
                active.id === g.id
                  ? "border-signal font-semibold text-steel-900"
                  : "border-transparent text-steel-600 hover:text-steel-900"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div
          key={active.id}
          role="tabpanel"
          id="grade-panel"
          aria-labelledby={`grade-tab-${active.id}`}
          className="anim-swap min-h-[380px] border-x border-b border-steel-200 bg-white px-5 py-2 sm:min-h-[248px] md:px-6"
        >
          <dl>
            <div className={ROW_CLASS}>
              <dt className={DT_CLASS}>Standard designation</dt>
              <dd className="font-mono text-lg font-semibold text-steel-900">
                {active.standard}
              </dd>
            </div>
            <div className={ROW_CLASS}>
              <dt className={DT_CLASS}>Composition</dt>
              <dd className={DD_CLASS}>{active.composition}</dd>
            </div>
            <div className={ROW_CLASS}>
              <dt className={DT_CLASS}>Corrosion resistance</dt>
              <dd className={DD_CLASS}>{active.resistance}</dd>
            </div>
            <div className={ROW_CLASS}>
              <dt className={DT_CLASS}>Typical use</dt>
              <dd className={DD_CLASS}>{active.typicalUse}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
