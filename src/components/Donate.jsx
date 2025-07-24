import { useState, useEffect } from "react";
import { getCachedDonations } from "../utils/monobankApi";

export default function Donate() {
  const [selected, setSelected] = useState(null);
  const [nickname, setNickname] = useState("");
  
  // Щомісячні витрати на сервер
  const MONTHLY_SERVER_COSTS = 860; // грн
  
  // Стан для прогресу донатів
  const [donationData, setDonationData] = useState({
    currentAmount: 340, // грн - поточна сума зібраних донатів
    isLoading: false,
    lastUpdated: null,
    source: 'initial'
  });

  // Функція для отримання даних донатів з MonoBank віджета
  const fetchDonationData = async () => {
    setDonationData(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Використовуємо утилітарну функцію для отримання даних
      const data = await getCachedDonations();
      
      if (data && data.currentAmount) {
        setDonationData(prev => ({
          ...prev,
          currentAmount: data.currentAmount,
          isLoading: false,
          lastUpdated: new Date(),
          source: data.source || 'MonoBank API'
        }));
      } else {
        // Fallback до поточних даних якщо не вдалося отримати нові
        setDonationData(prev => ({
          ...prev,
          isLoading: false,
          lastUpdated: new Date(),
          source: 'Cached data'
        }));
      }
      
    } catch (error) {
      console.error('Помилка отримання даних донатів:', error);
      setDonationData(prev => ({ 
        ...prev, 
        isLoading: false,
        source: 'Error fallback'
      }));
    }
  };

  // Автоматичне оновлення даних кожні 2 хвилини
  useEffect(() => {
    fetchDonationData();
    const interval = setInterval(fetchDonationData, 2 * 60 * 1000); // 2 хвилини
    return () => clearInterval(interval);
  }, []);

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

  const progressPercentage = Math.min((donationData.currentAmount / MONTHLY_SERVER_COSTS) * 100, 100);

  // Форматування дати останнього оновлення
  const formatLastUpdated = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString('uk-UA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
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
        Щомісячно на утримання сервера витрачається {MONTHLY_SERVER_COSTS} грн. 
        Ваша підтримка дуже важлива для нас!
      </p>
      <p className="text-gray-300 mb-6">
        Введіть свій нік на сервері, щоб ми могли зарахувати вашу оплату.
      </p>

      {/* Прогрес збору коштів */}
      <div className="mb-8 bg-gray-800/50 p-6 cornerCutSmall border border-gray-600">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-200 minecraftFont">
            Прогрес збору на цей місяць
          </h3>
          <div className="flex items-center gap-2">
            {donationData.isLoading && (
              <div className="w-4 h-4 border-2 border-[#c5629a] border-t-transparent rounded-full animate-spin"></div>
            )}
            <button
              onClick={fetchDonationData}
              disabled={donationData.isLoading}
              className="text-xs text-gray-400 hover:text-[#c5629a] transition pixelated"
              title="Оновити дані"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-[#c5629a] minecraftFont">
            {donationData.currentAmount} грн / {MONTHLY_SERVER_COSTS} грн
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Залишилось зібрати: {MONTHLY_SERVER_COSTS - donationData.currentAmount} грн
          </div>
          {donationData.lastUpdated && (
            <div className="text-xs text-gray-500 mt-1">
              Оновлено: {formatLastUpdated(donationData.lastUpdated)}
              {donationData.source && (
                <span className="ml-2 text-gray-600">({donationData.source})</span>
              )}
            </div>
          )}
        </div>
        
        {/* Прогрес бар */}
        <div className="w-full bg-gray-700 h-6 pixelated border-2 border-gray-600 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#c5629a] to-[#b25587] transition-all duration-500 ease-out pixelated relative"
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Анімований блиск */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
        <div className="text-center mt-2 text-sm text-gray-300">
          {progressPercentage.toFixed(1)}% зібрано
        </div>
        
        {/* Додаткова інформація */}
        <div className="mt-4 pt-4 border-t border-gray-600">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Мета місяця: {MONTHLY_SERVER_COSTS} грн</span>
            <span>
              {progressPercentage >= 100 ? '🎉 Мету досягнуто!' : 
               progressPercentage >= 75 ? '🔥 Майже готово!' :
               progressPercentage >= 50 ? '💪 На половині шляху!' :
               '🚀 Кожна гривня важлива!'}
            </span>
          </div>
        </div>
      </div>

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

      {/* Альтернативний спосіб донату */}
      <div className="mt-8 pt-6 border-t border-gray-600">
        <h3 className="text-xl font-bold mb-4 text-gray-200 minecraftFont">
          Альтернативний спосіб донату
        </h3>
        <p className="text-gray-300 mb-4 text-sm">
          Ви також можете донатити напряму через MonoBank:
        </p>
        
        {/* Моно-банка */}
        <div className="bg-gray-700/50 p-4 cornerCutSmall border border-gray-600 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-bold">MonoBank Збір</div>
              <div className="text-gray-300 text-sm">Пряме посилання на банку</div>
            </div>
            <div className="text-[#c5629a] text-2xl">
              <i className="fab fa-cc-mastercard"></i>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <a
              href="https://send.monobank.ua/jar/85Ui7vsyCD"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#c5629a] hover:bg-[#b25587] text-white px-4 py-2 pixelated transition text-center"
            >
              Відкрити MonoBank
            </a>
            <button
              onClick={() => navigator.clipboard.writeText('https://send.monobank.ua/jar/85Ui7vsyCD')}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 pixelated transition"
              title="Скопіювати посилання"
            >
              <i className="fas fa-copy"></i>
            </button>
          </div>
        </div>
        
        <p className="text-gray-400 text-xs text-center">
          Не забудьте вказати свій нік у коментарі до платежу
        </p>
        
        {/* Інформація про віджет для OBS */}
        <div className="mt-6 bg-blue-900/20 border border-blue-500/30 p-4 cornerCutSmall">
          <div className="flex items-start gap-3">
            <i className="fas fa-video text-blue-400 mt-1"></i>
            <div className="flex-1">
              <h4 className="text-blue-300 font-semibold mb-1">Для стрімерів</h4>
              <p className="text-gray-300 text-sm mb-3">
                Використовуйте цей віджет у OBS для відображення прогресу донатів:
              </p>
              
              {/* Вибір типу віджета */}
              <div className="space-y-2 mb-3">
                <div className="text-xs text-gray-400 mb-1">Формат віджета:</div>
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-gray-800 p-2 rounded text-xs">
                    <div className="text-blue-300 mb-1">QR + Прогрес:</div>
                    <div className="text-gray-300 font-mono break-all">
                      https://send.monobank.ua/widget.html?jar=pb2BxUAnZmAq4Koj1K4eXHZoTGmKw9k&sendId=85Ui7vsyCD&type=qrp&colorScheme=black
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText('https://send.monobank.ua/widget.html?jar=pb2BxUAnZmAq4Koj1K4eXHZoTGmKw9k&sendId=85Ui7vsyCD&type=qrp&colorScheme=black')}
                      className="mt-1 text-xs bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 pixelated transition"
                    >
                      <i className="fas fa-copy mr-1"></i>Копіювати
                    </button>
                  </div>
                  
                  <div className="bg-gray-800 p-2 rounded text-xs">
                    <div className="text-blue-300 mb-1">Горизонтальний прогрес:</div>
                    <div className="text-gray-300 font-mono break-all">
                      https://send.monobank.ua/widget.html?jar=pb2BxUAnZmAq4Koj1K4eXHZoTGmKw9k&sendId=85Ui7vsyCD&type=lhp&textScheme=black&colorScheme=ukraine&shapeScheme=parallelogram&progressScheme=inset
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText('https://send.monobank.ua/widget.html?jar=pb2BxUAnZmAq4Koj1K4eXHZoTGmKw9k&sendId=85Ui7vsyCD&type=lhp&textScheme=black&colorScheme=ukraine&shapeScheme=parallelogram&progressScheme=inset')}
                      className="mt-1 text-xs bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 pixelated transition"
                    >
                      <i className="fas fa-copy mr-1"></i>Копіювати
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-400">
                💡 Дані оновлюються автоматично кожні 2 хвилини на сайті
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
