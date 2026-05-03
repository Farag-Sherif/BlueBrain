import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./Routes";
import ScrollToTop from "./Components/Scrolltotop ";
import Whatsapp from "./Components/Whatsapp/Whatsapp";
// import your page routes here

const App = () => {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Header />
      <AppRoutes />
      <Whatsapp />
      <Footer />
    </LanguageProvider>
  );
};

export default App;
