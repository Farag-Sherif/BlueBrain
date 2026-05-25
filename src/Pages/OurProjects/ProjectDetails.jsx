import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../../Components/Carousel/Carousel";
import { useLang } from "../../i18n/LanguageContext";
import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";

const VideoCard = ({ item, onPlay }) => (
  <div className="group relative rounded-2xl overflow-hidden bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-white/5" onClick={onPlay}>
    <div className="relative aspect-video">
      <video
        src={`${item.file}#t=0.1`}
        className="w-full h-90 object-cover"
        muted
        preload="metadata"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent transition-all duration-300 group-hover:from-slate-950/90"></div>
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-110 transition-all duration-500">
          <svg className="w-7 h-7 text-white fill-current ml-1 rtl:mr-1 rtl:ml-0" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Duration Badge */}
      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rtl:right-auto rtl:left-3">
        <svg className="w-3 h-3 inline mr-1 rtl:mr-0 rtl:ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Video
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
      <div className="flex items-center justify-center min-h-screen bg-[var(--surface-alt)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          <span className="text-blue-600 text-lg font-bold font-display animate-pulse">{p.loading}</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--surface-alt)]">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <span className="text-red-500 text-xl font-bold font-display">{p.notFound}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-[var(--surface-alt)] min-h-screen"
      dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden">
        {/* Background Cover Image */}
        <img
          src={project.cover_image || project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-[#0a1628]/30 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/40 to-transparent z-0 rtl:bg-gradient-to-l"></div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 pb-28 pt-40">
          <ScrollReveal variant="fadeUp">
            <div className="flex flex-col md:flex-row items-end md:items-center gap-8">
              {/* Client Logo */}
              {project.image && (
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 flex items-center justify-center shadow-2xl shrink-0">
                  <img
                    src={project.image}
                    alt={project.client}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div className="flex-1">
                {/* Status Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md mb-4 ${
                    project.status === "completed"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                      : "bg-amber-500/20 text-amber-300 border-amber-400/30"
                  }`}>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      project.status === "completed"
                        ? "bg-emerald-400"
                        : "bg-amber-400 animate-pulse"
                    }`}></span>
                  {project.status === "completed" ? p.completed : p.inProgress}
                </span>

                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
                  {project.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-white/70 flex-wrap">
                  {project.client && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                        />
                      </svg>
                      <span>{project.client}</span>
                    </div>
                  )}
                  {project.end_date && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-white/30"></div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                          />
                        </svg>
                        <span>{project.end_date}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FLOATING INFO CARD ─── */}
      <ScrollReveal variant="fadeUp" delay="100ms">
        <div className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
            {/* Description */}
            <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-6">
              {project.description}
            </p>

            {/* Tags */}
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-slate-100">
                {project.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-4 py-1.5 rounded-full border text-sm font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      color: tag.color,
                      backgroundColor: `${tag.color}12`,
                      borderColor: `${tag.color}30`,
                    }}>
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  {p.viewWebsite ||
                    (lang === "ar" ? "زيارة الموقع" : "Visit Website")}
                </a>
              )}
              {downloadableFile && (
                <button
                  onClick={() => handleDownload(downloadableFile.file)}
                  className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-bold px-6 py-3 rounded-xl transition-all duration-300 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  {lang === "ar" ? "تحميل الملف" : "Download File"}
                </button>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ─── VIDEOS SECTION ─── */}
      {videos.length > 0 && (
        <ScrollReveal variant="fadeUp" delay="0ms">
          <div className="container mx-auto px-4 mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5 text-white fill-current"
                  viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800">
                {p.processTitle}
              </h2>
              <div className="flex-1 h-px bg-slate-200 ml-4 rtl:mr-4 rtl:ml-0"></div>
              <span className="text-slate-400 text-sm font-semibold">
                {videos.length}
              </span>
            </div>
            <Carousel>
              {videos.map((v, i) => (
                <VideoCard
                  key={i}
                  item={v}
                  onPlay={() => setSelectedVideoIndex(i)}
                />
              ))}
            </Carousel>
          </div>
        </ScrollReveal>
      )}

      {/* ─── IMAGES/DESIGNS SECTION ─── */}
      {images.length > 0 && (
        <ScrollReveal variant="fadeUp" delay="0ms">
          <div className="container mx-auto px-4 mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6.75v11.25A2.25 2.25 0 003.75 21z"
                  />
                </svg>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800">
                {p.designsTitle}
              </h2>
              <div className="flex-1 h-px bg-slate-200 ml-4 rtl:mr-4 rtl:ml-0"></div>
              <span className="text-slate-400 text-sm font-semibold">
                {images.length}
              </span>
            </div>
            <Carousel>
              {images.map((img, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2 border border-slate-100 bg-slate-100"
                  onClick={() => setSelectedIndex(i)}>
                  <img
                    src={img.file}
                    alt={`design-${i}`}
                    className="w-full h-80 lg:h-90 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-[#0a1628]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* Index Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white text-xs font-semibold rtl:right-auto rtl:left-3">
                    {i + 1}/{images.length}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </ScrollReveal>
      )}

      {/* ─── VIDEO MODAL ─── */}
      {selectedVideoIndex !== null && (
        <div
          className="fixed inset-0 bg-[#0a1628]/90 backdrop-blur-md flex items-center justify-center z-[100] animate-fadeIn"
          onClick={() => setSelectedVideoIndex(null)}>
          {/* Close Button */}
          <button
            onClick={() => setSelectedVideoIndex(null)}
            className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white hover:bg-red-500 hover:scale-110 transition-all duration-300 rtl:right-auto rtl:left-5">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedVideoIndex(
                (prev) => (prev - 1 + videos.length) % videos.length,
              );
            }}
            className="absolute left-4 md:left-8 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Video Player */}
          <div
            className="h-[85vh] max-h-[800px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-black animate-fadeInUp"
            onClick={(e) => e.stopPropagation()}>
            <div className="w-full h-full">
              <video
                key={selectedVideoIndex}
                className="w-full h-full object-cover"
                src={videos[selectedVideoIndex].file}
                controls
                autoPlay
              />
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedVideoIndex((prev) => (prev + 1) % videos.length);
            }}
            className="absolute right-4 md:right-8 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-semibold">
            {selectedVideoIndex + 1} / {videos.length}
          </div>
        </div>
      )}

      {/* ─── IMAGE MODAL ─── */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-[#0a1628]/90 backdrop-blur-md flex items-center justify-center z-[100] animate-fadeIn"
          onClick={() => setSelectedIndex(null)}>
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white hover:bg-red-500 hover:scale-110 transition-all duration-300 rtl:right-auto rtl:left-5">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(
                (prev) => (prev - 1 + images.length) % images.length,
              );
            }}
            className="absolute left-4 md:left-8 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Image Preview */}
          <div
            className="max-w-[85%] max-h-[85vh] animate-fadeInUp"
            onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedIndex].file}
              alt="preview"
              className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev + 1) % images.length);
            }}
            className="absolute right-4 md:right-8 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-semibold">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}