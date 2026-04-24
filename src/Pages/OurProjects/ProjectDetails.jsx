import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import projectTitleBG from "../../assets/Images/Home/serviceTitleBG.png";
import Carousel from "../../Components/Carousel/Carousel";
import { useLang } from "../../i18n/LanguageContext";

const VideoCard = ({ item, onPlay }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-md">
    <div className="relative h-60 cursor-pointer" onClick={() => onPlay(item)}>
      <img src={item.file} alt="media" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-indigo-500/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white bg-white/20">
          ▶
        </div>
      </div>
    </div>
  </div>
);

export default function ProjectDetails() {
  const { id } = useParams();
  const { t, api, lang } = useLang();
  const p = t.projects;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const data = await api.getProjectDetails(id);
      setProject(data[0]);
      console.log(data);
      setLoading(false);
    };
    fetchProject();
  }, [id, lang]);

  const videos = project?.media?.filter((m) => m.type === "video") ?? [];
  const images = project?.media?.filter((m) => m.type === "image") ?? [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-indigo-900 text-xl font-bold animate-pulse">
          {p.loading}
        </span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-red-500 text-xl font-bold">{p.notFound}</span>
      </div>
    );
  }

  return (
    <section className="pb-20 pt-50" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* HEADER */}
      <div className="relative mb-20">
        <img
          src={projectTitleBG}
          alt=""
          className={`absolute bottom-0 ${
            lang === "ar" ? "left-0 scale-x-[-1]" : "right-0"
          } w-full md:w-1/2 h-1/2 md:h-auto`}
        />
        <div className="container mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src={project.image}
            alt={project.title}
            className="w-64 h-64 object-cover rounded-xl shadow-lg mb-15 mx-auto"
          />
          <div className="flex flex-col gap-3 items-center relative md:w-1/2 mb-15 md:mb-0 mt-15 lg:mt-0">
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {project.client}
            </span>
          </div>
        </div>
      </div>

      <div className="status container mx-auto px-5 flex items-center justify-between gap-6 mb-20">
        <div className="flex flex-wrap gap-2 justify-end">
          {project.tags?.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 rounded-full text-white text-xs font-semibold"
              style={{ backgroundColor: tag.color }}>
              {tag.name}
            </span>
          ))}
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            project.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}>
          {project.status === "completed" ? p.completed : p.inProgress}
        </span>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 hover:underline text-sm">
            🔗 {project.link}
          </a>
        )}
      </div>

      {/* TITLE + DESCRIPTION */}
      <div className="container mx-auto px-5 mb-20">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">
          {project.title}
        </h1>
        <p className="text-gray-700 leading-relaxed">{project.description}</p>
      </div>

      {/* VIDEO CAROUSEL */}
      {videos.length > 0 && (
        <div className="container mx-auto px-5 pb-20">
          <h2 className="text-4xl font-extrabold text-indigo-900 mb-10">
            {p.processTitle}
          </h2>
          <Carousel>
            {videos.map((v, i) => (
              <VideoCard key={i} item={v} onPlay={setVideo} />
            ))}
          </Carousel>
        </div>
      )}

      {/* IMAGES CAROUSEL */}
      {images.length > 0 && (
        <div className="container mx-auto px-5 pb-20">
          <h2 className="text-4xl font-extrabold text-indigo-900 mb-10">
            {p.designsTitle}
          </h2>
          <Carousel>
            {images.map((img, i) => (
              <img
                key={i}
                src={img.file}
                alt={`design-${i}`}
                className="w-full h-70 object-cover rounded-xl"
              />
            ))}
          </Carousel>
        </div>
      )}

      {/* VIDEO MODAL */}
      {video && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={() => setVideo(null)}
            className="absolute top-5 right-5 text-white text-3xl">
            ✕
          </button>
          <div className="w-[90%] md:w-[70%] aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={video.file}
              title="process video"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
