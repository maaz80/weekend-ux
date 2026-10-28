export default function CourseBenefitCard({ icon: Icon, title, description }) {
  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-7 text-left text-zinc-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:bg-official hover:text-zinc-950 hover:shadow-xl sm:p-8">
      <div>
        <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-zinc-900 shadow-2xs transition-all duration-300 group-hover:border-zinc-900 group-hover:bg-zinc-950 group-hover:text-white group-hover:shadow-inner">
          <Icon size={24} className="shrink-0" />
        </div>
        <h3 className="mb-2 font-urbanist text-xl font-extrabold leading-snug text-zinc-900 transition-colors group-hover:text-zinc-950">
          {title}
        </h3>
        <div className="mb-3.5 h-0.5 w-8 rounded-full bg-official transition-all duration-300 group-hover:w-12 group-hover:bg-zinc-950" />
        <p className="font-urbanist para">{description}</p>
      </div>
    </article>
  );
}
