import messageImage from "../../Assets/Images/Home/image1.png";
import { useLang } from "../../i18n/LanguageContext";

// ====================== BenefitCard Component ======================
const BenefitCard = ({ title, description }) => (
  <div className="border border-white/70 rounded-xl p-6 bg-white/10 backdrop-blur-sm">
    <div className="flex items-center gap-2 mb-3">
      <span className="text-white font-bold text-xl -mt-12 bg-[#145ff0] px-4 py-1 rounded-full">
        {title}
      </span>
    </div>
    <p className="text-white text-sm leading-relaxed opacity-90">
      {description}
    </p>
  </div>
);

// ====================== MessageSection Component ======================
function MessageSection() {
  const { t, lang } = useLang();
  const h = t.home;


  return (
    <div className="w-full min-h-screen flex items-center justify-center py-60 relative z-0 main">
      <div class="custom-shape-divider-top-1776792837">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"></path>
        </svg>
      </div>
      <div class="custom-shape-divider-bottom-1776792791">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"></path>
        </svg>
      </div>

      <div className="relative container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-12 gap-0 md:gap-8">
          <h1 className="text-white font-black text-6xl md:text-7xl uppercase tracking-tighter">
            {h.messageTitle}
          </h1>
          <p className="text-white font-semibold text-lg md:text-xl mt-3">
            {h.messageSubtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-0 w-full lg:w-2/3">
          {h.messageText.map((benefit, index) => (
            <BenefitCard key={index} title={benefit.title} description={ benefit.description} />
          ))}
        </div>
      </div>

      {/* Person Image - Overlapping */}
      <div
        className={`hidden lg:block absolute top-1/2 transform -translate-y-1/2 z-10 ${lang === "ar" ? "left-0 scale-x-[-1]" : "right-0"} w-1/3`}>
        <img
          src={messageImage}
          alt="Strong Brain"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default MessageSection;
