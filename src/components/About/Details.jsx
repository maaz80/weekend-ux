const stats = [
     {
          number: "500+",
          title: "Designers Trained",
          description:
               "Across beginner, intermediate & advanced courses since 2019",
     },
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

export default function Details() {
     return (
          <section className="relative overflow-hidden">
               {/* Background */}
               <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                         backgroundImage: "url('/images/weekend-ux-about-properties-bg.webp')",
                    }}
               />

               {/* Overlay */}
               {/* <div className="absolute inset-0 bg-[#F4B400]/40" /> */}

               <div className="relative z-10 mx-auto max-w-360 px-5 py-14 md:px-10 md:py-20 xl:px-16">
                    <div className="grid items-start gap-12 lg:grid-cols-[1fr_620px]">

                         {/* Left Content */}
                         <div className="relative">
                              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.45em] text-[#fff8d6] font-inter">
                                   Why Weekend UX
                              </p>

                              <h2 className="max-w-150 font-serif text-[38px] md:leading-16 text-official md:text-[56px] leading-12">
                                   The Numbers Behind Every{" "}
                                   <span className="italic text-white">Designer</span> We've Trained.
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