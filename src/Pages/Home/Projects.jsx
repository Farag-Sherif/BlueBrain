import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../Components/Carousel/Carousel";
import { useLang } from "../../i18n/LanguageContext";

const videoUrl = "https://www.youtube.com/embed/";
  //  CARD
function ProjectCard({ project, onWatch }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#f3d5db] shadow-md">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-52 object-cover"
      />

      <div className="flex justify-between items-center p-3">
        <span className="font-semibold text-[#1e1b4b]">{project.title}</span>

        <div className="flex gap-2 items-center">
          <Link
            to={`/project-details/${project.id}`}
            className="text-sm font-semibold text-[#3730a3]">
            View
          </Link>

          <button
            onClick={() => onWatch(project)}
            className="bg-[#3730a3] text-white px-3 py-1 rounded-lg">
            Watch
          </button>
        </div>
      </div>
    </div>
  );
}

  //  MAIN COMPONENT
export default function NewProjectCarousel() {
  const { t, lang, api } = useLang();
    const h = t.home;
  const [video, setVideo] = useState(null);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await api.getProjects();
      console.log(data);
      if (data.length > 0) {
        setProjects(data);
      } else {
        console.error("Error fetching projects");
        
      }
    };
    fetchProjects();
  }, [ lang]); 


  return (
    <div className="py-20 container mx-auto px-8">
      {/* Title */}
      <div className="title flex items-center gap-5 mb-10">
        <span className="w-5 h-5 main rounded-full block"></span>
        <h1 className="text-4xl md:text-6xl font-bold secondC uppercase">
          {h.projectsTitle}
        </h1>
        <span className="w-30 h-[4px] main rounded-full block"></span>
      </div>
      {/* CAROUSEL */}
      <Carousel>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onWatch={setVideo} />
        ))}
      </Carousel>

      {/* VIDEO MODAL */}
      {video && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          {/* CLOSE */}
          <button
            onClick={() => setVideo(null)}
            className="absolute top-5 right-5 text-white text-3xl">
            ✕
          </button>

          {/* VIDEO */}
          <div className="w-[90%] md:w-[70%] aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={videoUrl}
              title={"video"}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
