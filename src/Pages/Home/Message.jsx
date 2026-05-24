import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";
import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";
import { createApi } from "../../Components/APIs/APIs";

const BenefitCard = ({ title, description, index }) => {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  const isList = typeof description === 'string' && description.includes("\n");
  const content = isList ? description.split("\n") : description;

  // Determine if the card has extra content that needs truncation
  const isExpandable = isList ? content.length > 2 : content.length > 150;

  return (
    <div 
      onClick={() => isExpandable && setExpanded(!expanded)}
      className={`relative h-full flex flex-col group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 ${isExpandable ? 'cursor-pointer' : ''} ${expanded ? 'shadow-[0_10px_40px_rgba(0,0,0,0.2)] -translate-y-2 z-10' : 'hover:-translate-y-1 hover:shadow-lg z-0'}`}
    >
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-300 rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300 shrink-0"></div>
      
      {/* Number Badge */}
      <div className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-blue-600/20 backdrop-blur-md flex items-center justify-center border border-white/20 text-white/40 font-display font-bold text-2xl group-hover:text-white group-hover:bg-blue-500/40 transition-all duration-500 rtl:-left-5 rtl:-right-auto shrink-0">
        0{index + 1}
      </div>

      <div className="mb-6 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500 shrink-0">
        <svg className="w-7 h-7 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />}
          {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />}
          {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
          {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />}
        </svg>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-white font-display tracking-wide shrink-0">{title}</h3>
      <div className="w-10 h-0.5 bg-blue-500/50 mb-5 rounded-full group-hover:w-20 transition-all duration-500 shrink-0"></div>
      
      <div 
        className={`relative transition-all duration-500 overflow-hidden ${expanded ? 'max-h-[800px]' : (isExpandable ? 'max-h-[90px]' : 'max-h-[500px]')}`}
        style={!expanded && isExpandable ? { WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' } : {}}
      >
        {isList ? (
          <ul className="space-y-3 pb-2">
            {content.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                <span className="text-blue-100/80 leading-relaxed text-[15px] font-light">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-blue-100/80 leading-relaxed text-[15px] font-light pb-2">{content}</p>
        )}
      </div>

      {isExpandable && (
        <div className="mt-auto pt-6 flex items-center gap-2 text-blue-300 text-sm font-bold group-hover:text-white transition-colors duration-300 shrink-0">
          <span>{expanded ? (lang === 'ar' ? 'عرض أقل' : 'Show less') : (lang === 'ar' ? 'اقرأ المزيد' : 'Read more')}</span>
          <svg className={`w-4 h-4 transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </div>
  );
};

const MessageSection = () => {
  const { lang, t } = useLang();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const api = createApi(lang);
      const data = await api.getSettings();
      setSettings(data);
      setLoading(false);
    };
    fetchSettings();
  }, [lang]);

  // Fallback data if API fails or is loading
  const getCardData = (i) => {
    if (settings && settings[`msg_${i}_title`]) {
      return { title: settings[`msg_${i}_title`], description: settings[`msg_${i}_desc`] };
    }
    return t.home.messageText[i - 1];
  };

  return (
    <section className="relative w-full py-32 bg-gradient-to-br from-blue-700 via-[#125EF2] to-[#000099] overflow-hidden">
      {/* Decorative SVG Shapes */}
      <div className={`custom-shape-divider-top-1776792837 ${lang === "ar" ? "scale-x-[-1]" : ""}`}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold tracking-widest uppercase text-sm mb-4 backdrop-blur-sm">
              {settings?.message_title || t.home.messageTitle}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
              {settings?.message_subtitle || t.home.messageSubtitle}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-300 to-white rounded-full mx-auto mt-8 rtl:bg-gradient-to-l"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-white/10 animate-pulse border border-white/5"></div>
            ))
          ) : (
            [1, 2, 3, 4].map((i) => {
              const data = getCardData(i);
              return (
                <ScrollReveal key={i} variant="fadeUp" delay={`${i * 100}ms`} className="h-full">
                  <BenefitCard title={data.title} description={data.description} index={i - 1} />
                </ScrollReveal>
              );
            })
          )}
        </div>
      </div>

      <div className={`custom-shape-divider-bottom-1776792791 ${lang === "ar" ? "scale-x-[-1]" : ""}`}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
    </section>
  );
};

export default MessageSection;
