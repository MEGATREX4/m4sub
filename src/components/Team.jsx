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

function TeamSlide({ member }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, [member]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] items-center gap-8 p-6 sm:p-8">
      <div className={`flex flex-col text-center md:text-left transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        <h3 className="text-2xl sm:text-3xl font-bold text-white minecraftFont mb-3">
          {member.name}
        </h3>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
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

        <p className="text-gray-300 leading-relaxed max-w-lg mx-auto md:mx-0 mb-6">
          {member.description}
        </p>
        
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

      <div className={`flex justify-center transition-all duration-500 ease-out ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
        <img
          src={`https://nmsr.nickac.dev/bust/${member.username}`}
          alt={member.name}
          className="w-48 h-64 sm:w-56 sm:h-72 object-contain drop-shadow-[0_0_20px_rgba(197,98,154,0.4)]"
        />
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

          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c5629a] to-transparent mb-6"></div>

          <TeamSlide key={currentIndex} member={teamData[currentIndex]} />

          {isSlider && (
            <>
              {/* Navigation */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button 
                  onClick={prevSlide} 
                  className="w-10 h-10 bg-[#1a1a2e] hover:bg-[#c5629a] transition-colors flex items-center justify-center"
                >
                  <i className="hn hn-chevron-left text-white"></i>
                </button>
                
                {teamData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setCurrentIndex(idx); setProgress(0); }}
                    className={`w-10 h-10 transition-all duration-300 border-2 ${
                      idx === currentIndex 
                        ? "border-[#c5629a] scale-110" 
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={`https://nmsr.nickac.dev/face/${teamData[idx].username}.png`} 
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