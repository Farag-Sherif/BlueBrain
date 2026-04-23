import { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useLang } from "../../i18n/LanguageContext";

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
      const data = await api.getTeam();
      console.log(data);
      if (data.length > 0) {
        setTeam(data);
        setLoading(false);
      } else {
        setError(tm.error);
        setLoading(false);
      }
    };
    fetchTeam();
  }, [lang]);

  return (
    <>
      <Title>{tm.pageTitle}</Title>

      <div className="pb-20 container mx-auto px-5">
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="text-3xl md:text-4xl lg:text-5xl">🚀</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mainC">
            {tm.pageTitle}
          </h2>
        </div>

        {loading && (
          <div className="text-center text-gray-500 text-lg">{tm.loading}</div>
        )}

        {error && (
          <div className="text-center text-red-500 text-lg">{error}</div>
        )}

        {!loading && !error && (
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

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                    {member.social?.facebook && (
                      <a
                        href={member.social.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-blue-600 text-gray-700 hover:text-white transition">
                        <FaFacebookF />
                      </a>
                    )}
                    {member.social?.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-blue-400 text-gray-700 hover:text-white transition">
                        <FaTwitter />
                      </a>
                    )}
                    {member.social?.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white hover:bg-blue-800 text-gray-700 hover:text-white transition">
                        <FaLinkedinIn />
                      </a>
                    )}
                  </div>
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
