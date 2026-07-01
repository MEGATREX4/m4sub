import { useState, useEffect, useCallback } from "react";
import { BorderBox } from "./donate/components/BorderBox";

function getContrastColor(hexColor) {
  if (!hexColor) return '#FFFFFF';
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
  return luminance > 140 ? '#000000' : '#FFFFFF';
}

const iconTexture = (name) => `https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/icons/${name}.png`;

function TeamSlide({ member }) {
  const bustUrl = `https://nmsr.nickac.dev/bust/${member.username}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr,0.8fr] items-center gap-6 sm:gap-10">
      
      {/* Left Side: Info */}
      <div className="flex flex-col text-center md:text-left">
        <div className="mb-4">
          <span className="text-[#c5629a] minecraftFont text-[10px] uppercase tracking-[0.3em] mb-1 block">Учасник команди</span>
          {/* Прибрано italic, залишено масивність */}
          <h3 className="text-3xl sm:text-6xl font-bold text-white minecraftFont uppercase tracking-tighter leading-none drop-shadow-lg">
            {member.name}
          </h3>
        </div>

        {/* Roles & Servers */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
          {member.role && (
            <div
              className="px-3 py-1.5 inline-flex items-center gap-2 border-b-4 shadow-md"
              style={{ backgroundColor: member.role.color, color: getContrastColor(member.role.color), borderColor: 'rgba(0,0,0,0.3)' }}
            >
              <i className="w-4 h-4 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${iconTexture(member.role.icon)})` }}></i>
              <span className="minecraftFont text-[11px] uppercase font-bold tracking-wider">{member.role.name}</span>
            </div>
          )}

          {member.servers?.map(server => (
            <div 
              key={server.id} 
              className="px-3 py-1.5 inline-flex items-center gap-2 border-b-4 shadow-md opacity-90"
              style={{ backgroundColor: server.color, color: getContrastColor(server.color), borderColor: 'rgba(0,0,0,0.3)' }}
            >
              <img
                src={`/servers/${server.id}.webp`}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/servers/${server.id}.png`; }}
                alt={server.title}
                className="w-4 h-4 object-contain"
              />
              <span className="minecraftFont text-[11px] uppercase tracking-wider">{server.title}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed uppercase tracking-tight opacity-80 max-w-2xl">
            {member.description}
          </p>
        </div>
        
        {/* Socials */}
        <div className="flex gap-3 justify-center md:justify-start">
          {member.socials?.map(social => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              style={{ backgroundColor: social.color }}
            >
              <i className={`hn ${social.icon_class} text-white text-xl`}></i>
            </a>
          ))}
        </div>
      </div>

      {/* Right Side: Avatar */}
      <div className="flex justify-center relative">
        <div className="relative w-64 h-64 sm:w-96 sm:h-96">
          <div className="absolute inset-0 bg-[#c5629a]/10 blur-[80px] rounded-full pointer-events-none"></div>
          <img
            src={bustUrl}
            alt={member.name}
            className="relative w-full h-full object-contain scale-x-[-1] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  const [teamData, setTeamData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch("/team.json")
      .then((res) => res.json())
      .then((data) => setTeamData(data));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % teamData.length);
    setProgress(0);
  }, [teamData.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + teamData.length) % teamData.length);
    setProgress(0);
  }, [teamData.length]);

  useEffect(() => {
    if (teamData.length <= 1) return;
    const interval = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev >= 100) { nextSlide(); return 0; }
          return prev + 1;
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, teamData.length]);

  if (teamData.length === 0) return null;
  const isSlider = teamData.length > 1;

  return (
    <section
      onMouseEnter={() => isSlider && setIsPaused(true)}
      onMouseLeave={() => isSlider && setIsPaused(false)}
      className="px-2"
    >
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#130217]">
        <div className="p-6 sm:p-12">
          
          {/* Header - Прибрано italic */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <h2 className="text-xl sm:text-3xl font-bold text-white minecraftFont flex items-center gap-4 uppercase tracking-tighter">
              <span className="w-2 h-7 bg-[#c5629a]"></span>
              Команда проєкту
            </h2>
            {isSlider && (
              <div className="text-[10px] text-gray-600 minecraftFont uppercase tracking-widest">
                Слайд {currentIndex + 1} / {teamData.length}
              </div>
            )}
          </div>

          <div className="min-h-[340px] flex items-center mb-12">
            <TeamSlide key={currentIndex} member={teamData[currentIndex]} />
          </div>

          {isSlider && (
            <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-8 pt-8 border-t border-white/5">
              
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <button 
                  onClick={prevSlide} 
                  className="w-10 h-10 bg-[#1a1a2e] border border-white/5 hover:border-[#c5629a] text-white flex items-center justify-center transition-colors shadow-lg"
                >
                  <i className="hn hn-angle-left"></i>
                </button>
                
                <div className="flex gap-2">
                  {teamData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setCurrentIndex(idx); setProgress(0); }}
                      className={`w-11 h-11 border-2 transition-all shadow-md ${
                        idx === currentIndex 
                          ? "border-[#c5629a] scale-105" 
                          : "border-transparent opacity-30 grayscale hover:opacity-100 hover:grayscale-0"
                      }`}
                    >
                      <img 
                        src={`https://nmsr.nickac.dev/face/${teamData[idx].username}`} 
                        alt="face" 
                        className="w-full h-full object-cover" 
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={nextSlide} 
                  className="w-10 h-10 bg-[#1a1a2e] border border-white/5 hover:border-[#c5629a] text-white flex items-center justify-center transition-colors shadow-lg"
                >
                  <i className="hn hn-angle-right"></i>
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[9px] minecraftFont text-gray-600 uppercase tracking-[0.2em]">
                  <span>Автопрокрутка</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 bg-black/60 border border-white/5 overflow-hidden">
                  <div 
                    className="h-full bg-[#c5629a] transition-all duration-100 ease-linear" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

            </div>
          )}
        </div>
      </BorderBox>
    </section>
  );
}