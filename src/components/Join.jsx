import { useEffect, useState } from "react";

export default function Join() {
  const [online, setOnline] = useState("Онлайн: 0/0");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`https://api.mcsrvstat.us/2/m4sub.click`)
      .then(res => res.json())
      .then(data => {
        if (data.online) {
          setOnline(`Онлайн: ${data.players.online}/${data.players.max}`);
        } else {
          setOnline("Сервер офлайн");
        }
      });
  }, []);

  const copyIP = () => {
    navigator.clipboard.writeText("m4sub.click").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 bg-green-900/20 px-10 md:px-4 py-4 rounded-lg shadow-md max-w-full text-center md:text-left">
      <img src="/search.png" alt="Server" className="block md:hidden w-64 h-64 md:w-80 md:h-80" />
      <div className="w-full md:w-1/2 text-gray-200 text-lg text-center">
        <h2 className="text-2xl font-bold text-gray-200">Вступай зараз!</h2>
        <div className="mt-4 flex flex-col items-center gap-4 justify-center text-center">
          <p style={{ lineHeight: '0.6rem' }}>Майнкрафт без модів</p>
          <p style={{ lineHeight: '0.6rem' }}>Ліцензія 1.21.4</p>
          <p style={{ lineHeight: '0.6rem' }}>Безкоштовний вступ</p>
        </div>
        <div className="mt-4 flex flex-col items-center gap-4 justify-center text-center">
          <button onClick={copyIP} className="flex items-center gap-2 bg-[#c5629a] hover:bg-[#f390d0] px-4 py-2 cornerCutSmall font-bold">
            <img src={copied ? "/icons/copied.png" : "/icons/copy.png"} alt="Copy Icon" className="w-5 h-5" />
            <span>{copied ? "Скопійовано!" : "m4sub.click"}</span>
          </button>
          <p>{online}</p>
        </div>
      </div>
      <img src="/search.png" alt="Server" className="hidden md:block w-64 h-64 md:w-70 md:h-70" />
    </section>
  );
}
