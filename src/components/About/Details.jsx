const STATIC_STATS = [
     {
          number: "500+",
          title: "Designers Trained",
          description:
               "Across beginner, intermediate & advanced courses since 2019",
     },
     {
          number: "8-10",
          title: "Students per batch, always",
          description:
               "We've been offered bigger. We've always said no. Small is big.",
     },
     {
          number: "5★",
          title: "Average instructor rating",
          description:
               "Rated by students post-batch. No anonymous reviews, no inflation.",
     },
];

export default function Details({ data }) {
     const whyTitle = data?.title && data.title.trim()
          ? data.title.trim()
          : "Why Weekend UX";

     const startheading = data?.startheading && data.startheading.trim()
          ? data.startheading.trim()
          : "The Numbers Behind Every";

     const midheading = data?.midheading && data.midheading.trim()
          ? data.midheading.trim()
          : "Designer";

     const endheading = data?.endheading && data.endheading.trim()
          ? data.endheading.trim()
          : " We've Trained.";

     const rawCards = data?.card;
     const hasValidCards = Array.isArray(rawCards) && rawCards.length > 0 && rawCards.some(c => c.value && c.value.trim());

     const stats = hasValidCards
          ? rawCards.filter(c => c.value && c.value.trim()).map((item, idx) => {
               const fallback = STATIC_STATS[idx] || STATIC_STATS[0];
               return {
                    number: item.value && item.value.trim() ? item.value.trim() : fallback.number,
                    title: item.valueName && item.valueName.trim() ? item.valueName.trim() : fallback.title,
                    description: item.description && item.description.trim() ? item.description.trim() : fallback.description,
               };
          })
          : STATIC_STATS;

     return (
          <section className="relative overflow-hidden">
               {/* Background */}
               <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                         backgroundImage: "url('/images/weekend-ux-about-properties-bg.webp')",
                    }}
               />

               <div className="relative z-10 mx-auto max-w-360 px-5 py-14 md:px-10 md:py-20 xl:px-16">
                    <div className="grid items-start gap-12 lg:grid-cols-[1fr_620px]">

                         {/* Left Content */}
                         <div className="relative">
                              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.45em] text-[#fff8d6] font-inter">
                                   {whyTitle}
                              </p>

                              <h2 className="max-w-150 font-serif text-[38px] md:leading-16 text-official md:text-[56px] leading-12">
                                   {startheading}{" "}
                                   {midheading && <span className="italic text-white">{midheading}</span>}
                                   {endheading && <>{endheading.startsWith(" ") ? "" : " "}{endheading}</>}
                              </h2>

                         </div>

                         {/* Cards */}
                         <div className="grid gap-5 sm:grid-cols-2">
                              {stats.map((item, index) => (
                                   <div
                                        key={index}
                                        className="
                  rounded-xl
                  bg-linear-to-b from-black/10 to-white/20
                  backdrop-blur-sm
                  p-7
                  shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
                                   >
                                        <h3 className="text-center text-[42px] font-semibold leading-none text-white">
                                             {item.number}
                                        </h3>

                                        <p className="mt-2 text-center font-medium text-white">
                                             {item.title}
                                        </p>

                                        <div className="my-5 h-px bg-white/15" />

                                        <p className="text-sm leading-6 text-white/80 text-center">
                                             {item.description}
                                        </p>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </section>
     );
}