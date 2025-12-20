// src/components/ObsWidget.jsx
import { useState, useEffect, useCallback } from "react";
import { BorderBox } from "./donate/components/BorderBox";

// Конфіг
const FRAME_DURATION = 8000; // 8 секунд на кадр
const TRANSITION_DURATION = 800; // 0.8 секунди на перехід
const TOTAL_DURATION = FRAME_DURATION * 2 + TRANSITION_DURATION; // ~17 секунд
const INTERVAL_DURATION = 30 * 60 * 1000; // 30 хвилин

export default function ObsWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [animationPhase, setAnimationPhase] = useState("hidden");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles, setParticles] = useState([]);

  // Генерація квадратних частинок
  const generateParticles = useCallback(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: Math.floor(Math.random() * 6 + 4),
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 3,
      color: Math.random() > 0.5 ? "#0057b8" : "#ffd700",
    }));
    setParticles(newParticles);
  }, []);

  // Показ віджета
  useEffect(() => {
    const showWidget = () => {
      generateParticles();
      setCurrentFrame(0);
      setIsTransitioning(false);
      setAnimationPhase("entering");
      setIsVisible(true);

      // Перший кадр входить
      setTimeout(() => setAnimationPhase("visible"), 600);
      
      // Починаємо перехід на другий кадр
      setTimeout(() => {
        setIsTransitioning(true);
        
        // В середині переходу міняємо контент
        setTimeout(() => {
          setCurrentFrame(1);
        }, TRANSITION_DURATION / 2);
        
        // Закінчуємо перехід
        setTimeout(() => {
          setIsTransitioning(false);
        }, TRANSITION_DURATION);
        
      }, FRAME_DURATION);

      // Виходимо
      setTimeout(() => setAnimationPhase("exiting"), TOTAL_DURATION - 600);
      setTimeout(() => {
        setIsVisible(false);
        setAnimationPhase("hidden");
      }, TOTAL_DURATION);
    };

    // Показати одразу для тесту
    showWidget();

    const interval = setInterval(showWidget, INTERVAL_DURATION);
    return () => clearInterval(interval);
  }, [generateParticles]);

  if (!isVisible) return null;

  return (
    <div className="obs-widget-container">
      <style>{`
        .obs-widget-container {
          width: 1920px;
          height: 1080px;
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Minecraft', -apple-system, sans-serif;
          pointer-events: none;
          perspective: 1200px;
        }

        .particles-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          pointer-events: none;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-1200px);
            opacity: 0;
          }
        }

        @keyframes cardEnter {
          0% {
            transform: rotateY(-20deg) rotateX(8deg) scale(0.7) translateY(150px);
            opacity: 0;
            filter: blur(10px);
          }
          60% {
            filter: blur(2px);
          }
          100% {
            transform: rotateY(-6deg) rotateX(2deg) scale(1) translateY(0);
            opacity: 1;
            filter: blur(0);
          }
        }

        @keyframes cardExit {
          0% {
            transform: rotateY(-6deg) rotateX(2deg) scale(1) translateY(0);
            opacity: 1;
            filter: blur(0);
          }
          40% {
            filter: blur(2px);
          }
          100% {
            transform: rotateY(-20deg) rotateX(8deg) scale(0.7) translateY(-150px);
            opacity: 0;
            filter: blur(10px);
          }
        }

        @keyframes borderPulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(197, 98, 154, 0.3), 0 20px 60px rgba(0, 0, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 50px rgba(197, 98, 154, 0.5), 0 25px 80px rgba(0, 0, 0, 0.5);
          }
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .widget-wrapper {
          position: relative;
          z-index: 10;
          transform: rotateY(-6deg) rotateX(2deg);
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
        }

        .widget-wrapper.entering {
          animation: cardEnter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .widget-wrapper.visible {
          transform: rotateY(-6deg) rotateX(2deg);
        }

        .widget-wrapper.exiting {
          animation: cardExit 0.8s cubic-bezier(0.36, 0, 0.66, -0.56) forwards;
        }

        .main-card {
          animation: borderPulse 3s ease-in-out infinite;
          width: 900px;
          position: relative;
        }

        /* Motion blur overlay для переходу */}
        .transition-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 100;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .transition-overlay.active {
          opacity: 1;
        }

        .transition-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(197, 98, 154, 0.1) 20%,
            rgba(197, 98, 154, 0.3) 50%,
            rgba(197, 98, 154, 0.1) 80%,
            transparent 100%
          );
          animation: motionBlurSweep 0.8s ease-in-out;
        }

        @keyframes motionBlurSweep {
          0% {
            transform: translateX(-100%) scaleX(2);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) scaleX(2);
            opacity: 0;
          }
        }

        /* Контент з blur при переході */
        .frame-content {
          transition: filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease;
        }

        .frame-content.blur-out {
          filter: blur(8px);
          opacity: 0.3;
          transform: scale(0.98) translateX(-20px);
        }

        .frame-content.blur-in {
          filter: blur(8px);
          opacity: 0.3;
          transform: scale(0.98) translateX(20px);
        }

        .heart-icon {
          animation: heartBeat 1.5s ease-in-out infinite;
          display: inline-block;
        }

        .ticker-content {
          animation: tickerScroll 20s linear infinite;
          display: flex;
          gap: 40px;
          white-space: nowrap;
        }

        .gradient-text {
          background: linear-gradient(90deg, #ffd700, #ffee88, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Плавна зміна кольору рамки */
        .border-transition {
          transition: all 0.4s ease;
        }
      `}</style>

      {/* Партікли */}
      <div className="particles-layer">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              animation: `floatUp ${particle.duration}s linear ${particle.delay}s infinite`,
              boxShadow: `0 0 ${particle.size}px ${particle.color}`,
            }}
          />
        ))}
      </div>

      {/* Нахилена картка */}
      <div className={`widget-wrapper ${animationPhase}`}>
        <div className="main-card">
          {/* Motion blur overlay */}
          <div className={`transition-overlay ${isTransitioning ? 'active' : ''}`} />

          <BorderBox
            borderColor={currentFrame === 0 ? "bg-[#ffd700]" : "bg-[#c5629a]"}
            innerBg="bg-[#0a0a12]"
            shine={true}
            className="border-transition"
          >
            <div className="p-8">
              {/* Кадр 1: Донати на ЗСУ */}
              <div 
                className={`frame-content ${
                  currentFrame === 0 
                    ? (isTransitioning ? 'blur-out' : '') 
                    : 'hidden'
                }`}
                style={{ display: currentFrame === 0 ? 'block' : 'none' }}
              >
                <div className="text-center">
                  {/* Заголовок */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <i className="hn hn-alert-triangle text-[#ffd700] text-4xl"></i>
                    <h1 className="text-4xl font-bold gradient-text minecraftFont">
                      ЗАЧЕКАЙ!
                    </h1>
                    <i className="hn hn-alert-triangle text-[#ffd700] text-4xl"></i>
                  </div>

                  {/* Основний текст */}
                  <p className="text-2xl text-white minecraftFont mb-4">
                    Перш ніж донатити на ігри —
                  </p>
                  <p className="text-3xl font-bold text-[#ffd700] minecraftFont mb-8">
                    СПОЧАТКУ ПІДТРИМАЙ ЗСУ!
                  </p>

                  {/* Роздільник з прапором */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-[3px] bg-gradient-to-r from-transparent via-[#0057b8] to-[#0057b8]"></div>
                    <i className="hn hn-heart-solid heart-icon text-[#0057b8] text-3xl"></i>
                    <div className="flex-1 h-[3px] bg-gradient-to-l from-transparent via-[#ffd700] to-[#ffd700]"></div>
                  </div>

                  {/* Фонди */}
                  <div className="flex justify-center gap-6 mb-6">
                    {[
                      { name: "Повернись живим", icon: "hn-heart-solid", url: "savelife.in.ua" },
                      { name: "Фонд Притули", icon: "hn-heart-solid", url: "prytulafoundation.org" },
                      { name: "United24", icon: "hn-heart-solid", url: "u24.gov.ua" },
                    ].map((fund, idx) => (
                      <BorderBox
                        key={idx}
                        borderColor="bg-[#166534]"
                        innerBg="bg-[#0d1f12]"
                        shine={false}
                      >
                        <div className="px-5 py-4 text-center min-w-[160px]">
                          <i className={`hn ${fund.icon} text-green-400 text-2xl block mb-2`}></i>
                          <span className="text-white text-sm font-bold minecraftFont block mb-1">
                            {fund.name}
                          </span>
                          <span className="text-green-400/70 text-xs">
                            {fund.url}
                          </span>
                        </div>
                      </BorderBox>
                    ))}
                  </div>

                  {/* Підпис */}
                  <p className="text-gray-400 text-sm">
                    Перемога — найважливіше. А ігри почекають.
                  </p>
                </div>
              </div>

              {/* Кадр 2: Сервер */}
              <div 
                className={`frame-content ${
                  currentFrame === 1 
                    ? (isTransitioning ? 'blur-in' : '') 
                    : 'hidden'
                }`}
                style={{ display: currentFrame === 1 ? 'block' : 'none' }}
              >
                <div className="text-center">
                  {/* Лого та назва */}
                  <div className="flex items-center justify-center gap-5 mb-6">
                    <img
                      src="/logo512.png"
                      alt="M4SUB"
                      className="w-20 h-20 object-contain"
                      style={{
                        filter: "drop-shadow(0 0 15px rgba(197, 98, 154, 0.5))",
                        imageRendering: "pixelated",
                      }}
                    />
                    <div className="text-left">
                      <h1 className="text-5xl font-bold text-white minecraftFont">
                        M4SUB
                      </h1>
                      <p className="text-[#c5629a] text-lg minecraftFont flex items-center gap-2">
                        <i className="hn hn-cube-solid"></i>
                        MINECRAFT СЕРВЕР
                      </p>
                    </div>
                  </div>

                  {/* IP адреса */}
                  <BorderBox
                    borderColor="bg-[#c5629a]"
                    innerBg="bg-[#1a1a2e]"
                    shine={false}
                  >
                    <div className="px-8 py-4 flex items-center justify-center gap-3">
                      <i className="hn hn-globe text-[#c5629a] text-xl"></i>
                      <span className="text-gray-400 text-lg">IP:</span>
                      <span className="text-[#c5629a] text-3xl font-bold minecraftFont">
                        m4sub.click
                      </span>
                    </div>
                  </BorderBox>

                  {/* Фічі */}
                  <div className="flex justify-center gap-4 mt-6 mb-6">
                    {[
                      { icon: "hn-folder", text: "Без модів" },
                      { icon: "hn-check-circle", text: "Версія 1.21.4" },
                      { icon: "hn-unlock", text: "Безкоштовно" },
                      { icon: "hn-users", text: "Спільнота" },
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="bg-[#1a1a2e]/80 px-4 py-2 border border-[#c5629a]/30 flex items-center gap-2"
                      >
                        <i className={`hn ${feature.icon} text-[#c5629a]`}></i>
                        <span className="text-gray-300 text-sm minecraftFont">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="inline-block bg-gradient-to-r from-[#c5629a] to-[#f390d0] px-10 py-4">
                    <span className="text-white text-2xl font-bold minecraftFont flex items-center gap-3">
                      <i className="hn hn-rocket"></i>
                      ПРИЄДНУЙСЯ!
                      <i className="hn hn-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </div>

              {/* Бігуча стрічка (для обох кадрів) */}
              <div className="mt-6 overflow-hidden border-t border-[#c5629a]/20 pt-4">
                <div className="ticker-content text-[#c5629a]/70 text-sm minecraftFont">
                  <span className="flex items-center gap-2">
                    <i className="hn hn-heart-solid text-[#0057b8]"></i> ДОНАТЬ НА ЗСУ
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <i className="hn hn-globe"></i> m4sub.click
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <i className="hn hn-flag-ukraine"></i> СЛАВА УКРАЇНІ
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <i className="hn hn-gamepad"></i> ПРИЄДНУЙСЯ
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <i className="hn hn-heart-solid text-[#0057b8]"></i> ДОНАТЬ НА ЗСУ
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <i className="hn hn-globe"></i> m4sub.click
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <i className="hn hn-flag-ukraine"></i> СЛАВА УКРАЇНІ
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <i className="hn hn-gamepad"></i> ПРИЄДНУЙСЯ
                  </span>
                </div>
              </div>
            </div>
          </BorderBox>
        </div>
      </div>
    </div>
  );
}