import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../Components/Title/Title";
import { useLang } from "../../i18n/LanguageContext";

function ProjectCard({ project }) {
  return (
    <Link
      to={`/project-details/${project.id}`}
      className="group block bg-white rounded-2xl h-full overflow-hidden border-2 border-transparent shadow-sm transition-all duration-300 hover:border-indigo-600 hover:shadow-lg">
      <div className="relative h-60 bg-gray-300 flex items-center justify-center">
        <div className="absolute inset-0 bg-indigo-500/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white bg-white/20">
            ▶
          </div>
        </div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-sm md:text-md lg:text-lg mb-1 mainC group-hover:text-indigo-700 transition">
          {project.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className={`text-sm bg-indigo-100 ${tag.color} px-4 py-1 rounded-xl`}>
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function OurProjects() {
  const { t, lang, api } = useLang();
  const p = t.projects;

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
  }, [lang]);

  return (
    <>
      <Title>{p.pageTitle}</Title>
      <section className="min-h-screen px-5 pb-20 container mx-auto">
        <div className="flex items-center gap-3 mb-15 justify-center">
          <span className="text-3xl md:text-4xl lg:text-5xl">📊</span>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mainC tracking-wide">
            {p.pageTitle}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="cursor-pointer transform hover:-translate-y-1 transition duration-300">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
