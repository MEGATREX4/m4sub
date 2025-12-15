// Join.jsx
import { useEffect, useState } from "react";
import { BorderBox } from "./donate/components/BorderBox";

export default function Join() {
  const [online, setOnline] = useState("Завантаження...");
  const [copied, setCopied] = useState(false);
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    fetch(`https://api.mcsrvstat.us/2/m4sub.click`)
      .then(res => res.json())
      .then(data => {
        if (data.online) {
          setOnline(`${data.players.online}/${data.players.max} гравців`);
          setIsOnline(true);
        } else {
          setOnline("Сервер офлайн");
          setIsOnline(false);
        }
      })
      .catch(() => {
        setOnline("Помилка завантаження");
        setIsOnline(false);
      });
  }, []);

  const copyIP = () => {
    navigator.clipboard.writeText("m4sub.click").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="mt-12">
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#0a0a12]" shine={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 items-center">
          {/* Image - Mobile top */}
          <div className="flex justify-center md:hidden">
            <img 
              src="/search.png" 
              alt="Server" 
              className="w-48 h-48 drop-shadow-[0_0_20px_rgba(197,98,154,0.4)]" 
            />
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white minecraftFont mb-4 flex items-center justify-center md:justify-start gap-3">
              <i className="hn hn-rocket text-[#c5629a]"></i>
              Вступай зараз!
            </h2>
            
            <div className="h-[2px] bg-gradient-to-r from-[#c5629a] to-transparent mb-6"></div>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              <div className="bg-[#1a1a2e] px-3 py-1.5 flex items-center gap-2 text-sm text-gray-300">
                <i className="hn hn-cube-solid text-[#c5629a]"></i>
                <span>Без модів</span>
              </div>
              <div className="bg-[#1a1a2e] px-3 py-1.5 flex items-center gap-2 text-sm text-gray-300">
                <i className="hn hn-check-circle text-[#c5629a]"></i>
                <span>Ліцензія 1.21.4</span>
              </div>
              <div className="bg-[#1a1a2e] px-3 py-1.5 flex items-center gap-2 text-sm text-gray-300">
                <i className="hn hn-unlock text-[#c5629a]"></i>
                <span>Безкоштовно</span>
              </div>
            </div>

            {/* Copy IP Button */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <button 
                onClick={copyIP} 
                className={`
                  flex items-center gap-3 px-6 py-3 font-bold minecraftFont cornerCutSmall transition-all
                  ${copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-[#c5629a] hover:bg-[#f390d0] text-white hover:scale-105'
                  }
                `}
              >
                <i className={`hn ${copied ? 'hn-check' : 'hn-copy'} text-lg`}></i>
                <span>{copied ? "Скопійовано!" : "m4sub.click"}</span>
              </button>
              
              {/* Online Status */}
              <div className={`
                flex items-center gap-2 text-sm
                ${isOnline === true ? 'text-green-400' : isOnline === false ? 'text-red-400' : 'text-gray-400'}
              `}>
                <span className={`w-2 h-2 rounded-full ${isOnline === true ? 'bg-green-400 animate-pulse' : isOnline === false ? 'bg-red-400' : 'bg-gray-400'}`}></span>
                {online}
              </div>
            </div>
          </div>

          {/* Image - Desktop right */}
          <div className="hidden md:flex justify-center">
            <img 
              src="/search.png" 
              alt="Server" 
              className="w-56 h-56 lg:w-64 lg:h-64 drop-shadow-[0_0_30px_rgba(197,98,154,0.4)]" 
            />
          </div>
        </div>
      </BorderBox>
    </section>
  );
}