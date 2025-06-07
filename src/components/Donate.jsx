import { useState } from "react";

export default function Donate() {
  const [selected, setSelected] = useState(null);
  const [nickname, setNickname] = useState("");

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

  return (
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
    </div>
  );
}
