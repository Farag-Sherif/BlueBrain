import { useEffect, useState } from "react";
import strongBrain from "../../assets/Images/Home/StrongBrain.png";
import curve from "../../assets/Images/Home/serviceTitleBG.png";
import Brain from "../../assets/Images/brainBlue.png";
import Title from "../../Components/Title/Title";
import { useLang } from "../../i18n/LanguageContext";
import Loading from "../../Components/Loading/Loading";

export default function About() {
  const { t, api, lang } = useLang();
  const a = t.about;

  const [clients, setClients] = useState([]);
  const [faq, setFaq] = useState([]);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [clientsData, faqData, settingsData] = await Promise.all([
        api.getClients(),
        api.getFaq(),
        api.getSettings(),
      ]);
      setClients(clientsData.length > 0 ? clientsData : []);
      setFaq(faqData);
      if (settingsData) setAbout(settingsData);
      setLoading(false);
    };
    fetchData();
  }, [lang]);

  if (loading) return <Loading />;

  return (
    <div className="relative">
      <Title>{a.pageTitle}</Title>
      <section className="pb-20">
        {/* WHO WE ARE */}
        <div className="relative">
          <img
            src={curve}
            alt="curve"
            className={`w-full md:w-1/2 h-auto absolute bottom-0 md:translate-y-0 md:bottom-0 ${
              lang === "ar" ? "right-0" : "left-0 scale-x-[-1]"
            } -z-1`}
          />
          <div className="about px-5 container mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 h-fit">
              <img
                src={strongBrain}
                alt="brain"
                className="w-full h-auto pt-10"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span>
                  <img
                    src={Brain}
                    alt=""
                    className="w-10 h-10 object-contain"
                  />
                </span>
                <h3 className="font-bold text-indigo-900 text-2xl lg:text-3xl">
                  {a.whoWeAre}
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="text-xl font-bold mainC">BLUE BRAIN </span>
                {about?.about_description ??
                  `is your strategic partner for excellence and creativity in design and digital development. We provide visual identity, logo design, video ads, social media design, apps and websites. Founded in 2014, we have served over 200 clients across Egypt, Saudi Arabia, and beyond.`}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        {faq.length > 0 && (
          <div className="py-20 px-5 container mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-indigo-900 mb-10">
              {a.questionsTitle}
            </h2>
            <div className="flex flex-col gap-4">
              {faq.map((item, i) => (
                <AccordionItem key={i} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* PARTNERS */}
        {clients.length > 0 && (
          <div className="py-20 px-5 container mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-indigo-900 mb-10 leading-tight whitespace-pre-line">
              {a.partnersTitle}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[#125ef291] rounded-2xl justify-center">
                  <img
                    src={client.logo}
                    alt={`Client ${index}`}
                    className="w-full h-40 p-5 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className={`rounded-xl px-5 py-4 cursor-pointer transition-all duration-200 ${open ? "second" : "main"}`}>
      <div className="flex justify-between items-center">
        <span className="text-white text-sm font-medium">{item.question}</span>
        <span className="text-white text-xs">{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <p className="mt-3 text-sm text-white/80 leading-relaxed">
          {item.answer}
        </p>
      )}
    </div>
  );
}
