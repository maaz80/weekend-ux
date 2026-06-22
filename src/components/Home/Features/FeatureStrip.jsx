import { HiLightBulb } from "react-icons/hi";
import { TbChartBubbleFilled } from "react-icons/tb";

const features = [
     {
          icon: <HiLightBulb size={42} />,
          title: "Experience World",
          subtitle: "Class Learning",
     },
     {
          icon: <TbChartBubbleFilled size={42} />,
          title: "100% Placement",
          subtitle: "Assistance",
     },
     {
          icon: <TbChartBubbleFilled size={42} />,
          title: "Study On-Campus",
          subtitle: "or Online",
     },
];

export default function FeatureStrip() {
     return (
          <section className="relative overflow-hidden">

               <div className="mx-auto max-w-85 md:max-w-310 min-h-137.5 md:min-h-104 flex flex-col items-start justify-center">
                    {/* Intro Text */}
                    <div className="max-w-212.5">
                         <p className="font-serif text-[20px] leading-[1.55] text-black md:text-[26px] lg:text-[32px]">
                              Weekend UX is a hands-on design institute,
                              in-person classes and structured recordings
                              built for people who learn by doing, not
                              watching.
                         </p>
                    </div>

                    {/* Features */}
                    <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-10">
                         {features.map((item, index) => (
                              <div
                                   key={index}
                                   className={`flex items-center gap-5`}
                              >
                                   <div className="shrink-0 text-black">
                                        {item.icon}
                                   </div>
                                   <div>
                                        <h3 className="font-serif text-[20px] md:text-[22px] leading-tight text-black lg:text-[28px]">
                                             {item.title}
                                        </h3>

                                        <p className="font-serif text-[20px] md:text-[22px] leading-tight text-black lg:text-[28px]">
                                             {item.subtitle}
                                        </p>
                                   </div>
                                   {/* Border  */}
                                   {index < features.length - 1 && (
                                        <div className="min-w-32  items-center justify-center hidden md:flex">
                                             <div className="w-0.5 h-18 bg-black"></div>
                                        </div>
                                   )}
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
}