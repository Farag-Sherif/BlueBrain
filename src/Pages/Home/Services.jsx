import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";
import { Link } from "react-router-dom";
import "./Home.css";
import serviceTitleBG from "../../assets/Images/Home/serviceTitleBG.png";
import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";

const ServicesSection = () => {
  const { lang, t, api } = useLang();
  const h = t.home;
  const [services, setServices] = useState(h.services);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await api.getServices();
      if (data && data.length > 0) {
        setServices(data);
      } else {
        setServices(h.services); // Fallback
      }
    };
    fetchServices();
  }, [lang]);

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fadeUp">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20">
            <div className="relative">
              <h2 className="font-display text-5xl md:text-7xl font-bold mainC leading-tight">
                <span className="block font-light text-3xl md:text-4xl mb-2 ">{h.servicesTitle[0]}</span>
                {h.servicesTitle[1]}
              </h2>
              <div className="w-20 h-1.5 bg-[#125EF2] rounded-full mt-6"></div>
              
              {/* Decorative Question Mark Background */}
              <div className="absolute -top-10 -right-20 text-[12rem] font-display font-black text-slate-100 -z-10 select-none rtl:-left-20 rtl:right-auto">
                ?
              </div>
            </div>
            
            <div className="mt-8 md:mt-0 max-w-sm">
              <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-blue-500 pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-6">
                {t.services.subtitle}
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 mt-6 text-[#125EF2] font-bold hover:text-blue-800 transition-colors group">
                <span className="uppercase tracking-widest text-sm relative pb-1">
                  {t.home.viewAllServices}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#125EF2] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                </span>
                <svg className={`w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2 ${lang === "ar" ? "rotate-180 group-hover:-translate-x-2" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service, index) => (
            <ScrollReveal key={service.id || index} variant="fadeUp" delay={`${index * 100}ms`}>
              <Link to="/services" className="block group relative w-full aspect-[3.2/4] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#125EF2] to-[#0D47C2] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-white/10">
                
                {/* Oval Blur behind the floating image */}
                <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/20 rounded-full blur-[40px] z-0 pointer-events-none transition-all duration-700 group-hover:scale-125 group-hover:opacity-70"></div>
                
                {/* Giant Watermark Number */}
                <div className="absolute -bottom-10 -left-6 text-[10rem] font-display font-black text-white/15 select-none leading-none z-20 pointer-events-none transition-transform duration-500 group-hover:scale-110">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Full-bleed Cover Image */}
                <div className="absolute inset-0 overflow-hidden z-10">
                  <img
                    src={service.image || `https://ui-avatars.com/api/?name=S${index + 1}&background=125EF2&color=fff&size=600`}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=S${index + 1}&background=125EF2&color=fff&size=600`; }}
                  />
                  {/* Dark overlay on image for depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#0D47C2]/90 pointer-events-none"></div>
                </div>
                
                {/* Premium Gradient Scrim for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0D47C2] via-[#0D47C2]/90 to-transparent z-15 transition-all duration-500 group-hover:h-[80%] pointer-events-none"></div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-25 text-white flex flex-col justify-end h-full pointer-events-none">
                  <div className="transition-transform duration-500 group-hover:-translate-y-4">
                    <h3 className="text-xl md:text-2xl font-bold font-display mb-1 text-white transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-200/90 leading-relaxed text-sm line-clamp-1 group-hover:line-clamp-none transition-all duration-500">
                      {service.description}
                    </p>
                  </div>

                  {/* Interactive slide-up CTA button */}
                  <div className="flex items-center gap-2 text-blue-200 group-hover:text-white font-bold pt-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 pointer-events-auto">
                    <span className="text-xs uppercase tracking-wider relative pb-1">
                      {t.home.serviceDetails}
                    </span>
                    <svg className={`w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1.5 ${lang === "ar" ? "rotate-180 group-hover:-translate-x-1.5" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
