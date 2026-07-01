import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from "react";

const BorderBox = lazy(() => 
  import("./donate/components/BorderBox").then(module => ({ 
    default: module.BorderBox 
  }))
);

const FRAME_DURATION = 20000; 
const TRANSITION_TIME = 600; 
const TOTAL_CYCLE = FRAME_DURATION * 2; 
const INTERVAL_DELAY = 20 * 60 * 1000; 

export default function ObsWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [animationPhase, setAnimationPhase] = useState("hidden");
  const [particles, setParticles] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const tickerItems = useMemo(() => [
    { icon: "hn-heart-solid text-[#c5629a]", text: "ПІДТРИМАЙ ЗСУ" },
    { icon: "hn-sparkles", text: "ТУРБО-ОНОВЛЕННЯ ВЖЕ ТУТ" },
    { icon: "hn-flag-ukraine", text: "СЛАВА УКРАЇНІ" },
    { icon: "hn-globe", text: "M4SUB.CLICK" }
  ], []);

  const funds = useMemo(() => [
    { name: "Повернись живим", url: "savelife.in.ua" },
    { name: "United24", url: "u24.gov.ua" },
    { name: "Фонд Притули", url: "prytulafoundation.org" },
  ], []);

  const features = useMemo(() => [
    { 
      icon: "hn-unlock", 
      text: "Повністю безкоштовно", 
      subtext: "Грай без обмежень" 
    },
    { 
      icon: "hn-folder", 
      text: "Без жодних модів", 
      subtext: "Чистий клієнт" 
    },
    { 
      icon: "hn-sparkles", 
      text: "Модовий досвід", 
      subtext: "На ванільному ядрі" 
    },
    { 
      icon: "hn-map-pin", 
      text: "Прірва мороку", 
      subtext: "Унікальний вимір" 
    },
  ], []);

  const generateParticles = useCallback(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 110,
      size: Math.floor(Math.random() * 6 + 4),
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 2,
      color: Math.random() > 0.5 ? "#c5629a" : "#ffd700",
    }));
    setParticles(newParticles);
  }, []);

  const startWidgetCycle = useCallback(() => {
    setIsVisible(true);
    setCurrentFrame(0);
    setAnimationPhase("entering");
    generateParticles();

    setTimeout(() => setAnimationPhase("visible"), 600);
    setTimeout(() => setCurrentFrame(1), FRAME_DURATION);
    setTimeout(() => setAnimationPhase("exiting"), TOTAL_CYCLE);
    setTimeout(() => {
      setIsVisible(false);
      setAnimationPhase("hidden");
    }, TOTAL_CYCLE + 1000);
  }, [generateParticles]);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
      startWidgetCycle();
    }, 3000);

    const mainInterval = setInterval(startWidgetCycle, INTERVAL_DELAY);
    return () => { clearTimeout(initTimer); clearInterval(mainInterval); };
  }, [startWidgetCycle]);

  if (!isInitialized || !isVisible) return null;

  return (
    <div className="obs-widget-container">
      <style>{`
        .obs-widget-container {
          width: 1920px; height: 1080px;
          position: fixed; top: 0; left: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Minecraft', sans-serif;
        }

        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(-1200px); opacity: 0; }
        }

        @keyframes widgetEnter {
          0% { transform: scale(0.9) translateY(100px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        @keyframes widgetExit {
          0% { transform: scale(1) translateY(0); opacity: 1; }
          100% { transform: scale(0.9) translateY(-100px); opacity: 0; }
        }

        .widget-wrapper.entering { animation: widgetEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .widget-wrapper.exiting { animation: widgetExit 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .frame-layer {
          transition: opacity ${TRANSITION_TIME}ms ease-in-out, transform ${TRANSITION_TIME}ms ease-in-out;
          position: absolute;
          inset: 0;
          padding: 60px; /* Збільшені відступи */
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .frame-active { opacity: 1; transform: scale(1); z-index: 10; }
        .frame-inactive { opacity: 0; transform: scale(0.98); z-index: 0; pointer-events: none; }

        .ticker-anim { animation: ticker 30s linear infinite; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

      {/* Анімований фон */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <div key={p.id} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, backgroundColor: p.color,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
            boxShadow: `0 0 10px ${p.color}`
          }} />
        ))}
      </div>

      <div className={`widget-wrapper ${animationPhase}`}>
        <div className="w-[960px] h-[520px] relative">
          <Suspense fallback={null}>
            <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#130217]" shine={true}>
              <div className="h-full relative overflow-hidden">
                
                {/* СЛАЙД 0: ЗСУ */}
                <div className={`frame-layer ${currentFrame === 0 ? 'frame-active' : 'frame-inactive'}`}>
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-white minecraftFont uppercase tracking-tighter leading-none mb-6">
                      ПЕРЕМОГА <span className="text-[#c5629a] block">ПОНАД УСЕ!</span>
                    </h1>

                    <div className="bg-[#c5629a] text-white minecraftFont py-4 px-12 inline-block mb-10 uppercase font-bold text-2xl tracking-[0.2em] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
                      СПОЧАТКУ ДОНАТЬ НА ЗСУ
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-8 uppercase minecraftFont">
                      {funds.map((f, i) => (
                        <div key={i} className="bg-white/5 border-2 border-white/10 p-5 flex flex-col justify-center">
                          <div className="text-[#c5629a] text-[10px] mb-2 font-bold tracking-widest">{f.url}</div>
                          <div className="text-white text-sm font-bold tracking-tighter leading-none">{f.name}</div>
                        </div>
                      ))}
                    </div>

                    <p className="text-white text-[10px] minecraftFont uppercase tracking-[0.6em]">
                        Донати на ігри почекають • 2026
                    </p>
                  </div>
                </div>

                {/* СЛАЙД 1: M4SUB PROMO */}
<div className={`frame-layer ${currentFrame === 1 ? 'frame-active' : 'frame-inactive'}`}>
  <div className="flex items-center gap-14 px-4">
    
    {/* Ліва частина: Лого з "дихаючим" ореолом */}
    <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-[#c5629a]/20 blur-[60px] rounded-full animate-pulse"></div>
        <img src="/logo512.png" className="w-56 h-56 object-contain relative z-10" style={{ imageRendering: 'pixelated' }} />
    </div>
    
    {/* Права частина: Текст та фічі */}
    <div className="text-left flex-1">
      <div className="flex items-center gap-3 mb-3">
         <span className="bg-[#c5629a] text-white minecraftFont text-[10px] px-2 py-1 font-bold uppercase tracking-widest">Live Now</span>
         <span className="text-[#c5629a] minecraftFont text-xs uppercase tracking-[0.3em]">Турбо-оновлення</span>
      </div>
      <h1 className="text-8xl font-bold text-white minecraftFont leading-none uppercase tracking-tighter mb-6">M4SUB</h1>
      
      <div className="bg-[#1a1a2e] border-2 border-[#c5629a] p-4 inline-flex items-center gap-5 mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
        <i className="hn hn-globe text-[#c5629a] text-3xl"></i>
        <span className="text-white text-5xl font-bold minecraftFont tracking-tighter uppercase leading-none">m4sub.click</span>
      </div>

      {/* Сітка особливостей 2x2 — без іконок, з чітким вирівнюванням */}
<div className="grid grid-cols-2 gap-y-6 gap-x-10">
  {features.map((feat, i) => (
    <div key={i} className="flex flex-col border-l-2 border-[#c5629a]/50 pl-4">
      <span className="text-white text-[15px] minecraftFont uppercase leading-none mb-1 tracking-tighter">
        {feat.text}
      </span>
      <span className="text-gray-500 text-[10px] minecraftFont uppercase tracking-widest opacity-60">
        {feat.subtext}
      </span>
    </div>
  ))}
</div>
    </div>
  </div>
</div>

                {/* БІГУЧА СТРІЧКА */}
                <div className="absolute bottom-6 left-0 w-full overflow-hidden border-t border-white/5 pt-5">
                  <div className="flex whitespace-nowrap ticker-anim">
                    {Array(6).fill(tickerItems).flat().map((item, i) => (
                      <div key={i} className="flex items-center gap-6 mx-10 text-[10px] minecraftFont text-gray-500 uppercase tracking-widest">
                        <i className={`hn ${item.icon}`}></i>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </BorderBox>
          </Suspense>
        </div>
      </div>
    </div>
  );
}