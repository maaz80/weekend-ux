"use client";

import {
     FaFacebookF,
     FaInstagram,
     FaYoutube,
} from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import CardBg from '../assets/weekend-ux-course-details-call-card-bg.webp';
import { CiShare2 } from "react-icons/ci";
const headings = [
     "Heading 1",
     "Heading 2",
     "Heading 1",
     "Heading 1",
     "Heading 1",
     "Heading 1",
];

export default function Details() {
     return (
          <section className="bg-[#F8F6EE] py-10 lg:py-16">
               <div className="custom-width px-4 md:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 lg:gap-10">

                         {/* ================= LEFT SIDEBAR ================= */}

                         <aside className="lg:sticky lg:top-24 h-fit">

                              {/* Date */}
                              <div className="flex items-center gap-2 text-[14px] text-neutral-600">
                                   <span>22nd July, 2026</span>
                                   <span>|</span>
                                   <span>3 min read</span>
                              </div>

                              {/* Social */}
                              <div className="flex items-center gap-3 mt-5">

                                   <button className="w-9 h-9 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-900">
                                        <CiShare2 size={16} />
                                   </button>

                                   <button className="w-9 h-9 rounded-full bg-neutral-500 text-white flex items-center justify-center">
                                        <FaFacebookF size={15} />
                                   </button>

                                   <button className="w-9 h-9 rounded-full bg-neutral-500 text-white flex items-center justify-center">
                                        <FaInstagram size={15} />
                                   </button>

                                   <button className="w-9 h-9 rounded-full bg-neutral-500 text-white flex items-center justify-center">
                                        <FaYoutube size={15} />
                                   </button>

                              </div>

                              {/* TOC */}
                              <div className="mt-10">
                                   <h3 className="font-urbanist font-bold text-[22px] text-neutral-900 uppercase">
                                        Table Of Content
                                   </h3>

                                   <div className="mt-6 space-y-3">
                                        {headings.map((item, index) => (
                                             <button
                                                  key={index}
                                                  className={`w-full text-left px-4 py-3 rounded-md transition-all ${index === 1
                                                       ? "bg-neutral-900 text-white"
                                                       : "text-neutral-800 hover:bg-neutral-100"
                                                       }`}
                                             >
                                                  {item}
                                             </button>
                                        ))}
                                   </div>
                              </div>

                              {/* CTA CARD */}
                              <div className="mt-10 rounded-xl overflow-hidden relative h-57.5">

                                   <img
                                        src={CardBg.src}
                                        alt="banner"
                                        className="absolute inset-0 w-full h-full object-cover"
                                   />

                                   <div className="absolute inset-0 bg-black/25" />

                                   <div className="absolute inset-0 p-4 flex flex-col justify-between">

                                        <div>
                                             <h3 className="font-playfair text-white text-[34px] leading-[1.1]">
                                                  Design is more than just being creative!
                                             </h3>

                                             <p className="mt-3 text-white/80 text-sm">
                                                  Learn how to make design that sells
                                             </p>
                                        </div>

                                        <button className="h-12 rounded-lg bg-[#F7C600] text-neutral-900 font-medium">
                                             Book a Call
                                        </button>

                                   </div>

                              </div>
                         </aside>

                         {/* ================= CONTENT ================= */}

                         <div>

                              {/* HERO IMAGE */}

                              <div className="overflow-hidden rounded-2xl">
                                   <img
                                        src="/images/hero-bg.jpg"
                                        alt="Blog"
                                        className="w-full h-65 md:h-112.5 lg:h-137.5 object-cover"
                                   />
                              </div>

                              {/* BLOG CONTENT */}

                              <div className="mt-8 lg:mt-12">

                                   <h1 className="font-urbanist text-[28px] md:text-[34px] lg:text-[40px] font-medium text-neutral-900">
                                        Use Rich Text when developing cms for blog
                                   </h1>

                                   <div className="mt-6 space-y-6 text-neutral-600 text-[16px] leading-[1.9]">

                                        <p>
                                             Thank you for buying our courses. We ensure that our
                                             users have a rewarding experience while they discover,
                                             assess, and purchase our courses, whether it is an
                                             instructor-led or self-paced training.
                                        </p>

                                        <p>
                                             As with any online purchase experience, there are
                                             terms and conditions that govern our Refund Policy.
                                             When you buy a training course from us, you agree to
                                             our Privacy Policy, Terms of Use and Refund Policy.
                                        </p>

                                        <p>
                                             Thank you for buying our courses. We ensure that our
                                             users have a rewarding experience while they discover,
                                             assess and purchase our courses. Whether it is an
                                             instructor-led or self-paced training.
                                        </p>

                                   </div>

                                   <h2 className="mt-12 font-urbanist text-[28px] font-medium text-neutral-900">
                                        For Self Placed Learning:
                                   </h2>

                                   <div className="mt-5 space-y-6 text-neutral-600 text-[16px] leading-[1.9]">
                                        <p>
                                             Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                             Eaque molestiae sint tempora laboriosam, nemo velit
                                             voluptas aspernatur praesentium architecto.
                                        </p>

                                        <p>
                                             Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                             Perspiciatis deleniti voluptatem pariatur quaerat
                                             molestiae praesentium.
                                        </p>
                                   </div>

                              </div>

                         </div>

                    </div>

               </div>
          </section>
     );
}