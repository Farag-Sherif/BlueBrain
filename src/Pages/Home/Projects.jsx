import Carousel from "../../Components/Carousel/Carousel";
import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";

export default function NewProjectCarousel() {
  const [video, setVideo] = useState(null);
  const { api, t, lang } = useLang();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await api.getProjects();
      console.log("Fetched Projects:", data);
      setProjects(data);
    };
    fetchProjects();
  }, []);

  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 rounded-l-[100px] -z-10 rtl:right-auto rtl:left-0 rtl:rounded-l-none rtl:rounded-r-[100px]"></div>

      <div className="container mx-auto px-4">
        <ScrollReveal variant="fadeUp">
          <div className="flex items-center justify-between mb-16 flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <span className="w-3 h-3 rounded-full bg-[#125EF2] shrink-0"></span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mainC uppercase tracking-wide">
                {t.home.projectsTitle}
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-[#125EF2] font-bold hover:text-blue-800 transition-colors group/link"
            >
              <span className="uppercase tracking-widest text-sm relative pb-1">
                {lang === "ar" ? "عرض الكل" : "View All"}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#125EF2] transform scale-x-0 transition-transform duration-300 origin-left group-hover/link:scale-x-100"></span>
              </span>
              <svg className={`w-5 h-5 transform transition-transform duration-300 group-hover/link:translate-x-2 ${lang === "ar" ? "rotate-180 group-hover/link:-translate-x-2" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeIn" delay="200ms">
          <Carousel>
            {projects.map((p, index) => (
              <ProjectCard key={p.id} p={p} index={index} setVideo={setVideo} t={t} lang={lang} hideTags={true} />
            ))}
          </Carousel>
        </ScrollReveal>

        {/* Video Modal */}
        {video && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0a1628]/90 backdrop-blur-md" onClick={() => setVideo(null)}></div>
            <div className="relative z-10 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10 animate-fadeInUp">
              <button
                onClick={() => setVideo(null)}
                className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white hover:bg-red-500 hover:scale-110 transition-all duration-300 rtl:right-auto rtl:left-4"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                <video
                  src={video}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
