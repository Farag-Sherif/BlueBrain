import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AppRoutes from "./Routes";
// import your page routes here

const App = () => {
  return (
      <LanguageProvider>
      <Header />
      <AppRoutes/>
        <Footer />
      </LanguageProvider>
  );
};

export default App;
