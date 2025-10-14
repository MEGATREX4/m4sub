import { useState, useEffect, useCallback } from "react";
import pointLeft from "../icons/point-left.png";
import pointRight from "../icons/point-right.png";
import "./css/TeamIcons.css"; 

/**
 * Визначає, який колір (чорний чи білий) буде контрастним для заданого фону.
 * ... (функція без змін)
 */
function getContrastColor(hexColor) {
  if (!hexColor) return '#FFFFFF';
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
  return luminance > 140 ? '#000000' : '#FFFFFF';
}

// ===================================================================
// Компонент TeamSlide (без змін)
// ===================================================================
function TeamSlide({ member }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, [member]);

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[2fr,1fr] items-center gap-8 w-full">
      <div className="flex flex-col h-full justify-start md:ml-20 text-center md:text-left">
        <div className={`transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h3 className="minecraftFont text-3xl font-semibold text-gray-200 leading-relaxed">
            {member.name}
          </h3>

          <div className="mt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
            {member.role && (
              <div
                className="cornerCutSmall px-3 py-1.5 inline-flex items-center gap-2"
                style={{ backgroundColor: member.role.color, color: getContrastColor(member.role.color) }}
              >
                <i className={`role-icon icon-${member.role.icon}`} />
                <span className="minecraftFont text-sm">{member.role.name}</span>
              </div>
            )}

            {member.servers && member.servers.map(server => (
              <div 
                key={server.id} 
                className="cornerCutSmall px-3 py-1.5 inline-flex items-center gap-2"
                style={{ backgroundColor: server.color, color: getContrastColor(server.color) }}
              >
                <img
                  src={`/servers/${server.id}.webp`}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/servers/${server.id}.png`; }}
                  alt={`${server.title} server icon`}
                  className="w-6 h-6 object-contain"
                />
                <span className="minecraftFont text-sm">{server.title}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-grow items-center justify-center md:justify-start mt-8">
            <p className="text-gray-200 leading-relaxed max-w-lg">
              {member.description}
            </p>
          </div>
          
          {member.socials && member.socials.length > 0 && (
            <div className="mt-6 flex gap-3 justify-center md:justify-start">
              {member.socials.map(social => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.platform}
                  aria-label={`Посилання на ${social.platform}`}
                  className="w-12 h-12 cornerCutSmall flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: social.color }}
                >
                  <i className={`hn ${social.icon_class} text-white text-3xl`}></i>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative flex justify-center items-center min-h-[250px]">
        <div className="image-wrapper w-full max-w-[300px] aspect-[3/4] overflow-hidden relative">
          <img
            src={`https://nmsr.nickac.dev/bust/${member.username}`}
            alt={member.name}
            className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-out ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

// ===================================================================
// Основний компонент Team
// ===================================================================
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

  // ... (решта хуків без змін) ...
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamData.length);
    setProgress(0);
  }, [teamData.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamData.length) % teamData.length);
    setProgress(0);
  }, [teamData.length]);

  useEffect(() => {
    if (teamData.length <= 1) return;
    const interval = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev >= 100) {
            nextSlide();
            return 0;
          }
          return prev + 1;
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, teamData.length]);

  if (teamData.length === 0) {
    return null;
  }
  
  const isSlider = teamData.length > 1;

  return (
    <section
      onMouseEnter={() => isSlider && setIsPaused(true)}
      onMouseLeave={() => isSlider && setIsPaused(false)}
      className="mt-16 bg-green-900/20 p-8 w-full max-w-full overflow-hidden"
    >
      {/* --- ОСЬ КЛЮЧОВА ЗМІНА: ДИНАМІЧНИЙ ЗАГОЛОВОК --- */}
      <div className="text-center md:text-left md:ml-20 mb-8">
        <h2 className="text-2xl font-bold text-gray-200">
          {isSlider ? "Познайомтеся з командою" : "Керівництво проєкту"}
        </h2>
        <p className="mt-2 text-gray-200">
          {isSlider 
            ? "Дізнайтеся про людей, які роблять сервер дивовижним!" 
            : ""
          }
        </p>
      </div>

      <TeamSlide key={currentIndex} member={teamData[currentIndex]} />

      {isSlider && (
        <>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prevSlide} style={{ backgroundImage: `url(${pointLeft})` }} className="w-10 h-10 bg-center bg-no-repeat filter invert-[1]" />
            {teamData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrentIndex(idx); setProgress(0); }}
                className={`w-12 h-12 transition-transform duration-300 ${ idx === currentIndex ? "opacity-100 -translate-y-3" : "opacity-50 translate-y-0" }`}
              >
                <img src={`https://nmsr.nickac.dev/face/${teamData[idx].username}.png`} alt="avatar" className="w-full h-full object-cover" />
              </button>
            ))}
            <button onClick={nextSlide} style={{ backgroundImage: `url(${pointRight})` }} className="w-10 h-10 bg-center bg-no-repeat filter invert-[1]" />
          </div>
          <div className="w-full h-2 bg-gray-700 mt-4">
            <div className="h-full bg-[#c5629a] transition-all" style={{ width: `${progress}%` }} ></div>
          </div>
        </>
      )}
    </section>
  );
}