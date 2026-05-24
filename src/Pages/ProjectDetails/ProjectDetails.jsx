import Title from "../../Components/Title/Title";
import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";

export default function ProjectDetails() {
  const { lang, t, api } = useLang();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const data = await api.getProjectById(id);
      setProject(data);
      if (data && data.media && data.media.length > 0) {
        setActiveMedia(data.media[0]);
      } else if (data && data.image_cover) {
        setActiveMedia({ type: "image", media: data.image_cover });
      }
      setLoading(false);
    };
    fetchProject();
  }, [id, lang]);

  if (loading) return <Loading />;
  if (!project) return <div className="text-center py-32 text-xl">{t.projects.notFound || "Project not found."}</div>;

  return (
    <div className="bg-[var(--surface-alt)] min-h-screen">
      {/* Dynamic Title with Project Name */}
      <Title>{project.title}</Title>

      <div className="container mx-auto px-4 pb-32">
        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-slate-100 mb-16 -mt-20 relative z-10">
          {/* Main Media Showcase */}
          <div className="aspect-[16/9] w-full bg-slate-900 relative">
            {activeMedia && activeMedia.type === "video" ? (
              <iframe
                src={activeMedia.media}
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen
                title="Project Video"
              />
            ) : activeMedia ? (
              <img
                src={activeMedia.media}
                alt="Project Media"
                className="w-full h-full object-cover absolute inset-0"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-slate-500">
                No Media
              </div>
            )}
            
            {/* Dark gradient overlay for text readability if we add text inside */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>

          <div className="p-10 md:p-16 flex flex-col lg:flex-row gap-12">
            {/* Project Details */}
            <div className="w-full lg:w-2/3">
              <ScrollReveal variant="fadeRight">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                  <h2 className="font-display text-4xl font-bold text-slate-800">{project.title}</h2>
                </div>
                <div className="prose prose-lg prose-blue max-w-none text-slate-600 leading-relaxed font-light">
                  <p className="whitespace-pre-wrap">{project.description}</p>
                </div>
              </ScrollReveal>
            </div>

            {/* Project Sidebar */}
            <div className="w-full lg:w-1/3">
              <ScrollReveal variant="fadeLeft">
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                  <h3 className="font-bold text-xl text-slate-800 mb-6 uppercase tracking-wider">{t.projects.projectInfo || "Project Info"}</h3>
                  
                  {project.client && (
                    <div className="mb-6">
                      <span className="block text-slate-400 text-sm font-semibold uppercase tracking-widest mb-1">{t.projects.client || "Client"}</span>
                      <span className="text-slate-800 font-medium">{project.client}</span>
                    </div>
                  )}
                  
                  {project.tags && project.tags.length > 0 && (
                    <div>
                      <span className="block text-slate-400 text-sm font-semibold uppercase tracking-widest mb-3">{t.projects.tags || "Tags"}</span>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 shadow-sm">
                            {tag?.name || tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Media Gallery Grid */}
        {project.media && project.media.length > 1 && (
          <ScrollReveal variant="fadeUp">
            <h3 className="font-display text-3xl font-bold text-slate-800 mb-8 uppercase tracking-wide px-4">
              {t.projects.gallery || "Gallery"}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
              {project.media.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMedia(m)}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    activeMedia === m ? 'ring-4 ring-blue-500 ring-offset-2' : 'hover:opacity-90'
                  }`}
                >
                  {m.type === "video" ? (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4l12 6-12 6z" />
                      </svg>
                      <img src={project.image_cover} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    </div>
                  ) : (
                    <img src={m.media} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
