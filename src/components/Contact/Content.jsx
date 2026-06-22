import DecorativeImage from "@/app/assets/weekend-ux-contact-decorative-image.webp";
import Map from "@/app/assets/weekend-ux-contact-map.webp";

const Content = ({ data }) => {
     const leftSection = data?.leftsection;

     const imageSrc = leftSection?.image && leftSection.image.trim()
          ? leftSection.image.trim()
          : DecorativeImage.src || DecorativeImage;

     const inquiriesTitle = leftSection?.inquiries?.title && leftSection.inquiries.title.trim()
          ? leftSection.inquiries.title.trim()
          : "Inquiries";

     const inquiriesEmail = leftSection?.inquiries?.email && leftSection.inquiries.email.trim()
          ? leftSection.inquiries.email.trim()
          : "hello@weekendux.com";

     const inquiriesPhone = leftSection?.inquiries?.phone && leftSection.inquiries.phone.trim()
          ? leftSection.inquiries.phone.trim()
          : "+91 888 888 8888";

     const locationTitle = leftSection?.location?.title && leftSection.location.title.trim()
          ? leftSection.location.title.trim()
          : "Location";

     const locationAddress = leftSection?.location?.address && leftSection.location.address.trim()
          ? leftSection.location.address.trim()
          : "424 Madison Avenue\nNew Delhi, DL 10017";

     const socialTitle = leftSection?.social?.title && leftSection.social.title.trim()
          ? leftSection.social.title.trim()
          : "Socials";

     const rawPlatforms = leftSection?.social?.platform;
     const hasValidPlatforms = Array.isArray(rawPlatforms) && rawPlatforms.length > 0 && rawPlatforms.some(p => p.label && p.label.trim());

     const socialPlatforms = hasValidPlatforms
          ? rawPlatforms.filter(p => p.label && p.label.trim()).map(p => ({
               label: p.label.trim(),
               url: p.url && p.url.trim() ? p.url.trim() : "#"
          }))
          : [
               { label: "Instagram", url: "#" },
               { label: "LinkedIn", url: "#" },
               { label: "Dribbble", url: "#" }
          ];

     const mapImageSrc = data?.mapimage && data.mapimage.trim()
          ? data.mapimage.trim()
          : Map.src || Map;

     return (
          <section className="py-10 md:py-16 font-urbanist bg-[#FFFCEE]">
               <div className="custom-width px-4 md:px-6 lg:px-8">

                    {/* ================= TOP SECTION ================= */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

                         {/* LEFT SIDE */}

                         <div className="mr-5">

                              {/* Image */}

                              <div className="overflow-hidden rounded-xl">
                                   <img
                                        src={imageSrc}
                                        alt="Office"
                                        className="w-full h-60 md:h-80 object-cover"
                                   />
                              </div>

                              {/* Info Grid */}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">

                                   {/* Enquiries */}

                                   <div>
                                        <h3 className="text-[24px] font-bold text-neutral-900 mb-3">
                                             {inquiriesTitle}
                                        </h3>

                                        <div className="text-sm md:text-[16px] text-neutral-600">
                                             <p>{inquiriesEmail}</p>
                                             <p>{inquiriesPhone}</p>
                                        </div>
                                   </div>

                                   {/* Location */}

                                   <div>
                                        <h3 className="text-[24px] font-bold text-neutral-900 mb-3">
                                             {locationTitle}
                                        </h3>

                                        <div className="text-sm md:text-[16px] text-neutral-600 leading-6">
                                             {locationAddress.split('\n').map((line, idx) => (
                                                  <p key={idx}>{line}</p>
                                             ))}
                                        </div>
                                   </div>

                                   {/* Social */}

                                   <div>
                                        <h3 className="text-[24px] font-bold text-neutral-900 mb-3">
                                             {socialTitle}
                                        </h3>

                                        <div className="flex flex-wrap gap-4 text-sm text-neutral-600 italic">
                                             {socialPlatforms.map((social, idx) => (
                                                  <a key={idx} href={social.url}>{social.label}</a>
                                             ))}
                                        </div>
                                   </div>

                              </div>
                         </div>

                         {/* RIGHT SIDE */}

                         <div className="mt-10 md:mt-0 p-5 md:p-10 bg-white rounded-2xl shadow-[0_8px_24px_rgba(156,163,175,0.15)]">

                              <h2 className="font-playfair text-[26px] md:text-[40px] text-center text-neutral-900 mb-8">
                                   Enquire Here!
                              </h2>

                              <form className="space-y-4 max-w-130 mx-auto">

                                   <div>
                                        <label className="block text-[14px] text-neutral-700 mb-2">
                                             Full Name
                                        </label>

                                        <input
                                             type="text"
                                             placeholder="Full Name"
                                             className="w-full h-10 border border-[#E5E0D6] px-4 text-sm outline-none focus:border-official bg-transparent rounded-sm placeholder:text-neutral-400"
                                        />
                                   </div>

                                   <div>
                                        <label className="block text-[14px] text-neutral-700 mb-2">
                                             Email Id
                                        </label>

                                        <input
                                             type="email"
                                             placeholder="Email"
                                             className="w-full h-10 border border-[#E5E0D6] px-4 text-sm outline-none focus:border-official bg-transparent rounded-sm placeholder:text-neutral-400"
                                        />
                                   </div>

                                   <div>
                                        <label className="block text-[14px] text-neutral-700 mb-2">
                                             Phone Number
                                        </label>

                                        <input
                                             type="tel"
                                             placeholder="Phone Number"
                                             className="w-full h-10 border border-[#E5E0D6] px-4 text-sm outline-none focus:border-official bg-transparent rounded-sm placeholder:text-neutral-400"
                                        />
                                   </div>

                                   <div>
                                        <label className="block text-[14px] text-neutral-700 mb-2">
                                             Description (optional)
                                        </label>

                                        <textarea
                                             rows={4}
                                             placeholder="Description"
                                             className="w-full border border-[#E5E0D6] p-4 text-sm outline-none resize-none focus:border-official bg-transparent rounded-sm placeholder:text-neutral-400"
                                        />
                                   </div>

                                   <button
                                        type="submit"
                                        className="w-full h-12 bg-official text-neutral-900 font-medium rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer"
                                   >
                                        Get in Touch
                                        <span>↗</span>
                                   </button>

                              </form>
                         </div>
                    </div>

                    {/* ================= MAP SECTION ================= */}

                    <div className="pt-8 md:pmt-10 overflow-hidden ">

                         <div className="relative">

                              <img
                                   src={mapImageSrc}
                                   alt="Map"
                                   className="w-full h-75 md:h-112.5 lg:h-150 object-cover rounded-3xl"
                              />

                              {/* Floating Card */}

                              {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                                   <div className="bg-official rounded-xl px-8 py-6 text-center shadow-xl">

                                        <h3 className="font-urbanist font-bold text-[24px] text-neutral-900">
                                             Our Classroom
                                        </h3>

                                        <p className="mt-2 text-sm text-neutral-700 leading-6">
                                             Address line one maximum
                                             <br />
                                             2 lines
                                        </p>

                                        <div className="flex justify-center mt-4">
                                             <div className="w-3 h-3 rounded-full bg-neutral-900"></div>
                                        </div>

                                   </div>

                              </div> */}

                         </div>

                    </div>

               </div>
          </section>
     );
};

export default Content;