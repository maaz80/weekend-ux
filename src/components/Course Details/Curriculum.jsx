import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Curriculum({
     curriculum = [],
     borderColor = "border-[#E5E0D6]",
     courseId
}) {
     const [openChapter, setOpenChapter] = useState(1);
     const [leadSubmitted, setLeadSubmitted] = useState(false);

     useEffect(() => {
          if (typeof window !== "undefined") {
               setLeadSubmitted(localStorage.getItem("leadSubmitted") === "true");

               const handleLeadSubmitted = () => {
                    setLeadSubmitted(true);
               };

               window.addEventListener("leadSubmitted", handleLeadSubmitted);
               return () => {
                    window.removeEventListener("leadSubmitted", handleLeadSubmitted);
               };
          }
     }, []);

     const handleLessonClick = () => {
          if (!leadSubmitted) {
               window.dispatchEvent(new CustomEvent("openLeadModal", {
                    detail: { courseId }
               }));
          }
     };

     return (
          <div className="space-y-3">
               {curriculum.map((chapter) => {
                    const isOpen = openChapter === chapter.id;

                    return (
                         <div
                              key={chapter.id}
                              className={`border rounded-lg overflow-hidden bg-transparent ${borderColor}`}
                         >
                              <button
                                   onClick={() =>
                                        setOpenChapter(isOpen ? null : chapter.id)
                                   }
                                   className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
                              >
                                   <div className="flex items-center gap-3 text-neutral text-[18px] font-medium">
                                        {isOpen ? (
                                             <FiChevronUp size={18} />
                                        ) : (
                                             <FiChevronDown size={18} />
                                        )}

                                        <span className="font-medium text-zinc-800">
                                             {chapter.title}
                                        </span>
                                   </div>
                              </button>

                              {isOpen && (
                                   <div className={`border-t px-0 md:px-5 py-4 ${borderColor}`}>
                                        <div className="space-y-1">
                                             {chapter.items?.map((lesson, idx) => {
                                                  const isObject = typeof lesson === "object" && lesson !== null;
                                                  const lessonName = isObject ? (lesson.lessonname || lesson.title) : lesson;

                                                  return (
                                                       <div
                                                            key={idx}
                                                            onClick={handleLessonClick}
                                                            className={`flex items-center gap-3 text-[15px] md:text-[16px] text-neutral h-11 px-4 md:px-5 font-semibold text-zinc-800 transition-all duration-300 ${
                                                                 !leadSubmitted
                                                                      ? "blur-[3px] select-none cursor-pointer hover:opacity-85"
                                                                      : ""
                                                            }`}
                                                       >
                                                            <span className="w-1.5 h-1.5 rounded-full bg-official shrink-0" />
                                                            <span className="line-clamp-1">
                                                                 {lessonName}
                                                            </span>
                                                       </div>
                                                  );
                                             })}
                                             {(!chapter.items || chapter.items.length === 0) && (
                                                  <div className="text-sm text-zinc-400 py-2 px-5">No topics listed for this chapter.</div>
                                             )}
                                        </div>
                                   </div>
                              )}
                         </div>
                    );
               })}
          </div>
     );
}
