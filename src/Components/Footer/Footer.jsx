import { Link } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";
import logo from "../../Assets/Images/logo.png";
import brain from "../../Assets/Images/brain.png";
import egypt from "../../Assets/Images/egypt.png";
import saudi from "../../Assets/Images/saudi.png";
import facebook from "../../Assets/Social-Icons/facebook.png";
import linkedin from "../../Assets/Social-Icons/linkedin.png";
import whatsapp from "../../Assets/Social-Icons/whatsapp.png";
import youtube from "../../Assets/Social-Icons/youtube.png";
import "./Footer.css";
import { use, useEffect, useState } from "react";

const Footer = () => {
  const { t, lang, api } = useLang();
  const f = t.footer;
  const quickLinks = t.links;

  const [branches, setBranches] = useState([]);

  const socialLinks = [
    { label: facebook, href: "#", title: "Facebook" },
    { label: linkedin, href: "#", title: "LinkedIn" },
    { label: whatsapp, href: "#", title: "WhatsApp" },
    { label: youtube, href: "#", title: "YouTube" },
  ];
useEffect(() => {
 const fetchBranches = async () => {
  const data = await api.getBranches();
  console.log(data);
  if (data.length > 0) {
    setBranches(data);
  } else {
    console.error("Error fetching branches");
    
  }
};
fetchBranches();
}, [lang]);

  return (
    <footer dir={t.dir} className="text-white main pt-40 relative">
      <div className="custom-shape-divider-top-1776366482">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={`${t.dir === "rtl" ? "scale-x-[-1]" : ""}`}>
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"></path>
        </svg>
      </div>
      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-5  lg:gap-10 pb-8 container mx-auto px-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Logo" className="h-15 w-auto" />
          </div>

          <p className="text-sm leading-relaxed text-white/90 mb-6">
            {f.tagline}
          </p>

          <div className="flex gap-5 justify-around md:justify-start mt-10">
            {socialLinks.map(({ label, href, title }) => (
              <Link
                key={title}
                to={href}
                title={title}
                className="w-12 h-12 flex items-center justify-center">
                <img src={label} alt={title} className="w-full h-auto" />
              </Link>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-bold mb-5 tracking-wide flex items-center">
            <img src={brain} alt="" className="w-5 h-5 mr-2" /> {f.quickLinks}
          </h3>

          <ul className="flex flex-col gap-2 mx-5">
            {quickLinks.map((link) => (
              <li key={link.to} className="flex items-center gap-2">
                <span className="text-xs text-white/70">•</span>

                <Link
                  to={link.to}
                  className="text-md font-bold text-white/90 hover:text-white transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-2 lg:col-span-1 mt-10 lg:mt-0">
          <h3 className="text-xl font-bold mb-4 tracking-wide flex items-center">
            <img src={brain} alt="" className="w-5 h-5 mr-2" />
            {f.contactInfo}
          </h3>
          <div className="info flex flex-col md:flex-row lg:flex-col gap-4">
            {branches.map(
              ({name, address, phone, email } , index) => (
                <div key={index} className="mb-4 mx-5 flex flex-col gap-2">
                  <p className="text-lg font-bold text-white/80 mb-2 flex items-center gap-2">
                    for {name}
                  </p>

                  <div className="flex flex-col gap-2 text-md text-white/85">
                    <div className="flex gap-2 items-start">
                      <span>🏠</span>
                      <span className="text-wrap">{address}</span>
                    </div>

                    <div className="flex gap-2 items-center">
                      <span>📞</span>
                      <span className="text-wrap">{phone}</span>
                    </div>

                    <div className="flex gap-2 items-center">
                      <span>✉️</span>
                      <span className="text-wrap">{email}</span>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center py-4 text-sm text-white/80 tracking-wide border-t-3">
        {f.rights}
      </div>
    </footer>
  );
};

export default Footer;
