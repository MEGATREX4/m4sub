import Detailed from "./Detailed";

export default function Subserver() {
  const subserverItems = [
    {
      title: "Вікі",
      description: "Дізнайтесь більше про особливості нашого сабсервера.",
      image: "/wiki.webp",
      link: "http://wiki.m4sub.click/",
    },
    {
      title: "Мапа",
      description: "Перегляньте мапу нашого сабсервера.",
      image: "/map.webp",
      link: "/subserver/map",
    },
    {
      title: "Правила сабсервера",
      description: "Дізнайтесь більше про правила нашого сабсервера.",
      image: "/rules.webp",
      link: "/subserver/rules",
    },
  ];

  return (
    <Detailed items={subserverItems} />
  );
}
