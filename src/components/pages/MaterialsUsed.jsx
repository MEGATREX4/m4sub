import React, { useState, useMemo, useEffect } from "react";
import { CategoryTab } from "../donate/components/CategoryTab";
import Page from "../Page";
import CascadeLoader from "../CascadeLoader";
import "../css/news-article.css";

const mcTexture = (name) => `https://mc.nerothe.com/img/1.21.11/minecraft_${name}.png`;

const CATEGORIES = [
  { id: "all", label: "Все", icon: "hn-list" },
  { id: "game", label: "Сервер", icon: "hn-server" },
  { id: "website", label: "Вебсайт", icon: "hn-code" },
  { id: "infra", label: "Інфра", icon: "hn-database" },
  { id: "assets", label: "Асети", icon: "hn-link" },
];

const materials = [
  {
    title: "Ігровий сервер",
    category: "game",
    icon: "hn-server",
    mcIcon: "grass_block",
    bgColor: "bg-green-900/20",
    borderColor: "border-green-900/40",
    textColor: "text-green-400",
    items: [
      "Minecraft Java Edition 1.21+ (Mojang)",
      "Mojang Language Files",
      "Fabric Mod Loader",
    ],
  },
  {
    title: "Джерела натхнення",
    category: "game",
    icon: "hn-book-open",
    mcIcon: "written_book",
    bgColor: "bg-emerald-900/20",
    borderColor: "border-emerald-900/40",
    textColor: "text-emerald-400",
    items: [
      "Deeper and Darker",
      "Farmer's Delight",
    ],
  },
  {
    title: "Серверний мод",
    category: "game",
    icon: "hn-cube",
    mcIcon: "crafting_table",
    bgColor: "bg-lime-900/20",
    borderColor: "border-lime-900/40",
    textColor: "text-lime-400",
    items: [
      "Polymer (eu.pb4)",
      "Placeholder API (eu.pb4)",
      "FactoryTools (eu.pb4)",
      "Cardinal Components API",
      "LuckPerms API",
      "MixinExtras (Fabric)",
      "HikariCP + H2 + MySQL Connector/J",
      "JDA 6.1.1",
      "Jsoup 1.15.4",
      "SnakeYAML 2.2",
    ],
  },
  {
    title: "Вебсайт — Frontend Framework",
    category: "website",
    icon: "hn-code",
    mcIcon: "crafting_table",
    bgColor: "bg-blue-900/20",
    borderColor: "border-blue-900/40",
    textColor: "text-blue-400",
    items: ["React ^19.1.0", "React Router DOM ^7.5.3", "React Scripts 5.0.1"],
  },
  {
    title: "Вебсайт — UI та Стилізація",
    category: "website",
    icon: "hn-palette",
    mcIcon: "diamond",
    bgColor: "bg-yellow-900/20",
    borderColor: "border-yellow-900/40",
    textColor: "text-yellow-400",
    items: ["Tailwind CSS", "@headlessui/react ^2.2.2", "@heroicons/react ^2.2.0", "Framer Motion ^12.23.26"],
  },
  {
    title: "Вебсайт — Контент та Markdown",
    category: "website",
    icon: "hn-file-text",
    mcIcon: "oak_log",
    bgColor: "bg-orange-900/20",
    borderColor: "border-orange-900/40",
    textColor: "text-orange-400",
    items: ["React Markdown ^10.1.0", "Remark (GFM, Slug, TOC) ^15", "Rehype Raw ^7.0.0", "Gray Matter ^4.0.3", "Slugify ^1.6.6"],
  },
  {
    title: "Вебсайт — Іконки та Графіка",
    category: "website",
    icon: "hn-image",
    mcIcon: "painting",
    bgColor: "bg-pink-900/20",
    borderColor: "border-pink-900/40",
    textColor: "text-pink-400",
    items: ["@hackernoon/pixel-icon-library ^1.1.0", "@klashdevelopment/mcicons ^1.0.1", "Yet Another React Lightbox ^3.25.0", "React Pixelate ^0.0.1"],
  },
  {
    title: "Вебсайт — Утиліти та Бібліотеки",
    category: "website",
    icon: "hn-package",
    mcIcon: "chest",
    bgColor: "bg-red-900/20",
    borderColor: "border-red-900/40",
    textColor: "text-red-400",
    items: ["Date-fns ^4.1.0", "Recharts ^3.6.0", "@babel/parser + @babel/traverse ^7.28", "Buffer ^6.0.3", "Mdast Util to String + Unist Util Visit", "Xmlbuilder2 ^3.1.1"],
  },
  {
    title: "Вебсайт — Build та Розвиток",
    category: "website",
    icon: "hn-wrench",
    mcIcon: "iron_pickaxe",
    bgColor: "bg-cyan-900/20",
    borderColor: "border-cyan-900/40",
    textColor: "text-cyan-400",
    items: ["@craco/craco ^7.1.0", "Testing Library (React, Jest-DOM, User Event, DOM)", "Web Vitals ^2.1.4"],
  },
  {
    title: "Дані та інфраструктура",
    category: "infra",
    icon: "hn-database",
    mcIcon: "iron_ore",
    bgColor: "bg-purple-900/20",
    borderColor: "border-purple-900/40",
    textColor: "text-purple-400",
    items: ["MongoDB", "Node.js", "Netlify Functions", "Netlify Cloud"],
  },
  {
    title: "Асети та Ресурси",
    category: "assets",
    icon: "hn-link",
    mcIcon: "book",
    bgColor: "bg-indigo-900/20",
    borderColor: "border-indigo-900/40",
    textColor: "text-indigo-400",
    items: ["Minecraft Текстури від mc.nerothe.com", "Hackernoon Pixel Icon Library", "Minecraft Icons від @klashdevelopment"],
  },
];

function MaterialSection({ section, filteredItems }) {
  return (
    <section>
      <div className={`border-l-4 ${section.borderColor} pl-4 sm:pl-6`}>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={mcTexture(section.mcIcon)}
            alt=""
            className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0"
            style={{ imageRendering: "pixelated" }}
          />
          <h2 className={`text-lg sm:text-xl font-bold minecraftFont ${section.textColor}`}>
            {section.title}
          </h2>
          <span className="text-xs text-gray-500 ml-auto flex-shrink-0">
            {filteredItems.length}
          </span>
        </div>

        <div className={`rounded-sm p-4 ${section.bgColor} border ${section.borderColor}`}>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {filteredItems.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <i className={`hn ${section.icon} ${section.textColor} mt-0.5 flex-shrink-0 text-sm`}></i>
                <span className="text-gray-200 text-sm leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function MaterialsUsed() {
  const [ready, setReady] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setReady(true);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = { all: materials.length };
    materials.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  const visibleSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return materials
      .filter((section) => selectedCategory === "all" || section.category === selectedCategory)
      .map((section) => {
        const filteredItems = query
          ? section.items.filter((item) => item.toLowerCase().includes(query))
          : section.items;
        return { section, filteredItems };
      })
      .filter(({ filteredItems }) => filteredItems.length > 0);
  }, [selectedCategory, searchQuery]);

  const totalItems = useMemo(
    () => visibleSections.reduce((sum, { filteredItems }) => sum + filteredItems.length, 0),
    [visibleSections]
  );

  if (!ready) {
    return (
      <Page
        title="M4SUB — Матеріали та технології"
        description="Список технологій і матеріалів, що використовуються на сервері M4SUB"
      >
        <CascadeLoader label="Завантаження матеріалів..." className="min-h-[50vh]" />
      </Page>
    );
  }

  return (
    <Page
      title="M4SUB — Матеріали та технології"
      description="Список технологій і матеріалів, що використовуються на сервері M4SUB"
    >
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-[#c5629a] p-[2px]">
          <div className="bg-gray-700 p-[2px]">
            <div className="bg-[#1a1a2e]">
              {/* Header */}
              <div className="bg-[#130217] p-6 sm:p-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#c5629a] minecraftFont mb-3 flex items-center justify-center gap-3">
                  <i className="hn hn-cube"></i>
                  Матеріали та технології
                </h1>
                <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
                  Технології, бібліотеки та ресурси, що використовуються на сервері M4SUB та цьому вебсайті.
                </p>
              </div>

              <div className="bg-gray-700 h-[3px]" />

              {/* Search */}
              <div className="px-6 py-4 bg-[#12121f]">
                <div className="relative max-w-xl mx-auto">
                  <i className="hn hn-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Пошук технології або пакету..."
                    className="w-full bg-[#1a1a2e] border border-gray-700 text-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#c5629a] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      aria-label="Очистити пошук"
                    >
                      <i className="hn hn-times"></i>
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-700 h-[2px]" />

              {/* Category tabs */}
              <div className="flex flex-wrap">
                {CATEGORIES.map((cat, idx) => (
                  <React.Fragment key={cat.id}>
                    {idx > 0 && <div className="bg-gray-700 w-[2px] hidden sm:block" />}
                    <CategoryTab
                      label={cat.label}
                      icon={cat.icon}
                      isActive={selectedCategory === cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      count={categoryCounts[cat.id] || 0}
                    />
                  </React.Fragment>
                ))}
              </div>

              <div className="bg-gray-700 h-[3px]" />

              {/* Content area */}
              <div className="p-6 bg-[#12121f]">
                {visibleSections.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <i className="hn hn-search text-4xl mb-3 block opacity-50"></i>
                    <p className="minecraftFont">Нічого не знайдено</p>
                    <p className="text-sm mt-1">Спробуйте інший запит або категорію</p>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 text-sm mb-6 text-center">
                      {visibleSections.length} {visibleSections.length === 1 ? "розділ" : visibleSections.length < 5 ? "розділи" : "розділів"}
                      {" · "}
                      {totalItems} {totalItems === 1 ? "запис" : totalItems < 5 ? "записи" : "записів"}
                    </p>

                    <div className="space-y-8">
                      {visibleSections.map(({ section, filteredItems }) => (
                        <MaterialSection
                          key={section.title}
                          section={section}
                          filteredItems={filteredItems}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="bg-gray-700 h-[2px]" />

              {/* Attribution */}
              <div className="p-6 sm:p-8 bg-[#130217] news-content">
                <div className="flex items-center gap-2 mb-3">
                  <i className="hn hn-info text-gray-400"></i>
                  <h3 className="text-lg font-bold text-gray-300 minecraftFont">
                    Атрибуція та юридична інформація
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Всі вищевказані пакети, бібліотеки та ресурси використовуються відповідно до їхніх ліцензій.
                  Ми визнаємо та дякуємо всім розробникам цих проектів за їхній внесок.
                  Текстури Minecraft отримуються з{" "}
                  <a href="https://mc.nerothe.com" target="_blank" rel="noreferrer">
                    mc.nerothe.com
                  </a>{" "}
                  та використовуються для демонстрації.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
