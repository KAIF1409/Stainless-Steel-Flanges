const TERMS = [
  { label: "Incoterms", value: "FOB Mumbai / Nhava Sheva, CIF on request" },
  { label: "Packing", value: "Wooden crates or pallets, export-grade" },
  { label: "Ports served", value: "Jeddah, Dammam, Jebel Ali, Abu Dhabi" },
  { label: "Lead time", value: "15\u201320 days ex-works after PO confirmation" },
  { label: "Payment terms", value: "LC at sight, or 30% advance / 70% against BL copy" },
  { label: "MOQ", value: "No minimum \u2014 mixed-size consignments accepted" },
];

export default function ExportShipping() {
  return (
    <section className="border-b border-steel-200" aria-labelledby="export-heading">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2
            id="export-heading"
            className="text-xl font-semibold text-steel-900 md:text-2xl"
          >
            Export &amp; shipping
          </h2>
          <span className="hidden shrink-0 font-mono text-[11px] text-steel-600 sm:block">
            Incoterms 2020
          </span>
        </div>
        <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-steel-700">
          We ship regularly to Saudi Arabia, the UAE and the wider GCC.
          Documentation and packing are prepared for customs clearance at each
          destination port.
        </p>

        <dl className="mt-6 max-w-[64ch] border-b border-steel-200">
          {TERMS.map((t) => (
            <div
              key={t.label}
              className="grid gap-x-8 gap-y-0.5 border-t border-steel-200 py-3 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-baseline"
            >
              <dt className="font-mono text-[11px] text-steel-600">{t.label}</dt>
              <dd className="text-sm font-medium text-steel-900">{t.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
