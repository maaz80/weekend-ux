const Button = ({
     children,
     variant = "primary",
     size = "md",
     className = "",
     ...props
}) => {

     const variants = {
          primary:
               "bg-official text-neutral hover:bg-official/80",

          secondary:
               "bg-[#1a1a1a] text-white border border-official/20 hover:bg-[#242424]",
          dark: "bg-neutral text-white text-[13px] md:text-base"
     };

     const sizes = {
          sm: "px-3 h-8 text-[11px] font-semibold rounded-[6px]",
          md: "px-6 h-12 text-sm rounded-[6px]",
          lg: "px-8 h-14 text-base rounded-[8px]",
          h10: "px-5 h-10 text-sm rounded-xl",
          h11: "px-6 h-11 text-sm rounded-lg",
          none: "",
     };

     const sizeClass = sizes[size] !== undefined ? sizes[size] : size;

     return (
          <button
               {...props}
               className={`
          inline-flex
          items-center
          justify-center
          font-bold
          transition-all
          duration-300
          cursor-pointer
          ${sizeClass}
          ${variants[variant]}
          ${className}
        `}
          >
               {children}
          </button>
     );
};

export default Button;