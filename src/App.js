import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Join from "./components/Join";
import News from "./components/News";
import Team from "./components/Team";
import Footer from "./components/Footer";
import Rules from "./components/Rules";
import Page from "./components/Page";
import Faq from "./components/Faq";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero title="Ласкаво просимо на M4SUB" subtitle="Сервери Minecraft для тебе та твого друга" />
                <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
                  <Page title="M4SUB — Головна">
                    <Features />
                    <Join />
                    <News />
                    <Team />
                  </Page>
                </div>
              </>
            }
          />
          <Route
            path="/rules"
            element={
              <>
                <Hero title="Правила серверу" subtitle="Тут буде багато всього цікавого" />
                <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
                  <Page title="M4SUB — Правила">
                    <Rules />
                  </Page>
                </div>
              </>
            }
          />
          <Route
            path="/faq"
            element={
              <>
                <Hero title="Часті питання" subtitle="Відповіді на популярні питання" />
                <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
                  <Page title="M4SUB — Часті питання">
                    <Faq />
                  </Page>
                </div>
              </>
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
