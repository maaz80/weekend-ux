import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiLock } from "react-icons/fi";
import { Play, Lock } from "lucide-react";

export default function Curriculum({
     curriculum = [],
     isLoggedIn = false,
     onLessonClick,
     themeColor = "text-official",
     borderColor = "border-[#E5E0D6]"
}) {
     const [openChapter, setOpenChapter] = useState(1);

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

                                   <div className="flex items-center gap-5 text-[18px] font-medium text-neutral">
                                        <span>{chapter.lessons} Lessons</span>
                                   </div>
                              </button>

                              {isOpen && (
                                   <div className={`border-t px-0 md:px-5 py-5 ${borderColor}`}>
                                        <div className="space-y-2">
                                             {chapter.items?.map((lesson, idx) => {
                                                  const isObject = typeof lesson === "object" && lesson !== null;
                                                  const lessonName = isObject ? lesson.lessonname : lesson;
                                                  const videoUrl = isObject ? lesson.video?.videourl : null;
                                                  const duration = isObject ? lesson.video?.duration : null;

                                                  return (
                                                       <div
                                                            key={idx}
                                                            onClick={() => {
                                                                 if (onLessonClick) {
                                                                      onLessonClick(lessonName, videoUrl);
                                                                 }
                                                            }}
                                                            className="flex items-center justify-between text-[15px] md:text-[17px] text-neutral h-14.5 px-4 md:px-5 font-medium rounded-xl hover:bg-zinc-100/70 border border-transparent hover:border-zinc-200/50 transition cursor-pointer group"
                                                       >
                                                            <div className="flex items-center gap-3">
                                                                 {isLoggedIn ? (
                                                                      <span className={`w-8 h-8 rounded-full bg-official/50 flex items-center justify-center transition-colors group-hover:bg-official/80 group-hover:text-neutral ${themeColor}`}>
                                                                           <Play size={12} className="fill-current" />
                                                                      </span>
                                                                 ) : (
                                                                      <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                                                                           <Lock size={12} />
                                                                      </span>
                                                                 )}
                                                                 <span className="font-semibold text-zinc-800 transition-colors group-hover:text-official/80 line-clamp-1">
                                                                      {lessonName}
                                                                 </span>
                                                            </div>

                                                            <div className="flex items-center gap-3">
                                                                 {duration && (
                                                                      <span className="text-sm text-zinc-600 font-medium">{duration} mins</span>
                                                                 )}
                                                                 {!isLoggedIn && (
                                                                      <span className="text-[10px] uppercase tracking-wider bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-bold">Locked</span>
                                                                 )}
                                                            </div>
                                                       </div>
                                                  );
                                             })}
                                        </div>
                                   </div>
                              )}
                         </div>
                    );
               })}
          </div>
     );
}
