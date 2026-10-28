import Link from "next/link";

const defaultHero = {
  subheading: "Free Resources",
  heading: "Explore Free UI/UX Design Resources",
  buttonText: "Explore Resources",
};

export default function FreeResourcesHero({ data }) {
  const hero = { ...defaultHero, ...data };

  return (
    <section
      data-navbar-light="true"
      className="relative overflow-hidden bg-cover bg-center px-4 pb-20 pt-42 text-white sm:pb-24 sm:pt-36 md:px-6 lg:pb-32 lg:pt-40"
      style={{ backgroundImage: "url('/images/weekend-ux-corporate-training-hero-bg.webp')" }}
    >
      <div className="relative z-10 mx-auto flex max-w-305 flex-col items-start text-left">
        <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.45em] text-[#ffd000] sm:text-sm">
          {hero.subheading}
        </p>
        <h1 className="whitespace-pre-line font-playfair text-[32px] leading-[1.12] tracking-tight sm:text-[46px] md:text-[56px] lg:text-[62px]">
          {hero.heading}
        </h1>
        <Link
          href="#featured-resources"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-[#ffd000] px-8 font-urbanist text-sm font-bold tracking-wide text-[#161616] shadow-[0_8px_25px_rgba(255,208,0,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#ffc000] sm:mt-10 sm:h-13 sm:px-10 sm:text-base"
        >
          {hero.buttonText}
        </Link>
      </div>
    </section>
  );
}
