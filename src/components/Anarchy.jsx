// src/components/Anarchy.jsx
import Detailed from "./Detailed";
import AnarchyRules from "./AnarchyRules";

export default function Anarchy() {
  const anarchyItems = [
    {
      title: "Мапа",
      description: "Перегляньте мапу анархії.",
      image: "/map.webp",
      link: "./anarchy/map",
    },
    {
      title: "Правила анархії",
      description: "Дізнайтесь більше про правила.",
      image: "/rules.webp",
      link: "/anarchy/rules",
    },
    {
      title: "Донат",
      description: "Не P2W: підтримай розвиток сервера.",
      image: "/donate.webp",
      link: "/donate",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* картки */}
      <Detailed items={anarchyItems} />

      <AnarchyRules />

    </div>
  );
}
