import { Link } from "react-router-dom";

export default function ProjectCard({ p, t, lang, setVideo, index, hideTags }) {
  return (
    <Link
      to={`/project-details/${p.id}`}
      className="block group relative w-full aspect-[3.2/4] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#125EF2] to-[#0D47C2] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-white/10"
    >
      {/* Status Badge */}
      {p.status && (
        <div className={`absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md flex items-center gap-1.5 ${
          p.status === "completed"
            ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
            : "bg-amber-500/20 text-amber-300 border-amber-400/30"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            p.status === "completed" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
          }`}></span>
          {p.status === "completed" ? (t.projects?.completed || "✓ Completed") : (t.projects?.inProgress || "In Progress")}
        </div>
      )}

      {/* Giant Watermark Number */}
      {typeof index === "number" && (
        <div className="absolute -bottom-8 -left-6 text-[10rem] font-display font-black text-white/10 select-none leading-none z-5 pointer-events-none transition-transform duration-500 group-hover:scale-110">
          {String(index + 1).padStart(2, '0')}
        </div>
      )}
      
      {/* Top Image Container (transparent, showing card's blue background) */}
      <div className="w-full h-[55%] relative overflow-hidden z-10 flex items-center justify-center px-6 pt-6 pb-2">
        <div className="w-full h-full bg-white rounded-3xl p-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03] shadow-md">
          <img
            src={p.image_cover || p.image || `https://ui-avatars.com/api/?name=P&background=125EF2&color=fff&size=600`}
            alt={p.title}
            className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=P&background=125EF2&color=fff&size=600`;
            }}
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-20 text-white flex flex-col justify-end h-[45%] pointer-events-none">
        <div className="transition-transform duration-500 group-hover:-translate-y-2">
          {/* Tags */}
          {!hideTags && p.tags && p.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {p.tags.slice(0, 2).map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15 backdrop-blur-sm">
                  {tag?.name || tag}
                </span>
              ))}
              {p.tags.length > 2 && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15 backdrop-blur-sm">
                  +{p.tags.length - 2}
                </span>
              )}
            </div>
          )}

          <h3 className="text-xl md:text-2xl font-bold font-display mb-1 text-white transition-colors">
            {p.title}
          </h3>

          <p className="text-slate-200/90 leading-relaxed text-sm line-clamp-1 group-hover:line-clamp-none transition-all duration-500">
            {p.description}
          </p>
        </div>

        {/* Interactive slide-up CTA */}
        <div className="inline-flex items-center gap-2 text-blue-200 group-hover:text-white font-bold pt-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <span className="text-xs uppercase tracking-wider relative pb-1">
            {lang === "ar" ? "قراءة المزيد" : "Read More"}
          </span>
          <svg className={`w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1.5 ${lang === "ar" ? "rotate-180 group-hover:-translate-x-1.5" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
