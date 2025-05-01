import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Join from "./components/Join";
import News from "./components/News";
import Team from "./components/Team";
import Footer from "./components/Footer";


function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow max-w-7xl mx-auto px-4 py-12">
          <Hero />
          <Features />
          <Join />
          <News />
          <Team />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
