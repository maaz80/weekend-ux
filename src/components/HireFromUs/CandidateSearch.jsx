"use client";

import { Search } from "lucide-react";
import { useState } from "react";

const defaultContent = {
  eyebrow: "Search the Candidates",
  headingStart: "Find The",
  headingHighlight: "Designer",
  headingEnd: "You Have Been Looking For.",
  roles: ["UI Designer", "UX Designer", "Industrial Designer", "Graphic Designer", "UI UX Designer", "Web Designer"],
  resultMessage: 'Candidate search for "{query}" is coming soon.',
};

export default function CandidateSearch({ data }) {
  const content = {
    ...defaultContent,
    ...data,
    roles: Array.isArray(data?.roles) ? data.roles : defaultContent.roles,
  };
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="candidate-search" className="relative isolate overflow-hidden bg-[#080808] px-5 py-16 text-white sm:px-8 sm:py-20 lg:py-[88px]">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/weekend-ux-hire-candidate-search-bg.webp')" }} />
      <div className="mx-auto max-w-300 text-center flex flex-col items-center justify-center">
        <p className="font-inter text-sm font-semibold uppercase tracking-[.42em] text-white/90 sm:text-sm">{content.eyebrow}</p>
        <h2 className="mt-3 max-w-225 font-playfair text-[40px] leading-[1.12] text-[#ffc000] sm:text-[50px] lg:text-[56px]">
          {content.headingStart} <span className="italic text-white">{content.headingHighlight}</span> {content.headingEnd}
        </h2>
        <form onSubmit={handleSubmit} className="mt-7 w-86.5 md:w-144.5 flex h-14.5 max-w-430 items-center rounded-full bg-white p-1.5 pl-5 shadow-lg sm:mt-8 sm:h-16 sm:pl-6">
          <input value={query} onChange={(event) => { setQuery(event.target.value); setSubmitted(false); }} aria-label="Search by job role" placeholder="Search job role you are hiring for..." className="w-full min-w-0 flex-1 bg-transparent text-base text-[#222] outline-none placeholder:text-[#999] sm:text-lg" />
          <button aria-label="Search candidates" type="submit" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ffb900] text-black transition hover:bg-[#ffd000] sm:h-11 sm:w-11">
            <Search size={19} />
          </button>
        </form>
        <div className="mt-6 grid max-w-[720px] grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
          {content.roles.map((role) => (
            <button key={role} onClick={() => { setQuery(role); setSubmitted(false); }} className="min-h-12 rounded-lg border border-white/10 bg-white/[.08] px-4 py-2.5 text-[18px] text-center text-white/90 transition hover:border-[#ffc000]/50 hover:bg-white/[.13] sm:text-base">
              {role}
            </button>
          ))}
        </div>
        {submitted && <p role="status" className="mt-4 text-base text-white/70">{content.resultMessage.replace("{query}", query || "all roles")}</p>}
      </div>
    </section>
  );
}
