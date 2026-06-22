import Team1 from "@/app/assets/weekend-ux-about-team-member-1.webp";
import Team2 from "@/app/assets/weekend-ux-about-team-member-2.webp";

const staticTeam = [
     {
          id: 1,
          name: "Marcus Thorne",
          role: "Founder & Creative Lead",
          image: Team1.src || Team1,
     },
     {
          id: 2,
          name: "Elena Voss",
          role: "Design Strategy",
          image: Team2.src || Team2,
     },
];

const TeamSection = ({ data }) => {
     const title = data?.title && data.title.trim()
          ? data.title.trim()
          : "Team";

     const startheading = data?.startheading && data.startheading.trim()
          ? data.startheading.trim()
          : "The Minds You";

     const midheading = data?.midheading && data.midheading.trim()
          ? data.midheading.trim()
          : "Learn";

     const endheading = data?.endheading && data.endheading.trim()
          ? data.endheading.trim()
          : " From";

     const description = data?.description && data.description.trim()
          ? data.description.trim()
          : "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.";

     const rawMembers = data?.imageCard;
     const hasValidMembers = Array.isArray(rawMembers) && rawMembers.length > 0 && rawMembers.some(m => m.name && m.name.trim());

     const teamMembers = hasValidMembers
          ? rawMembers.filter(m => m.name && m.name.trim()).map((m, idx) => {
               const fallback = staticTeam[idx] || staticTeam[0];
               return {
                    id: m._id || idx + 1,
                    name: m.name.trim(),
                    role: m.role && m.role.trim() ? m.role.trim() : fallback.role,
                    image: m.image && m.image.trim() ? m.image.trim() : fallback.image,
               };
          })
          : staticTeam;

     return (
          <section className="bg-[#F8F6EE] py-16 lg:py-24">
               <div className="custom-width px-4 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-center">

                         {/* LEFT CONTENT */}
                         <div>
                              <span className="font-urbanist text-[12px] font-semibold tracking-[0.35em] uppercase text-official">
                                   {title}
                              </span>

                              <h2 className="mt-4 font-playfair text-[42px] md:text-[56px] leading-[1.05] text-[#2C2A28]">
                                   {startheading}
                                   <br />
                                   {midheading && (
                                        <span className="italic text-official">
                                             {midheading}
                                        </span>
                                   )}
                                   {endheading && <>{endheading.startsWith(" ") ? "" : " "}{endheading}</>}
                              </h2>

                              <p className="mt-6 max-w-[320px] font-urbanist text-[14px] leading-7 text-[#77726B]">
                                   {description}
                              </p>
                         </div>

                         {/* RIGHT CARDS */}
                         <div className="grid grid-cols-1 sm:grid-cols-[1fr_370px] gap-5">
                              {teamMembers.map((member, idx) => (
                                   <article
                                        key={member.id}
                                        className={`group relative overflow-hidden rounded-3xl ${idx === 1 ? 'h-110 mt-5' : 'h-142.5'}`}
                                   >
                                        <img
                                             src={member.image}
                                             alt={member.name}
                                             className={`${idx === 1 ? 'h-110' : 'h-142.5'}  w-full object-cover transition duration-700 group-hover:scale-105`}
                                        />

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
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