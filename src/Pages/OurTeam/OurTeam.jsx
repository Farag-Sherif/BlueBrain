import Title from "../../Components/Title/Title";
import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LanguageContext";
import Loading from "../../Components/Loading/Loading";
import ScrollReveal from "../../Components/ScrollReveal/ScrollReveal";

export default function OurTeam() {
  const { lang, t, api } = useLang();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      const data = await api.getTeam();
      console.log(data)
      if (data && data.length > 0) {
        setTeam(data);
      }
      setLoading(false);
    };
    fetchTeam();
  }, [lang]);

  if (loading) return <Loading />;

  return (
    <div className="bg-[var(--surface-alt)] min-h-screen pb-32">
      <Title>{t.team.pageTitle}</Title>

      <div className="container mx-auto px-4 mt-8">
        <ScrollReveal
          variant="fadeUp"
          className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mb-6 uppercase tracking-wide">
            {t.team.title}
          </h2>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            {t.team.subtitle}
          </p>
          <div className="w-24 h-1.5 bg-blue-600 rounded-full mx-auto mt-8"></div>
        </ScrollReveal>

        {team.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 mt-16">
            {team.map((member, index) => (
              <ScrollReveal
                key={index}
                variant="fadeUp"
                delay={`${(index % 4) * 100}ms`}>
                <div className="group relative pt-24">
                  {/* Card Background */}
                  <div className="bg-white rounded-3xl p-8 pt-28 text-center shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 h-full relative z-10 hover:-translate-y-2">
                    {/* Glowing effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <h3 className="font-display text-2xl font-bold text-slate-800 mb-2 relative z-10 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-slate-600 group-hover:text-[#125EF2] font-bold text-sm uppercase tracking-widest relative z-10">
                      {member.position}
                    </p>

                    {/* Decorative underline */}
                    <div className="w-10 h-0.5 bg-slate-200 mx-auto mt-6 rounded-full group-hover:bg-[#125EF2] group-hover:w-16 transition-all duration-500 relative z-10"></div>
                  </div>

                  {/* Profile Image - Positioned absolutely overlapping top */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 z-20 group-hover:-translate-y-4 transition-transform duration-500">
                    <div className="absolute inset-0 bg-blue-500 rounded-[2rem] transform rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
                    <div className="w-full h-full bg-white rounded-[2rem] p-2 shadow-lg border border-slate-100 relative z-10 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=125EF2&color=fff&size=200`;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500 text-lg">
            {t.team.noTeam}
          </div>
        )}
      </div>
    </div>
  );
}
