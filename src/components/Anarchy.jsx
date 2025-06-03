// src/components/Anarchy.jsx
import Detailed from "./Detailed";
import Features from "./Features";
import FeatureCard from "./FeatureCard";

const anarchyFeatures = [
  "Вайп кожного 14-го числа",
  "Мапа 10.000×10.000 блоків",
  "Власна система економіки",
  "Стильне меню",
  "Власні плагіни",
  "Майже ніяких правил"
]

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
      
      <Detailed items={anarchyItems} />

      <FeatureCard 
        title="Меню" 
        image="/menu_render.webp" 
        description="У стилізованому меню ви побачите велике й зрозуміле іконографічне оформлення: кожна кнопка відзначена чітким символом, щоб ви миттєво знаходили потрібний розділ."
        buttonText="Переглянути Discord"
        buttonLink="/discord"
        textPosition="left"
        hideImageOnMobile={false}
        mirrorImage={false}
        showAsPoints={false}
        showButton={false}
        showBackground={true}
      />

      <Features items={anarchyFeatures} title="Переваги анархії" />



      <FeatureCard 
        title="Економіка" 
        image="/donate.webp" 
        description="У нас діє власна унікальна економічна система: ціна кожного предмета напряму залежить від того, як часто і за яку суму його продають гравці. Завдяки пропрієтарній системі економіки ми можемо оновлювати сервер без жодних обмежень."
        buttonText="Переглянути Discord"
        buttonLink="/discord"
        textPosition="left"
        hideImageOnMobile={false}
        mirrorImage={true}
        showAsPoints={false}
        showButton={false}
        showBackground={true}
      />

      <FeatureCard 
        title="Особливості" 
        image="/donate.webp" 
        description="На сервері координати відключені допоки ви не здобудете компас відновлення: без нього доведеться орієнтуватися “по почуттях”. Приватів тут немає взагалі, тож жодна ділянка не захищена — ваша база може бути розграбована будь-коли. Таке поєднання робить виживання справжнім викликом: вам доведеться шукати компас, домовлятися або битись."
        buttonText="Переглянути Discord"
        buttonLink="/discord"
        textPosition="right"
        hideImageOnMobile={false}
        mirrorImage={true}
        showAsPoints={false}
        showButton={false}
        showBackground={false}
      />
      <FeatureCard 
        title="Базар" 
        image="/donate.webp" 
        description="У базарі два окремі меню: у першому гравці виставляють свої ресурси на продаж та встановлюють власні ціни, у другому ви можете здавати ресурси «серверу» за фіксовану ставку, отримуючи швидкий прибуток. Ціни в меню гравців залежать від попиту та пропозиції, тож за правильних умов можна заробити більше, відстежуючи зміни ринку."
        buttonText="Переглянути Discord"
        buttonLink="/discord"
        textPosition="left"
        hideImageOnMobile={false}
        mirrorImage={true}
        showAsPoints={false}
        showButton={false}
        showBackground={true}
      />
    </div>

  );
}
