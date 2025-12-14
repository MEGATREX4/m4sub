import { useState, useEffect, useMemo, useCallback } from "react";

// Configuration
const API_BASE_URL = "/.netlify/functions";
const SHOP_API_URL = "/.netlify/functions/shop";
const MONOBANK_JAR_URL = "https://send.monobank.ua/jar/85Ui7vsyCD";

const IMAGES_BASE_URL = "";

// ==================== BORDER WRAPPER COMPONENT ====================
// Reusable component for the pixel art border style used throughout
const BorderBox = ({ children, borderColor = "bg-gray-600", innerBg = "bg-[#1a1a2e]" }) => (
  <div className={`${borderColor} p-[3px]`}>
    <div className="bg-gray-800 p-[2px]">
      <div className={innerBg}>
        {children}
      </div>
    </div>
  </div>
);

// ==================== BADGE WRAPPER COMPONENT ====================
// Reusable badge component for various labels
const Badge = ({ children, bgColor = "bg-gray-600", textColor = "text-gray-200", size = "text-xs" }) => (
  <div className={`${bgColor} p-[2px]`}>
    <div className="bg-black/90 px-2 py-1">
      <div className={`${textColor} ${size} flex items-center gap-1.5`}>
        {children}
      </div>
    </div>
  </div>
);

// ==================== IMAGE CAROUSEL COMPONENT ====================

const ImageCarousel = ({ images, alt, className = "", textureUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageStates, setImageStates] = useState({}); // 'loading' | 'loaded' | 'error'

  // Build display images array with proper URLs
  const displayImages = useMemo(() => {
    let result = [];
    
    // Check thumbnails array
    if (images && Array.isArray(images) && images.length > 0) {
      result = images
        .filter(img => img && typeof img === 'string' && img.trim() !== '')
        .map(img => {
          // If path starts with / and we have a base URL, prepend it
          if (IMAGES_BASE_URL && img.startsWith('/')) {
            return `${IMAGES_BASE_URL}${img}`;
          }
          return img;
        });
    }
    
    // Fallback to textureUrl if no thumbnails
    if (result.length === 0 && textureUrl && typeof textureUrl === 'string' && textureUrl.trim() !== '') {
      const url = IMAGES_BASE_URL && textureUrl.startsWith('/') 
        ? `${IMAGES_BASE_URL}${textureUrl}` 
        : textureUrl;
      result = [url];
    }
    
    // DEBUG: Log what we're trying to load
    if (result.length > 0) {
      console.log("ImageCarousel loading:", result[0]);
    }
    
    return result;
  }, [images, textureUrl]);

  // Reset states when images change
  useEffect(() => {
    setCurrentIndex(0);
    const initialStates = {};
    displayImages.forEach((_, idx) => {
      initialStates[idx] = 'loading';
    });
    setImageStates(initialStates);
  }, [displayImages.length]);

  // Handle side click - previous image
  const handleLeftClick = (e) => {
    e.stopPropagation();
    if (displayImages.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  // Handle side click - next image
  const handleRightClick = (e) => {
    e.stopPropagation();
    if (displayImages.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  // Handle image load
  const handleImageLoad = (idx) => {
    console.log("✅ Image loaded:", displayImages[idx]);
    setImageStates(prev => ({ ...prev, [idx]: 'loaded' }));
  };

  // Handle image error
  const handleImageError = (idx) => {
    console.error("❌ Image failed to load:", displayImages[idx]);
    console.error("   Full URL:", window.location.origin + displayImages[idx]);
    setImageStates(prev => ({ ...prev, [idx]: 'error' }));
  };

  // No images - show placeholder
  if (displayImages.length === 0) {
    return (
      <div className={`bg-[#0a0a12] flex flex-col items-center justify-center ${className}`}>
        <i className="hn hn-image text-4xl opacity-50"></i>
        <span className="text-xs text-gray-500 mt-1">Немає фото</span>
      </div>
    );
  }

  const currentImage = displayImages[currentIndex];
  const currentState = imageStates[currentIndex] || 'loading';

  return (
    <div className={`relative overflow-hidden bg-[#0a0a12] ${className}`}>
      {/* Loading overlay */}
      {currentState === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a12] z-10">
          <i className="hn hn-brightness-low text-2xl animate-pulse"></i>
        </div>
      )}

      {/* Error overlay - Shows the path that failed */}
      {currentState === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a12] z-10 p-2">
          <i className="hn hn-alert-circle text-3xl text-red-500 opacity-70"></i>
          <span className="text-xs text-red-400 mt-2 text-center break-all max-w-full">
            404: {currentImage}
          </span>
        </div>
      )}

      {/* Main Image */}
      <img
        key={currentImage}
        src={currentImage}
        alt={alt || "Item image"}
        style={{ imageRendering: "pixelated" }}
        className={`w-full h-full object-contain transition-opacity duration-200 ${
          currentState === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => handleImageLoad(currentIndex)}
        onError={() => handleImageError(currentIndex)}
        draggable="false"
      />

      {/* Left Click Zone */}
      {displayImages.length > 1 && (
        <div
          onClick={handleLeftClick}
          className="absolute left-0 top-0 w-1/4 h-full cursor-pointer z-20 hover:bg-black/10 transition-colors flex items-center justify-start pl-2"
        >
          <i className="hn hn-chevron-left text-white/0 hover:text-white/50 text-2xl"></i>
        </div>
      )}

      {/* Right Click Zone */}
      {displayImages.length > 1 && (
        <div
          onClick={handleRightClick}
          className="absolute right-0 top-0 w-1/4 h-full cursor-pointer z-20 hover:bg-black/10 transition-colors flex items-center justify-end pr-2"
        >
          <i className="hn hn-chevron-right text-white/0 hover:text-white/50 text-2xl"></i>
        </div>
      )}

      {/* Image indicators */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {displayImages.map((_, idx) => (
            <div
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 cursor-pointer transition-all ${
                idx === currentIndex
                  ? "bg-white"
                  : imageStates[idx] === 'error'
                    ? "bg-red-500/50"
                    : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ==================== HELPER: Get Item Name from Bundle Reference ====================

const getItemNameFromReference = (itemRef, shopData) => {
  if (!shopData || !itemRef) return itemRef;
  
  const [refType, refId] = itemRef.split(':');
  if (!refType || !refId) return itemRef;
  
  // Map refType to shopData key ("cape" -> "capes", "icon" -> "icons", "bundle" -> "bundles")
  const dataKey = refType === 'bundle' ? 'bundles' : refType + 's';
  const items = shopData[dataKey] || [];
  const foundItem = items.find(item => item.id === refId);
  
  return foundItem ? foundItem.name : refId;
};

// ==================== ITEM CARD COMPONENT ====================

const ItemCard = ({ item, type, isSelected, onSelect, disabled, shopData }) => {
  const isFeatured = item.featured;
  const hasSavings = item.savings && item.savings > 0;

  const borderColor = isSelected 
    ? "bg-[#c5629a]" 
    : isFeatured 
      ? "bg-yellow-500" 
      : "bg-gray-600";

  const typeIcons = {
    cape: { icon: "hn-users-crown-solid", label: "Плащ" },
    icon: { icon: "hn-star-solid", label: "Значок" },
    bundle: { icon: "hn-users-solid", label: "Набір" }
  };

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

            {/* Image Section */}
            <div className="relative aspect-[4/3]">
            {/* Featured Badge - Bottom Right Corner */}
            {isFeatured && (
              <div className="absolute bottom-3 right-3 z-10">
                <Badge bgColor="bg-yellow-600">
                  <i className="hn hn-star-solid"></i>
                  <span className="text-white font-bold minecraftFont">ХІТ</span>
                </Badge>
              </div>
            )}
              <div className="bg-gray-700 p-[2px] h-full">
                <div className="bg-[#0a0a12] h-full">
                  <ImageCarousel
                    images={item.thumbnails}
                    textureUrl={item.textureUrl}
                    alt={item.name}
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              {/* Type Badge - Bottom Left Corner */}
              <div className="absolute bottom-3 left-3 z-20">
                <Badge bgColor="bg-gray-800">
                  <i className={`hn ${typeIcons[type]?.icon}`}></i>
                  <span>{typeIcons[type]?.label}</span>
                </Badge>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              {/* Title */}
              <h3 className={`text-lg font-bold mb-2 minecraftFont ${isFeatured ? "text-yellow-400" : "text-white"}`}>
                {item.name}
              </h3>

              {/* Description */}
              {item.description && (
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
              )}

              {/* Bundle Contents Preview */}
              {type === "bundle" && item.items && item.items.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
                  {item.items.slice(0, 4).map((bundleItem, idx) => {
                    const parts = bundleItem.split(":");
                    const itemType = parts[0];
                    const itemName = getItemNameFromReference(bundleItem, shopData);
                    return (
                      <div key={idx} className="bg-gray-700 p-[1px]">
                        <div className="bg-gray-800/50 px-2 py-0.5">
                          <span className="text-xs text-gray-300 flex items-center gap-1 leading-none p-1">
                            <i className={`hn ${itemType === "cape" ? "hn-users-crown-solid" : "hn-star-solid"}`}></i>
                            {itemName}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {item.items.length > 4 && (
                    <div className="bg-gray-700 p-[1px]">
                      <div className="bg-gray-800/50 px-2 py-0.5">
                        <span className="text-xs text-gray-400 flex items-center leading-none">+{item.items.length - 4}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Separator */}
              <div className="bg-gray-700 h-[2px] mb-3" />

              {/* Price Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {hasSavings && item.originalPrice && (
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
                <div className={`${isSelected ? "bg-[#9e4d7d]" : "bg-gray-600"} p-[2px] transition-colors`}>
                  <div className={`${isSelected ? "bg-[#c5629a]" : "bg-gray-800 group-hover:bg-gray-700"} w-5 h-5 flex items-center justify-center`}>
                    <span className={`text-xs ${isSelected ? "text-white" : "text-transparent"}`}><i className="hn hn-check text-xs"></i></span>
                  </div>
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
    <i className={`hn ${icon} text-xl mr-2`}></i>
    <span className="hidden sm:inline">{label}</span>
    {count > 0 && (
      <span className={`ml-2 text-xs px-2 py-0.5 ${isActive ? "bg-white/20" : "bg-gray-600"}`}>
        {count}
      </span>
    )}
  </button>
);

// ==================== SELECTED ITEM PREVIEW ====================

const SelectedItemPreview = ({ item, type, onClear, shopData }) => {
  if (!item) return null;

  const hasSavings = item.savings && item.savings > 0;

  const typeIcons = {
    cape: "hn-users-crown-solid",
    icon: "hn-star-solid",
    bundle: "hn-users-solid"
  };

  return (
    <div className="bg-[#130217] p-[3px]">
      <div className="bg-gray-800 p-[2px]">
        <div className="bg-[#1a0f1f] p-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            
            {/* Large Image Preview */}
            <div className="w-full lg:w-72">
              <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#0a0a12]">
                <div className="aspect-video">
                  <ImageCarousel
                    images={item.thumbnails}
                    textureUrl={item.textureUrl}
                    alt={item.name}
                    className="w-full h-full"
                  />
                </div>
              </BorderBox>
            </div>

            {/* Item Details */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-2 flex-wrap">
                <i className={`hn ${typeIcons[type]} text-3xl`}></i>
                <h3 className="text-2xl font-bold text-white minecraftFont">{item.name}</h3>
                {item.featured && (
                  <Badge bgColor="bg-yellow-600">
                    <i className="hn hn-star-solid"></i>
                    <span className="text-white font-bold">ХІТ</span>
                  </Badge>
                )}
              </div>
              
              {item.description && (
                <p className="text-gray-400 mb-4">{item.description}</p>
              )}

              {/* Bundle Contents */}
              {type === "bundle" && item.items && item.items.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                  {item.items.map((bundleItem, idx) => {
                    const parts = bundleItem.split(":");
                    const itemType = parts[0];
                    const itemName = getItemNameFromReference(bundleItem, shopData);
                    return (
                      <div key={idx} className="bg-gray-600 p-[2px]">
                        <div className="bg-gray-800 px-3 py-1">
                          <span className="text-sm text-gray-200 flex items-center gap-1.5 leading-none">
                            <i className={`hn ${itemType === "cape" ? "hn-users-crown-solid" : "hn-star-solid"}`}></i>
                            {itemName}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Price & Actions */}
            <div className="flex flex-col items-center gap-3">
              {hasSavings && (
                <div className="text-green-400 text-sm minecraftFont flex items-center gap-1">
                  <i className="hn hn-trending-down"></i>
                  Економія: {item.savings}₴
                </div>
              )}
              <div className="text-3xl font-bold text-yellow-400 minecraftFont">
                {item.price === 0 ? "Безкоштовно" : `${item.price}₴`}
              </div>
              <button
                onClick={onClear}
                className="text-sm text-gray-500 hover:text-red-400 transition-colors px-4 py-2 bg-gray-800 hover:bg-gray-700 flex items-center gap-1"
              >
                <i className="hn hn-x"></i>
                Скасувати вибір
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
    <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#130217]">
      <div className="w-8 h-8 flex items-center justify-center text-2xl animate-spin p-4">
        <i className="hn hn-brightness-low"></i>
      </div>
    </BorderBox>
    <span className="mt-4 text-gray-400 minecraftFont">Завантаження магазину...</span>
  </div>
);

// ==================== ERROR MESSAGE ====================

const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center p-12">
    <div className="text-6xl mb-4"><i className="hn hn-alert-octagon"></i></div>
    <h3 className="text-xl font-bold text-red-400 mb-2 minecraftFont">Щось пішло не так</h3>
    <p className="text-gray-400 mb-6">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-[#c5629a] hover:bg-[#f390d0] text-white px-6 py-3 font-bold transition-colors minecraftFont flex items-center gap-2 justify-center mx-auto"
      >
        <i className="hn hn-refresh-cw"></i>
        Спробувати знову
      </button>
    )}
  </div>
);

// ==================== MAIN SHOP COMPONENT ====================

export default function Donate() {
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

  useEffect(() => {
    console.log("🛒 Purchase state:", {
      item: selectedItem?.id || "none",
      nick: nickname || "empty",
      nickError: nicknameError || "none",
      purchasing,
    });
  }, [selectedItem, nickname, nicknameError, purchasing]);
  
  // Fetch shop data
  const fetchShopData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(SHOP_API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      // Debug: log the data to see what we received
      console.log("Shop data received:", data);
      console.log("First cape thumbnails:", data.capes?.[0]?.thumbnails);
      
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
    
    // Validate only if there's input
    if (value.length === 0) {
      setNicknameError("");
      setNicknameValid(false);
    } else {
      const validationError = validateNickname(value);
      setNicknameError(validationError);
      setNicknameValid(validationError === "" && value.length >= 3);
    }
  };

  const handleItemSelect = (item, type) => {
    console.log("📦 Item selected:", item.id, type);
    
    if (selectedItem?.id === item.id && selectedType === type) {
      // Deselect
      console.log("📦 Deselecting item");
      setSelectedItem(null);
      setSelectedType(null);
    } else {
      // Select new item
      console.log("📦 Selecting item:", item.name, "price:", item.price);
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
        setPurchaseStatus({ 
          type: "error", 
          message: result.message || "Помилка створення покупки" 
        });
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

  const canPurchase = useMemo(() => {
    const hasItem = selectedItem !== null;
    const hasNickname = nickname.trim().length >= 3;
    const noNicknameError = nicknameError === "";
    const notPurchasing = !purchasing;
    
    return hasItem && hasNickname && noNicknameError && notPurchasing;
  }, [selectedItem, nickname, nicknameError, purchasing]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Ukrainian Support Banner */}
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

      {/* Main Shop Container */}
      <div className="bg-[#c5629a] p-[2px]">
        <div className="bg-gray-700 p-[2px]">
          <div className="bg-[#1a1a2e]">
            
            {/* Shop Header */}
            <div className="bg-[#130217] p-8 text-center">
              <h2 className="text-4xl font-bold text-[#c5629a] minecraftFont mb-3 flex items-center justify-center gap-3">
                <i className="hn hn-shopping-cart"></i>
                Магазин Косметики
              </h2>
              <p className="text-gray-400 text-lg">
                Підтримай сервер та отримай ексклюзивні плащі, значки та набори!
              </p>
            </div>

            <div className="bg-gray-700 h-[3px]" />

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} onRetry={fetchShopData} />}

            {!loading && !error && shopData && (
              <>
                {/* Nickname Input */}
                <div className="p-6 bg-[#0f0f1a]">
                  <div className="max-w-md mx-auto">
                    <label className="block text-gray-300 mb-2 font-bold minecraftFont flex items-center gap-2">
                      <i className="hn hn-edit"></i>
                      Ваш нікнейм на сервері
                    </label>
                    <div className={`${nicknameError ? "bg-red-500" : nicknameValid ? "bg-green-500" : "bg-gray-600"} p-[3px] transition-colors`}>
                      <div className="bg-[#130217] relative">
                        <input
                          type="text"
                          value={nickname}
                          onChange={handleNicknameChange}
                          placeholder="Наприклад: MEGATREX4"
                          maxLength={16}
                          className="w-full px-4 py-3 bg-transparent text-white focus:outline-none minecraftFont"
                        />
                        {nicknameValid && (
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-xl"><i className="hn hn-check"></i></span>
                        )}
                      </div>
                    </div>
                    {nicknameError && <p className="mt-2 text-red-400 text-sm">{nicknameError}</p>}
                    <p className="mt-2 text-gray-500 text-sm flex items-center gap-1"><i className="hn hn-alert-circle text-sm"></i> Переконайтеся, що нікнейм введено правильно!</p>
                  </div>
                </div>

                <div className="bg-gray-700 h-[2px]" />

                {/* Category Tabs */}
                <div className="flex">
                  <CategoryTab
                    label="Плащі"
                    icon="hn-users-crown-solid"
                    isActive={selectedCategory === "capes"}
                    onClick={() => handleCategoryChange("capes")}
                    count={shopData.capes?.length || 0}
                  />
                  <div className="bg-gray-700 w-[2px]" />
                  <CategoryTab
                    label="Значки"
                    icon="hn-star-solid"
                    isActive={selectedCategory === "icons"}
                    onClick={() => handleCategoryChange("icons")}
                    count={shopData.icons?.length || 0}
                  />
                  <div className="bg-gray-700 w-[2px]" />
                  <CategoryTab
                    label="Набори"
                    icon="hn-users-solid"
                    isActive={selectedCategory === "bundles"}
                    onClick={() => handleCategoryChange("bundles")}
                    count={shopData.bundles?.length || 0}
                  />
                </div>

                <div className="bg-gray-700 h-[3px]" />

                {/* Items Grid */}
                <div className="p-6 bg-[#12121f]">
                  {currentItems.length === 0 ? (
                    <div className="text-center text-gray-400 py-12">
                      <i className="hn hn-shopping-bag text-6xl mb-4 opacity-50 block"></i>
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
                          shopData={shopData}
                        />
                      ))}
                    </div>
                  )}
                </div>

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
                      shopData={shopData}
                    />
                  </>
                )}

                {purchaseStatus && (
                  <div className="mx-6 mb-4">
                    <div className={`${
                      purchaseStatus.type === "error" ? "bg-red-500" :
                      purchaseStatus.type === "pending" ? "bg-yellow-500" : "bg-green-500"
                    } p-[3px]`}>
                      <div className={`${
                        purchaseStatus.type === "error" ? "bg-red-900/80" :
                        purchaseStatus.type === "pending" ? "bg-yellow-900/80" : "bg-green-900/80"
                      } p-4 text-center`}>
                        <p className={`font-bold minecraftFont ${
                          purchaseStatus.type === "error" ? "text-red-200" :
                          purchaseStatus.type === "pending" ? "text-yellow-200" : "text-green-200"
                        }`}>
                          {purchaseStatus.message}
                        </p>
                        {purchaseStatus.purchaseId && (
                          <p className="mt-2 text-sm opacity-80 text-white">
                            ID: <code className="bg-black/30 px-2 py-1">{purchaseStatus.purchaseId}</code>
                          </p>
                        )}
                        {purchaseStatus.paymentUrl && (
                          <a
                            href={purchaseStatus.paymentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block bg-green-600 hover:bg-green-500 text-white px-6 py-2 font-bold transition-colors minecraftFont flex items-center gap-2"
                          >
                            <i className="hn hn-credit-card"></i>
                            Відкрити оплату
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gray-700 h-[3px]" />

                {/* Purchase Button */}
                <div className="p-6 bg-[#130217]">
                  <button
                    onClick={handlePurchase}
                    disabled={!canPurchase}
                    className={`
                      w-full py-4 text-xl font-bold minecraftFont transition-all flex items-center justify-center gap-2
                      ${canPurchase
                        ? "bg-[#c5629a] hover:bg-[#f390d0] text-white hover:translate-y-[-2px]"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"}
                    `}
                  >
                    {purchasing ? (
                      <>
                        <span className="animate-spin"><i className="hn hn-brightness-low"></i></span>
                        <span>Обробка...</span>
                      </>
                    ) : selectedItem ? (
                      <>
                        <i className="hn hn-credit-card"></i>
                        <span>Оплатити {selectedItem.price}₴</span>
                      </>
                    ) : (
                      <>
                        <i className="hn hn-arrow-up-solid"></i>
                        <span>Виберіть товар</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-500 text-sm mt-4">
                    Оплата через Monobank • Товар буде додано автоматично після оплати
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="mt-8 bg-gray-600 p-[2px]">
        <div className="bg-gray-700 p-[2px]">
          <div className="bg-[#1a1a2e] p-8">
            <h3 className="text-2xl font-bold text-[#c5629a] minecraftFont mb-6 text-center">
              <i className="hn hn-edit"></i> Як це працює?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "1", icon: "hn-shopping-cart", title: "Виберіть товар", desc: "Оберіть плащ, значок або набір зі списку" },
                { step: "2", icon: "hn-credit-card", title: "Оплатіть", desc: "Перейдіть на Monobank та оплатіть покупку" },
                { step: "3", icon: "hn-badge-check", title: "Отримайте!", desc: "Товар з'явиться автоматично протягом хвилини" },
              ].map((item) => (
                <div key={item.step} className="bg-gray-600 p-[3px]">
                  <div className="bg-[#12121f] text-center p-6">
                    <div className="text-5xl mb-4"><i className={`hn ${item.icon}`}></i></div>
                    <div className="bg-[#c5629a] p-[2px] inline-block mb-2">
                      <div className="bg-[#130217] px-3 py-1">
                        <span className="text-sm text-[#c5629a] minecraftFont">Крок {item.step}</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-white text-lg mb-2 minecraftFont">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}