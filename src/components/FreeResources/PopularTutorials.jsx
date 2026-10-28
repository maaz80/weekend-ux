import Image from "next/image";
import Link from "next/link";
import WritingImage from "@/app/assets/weekend-ux-contact-decorative-image.webp";

const defaultContent = {
  headingStart: "Popular",
  headingHighlight: "Tutorials",
  tutorials: [
    {
      title: "Why should a learner prefer to study on campus",
      image: "/images/hero-bg.webp",
      link: "/blog",
    },
    {
      title: "Why should a learner prefer to study on campus",
      image: "/images/hero-bg.webp",
      link: "/blog",
    },
    {
      title: "Why should a learner prefer to study on campus rather than other options",
      image: WritingImage,
      link: "/blog",
    },
  ],
};

export default function PopularTutorials({ data }) {
  const content = {
    ...defaultContent,
    ...data,
    tutorials: Array.isArray(data?.tutorials) ? data.tutorials : defaultContent.tutorials,
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#ffb900] px-5 py-12 text-[#17120a] sm:px-8 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('/images/weekend-ux-hiring-stats-bg.webp')",
        }}
      />
      <Image
        src="/images/weekend-ux-decorative-diamond.webp"
        alt=""
        aria-hidden="true"
        width={140}
        height={140}
        className="pointer-events-none absolute -right-5 -top-9 w-24 opacity-80 sm:right-6 sm:top-1 sm:w-32"
      />

      <div className="mx-auto max-w-305">
        <h2 className="mb-5 font-playfair h2-section-title sm:mb-7">
          <span className="italic text-white">{content.headingStart}</span> {content.headingHighlight}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {content.tutorials.map((tutorial, index) => (
            <Link
              href={tutorial.link || "/blog"}
              key={`${tutorial.title}-${index}`}
              className="group block"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-black/10 shadow-md">
                <Image
                  src={tutorial.image}
                  alt={tutorial.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <h3 className="h3-card-title mt-2">
                {tutorial.title}
              </h3>
            </Link>
          ))}
          {content.tutorials.length === 0 && (
            <p className="text-sm text-[#17120a]/75">Tutorials will be added soon.</p>
          )}
        </div>
      </div>
    </section>
  );
}
