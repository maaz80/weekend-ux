const Button = ({
     children,
     variant = "primary",
     size = "md",
     className = "",
     ...props
}) => {

     const variants = {
          primary:
               "bg-official text-black hover:bg-official/80",

          secondary:
               "bg-[#1a1a1a] text-white border border-official/20 hover:bg-[#242424]",
          dark: "bg-neutral-900 text-white text-[13px] md:text-base"
     };

     const sizes = {
          md: "px-6 h-12 text-sm rounded-[6px]",
          sm: "px-3 h-8 text-[11px] font-semibold rounded-[6px]",
     };

     return (
          <button
               {...props}
               className={`
         inline-flex
         items-center
         justify-center
         font-medium
         transition-all
         duration-300
         cursor-pointer
         ${sizes[size]}
         ${variants[variant]}
         ${className}
       `}
          >
               {children}
          </button>
     );
};

export default Button;