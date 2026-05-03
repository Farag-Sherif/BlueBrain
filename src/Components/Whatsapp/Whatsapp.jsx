import { useEffect, useState } from "react";
import whatsappImage from "../../assets/Social-Icons/coloredwhatsapp.png";
import { useLang } from "../../i18n/LanguageContext";
const Whatsapp = () => {
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
        <div>
            <a href={settings ? `https://wa.me/${settings["whatsapp_number"]}` : "#"} target="_blank" rel="noopener noreferrer">
                <img
                    src={whatsappImage}
                    alt="WhatsApp"
                    className="w-12 h-12 fixed bottom-5 right-5 cursor-pointer z-50"
                />
            </a>
        </div>
    );
};

export default Whatsapp;
