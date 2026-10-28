import CorporateInquiryForm from "@/components/CorporateTraining/CorporateInquiryForm";

export default function TalkToExpert({
     data,
     bgImage = "/images/weekend-ux-details-bg-for-hiring-us.webp",
     taglineColor = "text-white",
     titleColor = "text-[#f3a800]",
     titleHighlightColor = "text-white",
     bgOverlay
}) {
     const title = data?.title?.trim() || "Talk To Expert";
     const startheading = data?.startheading?.trim() || "Explore The Right";
     const midheading = data?.midheading?.trim() || "Learning Solutions";
     const endheading = data?.endheading?.trim() || "For Your Training Needs.";
     const formTitle = data?.formTitle?.trim() || "Request Callback";
     const buttonLabel = data?.buttonLabel?.trim() || "Get in Touch";

     return (
          <section className="relative overflow-hidden" data-navbar-light="true" id="talk-to-expert">
               <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${bgImage}')` }}
               />
               {bgOverlay && (
                    <div
                         className="absolute inset-0"
                         style={{ backgroundColor: bgOverlay }}
                    />
               )}

               <div className="relative z-10 mx-auto max-w-360 px-5 py-14 md:px-10 md:py-20 xl:px-16">
                    <div className="grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,620px)] lg:gap-12">
                         <div className="relative">
                              <p className={`mb-5 font-inter text-[10px] font-medium uppercase tracking-[0.45em] ${taglineColor}`}>
                                   {title}
                              </p>

                              <h2 className={`max-w-150 font-playfair text-[38px] leading-12 md:text-[56px] md:leading-16 ${titleColor}`}>
                                   {startheading}{" "}
                                   {midheading && (
                                        <span className={`italic ${titleHighlightColor}`}>
                                             {midheading}
                                        </span>
                                   )}
                                   {endheading && <> {endheading}</>}
                              </h2>
                         </div>

                         <div className="rounded-xl bg-black/30 p-5 backdrop-blur-sm sm:p-7">
                              <h3 className="mb-5 text-center font-playfair text-2xl text-white sm:text-[26px]">
                                   {formTitle}
                              </h3>
                              <CorporateInquiryForm
                                   inputBgColor="bg-black/40"
                                   inputBorderColor="border-white/15"
                                   inputFocusColor="focus:border-white/50"
                                   labelColor="text-white/85"
                                   textColor="text-white"
                                   placeholderColor="placeholder:text-white/55"
                                   buttonVariant="secondary"
                                   buttonClassName="!border-transparent !bg-white !text-neutral hover:!bg-zinc-100"
                                   buttonSize="w-full h-11 rounded-md font-semibold text-sm"
                                   buttonLabel={buttonLabel}
                                   showTerms={false}
                              />
                         </div>
                    </div>
               </div>
          </section>
     );
}
