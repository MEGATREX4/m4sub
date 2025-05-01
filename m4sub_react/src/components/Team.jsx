import { useState, useEffect } from "react";
import pointLeft from "../icons/point-left.png";
import pointRight from "../icons/point-right.png";

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

  useEffect(() => {
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
  }, [isPaused, currentIndex, nextSlide]);


  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % teamData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + teamData.length) % teamData.length);
  };

  const member = teamData[currentIndex];

  if (!member) return null;

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="mt-16 bg-green-900/10 p-8 w-full max-w-full overflow-hidden"
    >

      <TeamSlide key={member.username} member={member} />

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={prevSlide}
          style={{ backgroundImage: `url(${pointLeft})` }}
          className="w-10 h-10 bg-center bg-no-repeat filter invert-[1]"
        ></button>

{teamData.map((_, idx) => (
  <button
    key={idx}
    onClick={() => setCurrentIndex(idx)}
    className={`w-12 h-12 transition-transform duration-300 ${
      idx === currentIndex ? "opacity-100 -translate-y-3" : "opacity-50 translate-y-0"
    }`}
  >
    <img
      src={`https://www.mc-heads.net/avatar/${teamData[idx].username}.png`}
      alt="avatar"
      className="w-full h-full object-cover"
    />
  </button>
))}


        <button
          onClick={nextSlide}
          style={{ backgroundImage: `url(${pointRight})` }}
          className="w-10 h-10 bg-center bg-no-repeat filter invert-[1]"
        ></button>
      </div>

      <div className="w-full h-2 bg-gray-700 mt-4">
        <div
          className="h-full bg-[#c5629a] transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </section>
  );
}

function TeamSlide({ member }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[2fr,1fr] items-center gap-8 w-full max-w-[100vw] overflow-hidden">
      <div className="flex flex-col h-full justify-start md:ml-20">
        <h2 className="text-2xl font-bold text-gray-200">Познайомтеся з командою</h2>
        <p className="mt-2 mb-10 text-gray-200">Дізнайтеся про людей, які роблять сервер дивовожним!</p>

        <div className={`slide-text transition duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
          <h3 className="minecraftFont text-3xl font-semibold text-gray-200 leading-relaxed flex flex-wrap items-center gap-2">
            <span className="break-words">{member.name}</span>
            <span
              className={`cornerCutSmall px-2 flex flex-wrap items-center gap-2`}
              style={{ backgroundColor: member["role-color"] }}
            >
              <i
                className="role-icon pixelated inline-block"
                style={{
                  backgroundImage: `url(https://raw.githubusercontent.com/MEGATREX4/m4sub_wiki/main/assets/icons/${member["role-icon"]}.png)`,
                  backgroundSize: "cover",
                  width: "32px",
                  height: "32px",
                  imageRendering: "pixelated",
                  flexShrink: 0,
                }}
              />
              <span className="break-words">{member.role}</span>
            </span>
          </h3>

          <div className="flex flex-grow items-center justify-center mt-8">
            <p className="text-gray-200 leading-relaxed text-center max-w-lg">
              {member.description}
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center items-center min-h-[250px]">
        <div className="image-wrapper w-full max-w-[300px] aspect-[3/4] overflow-hidden relative">
          <img
            src={`https://nmsr.nickac.dev/bust/${member.username}`}
            alt={member.name}
            onLoad={() => setVisible(true)}
            className={`slide-image absolute inset-0 w-full h-full object-contain transition duration-500 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
