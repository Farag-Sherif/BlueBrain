import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import projectTitleBG from "../../assets/Images/Home/serviceTitleBG.png";
import Carousel from "../../Components/Carousel/Carousel";
import { useLang } from "../../i18n/LanguageContext";
import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";

const VideoCard = ({ item, onPlay }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-md">
    <div className="relative h-60 cursor-pointer" onClick={() => onPlay(item)}>
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

const extIcons = {
  pdf: "📄",
  docx: "📝",
  doc: "📝",
  xlsx: "📊",
  xls: "📊",
  pptx: "📊",
  ppt: "📊",
  zip: "🗜️",
  rar: "🗜️",
  mp4: "🎬",
  mov: "🎬",
  mp3: "🎵",
  default: "📁",
};

const extColors = {
  pdf: "mainC bg-red-50 hover:bg-red-100",
  docx: "text-blue-600 bg-blue-50 hover:bg-blue-100",
  doc: "text-blue-600 bg-blue-50 hover:bg-blue-100",
  xlsx: "text-green-600 bg-green-50 hover:bg-green-100",
  xls: "text-green-600 bg-green-50 hover:bg-green-100",
  pptx: "text-orange-600 bg-orange-50 hover:bg-orange-100",
  ppt: "text-orange-600 bg-orange-50 hover:bg-orange-100",
  zip: "text-purple-600 bg-purple-50 hover:bg-purple-100",
  rar: "text-purple-600 bg-purple-50 hover:bg-purple-100",
  default: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100",
};

function getExt(url) {
  return url.split("?")[0].split(".").pop().toLowerCase();
}

function isImageExt(ext) {
  return ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext);
}

export default function ProjectDetails() {
  const { id } = useParams();
  const { t, api, lang } = useLang();
  const p = t.projects;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const data = await api.getProjectDetails(id);
      console.log(data);
      setProject(data[0]);
      setLoading(false);
    };
    fetchProject();
  }, [id, lang]);

  const videos = project?.media?.filter((m) => m.type === "video") ?? [];
  const images = project?.media?.filter((m) => m.type === "image") ?? [];
  const files = project?.media?.filter((m) => m.type === "file") ?? [];
  
  const downloadableFile =
    files.find((f) => {
      const ext = getExt(f.file);
      return ["zip", "rar", "pdf", "docx", "doc"].includes(ext);
    }) || null;
  
  const handleDownload = (url) => {
    const link = document.createElement("a");

    link.href = url;

    // اسم الملف
    link.setAttribute(
      "download",
      url.split("/").pop()?.split("?")[0] || "file"
    );

    // مهم
    link.setAttribute("target", "_blank");

    document.body.appendChild(link);

    link.click();

    link.remove();
  };
  
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
      <ScrollReveal variant="fadeUp">
        <div className="relative mb-20">
          <img
            src={projectTitleBG}
            alt=""
            className={`absolute bottom-0 ${lang === "ar" ? "left-0 scale-x-[-1]" : "right-0"
              } w-full md:w-1/2 h-1/2 md:h-auto`}
          />
          <div className="container mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
            <img
              src={project.image}
              alt={project.title}
              className="w-64 h-64 object-contain p-5 rounded-xl mb-15 mx-auto"
            />
            <div className="flex flex-col gap-3 items-center relative md:w-1/2 mb-15 md:mb-0 mt-15 lg:mt-0">
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {project.client}
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* STATUS */}
      <ScrollReveal variant="fadeUp" delay="100ms">
        <div className="container mx-auto px-5 mb-32">

          <div className="relative overflow-hidden rounded-[40px] bg-white border border-gray-100 shadow-[0_20px_80px_rgba(79,70,229,0.12)]">

            {/* Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 blur-3xl rounded-full" />

            <div className="relative p-10 lg:p-14 space-y-10">

              {/* STATUS */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-xl border ${project.status === "completed"
                  ? "bg-emerald-500/15 text-emerald-700 border-emerald-400/20"
                  : "bg-amber-500/15 text-amber-700 border-amber-400/20"
                }`}>
                <span className={`w-2.5 h-2.5 rounded-full ${project.status === "completed"
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-amber-500 animate-pulse"
                  }`} />
                {project.status === "completed" ? p.completed : p.inProgress}
              </div>

              {/* TITLE */}
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-5">
                  {project.title}
                </h1>

                <p className="text-gray-600 leading-relaxed text-lg max-w-3xl">
                  {project.description}
                </p>
              </div>

              {/* CLIENT + DATE */}
              <div className="flex flex-col sm:flex-row gap-6 p-5 rounded-2xl bg-gray-50 border border-gray-100 w-fit">

                <div>
                  <p className="text-xs text-gray-400">Client</p>
                  <p className="font-semibold text-gray-900">{project.client}</p>
                </div>

                <div className="hidden sm:block w-px h-10 bg-gray-200" />

                <div>
                  <p className="text-xs text-gray-400">End Date</p>
                  <p className="font-semibold text-gray-900">{project.end_date}</p>
                </div>

              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-3">
                {project.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-4 py-2 rounded-2xl border text-sm font-medium transition hover:-translate-y-1"
                    style={{
                      color: tag.color,
                      backgroundColor: `${tag.color}10`,
                      borderColor: `${tag.color}25`,
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-3">

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-semibold text-center hover:scale-[1.02] transition"
                >
                  {lang === "ar" ? "زيارة الموقع" : "Visit Website"}
                </a>

                {downloadableFile && (
                  <button
                    onClick={() => handleDownload(downloadableFile.file)}
                    className="flex-1 border border-gray-200 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition"
                  >
                    {lang === "ar" ? "تحميل الملف" : "Download File"}
                  </button>
                )}

              </div>

            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* VIDEO CAROUSEL */}
      {videos.length > 0 && (
        <ScrollReveal variant="fadeUp" delay="0ms">
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
        </ScrollReveal>
      )}

      {/* IMAGES CAROUSEL */}
      {images.length > 0 && (
        <ScrollReveal variant="fadeUp" delay="0ms">
          <div className="container mx-auto px-5 pb-20">
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-10">
              {p.designsTitle}
            </h2>
            <Carousel>
              {images.map((img, i) => (
                <div
                  key={i}
                  className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer"
                  onClick={() => setSelectedImage(img)}>
                  <img
                    src={img.file}
                    alt={`design-${i}`}
                    className="w-full h-80 lg:h-75 object-cover group-hover:opacity-80 transition-opacity duration-300"
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

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}>
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 text-white text-3xl z-10">
            ✕
          </button>
          <div
            className="max-w-[90%] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.file}
              alt="preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
