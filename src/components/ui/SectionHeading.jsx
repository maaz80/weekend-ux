export default function SectionHeading({ heading, description, className = "" }) {
  return (
    <div className={`text-left md:text-center space-y-3 max-w-3xl mx-auto ${className}`}>
      <h2 className="font-playfair h2-section-title text-zinc-900">{heading}</h2>
      <p className="font-urbanist para">{description}</p>
    </div>
  );
}
