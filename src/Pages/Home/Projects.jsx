import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../Components/Carousel/Carousel";
import { useLang } from "../../i18n/LanguageContext";
import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";

function ProjectCard({ project, onWatch }) {
  const firstVideo = project.media?.find((m) => m.type === "video");

  return (
    <div className="rounded-2xl overflow-hidden shadow-md">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-52 object-contain py-5 bg-[#125df25e]"
      />
      <div className="flex justify-between items-center p-3">
        <span className="font-semibold secondC line-clamp-1">
          {project.title}
        </span>
        <div className="flex gap-2 items-center">
          <Link
            to={`/project-details/${project.id}`}
            className="text-sm font-semibold text-[#3730a3]">
            View
          </Link>
          {firstVideo && (
            <button
              onClick={() => onWatch(firstVideo)}
              className="bg-[#3730a3] text-white px-3 py-1 rounded-lg">
              Watch
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NewProjectCarousel() {
  const { t, lang, api } = useLang();
  const h = t.home;
  const [video, setVideo] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await api.getProjects();
      if (data.length > 0) {
        setProjects(data);
        // console.log(data);
      }
    };
    fetchProjects();
  }, [lang]);

  return (
    <div className="py-20 container mx-auto px-8">
      <ScrollReveal variant="fadeUp">
        <div className="title flex items-center gap-5 mb-10">
          <span className="w-5 h-5 main rounded-full block"></span>
          <h1 className="text-4xl md:text-6xl font-bold secondC uppercase">
            {h.projectsTitle}
          </h1>
          {/* <span className="w-30 h-[4px] main rounded-full block"></span> */}
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fadeUp" delay="150ms">
        <Carousel>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onWatch={setVideo} />
          ))}
        </Carousel>
      </ScrollReveal>

      {video && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={() => setVideo(null)}
            className="absolute top-5 right-5 text-white text-3xl">
            ✕
          </button>
          <div className="w-[90%] md:w-[70%] aspect-video bg-black rounded-lg overflow-hidden">
            <video
              className="w-full h-full"
              src={video.file}
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  );
}
