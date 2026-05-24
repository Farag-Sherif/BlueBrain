import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";

const Download = () => {
  const [settings, setSettings] = useState(null);
  const { api } = useLang();

  useEffect(() => {
    const fetchSettings = async () => {
      const settingsData = await api.getSettings();
      setSettings(settingsData);
    };
    fetchSettings();
  }, []);

  // Use the profile PDF link if available in settings, else fallback
  const downloadLink = settings && settings.profile_pdf ? settings.profile_pdf : "#";

  return (
    <a 
      href={downloadLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[90] w-14 h-14 md:w-16 md:h-16 rounded-full hidden lg:flex items-center justify-center text-blue-600 bg-white shadow-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-y-1 border border-blue-100 group"
      aria-label="Download Profile"
    >
      <div className="absolute inset-0 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <svg className="w-6 h-6 md:w-8 md:h-8 relative z-10 group-hover:text-blue-700 transition-colors" viewBox="0 0 24 24" fill="none">
        <path d="M21 15v4c0 .55-.22 1.08-.61 1.47-.4.39-.93.61-1.48.61H5c-.55 0-1.08-.22-1.47-.61-.39-.4-.61-.93-.61-1.48v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 11l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </a>
  );
};

export default Download;
