import React, { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";

const PartnersSuccess = () => {
  const { t, lang, api} = useLang();
  const h = t.home;
  const [clients, setClients] = useState([]);
  useEffect(() => {
      const fetchServices = async () => {
        const data = await api.getClients();
        console.log(data);
        if (data.length > 0) {
          setClients(data);
        } else {
          // fallback to translation data if API returns empty
          setClients(h.services);
        }
      };
      fetchServices();
    }, [lang]); 

  return (
    <section className="bg-white py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="title flex items-center gap-5 mb-10">
          <span className="w-5 h-5 main rounded-full block"></span>
          <h1 className="text-4xl md:text-6xl font-bold secondC uppercase">
            {h.clientsTitle}
          </h1>
          <span className="w-30 h-[4px] main rounded-full block"></span>
        </div>

        {/* Grid Container */}
        <div className="relative">
          {/* Vertical Lines Background */}
          <div className="absolute inset-0 grid grid-cols-5 gap-4 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-full border-r border-white/70" />
            ))}
          </div>

          {/* Bars Container */}
          <div className="space-y-6 relative z-10">
            {/* First Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[#125ef291] rounded-2xl  justify-center">
                  <img
                    src={client.logo}
                    alt={`Client ${index}`}
                    className="w-full h-40  p-5 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSuccess;
