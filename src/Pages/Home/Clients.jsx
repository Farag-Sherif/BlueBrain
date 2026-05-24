import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";
import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";

export default function PartnersSuccess() {
  const { api, t } = useLang();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await api.getClients();
      console.log("Fetched Clients:", data);
      setClients(data);
    };
    fetchClients();
  }, []);

  if (!clients || clients.length === 0) return null;

  return (
    <section className="py-24 container mx-auto px-4 relative overflow-hidden">
      <ScrollReveal variant="fadeUp">
        <div className="flex items-center justify-center gap-4 mb-16 text-center">
          <div className="w-12 h-[2px] bg-blue-200"></div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mainC uppercase tracking-wide px-4">
            {t.home.clientsTitle}
          </h2>
          <div className="w-12 h-[2px] bg-blue-200"></div>
        </div>
      </ScrollReveal>

      {/* Modern Scrolling layout */}
      <div
        className="relative w-full overflow-hidden marquee-container flex flex-col gap-6"
        dir="ltr">
        {/* Row 1: Left */}
        <div
          className="flex w-max gap-6 animate-marquee"
          style={{ animationDuration: "100s" }}>
          {[
            ...clients,
            ...clients,
            ...clients,
            ...clients,
            ...clients,
            ...clients,
          ].map((c, i) => (
            <div
              key={`row1-${i}`}
              className="w-48 lg:w-56 shrink-0 group aspect-[3/2] rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <img
                src={c.logo}
                alt={c.name}
                className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Right */}
        <div
          className="flex w-max gap-6 animate-marquee-reverse"
          style={{ animationDuration: "100s" }}>
          {[
            ...clients,
            ...clients,
            ...clients,
            ...clients,
            ...clients,
            ...clients,
          ].map((c, i) => (
            <div
              key={`row2-${i}`}
              className="w-48 lg:w-56 shrink-0 group aspect-[3/2] rounded-2xl bg-white border border-slate-100 flex items-center justify-center p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <img
                src={c.logo}
                alt={c.name}
                className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Background Decorative Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-40 bg-blue-50 blur-3xl -z-10 rounded-full"></div>
      </div>
    </section>
  );
}
