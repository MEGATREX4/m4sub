import { useState, useEffect, useMemo, useCallback } from "react";

// Configuration
const API_BASE_URL = "/.netlify/functions";
const MONOBANK_JAR_URL = "https://send.monobank.ua/jar/85Ui7vsyCD";

// ==================== IMAGE CAROUSEL COMPONENT ====================

const ImageCarousel = ({ images, alt, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-advance on hover
  useEffect(() => {
    if (!isHovering || !images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [isHovering, images]);

  // Handle swipe/drag
  const handleMouseMove = (e) => {
    if (!images || images.length <= 1) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const index = Math.floor(percentage * images.length);
    setCurrentIndex(Math.min(Math.max(index, 0), images.length - 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-4xl opacity-50">🖼️</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setCurrentIndex(0);
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Main Image */}
      <img
        src={images[currentIndex]}
        alt={alt}
        className="w-full h-full object-cover transition-opacity duration-300"
        onError={(e) => {
          e.target.src = "/images/placeholder.png";
        }}
      />

      {/* Image Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2  transition-all ${
                idx === currentIndex
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      {/* Swipe Hint */}
      {images.length > 1 && isHovering && (
        <div className="absolute top-2 right-2 text-xs bg-black/60 px-2 py-1  text-white/80">
          ← Проведіть →
        </div>
      )}
    </div>
  );
};

// ==================== ITEM CARD COMPONENT ====================

const ItemCard = ({ item, type, isSelected, onSelect, disabled }) => {
  const isFeatured = item.featured;
  const hasSavings = item.savings && item.savings > 0;

  return (
    <div
      onClick={() => !disabled && onSelect(item, type)}
      className={`
        group relative overflow-hidden transition-all duration-300 cursor-pointer
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-xl"}
        ${isSelected 
          ? "ring-4 ring-[#c5629a] ring-offset-2 ring-offset-[#130217]" 
          : "hover:ring-2 hover:ring-[#c5629a]/50"}
        bg-gradient-to-b from-gray-800/90 to-gray-900/90 
        border-2 ${isFeatured ? "border-yellow-500" : "border-gray-700"}
        
      `}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-xs font-bold px-3 py-1  shadow-lg">
          ⭐ Популярне
        </div>
      )}

      {/* Savings Badge for Bundles */}
      {hasSavings && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1  shadow-lg">
          -{item.savings}₴
        </div>
      )}

      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageCarousel
          images={item.thumbnails}
          alt={item.name}
          className="w-full h-full"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
        
        {/* Type Badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1  text-sm">
          {type === "cape" && "🎭 Плащ"}
          {type === "icon" && "⭐ Значок"}
          {type === "bundle" && "📦 Набір"}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className={`text-lg font-bold mb-1 minecraftFont ${isFeatured ? "text-yellow-400" : "text-white"}`}>
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Bundle Contents Preview */}
        {type === "bundle" && item.items && (
          <div className="mb-3 flex flex-wrap gap-1">
            {item.items.slice(0, 4).map((bundleItem, idx) => (
              <span key={idx} className="text-xs bg-gray-700/50 px-2 py-0.5  text-gray-300">
                {bundleItem.split(":")[0] === "cape" ? "🎭" : "⭐"} {bundleItem.split(":")[1]}
              </span>
            ))}
            {item.items.length > 4 && (
              <span className="text-xs bg-gray-700/50 px-2 py-0.5  text-gray-400">
                +{item.items.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            {hasSavings && (
              <span className="text-gray-500 line-through text-sm">
                {item.originalPrice}₴
              </span>
            )}
            <span className={`text-xl font-bold minecraftFont ${
              item.price === 0 ? "text-green-400" : "text-yellow-400"
            }`}>
              {item.price === 0 ? "Безкоштовно" : `${item.price}₴`}
            </span>
          </div>

          {/* Selection Indicator */}
          <div className={`w-6 h-6  border-2 flex items-center justify-center transition-all ${
            isSelected 
              ? "bg-[#c5629a] border-[#c5629a] text-white" 
              : "border-gray-600 text-transparent group-hover:border-gray-400"
          }`}>
            ✓
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== CATEGORY TAB ====================

const CategoryTab = ({ label, icon, isActive, onClick, count }) => (
  <button
    onClick={onClick}
    className={`
      flex-1 py-4 px-6 font-bold minecraftFont transition-all relative
      ${isActive
        ? "bg-gradient-to-b from-[#c5629a] to-[#9e4d7d] text-white shadow-lg"
        : "bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-white"}
      border-b-4 ${isActive ? "border-[#7a3960]" : "border-transparent"}
    `}
  >
    <span className="text-xl mr-2">{icon}</span>
    <span className="hidden sm:inline">{label}</span>
    {count > 0 && (
      <span className={`ml-2 text-xs px-2 py-0.5  ${
        isActive ? "bg-white/20" : "bg-gray-700"
      }`}>
        {count}
      </span>
    )}
  </button>
);

// ==================== SELECTED ITEM PREVIEW ====================

const SelectedItemPreview = ({ item, type, onClear }) => {
  if (!item) return null;

  return (
    <div className="bg-gradient-to-r from-[#1a0f1f] to-[#0f1a1f] p-6 border-t-2 border-[#c5629a]/50">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Large Image Preview */}
        <div className="w-full lg:w-64 aspect-video  overflow-hidden border-2 border-gray-700">
          <ImageCarousel
            images={item.thumbnails}
            alt={item.name}
            className="w-full h-full"
          />
        </div>

        {/* Item Details */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
            <span className="text-2xl">
              {type === "cape" && "🎭"}
              {type === "icon" && "⭐"}
              {type === "bundle" && "📦"}
            </span>
            <h3 className="text-2xl font-bold text-white minecraftFont">{item.name}</h3>
            {item.featured && (
              <span className="text-yellow-400 text-sm">⭐ Популярне</span>
            )}
          </div>
          
          <p className="text-gray-400 mb-4">{item.description}</p>

          {/* Bundle Contents */}
          {type === "bundle" && item.items && (
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
              {item.items.map((bundleItem, idx) => (
                <span key={idx} className="text-sm bg-gray-800 px-3 py-1  border border-gray-700">
                  {bundleItem.split(":")[0] === "cape" ? "🎭" : "⭐"} {bundleItem.split(":")[1]}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Actions */}
        <div className="flex flex-col items-center gap-3">
          {item.savings && item.savings > 0 && (
            <div className="text-green-400 text-sm">
              Економія: {item.savings}₴
            </div>
          )}
          <div className="text-3xl font-bold text-yellow-400 minecraftFont">
            {item.price === 0 ? "Безкоштовно" : `${item.price}₴`}
          </div>
          <button
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ✕ Скасувати вибір
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== LOADING SPINNER ====================

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-12">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-[#c5629a]/30 " />
      <div className="absolute inset-0 border-4 border-transparent border-t-[#c5629a]  animate-spin" />
    </div>
    <span className="mt-4 text-gray-400">Завантаження магазину...</span>
  </div>
);

// ==================== ERROR MESSAGE ====================

const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center p-12">
    <div className="text-6xl mb-4">😔</div>
    <h3 className="text-xl font-bold text-red-400 mb-2">Щось пішло не так</h3>
    <p className="text-gray-400 mb-6">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-[#c5629a] hover:bg-[#b25587] text-white px-6 py-3  font-bold transition-colors"
      >
        🔄 Спробувати знову
      </button>
    )}
  </div>
);

// ==================== MAIN SHOP COMPONENT ====================

export default function Donate() {
  // State
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameValid, setNicknameValid] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("capes");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [purchasing, setPurchasing] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  // Fetch shop data
  const fetchShopData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/shop`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
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

  // Current items
  const currentItems = useMemo(() => {
    if (!shopData) return [];
    switch (selectedCategory) {
      case "capes": return shopData.capes || [];
      case "icons": return shopData.icons || [];
      case "bundles": return shopData.bundles || [];
      default: return [];
    }
  }, [shopData, selectedCategory]);

  // Validate nickname
  const validateNickname = (nick) => {
    if (!nick || nick.trim().length === 0) return "Введіть нікнейм";
    if (nick.length < 3 || nick.length > 16) return "Нікнейм має бути від 3 до 16 символів";
    if (!/^[a-zA-Z0-9_]+$/.test(nick)) return "Нікнейм може містити лише літери, цифри та _";
    return "";
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    const error = validateNickname(value);
    setNicknameError(error);
    setNicknameValid(!error && value.length >= 3);
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
      const response = await fetch(`${API_BASE_URL}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      const comment = `purchase:${purchaseId} nick:${nickname.trim()}`;
      const paymentUrl = `${MONOBANK_JAR_URL}?a=${selectedItem.price}&t=${encodeURIComponent(comment)}`;

      setPurchaseStatus({
        type: "pending",
        message: `Покупка створена! ID: ${purchaseId}`,
        purchaseId,
        paymentUrl,
      });

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
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* Ukrainian Support Banner */}
      <div className="bg-gradient-to-r from-blue-900/60 to-yellow-900/40 p-6  text-center mb-8 border border-yellow-500/30">
        <h2 className="text-2xl font-bold mb-3 text-yellow-300 minecraftFont">
          🇺🇦 ПІДТРИМАЙ УКРАЇНУ 🇺🇦
        </h2>
        <p className="text-yellow-100/80 mb-4">
          Перш ніж донатити на розваги, підтримайте українське військо!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: "Повернись живим", url: "https://savelife.in.ua", emoji: "💙" },
            { name: "Фонд Притули", url: "https://prytulafoundation.org/", emoji: "💛" },
            { name: "United24", url: "https://united24.gov.ua", emoji: "🇺🇦" },
          ].map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#130217]/80 border-2 border-yellow-500/50 hover:border-yellow-400 px-6 py-3  transition-all hover:scale-105"
            >
              <span className="text-2xl mr-2">{org.emoji}</span>
              <span className="text-yellow-200 font-bold">{org.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Shop Container */}
      <div className="bg-gradient-to-b from-[#1a1a2e] to-[#16162a]  border border-gray-800 overflow-hidden shadow-2xl">
        
        {/* Shop Header */}
        <div className="bg-gradient-to-r from-[#130217] via-[#1a0f1f] to-[#130217] p-8 text-center border-b border-gray-800">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c5629a] to-[#e87db5] minecraftFont mb-3">
            🛒 Магазин Косметики
          </h2>
          <p className="text-gray-400 text-lg">
            Підтримай сервер та отримай ексклюзивні плащі, значки та набори!
          </p>
        </div>

        {/* Loading / Error States */}
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} onRetry={fetchShopData} />}

        {/* Shop Content */}
        {!loading && !error && shopData && (
          <>
            {/* Nickname Input */}
            <div className="p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/30 border-b border-gray-800">
              <div className="max-w-md mx-auto">
                <label className="block text-gray-300 mb-2 font-bold">
                  📝 Ваш нікнейм на сервері
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={nickname}
                    onChange={handleNicknameChange}
                    placeholder="Наприклад: MEGATREX4"
                    maxLength={16}
                    className={`
                      w-full px-4 py-3 bg-[#130217] text-white  border-2 
                      focus:outline-none focus:ring-2 focus:ring-[#c5629a] transition-all
                      ${nicknameError ? "border-red-500" : nicknameValid ? "border-green-500" : "border-gray-700"}
                    `}
                  />
                  {nicknameValid && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-xl">
                      ✓
                    </span>
                  )}
                </div>
                {nicknameError && <p className="mt-2 text-red-400 text-sm">{nicknameError}</p>}
                <p className="mt-2 text-gray-500 text-sm">⚠️ Переконайтеся, що нікнейм введено правильно!</p>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex bg-gray-900/50">
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
                <div className="text-center text-gray-400 py-12">
                  <div className="text-6xl mb-4 opacity-50">🏪</div>
                  <p className="text-xl">Немає доступних товарів</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      type={selectedCategory.slice(0, -1)}
                      isSelected={selectedItem?.id === item.id}
                      onSelect={handleItemSelect}
                      disabled={purchasing}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Selected Item Preview */}
            <SelectedItemPreview
              item={selectedItem}
              type={selectedType}
              onClear={() => {
                setSelectedItem(null);
                setSelectedType(null);
              }}
            />

            {/* Purchase Status */}
            {purchaseStatus && (
              <div className={`mx-6 mb-4 p-4  text-center ${
                purchaseStatus.type === "error"
                  ? "bg-red-900/50 border border-red-500 text-red-200"
                  : purchaseStatus.type === "pending"
                  ? "bg-yellow-900/50 border border-yellow-500 text-yellow-200"
                  : "bg-green-900/50 border border-green-500 text-green-200"
              }`}>
                <p className="font-bold">{purchaseStatus.message}</p>
                {purchaseStatus.purchaseId && (
                  <p className="mt-2 text-sm opacity-80">
                    ID: <code className="bg-black/30 px-2 py-1 ">{purchaseStatus.purchaseId}</code>
                  </p>
                )}
                {purchaseStatus.paymentUrl && (
                  <a
                    href={purchaseStatus.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block bg-green-600 hover:bg-green-500 text-white px-6 py-2  font-bold transition-colors"
                  >
                    💳 Відкрити оплату
                  </a>
                )}
              </div>
            )}

            {/* Purchase Button */}
            <div className="p-6 bg-gradient-to-r from-[#130217] via-[#1a0f1f] to-[#130217]">
              <button
                onClick={handlePurchase}
                disabled={!canPurchase}
                className={`
                  w-full py-4 text-xl font-bold minecraftFont  transition-all
                  ${canPurchase
                    ? "bg-gradient-to-r from-[#c5629a] to-[#d47aad] hover:from-[#d47aad] hover:to-[#e08abb] text-white shadow-lg hover:shadow-xl hover:scale-[1.01]"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"}
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

      {/* How it Works */}
      <div className="mt-8 bg-gradient-to-b from-[#1a1a2e] to-[#16162a] border border-gray-800 p-8">
        <h3 className="text-2xl font-bold text-[#c5629a] minecraftFont mb-6 text-center">
          ❓ Як це працює?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "1", icon: "🛒", title: "Виберіть товар", desc: "Оберіть плащ, значок або набір зі списку" },
            { step: "2", icon: "💳", title: "Оплатіть", desc: "Перейдіть на Monobank та оплатіть покупку" },
            { step: "3", icon: "🎉", title: "Отримайте!", desc: "Товар з'явиться автоматично протягом хвилини" },
          ].map((item) => (
            <div key={item.step} className="text-center p-6 bg-gray-800/30">
              <div className="text-5xl mb-4">{item.icon}</div>
              <div className="text-sm text-[#c5629a] mb-2">Крок {item.step}</div>
              <h4 className="font-bold text-white text-lg mb-2">{item.title}</h4>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}