import Detailed from "./Detailed";

export default function Subserver() {
  const subserverItems = [
    {
      title: "Вікі",
      description: "Дізнайтесь більше про особливості нашого сабсервера.",
      image: "/news.png",
      link: "http://wiki.m4sub.click/",
    },
    {
      title: "Мапа",
      description: "Перегляньте мапу нашого сабсервера.",
      image: "/news.png",
      link: "/subserver/map",
    },
    {
      title: "Додаткові правила сабсервера",
      description: "Дізнайтесь більше про правила нашого сабсервера.",
      image: "/news.png",
      link: "/subserver/faq",
    },
  ];

  return (
    <Detailed items={subserverItems} />
  );
}
