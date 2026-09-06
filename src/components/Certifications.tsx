const DOCS = [
  {
    code: "ASTM A182",
    note: "Forged flange material standard",
    issuance: "per heat / batch",
  },
  {
    code: "ASME B16.5",
    note: "Dimensional standard, NPS \u00bd\u201324",
    issuance: "every consignment",
  },
  {
    code: "ISO 9001:2015",
    note: "Quality management system",
    issuance: "certificate on request",
  },
  {
    code: "EN 10204 3.1",
    note: "Mill test certificate, heat-number traceable",
    issuance: "every consignment",
  },
];

export default function Certifications() {
  return (
    <section
      className="border-b border-steel-200 bg-steel-200/30"
      aria-labelledby="certs-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="certs-heading" className="text-xl font-semibold text-steel-900 md:text-2xl">
            Certifications &amp; standards
          </h2>
          <span className="hidden shrink-0 font-mono text-[11px] text-steel-600 sm:block">
            documentation
          </span>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
            <p className="max-w-[64ch] text-[15px] leading-relaxed text-steel-700">
              Every consignment ships with documentation mapped to these
              standards. Certificate numbers are issued per shipment on
              request.
            </p>
            <ul className="mt-6 border-b border-steel-300/60">
              {DOCS.map((c) => (
                <li
                  key={c.code}
                  className="grid gap-x-6 gap-y-0.5 border-t border-steel-300/60 py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)_10rem] sm:items-baseline"
                >
                  <span className="font-mono text-sm font-semibold text-steel-900">
                    {c.code}
                  </span>
                  <span className="text-sm text-steel-700">{c.note}</span>
                  <span className="font-mono text-[11px] text-steel-600 sm:text-right">
                    {c.issuance}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* inspection stamp — the one ornament this section earns */}
          <div className="self-start border-4 border-double border-signal px-5 py-4 font-mono text-signal-dark">
            <p className="text-sm font-semibold">EN 10204 &mdash; 3.1</p>
            <p className="mt-1 text-[11px]">inspection certificate</p>
            <p className="text-[11px]">supplied per consignment</p>
          </div>
        </div>
      </div>
    </section>
  );
}
