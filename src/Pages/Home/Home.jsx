import landingVideo from "../../assets/Video/landing.mp4";
import landingModileVideo from "../../assets/Video/landingMobile.mp4";
import volume from "../../assets/Video/volume.png";
import mute from "../../assets/Video/mute.png";
import whatsapp from "../../assets/Social-Icons/coloredwhatsapp.png";
import strongBrain from "../../assets/Images/Home/strongbrain.png";
import curve from "../../assets/Images/Home/upCurve.png";
import blueBrain from "../../assets/Images/Home/BlueBrain.png";
import brain from "../../assets/Images/brainBlue.png";
import { useState } from "react";
import MessageSection from "./Message";
import NewProjectCarousel from "./Projects";
import PartnersSuccess from "./Clients";
import ServicesSection from "./Services";
import { useLang } from "../../i18n/LanguageContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  const { t } = useLang();
  const h = t.home;

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="home-page">
      <div className="relative w-full h-screen overflow-hidden">
        {/* Video */}
        <video
          src={landingVideo}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="hidden md:block absolute top-0 left-0 w-full h-full object-cover"
        />
        <video
          src={landingModileVideo}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="block md:hidden absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-25"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center px-4 justify-between w-full h-full text-white text-center">
          <img
            src={isMuted ? mute : volume}
            alt="sound"
            className="w-10 h-10"
            onClick={toggleSound}
          />
          <Link to="/contact" className="lets-contact flex items-end relative justify-center w-10 rotate-270 gap-5 ">
            <span className="absolute bottom-2 right-40 transform w-20 h-[2px] bg-white rounded-full block"></span>
            <h1 className="text-sm md:text-lg font-bold text-nowrap">
              {h.letsTouch}
            </h1>
            <img src={whatsapp} alt="whatsapp" className="w-10 h-10" />
            <span className="absolute bottom-2 left-40 transform w-10 h-[2px] bg-white rounded-full block"></span>
          </Link>
        </div>
      </div>

      {/* Experience Section */}
      <div className="ex flex flex-col md:flex-row items-center justify-center md:gap-10 relative lg:min-h-screen mt-20">
        <img
          src={curve}
          alt="curve"
          className="w-full md:w-1/2 h-auto absolute bottom-0 md:top-0 right-0 -z-1"
        />
        <div className="text-center w-full md:w-1/2 align-text-top ml-5">
          <h1 className="text-[150px] md:text-[200px] lg:text-[250px] font-bold mainC">
            +10
          </h1>
          <p className="text-2xl md:text-3xl secondC -mt-10 uppercase font-bold">
            {h.yearsExp}
          </p>
        </div>
        <img
          src={strongBrain}
          alt="brain"
          className="w-full md:w-1/2 lg:w-1/3 h-auto pt-10"
        />
      </div>

      {/* About Section */}
      <div className="bout container mx-auto px-4 py-20 md:pt-0">
        <div className="title flex items-center gap-5">
          <span className="w-5 h-5 main rounded-full block"></span>
          <h1 className="text-4xl md:text-6xl font-bold secondC uppercase">
            {h.aboutTitle}
          </h1>
          <span className="w-30 h-[4px] main rounded-full block"></span>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Card */}
            <div className="rounded-3xl overflow-hidden shadow-xl md:w-1/2 lg:w-full mx-auto">
              <img
                src={blueBrain}
                alt="Blue Brain"
                className="w-full"
              />
            </div>

            {/* Right Content */}
            <div className="relative bg-transparent p-6">
              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-600 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-600 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-600 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-600 rounded-br-xl"></div>

              <h2 className="text-3xl md:text-4xl font-bold secondC flex items-center gap-2 mb-4">
                <span>
                  <img src={brain} alt="brain" className="w-8 h-8" />
                </span>{" "}
                {h.whoWeAre}
              </h2>

              <p className="text-gray-500 leading-relaxed">
                <span className="mainC text-2xl font-bold">Blue Brain</span>{" "}
                {h.aboutText}
              </p>
            </div>
          </div>
        </div>
      </div>

      <MessageSection />
      <ServicesSection />
      <NewProjectCarousel />
      <PartnersSuccess />
    </div>
  );
};

export default Home;
