import { useLocation, Link } from "react-router-dom";
import { FaMagic } from "react-icons/fa";
import { useLang } from "../../i18n/LanguageContext";

const FloatingAIBtn = () => {
  const { lang } = useLang();
  const location = useLocation();

  // Hide button on the AI designer page itself
  if (location.pathname.toLowerCase() === "/ai-booth-designer") {
    return null;
  }

  const tooltipText = lang === "ar" ? "مصمم المعارض بالذكاء الاصطناعي" : "AI Booth Designer";

  return (
    <div className="fixed bottom-24 right-6 md:bottom-28 md:right-8 z-[90] flex items-center justify-center">
      {/* Outer Pulse Ring */}
      <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-md"></div>
      <div className="absolute -inset-1 rounded-full pulse-ring bg-transparent"></div>

      <Link
        to="/ai-booth-designer"
        className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-white/20"
        aria-label={tooltipText}
      >
        {/* Animated Inner Aura */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

        {/* AI Icon */}
        <FaMagic className="text-white text-xl md:text-2xl animate-pulse relative z-10 group-hover:rotate-12 transition-transform duration-300" />

        {/* Hover Tooltip */}
        <div 
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap shadow-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none border border-white/10"
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {tooltipText}
        </div>
      </Link>
    </div>
  );
};

export default FloatingAIBtn;
