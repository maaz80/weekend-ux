const defaultContent = {
  eyebrow: "Hiring Stats",
  headingStart: "Guaranteed Candidates For Multiple",
  headingHighlight: "Hiring",
  headingEnd: "Needs.",
  chartTitle: "Work Experience",
  experience: [
    { label: "Freshers", value: 18 },
    { label: "0-2 years", value: 22 },
    { label: "2-5 Years", value: 28 },
    { label: "5+ years", value: 32 },
  ],
};

const chartColors = ["#ffffff", "#2563eb", "#09090b", "#b91c1c", "#16a34a", "#9333ea", "#f97316", "#0891b2"];

function ExperienceCard({ title, experience }) {
  const total = experience.reduce((sum, item) => sum + Number(item.value), 0);
  const segments = experience
    .map((item, index) => ({ value: Number(item.value), color: chartColors[index % chartColors.length] }))
    .filter((item) => item.value > 0);
  if (total < 100) segments.push({ value: 100 - total, color: "#d4d4d8" });

  let accumulated = 0;
  const stops = segments.length ? [`${segments[0].color} 0%`] : ["#d4d4d8 0%"];
  segments.forEach((segment, index) => {
    accumulated += segment.value;
    const nextSegment = segments[index + 1];
    if (!nextSegment) {
      stops.push(`${segment.color} 100%`);
      return;
    }

    const fadeWidth = Math.min(0.6, segment.value / 5, nextSegment.value / 5);
    const blend = `color-mix(in srgb, ${segment.color} 50%, ${nextSegment.color} 50%)`;
    stops.push(
      `${segment.color} ${accumulated - fadeWidth}%`,
      `${blend} ${accumulated}%`,
      `${nextSegment.color} ${accumulated + fadeWidth}%`,
    );
  });
  const gradient = stops.join(", ");

  return (
    <div className="grid grid-cols-[1fr_130px] items-center gap-3 rounded-xl bg-linear-to-b from-transparent to-white/25 p-5 shadow-[0_12px_30px_rgba(101,64,0,.2)] backdrop-blur-sm sm:grid-cols-[1fr_155px] sm:gap-5 sm:p-6">
      <ul className="space-y-3">
        {experience.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2 text-xs text-[#17120a] sm:text-sm">
            <span className="h-2.5 w-2.5 rounded-[1px]" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
            <span className="min-w-[82px]">{item.label}</span>
            <span>{item.value}%</span>
          </li>
        ))}
      </ul>
      <div className="relative grid aspect-square place-items-center rounded-full" style={{ background: `conic-gradient(${gradient})` }}>
        <div className="grid h-[76%] w-[76%] place-items-center rounded-full bg-[#e6a800] px-2 text-center text-[10px] font-medium leading-4 text-[#1f1809]">{title}</div>
      </div>
    </div>
  );
}

export default function HiringStats({ data }) {
  const content = {
    ...defaultContent,
    ...data,
    experience: Array.isArray(data?.experience) ? data.experience : defaultContent.experience,
  };

  return (
    <section className="relative isolate overflow-hidden bg-official px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-[68px]">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/weekend-ux-hiring-stats-bg.webp')" }} />
      <div className="mx-auto grid max-w-[1200px] items-center gap-9 lg:grid-cols-[.9fr_1.1fr] lg:gap-12 px-4">
        <div>
          <p className="font-inter text-[10px] font-semibold uppercase tracking-[.4em] text-black sm:text-sm mb-3">{content.eyebrow}</p>
          <h2 className="max-w-150 font-playfair h2-section-title text-[#1B1B1B]">
            {content.headingStart}{" "}
            <span className="italic text-white">{content.headingHighlight}</span> {content.headingEnd}
          </h2>
        </div>
        <div className="grid gap-4">
          <ExperienceCard title={content.chartTitle} experience={content.experience} />
          <ExperienceCard title={content.chartTitle} experience={content.experience} />
        </div>
      </div>
    </section>
  );
}
