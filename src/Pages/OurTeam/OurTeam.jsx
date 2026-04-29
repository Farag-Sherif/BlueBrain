import { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import { useLang } from "../../i18n/LanguageContext";
import Loading from "../../Components/Loading/Loading";

const BASE_URL = "https://dashbaord.bluebrain-co.com";

const PersonIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="15" r="8" fill="#8aafd6" />
    <path d="M4 36c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="#8aafd6" />
  </svg>
);

export default function OurTeam() {
  const { t, lang, api } = useLang();
  const tm = t.team;

  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      const data = await api.getTeam();
      if (data.length > 0) {
        setTeam(data);
      } else {
        setError(tm.error);
      }
      setLoading(false);
    };
    fetchTeam();
  }, [lang]);

  if (loading) return <Loading />;

  return (
    <>
      <Title>{tm.pageTitle}</Title>
      <div className="pb-20 container mx-auto px-5">
        {error && (
          <div className="text-center text-red-500 text-lg">{error}</div>
        )}
        {!error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {team.map((member, index) => (
              <div
                key={index}
                className="group rounded-xl overflow-hidden flex flex-col bg-[#dce8fb] hover:scale-105 transition duration-300 shadow-sm hover:shadow-lg">
                <div className="relative bg-[#c8d9ef] h-72 w-full flex items-center justify-center overflow-hidden">
                  {member.image ? (
                    <img
                      src={`${BASE_URL}/${member.image}`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <div className="opacity-40">
                      <PersonIcon />
                    </div>
                  )}
                </div>
                <div className="px-4 pt-3 pb-4">
                  <p className="text-lg font-bold tracking-wider uppercase mainC mb-1">
                    {member.name}
                  </p>
                  <p className="text-sm font-semibold text-gray-500 mb-2">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
