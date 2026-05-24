import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";
import logo from "../../assets/Images/logo.png";
import facebook from "../../assets/Social-Icons/facebook.png";
import linkedin from "../../assets/Social-Icons/linkedin.png";
import whatsapp from "../../assets/Social-Icons/whatsapp.png";
import "./Footer.css";
import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  const { t, lang, api } = useLang();
  const f = t.footer;
  const quickLinks = t.links;

  const [branches, setBranches] = useState([]);
  const [settings, setSettings] = useState(null);

  const socialLinks = [
    { label: facebook, title: "Facebook", key: "social_facebook" },
    { label: linkedin, title: "LinkedIn", key: "social_linkedin" },
    { label: whatsapp, title: "WhatsApp", key: "whatsapp_number" },
  ];

  useEffect(() => {
    const fetchBranches = async () => {
      const data = await api.getBranches();
      const settingsData = await api.getSettings();
      setSettings(settingsData);
      if (data.length > 0) {
        setBranches(data);
      }
    };
    fetchBranches();
  }, [lang]);

  return (
    <footer className="relative pt-40 pb-28 lg:pb-10 bg-gradient-to-b from-[#125EF2] to-[#0D47C2] text-white mt-20 overflow-hidden">
      {/* Wave shape divider */}
      <div className={`custom-shape-divider-top-1776366482 ${lang === "ar" ? "scale-x-[-1]" : ""}`}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link to="/" className="inline-block relative group">
              <img src={logo} alt="Blue Brain Logo" className="h-16 w-auto relative z-10" />
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
            </Link>
            <p className="text-white/70 leading-relaxed text-[15px] max-w-sm">
              {f.tagline}
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, index) => {
                let url = "#";
                if (settings) {
                  if (social.key === "whatsapp_number" && settings[social.key]) {
                    url = `https://wa.me/${settings[social.key]}`;
                  } else if (settings[social.key]) {
                    url = settings[social.key];
                  }
                }
                return (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/25 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 group"
                  >
                    <img src={social.label} alt={social.title} className="w-5 h-5 object-contain filter brightness-0 invert transition-all duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Col */}
          <div>
            <h3 className="text-xl font-display font-bold mb-8 text-white tracking-wide relative inline-block">
              {f.quickLinks}
              <span className="absolute -bottom-3 left-0 w-1/2 h-1 bg-gradient-to-r from-white/60 to-transparent rounded-full rtl:right-0 rtl:left-auto rtl:bg-gradient-to-l"></span>
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center text-white/80 hover:text-white transition-colors duration-300 w-fit"
                  >
                    <span className={`inline-block w-2 h-2 rounded-full bg-white mr-3 rtl:ml-3 rtl:mr-0 opacity-0 group-hover:opacity-100 transform -translate-x-2 rtl:translate-x-2 group-hover:translate-x-0 transition-all duration-300`}></span>
                    <span className="relative overflow-hidden font-medium">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Col */}
          <div>
            <h3 className="text-xl font-display font-bold mb-8 text-white tracking-wide relative inline-block">
              {f.contactInfo}
              <span className="absolute -bottom-3 left-0 w-1/2 h-1 bg-gradient-to-r from-white/60 to-transparent rounded-full rtl:right-0 rtl:left-auto rtl:bg-gradient-to-l"></span>
            </h3>
            <div className="space-y-5">
              {branches.length > 0 ? (
                branches.map((branch, idx) => (
                  <div key={idx} className="rounded-2xl p-6 bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-500 hover:-translate-y-1">
                    <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">{branch.name}</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <div className="mt-1 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 border border-white/20">
                          <FaMapMarkerAlt className="text-white/90 text-sm" />
                        </div>
                        <span className="text-[15px] text-white/80 leading-relaxed pt-1">{branch.address}</span>
                      </li>
                      <li className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 border border-white/20">
                          <FaPhoneAlt className="text-white/90 text-sm" />
                        </div>
                        <span className="text-[15px] text-white/80 font-medium" dir="ltr">{branch.phone}</span>
                      </li>
                      <li className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 border border-white/20">
                          <FaEnvelope className="text-white/90 text-sm" />
                        </div>
                        <span className="text-[15px] text-white/80">{branch.email}</span>
                      </li>
                    </ul>
                  </div>
                ))
              ) : (
                <div className="space-y-3 text-sm text-white/70">
                  <p className="animate-pulse">Loading contact info...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 pb-2 flex flex-col items-center justify-center text-center">
          <p className="text-white/50 text-[13px] font-medium tracking-wide">
            {f.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
