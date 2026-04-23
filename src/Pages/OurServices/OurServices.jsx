import { useEffect, useState } from "react";
import serviceTitleBG from "../../assets/Images/Services/serviceTitleBG.png";
import Title from "../../Components/Title/Title";
import { useLang } from "../../i18n/LanguageContext";

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 12 12">
    <polyline
      points="2,6 5,9 10,3"
      stroke="#123EF2"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ServiceIcon = ({ service }) => {
  if (!service.icon) {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="15" r="8" fill="#8aafd6" />
        <path d="M4 36c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="#8aafd6" />
      </svg>
    );
  }
  return <div dangerouslySetInnerHTML={{ __html: service.icon }} />;
};

const ServiceCard = ({ service, s }) => {
  const [hovered, setHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ offer: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.offer.trim() || !form.phone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setForm({ offer: "", phone: "" });
    }, 2000);
  };

  const handleClose = () => {
    setShowForm(false);
    setForm({ offer: "", phone: "" });
    setSubmitted(false);
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-down { animation: slideDown 0.25s ease forwards; }
      `}</style>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rounded-2xl overflow-hidden transition-all duration-300 bg-white"
        style={{
          boxShadow: hovered
            ? "0 20px 50px rgba(37,99,235,0.25)"
            : "0 10px 30px rgba(0,0,0,0.08)",
          transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0)",
        }}>
        {/* Card Header */}
        <div
          className="relative min-h-50 px-6 pt-6 pb-4 border-b border-white/10 bg-cover bg-center"
          style={{ backgroundImage: `url(${serviceTitleBG})` }}>
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
            <ServiceIcon service={service} />
          </div>
          <h3 className="text-white font-bold text-base mb-1">
            {service.title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Card Body */}
        <div className="px-6 pt-5 pb-6">
          <p className="text-blue-900 font-bold text-sm mb-3">
            {s.whatWeOffer}
          </p>
          <ul className="space-y-3">
            {service.features.map((offer, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white shadow-2xl shadow-gray-800 rounded-full flex items-center justify-center shrink-0 p-[3px]">
                  <CheckIcon />
                </div>
                <span className="text-sm text-gray-600 leading-relaxed">
                  {offer.title}
                </span>
              </li>
            ))}
          </ul>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full mt-5 py-2.5 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-100"
              style={{
                background:
                  "linear-gradient(90deg, rgb(18 62 242 / 53%) 0%, #000099 100%)",
                boxShadow: "0 4px 15px rgba(37,99,235,0.3)",
              }}>
              {s.writeOffer}
            </button>
          )}

          {showForm && (
            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/70 p-4 slide-down">
              <div className="flex items-center justify-between mb-4">
                <p className="text-blue-900 font-bold text-sm">
                  {s.submitOfferTitle}
                </p>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-50">
                  <CloseIcon />
                </button>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center py-4 gap-2">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #2563eb, #000099)",
                    }}>
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-900 font-semibold text-sm">
                    {s.offerSuccess}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-blue-800 tracking-wide">
                      {s.offerLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={s.offerPlaceholder}
                      value={form.offer}
                      onChange={(e) =>
                        setForm({ ...form, offer: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-blue-200 bg-white outline-none focus:border-blue-500 transition-all placeholder-gray-400 text-gray-700"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-blue-800 tracking-wide">
                      {s.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      placeholder={s.phonePlaceholder}
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-blue-200 bg-white outline-none focus:border-blue-500 transition-all placeholder-gray-400 text-gray-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-1 py-2.5 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-100"
                    style={{
                      background:
                        "linear-gradient(90deg, rgb(18 62 242 / 53%) 0%, #000099 100%)",
                      boxShadow: "0 4px 15px rgba(37,99,235,0.3)",
                    }}>
                    {s.sendOffer}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default function OurServices() {
  const { t, lang, api } = useLang();
  const s = t.services;
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await api.getServices();
      console.log(data);
      if (data.length > 0) {
        setServices(data);
      } else {
        console.error("Error fetching services");
      }
    };
    fetchServices();
  }, [lang]);

  return (
    <div className="pb-20">
      <Title>{s.pageTitle}</Title>
      <div className="text-center pt-12 pb-20">
        <h1 className="inline-flex items-center gap-3 text-3xl md:text-5xl lg:text-6xl font-black text-blue-900">
          <span className="w-15 h-15 flex items-center justify-center rounded-lg">
            🛠️
          </span>
          {s.pageTitle}
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-6 container mx-auto px-6 pb-12">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} s={s} />
        ))}
      </div>
    </div>
  );
}
