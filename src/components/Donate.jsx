import { useState } from "react";

export default function Donate() {
  const [selected, setSelected] = useState(null);
  const [nickname, setNickname] = useState("");

  const options = [
    { label: "30 Монет", price: 15 },
    { label: "100 Монет", price: 50 },
    { label: "200 Монет", price: 100 },
    { label: "300 Монет", price: 150 },
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
        Підтримай сервер і отримай ігрову валюту у подарунок!
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

      <div className="grid gap-4 mb-8 md:grid-cols-2">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`minecraftFont tooltip text-left px-4 py-3 transition pixelated ${
              selected === idx ? "border-[#c5629a]" : "border-gray-700"
            } border-4 bg-[#130217] text-white hover:border-[#c5629a]`}
            style={{
              fontSize: "13px",
              lineHeight: 1.4,
              borderStyle: "double",
              backgroundColor: "#130217",
            }}
          >
            <span className="block font-bold">{option.label}</span>
            <span className=" text-gray-300">за {option.price} грн</span>
          </button>
        ))}
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
