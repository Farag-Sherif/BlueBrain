import Title from "../../Components/Title/Title";
import { useEffect, useState } from "react";
import StrongBrain from "../../assets/Images/Home/StrongBrain.png";
import serviceTitleBG from "../../assets/Images/Home/serviceTitleBG.png";
import brainBlue from "../../assets/Images/Home/BlueBrain.png";
import { useLang } from "../../i18n/LanguageContext";
import Loading from "../../Components/Loading/Loading";
import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className={`border rounded-2xl mb-4 transition-all duration-300 overflow-hidden ${isOpen ? 'border-blue-500 shadow-md bg-blue-50/30' : 'border-slate-200 bg-white hover:border-blue-300'}`}>
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full px-6 py-5 text-left rtl:text-right"
      >
        <span className={`font-bold text-lg transition-colors duration-300 mainC`}>
          {title}
        </span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
          </svg>
        </span>
      </button>
      <div 
        className={`transition-all duration-500 ease-in-out px-6 ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0 overflow-hidden py-0'}`}
      >
        <div className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default function About() {
  const { lang, t, api } = useLang();
  const a = t.about;

  const [clients, setClients] = useState([]);
  const [faq, setFaq] = useState([]);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [clientsData, faqData, settingsData] = await Promise.all([
        api.getClients(),
        api.getFaq(),
        api.getSettings(),
      ]);
      if (clientsData?.length) setClients(clientsData);
      if (faqData?.length) setFaq(faqData);
      if (settingsData) setAbout(settingsData);
      setLoading(false);
    };
    fetchData();
  }, [lang]);

  if (loading) return <Loading />;

  return (
    <div className="bg-[var(--surface-alt)] min-h-screen">
      <Title>{a.pageTitle}</Title>

      {/* ─── WHO WE ARE SECTION ─── */}
      <section className="container mx-auto px-4 mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <ScrollReveal variant="fadeRight" className="w-full lg:w-5/12">
            <div className="relative group">
              {/* Decorative backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[3rem] transform rotate-3 scale-105 opacity-10 transition-transform duration-500 group-hover:rotate-6"></div>
              <div className="bg-white rounded-[3rem] p-10 flex flex-col items-center justify-center relative shadow-xl overflow-hidden border border-white">
                <img
                  src={serviceTitleBG}
                  alt=""
                  className={`absolute -top-10 -right-10 w-64 opacity-10 ${lang === "ar" ? "scale-x-[-1] -left-10 right-auto" : ""}`}
                />
                <div className="w-48 h-48 rounded-full bg-blue-50 flex items-center justify-center mb-8 relative z-10">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-ping opacity-20"></div>
                  <img
                    src={StrongBrain}
                    alt="Experience Brain"
                    className="w-32 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-display text-4xl font-bold text-[#125EF2] mb-2 relative z-10">
                  {a.pageTitle}
                </h3>
                <div className="w-12 h-1 bg-blue-600 rounded-full relative z-10"></div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeLeft" className="w-full lg:w-7/12">
            <div className="pl-0 lg:pl-8 rtl:pl-0 rtl:lg:pr-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shrink-0 shadow-inner">
                  <img
                    src={brainBlue}
                    alt="Brain Icon"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-bold text-[#125EF2]">
                  {a.whoWeAre}
                </h3>
              </div>

              <div className="bg-blue-700/50 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 rtl:right-auto rtl:-left-20"></div>

                <p className="text-lg leading-relaxed relative z-10 font-light opacity-90 text-justify">
                  {about?.about_description || a.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 relative z-10 border-t border-white/10 pt-8">
                  <div>
                    <h4 className="text-xl font-bold text-blue-300 mb-3 uppercase tracking-wider">
                      {a.mission}
                    </h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {a.missionText}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-300 mb-3 uppercase tracking-wider">
                      {a.vision}
                    </h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {a.visionText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
      {faq.length > 0 && (
        <section className="container mx-auto px-4 mb-32 max-w-4xl">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#125EF2] uppercase tracking-wide">
                {a.questionsTitle}
              </h2>
              <div className="w-24 h-1.5 bg-blue-600 rounded-full mx-auto mt-6"></div>
            </div>

            <div className="space-y-4">
              {faq.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.question}
                  content={item.answer}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ─── PARTNERS SECTION ─── */}
      {clients.length > 0 && (
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <div className="container mx-auto px-4">
            <ScrollReveal variant="fadeUp">
              <div className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-[#125EF2] uppercase tracking-wide">
                  {a.partnersTitle}
                </h2>
                <div className="w-24 h-1.5 bg-blue-600 rounded-full mx-auto mt-6"></div>
              </div>
            </ScrollReveal>

            {/* Using the infinite marquee layout for partners */}
            <div
              className="relative w-full overflow-hidden marquee-container flex flex-col gap-6 pb-4"
              dir="ltr">
              {/* Row 1 */}
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
                    className="w-48 lg:w-56 shrink-0 group aspect-[3/2] rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white cursor-pointer">
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="max-w-full max-h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Row 2 */}
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
                    className="w-48 lg:w-56 shrink-0 group aspect-[3/2] rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white cursor-pointer">
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="max-w-full max-h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
