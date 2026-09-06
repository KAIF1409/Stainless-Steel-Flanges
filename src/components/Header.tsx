import { Phone, MessageCircle, Mail } from "lucide-react";

const PHONE_DISPLAY = "+91 98200 00000";
const PHONE_TEL = "+919820000000";
const WHATSAPP_NUMBER = "919820000000";
const EMAIL = "export@bhansalistainless.com";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-steel-200 bg-paper">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 md:h-16 md:gap-4 md:px-8">
        <a
          href="#top"
          className="focus-ring flex min-h-[44px] flex-col justify-center"
        >
          <span className="flex items-baseline gap-2">
            <span className="font-heading text-base font-semibold tracking-tight text-steel-900 sm:text-lg">
              Bhansali Stainless
            </span>
            <span className="hidden font-mono text-[11px] text-steel-600 sm:inline">
              Flanges Division
            </span>
          </span>
        </a>

        <nav
          aria-label="Direct contact"
          className="flex items-center gap-1.5 sm:gap-2"
        >
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label={`Call us at ${PHONE_DISPLAY}`}
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-[3px] border border-steel-200 text-steel-700 hover:border-steel-600 hover:text-steel-900 md:w-auto md:gap-1.5 md:px-3"
          >
            <Phone size={16} strokeWidth={2} aria-hidden="true" />
            <span className="hidden text-sm md:inline">{PHONE_DISPLAY}</span>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello, I'd like a quote for stainless steel flanges."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message us on WhatsApp"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-[3px] border border-steel-200 text-steel-700 hover:border-steel-600 hover:text-steel-900 md:w-auto md:gap-1.5 md:px-3"
          >
            <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
            <span className="hidden text-sm md:inline">WhatsApp</span>
          </a>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(
              "Stainless Steel Flanges \u2014 Quote Request"
            )}`}
            aria-label={`Email us at ${EMAIL}`}
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-[3px] bg-signal text-white hover:bg-signal-dark md:w-auto md:gap-1.5 md:px-3"
          >
            <Mail size={16} strokeWidth={2} aria-hidden="true" />
            <span className="hidden text-sm md:inline">Email us</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER, EMAIL };
