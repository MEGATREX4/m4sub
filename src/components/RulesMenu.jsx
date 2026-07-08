import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CascadeLoader from "./CascadeLoader";

export default function RulesMenu() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

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
  ];

  if (!ready) {
    return <CascadeLoader label="Завантаження меню правил..." className="min-h-[40vh]" />;
  }

  return (
    <div className="mt-2">
      <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center minecraftFont">
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
              style={{ imageRendering: "pixelated" }}
            />
            <h3 className="text-lg font-bold mt-2 minecraftFont">{item.title}</h3>
            <p
              className="text-sm mt-1"
              dangerouslySetInnerHTML={{
                __html: item.description.replace(/\n/g, "<br>"),
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
