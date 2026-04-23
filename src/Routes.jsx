import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import OurTeam from "./Pages/OurTeam/OurTeam";
import OurProjects from "./Pages/OurProjects/OurProjects";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Consultation from "./Pages/Consultation/Consultation";
import ProjectDetails from "./Pages/OurProjects/ProjectDetails";
import About from "./Pages/About/About";
import OurServices from "./Pages/OurServices/OurServices";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/team" element={<OurTeam />} />
      <Route path="/portfolio" element={<OurProjects />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/project-details/:id" element={<ProjectDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<OurServices />} />



    </Routes>
  );
};
export default AppRoutes;
