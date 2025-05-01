import Detailed from "./Detailed";

export default function Subserver() {
  const subserverItems = [
    {
      title: "Вікі",
      description: "Дізнайтесь більше про особливості нашого сабсервера.",
      image: "/news.png",
      link: "/subserver/rules",
    },
    {
      title: "Мапа",
      description: "Перегляньте мапу нашого сабсервера.",
      image: "/news.png",
      link: "/subserver/faq",
    },
    {
      title: "Додаткові правила сабсервера",
      description: "Дізнайтесь більше про правила нашого сабсервера.",
      image: "/news.png",
      link: "/subserver/map",
    },
  ];

  return (
    <Detailed items={subserverItems} />
  );
}
