import FlangeDiagram from "./FlangeDiagram";

export default function Hero() {
  return (
    <section
      id="top"
      className="doc-grid bg-steel-900 text-paper"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,460px)] md:items-center md:gap-12 md:px-8 md:py-20">
        <div>
          <p className="font-mono text-xs text-steel-300">
            Stainless steel flanges &mdash; export division
          </p>
          <h1
            id="hero-heading"
            className="mt-4 max-w-[24ch] text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl"
          >
            Flanges built to spec, documented before they ship.
          </h1>
          <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-steel-300">
            ASTM A182 / ASME B16.5 stainless steel flanges in grades 304, 316
            and 316L, manufactured in India and exported to Saudi Arabia, the
            UAE and the wider GCC for oil &amp; gas, petrochemical and
            construction projects.
          </p>

          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-steel-700 pt-4">
            <div>
              <dt className="font-mono text-[11px] text-steel-300">Standard</dt>
              <dd className="mt-1 text-sm font-medium">ASTM A182</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] text-steel-300">
                Documentation
              </dt>
              <dd className="mt-1 text-sm font-medium">EN 10204 3.1</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] text-steel-300">Dispatch</dt>
              <dd className="mt-1 text-sm font-medium">15&ndash;20 days</dd>
            </div>
          </dl>

          <div className="mt-9">
            <a
              href="#enquiry"
              className="focus-ring inline-flex h-12 items-center rounded-[3px] bg-paper px-7 text-sm font-semibold text-steel-900 hover:bg-white"
            >
              Request an RFQ
            </a>
          </div>
        </div>

        <div className="w-full max-w-[460px] justify-self-center md:justify-self-end">
          <FlangeDiagram />
        </div>
      </div>
    </section>
  );
}
