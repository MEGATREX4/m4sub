// src/components/Anarchy.jsx
import Detailed from "./Detailed";

export default function Anarchy() {
  const anarchyItems = [
    {
      title: "Мапа",
      description: "Перегляньте мапу анархії.",
      image: "/map.png",
      link: "#map",
    },
    {
      title: "Правила анархії",
      description: "Дізнайтесь більше про правила.",
      image: "/images/anarchy/rules.png",
      link: "#rules",
    },
    {
      title: "Донат",
      description: "Не P2W: підтримай розвиток сервера.",
      image: "/images/anarchy/donate.png",
      link: "/donate",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* картки */}
      <Detailed items={anarchyItems} />
    </div>
  );
}
