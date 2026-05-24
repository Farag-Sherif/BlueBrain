import { useEffect, useState } from "react";
import whatsappImage from "../../assets/Social-Icons/coloredwhatsapp.png";
import { useLang } from "../../i18n/LanguageContext";

const Whatsapp = () => {
  const [settings, setSettings] = useState(null);
  const { api } = useLang();

  useEffect(() => {
    const fetchSettings = async () => {
      const settingsData = await api.getSettings();
      setSettings(settingsData);
    };
    fetchSettings();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] hidden lg:flex items-center justify-center">
      <div className="absolute inset-0 rounded-full pulse-ring"></div>
      <a 
        href={settings && settings["whatsapp_number"] ? `https://wa.me/${settings["whatsapp_number"]}` : "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300"
      >
        <img 
          src={whatsappImage} 
          alt="WhatsApp"
          className="w-8 h-8 md:w-10 md:h-10 object-contain" 
        />
      </a>
    </div>
  );
};

export default Whatsapp;
