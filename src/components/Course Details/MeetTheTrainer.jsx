"use client";

import { Star, ArrowRight } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

export default function MeetTheTrainer({ data }) {
  const defaultTrainers = [
    {
      name: "Mr. Manoj Pandey",
      role: "SENIOR ENGINEER @ GOOGLE",
      bio: "UI/UX & Design Systems lead with 10+ years experience. Expert in AI Workflows and Product Strategy.",
      rating: "4.9/5",
      students: "400+ Students",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Ms. Amrit Raj",
      role: "DATA SCIENTIST @ MICROSOFT",
      bio: "Ex-Adobe | PhD Statistics. Specialist in User Research, Predictive Analytics & Interaction Design.",
      rating: "5.0/5",
      students: "250+ Students",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Mr. Sudheer Sharma",
      role: "PRODUCT MANAGER @ AMAZON",
      bio: "Ex-Flipkart | MBA. Mentoring on Agile Delivery, Marketplace Dynamics & High-Fidelity Figma Prototyping.",
      rating: "4.8/5",
      students: "180+ Students",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      linkedin: "https://linkedin.com"
    }
  ];

  const title = data?.trainers?.title || "Meet The Trainers";
  const subtitle = data?.trainers?.subtitle || "Get 1-on-1 mentorship and practical insights from active design leads and engineers at top companies.";
  const trainersList = (Array.isArray(data?.trainers?.items) && data.trainers.items.length > 0)
    ? data.trainers.items
    : defaultTrainers;

  return (
    <section className="w-full bg-[#F8F6EE] py-14 sm:py-16 md:py-20 border-b border-zinc-200/80 font-urbanist">
      <div className="custom-width px-4 sm:px-6 lg:px-16 mx-auto">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-900 bg-official px-3.5 py-1 rounded-full border border-black/10 inline-block mb-1 font-urbanist">
            Learn From Industry Leaders
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight">
            {title}
          </h2>
          <p className="font-urbanist text-sm sm:text-base font-medium text-zinc-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Dynamic Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {trainersList.map((trainer, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-zinc-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Trainer Photo Header */}
              <div className="relative w-full h-64 sm:h-72 bg-zinc-100 overflow-hidden">
                <img
                  src={trainer.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"}
                  alt={trainer.name || "Trainer"}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4 text-left">
                <div>
                  {/* Name + LinkedIn Icon */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-playfair font-bold text-xl sm:text-2xl text-zinc-900 group-hover:text-official transition-colors">
                      {trainer.name || "Trainer Name"}
                    </h3>
                    {trainer.linkedin && (
                      <a
                        href={trainer.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center hover:bg-official hover:text-zinc-950 transition-colors shrink-0"
                        aria-label={`${trainer.name} LinkedIn Profile`}
                      >
                        <FaLinkedinIn size={14} />
                      </a>
                    )}
                  </div>

                  {/* Role Tag */}
                  <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-official font-urbanist mb-2.5">
                    {trainer.role || "MENTOR"}
                  </p>

                  {/* Bio */}
                  <p className="font-urbanist text-xs sm:text-sm font-medium text-zinc-500 leading-relaxed line-clamp-3">
                    {trainer.bio || "Experienced industry practitioner and mentor."}
                  </p>
                </div>

                {/* Footer Rating & Profile Link */}
                <div className="pt-4 border-t border-zinc-150 flex items-center justify-between text-xs sm:text-sm font-urbanist">
                  <div className="flex items-center gap-1.5 font-extrabold text-zinc-900">
                    <span>{trainer.rating || "5.0/5"}</span>
                    <Star size={14} className="fill-amber-400 text-amber-400 shrink-0" />
                    {trainer.students && (
                      <span className="text-zinc-400 font-medium ml-0.5">({trainer.students})</span>
                    )}
                  </div>

                  <a
                    href="#course-details-hero"
                    className="font-extrabold text-official hover:text-official/80 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Profile</span>
                    <ArrowRight size={14} />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
