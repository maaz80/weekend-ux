import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const defaultContent = {
  eyebrow: "Featured",
  headingStart: "Featured",
  headingHighlight: "Resources",
  description: "Explore insights, tips, and courses created to help you build practical design skills.",
  promoTitle: "Take the next step in your design journey",
  promoDescription: "Learn how to make design that sells.",
  promoButtonText: "Book a Call",
  promoButtonLink: "/contact-us",
};

export default function FeaturedResources({ data, courses = [] }) {
  const content = { ...defaultContent, ...data };

  return (
    <section id="featured-resources" className="relative overflow-hidden bg-[#fffdf2] px-5 py-8 text-[#191919] sm:px-8 sm:py-10 lg:py-12">
      <Image
        src="/images/weekend-ux-decorative-diamond.webp"
        alt=""
        aria-hidden="true"
        width={130}
        height={130}
        className="pointer-events-none absolute -right-8 -top-12 w-28 opacity-80 sm:right-8 sm:top-0 sm:w-36"
      />

      <div className="relative mx-auto max-w-305">
        <header className="mx-auto mb-8 flex max-w-305 flex-col items-start text-left sm:mb-10">
          {/* <p className="eyebrow-tagline mb-2">{content.eyebrow}</p> */}
          <h2 className="font-playfair h2-section-title">
            {content.headingStart} <span className="italic text-[#f36600]">{content.headingHighlight}</span>
          </h2>
          <p className="para mt-2 text-neutral-600">
            {content.description}
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(240px,0.9fr)] lg:gap-8">
          <div className="space-y-3">
            {courses.map((course, index) => (
              <Link
                key={course.slug || course._id || `${course.title}-${index}`}
                href={`/courses/${course.slug || course._id}`}
                className="group flex min-h-90 flex-col overflow-hidden rounded-xl border border-[#e9e5d8] bg-white/35 shadow-[0_3px_10px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-md md:min-h-[106px] md:flex-row"
              >
                <Image
                  src={course.image || "/images/weekend-ux-program-image-template.webp"}
                  alt={course.alt || course.title || "Course"}
                  width={360}
                  height={200}
                  className="h-50 w-full shrink-0 object-cover md:h-auto md:w-[44%]"
                  sizes="(max-width: 767px) 90vw, 280px"
                  unoptimized
                />
                <div className="flex min-w-0 flex-1 items-center justify-between gap-2 px-3 py-0 sm:px-4 sm:py-3">
                  <div className="min-w-0">
                    <h3 className="font-urbanist text-[20px] font-bold leading-6 text-[#252525] md:text-[28px] md:leading-8 lg:text-[26px]">
                      {course.title}
                    </h3>
                    <p className="mt-2 font-urbanist para text-zinc-800">
                      Starts: {course.startdate || "Contact us for upcoming batches"}
                      <br />
                      Duration: {course.duration || "Flexible"}
                    </p>
                  </div>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-neutral-500/70 text-neutral-700 transition group-hover:border-[#f3a800] group-hover:bg-[#ffd000]">
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
            {courses.length === 0 && (
              <p className="rounded-xl border border-[#e9e5d8] bg-white/50 p-6 text-sm text-neutral-600">
                Courses will be featured here soon.
              </p>
            )}
          </div>

          <aside className="relative isolate flex min-h-[260px] flex-col items-start justify-end overflow-hidden rounded-2xl bg-black p-6 text-white sm:min-h-[300px] sm:p-7">
            <div
              className="absolute inset-0 -z-10 bg-cover bg-center opacity-70"
              style={{
                backgroundImage:
                  "url('/images/weekend-ux-training-options-card-bg.webp')",
              }}
            />
            <h3 className="max-w-[240px] font-urbanist text-lg font-bold leading-snug text-white sm:text-2xl">
              {content.promoTitle}
            </h3>
            <p className="body-text mt-2 text-white/75">
              {content.promoDescription}
            </p>
            <Link
              href={content.promoButtonLink || "/contact-us"}
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#ffd000] px-4 font-urbanist text-sm font-semibold text-[#191919] transition hover:bg-[#ffe05a]"
            >
              {content.promoButtonText}
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
