import Title from "../../Components/Title/Title";
import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";
import Loading from "../../Components/Loading/Loading";
import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";

const OfferModal = ({ service, onClose, t, api }) => {
  const [form, setForm] = useState({ phone: "", offer: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.phone || !form.offer) return;
    setLoading(true);
    await api.sendQuote({
      service_id: service.id,
      phone: form.phone,
      offer: form.offer,
    });
    setLoading(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeInUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex justify-between items-center text-white">
          <h3 className="font-display font-bold text-2xl">{t.services.submitOfferTitle}</h3>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-8">
          <div className="mb-6 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            {service.title}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wide">{t.services.phoneLabel}</label>
              <input
                type="text"
                placeholder={t.services.phonePlaceholder}
                className="input-modern"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wide">{t.services.offerLabel}</label>
              <textarea
                rows="4"
                placeholder={t.services.offerPlaceholder}
                className="input-modern resize-y min-h-[100px]"
                value={form.offer}
                onChange={(e) => setForm({ ...form, offer: e.target.value })}
                required
              ></textarea>
            </div>
            
            {sent ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center justify-center gap-2 font-bold animate-fadeIn">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t.services.offerSuccess}
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {loading && (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {t.services.sendOffer}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service, index, t, onOffer, isActive, onClick }) => {
  const { lang } = useLang();

  return (
    <div 
      onClick={onClick}
      className={`group relative w-full aspect-[3.2/4] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#125EF2] to-[#0D47C2] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/10 cursor-pointer ${isActive ? '-translate-y-2 shadow-2xl' : ''}`}
    >
      
      {/* Oval Blur behind the floating image */}
      <div className={`absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/20 rounded-full blur-[40px] z-0 pointer-events-none transition-all duration-700 group-hover:scale-125 group-hover:opacity-70 ${isActive ? 'scale-125 opacity-70' : ''}`}></div>
      
      {/* Giant Watermark Number */}
      <div className={`absolute -bottom-10 -left-6 text-[10rem] font-display font-black text-white/15 select-none leading-none z-20 pointer-events-none transition-transform duration-500 group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
        {String(index + 1).padStart(2, '0')}
      </div>
      
      {/* Full-bleed Cover Image */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <img
          src={service.image || `https://ui-avatars.com/api/?name=S${index + 1}&background=125EF2&color=fff&size=600`}
          alt={service.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 ${isActive ? 'scale-110 opacity-100' : ''}`}
          onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=S${index + 1}&background=125EF2&color=fff&size=600`; }}
        />
        {/* Dark overlay on image for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#0D47C2]/90 pointer-events-none"></div>
      </div>
      
      {/* Premium Gradient Scrim for text readability */}
      <div className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0D47C2] via-[#0D47C2]/90 to-transparent z-15 transition-all duration-500 group-hover:h-[80%] pointer-events-none ${isActive ? 'h-[80%]' : ''}`}></div>

      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-25 text-white flex flex-col justify-end h-full">
        <div className={`transition-transform duration-500 group-hover:-translate-y-16 ${isActive ? '-translate-y-16' : ''}`}>
          <h3 className="text-xl md:text-2xl font-bold font-display mb-1 text-white transition-colors">
            {service.title}
          </h3>
          
          <p className={`text-slate-200/90 leading-relaxed text-sm transition-all duration-500 ${isActive ? 'line-clamp-none' : 'line-clamp-1 group-hover:line-clamp-none'}`}>
            {service.description}
          </p>
        </div>

        {/* Action Button: Get Offer */}
        <div className={`absolute bottom-6 left-6 right-6 transition-all duration-500 delay-100 ${isActive ? 'opacity-100 translate-y-0 z-30' : 'opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOffer(service);
            }}
            className="w-full bg-white hover:bg-blue-50 text-[#125EF2] font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm tracking-wide text-center cursor-pointer"
          >
            {t.services.writeOffer}
          </button>
        </div>
      </div>

    </div>
  );
};

export default function OurServices() {
  const { lang, t, api } = useLang();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const data = await api.getServices();
      setServices(data?.length ? data : t.home.services);
      setLoading(false);
    };
    fetchServices();
  }, [lang]);

  if (loading) return <Loading />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Title>{t.services.pageTitle}</Title>
      
      <div className="container mx-auto px-4 pb-32">
        {/* Intro */}
        <ScrollReveal variant="fadeUp" className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#125EF2] mb-6 uppercase tracking-wide">
            {t.services.title}
          </h2>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            {t.services.subtitle}
          </p>
          <div className="w-24 h-1.5 bg-[#125EF2] rounded-full mx-auto mt-8"></div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.id || index} variant="fadeUp" delay={`${(index % 3) * 100}ms`}>
              <ServiceCard 
                service={service} 
                index={index} 
                t={t} 
                onOffer={setSelectedService} 
                isActive={activeCardIndex === index}
                onClick={() => setActiveCardIndex(activeCardIndex === index ? null : index)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0d2045] to-blue-900 py-24 overflow-hidden mt-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal variant="zoomIn">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">{t.services.transformTitle}</h2>
            <p className="text-blue-100/80 text-xl max-w-2xl mx-auto mb-10 font-light">{t.services.transformSubtitle}</p>
            <a href="/consultation" className="inline-block bg-white text-blue-700 font-bold px-10 py-5 rounded-full shadow-xl hover:bg-blue-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest text-sm">
              {t.services.getConsultation}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Offer Modal */}
      {selectedService && (
        <OfferModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
          t={t} 
          api={api} 
        />
      )}
    </div>
  );
}
