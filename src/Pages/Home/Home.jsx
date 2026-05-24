import { useEffect, useState } from "react";
import landingMobile from "../../assets/Video/landingMobile.mp4";
import landing from "../../assets/Video/landing.mp4";
import { useLang } from "../../i18n/LanguageContext";
import coloredwhatsapp from "../../assets/Social-Icons/coloredwhatsapp.png";
import mute from "../../assets/Video/mute.png";
import volume from "../../assets/Video/volume.png";
import "./Home.css";
import StrongBrain from "../../assets/Images/Home/StrongBrain.png";
import upCurve from "../../assets/Images/Home/upCurve.png";
import whiteBrain from "../../assets/Images/Home/BlueBrain.png";
import brainBlue from "../../assets/Images/Home/BlueBrain.png";
import MessageSection from "./Message";
import ServicesSection from "./Services";
import NewProjectCarousel from "./Projects";
import PartnersSuccess from "./Clients";
import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";
import { Link } from "react-router-dom";

export default function Home() {
  const { t, lang, api } = useLang();
  const h = t.home;
  const [isMuted, setIsMuted] = useState(true);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const settingsData = await api.getSettings();
      setSettings(settingsData);
    };
    fetchSettings();
  }, [lang]);

  return (
    <div className="bg-[var(--surface-alt)]">
      {/* ─── HERO SECTION ─── */}
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden group/hero bg-[#0a1628]">
        {/* Mobile Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover md:hidden"
          src={landingMobile}
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
        {/* Desktop Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          src={landing}
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
        
        {/* Premium Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/60 to-[#0a1628]/20 z-0 rtl:bg-gradient-to-l"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent z-0 opacity-80"></div>

        {/* Mute Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-28 right-6 z-20 w-12 h-12 rounded-full glass-dark flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300 rtl:right-auto rtl:left-6"
        >
          <img src={isMuted ? mute : volume} alt="Mute toggle" className="w-6 h-6 filter brightness-0 invert" />
        </button>

        {/* Hero Content */}
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-center md:justify-end pb-20 md:pb-30">
          <div className="max-w-3xl animate-fadeInUp">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-semibold text-sm tracking-widest uppercase mb-4 backdrop-blur-md">
              {h.heroBadge}
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight leading-[1.1] mb-4 drop-shadow-2xl">
              {h.heroTitle.split(" ").map((word, i) => (
                <span key={i} className={i === 1 ? "text-blue-400 block mt-2" : ""}>{word} </span>
              ))}
            </h1>
            <p className="text-base md:text-xl text-blue-100/80 max-w-2xl leading-relaxed mb-8 font-light">
              {h.heroSubtitle}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:-translate-y-1">
                {h.heroBtn}
              </Link>
              <Link to="/portfolio" className="px-6 py-3 glass text-white hover:bg-white/20 rounded-full font-bold text-base transition-all duration-300 hover:-translate-y-1">
                {h.explorePortfolio}
              </Link>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Contact */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 hidden lg:flex items-center group/wa rtl:right-auto rtl:left-0 rtl:flex-row-reverse">
          <a
            href={settings && settings["whatsapp_number"] ? `https://wa.me/${settings["whatsapp_number"]}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 pl-6 pr-4 py-3 rounded-l-full hover:bg-white/20 transition-all duration-300 hover:pr-8 rtl:rounded-l-none rtl:rounded-r-full rtl:pr-6 rtl:pl-4 rtl:hover:pl-8 group-hover/wa:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <span className="text-white font-bold tracking-widest uppercase text-sm" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
              {h.letsTouch}
            </span>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center animate-pulse">
              <img src={coloredwhatsapp} alt="WhatsApp" className="w-7 h-7" />
            </div>
          </a>
        </div>
      </section>

      {/* ─── EXPERIENCE SECTION ─── */}
      <section className="relative -mt-16 md:-mt-24 z-20 container mx-auto px-4 mb-24">
        <ScrollReveal variant="fadeUp" delay="200ms">
          <div className="glass shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden bg-white/80">
            {/* Decorative background element */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
            
            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
              <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative">
                <div className="relative w-full max-w-[360px] aspect-square bg-white rounded-[2.5rem] flex flex-col items-center justify-center shadow-lg border border-slate-100 overflow-hidden group">
                  {/* Decorative curve styled like an umbrella/canopy */}
                  {/* <img 
                    src={upCurve} 
                    alt="Curve Decoration" 
                    className={`absolute -top-2 left-1/2 -translate-x-1/2 w-72 object-contain transition-transform duration-700 group-hover:scale-105 ${lang === "ar" ? "scale-x-[-1]" : ""}`} 
                  /> */}
                  
                  {/* Larger Circle with Brain */}
                  <div className="w-56 h-56 rounded-full bg-blue-600/10 flex items-center justify-center relative z-10 animate-float border border-blue-600/20 shadow-inner">
                    <div className="absolute inset-0 rounded-full border-2 border-blue-600 animate-ping opacity-25"></div>
                    <img 
                      src={StrongBrain} 
                      alt="Experience Brain" 
                      className="w-38 lg:w-48 object-contain hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left rtl:lg:text-right">
                <div className="inline-flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm md:text-base">{h.establishedExcellence}</h2>
                  <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                </div>
                <div className="font-display text-7xl md:text-8xl lg:text-9xl font-bold text-slate-800 flex items-center justify-center lg:justify-start gap-4 mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400" dir="ltr">+10</span>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-slate-700 uppercase tracking-wide">
                  {h.yearsExp}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── ABOUT SECTION ─── */}
      <section className="container mx-auto px-4 mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <ScrollReveal variant="fadeRight" className="w-full lg:w-5/12">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-[3rem] transform rotate-3 scale-105 opacity-10"></div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-10 flex flex-col items-center justify-center relative shadow-xl overflow-hidden hover-lift">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                <img src={whiteBrain} alt="White Brain" className="w-48 h-48 object-contain mb-6 animate-pulse-slow" />
                <h3 className="font-display text-4xl font-bold text-white mb-2">{h.aboutTitle}</h3>
                <div className="w-12 h-1 bg-blue-300 rounded-full"></div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal variant="fadeLeft" className="w-full lg:w-7/12">
            <div className="pl-0 lg:pl-8 rtl:pl-0 rtl:lg:pr-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <img src={brainBlue} alt="Brain Icon" className="w-6 h-6 object-contain" />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-800">{h.whoWeAre}</h3>
              </div>
              <div className="relative">
                {/* Decorative quote mark */}
                <div className="absolute -top-6 -left-4 text-6xl text-blue-100 font-serif opacity-50 rtl:-right-4 rtl:-left-auto">"</div>
                <p className="text-slate-600 text-lg leading-relaxed mb-8 relative z-10 pl-6 rtl:pl-0 rtl:pr-6 border-l-4 border-blue-500 rtl:border-l-0 rtl:border-r-4">
                  {settings?.about_description || h.aboutText}
                </p>
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-800 group">
                <span className="uppercase tracking-widest text-sm relative overflow-hidden pb-1">
                  {h.learnMore}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                </span>
                <svg className={`w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2 ${lang === "ar" ? "rotate-180 group-hover:-translate-x-2" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MessageSection />
      <ServicesSection />
      <NewProjectCarousel />
      <PartnersSuccess />
    </div>
  );
}
