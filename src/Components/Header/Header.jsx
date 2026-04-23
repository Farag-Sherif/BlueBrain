import { useState } from "react";
import logo from "../../assets/Images/logo.png";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, toggleLang } = useLang();

  return (
    <>
      <header
        dir={t.dir}
        className="fixed inset-x-0 top-0 z-50 border-b border-gray-500 main">
        <nav
          aria-label="Global"
          className="flex items-center justify-between py-6 container mx-auto px-4">
          {/* Logo */}
          <div className="flex">
            <Link to="/" className="-m-1.5 p-1.5">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200">
              <span className="sr-only">{t.openMenu}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
                className="h-10 w-10">
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex lg:gap-x-12">
            {t.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-lg font-semibold text-white hover:text-gray-400 transition-colors duration-500">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language toggle — desktop */}
          <div className="hidden lg:block">
            <button
              onClick={toggleLang}
              className="text-xl font-semibold text-white hover:text-gray-400 transition-colors duration-500">
              {t.toggleLang}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50" dir={t.dir}>
            <div
              className="fixed inset-0"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              className={`fixed inset-y-0 w-full overflow-y-auto bg-indigo-950 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10
                ${t.dir === "rtl" ? "left-0" : "right-0"}`}>
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <img src={logo} alt="Logo" className="h-8 w-auto" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-200">
                  <span className="sr-only">{t.closeMenu}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    className="w-6 h-6">
                    <path
                      d="M6 18 18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-white/10">
                  <div className="space-y-2 py-6">
                    {t.links.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="py-6 flex items-center justify-center">
                  <button
                    onClick={() => {
                      toggleLang();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xl font-semibold text-white hover:text-gray-400 transition-colors duration-500 px-5">
                    {t.toggleLang}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
