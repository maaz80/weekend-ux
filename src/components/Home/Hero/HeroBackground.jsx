export default function HeroBackground() {
     return (
          <>
               {/* Background Image */}
               <div
                    className="absolute inset-0 bg-cover bg-center object-cover"
                    style={{
                         backgroundImage:
                              "url('/images/weekend-ux-hero-bg-template.webp')",
                    }}
               />

          </>
     );
}