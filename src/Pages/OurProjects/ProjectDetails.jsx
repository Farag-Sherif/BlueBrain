import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import projectTitleBG from "../../assets/Images/Home/serviceTitleBG.png";
import Carousel from "../../Components/Carousel/Carousel";
import { useLang } from "../../i18n/LanguageContext";
import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";

const VideoCard = ({ item, onPlay }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-md">
    <div className="relative h-100 cursor-pointer" onClick={onPlay}>
      <video
        src={`${item.file}#t=0.1`}
        className="w-full h-full object-cover"
        muted
        preload="metadata"
      />
      <div className="absolute inset-0 bg-indigo-500/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white bg-white/20">
          ▶
        </div>
      </div>
    </div>
  </div>
);

function getExt(url) {
  return url.split("?")[0].split(".").pop().toLowerCase();
}

export default function ProjectDetails() {
  const { id } = useParams();
  const { t, api, lang } = useLang();
  const p = t.projects;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const data = await api.getProjects();
      const found = data.find((p) => String(p.id) === String(id));
      setProject(found ?? null);
      setLoading(false);
    };
    fetchProject();
  }, [id, lang]);

  const videos = project?.media?.filter((m) => m.type === "video") ?? [];
  const images = project?.media?.filter((m) => m.type === "image") ?? [];
  const files  = project?.media?.filter((m) => m.type === "file")  ?? [];

  const downloadableFile =
    files.find((f) => ["zip", "rar", "pdf", "docx", "doc"].includes(getExt(f.file))) || null;

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", url.split("/").pop()?.split("?")[0] || "file");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-indigo-900 text-xl font-bold animate-pulse">{p.loading}</span>
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
      <ScrollReveal variant="fadeUp">
        <div className="relative mb-20">
          <img
            src={projectTitleBG}
            alt=""
            className={`absolute bottom-0 ${lang === "ar" ? "left-0 scale-x-[-1]" : "right-0"} w-full md:w-1/2 h-1/2 md:h-auto`}
          />
          <div className="container mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
            <img
              src={project.image}
              alt={project.title}
              className="w-64 h-64 object-contain p-5 rounded-xl mb-15 mx-auto"
            />
            <div className="flex flex-col gap-3 items-center relative md:w-1/2 mb-15 md:mb-0 mt-15 lg:mt-0">
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white main lg:w-1/2">
                {project.client}
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* STATUS CARD */}
    <ScrollReveal variant="fadeUp" delay="100ms">
  <div className="container mx-auto px-5 mb-20">
    <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 space-y-4 shadow-sm">

      {/* ROW 1 — status + title + meta */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
            project.status === "completed"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-amber-50 text-amber-700 border-amber-200"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              project.status === "completed" ? "bg-emerald-500" : "bg-amber-500"}`} />
            {project.status === "completed" ? p.completed : p.inProgress}
          </span>
          <h1 className="text-base md:text-lg font-semibold text-gray-900">{project.title}</h1>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div>
            <p className="text-gray-400 mb-0.5">{lang === "ar" ? "عميل" : "Client"}</p>
            <p className="font-semibold text-gray-800">{project.client}</p>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div>
            <p className="text-gray-400 mb-0.5">{lang === "ar" ? "تاريخ الانتهاء" : "End Date"}</p>
            <p className="font-semibold text-gray-800">{project.end_date}</p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 leading-relaxed">{project.description}</p>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2">
        {project.tags?.map((tag) => (
          <span
            key={tag.id}
            className="px-3 py-1 rounded-full border text-xs font-medium"
            style={{ color: tag.color, backgroundColor: `${tag.color}12`, borderColor: `${tag.color}30` }}>
            {tag.name}
          </span>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex items-center gap-2 pt-1 border-t border-gray-100 flex-wrap">
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {lang === "ar" ? "زيارة الموقع" : "Visit Website"}
        </a>
        {downloadableFile && (
          <button
            onClick={() => handleDownload(downloadableFile.file)}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-sm font-medium rounded-xl hover:bg-gray-50 transition text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {lang === "ar" ? "تحميل الملف" : "Download File"}
          </button>
        )}
      </div>

    </div>
  </div>
</ScrollReveal>

      {/* VIDEO CAROUSEL */}
      {videos.length > 0 && (
        <ScrollReveal variant="fadeUp" delay="0ms">
          <div className="container mx-auto px-5 pb-20">
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-10">{p.processTitle}</h2>
            <Carousel>
              {videos.map((v, i) => (
                <VideoCard key={i} item={v} onPlay={() => setSelectedVideoIndex(i)} />
              ))}
            </Carousel>
          </div>
        </ScrollReveal>
      )}

      {/* IMAGES CAROUSEL */}
      {images.length > 0 && (
        <ScrollReveal variant="fadeUp" delay="0ms">
          <div className="container mx-auto px-5 pb-20">
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-10">{p.designsTitle}</h2>
            <Carousel>
              {images.map((img, i) => (
                <div
                  key={i}
                  className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer"
                  onClick={() => setSelectedIndex(i)}>
                  <img
                    src={img.file}
                    alt={`design-${i}`}
                    className="w-full h-90 lg:h-100 object-cover group-hover:opacity-80 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-indigo-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      🔍 {lang === "ar" ? "عرض الصورة" : "View Image"}
                    </span>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </ScrollReveal>
      )}

      {/* VIDEO MODAL */}
      {selectedVideoIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedVideoIndex(null)}>

          {/* زرار قفل */}
          <button
            onClick={() => setSelectedVideoIndex(null)}
            className="absolute top-5 right-5 text-white text-3xl z-10">
            ✕
          </button>

          {/* سهم يسار */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
            }}
            className="absolute left-4 text-white text-5xl transition rounded-full w-14 h-14 flex items-center justify-center z-10">
            ‹
          </button>

          {/* الفيديو */}
          <div
            className="w-[80%] md:w-[70%] aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <video
              key={selectedVideoIndex}
              className="w-full h-full"
              src={videos[selectedVideoIndex].file}
              controls
              autoPlay
            />
          </div>

          {/* سهم يمين */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedVideoIndex((prev) => (prev + 1) % videos.length);
            }}
            className="absolute right-4 text-white text-5xl transition rounded-full w-14 h-14 flex items-center justify-center z-10">
            ›
          </button>

          {/* عداد */}
          <span className="absolute bottom-5 text-white/70 text-sm">
            {selectedVideoIndex + 1} / {videos.length}
          </span>

        </div>
      )}

      {/* IMAGE MODAL */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}>

          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 text-white text-3xl z-10">
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
            }}
            className="absolute left-4 text-white text-5xl transition rounded-full w-14 h-14 flex items-center justify-center z-10">
            ‹
          </button>

          <div className="max-w-[80%] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedIndex].file}
              alt="preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev + 1) % images.length);
            }}
            className="absolute right-4 text-white text-5xl transition rounded-full w-14 h-14 flex items-center justify-center z-10">
            ›
          </button>

          <span className="absolute bottom-5 text-white/70 text-sm">
            {selectedIndex + 1} / {images.length}
          </span>

        </div>
      )}
    </section>
  );
}