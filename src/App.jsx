import { Navbar } from "./components";
import "./App.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "./components/Footer/Footer";
import { Main } from "./components/Main/Main";

const useScrollToTopOnMount = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
};

export const App = () => {
  useScrollToTopOnMount();
  return (
    <>
      <div className="app">
        <Navbar />
        <div className="app-content">
          <Main />
          <Footer />
        </div>
      </div>
    </>
  );
};
