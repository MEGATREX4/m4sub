import { useState, useEffect } from "react";
import Detailed from "./Detailed";
import News from "./News";
import Team from "./Team";
import { BorderBox } from "./donate/components/BorderBox";
import Join from "./Join";

export default function Home() {
  const serverInfoItems = [
    {
      title: "Вікі",
      description: "Дізнайтесь більше про особливості нашого сервера.",
      image: "/wiki.webp",
      link: "https://wiki.m4sub.click/",
    },
    {
      title: "Мапа",
      description: "Перегляньте інтерактивну мапу ігрового світу.",
      image: "/map.webp",
      link: "/subserver/map",
    },
    {
      title: "Правила сервера",
      description: "Ознайомтесь з правилами, щоб грати було комфортно.",
      image: "/rules.webp",
      link: "/subserver/rules",
    },
  ];

  return (
    // Зменшено загальний вертикальний відступ між блоками
    <div className="space-y-10 sm:space-y-14 pb-16 overflow-hidden">

      {/* 1. Швидкі посилання */}
      <Detailed items={serverInfoItems} />

      <Join></Join>

      {/* 2. Секція: Всесвіт M4SUB */}
      <section className="px-2">
        <div className="flex flex-col mb-6">
            <h2 className="text-3xl sm:text-5xl font-bold text-white minecraftFont leading-none uppercase tracking-tighter italic">
                Всесвіт <span className="text-[#c5629a]">M4SUB</span>
            </h2>
            <div className="h-1 w-20 bg-[#c5629a] mt-2"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-[#c5629a]/20 border-2 border-[#c5629a]/20">
          {[
            { 
              title: "Ваніль 2.0", 
              desc: "Вхід з будь-якого клієнта 1.21+. Жодних модів чи лаунчерів, тільки чиста гра.",
              icon: "hn-bullhorn-solid",
              color: "text-[#c5629a]"
            },
            { 
              title: "High-Tech", 
              desc: "Система Polymer забезпечує ідеальний TPS та стабільність при високому онлайні.",
              icon: "hn-bolt",
              color: "text-yellow-400"
            },
            { 
              title: "Еволюція", 
              desc: "Ми не просто виживаємо, ми створюємо нові виміри, босів та унікальні механіки.",
              icon: "hn-sparkles",
              color: "text-blue-400"
            }
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0a12] p-6 sm:p-8 hover:bg-[#130217] transition-colors">
              <i className={`hn ${item.icon} ${item.color} text-3xl mb-4 block`}></i>
              <h3 className="text-white minecraftFont text-lg mb-2 uppercase">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Галерея Оновлення */}
      <section className="px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          
          {/* Велика плитка: Прірва */}
          <div className="relative overflow-hidden border-2 border-white/5 bg-[#130217] md:row-span-2">
            <img 
              src="/turbo_update.png" 
              className="w-full h-full object-cover opacity-50" 
              style={{ minHeight: '350px', imageRendering: 'pixelated' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
              <span className="text-blue-400 minecraftFont text-[10px] uppercase mb-1">Новий вимір</span>
              <h3 className="text-2xl sm:text-4xl font-bold text-white minecraftFont mb-2 uppercase tracking-tighter">Прірва мороку</h3>
              <p className="text-gray-300 text-xs sm:text-sm max-w-md">Дослідіть 6 унікальних біомів, де темрява — це не просто відсутність світла, а справжня небезпека.</p>
            </div>
          </div>

          {/* Плитка: Ретро-ігри */}
          <div className="relative border-2 border-white/5 bg-[#130217] p-6 sm:p-8 flex items-center justify-between overflow-hidden">
            <div className="relative z-10">
              <span className="text-[#c5629a] minecraftFont text-[10px] uppercase mb-1 block">Колаборація</span>
              <h3 className="text-xl font-bold text-white minecraftFont mb-1 uppercase">Siga 69 & ТУРБОЦИЦЬКАР</h3>
              <p className="text-gray-500 text-[10px] max-w-xs uppercase tracking-wider leading-tight">
                Квести від Турбоцицькаря та консоль прямо в Minecraft. 
                <span className="text-[#c5629a] block mt-1 opacity-80 italic"> (це декоративний блок, на ньому не можна грати) </span>
              </p>
            </div>
            <i className="hn hn-gamepad text-white/5 text-6xl absolute right-[-5px] bottom-[-5px]"></i>
          </div>

          {/* Плитка: Аксесуари */}
          <div className="relative border-2 border-white/5 bg-[#130217] p-6 sm:p-8 flex items-center justify-between overflow-hidden">
            <div className="relative z-10">
              <span className="text-yellow-400 minecraftFont text-[10px] uppercase mb-1 block">Арсенал</span>
              <h3 className="text-xl font-bold text-white minecraftFont mb-1 uppercase tracking-tighter text-yellow-50/90">Унікальні предмети</h3>
              <p className="text-gray-500 text-[10px] max-w-xs uppercase tracking-wider leading-tight">Магніти, амулети та 50+ нових зачарувань для вашого виживання.</p>
            </div>
            <i className="hn hn-package text-white/5 text-6xl absolute right-[-5px] bottom-[-5px]"></i>
          </div>

        </div>
      </section>

      {/* 4. CTA Банер */}
      <div className="px-2">
        <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#130217]">
            <div className="p-8 sm:p-12 text-center relative overflow-hidden group">
                <h3 className="text-3xl sm:text-5xl font-bold text-[#c5629a] minecraftFont mb-4 uppercase tracking-tighter drop-shadow-lg">
                    Оновлення вже тут!
                </h3>
                <p className="text-xs sm:text-base text-gray-400 mb-8 max-w-xl mx-auto uppercase tracking-widest leading-loose">
                    Дізнайтеся, як ми обманули гру заради оптимізації, додали ретро-ігри та створили новий світ.
                </p>
                <a 
                    href="/news/turbo_update"
                    className="inline-flex items-center gap-4 px-8 py-4 bg-[#c5629a] hover:bg-[#d47bb0] text-white font-bold minecraftFont text-lg sm:text-xl uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                    <i className="hn hn-file-text"></i>
                    Читати статтю
                </a>
            </div>
        </BorderBox>
      </div>

      {/* 5. News + Team (Зменшено інтервали) */}
      <div className="space-y-12 px-2">
        <div className="space-y-6">
            <h3 className="minecraftFont text-white text-3xl uppercase tracking-tighter flex items-center gap-4">
                <span className="w-2 h-7 bg-[#c5629a]"></span> Новини
            </h3>
            <News compact />
        </div>
        
        <div className="space-y-1">
            <Team compact />
        </div>
      </div>
    </div>
  );
}