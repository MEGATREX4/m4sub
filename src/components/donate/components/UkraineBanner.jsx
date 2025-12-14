// src/components/donate/components/UkraineBanner.jsx
export const UkraineBanner = () => (
  <div className="bg-yellow-500 p-[2px] mb-8">
    <div className="bg-blue-600 p-[2px]">
      <div className="bg-blue-900/60 p-6 text-center">
        <h2 className="text-2xl font-bold mb-3 text-yellow-300 minecraftFont flex items-center justify-center gap-2">
          <i className="hn hn-flag-ukraine"></i>
          ПІДТРИМАЙ УКРАЇНУ
          <i className="hn hn-flag-ukraine"></i>
        </h2>
        <p className="text-yellow-100/80 mb-4">
          Перш ніж донатити на розваги, підтримайте українське військо!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: "Повернись живим", url: "https://savelife.in.ua", icon: "hn-heart" },
            { name: "Фонд Prituli", url: "https://prytulafoundation.org/", icon: "hn-hand-heart" },
            { name: "United24", url: "https://united24.gov.ua", icon: "hn-globe" },
          ].map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:translate-y-[-2px]"
            >
              <div className="bg-yellow-500/50 p-[2px]">
                <div className="bg-[#130217] px-4 py-2 flex items-center hover:bg-[#1a0420] gap-2">
                  <i className={`hn ${org.icon}`}></i>
                  <span className="text-yellow-200 font-bold minecraftFont">{org.name}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);