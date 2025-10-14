// src/components/RulesMenu.jsx
import { Link } from "react-router-dom";

export default function RulesMenu() {
  const ruleCards = [
    {
      title: "Сабсервер",
      description: "Правила режиму «Сабсервер» на сервері\nКласичний SMP без приватів",
      image: "/servers/sub.webp",
      link: "/subserver/rules",
    },
    {
      title: "Домініон",
      description: "Правила режиму «Домініон» на сервері\nРольовий MMORPG в фентезійному світі",
      image: "/servers/dominion.webp",
      link: "/dominion/rules",
    },
    // Якщо додадуться інші режими, просто допишіть сюди
  ];

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
        Виберіть правила для вашого режиму
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {ruleCards.map((item, idx) => (
          <Link
            to={item.link}
            key={idx}
            className="bg-green-900/20 pixelcut rounded-lg flex flex-col items-center text-center text-gray-200 hover:bg-green-900/40 transition p-4"
            style={{ width: "300px", height: "300px" }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-40 h-40 object-contain mx-auto"
            />
            <h3 className="text-lg font-bold mt-2">{item.title}</h3>
            <p
              className="text-sm mt-1"
              dangerouslySetInnerHTML={{
                __html: item.description.replace(/\n/g, "<br>"),
              }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
