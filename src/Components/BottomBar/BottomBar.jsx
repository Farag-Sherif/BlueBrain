import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";
import { 
  FaHome, 
  FaBriefcase, 
  FaWhatsapp, 
  FaDownload, 
  FaBars, 
  FaCogs, 
  FaInfoCircle, 
  FaUsers, 
  FaCommentDots, 
  FaPhoneAlt 
} from "react-icons/fa";

const BottomBar = () => {
  const [settings, setSettings] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, api } = useLang();
  const location = useLocation();
  
  useEffect(() => {
    const fetchSettings = async () => {
      const settingsData = await api.getSettings();
      setSettings(settingsData);
    };
    fetchSettings();
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const currentPath = location.pathname.toLowerCase();
  
  const whatsappLink = settings && settings["whatsapp_number"] ? `https://wa.me/${settings["whatsapp_number"]}` : "#";
  const downloadLink = settings && settings.profile_pdf ? settings.profile_pdf : "#";

  const isHomeActive = currentPath === "/";
  const isPortfolioActive = currentPath === "/portfolio";

  // Check if any popup menu items are active
  const isAboutActive = currentPath === "/about";
  const isServicesActive = currentPath === "/services";
  const isTeamActive = currentPath === "/team";
  const isConsultationActive = currentPath === "/consultation";
  const isContactActive = currentPath === "/contact";

  // Main Bar Localization
  const homeLabel = lang === "ar" ? "الرئيسية" : "Home";
  const projectsLabel = lang === "ar" ? "المشاريع" : "Projects";
  const whatsappLabel = lang === "ar" ? "واتساب" : "WhatsApp";
  const downloadLabel = lang === "ar" ? "الملف" : "Profile";

  // Popup Menu Localization & Configuration
  const menuItems = [
    { to: "/services", label: lang === "ar" ? "الخدمات" : "Services", icon: FaCogs, active: isServicesActive },
    { to: "/about", label: lang === "ar" ? "من نحن" : "About Us", icon: FaInfoCircle, active: isAboutActive },
    { to: "/team", label: lang === "ar" ? "الفريق" : "Team", icon: FaUsers, active: isTeamActive },
    { to: "/consultation", label: lang === "ar" ? "استشارة" : "Consultation", icon: FaCommentDots, active: isConsultationActive },
    { to: "/contact", label: lang === "ar" ? "اتصل بنا" : "Contact", icon: FaPhoneAlt, active: isContactActive },
  ];

  const anyPopupActive = isAboutActive || isServicesActive || isTeamActive || isConsultationActive || isContactActive;

  return (
    <>
      {/* Backdrop for closing popup */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="fixed bottom-4 left-4 right-4 z-[95] lg:hidden bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl border border-white/20 px-3 py-2 flex justify-around items-center h-16">
        
        {/* Home Link */}
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all duration-300 ${
            isHomeActive ? "text-[#125EF2] scale-105 font-bold" : "text-slate-500 hover:text-[#125EF2]"
          }`}
        >
          <FaHome className="text-lg" />
          <span className="text-[9px] tracking-wide">{homeLabel}</span>
        </Link>

        {/* Portfolio Link */}
        <Link 
          to="/portfolio" 
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl transition-all duration-300 ${
            isPortfolioActive ? "text-[#125EF2] scale-105 font-bold" : "text-slate-500 hover:text-[#125EF2]"
          }`}
        >
          <FaBriefcase className="text-lg" />
          <span className="text-[9px] tracking-wide">{projectsLabel}</span>
        </Link>

        {/* Menu (Bars) Center Button - Floating brand background circle */}
        <div className="relative flex justify-center items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`w-14 h-14 bg-[#125EF2] text-white rounded-full flex justify-center items-center shadow-[0_5px_15px_rgba(18,94,242,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer -mt-8 ${
              isMenuOpen || anyPopupActive ? "scale-105" : ""
            }`}
            aria-label="Menu"
          >
            <FaBars className="text-xl" />
          </button>
          
          {/* Beautiful Floating Popup Menu aligned in center */}
          {isMenuOpen && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md rounded-3xl border border-white/30 shadow-2xl p-3 min-w-[200px] flex flex-col gap-1 animate-fadeInUp">
              <div className="px-3 py-1.5 text-xs font-bold text-slate-400 border-b border-slate-100 uppercase tracking-wider mb-1 text-center">
                {lang === "ar" ? "تصفح الأقسام" : "Navigate"}
              </div>
              
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    to={item.to}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                      item.active
                        ? "bg-blue-50 text-[#125EF2] font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#125EF2]"
                    }`}
                  >
                    <Icon className="text-base flex-shrink-0" />
                    <span className="text-[13px]">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* WhatsApp Link */}
        <a 
          href={whatsappLink}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl text-emerald-600 hover:text-emerald-700 transition-all duration-300 hover:scale-105"
        >
          <FaWhatsapp className="text-lg" />
          <span className="text-[9px] tracking-wide text-slate-500">{whatsappLabel}</span>
        </a>

        {/* Download Link */}
        <a 
          href={downloadLink}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-2xl text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-105"
        >
          <FaDownload className="text-lg" />
          <span className="text-[9px] tracking-wide text-slate-500">{downloadLabel}</span>
        </a>

      </div>
    </>
  );
};

export default BottomBar;
