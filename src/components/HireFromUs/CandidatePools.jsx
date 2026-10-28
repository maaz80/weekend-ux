import Link from "next/link";

const defaultContent = {
  eyebrow: "Explore Candidate Pools",
  headingStart: "Explore",
  headingHighlight: "Candidates",
  headingEnd: "Across Skill Pools",
  actionLabel: "Explore Candidates",
  actionHref: "#candidate-search",
  pools: [
    {
      value: "340+",
      valueName: "Beginner Designers",
      description: "Across beginner, intermediate & advanced courses since 2019",
    },
    {
      value: "100+",
      valueName: "Intermediate Designers",
      description: "Across beginner, intermediate & advanced courses since 2019",
    },
    {
      value: "10+",
      valueName: "Senior Designers",
      description: "We've been offered bigger. We've always said no. Small is big.",
    },
    {
      value: "5+",
      valueName: "Expert Designers",
      description: "Rated by students post-batch. No anonymous reviews, no inflation.",
    },
  ],
};

export default function CandidatePools({ data }) {
  const content = {
    ...defaultContent,
    ...data,
    pools: Array.isArray(data?.pools) ? data.pools : defaultContent.pools,
  };

  return (
    <section className="relative overflow-hidden" data-navbar-light="true" id="candidate-pools">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/weekend-ux-details-bg-for-hiring-us.webp')" }}
      />
      <div className="relative z-10 mx-auto max-w-360 px-5 py-14 md:px-10 md:py-20 xl:px-16">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_620px]">
          <div className="relative">
            <p className="mb-5 font-inter text-[10px] font-medium uppercase tracking-[0.45em] text-white">
              {content.eyebrow}
            </p>
            <h2 className="max-w-150 font-playfair text-[38px] leading-12 text-[#ffc400] md:text-[56px] md:leading-16">
              {content.headingStart}{" "}
              {content.headingHighlight && (
                <span className="italic text-white">{content.headingHighlight}</span>
              )}
              {content.headingEnd && <> {content.headingEnd}</>}
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {content.pools.map((pool, index) => (
              <article
                key={`${pool.valueName}-${index}`}
                className="rounded-xl bg-linear-to-b from-black/10 to-white/20 p-7 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-start text-[42px] font-semibold leading-none text-white md:text-center">
                  {pool.value}
                </h3>
                <p className="mt-2 text-start font-medium text-white md:text-center">
                  {pool.valueName}
                </p>
                <div className="my-5 h-px bg-white/10" />
                <p className="text-start text-sm leading-6 text-white/65 md:text-center">
                  {pool.description}
                </p>
                {content.actionLabel && (
                  <Link
                    href={content.actionHref || defaultContent.actionHref}
                    className="mt-5 inline-flex min-h-10 w-full items-center justify-center rounded-md bg-[#ffd000] px-4 text-sm font-semibold text-neutral transition hover:bg-[#f3c400]"
                  >
                    {content.actionLabel}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
