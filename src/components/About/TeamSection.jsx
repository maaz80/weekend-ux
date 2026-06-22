import Team1 from "@/app/assets/weekend-ux-about-team-member-1.webp";
import Team2 from "@/app/assets/weekend-ux-about-team-member-2.webp";

const teamMembers = [
     {
          id: 1,
          name: "Marcus Thorne",
          role: "Founder & Creative Lead",
          image: Team1,
     },
     {
          id: 2,
          name: "Elena Voss",
          role: "Design Strategy",
          image: Team2,
     },
];

const TeamSection = () => {
     return (
          <section className="bg-[#F8F6EE] py-16 lg:py-24">
               <div className="custom-width px-4 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-center">

                         {/* LEFT CONTENT */}

                         <div>

                              <span className="font-urbanist text-[12px] font-semibold tracking-[0.35em] uppercase text-official">
                                   Team
                              </span>

                              <h2 className="mt-4 font-playfair text-[42px] md:text-[56px] leading-[1.05] text-[#2C2A28]">
                                   The Minds You
                                   <br />
                                   <span className="italic text-official">
                                        Learn
                                   </span>{" "}
                                   From
                              </h2>

                              <p className="mt-6 max-w-[320px] font-urbanist text-[14px] leading-7 text-[#77726B]">
                                   Our students have gone on to build successful careers
                                   with leading organizations across diverse industries,
                                   showcasing the skills, knowledge, and confidence they
                                   gained through our programs.
                              </p>

                         </div>

                         {/* RIGHT CARDS */}

                         <div className="grid grid-cols-1 sm:grid-cols-[1fr_370px] gap-5">

                              {teamMembers.map((member) => (
                                   <article
                                        key={member.id}
                                        className={`group relative overflow-hidden rounded-3xl ${member?.id === 2 ? 'h-110 mt-5' : 'h-142.5'}`}
                                   >

                                        <img
                                             src={member.image.src}
                                             alt={member.name}
                                             className={`${member?.id === 2 ? 'h-110' : 'h-142.5'}  w-full object-cover transition duration-700 group-hover:scale-105`}
                                        />

                                        {/* Overlay */}

                                        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" /> */}

                                        {/* Content */}

                                        <div className="absolute bottom-0 left-0 right-0 p-6">

                                             <h3 className="font-urbanist text-[28px] font-medium text-white">
                                                  {member.name}
                                             </h3>

                                             <p className="mt-1 font-urbanist text-[15px] text-official">
                                                  {member.role}
                                             </p>

                                        </div>

                                   </article>
                              ))}

                         </div>

                    </div>
               </div>
          </section>
     );
};

export default TeamSection;