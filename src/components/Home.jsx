import Detailed from "./Detailed";
import FeatureCard from "./FeatureCard";
import Join from "./Join";
import News from "./News";
import Team from "./Team";

export default function Home() {
  // Оновимо посилання, оскільки вони тепер будуть на верхньому рівні
  const serverInfoItems = [
    {
      title: "Вікі",
      description: "Дізнайтесь більше про особливості нашого сервера.",
      image: "/wiki.webp",
      link: "http://wiki.m4sub.click/",
    },
    {
      title: "Мапа",
      description: "Перегляньте інтерактивну мапу ігрового світу.",
      image: "/map.webp",
      link: "/subserver/map", // <-- Змінено з /subserver/map
    },
    {
      title: "Правила сервера",
      description: "Ознайомтесь з правилами, щоб грати було комфортно.",
      image: "/rules.webp",
      link: "/subserver/rules", // <-- Змінено з /subserver/rules
    },
  ];

  return (
    <div>
      {/* 1. Важливий банер з Subserver */}
      <div className="bg-orange-600/50 text-white p-6 md:p-12 mb-8 pixelcut text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Увага!</h2>
        <p className="text-base md:text-lg">
          Наразі на сервері відбувається міжсезоння з модами. <br className="hidden md:inline" />
          Слідкуйте за новинами на нашому Discord-каналі, щоб дізнатися про старт нового сезону.
        </p>
      </div>

      

      {/* 2. Посилання на мапу, правила, вікі з Subserver */}
      <Detailed items={serverInfoItems} />

      {/* 3. Детальний опис сервера з Subserver */}
      <FeatureCard 
        title="Справжній ванільний досвід" 
        image="/axo.png" 
        description="Наш сервер створений для тих, хто цінує класичний геймплей Minecraft. Тут немає складних плагінів чи надмірних модифікацій. Це місце, де ви можете насолоджуватися грою в її чистому, оригінальному вигляді, будуючи, досліджуючи та виживаючи разом з друзями."
        textPosition="left"
        mirrorImage={false}
        showButton={false}
      />

      <FeatureCard 
        title="Покращення Vanilla+" 
        image="/def.png"
        description="Хоча ми зберігаємо ванільну атмосферу, ми додали кілька незначних, але корисних функцій (QoL), щоб зробити гру комфортнішою. Це так званий Vanilla+ підхід: ніяких ламаючих геймплей змін, лише поліпшення якості життя гравців."
        textPosition="right"
        mirrorImage={false}
        showButton={false}
      />
      
      {/* 4. Блоки, які були на старій головній сторінці */}

    <Join />

      <News />
      <Team />
    </div>
  );
}