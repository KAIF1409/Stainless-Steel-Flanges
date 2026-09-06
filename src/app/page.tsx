import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductOverview from "@/components/ProductOverview";
import GradeSelector from "@/components/GradeSelector";
import SpecTable from "@/components/SpecTable";
import Certifications from "@/components/Certifications";
import ExportShipping from "@/components/ExportShipping";
import EnquiryForm from "@/components/EnquiryForm";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Stainless Steel Flanges",
  description:
    "ASTM A182 / ASME B16.5 stainless steel flanges in grades 304, 316 and 316L, weld-neck, slip-on, blind, socket-weld and lap-joint types, sizes 1/2\" to 24\" NB, pressure classes 150 to 2500.",
  brand: {
    "@type": "Brand",
    name: "Bhansali Stainless",
  },
  material: ["Stainless Steel 304", "Stainless Steel 316", "Stainless Steel 316L"],
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Standard",
      value: "ASTM A182 / ASME B16.5",
    },
    {
      "@type": "PropertyValue",
      name: "Documentation",
      value: "EN 10204 3.1",
    },
  ],
};

/* Document-control strip: the page reads as a controlled spec sheet,
   so it opens with a doc number and revision, the way drawings do. */
function DocStrip() {
  return (
    <div className="border-b border-steel-200">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 px-4 py-2 font-mono text-[11px] text-steel-600 md:px-8">
        <span>Spec sheet &mdash; stainless steel flanges</span>
        <span>doc. BS/FLG/SS-01 &middot; rev. C</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <DocStrip />
        <Hero />
        <ProductOverview />
        <GradeSelector />
        <SpecTable />
        <Certifications />
        <ExportShipping />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  );
}
