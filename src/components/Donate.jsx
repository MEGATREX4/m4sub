import { useState } from "react";

export default function Donate() {
  // --- ЛОГІКА ТИМЧАСОВО ЗАКОМЕНТОВАНА ДЛЯ ПЕРЕРОБКИ ---
  /*
  const [selected, setSelected] = useState(null);
  const [nickname, setNickname] = useState("");
  
  // Щомісячні витрати на сервер
  const MONTHLY_SERVER_COSTS = 860; // грн

  const options = [
    { label: "30 Монет", price: 15 },
    { label: "50 Монет", price: 25 },
    { label: "100 Монет", price: 50 },
    { label: "150 Монет", price: 75 },
    { label: "200 Монет", price: 100 },
    { label: "300 Монет", price: 150 },
    { label: "500 Монет", price: 250 },
    { label: "700 Монет", price: 350 },
    { label: "1000 Монет", price: 500 },
    { label: "1500 Монет", price: 750 },
    { label: "2000 Монет", price: 1000 },
    { label: "3000 Монет", price: 1500 },
  ];

  const generateShortId = () => {
    const part = () => Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${part()}-${part()}`;
  };

  const generateBankUrl = (option) => {
    const safeNick = nickname.trim() || "no_nick";
    const id = generateShortId();
    const comment = `donat: ${option.label}, nick: ${safeNick}, id: ${id}`;
    const encodedComment = encodeURIComponent(comment);
    return `https://send.monobank.ua/jar/85Ui7vsyCD?a=${option.price}&t=${encodedComment}`;
  };
  */
  // -----------------------------------------------------

  return (
    <section>
      {/* Important message about supporting Ukrainian army first */}
      <div className="max-w-2xl mx-auto bg-blue-900/40 p-6 text-white text-center mb-6 border-2 border-yellow-400">
        <h2 className="text-2xl font-bold mb-3 text-yellow-300 minecraftFont">НАЙВАЖЛИВІШЕ!</h2>
        <p className="text-yellow-100 mb-4 leading-relaxed">
          Перш ніж донатити на розваги, будь ласка, підтримайте українське військо! 
          Це набагато важливіше за будь-які ігри.
        </p>
        <p className="text-yellow-100 mb-6">
          Оберіть один з перевірених благодійних фондів:
        </p>

        {/* Charity funds grid */}
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          <a 
            href="https://savelife.in.ua" 
            target="_blank" 
            rel="noopener noreferrer"
            className="minecraftFont bg-[#130217] border-4 border-double border-yellow-400 p-4 flex flex-col items-center justify-center transition hover:bg-[#1a0420] hover:border-yellow-300 flex-1 min-w-[140px] max-w-[180px]"
            style={{
              boxShadow: '2px 2px 0 #b59d3b, 4px 4px 0 #000',
            }}
          >
            <div className="bg-white rounded-lg p-2 mb-2">
              <img 
                src="https://savelife.in.ua/wp-content/themes/savelife/assets/images/new-logo-black-ua.svg" 
                alt="Save Life" 
                title="Save Life" 
                className="h-12 w-12 object-contain"
              />
            </div>
            <p className="text-yellow-200 text-center font-bold text-sm">Повернись живим</p>
          </a>

          <a 
            href="https://prytulafoundation.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="minecraftFont bg-[#130217] border-4 border-double border-yellow-400 p-4 flex flex-col items-center justify-center transition hover:bg-[#1a0420] hover:border-yellow-300 flex-1 min-w-[140px] max-w-[180px]"
            style={{
              boxShadow: '2px 2px 0 #b59d3b, 4px 4px 0 #000',
            }}
          >
            <div className="bg-white rounded-lg p-2 mb-2">
              <img 
                src="https://ds7zgdsyui79p.cloudfront.net/logonew_f2314490c6.svg" 
                alt="Сергій Притула фонд" 
                title="Сергій Притула фонд" 
                className="h-12 w-12 object-contain"
              />
            </div>
            <p className="text-yellow-200 text-center font-bold text-sm">Фонд Сергія Притули</p>
          </a>

          <a 
            href="https://www.sternenkofund.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="minecraftFont bg-[#130217] border-4 border-double border-yellow-400 p-4 flex flex-col items-center justify-center transition hover:bg-[#1a0420] hover:border-yellow-300 flex-1 min-w-[140px] max-w-[180px]"
            style={{
              boxShadow: '2px 2px 0 #b59d3b, 4px 4px 0 #000',
            }}
          >
            <div className="bg-gray-800 rounded-lg p-2 mb-2">
              <img 
                src="https://cdn.prod.website-files.com/6797b46110ec22b94bac2ef8/6797f9d57664bf21b2f2b300_SSF%20Drone%20Icon%20White.svg" 
                alt="Drone Army" 
                title="Drone Army" 
                className="h-12 w-12 object-contain"
              />
            </div>
            <p className="text-yellow-200 text-center font-bold text-sm">Спільнота Стерненка</p>
          </a>

          <a 
            href="https://united24.gov.ua" 
            target="_blank" 
            rel="noopener noreferrer"
            className="minecraftFont bg-[#130217] border-4 border-double border-yellow-400 p-4 flex flex-col items-center justify-center transition hover:bg-[#1a0420] hover:border-yellow-300 flex-1 min-w-[140px] max-w-[180px]"
            style={{
              boxShadow: '2px 2px 0 #b59d3b, 4px 4px 0 #000',
            }}
          >
            <div className="bg-blue-600 rounded-lg p-2 mb-2">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/4/42/UNITED24_logo.svg" 
                alt="United24" 
                title="United24" 
                className="h-12 w-12 object-contain"
                style={{filter: 'invert(100%)'}}
              />
            </div>
            <p className="text-yellow-200 text-center font-bold text-sm">United24</p>
          </a>
        </div>
      </div>

      {/* TEMPORARY MESSAGE: REWORK IN PROGRESS */}
      {/* Ми використовуємо вкладені діви для імітації рамки з clip-path */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="bg-gray-500 p-1 cornerCutSmall">
            <div className="bg-[#1a1a2e] p-10 text-white text-center cornerCutSmall h-full w-full">
                <div className="text-5xl mb-4 text-yellow-400">
                    <i className="hn hn-bullhorn"></i>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-yellow-300 minecraftFont">ТЕХНІЧНІ РОБОТИ</h2>
                <p className="text-xl text-gray-200 mb-4 minecraftFont">
                Система донатів на сервер тимчасово вимкнена.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                Ми повністю перероблюємо систему оплати, щоб зробити її зручнішою та кращою для вас.
                <br />
                Незабаром все запрацює!
                </p>
                <div className="flex items-center justify-center gap-2 text-gray-300 minecraftFont">
                    <span>Дякуємо за терпіння</span>
                    <i className="hn hn-heart text-red-500 animate-pulse"></i>
                </div>
            </div>
        </div>
      </div>

      {/* 
      --- СТАРИЙ КОД ДОНАТУ (ПРИХОВАНИЙ) ---
      <div className="max-w-2xl mx-auto bg-green-900/30 p-8 text-white text-center cornerCutSmall">
        <h2 className="text-3xl font-bold mb-2 text-gray-200 minecraftFont">Підтримати сервер</h2>
        <p className="text-gray-300 mb-6 ">
          Підтримай сервер та отримай ігрову валюту в подарунок!
        </p>
        <p className="text-gray-300 mb-6">
          Донати на сервер допомагають нам утримувати його в робочому стані та покращувати
          його для вас. Кожен донат іде на оплату серверів, доменів та інших витрат.
        </p>
        <p className="text-gray-300 mb-6">
          Введіть свій нік на сервері, щоб ми могли зарахувати вашу оплату.
        </p>

        <div className="mb-6">
          <label
            htmlFor="nickname"
            className="block text-left mb-1  text-gray-300"
          >
            Нік на сервері
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Наприклад: MEGATREX4"
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 pixelated focus:outline-none focus:ring-2 focus:ring-[#c5629a]"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="donate-option" className="block text-left mb-1 text-gray-300">
            Виберіть кількість монет
          </label>
          <select
            id="donate-option"
            value={selected !== null ? selected : ''}
            onChange={e => setSelected(e.target.value === '' ? null : Number(e.target.value))}
            className="minecraftFont pixelated w-56 mx-auto block px-4 py-3 border-4 border-double bg-[#130217] text-white border-gray-700 focus:border-[#c5629a] focus:outline-none transition text-left"
            style={{
              fontSize: '13px',
              lineHeight: 1.4,
              backgroundColor: '#130217',
              minWidth: '100%',
              maxWidth: '100%',
              boxShadow: '1px 1px 0 #b59d3b, 2px 2px 0 #000',
            }}
          >
            <option value="" disabled>Оберіть пакет монет...</option>
            {options.map((option, idx) => (
              <option key={idx} value={idx} className="bg-[#130217] text-white minecraftFont">
                {option.label} — за {option.price} грн
              </option>
            ))}
          </select>
        </div>

        {selected !== null && (
          <a
            href={generateBankUrl(options[selected])}
            target="_blank"
            rel="noopener noreferrer"
            className="minecraftFont w-full inline-block bg-[#c5629a] hover:bg-[#b25587] text-white px-8 py-3 pixelated transition"
          >
            Донатити {options[selected].price} грн
          </a>
        )}
        <p className="text-gray-300 mb-6 bg-[#130217] cornerCutSmall p-5 minecraftFont border-double border-white mt-6">
          Щомісячно на утримання сервера витрачається {MONTHLY_SERVER_COSTS} грн. 
          Ваша підтримка дуже важлива для нас!
        </p>
      </div>
      */}
    </section>
  );
}