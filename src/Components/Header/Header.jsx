import { useState, useEffect } from "react";
import logo from "../../assets/Images/logo.png";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, toggleLang } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        dir={t.dir}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "bg-[#125EF2]/95 backdrop-blur-lg shadow-lg py-3" 
            : "bg-[#125EF2] lg:bg-transparent py-3 lg:py-6 shadow-lg lg:shadow-none"
        }`}
      >
        <nav aria-label="Global" className="flex items-center justify-between container mx-auto px-4">
          <Link to="/" className="-m-1.5 p-1.5 flex-shrink-0">
            <img src={logo} alt="Blue Brain Logo" className={`h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300 ${isScrolled ? "brightness-100" : "brightness-100"}`} />
          </Link>

          {/* Mobile Language Button (replaces Hamburger) */}
          <button
            onClick={toggleLang}
            className="lg:hidden px-4 py-2 rounded-full font-bold text-sm bg-white text-[#125EF2] hover:bg-blue-50 transition-all duration-300 shadow-md cursor-pointer"
          >
            {t.toggleLang}
          </button>

          <div className="hidden lg:flex lg:gap-x-8 items-center">
            {t.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-[15px] font-bold transition-colors duration-300 overflow-hidden group py-1 text-white/90 hover:text-white"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[2px] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100 bg-white"></span>
              </Link>
            ))}

            <button
              onClick={toggleLang}
              className={`ml-4 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                isScrolled 
                  ? "bg-white text-[#125EF2] hover:bg-blue-50" 
                  : "glass text-white hover:bg-white hover:text-[#125EF2]"
              }`}
            >
              {t.toggleLang}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
