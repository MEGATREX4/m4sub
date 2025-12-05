import { useState, useEffect, useMemo, useCallback } from "react";

// Configuration - update these for your setup
const API_BASE_URL = "http://your-server-ip:8765";
const MONOBANK_JAR_URL = "https://send.monobank.ua/jar/85Ui7vsyCD";

// ==================== UTILITY FUNCTIONS ====================

const generatePurchaseId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const part = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${part()}-${part()}`;
};

const getRarityColor = (featured) => {
  return featured ? "text-yellow-400 border-yellow-500" : "text-gray-300 border-gray-500";
};

const getRarityBg = (featured) => {
  return featured ? "bg-yellow-900/20" : "bg-gray-800/50";
};

// ==================== COMPONENTS ====================

const ItemCard = ({ item, type, isSelected, onSelect, disabled }) => {
  const colorClass = getRarityColor(item.featured);
  const bgClass = getRarityBg(item.featured);

  return (
    <button
      onClick={() => onSelect(item, type)}
      disabled={disabled}
      className={`
        relative w-full p-4 text-left transition-all duration-200 border-2
        ${bgClass}
        ${isSelected ? `${colorClass} ring-2 ring-offset-2 ring-offset-[#130217]` : "border-gray-700 hover:border-gray-500"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-[1.02]"}
        pixelated
      `}
    >
      {item.featured && (
        <div className="absolute top-2 right-2 text-xs px-2 py-0.5 text-yellow-400 border border-yellow-500 pixelated">
          ⭐ Популярне
        </div>
      )}

      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-gray-900 border border-gray-600 flex items-center justify-center text-2xl">
          {type === "cape" && "🎭"}
          {type === "icon" && "⭐"}
          {type === "bundle" && "📦"}
        </div>

        <div className="flex-1">
          <h3 className={`font-bold minecraftFont ${colorClass.split(" ")[0]}`}>{item.name}</h3>
          <p className="text-sm text-gray-400">{item.description}</p>
        </div>
      </div>

      {type === "bundle" && item.items && (
        <div className="mt-2 text-xs text-gray-400">Включає: {item.items.length} предметів</div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <span className={`text-lg font-bold ${item.price === 0 ? "text-green-400" : "text-yellow-400"}`}>
          {item.price === 0 ? "Безкоштовно" : `${item.price}₴`}
        </span>
      </div>
    </button>
  );
};

const CategoryTab = ({ label, icon, isActive, onClick, count }) => (
  <button
    onClick={onClick}
    className={`
      flex-1 py-3 px-4 font-bold minecraftFont transition-all relative
      ${isActive
        ? "bg-[#c5629a] text-white border-b-4 border-[#8a3d6d]"
        : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border-b-4 border-transparent"}
    `}
  >
    <span className="mr-2">{icon}</span>
    {label}
    {count > 0 && (
      <span className="ml-2 text-xs bg-gray-700 px-2 py-0.5 rounded">{count}</span>
    )}
  </button>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin text-4xl">⏳</div>
    <span className="ml-3 text-gray-400">Завантаження...</span>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center p-8">
    <div className="text-4xl mb-4">❌</div>
    <p className="text-red-400 mb-4">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 pixelated">
        Спробувати знову
      </button>
    )}
  </div>
);

// ==================== MAIN COMPONENT ====================

export default function Donate() {
  // State
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("capes");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [purchasing, setPurchasing] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  // Fetch shop data from server
  const fetchShopData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/shop`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      setShopData(data);
    } catch (err) {
      console.error("Failed to fetch shop data:", err);
      setError("Не вдалося завантажити магазин. Сервер недоступний.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShopData();
  }, [fetchShopData]);

  // Get items for current category
  const currentItems = useMemo(() => {
    if (!shopData) return [];

    switch (selectedCategory) {
      case "capes":
        return shopData.capes || [];
      case "icons":
        return shopData.icons || [];
      case "bundles":
        return shopData.bundles || [];
      default:
        return [];
    }
  }, [shopData, selectedCategory]);

  // Validate nickname
  const validateNickname = (nick) => {
    if (!nick || nick.trim().length === 0) {
      return "Введіть нікнейм";
    }
    if (nick.length < 3 || nick.length > 16) {
      return "Нікнейм має бути від 3 до 16 символів";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(nick)) {
      return "Нікнейм може містити лише літери, цифри та _";
    }
    return "";
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    if (value) {
      setNicknameError(validateNickname(value));
    } else {
      setNicknameError("");
    }
  };

  const handleItemSelect = (item, type) => {
    if (selectedItem?.id === item.id && selectedType === type) {
      setSelectedItem(null);
      setSelectedType(null);
    } else {
      setSelectedItem(item);
      setSelectedType(type);
    }
    setPurchaseStatus(null);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
    setSelectedType(null);
    setPurchaseStatus(null);
  };

  // Handle purchase
  const handlePurchase = async () => {
    const nickError = validateNickname(nickname);
    if (nickError) {
      setNicknameError(nickError);
      return;
    }

    if (!selectedItem) {
      setPurchaseStatus({ type: "error", message: "Виберіть товар" });
      return;
    }

    setPurchasing(true);
    setPurchaseStatus(null);

    try {
      // Create pending purchase on server
      const response = await fetch(`${API_BASE_URL}/api/purchase/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": process.env.REACT_APP_NETLIFY_SECRET || "",
        },
        body: JSON.stringify({
          playerName: nickname.trim(),
          type: selectedType,
          itemId: selectedItem.id,
          priceUah: selectedItem.price,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setPurchaseStatus({ type: "error", message: result.message || "Помилка створення покупки" });
        return;
      }

      const purchaseId = result.purchaseId;

      // Generate Monobank payment URL with purchase ID in comment
      const comment = `purchase:${purchaseId} nick:${nickname.trim()}`;
      const encodedComment = encodeURIComponent(comment);
      const paymentUrl = `${MONOBANK_JAR_URL}?a=${selectedItem.price}&t=${encodedComment}`;

      setPurchaseStatus({
        type: "pending",
        message: `Покупка створена! ID: ${purchaseId}`,
        purchaseId,
        paymentUrl,
      });

      // Open payment in new tab
      window.open(paymentUrl, "_blank");

    } catch (err) {
      console.error("Purchase error:", err);
      setPurchaseStatus({ type: "error", message: "Помилка з'єднання з сервером" });
    } finally {
      setPurchasing(false);
    }
  };

  const canPurchase = selectedItem && nickname.trim() && !nicknameError && !purchasing;

  // ==================== RENDER ====================

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      {/* Ukrainian Army Support Section */}
      <div className="bg-blue-900/40 p-6 text-white text-center mb-8 border-2 border-yellow-400">
        <h2 className="text-2xl font-bold mb-3 text-yellow-300 minecraftFont">
          🇺🇦 НАЙВАЖЛИВІШЕ! 🇺🇦
        </h2>
        <p className="text-yellow-100 mb-4 leading-relaxed">
          Перш ніж донатити на розваги, будь ласка, підтримайте українське військо!
        </p>

        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          <a
            href="https://savelife.in.ua"
            target="_blank"
            rel="noopener noreferrer"
            className="minecraftFont bg-[#130217] border-4 border-double border-yellow-400 p-4 flex flex-col items-center transition hover:bg-[#1a0420] flex-1 min-w-[140px] max-w-[180px]"
          >
            <div className="text-3xl mb-2">💙</div>
            <p className="text-yellow-200 text-center font-bold text-sm">Повернись живим</p>
          </a>

          <a
            href="https://prytulafoundation.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="minecraftFont bg-[#130217] border-4 border-double border-yellow-400 p-4 flex flex-col items-center transition hover:bg-[#1a0420] flex-1 min-w-[140px] max-w-[180px]"
          >
            <div className="text-3xl mb-2">💛</div>
            <p className="text-yellow-200 text-center font-bold text-sm">Фонд Притули</p>
          </a>

          <a
            href="https://united24.gov.ua"
            target="_blank"
            rel="noopener noreferrer"
            className="minecraftFont bg-[#130217] border-4 border-double border-yellow-400 p-4 flex flex-col items-center transition hover:bg-[#1a0420] flex-1 min-w-[140px] max-w-[180px]"
          >
            <div className="text-3xl mb-2">🇺🇦</div>
            <p className="text-yellow-200 text-center font-bold text-sm">United24</p>
          </a>
        </div>
      </div>

      {/* Main Shop Section */}
      <div className="bg-[#1a1a2e] border-2 border-gray-700 pixelated">
        {/* Shop Header */}
        <div className="bg-[#130217] p-6 text-center border-b-2 border-gray-700">
          <h2 className="text-3xl font-bold text-[#c5629a] minecraftFont mb-2">
            🛒 Магазин Косметики
          </h2>
          <p className="text-gray-300">Підтримай сервер та отримай ексклюзивні плащі та значки!</p>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && <ErrorMessage message={error} onRetry={fetchShopData} />}

        {/* Shop Content */}
        {!loading && !error && shopData && (
          <>
            {/* Nickname Input */}
            <div className="p-6 bg-gray-900/50 border-b-2 border-gray-700">
              <label className="block text-gray-300 mb-2 minecraftFont">📝 Ваш нікнейм на сервері</label>
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="Наприклад: MEGATREX4"
                maxLength={16}
                className={`
                  w-full px-4 py-3 bg-[#130217] text-white border-2 pixelated
                  focus:outline-none focus:ring-2 focus:ring-[#c5629a]
                  ${nicknameError ? "border-red-500" : "border-gray-600"}
                `}
              />
              {nicknameError && <p className="mt-2 text-red-400 text-sm">{nicknameError}</p>}
              <p className="mt-2 text-gray-500 text-sm">⚠️ Переконайтеся, що нікнейм введено правильно!</p>
            </div>

            {/* Category Tabs */}
            <div className="flex border-b-2 border-gray-700">
              <CategoryTab
                label="Плащі"
                icon="🎭"
                isActive={selectedCategory === "capes"}
                onClick={() => handleCategoryChange("capes")}
                count={shopData.capes?.length || 0}
              />
              <CategoryTab
                label="Значки"
                icon="⭐"
                isActive={selectedCategory === "icons"}
                onClick={() => handleCategoryChange("icons")}
                count={shopData.icons?.length || 0}
              />
              <CategoryTab
                label="Набори"
                icon="📦"
                isActive={selectedCategory === "bundles"}
                onClick={() => handleCategoryChange("bundles")}
                count={shopData.bundles?.length || 0}
              />
            </div>

            {/* Items Grid */}
            <div className="p-6">
              {currentItems.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <p className="text-4xl mb-4">🚫</p>
                  <p>Немає доступних товарів у цій категорії</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      type={selectedCategory.slice(0, -1)} // Remove 's' from category
                      isSelected={selectedItem?.id === item.id}
                      onSelect={handleItemSelect}
                      disabled={purchasing}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Selected Item Summary */}
            {selectedItem && (
              <div className="p-6 bg-gray-900/50 border-t-2 border-gray-700">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      {selectedType === "cape" && "🎭"}
                      {selectedType === "icon" && "⭐"}
                      {selectedType === "bundle" && "📦"}
                    </div>
                    <div>
                      <p className="text-white font-bold minecraftFont">{selectedItem.name}</p>
                      <p className="text-gray-400 text-sm">{selectedItem.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-400 minecraftFont">{selectedItem.price}₴</p>
                  </div>
                </div>
              </div>
            )}

            {/* Purchase Status */}
            {purchaseStatus && (
              <div
                className={`mx-6 mb-4 p-4 pixelated text-center ${
                  purchaseStatus.type === "error"
                    ? "bg-red-900/50 border-2 border-red-500 text-red-200"
                    : purchaseStatus.type === "pending"
                    ? "bg-yellow-900/50 border-2 border-yellow-500 text-yellow-200"
                    : "bg-green-900/50 border-2 border-green-500 text-green-200"
                }`}
              >
                <p>{purchaseStatus.message}</p>
                {purchaseStatus.purchaseId && (
                  <p className="mt-2 text-xs text-gray-400">
                    ID покупки: <code className="bg-black/30 px-2 py-1">{purchaseStatus.purchaseId}</code>
                  </p>
                )}
                {purchaseStatus.paymentUrl && (
                  <a
                    href={purchaseStatus.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block bg-green-600 hover:bg-green-500 text-white px-4 py-2 pixelated"
                  >
                    💳 Відкрити оплату
                  </a>
                )}
              </div>
            )}

            {/* Purchase Button */}
            <div className="p-6 bg-[#130217]">
              <button
                onClick={handlePurchase}
                disabled={!canPurchase}
                className={`
                  w-full py-4 text-xl font-bold minecraftFont transition-all
                  ${canPurchase
                    ? "bg-[#c5629a] hover:bg-[#b25587] text-white cursor-pointer"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"}
                  pixelated
                `}
              >
                {purchasing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Обробка...
                  </span>
                ) : selectedItem ? (
                  `💳 Оплатити ${selectedItem.price}₴`
                ) : (
                  "👆 Виберіть товар"
                )}
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Оплата через Monobank • Товар буде додано автоматично після оплати
              </p>
            </div>
          </>
        )}
      </div>

      {/* How it works */}
      <div className="mt-8 bg-[#1a1a2e] border-2 border-gray-700 p-6 pixelated">
        <h3 className="text-xl font-bold text-[#c5629a] minecraftFont mb-4 text-center">❓ Як це працює?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-4xl mb-3">1️⃣</div>
            <h4 className="font-bold text-white mb-2">Виберіть товар</h4>
            <p className="text-gray-400 text-sm">Оберіть плащ, значок або набір</p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-3">2️⃣</div>
            <h4 className="font-bold text-white mb-2">Оплатіть</h4>
            <p className="text-gray-400 text-sm">Перейдіть на Monobank та оплатіть</p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-3">3️⃣</div>
            <h4 className="font-bold text-white mb-2">Отримайте!</h4>
            <p className="text-gray-400 text-sm">Товар з'явиться автоматично</p>
          </div>
        </div>
      </div>
    </section>
  );
}