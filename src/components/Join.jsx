import { useEffect, useState } from "react";
import { BorderBox } from "./donate/components/BorderBox";

export default function Join() {
  const [online, setOnline] = useState("Завантаження...");
  const [copied, setCopied] = useState(false);
  const [isOnline, setIsOnline] = useState(null);
  const [version, setVersion] = useState("1.21.11"); 

  useEffect(() => {
    fetch(`https://api.mcsrvstat.us/2/m4sub.click`)
      .then(res => res.json())
      .then(data => {
        if (data.online) {
          setOnline(`${data.players.online}/${data.players.max} ГРАВЦІВ`);
          setIsOnline(true);
          setVersion(data.version || "1.21.11");
        } else {
          setOnline("СЕРВЕР ОФЛАЙН");
          setIsOnline(false);
        }
      })
      .catch(() => {
        setOnline("ПОМИЛКА");
        setIsOnline(false);
      });
  }, []);

  const copyIP = async () => {
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
    <section className="px-2">
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#130217]">
        <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-10 items-center justify-between relative overflow-hidden">
          
          {/* Декоративна іконка на фоні для мобілок */}
          <i className="hn hn-rocket absolute -right-4 -top-4 text-white/5 text-9xl sm:hidden pointer-events-none"></i>

          {/* Content */}
          <div className="text-center sm:text-left w-full sm:w-auto flex-1 relative z-10">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
              <h2 className="text-2xl sm:text-4xl font-bold text-white minecraftFont uppercase tracking-tighter italic leading-none">
                Вступай <span className="text-[#c5629a]">зараз!</span>
              </h2>
            </div>
            
            {/* Features (Стилізовані під системні лейбли) */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-8">
              {[
                { icon: "hn-folder", text: "Без модів" },
                { icon: "hn-check-circle-solid", text: `Версія ${version}` },
                { icon: "hn-unlock", text: "Безкоштовно" }
              ].map((f, i) => (
                <div key={i} className="bg-white/5 border border-white/10 px-3 py-1.5 flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 minecraftFont uppercase tracking-widest">
                  <i className={`hn ${f.icon} text-[#c5629a]`}></i>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Copy IP Button & Status */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <button 
                onClick={copyIP} 
                className={`
                  relative flex items-center justify-center gap-3 px-8 py-4 font-bold minecraftFont transition-all w-full sm:w-auto uppercase text-sm sm:text-lg
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-1 active:translate-y-1
                  ${copied 
                    ? 'bg-green-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]' 
                    : 'bg-[#c5629a] hover:bg-[#d47bb0] text-white'
                  }
                `}
              >
                <i className={`hn ${copied ? 'hn-check-circle-solid' : 'hn-copy'}`}></i>
                <span>{copied ? "Скопійовано!" : "m4sub.click"}</span>
              </button>
              
              {/* Online Status - Блоковий дизайн */}
              <div className="flex items-center gap-3 bg-black/40 px-4 py-2 border border-white/5">
                <div className={`w-2.5 h-2.5 ${isOnline === true ? 'bg-green-500 animate-pulse' : isOnline === false ? 'bg-red-500' : 'bg-gray-600'}`}></div>
                <span className={`text-[11px] sm:text-xs minecraftFont tracking-widest ${isOnline === true ? 'text-green-500' : 'text-gray-500'}`}>
                    {online}
                </span>
              </div>
            </div>
          </div>

          {/* Image - Desktop right (Статичне, з жорстким відблиском) */}
          <div className="hidden sm:flex justify-center flex-shrink-0 relative">
            <div className="absolute inset-0 bg-[#c5629a]/10 blur-3xl rounded-full"></div>
            <img 
              src="/search.png" 
              alt="Server" 
              className="w-32 h-32 lg:w-48 lg:h-48 relative z-10" 
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>
      </BorderBox>
    </section>
  );
}