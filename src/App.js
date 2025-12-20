// src/App.js
import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Join from "./components/Join";
import News from "./components/News";
import NewsList from "./components/NewsList";
import NewsArticle from "./components/NewsArticle";
import Team from "./components/Team";
import Footer from "./components/Footer";
import Rules from "./components/Rules";
import RulesMenu from "./components/RulesMenu";
import Page from "./components/Page";
import Faq from "./components/Faq";
import Home from "./components/Home";

import Obs from "./components/pages/Obs";

import StatsPage from "./components/StatsPage";

import Donate from "./components/Donate";

import Anarchy from "./components/Anarchy";
import AnarchyRules from "./components/AnarchyRules";

import Subserver from "./components/Subserver";
import SubserverMap from "./components/SubserverMap";
import SubserverRules from "./components/SubserverRules";

import Dominion from "./components/Dominion";

import NotFound from "./components/NotFound";

import Discord from "./components/Discord";

import ScrollToTopButton from './components/ScrollToTopButton';

// Окремий компонент для контенту (всередині BrowserRouter)
function AppContent() {
  const location = useLocation();
  const footerRef = useRef(null);

  // Якщо це OBS сторінка - рендеримо тільки віджет без Header/Footer
  if (location.pathname === '/obs') {
    return <Obs />;
  }

  // Звичайний layout для всіх інших сторінок
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Routes>
        <Route
          path="/donate"
          element={
            <>
              <Hero title="Підтримати сервер" subtitle="Обери свій пак донату" />
              <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
                <Page title="M4SUB — Донат">
                  <Donate />
                </Page>
              </div>
            </>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Hero title="Ласкаво просимо на M4SUB" subtitle="Виживання для тебе та твого друга" />
              <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
                <Page title="M4SUB — Minecraft Сервер">
                  <Home />
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
                  <RulesMenu />
                  <Discord />
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
                  <Discord />
                </Page>
              </div>
            </>
          }
        />

        <Route
          path="/news"
          element={
            <>
              <Hero title="Новини" subtitle="Останні новини та оновлення сервера" />
              <div className="cornerCut flex-grow max-w-7xl mx-auto px-4 py-12">
                <NewsList />
              </div>
            </>
          }
        />

        <Route
          path="/news/:slug"
          element={
            <div className="cornerCut flex-grow max-w-7xl mx-auto px-4 py-12">
              <NewsArticle />
            </div>
          }
        />

        <Route
          path="/subserver"
          element={
            <>
              <Hero title="Сабсервер" subtitle="Виживання для тебе та твого друга" />
              <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
                <Page title="M4SUB — Сабсервер">
                  <Subserver />
                  <News />
                  <Join />
                </Page>
              </div>
            </>
          }
        />

        <Route
          path="/subserver/rules"
          element={
            <>
              <Hero title="Правила сабсервера" subtitle="Усе, що дозволено та заборонено" />
              <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
                <Page title="M4SUB — Правила Сабсервера">
                  <SubserverRules />
                  <Discord />
                </Page>
              </div>
            </>
          }
        />

        <Route
          path="/subserver/map"
          element={
            <>
              <Hero title="Мапа" subtitle="Перегляньте мапу нашого сабсервера" />
              <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
                <Page title="M4SUB — Мапа">
                  <SubserverMap />
                </Page>
              </div>
            </>
          }
        />

        <Route
          path="/dominion"
          element={
            <>
              <Hero title="Домініон" subtitle="Справжній RP MMO-RPG в майнкрафт" />
              <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
                <Page title="M4SUB — Домініон">
                  <Dominion />
                  <News />
                  <Join />
                </Page>
              </div>
            </>
          }
        />

        <Route
          path="/anarchy"
          element={
            <>
              <Hero title="Анархія" subtitle="У світі анархії ви зустріните всесвіт без правил, справжня анархія!" />
              <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
                <Page title="M4SUB — Анархія">
                  <Anarchy />
                  <News />
                  <Join />
                </Page>
              </div>
            </>
          }
        />

        <Route
          path="/anarchy/rules"
          element={
            <>
              <Hero title="Правила анархії" subtitle="Усе, що дозволено та заборонено" />
              <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
                <Page title="M4SUB — Правила Анархії">
                  <AnarchyRules />
                  <Discord />
                </Page>
              </div>
            </>
          }
        />

        <Route
          path="/2025-stats"
          element={
            <>
              <Hero title="Статистика 2025" subtitle="Перегляньте статистику" />
              <StatsPage />
            </>
          }
        />

        <Route
          path="*"
          element={
            <>
              <Hero title="Сторінка не знайдена" subtitle="Ця сторінка не існує або була видалена" />
              <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
                <NotFound />
              </div>
            </>
          }
        />
      </Routes>

      <Footer ref={footerRef} />
      <ScrollToTopButton footerRef={footerRef} />
    </div>
  );
}

// Головний компонент App
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;