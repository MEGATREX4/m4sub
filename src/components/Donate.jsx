import { useState, useEffect, useMemo, useCallback } from "react";

// Configuration
const API_BASE_URL = "/.netlify/functions";
const MONOBANK_JAR_URL = "https://send.monobank.ua/jar/85Ui7vsyCD";

// ==================== MINECRAFT BORDER COMPONENT ====================
// Double-div technique for pixelated borders

const PixelBorder = ({ children, className = "", borderColor = "bg-gray-600", innerBg = "bg-[#1a1a2e]", padding = "p-[3px]" }) => (
  <div className={`${borderColor} ${padding} ${className}`}>
    <div className={`${innerBg} h-full w-full`}>
      {children}
    </div>
  </div>
);

const PixelBorderDouble = ({ children, className = "", outerColor = "bg-gray-500", innerColor = "bg-gray-700", innerBg = "bg-[#1a1a2e]" }) => (
  <div className={`${outerColor} p-[2px] ${className}`}>
    <div className={`${innerColor} p-[2px]`}>
      <div className={`${innerBg} h-full w-full`}>
        {children}
      </div>
    </div>
  </div>
);

// ==================== IMAGE CAROUSEL COMPONENT ====================

const ImageCarousel = ({ images, alt, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering || !images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [isHovering, images]);

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
      <div className={`bg-[#0a0a12] flex items-center justify-center ${className}`}>
        <span className="text-4xl opacity-50">🖼️</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-[#0a0a12] ${className}`}
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
        className="w-full h-full object-cover transition-opacity duration-300 pixelated"
        style={{ imageRendering: 'pixelated' }}
        onError={(e) => {
          e.target.src = "/images/placeholder.png";
        }}
      />

      {/* Pixel Image Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 transition-all ${
                idx === currentIndex
                  ? "bg-white"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Swipe Hint */}
      {images.length > 1 && isHovering && (
        <PixelBorder 
          borderColor="bg-black/60" 
          innerBg="bg-black/80" 
          padding="p-[2px]"
          className="absolute top-2 right-2"
        >
          <span className="text-xs text-white/80 px-2 py-1 block">← Проведіть →</span>
        </PixelBorder>
      )}
    </div>
  );
};

// ==================== ITEM CARD COMPONENT ====================

const ItemCard = ({ item, type, isSelected, onSelect, disabled }) => {
  const isFeatured = item.featured;
  const hasSavings = item.savings && item.savings > 0;

  const borderColor = isSelected 
    ? "bg-[#c5629a]" 
    : isFeatured 
      ? "bg-yellow-500" 
      : "bg-gray-600";

  return (
    <div
      onClick={() => !disabled && onSelect(item, type)}
      className={`
        group relative transition-all duration-200
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:translate-y-[-2px]"}
      `}
    >
      {/* Outer Border */}
      <div className={`${borderColor} p-[3px] transition-colors`}>
        {/* Inner Border */}
        <div className="bg-gray-800 p-[2px]">
          {/* Content Container */}
          <div className="bg-[#1a1a2e]">
            
            {/* Featured Badge */}
            {isFeatured && (
              <div className="absolute top-5 right-5 z-10">
                <PixelBorder borderColor="bg-yellow-600" innerBg="bg-yellow-500" padding="p-[2px]">
                  <span className="text-black text-xs font-bold px-2 py-1 block minecraftFont">
                    ⭐ ХІТ
                  </span>
                </PixelBorder>
              </div>
            )}

            {/* Savings Badge */}
            {hasSavings && (
              <div className="absolute top-5 left-5 z-10">
                <PixelBorder borderColor="bg-green-700" innerBg="bg-green-600" padding="p-[2px]">
                  <span className="text-white text-xs font-bold px-2 py-1 block minecraftFont">
                    -{item.savings}₴
                  </span>
                </PixelBorder>
              </div>
            )}

            {/* Image Section */}
            <div className="relative aspect-[4/3]">
              <PixelBorder borderColor="bg-gray-700" innerBg="bg-[#0a0a12]" padding="p-[2px]" className="h-full">
                <ImageCarousel
                  images={item.thumbnails}
                  alt={item.name}
                  className="w-full h-full"
                />
              </PixelBorder>
              
              {/* Type Badge */}
              <div className="absolute bottom-4 left-4">
                <PixelBorder borderColor="bg-gray-800" innerBg="bg-black/90" padding="p-[2px]">
                  <span className="text-sm px-2 py-1 block text-gray-200">
                    {type === "cape" && "🎭 Плащ"}
                    {type === "icon" && "⭐ Значок"}
                    {type === "bundle" && "📦 Набір"}
                  </span>
                </PixelBorder>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              {/* Title */}
              <h3 className={`text-lg font-bold mb-2 minecraftFont ${isFeatured ? "text-yellow-400" : "text-white"}`}>
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
                    <PixelBorder key={idx} borderColor="bg-gray-700" innerBg="bg-gray-800/50" padding="p-[1px]">
                      <span className="text-xs px-2 py-0.5 block text-gray-300">
                        {bundleItem.split(":")[0] === "cape" ? "🎭" : "⭐"} {bundleItem.split(":")[1]}
                      </span>
                    </PixelBorder>
                  ))}
                  {item.items.length > 4 && (
                    <PixelBorder borderColor="bg-gray-700" innerBg="bg-gray-800/50" padding="p-[1px]">
                      <span className="text-xs px-2 py-0.5 block text-gray-400">
                        +{item.items.length - 4}
                      </span>
                    </PixelBorder>
                  )}
                </div>
              )}

              {/* Separator */}
              <div className="bg-gray-700 h-[2px] mb-3" />

              {/* Price Section */}
              <div className="flex items-center justify-between">
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

                {/* Selection Checkbox */}
                <div className={`w-6 h-6 flex items-center justify-center transition-all ${
                  isSelected 
                    ? "bg-[#c5629a] text-white" 
                    : "bg-gray-800 text-transparent group-hover:bg-gray-700"
                }`}>
                  <PixelBorder 
                    borderColor={isSelected ? "bg-[#9e4d7d]" : "bg-gray-600"} 
                    innerBg={isSelected ? "bg-[#c5629a]" : "bg-gray-800"} 
                    padding="p-[2px]"
                  >
                    <span className={`block w-4 h-4 flex items-center justify-center text-xs ${isSelected ? "text-white" : "text-transparent"}`}>
                      ✓
                    </span>
                  </PixelBorder>
                </div>
              </div>
            </div>
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
      flex-1 py-3 px-4 font-bold minecraftFont transition-all
      ${isActive
        ? "bg-[#c5629a] text-white"
        : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"}
    `}
  >
    <span className="text-xl mr-2">{icon}</span>
    <span className="hidden sm:inline">{label}</span>
    {count > 0 && (
      <span className={`ml-2 text-xs px-2 py-0.5 ${
        isActive ? "bg-white/20" : "bg-gray-600"
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
    <div className="bg-[#130217] p-[3px]">
      <div className="bg-gray-800 p-[2px]">
        <div className="bg-[#1a0f1f] p-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            
            {/* Large Image Preview */}
            <div className="w-full lg:w-72">
              <PixelBorderDouble 
                outerColor="bg-[#c5629a]" 
                innerColor="bg-gray-700" 
                innerBg="bg-[#0a0a12]"
              >
                <div className="aspect-video">
                  <ImageCarousel
                    images={item.thumbnails}
                    alt={item.name}
                    className="w-full h-full"
                  />
                </div>
              </PixelBorderDouble>
            </div>

            {/* Item Details */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                <span className="text-3xl">
                  {type === "cape" && "🎭"}
                  {type === "icon" && "⭐"}
                  {type === "bundle" && "📦"}
                </span>
                <h3 className="text-2xl font-bold text-white minecraftFont">{item.name}</h3>
                {item.featured && (
                  <PixelBorder borderColor="bg-yellow-600" innerBg="bg-yellow-500" padding="p-[1px]">
                    <span className="text-black text-xs px-2 block">⭐ ХІТ</span>
                  </PixelBorder>
                )}
              </div>
              
              <p className="text-gray-400 mb-4">{item.description}</p>

              {/* Bundle Contents */}
              {type === "bundle" && item.items && (
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                  {item.items.map((bundleItem, idx) => (
                    <PixelBorder key={idx} borderColor="bg-gray-600" innerBg="bg-gray-800" padding="p-[2px]">
                      <span className="text-sm px-3 py-1 block text-gray-200">
                        {bundleItem.split(":")[0] === "cape" ? "🎭" : "⭐"} {bundleItem.split(":")[1]}
                      </span>
                    </PixelBorder>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Actions */}
            <div className="flex flex-col items-center gap-3">
              {item.savings && item.savings > 0 && (
                <div className="text-green-400 text-sm minecraftFont">
                  Економія: {item.savings}₴
                </div>
              )}
              <div className="text-3xl font-bold text-yellow-400 minecraftFont">
                {item.price === 0 ? "Безкоштовно" : `${item.price}₴`}
              </div>
              <button
                onClick={onClear}
                className="text-sm text-gray-500 hover:text-red-400 transition-colors px-4 py-2 bg-gray-800 hover:bg-gray-700"
              >
                ✕ Скасувати вибір
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== LOADING SPINNER ====================

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-12">
    <div className="relative">
      {/* Pixelated loading animation */}
      <div className="w-16 h-16 bg-gray-800 animate-pulse flex items-center justify-center">
        <PixelBorder borderColor="bg-[#c5629a]" innerBg="bg-[#130217]" padding="p-[3px]">
          <div className="w-8 h-8 flex items-center justify-center text-2xl animate-spin">
            ⏳
          </div>
        </PixelBorder>
      </div>
    </div>
    <span className="mt-4 text-gray-400 minecraftFont">Завантаження магазину...</span>
  </div>
);

// ==================== ERROR MESSAGE ====================

const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center p-12">
    <div className="text-6xl mb-4">😔</div>
    <h3 className="text-xl font-bold text-red-400 mb-2 minecraftFont">Щось пішло не так</h3>
    <p className="text-gray-400 mb-6">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-[#c5629a] hover:bg-[#f390d0] text-white px-6 py-3 font-bold transition-colors minecraftFont"
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
      <PixelBorderDouble outerColor="bg-yellow-500" innerColor="bg-blue-600" innerBg="bg-blue-900/60">
        <div className="p-6 text-center">
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
                className="bg-[#130217] hover:bg-[#1a0420] px-6 py-3 transition-all hover:translate-y-[-2px]"
              >
                <PixelBorder borderColor="bg-yellow-500/50" innerBg="bg-[#130217]" padding="p-[2px]">
                  <div className="px-4 py-2 flex items-center">
                    <span className="text-2xl mr-2">{org.emoji}</span>
                    <span className="text-yellow-200 font-bold minecraftFont">{org.name}</span>
                  </div>
                </PixelBorder>
              </a>
            ))}
          </div>
        </div>
      </PixelBorderDouble>

      {/* Main Shop Container */}
      <div className="mt-8">
        <PixelBorderDouble outerColor="bg-[#c5629a]" innerColor="bg-gray-700" innerBg="bg-[#1a1a2e]">
          
          {/* Shop Header */}
          <div className="bg-[#130217] p-8 text-center">
            <h2 className="text-4xl font-bold text-[#c5629a] minecraftFont mb-3">
              🛒 Магазин Косметики
            </h2>
            <p className="text-gray-400 text-lg">
              Підтримай сервер та отримай ексклюзивні плащі, значки та набори!
            </p>
          </div>

          {/* Separator */}
          <div className="bg-gray-700 h-[3px]" />

          {/* Loading / Error States */}
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} onRetry={fetchShopData} />}

          {/* Shop Content */}
          {!loading && !error && shopData && (
            <>
              {/* Nickname Input */}
              <div className="p-6 bg-[#0f0f1a]">
                <div className="max-w-md mx-auto">
                  <label className="block text-gray-300 mb-2 font-bold minecraftFont">
                    📝 Ваш нікнейм на сервері
                  </label>
                  <PixelBorder 
                    borderColor={nicknameError ? "bg-red-500" : nicknameValid ? "bg-green-500" : "bg-gray-600"} 
                    innerBg="bg-[#130217]" 
                    padding="p-[3px]"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        value={nickname}
                        onChange={handleNicknameChange}
                        placeholder="Наприклад: MEGATREX4"
                        maxLength={16}
                        className="w-full px-4 py-3 bg-transparent text-white focus:outline-none minecraftFont"
                      />
                      {nicknameValid && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-xl">
                          ✓
                        </span>
                      )}
                    </div>
                  </PixelBorder>
                  {nicknameError && <p className="mt-2 text-red-400 text-sm">{nicknameError}</p>}
                  <p className="mt-2 text-gray-500 text-sm">⚠️ Переконайтеся, що нікнейм введено правильно!</p>
                </div>
              </div>

              {/* Separator */}
              <div className="bg-gray-700 h-[2px]" />

              {/* Category Tabs */}
              <div className="flex">
                <CategoryTab
                  label="Плащі"
                  icon="🎭"
                  isActive={selectedCategory === "capes"}
                  onClick={() => handleCategoryChange("capes")}
                  count={shopData.capes?.length || 0}
                />
                <div className="bg-gray-700 w-[2px]" />
                <CategoryTab
                  label="Значки"
                  icon="⭐"
                  isActive={selectedCategory === "icons"}
                  onClick={() => handleCategoryChange("icons")}
                  count={shopData.icons?.length || 0}
                />
                <div className="bg-gray-700 w-[2px]" />
                <CategoryTab
                  label="Набори"
                  icon="📦"
                  isActive={selectedCategory === "bundles"}
                  onClick={() => handleCategoryChange("bundles")}
                  count={shopData.bundles?.length || 0}
                />
              </div>

              {/* Separator */}
              <div className="bg-gray-700 h-[3px]" />

              {/* Items Grid */}
              <div className="p-6 bg-[#12121f]">
                {currentItems.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <div className="text-6xl mb-4 opacity-50">🏪</div>
                    <p className="text-xl minecraftFont">Немає доступних товарів</p>
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
              {selectedItem && (
                <>
                  <div className="bg-gray-700 h-[3px]" />
                  <SelectedItemPreview
                    item={selectedItem}
                    type={selectedType}
                    onClear={() => {
                      setSelectedItem(null);
                      setSelectedType(null);
                    }}
                  />
                </>
              )}

              {/* Purchase Status */}
              {purchaseStatus && (
                <div className="mx-6 mb-4">
                  <PixelBorder 
                    borderColor={
                      purchaseStatus.type === "error" ? "bg-red-500" :
                      purchaseStatus.type === "pending" ? "bg-yellow-500" : "bg-green-500"
                    }
                    innerBg={
                      purchaseStatus.type === "error" ? "bg-red-900/50" :
                      purchaseStatus.type === "pending" ? "bg-yellow-900/50" : "bg-green-900/50"
                    }
                    padding="p-[3px]"
                  >
                    <div className="p-4 text-center">
                      <p className={`font-bold minecraftFont ${
                        purchaseStatus.type === "error" ? "text-red-200" :
                        purchaseStatus.type === "pending" ? "text-yellow-200" : "text-green-200"
                      }`}>
                        {purchaseStatus.message}
                      </p>
                      {purchaseStatus.purchaseId && (
                        <p className="mt-2 text-sm opacity-80">
                          ID: <code className="bg-black/30 px-2 py-1">{purchaseStatus.purchaseId}</code>
                        </p>
                      )}
                      {purchaseStatus.paymentUrl && (
                        <a
                          href={purchaseStatus.paymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block bg-green-600 hover:bg-green-500 text-white px-6 py-2 font-bold transition-colors minecraftFont"
                        >
                          💳 Відкрити оплату
                        </a>
                      )}
                    </div>
                  </PixelBorder>
                </div>
              )}

              {/* Separator */}
              <div className="bg-gray-700 h-[3px]" />

              {/* Purchase Button */}
              <div className="p-6 bg-[#130217]">
                <button
                  onClick={handlePurchase}
                  disabled={!canPurchase}
                  className={`
                    w-full py-4 text-xl font-bold minecraftFont transition-all
                    ${canPurchase
                      ? "bg-[#c5629a] hover:bg-[#f390d0] text-white hover:translate-y-[-2px]"
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
        </PixelBorderDouble>
      </div>

      {/* How it Works */}
      <div className="mt-8">
        <PixelBorderDouble outerColor="bg-gray-600" innerColor="bg-gray-700" innerBg="bg-[#1a1a2e]">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-[#c5629a] minecraftFont mb-6 text-center">
              ❓ Як це працює?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "1", icon: "🛒", title: "Виберіть товар", desc: "Оберіть плащ, значок або набір зі списку" },
                { step: "2", icon: "💳", title: "Оплатіть", desc: "Перейдіть на Monobank та оплатіть покупку" },
                { step: "3", icon: "🎉", title: "Отримайте!", desc: "Товар з'явиться автоматично протягом хвилини" },
              ].map((item) => (
                <PixelBorder key={item.step} borderColor="bg-gray-600" innerBg="bg-[#12121f]" padding="p-[3px]">
                  <div className="text-center p-6">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <PixelBorder borderColor="bg-[#c5629a]" innerBg="bg-[#130217]" padding="p-[2px]" className="inline-block mb-2">
                      <span className="text-sm text-[#c5629a] px-3 py-1 block minecraftFont">Крок {item.step}</span>
                    </PixelBorder>
                    <h4 className="font-bold text-white text-lg mb-2 minecraftFont">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </PixelBorder>
              ))}
            </div>
          </div>
        </PixelBorderDouble>
      </div>
    </section>
  );
}