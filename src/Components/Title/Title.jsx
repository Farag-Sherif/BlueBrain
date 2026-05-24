import TitleBG from "../../assets/Images/TitleBG.png";

const Title = ({ children, className = "" }) => {
  return (
    <div
      className="relative h-72 md:h-80 xl:h-96 flex items-center bg-cover bg-center bg-no-repeat mb-20 overflow-hidden shadow-inner"
      style={{ backgroundImage: `url(${TitleBG})` }}
    >
      {/* Dark gradient overlay for text contrast and premium feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/60 to-transparent z-0 rtl:bg-gradient-to-l"></div>
      
      {/* Subtle brand accent overlay */}
      <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h1 className={`font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-wider drop-shadow-lg ${className}`}>
          {children}
        </h1>
        {/* Decorative underline */}
        <div className="mt-6 w-24 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 rtl:bg-gradient-to-l shadow-glow animate-fadeInUp"></div>
      </div>
    </div>
  );
};

export default Title;
