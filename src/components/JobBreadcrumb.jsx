"use client";

import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function JobBreadcrumb({
  items = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Job Portal" }
  ],
  textSize = "text-[13px] md:text-[14px]",
  fontFamily = "font-urbanist",
  linkColor = "text-zinc-500 hover:text-zinc-900",
  separatorColor = "text-zinc-400",
  activeColor = "text-zinc-900 font-semibold",
  className = "select-none"
}) {
  return (
    <nav className={className} aria-label="Breadcrumb">
      <div className={`flex items-center gap-1.5 md:gap-2 ${textSize} font-medium ${fontFamily}`}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <div key={idx} className="flex items-center gap-1.5 md:gap-2 min-w-0">
              {idx > 0 && (
                <FiChevronRight size={12} className={`${separatorColor} shrink-0`} />
              )}
              {isLast || !item.href ? (
                <span className={`${activeColor} truncate max-w-37.5 sm:max-w-62.5 md:max-w-none`}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`${linkColor} transition-colors duration-200 truncate max-w-25 sm:max-w-45 md:max-w-none shrink-0`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
