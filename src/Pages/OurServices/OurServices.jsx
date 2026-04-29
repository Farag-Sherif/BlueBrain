import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";
import Title from "../../Components/Title/Title";
import serviceTitleBG from "../../assets/Images/Home/serviceTitleBG.png";
import Loading from "../../Components/Loading/Loading";

// ─── OfferModal ───────────────────────────────────────────────────────────────
function OfferModal({ service, onClose }) {
  const { t, lang, api } = useLang();
  const s = t.services;

  const [form, setForm] = useState({ phone: "", offer: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async () => {
    if (!form.phone || !form.offer) return;
    setLoading(true);
    try {
      const res = await api.sendConsultation({
        name: service.title,
        phone: form.phone,
        type: service.title,
        consultation: form.offer,
      });
      if (res?.status) {
        setSent(true);
        setForm({ phone: "", offer: "" });
        setTimeout(() => {
          setSent(false);
          onClose();
        }, 2500);
      } else {
        alert(s.sendOffer);
      }
    } catch {
      alert(s.sendOffer);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative"
        dir={lang === "ar" ? "rtl" : "ltr"}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 transition text-lg font-bold">
          ✕
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 main rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-extrabold mainC">
              {s.submitOfferTitle}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {s.whatWeOffer}{" "}
              <span className="font-semibold secondC">{service.title}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {s.phoneLabel}
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={handle("phone")}
              placeholder={s.phonePlaceholder}
              className="w-full border-2 border-indigo-100 focus:border-indigo-500 rounded-xl px-4 py-2.5 outline-none text-sm transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {s.offerLabel}
            </label>
            <textarea
              rows={4}
              value={form.offer}
              onChange={handle("offer")}
              placeholder={s.offerPlaceholder}
              className="w-full border-2 border-indigo-100 focus:border-indigo-500 rounded-xl px-4 py-2.5 outline-none text-sm resize-none transition"
            />
          </div>
          {sent ? (
            <div className="text-center py-3 text-green-600 font-bold text-sm bg-green-50 rounded-xl">
              ✓ {s.offerSuccess}
            </div>
          ) : (
            <button
              onClick={submit}
              disabled={loading || !form.phone || !form.offer}
              className="w-full main text-white py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
              {loading ? "..." : s.sendOffer}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ServiceCard ──────────────────────────────────────────────────────────────
function ServiceCard({ service, index, lang, onOfferClick }) {
  const { t } = useLang();
  const s = t.services;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-md transition-all duration-500 cursor-pointer border-2 ${
        expanded
          ? "shadow-2xl -translate-y-2 border-indigo-500"
          : "border-transparent hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-500"
      }`}>
      <div className="absolute top-4 left-4 z-10 w-10 h-10 main rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="relative h-56 overflow-hidden bg-indigo-50">
        <img
          src={service.image}
          alt={service.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${expanded ? "scale-110" : "group-hover:scale-110"}`}
        />
        <div
          className={`absolute inset-0 bg-indigo-900/50 transition-opacity duration-300 flex items-center justify-center ${expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
          <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center bg-white/20 backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <h3
          className={`font-extrabold text-lg transition-colors duration-300 ${expanded ? "text-indigo-700" : "mainC group-hover:text-indigo-700"}`}>
          {service.title}
        </h3>
        <p
          className={`text-sm text-gray-500 leading-relaxed transition-all duration-500 overflow-hidden ${expanded ? "max-h-40 opacity-100" : "max-h-12 opacity-70"}`}>
          {service.description}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOfferClick(service);
          }}
          className={`mt-1 w-full py-2 rounded-xl text-sm font-bold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 ${expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          + {s.writeOffer}
        </button>
        <div
          className={`h-[3px] main rounded-full transition-all duration-500 ${expanded ? "w-full" : "w-0 group-hover:w-full"}`}
        />
      </div>
    </div>
  );
}

// ─── OurServices ──────────────────────────────────────────────────────────────
export default function OurServices() {
  const { t, lang, api } = useLang();
  const h = t.home;
  const s = t.services;

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const data = await api.getServices();
      if (data?.length > 0) {
        setServices(data);
      } else {
        setServices(h.services ?? []);
      }
      setLoading(false);
    };
    fetchServices();
  }, [lang]);

  if (loading) return <Loading />;

  return (
    <>
      <Title>{s.pageTitle}</Title>
      <section
        className="relative pb-32 pt-10"
        dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="container mx-auto px-5 mb-16">
          <div className="flex flex-col items-start md:gap-2 mb-2">
            <h1 className="text-xl md:text-5xl font-bold mainC uppercase">
              {h.servicesTitle?.[0]}
            </h1>
            <h1 className="text-2xl md:text-6xl font-bold mainC uppercase -mt-5 md:-mt-15">
              {h.servicesTitle?.[1]}
              <span className="text-5xl md:text-9xl font-bold">
                {lang === "ar" ? "؟" : "?"}
              </span>
            </h1>
          </div>
          <p className="text-gray-500 max-w-xl text-sm md:text-base leading-relaxed mt-4">
            {h.aboutText}
          </p>
        </div>

        <img
          src={serviceTitleBG}
          alt=""
          aria-hidden="true"
          className={`absolute -top-20 w-full md:w-1/2 opacity-30 -z-10 ${lang === "ar" ? "left-0 scale-x-[-1]" : "right-0"}`}
        />

        <div className="container mx-auto pt-10 px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((svc, index) => (
              <ServiceCard
                key={svc.id ?? index}
                service={svc}
                index={index}
                lang={lang}
                onOfferClick={setSelectedService}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-5 mt-20">
          <div className="second rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                {lang === "ar"
                  ? "مستعد تبدأ مشروعك؟"
                  : "Ready to start your project?"}
              </h2>
              <p className="text-white/70 text-sm">
                {lang === "ar"
                  ? "تواصل معنا الآن واحصل على استشارة مجانية"
                  : "Contact us now and get a free consultation"}
              </p>
            </div>
            <a
              href="/consultation"
              className="main px-8 py-3 rounded-2xl text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-300 whitespace-nowrap">
              {lang === "ar" ? "ابدأ الآن" : "Get Started"}
            </a>
          </div>
        </div>
      </section>

      {selectedService && (
        <OfferModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}
