import Detailed from "./Detailed";

export default function anarchy() {
  const anarchyItems = [
    {
      title: "Мапа",
      description: "Перегляньте мапу анархії.",
      image: "/news.png",
      link: "/anarchy/faq",
    },
    {
      title: "Додаткові правила анархії",
      description: "Дізнайтесь більше про правила анархії.",
      image: "/news.png",
      link: "/anarchy/map",
    },
    {
      title: "Донат",
      description: "Не P2W Донат",
      image: "/news.png",
      link: "/donate",
    }
  ];

  return (
    <Detailed items={anarchyItems} />
  );
}
