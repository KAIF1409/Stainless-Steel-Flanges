export default function ProductOverview() {
  return (
    <section className="border-b border-steel-200" aria-labelledby="overview-heading">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="overview-heading" className="text-xl font-semibold text-steel-900 md:text-2xl">
            Product overview
          </h2>
          <span className="hidden shrink-0 font-mono text-[11px] text-steel-600 sm:block">
            scope of supply
          </span>
        </div>
        <div className="mt-5 max-w-[64ch]">
          <p className="text-[15px] leading-relaxed text-steel-700">
            Forged and machined to ASTM A182 / ASME B16.5 dimensional standards
            in weld-neck, slip-on, blind, socket-weld and lap-joint types. Each
            batch is produced from certified mill-sourced raw material and
            tested for chemical composition, mechanical strength and
            dimensional accuracy before packing.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-steel-700">
            Sizes run from &frac12;&Prime; NB to 24&Prime; NB across pressure
            classes 150 to 2500 &mdash; suited to pipelines, pressure vessels
            and structural connections in oil &amp; gas, petrochemical,
            desalination and marine infrastructure projects.
          </p>
          <p className="mt-5 font-mono text-[11px] text-steel-600">
            process route: forged &middot; machined &middot; tested &middot; packed
          </p>
        </div>
      </div>
    </section>
  );
}
