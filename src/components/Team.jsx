// Team.jsx
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

const mcTexture = (name) => `https://mc.nerothe.com/img/1.21.11/minecraft_${name}.png`;

function TeamSlide({ member }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [member]);

  const bustUrl = `https://nmsr.nickac.dev/bust/${member.username}`;

  

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] items-center gap-8 p-6 sm:p-8">
      {/* Контент з фіксованими висотами */}
      <div 
        className={`flex flex-col text-center md:text-left transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        {/* Ім'я - фіксована висота */}
        <div className="min-h-[44px] mb-3">
          <h3 className="text-2xl sm:text-3xl font-bold text-white minecraftFont">
            {member.name}
          </h3>
        </div>

        {/* Теги/ролі - фіксована висота для 1 рядка */}
        <div className="min-h-[36px] mb-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {member.role && (
              <div
                className="cornerCutSmall px-3 py-1.5 inline-flex items-center gap-2 text-sm font-bold"
                style={{ backgroundColor: member.role.color, color: getContrastColor(member.role.color) }}
              >
                <i className={`hn hn-${member.role.icon || 'user'}`}></i>
                <span className="minecraftFont">{member.role.name}</span>
              </div>
            )}

            {member.servers?.map(server => (
              <div 
                key={server.id} 
                className="cornerCutSmall px-3 py-1.5 inline-flex items-center gap-2 text-sm"
                style={{ backgroundColor: server.color, color: getContrastColor(server.color) }}
              >
                <img
                  src={`/servers/${server.id}.webp`}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/servers/${server.id}.png`; }}
                  alt={server.title}
                  className="w-5 h-5 object-contain"
                />
                <span className="minecraftFont">{server.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Опис - фіксована висота для ~3-4 рядків */}
        <div className="min-h-[96px] mb-6">
          <p className="text-gray-300 leading-relaxed max-w-lg mx-auto md:mx-0 line-clamp-4">
            {member.description}
          </p>
        </div>
        
        {/* Соціальні посилання - фіксована висота */}
        <div className="min-h-[40px]">
          {member.socials?.length > 0 && (
            <div className="flex gap-3 justify-center md:justify-start">
              {member.socials.map(social => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.platform}
                  className="w-10 h-10 cornerCutSmall flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: social.color }}
                >
                  <i className={`hn ${social.icon_class} text-white text-xl`}></i>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Avatar з glow ефектом - фіксований розмір */}
      <div className={`flex justify-center transition-all duration-500 ease-out ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
        <div className="relative w-72 h-72">
          {/* Glow */}
          <img
            src={bustUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain scale-x-[-1] pointer-events-none"
            style={{
              filter: 'blur(40px) saturate(1.8)',
              opacity: 0.6,
              transform: 'scaleX(-1) scale(1.15)',
            }}
          />
          
          {/* Основне зображення */}
          <img
            src={bustUrl}
            alt={member.name}
            className="relative w-full h-full object-contain scale-x-[-1]"
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
      className="mt-12"
    >
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#0a0a12]">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white minecraftFont flex items-center justify-center gap-3">
              <i className="hn hn-users-solid text-[#c5629a]"></i>
              {isSlider ? "Познайомтеся з командою" : "Керівництво проєкту"}
            </h2>
            {isSlider && (
              <p className="mt-2 text-gray-400">
                Дізнайтеся про людей, які роблять сервер дивовижним!
              </p>
            )}
          </div>
          

          <div className="my-5 flex items-center gap-2">
            <div className="flex-1 flex h-[3px]">
              <div className="flex-1 bg-[#2a0a1a]"></div>
              <div className="flex-1 bg-[#4a1a3a]"></div>
              <div className="flex-1 bg-[#6a2a5a]"></div>
              <div className="flex-1 bg-[#8a3a7a]"></div>
              <div className="flex-1 bg-[#a54a8a]"></div>
              <div className="flex-1 bg-[#c5629a]"></div>
            </div>
            <img 
              src={mcTexture("nether_star")} 
              alt="Nether Star" 
              className="w-4 h-4"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="flex-1 flex h-[3px]">
              <div className="flex-1 bg-[#c5629a]"></div>
              <div className="flex-1 bg-[#a54a8a]"></div>
              <div className="flex-1 bg-[#8a3a7a]"></div>
              <div className="flex-1 bg-[#6a2a5a]"></div>
              <div className="flex-1 bg-[#4a1a3a]"></div>
              <div className="flex-1 bg-[#2a0a1a]"></div>
            </div>
          </div>

          {/* Контейнер зі стабільною висотою */}
          <div className="min-h-[320px] md:min-h-[288px]">
            <TeamSlide key={currentIndex} member={teamData[currentIndex]} />
          </div>

          {isSlider && (
            <>
              {/* Navigation */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button 
                  onClick={prevSlide} 
                  className="w-10 h-10 bg-[#1a1a2e] hover:bg-[#c5629a] transition-colors flex items-center justify-center"
                >
                  <i className="hn hn-angle-left text-white"></i>
                </button>
                
                {teamData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setCurrentIndex(idx); setProgress(0); }}
                    className={`w-10 h-10 transition-all duration-300 ${
                      idx === currentIndex 
                        ? "scale-110" 
                        : "opacity-35 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={`https://nmsr.nickac.dev/face/${teamData[idx].username}`} 
                      alt="avatar" 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
                
                <button 
                  onClick={nextSlide} 
                  className="w-10 h-10 bg-[#1a1a2e] hover:bg-[#c5629a] transition-colors flex items-center justify-center"
                >
                  <i className="hn hn-angle-right text-white"></i>
                </button>
              </div>
              
              {/* Progress bar */}
              <div className="h-1 bg-[#1a1a2e] mt-4 overflow-hidden">
                <div 
                  className="h-full bg-[#c5629a] transition-all duration-100" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          )}
        </div>
      </BorderBox>
    </section>
  );
}