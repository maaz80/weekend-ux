import { Building2, Lightbulb, Mail, Network, Phone, UserRound } from "lucide-react";

const fields = [
  { icon: UserRound, type: "text" },
  { icon: Mail, type: "email" },
  { icon: Building2, type: "text" },
  { icon: Phone, type: "tel" },
];

const defaultContent = {
  eyebrow: "Hire From Us",
  heading: "Hire Job Ready Curated Candidates at Zero Cost",
  buttonText: "Start Your Journey",
  intro: "Weekend UX is a hands-on design school, in-person classes and structured recordings built for people who learn by doing, not watching.",
  benefits: [
    "Experience World Class Candidates",
    "Reduce your hiring time by 80%",
  ],
};

const formContent = {
  title: "Hire Job Ready Professionals At No Cost",
  buttonText: "Get In Touch",
  termsText: "By providing your contact details, you agree to our Terms of Use & Privacy Policy",
  fields: [
    { label: "Full Name", placeholder: "John Doe" },
    { label: "Email", placeholder: "example@email.com" },
    { label: "Company Name", placeholder: "Your company" },
    { label: "Mobile Number", placeholder: "Enter 10 digit mobile number" },
  ],
};

function HiringEnquiryForm() {
  return (
    <form action="/contact-us" className="relative z-10 w-full max-w-97.5 rounded-xl bg-white px-6 py-7 text-[#252525] shadow-[0_18px_60px_rgba(0,0,0,.22)] sm:px-8">
      <h2 className="mb-5 text-center font-urbanist text-xl font-bold leading-tight sm:text-[22px]">
        {formContent.title}
      </h2>
      <div className="space-y-3.5">
        {fields.map(({ icon: Icon, type }, index) => {
          const field = formContent.fields[index];
          return (
            <label key={field.label} className="block text-[13px] font-medium">
              {field.label}
              <span className="mt-1.5 flex h-10 items-center gap-2 rounded border border-[#e7e7e7] px-2.5 focus-within:border-[#e4b500]">
                <Icon size={15} strokeWidth={1.8} className="shrink-0 text-[#777]" aria-hidden="true" />
                <input required type={type} placeholder={field.placeholder} className="min-w-0 flex-1 bg-transparent text-sm font-normal outline-none placeholder:text-[#aaa]" />
              </span>
            </label>
          );
        })}
      </div>
      <button type="submit" className="mt-5 h-11 w-full rounded-md bg-[#ffd000] text-sm font-semibold text-[#161616] transition hover:bg-[#f4c300]">
        {formContent.buttonText}
      </button>
      <label className="mt-3 flex items-start gap-2 text-[10px] leading-4 text-[#858585]">
        <input type="checkbox" required defaultChecked className="mt-0.5 accent-[#f3c400]" />
        <span>{formContent.termsText}</span>
      </label>
    </form>
  );
}

export default function HireHero({ data }) {
  const content = {
    ...defaultContent,
    ...data,
    benefits: Array.isArray(data?.benefits) ? data.benefits : defaultContent.benefits,
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#ffd000]">
      <div data-navbar-light="true" className="absolute inset-x-0 top-0 h-122.5 bg-cover bg-center sm:h-135 lg:h-127.5" style={{ backgroundImage: "linear-gradient(90deg,rgba(0,0,0,.37),rgba(0,0,0,.48)),url('/images/weekend-ux-contact-hero-bg.webp')" }} />

      <div className="relative mx-auto grid max-w-315 items-start gap-9 pb-10 pt-28 sm:px-8 sm:pt-32 lg:min-h-127.5 lg:grid-cols-[1.2fr_.8fr] lg:gap-12 lg:pb-16 lg:pt-32 px-4">
        <div className="relative z-10 max-w-165 pt-4 text-white lg:pt-8">
          <p className="mb-3 font-inter text-[10px] font-semibold uppercase tracking-[.4em] text-[#ffd000] sm:text-xs">{content.eyebrow}</p>
          <h1 className="max-w-165 font-playfair text-[36px] leading-[1.12] sm:text-5xl lg:text-[56px]">
            {content.heading}
          </h1>
          <a href="#candidate-search" className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-[#ffd000] px-6 text-sm font-medium text-[#191919] transition hover:bg-[#f3c400]">
            {content.buttonText}
          </a>
        </div>
        <div className="flex justify-center lg:absolute lg:right-16 lg:top-32 lg:z-20 lg:w-97.5 lg:justify-end">
          <HiringEnquiryForm />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-315 px-5 pb-12 pt-6 md:pt-26 sm:px-8 sm:pb-14 lg:mx-0 lg:max-w-237.5 lg:px-26 lg:pb-26">
        <div className="grid lg:grid-cols-1">
          <div className="flex flex-col gap-8">
            <p className="max-w-160 font-playfair text-[19px] leading-[1.55] sm:text-[22px] md:text-[26px] text-[#161616]">
              {content.intro}
            </p>
            <div className="flex flex-col gap-5 text-[#171717] sm:flex-row sm:items-center sm:gap-8">
              <div className="flex items-center gap-3 font-playfair text-lg font-medium leading-tight sm:max-w-95 lg:text-[28px]">
                <Lightbulb className="h-9 w-9 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                <span>{content.benefits[0] || ""}</span>
              </div>
              <div className="hidden h-12 w-px bg-black/40 sm:block" />
              <div className="flex items-center gap-3 font-playfair text-lg font-medium leading-tight sm:max-w-130 lg:text-[28px]">
                <Network className="h-9 w-9 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                <span>{content.benefits[1] || ""}</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
