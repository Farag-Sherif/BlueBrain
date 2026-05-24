import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./Routes";
import ScrollToTop from "./Components/Scrolltotop ";
import Whatsapp from "./Components/Whatsapp/Whatsapp";
import Download from "./Components/Download/Download";
import BottomBar from "./Components/BottomBar/BottomBar";
// import your page routes here

const App = () => {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Header />
      <AppRoutes />
      <Whatsapp />
      <Download />
      <BottomBar />
      <Footer />
    </LanguageProvider>
  );
};

export default App;
