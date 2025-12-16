// Home.jsx
import { useState, useEffect } from "react";
import Detailed from "./Detailed";
import News from "./News";
import Team from "./Team";
import { BorderBox } from "./donate/components/BorderBox";
import Join from "./Join";

// Компактний Join для хедера
function JoinCompact() {
  const [online, setOnline] = useState("...");
  const [copied, setCopied] = useState(false);
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    fetch(`https://api.mcsrvstat.us/2/m4sub.click`)
      .then(res => res.json())
      .then(data => {
        if (data.online) {
          setOnline(`${data.players.online} онлайн`);
          setIsOnline(true);
        } else {
          setOnline("Офлайн");
          setIsOnline(false);
        }
      })
      .catch(() => setIsOnline(false));
  }, []);

  const copyIP = async () => {
    // Перевірка чи clipboard API доступний
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText("m4sub.click");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
        fallbackCopy();
      }
    } else {
      fallbackCopy();
    }
  };

  // Fallback для старих браузерів або HTTP
  const fallbackCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = "m4sub.click";
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#0a0a12]" shine>
      <div className="p-6 flex flex-col items-center justify-center text-center h-full min-w-[200px]">
        <img 
          src="/search.png" 
          alt="Server" 
          className="w-16 h-16 mb-3 drop-shadow-[0_0_10px_rgba(197,98,154,0.4)]" 
        />
        
        <button 
          onClick={copyIP} 
          className={`
            flex items-center gap-2 px-4 py-2 font-bold minecraftFont text-sm transition-all
            ${copied 
              ? 'bg-green-600 text-white' 
              : 'bg-[#c5629a] hover:bg-[#f390d0] text-white'
            }
          `}
        >
          <i className={`hn ${copied ? 'hn-check' : 'hn-copy'}`}></i>
          {copied ? "Скопійовано!" : "m4sub.click"}
        </button>
        
        <div className={`
          flex items-center gap-1.5 text-xs mt-2
          ${isOnline ? 'text-green-400' : 'text-gray-400'}
        `}>
          <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></span>
          {online}
        </div>
      </div>
    </BorderBox>
  );
}

export default function Home() {
  const serverInfoItems = [
    {
      title: "Вікі",
      description: "Дізнайтесь більше про особливості нашого сервера.",
      image: "/wiki.webp",
      link: "http://wiki.m4sub.click/",
    },
    {
      title: "Мапа",
      description: "Перегляньте інтерактивну мапу ігрового світу.",
      image: "/map.webp",
      link: "/subserver/map",
    },
    {
      title: "Правила сервера",
      description: "Ознайомтесь з правилами, щоб грати було комфортно.",
      image: "/rules.webp",
      link: "/subserver/rules",
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Банер + Join в одному ряду на десктопі */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-6 items-stretch">
        {/* Банер */}
        <BorderBox borderColor="bg-orange-500" innerBg="bg-[#0a0a12]">
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="flex items-center gap-4">
              <i className="hn hn-alert-triangle text-orange-400 text-3xl flex-shrink-0 mt-1"></i>
              <div>
                <h2 className="text-xl font-bold text-orange-400 minecraftFont mb-2">
                  Початок сезону
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Шановні гравці! Нагадуємо, що з 20-го грудня розпочинається новий сезон на нашому сервері.
                  Будь ласка, ознайомтесь з оновленими правилами та підготуйтеся до нових пригод у світі Minecraft!
                  також можете прочитати статтю з детальною інформацією про зміни та нововведення. <a href="/news/season6_announcement" className="text-orange-400 underline hover:text-orange-300">Детальніше...</a>
                </p>
              </div>
            </div>
          </div>
        </BorderBox>

        {/* Міні Join */}
        
      </div>

      {/* 2. Швидкі посилання */}
      <Detailed items={serverInfoItems} />

      <Join></Join>

      {/* 3. Features - більш компактно */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BorderBox borderColor="bg-[#c5629a]/50" innerBg="bg-[#0a0a12]">
          <div className="p-6 flex gap-4">
            <img 
              src="/axo.png" 
              alt="Vanilla" 
              className="w-20 h-20 object-contain flex-shrink-0 hidden sm:block"
            />
            <div>
              <h3 className="text-lg font-bold text-white minecraftFont mb-2 flex items-center gap-2">
                <i className="hn hn-cube-solid text-[#c5629a]"></i>
                Справжній ванільний досвід
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Класичний геймплей Minecraft без складних плагінів. Будуйте, досліджуйте та виживайте разом з друзями.
              </p>
            </div>
          </div>
        </BorderBox>

        <BorderBox borderColor="bg-[#c5629a]/50" innerBg="bg-[#0a0a12]">
          <div className="p-6 flex gap-4">
            <img 
              src="/def.png" 
              alt="Vanilla+" 
              className="w-20 h-20 object-contain flex-shrink-0 hidden sm:block"
            />
            <div>
              <h3 className="text-lg font-bold text-white minecraftFont mb-2 flex items-center gap-2">
                <i className="hn hn-bolt text-[#c5629a]"></i>
                Покращення Vanilla+
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Незначні QoL покращення без ламання геймплею. Ванільна атмосфера + комфорт.
              </p>
            </div>
          </div>
        </BorderBox>
      </div>

      {/* 4. News + Team один під одним */}
      <div className="space-y-6">
        <News compact />
        <Team compact />
      </div>
    </div>
  );
}