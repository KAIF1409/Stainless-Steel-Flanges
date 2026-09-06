"use client";

import { useState, FormEvent } from "react";

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "productInterest", string>>;

const PRODUCT_OPTIONS = [
  "Weld Neck Flanges",
  "Slip-On Flanges",
  "Blind Flanges",
  "Socket Weld Flanges",
  "Lap Joint Flanges",
  "Other / not sure yet",
];

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function validate(values: {
  name: string;
  email: string;
  phone: string;
  productInterest: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Enter your full name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (values.phone.trim().length < 7) {
    errors.phone = "Enter a valid phone number with country code.";
  }
  if (!values.productInterest) {
    errors.productInterest = "Select the product you're enquiring about.";
  }
  return errors;
}

const LABEL = "font-mono text-[11px] font-medium text-steel-600";
const INPUT =
  "focus-ring mt-1 h-11 w-full rounded-[3px] border border-steel-200 bg-white px-3 text-sm text-steel-900 scroll-mt-24";
const ERROR = "mt-1 text-xs text-red-600";

export default function EnquiryForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    productInterest: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [ref, setRef] = useState("");

  const handleChange =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
    };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Submission failed");

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "generate_lead",
        form_name: "flange_enquiry",
        product_interest: values.productInterest,
      });

      setRef(`RFQ-${Date.now().toString(36).toUpperCase()}`);
      setStatus("success");
      setValues({ name: "", email: "", phone: "", productInterest: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="enquiry"
      className="border-b border-steel-200 bg-white scroll-mt-14 md:scroll-mt-16"
      aria-labelledby="enquiry-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:gap-16">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h2
                id="enquiry-heading"
                className="text-xl font-semibold text-steel-900 md:text-2xl"
              >
                Request a quote
              </h2>
              <span className="hidden shrink-0 font-mono text-[11px] text-steel-600 sm:block">
                response &lt; 1 business day
              </span>
            </div>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-steel-700">
              Send your specification &mdash; grade, size, pressure class and
              quantity &mdash; and we&rsquo;ll respond with a quote and lead
              time within one business day. For urgent enquiries, call or
              WhatsApp using the details in the header.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="h-fit rounded-[3px] border border-steel-200 bg-paper p-5 md:p-6"
          >
            {status === "success" ? (
              <div role="status" className="py-4">
                <p className="font-mono text-[11px] text-signal-dark">received</p>
                <p className="mt-2 font-heading text-lg font-semibold text-steel-900">
                  Enquiry logged as {ref}.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-steel-700">
                  We&rsquo;ll get back to you within one business day.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className={LABEL}>
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={INPUT}
                  />
                  {errors.name && (
                    <p id="name-error" className={ERROR}>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={LABEL}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={INPUT}
                  />
                  {errors.email && (
                    <p id="email-error" className={ERROR}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className={LABEL}>
                    Phone (with country code)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={handleChange("phone")}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    placeholder="+966 5xxxxxxxx"
                    className={INPUT}
                  />
                  {errors.phone && (
                    <p id="phone-error" className={ERROR}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="productInterest" className={LABEL}>
                    Product interest
                  </label>
                  <select
                    id="productInterest"
                    name="productInterest"
                    value={values.productInterest}
                    onChange={handleChange("productInterest")}
                    aria-invalid={Boolean(errors.productInterest)}
                    aria-describedby={
                      errors.productInterest ? "product-error" : undefined
                    }
                    className={INPUT}
                  >
                    <option value="">Select a product</option>
                    {PRODUCT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.productInterest && (
                    <p id="product-error" className={ERROR}>
                      {errors.productInterest}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-600" role="alert">
                    Something went wrong sending your enquiry. Please try
                    again, or contact us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="focus-ring mt-2 inline-flex h-12 items-center justify-center rounded-[3px] bg-steel-900 px-6 text-sm font-semibold text-paper hover:bg-steel-700 disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending\u2026" : "Send enquiry"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
