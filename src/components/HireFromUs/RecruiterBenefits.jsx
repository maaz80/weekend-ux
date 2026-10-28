import { Lightbulb } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CourseBenefitCard from "@/components/Course Details/CourseBenefitCard";

const benefits = [
  { title: "Lateral hiring at Zero Cost", description: "Build your ideal tech team with skilled professionals at no cost." },
  { title: "Lateral hiring at Zero Cost", description: "Build your ideal tech team with skilled professionals at no cost." },
  { title: "Lateral hiring at Zero Cost", description: "Build your ideal tech team with skilled professionals at no cost." },
  // { title: "Lateral hiring at Zero Cost", description: "Build your ideal tech team with skilled professionals at no cost." },
];

const defaultContent = {
  headingStart: "Why Our Students Are Favored By",
  headingHighlight: "Recruiters",
  description: "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.",
  benefits,
};

export default function RecruiterBenefits({ data }) {
  const content = {
    ...defaultContent,
    ...data,
    benefits: Array.isArray(data?.benefits) ? data.benefits : defaultContent.benefits,
  };

  return (
    <section className="relative isolate overflow-hidden px-0 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-[76px]">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/weekend-ux-why-our-students-hiring-bg.webp')" }} />
      <div className="custom-width mx-auto px-4 sm:px-6 lg:px-16">
        <SectionHeading
          className="mb-8 lg:mb-9"
          heading={<>{content.headingStart} <span className="font-semibold italic text-[#f36600]">{content.headingHighlight}</span></>}
          description={content.description}
        />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-9 lg:grid-cols-3 lg:gap-8">
          {content.benefits.map((benefit, index) => (
            <CourseBenefitCard
              key={index}
              icon={Lightbulb}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
