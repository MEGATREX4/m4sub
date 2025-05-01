import Detailed from "./Detailed";

export default function dominion() {
  const dominionItems = [
    {
      title: "Вікі",
      description: "Дізнайтесь більше про особливості домініона.",
      image: "/news.png",
      link: "/dominion/rules",
    },
    {
      title: "Мапа",
      description: "Перегляньте мапу домініона.",
      image: "/news.png",
      link: "/dominion/faq",
    },
    {
      title: "Додаткові правила домініона",
      description: "Дізнайтесь більше про правила домініона.",
      image: "/news.png",
      link: "/dominion/map",
    },
  ];

  return (
    <Detailed items={dominionItems} />
  );
}
