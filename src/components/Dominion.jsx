import Detailed from "./Detailed";
import Features from "./Features";
import FeatureCard from "./FeatureCard";

const dominionFeatures = [
  "Власна система походжень (рас)",
  "Фракції: Темні та Світлі сили",
  "Система гільдій з казною та гербами",
  "Динамічні печери з регенерацією",
  "Будівництво міст та провінцій",
  "Взаємодія з NPC-персонажами"
];

export default function Dominion() {
  const dominionItems = [
    {
      title: "Правила Dominion",
      description: "Ознайомтесь з правилами, щоб вижити.",
      image: "/rules.webp",
      link: "/dominion/rules",
    },
    {
      title: "Донат",
      description: "Підтримайте розвиток світу Dominion.",
      image: "/donate.webp",
      link: "/donate",
    },
  ];

  return (
    <div>
      
      <Detailed items={dominionItems} />

      <Features items={dominionFeatures} title="Ключові механіки Dominion" />

      {/* Блок про Раси та Фракції */}
      <FeatureCard 
        title="Раси та Фракції" 
        image="/dominion_races.webp" // Замініть на реальне зображення
        description="У світі Dominion існує власна система походжень, яка ділить гравців на дві великі фракції: Прихильники Ельдріса (Світлі сили) та Послідовники Варкона (Темні сили). Вибір раси — це вибір між їхніми шляхами. Серед рас: люди, дворфи, ельфи, орки, демони та дроу."
        textPosition="left"
        mirrorImage={false}
        showAsPoints={false}
        showButton={false}
        showBackground={true}
      />

      {/* Блок про Печери */}
      <FeatureCard 
        title="Динамічні Печери" 
        image="/dominion_caves.webp" // Замініть на реальне зображення
        description="Печери — це окремі світи, що автоматично перегенеровуються з часом, щоб уникнути їх виснаження. В деяких з них час перебування обмежений, що робить видобуток ресурсів справжнім викликом. Ресурси з'являються в різних місцях, не дозволяючи фармити одну і ту ж точку."
        textPosition="left"
        mirrorImage={true}
        showAsPoints={false}
        showButton={false}
        showBackground={true}
      />
      
      {/* Блок про Гільдії */}
      <FeatureCard 
        title="Гільдії" 
        image="/dominion_guilds.webp" // Замініть на реальне зображення
        description="На Dominion гравці можуть створювати власні гільдії. Кожна гільдія отримує спільну скарбницю, базу та унікальний герб, що відображається в чаті та інших місцях. Це механіка, яка допомагає гравцям об'єднуватись для досягнення спільних цілей."
        textPosition="right"
        mirrorImage={false}
        showAsPoints={false}
        showButton={false}
        showBackground={true}
      />

      {/* Блок про Міста */}
      <FeatureCard 
        title="Міста та Провінції" 
        image="/dominion_cities.webp" // Замініть на реальне зображення
        description="У містах ви знайдете магазини з NPC-персонажами, які продають необхідні ресурси. За межами міст знаходяться провінції, де можна будувати вільно, але ваші володіння не будуть захищені від інших гравців. Виживають лише найсильніші!"
        textPosition="left"
        mirrorImage={true}
        showAsPoints={false}
        showButton={false}
        showBackground={true}
      />

    </div>
  );
}