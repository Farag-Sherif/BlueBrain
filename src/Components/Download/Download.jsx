import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";
const Download = () => {
    const [settings, setSettings] = useState(null);
    const { api } = useLang();

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await api.getSettings();
      setSettings(settings);
    };
    fetchSettings();
  }, []);
    return (
        <button class="btn-primary w-12 h-12 rounded-full flex items-center justify-center mainC fixed bottom-5 left-4 z-100 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-45 bg-white/75 backdrop-blur-sm border-4 border-blue-500/50 hover:backdrop-blur-md   hover:text-primary">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 15v4c0 .55-.22 1.08-.61 1.47-.4.39-.93.61-1.48.61H5c-.55 0-1.08-.22-1.47-.61-.39-.4-.61-.93-.61-1.48v-4"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M7 11l5 5 5-5"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path d="M12 16V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
</button>
    );
};

export default Download;
