import { useState } from "react";
import { BorderBox } from "./donate/components/BorderBox";

const roadmapData = [
  {
    version: "Запуск 6 сезону",
    status: "done",
    size: "big",
    date: "20 грудня 2025",
    description:
      "Новий світ, виживання на межі та унікальний лор у стилі Mad Max, Fallout та Breaking Bad. Власна система плащів і значків без сторонніх модів.",
    items: [
      { text: "Виживання в пустці та палюче сонце", done: true },
      { text: "Нові моби: Торнадо та Перекотиполе", done: true },
      { text: "Колекція «Початок»: 9 значків та 5 плащів", done: true },
    ],
  },
  {
    version: "Невелике оновлення",
    status: "done",
    size: "small",
    date: "Випущено",
    description:
      "Перші технічні поліпшення, QoL-зміни та виправлення після старту сезону.",
    items: [
      { text: "Виправлення багів після запуску", done: true },
      { text: "Налаштування балансу", done: true },
      { text: "Поліпшення стабільності", done: true },
    ],
  },
  {
    version: "Турбо-оновлення",
    status: "done",
    size: "big",
    date: "Випущено",
    description:
      "Колаборація з Турбоцицькарем: новий вимір «Прірва мороку», квестові лінії, NPC, боси, нові руди, аксесуари та унікальна косметика.",
    items: [
      { text: "Бос/NPC Турбоцицькар та квестова лінія", done: true },
      { text: "Новий вимір «Прірва мороку» з 6 групами біомів", done: true },
      { text: "Нові руди: первіснит та свинець", done: true },
      { text: "Аксесуари, магніти, пляшки досвіду", done: true },
      { text: "Нові зачарування: Турбо-ехо, Турбо-лють, Турбо-спіраль", done: true },
      { text: "Повна переробка предметів і мобів на Polymer", done: true },
      { text: "Унікальна косметика та колекційні предмети", done: true },
    ],
  },
  {
    version: "Невелике оновлення",
    status: "planned",
    size: "small",
    date: "У планах",
    description:
      "Технічні доробки та невеликі доповнення перед великим «Промисловим бумом».",
    items: [
      { text: "QoL-покращення", done: false },
      { text: "Виправлення знайдених багів", done: false },
      { text: "Підготовка до промислових механік", done: false },
    ],
  },
  {
    version: "Промисловий бум",
    status: "planned",
    size: "big",
    date: "У планах",
    description:
      "Блоки та механізми для полегшення виживання без додавання нових печей. Швидка переробка ресурсів та камера для фотографій.",
    items: [
      { text: "Швидка переробка колоди на обтесані колоди", done: false },
      { text: "Швидка переробка цементу в бетон", done: false },
      { text: "Камера для друку фотографій", done: false },
    ],
  },
  {
    version: "Магічне розширення",
    status: "planned",
    size: "small",
    date: "У планах",
    description:
      "Розширення магічної складової: нові зачарування, нові методи зачарувань, копіювання книг та новий тип крафту — інфузія.",
    items: [
      { text: "Нові зачарування", done: false },
      { text: "Нові методи зачарувань", done: false },
      { text: "Копіювання книг", done: false },
      { text: "Новий тип крафту — інфузія", done: false },
    ],
  },
  {
    version: "Доісторичні часи",
    status: "planned",
    size: "big",
    date: "У планах",
    description:
      "Містичні острови, що літають у хмарах, з кастомними доісторичними мобами та унікальними біомами.",
    items: [
      { text: "Літаючі містичні острови", done: false },
      { text: "Кастомні доісторичні моби", done: false },
      { text: "Унікальні біоми в хмарах", done: false },
    ],
  },
];

const statusConfig = {
  done: {
    label: "Готово",
    bg: "bg-green-600",
    text: "text-white",
    border: "border-green-800",
    icon: "hn-check-circle-solid",
  },
  active: {
    label: "В роботі",
    bg: "bg-yellow-500",
    text: "text-black",
    border: "border-yellow-700",
    icon: "hn-bolt",
  },
  planned: {
    label: "У планах",
    bg: "bg-blue-600",
    text: "text-white",
    border: "border-blue-800",
    icon: "hn-clock",
  },
};

// Pixel-style connector block
function ConnectorBlock({ filled = true }) {
  return (
    <div
      className={`w-3 h-4 ${
        filled ? "bg-[#c5629a]" : "bg-[#c5629a]/30"
      }`}
    />
  );
}

export default function Roadmap() {
  const [filter, setFilter] = useState("all");

  const filteredData =
    filter === "all"
      ? roadmapData
      : roadmapData.filter((item) => item.status === filter);

  const filters = [
    { key: "all", label: "Усе", icon: "hn-list" },
    { key: "done", label: "Готово", icon: "hn-check-circle-solid" },
    { key: "active", label: "В роботі", icon: "hn-bolt" },
    { key: "planned", label: "У планах", icon: "hn-clock" },
  ];

  return (
    <section className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-[#c5629a] minecraftFont text-[10px] uppercase tracking-[0.3em]">
          Що чекає попереду
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-white minecraftFont uppercase tracking-tighter italic">
          Дорожня карта <span className="text-[#c5629a]">M4SUB</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Слідкуйте за розвитком сервера. Тут ми публікуємо вже випущені
          оновлення, те, над чим працюємо, і наші плани на майбутнє.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`
              flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold minecraftFont uppercase tracking-wider
              border-2 transition-all
              shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]
              active:translate-x-1 active:translate-y-1 active:shadow-none
              ${
                filter === f.key
                  ? "bg-[#c5629a] text-white border-[#c5629a]"
                  : "bg-[#1a1a2e] text-gray-400 border-[#c5629a]/40 hover:border-[#c5629a] hover:text-white"
              }
            `}
          >
            <i className={`hn ${f.icon}`}></i>
            {f.label}
          </button>
        ))}
      </div>

      {/* Roadmap Timeline */}
      <div className="relative">
        {/* Center line - blocky segments instead of gradient */}
        <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col items-center gap-1 py-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <ConnectorBlock key={i} filled={i % 3 !== 0} />
          ))}
        </div>

        <div className="space-y-6 md:space-y-0">
          {filteredData.map((phase, index) => {
            const status = statusConfig[phase.status];
            const isLeft = index % 2 === 0;

            return (
              <div
                key={phase.version}
                className={`relative md:grid md:grid-cols-2 md:gap-12 md:items-center ${
                  index > 0 ? (phase.size === "small" ? "md:mt-6" : "md:mt-10") : ""
                }`}
              >
                {/* Timeline block marker */}
                <div
                  className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#0a0a12] border-4 border-[#c5629a] items-center justify-center ${
                    phase.size === "small" ? "w-6 h-6" : "w-8 h-8"
                  }`}
                >
                  <div
                    className={`bg-[#c5629a] ${
                      phase.size === "small" ? "w-2 h-2" : "w-3 h-3"
                    }`}
                  ></div>
                </div>

                {/* Connector horizontal */}
                <div
                  className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${
                    phase.size === "small"
                      ? "h-1.5 bg-[#c5629a]/60"
                      : "h-2 bg-[#c5629a]"
                  } ${
                    isLeft
                      ? "left-1/2 w-[calc(50%-3rem-16px)]"
                      : "right-1/2 w-[calc(50%-3rem-16px)]"
                  }`}
                />

                {/* Content */}
                <div
                  className={`${
                    isLeft
                      ? "md:col-start-1 md:text-right md:pr-10"
                      : "md:col-start-2 md:pl-10"
                  }`}
                >
                  <BorderBox
                    borderColor={
                      phase.size === "small"
                        ? "bg-gray-600"
                        : "bg-[#c5629a]"
                    }
                    innerBg="bg-[#0a0a12]"
                  >
                    <div
                      className={`hover:bg-[#130217] transition-colors ${
                        phase.size === "small" ? "p-4" : "p-5 sm:p-6"
                      }`}
                    >
                      <div
                        className={`flex flex-wrap items-center gap-2 ${
                          phase.size === "small" ? "mb-2" : "mb-4"
                        } ${isLeft ? "md:justify-end" : ""}`}
                      >
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-b-4 text-[10px] font-bold minecraftFont uppercase tracking-wider ${status.bg} ${status.text} ${status.border}`}
                        >
                          <i className={`hn ${status.icon}`}></i>
                          {status.label}
                        </span>
                        <span className="text-gray-600 text-[10px] minecraftFont uppercase tracking-widest">
                          {phase.date}
                        </span>
                      </div>

                      <h3
                        className={`font-bold text-white minecraftFont uppercase tracking-tighter mb-2 ${
                          phase.size === "small"
                            ? "text-lg"
                            : "text-xl sm:text-2xl mb-3"
                        }`}
                      >
                        {phase.version}
                      </h3>
                      <p
                        className={`text-gray-400 leading-relaxed ${
                          phase.size === "small"
                            ? "text-xs mb-3"
                            : "text-sm mb-5"
                        }`}
                      >
                        {phase.description}
                      </p>

                      <ul
                        className={`space-y-2 ${
                          isLeft ? "md:text-right" : ""
                        }`}
                      >
                        {phase.items.map((item, i) => (
                          <li
                            key={i}
                            className={`flex items-center gap-2 text-gray-300 ${
                              phase.size === "small" ? "text-xs" : "text-sm"
                            } ${
                              isLeft ? "md:flex-row-reverse md:justify-end" : ""
                            }`}
                          >
                            <i
                              className={`hn text-xs ${
                                item.done
                                  ? "hn-check-square-solid text-green-400"
                                  : "hn-square text-gray-600"
                              }`}
                            ></i>
                            <span
                              className={item.done ? "" : "text-gray-500"}
                            >
                              {item.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </BorderBox>
                </div>

                {/* Empty column for alignment */}
                <div
                  className={`hidden md:block ${
                    isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
                  }`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-[10px] minecraftFont uppercase tracking-widest">
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-3 h-3 bg-green-600 border-2 border-green-800"></div>
          <span>Готово</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-3 h-3 bg-yellow-500 border-2 border-yellow-700"></div>
          <span>В роботі</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-3 h-3 bg-blue-600 border-2 border-blue-800"></div>
          <span>У планах</span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8 border-t-2 border-white/5">
        <p className="text-gray-500 text-sm mb-4">
          Маєте ідеї чи пропозиції? Долучайтеся до нашої спільноти!
        </p>
        <a
          href="https://discord.gg/fxqnU9by3M"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold minecraftFont uppercase border-2 border-[#4752c4] border-b-4 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <i className="hn hn-discord"></i>
          Запропонувати ідею
        </a>
      </div>
    </section>
  );
}
