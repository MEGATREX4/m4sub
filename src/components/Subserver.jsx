import Detailed from "./Detailed";
import FeatureCard from "./FeatureCard";

export default function Subserver() {
  const subserverItems = [
    {
      title: "Вікі",
      description: "Дізнайтесь більше про особливості нашого сабсервера.",
      image: "/wiki.webp",
      link: "http://wiki.m4sub.click/",
    },
    {
      title: "Мапа",
      description: "Перегляньте мапу нашого сабсервера.",
      image: "/map.webp",
      link: "/subserver/map",
    },
    {
      title: "Правила сабсервера",
      description: "Дізнайтесь більше про правила нашого сабсервера.",
      image: "/rules.webp",
      link: "/subserver/rules",
    },
  ];

  return (
    <div>
      <div className="bg-orange-600/50 text-white p-6 md:p-12 mb-8 rounded-lg text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Увага!</h2>
        <p className="text-base md:text-lg">
          Наразі на сабсервері відбувається міжсезоння з модами. <br className="hidden md:inline" />
          Слідкуйте за новинами на нашому Discord-каналі, щоб дізнатися про старт нового сезону.
        </p>
      </div>

      <Detailed items={subserverItems} />

      <FeatureCard 
        title="Справжній ванільний досвід" 
        image="/vanilla_minecraft.webp" 
        description="Сабсервер створений для тих, хто цінує класичний геймплей Minecraft. Тут немає складних плагінів, приватизації або надмірних модифікацій. Це місце, де ви можете насолоджуватися грою в її чистому, оригінальному вигляді, будуючи, досліджуючи та виживаючи разом з друзями."
        textPosition="left"
        mirrorImage={false}
        showAsPoints={false}
        showButton={false}
        showBackground={true}
      />

      <FeatureCard 
        title="Покращення Vanilla+" 
        image="/vanilla_plus.webp"
        description="Хоча ми зберігаємо ванільну атмосферу, ми додали кілька незначних, але корисних функцій, щоб зробити гру комфортнішою. Це так званий Vanilla+ підхід: ніяких ламаючих геймплей змін, лише поліпшення якості життя. Наприклад, ми додали відключення феєрверків, щоб уникнути спаму в чаті."
        textPosition="right"
        mirrorImage={true}
        showAsPoints={false}
        showButton={false}
        showBackground={true}
      />

    </div>
  );
}