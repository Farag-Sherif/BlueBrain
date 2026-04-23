import { Link } from "react-router-dom";
import serviceTitleBG from "../../assets/Images/Home/serviceTitleBG.png";
import { useLang } from "../../i18n/LanguageContext";
import "./Home.css";
import { useEffect, useState } from "react";



const ServicesSection = () => {
  const { t, lang, api } = useLang();
  const h = t.home;
  const [services, setServices] = useState(h.services);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await api.getServices();
      console.log(data);
      if (data.length > 0) {
        setServices(data);
      } else {
        // fallback to translation data if API returns empty
        setServices(h.services);
      }
    };
    fetchServices();
  }, [lang]); // ← refetch every time lang changes

  return (
    <section className="pt-20 services overflow-x-hidden">
      <div className="flex flex-col items-start gap-5 mb-10 container mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-bold mainC uppercase">
          {h.servicesTitle[0]}
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold mainC uppercase md:-mt-15">
          {h.servicesTitle[1]}
          <span className="text-7xl md:text-9xl font-bold">
            {lang === "en" ? "?" : "؟"}
          </span>
        </h1>
      </div>

      <div className="flex flex-col pt-40">
        {services.map((svc, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={svc.id}
              className={`
                relative z-0 w-full
                flex flex-col gap-40 items-center justify-around
                md:gap-10 mb-40
                ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
              `}>
              <img
                src={svc.image}
                alt={svc.title}
                className={`w-70 h-80 object-cover rounded-3xl mx-20 ${
                  lang === "ar"
                    ? isEven
                      ? "rotate-0 md:rotate-20"
                      : "rotate-0 md:-rotate-20"
                    : isEven
                      ? "rotate-0 md:-rotate-20"
                      : "rotate-0 md:rotate-20"
                }`}
              />

              <div className="tit md:w-1/2 lg:w-fit">
                <Link
                  to="services"
                  className={`serviceTitle group flex flex-col ${isEven ? "items-start" : "items-end"} xl:w-md`}>
                  <span className="flex flex-col leading-tight -mt-25 md:mt-0">
                    {lang === "en" ? (
                      svc.title.split(" ").map((word, i) => (
                        <span
                          key={i}
                          className="text-2xl mt-1 md:text-3xl main lg:text-4xl xl:text-5xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                          {word}
                        </span>
                      ))
                    ) : (
                      <span className="text-2xl leading-tight mt-1 w-1/2 md:w-fit  mx-auto md:text-3xl main lg:text-4xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                        {svc.title}
                      </span>
                    )}
                  </span>
                </Link>
                <span
                  className={`description absolute top-full ${
                    lang === "en"
                      ? isEven
                        ? "right-0"
                        : "left-0 md:left-20"
                      : isEven
                        ? "left-0"
                        : "right-0 md:right-20"
                  } mt-3 w-full md:w-1/2 h-fit px-10 block text-sm md:text-base secondC leading-relaxed max-h-0 opacity-0 hover:max-h-fit hover:opacity-100 transition-all duration-500 ease-in-out`}>
                  {svc.description}
                </span>
              </div>

              <img
                src={serviceTitleBG}
                alt=""
                aria-hidden="true"
                className={`
                  w-full md:w-1/2
                  absolute -bottom-5 sm:-bottom-20 md:bottom-20 lg:bottom-0
                  -z-1
                  ${
                    lang === "ar"
                      ? isEven
                        ? "left-0 scale-x-[-1]"
                        : "right-0"
                      : isEven
                        ? "right-0"
                        : "left-0 scale-x-[-1]"
                  }
                `}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
