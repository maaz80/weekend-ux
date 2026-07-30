"use client";

import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function AuthorAbout({ author = {} }) {
    const name = author.name || "Weekend UX";
    const bio = author.bio || "We help aspiring designers build real-world skills through hands-on weekend workshops, expert mentorship, and industry-ready projects.";
    const avatarUrl = author.avatar || null;
    const twitterUrl = author.twitter || null;
    const linkedinUrl = author.linkedin || null;

    return (
        <div className="bg-[#FAF8F2] rounded-2xl p-5 sm:p-6 border border-[#EDE9DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            {/* Top row: Avatar + Info + Socials */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Avatar */}
                <div className="shrink-0 self-start">
                    <div className="w-[72px] h-[72px] rounded-full ring-[2.5px] ring-[#E87400] ring-offset-2 ring-offset-[#FAF8F2] overflow-hidden bg-[#FFD6A0] flex items-center justify-center">
                        <svg
                            className="w-9 h-9 text-[#E87400]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
                        </svg>
                    </div>
                </div>

                {/* Info + Socials row */}
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007B7F] mb-0.5">
                            About The Author
                        </p>
                        <h3 className="font-urbanist font-bold text-xl text-[#1C1C1C] leading-snug">
                            {name}
                        </h3>
                    </div>

                    {/* Social Icons */}
                    {(twitterUrl || linkedinUrl) && (
                        <div className="flex items-center gap-2 shrink-0">
                            {twitterUrl && (
                                <a
                                    href={twitterUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${name} on X (Twitter)`}
                                    className="w-9 h-9 rounded-lg bg-[#1C1C1C] text-white flex items-center justify-center transition-all duration-200 hover:bg-[#333] hover:scale-105"
                                >
                                    <FaXTwitter size={15} />
                                </a>
                            )}
                            {linkedinUrl && (
                                <a
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${name} on LinkedIn`}
                                    className="w-9 h-9 rounded-lg bg-[#1C1C1C] text-white flex items-center justify-center transition-all duration-200 hover:bg-[#0A66C2] hover:scale-105"
                                >
                                    <FaLinkedinIn size={15} />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Bio */}
            <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">
                {bio}
            </p>
        </div>
    );
}
