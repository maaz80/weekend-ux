import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const ProgramsSidebar = ({ isActive, onClick, category }) => {
     return (
          <div
               onClick={onClick}
               className={`
        w-full md:w-56 2xl:w-64 h-12 md:h-11 2xl:h-12 
        rounded-md flex items-center justify-between 
        text-[15px] font-medium
        px-4 py-1 cursor-pointer 
        transition-all duration-300 ease-in-out

        ${isActive
                    ? 'bg-linear-to-r from-zinc-500 to-zinc-900 text-white shadow-sm'
                         : 'bg-transparent text-zinc-500 hover:bg-zinc-100/80 hover:text-zinc-900'}
      `}
          >
               <div>{category}</div>

               {/* Desktop Icon */}
               <div className='hidden md:block'>
                    <IoIosArrowForward className={`transition-transform text-sm ${isActive ? 'rotate-90 text-white' : 'text-zinc-400'}`} />
               </div>

               {/* Mobile Icon */}
               <div className='md:hidden'>
                    <IoIosArrowDown className={`transition-transform text-sm ${isActive ? 'rotate-180 text-white' : 'text-zinc-400'}`} />
               </div>
          </div>
     )
}

export default ProgramsSidebar