import Title from "../../Components/Title/Title";
import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";
import Loading from "../../Components/Loading/Loading";
import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";

export default function OurProjects() {
  const { lang, t, api } = useLang();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const data = await api.getProjects();
    setProjects([...data].sort((a, b) => a.order - b.order));
      setLoading(false);
    };
    fetchProjects();
  }, [lang]);

  if (loading) return <Loading />;
  

  return (
    <div className=" min-h-screen pb-32 mainC">
      <Title>{t.projects.pageTitle}</Title>
      
      <div className="container mx-auto px-4">
        {/* Intro Header */}
        <ScrollReveal variant="fadeUp" className="mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left rtl:md:text-right">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#125EF2] mb-4 uppercase tracking-wide">
                {t.projects.title || t.home.projectsTitle}
              </h2>
              <p className="text-slate-600 text-lg font-light">
                {lang === "ar" 
                  ? `${projects.length} مشروع تم تنفيذه بنجاح` 
                  : `${projects.length} Projects Successfully Delivered`
                }
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {t.projects.completed}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                {t.projects.inProgress}
              </div>
            </div>
          </div>
          <div className="w-24 h-1.5 bg-[#125EF2] rounded-full mt-8 mx-auto md:mx-0 rtl:md:mr-0"></div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <ScrollReveal key={p.id} variant="fadeUp" delay={`${(index % 3) * 120}ms`}>
              <ProjectCard p={p} index={index} t={t} lang={lang} setVideo={setVideo} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {video && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0a1628]/90 backdrop-blur-md" onClick={() => setVideo(null)}></div>
          <div className="relative z-10 h-[85vh] max-h-[800px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border border-white/10 animate-fadeInUp">
            <button
              onClick={() => setVideo(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass-dark flex items-center justify-center text-white hover:bg-red-500 hover:scale-110 transition-all duration-300 rtl:right-auto rtl:left-4"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full h-full bg-black">
              <video src={video} className="w-full h-full object-cover" controls autoPlay />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
