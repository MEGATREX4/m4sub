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

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow max-w-7xl mx-auto px-4 py-12">
          <Routes>
            <Route
              path="/"
              element={
                <Page title="M4SUB — Головна">
                  <Hero title="Ласкаво просимо на M4SUB" subtitle="Сервери Minecraft для тебе та твого друга" />
                  <Features />
                  <Join />
                  <News />
                  <Team />
                </Page>
              }
            />
            <Route
              path="/rules"
              element={
                <Page title="M4SUB — Правила">
                  <Hero title="Правила серверу" subtitle="Тут буде багато всього цікавого" />
                  <Rules />
                </Page>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
