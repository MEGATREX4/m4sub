// src/components/donate/components/ItemCard.jsx
import { useState, useCallback } from 'react';
import { ImageCarousel } from './ImageCarousel';
import { Badge } from './Badge';
import { BorderBox } from './BorderBox';
import { TYPE_ICONS, SUPPORT_ITEM } from '../constants';
import { getItemNameFromReference, isItemOwned, isBundleFullyOwned, isBundlePartiallyOwned } from '../utils/helpers';

export const ItemCard = ({ 
  item, 
  type, 
  isSelected, 
  onSelect, 
  disabled, 
  shopData,
  ownedItems = [],
  supportAmount,
  onSupportAmountChange,
  nickname = "",
  nicknameError = "",
  isLarge = false
}) => {
  const [inputValue, setInputValue] = useState(supportAmount?.toString() || SUPPORT_ITEM.price.toString());
  const [error, setError] = useState("");

  const handleAmountChange = useCallback((e) => {
    const value = e.target.value;
    setInputValue(value);
    
    const numValue = parseInt(value, 10);
    
    if (isNaN(numValue) || value === "") {
      setError("Введіть суму");
      onSupportAmountChange?.(null);
      return;
    }
    
    if (numValue < SUPPORT_ITEM.minPrice) {
      setError(`Мінімальна сума: ${SUPPORT_ITEM.minPrice}₴`);
      onSupportAmountChange?.(null);
      return;
    }
    
    if (numValue > SUPPORT_ITEM.maxPrice) {
      setError(`Максимальна сума: ${SUPPORT_ITEM.maxPrice}₴`);
      onSupportAmountChange?.(null);
      return;
    }
    
    setError("");
    onSupportAmountChange?.(numValue);
  }, [onSupportAmountChange]);
  const isFeatured = item.featured;
  const hasSavings = item.savings && item.savings > 0;
  
  // Check if username is needed and missing
  const showNicknameWarning = isSelected && (!nickname || nicknameError !== "");
  
  // Check ownership - support items cannot be "owned"
  const isOwned = type === 'support' 
    ? false
    : type === 'bundle' 
      ? isBundleFullyOwned(item, ownedItems)
      : isItemOwned(item.id, type, ownedItems);
  
  const isPartiallyOwned = type === 'bundle' && isBundlePartiallyOwned(item, ownedItems);

  const borderColor = isOwned
    ? "bg-green-500"
    : isSelected 
      ? type === 'support'
        ? "bg-pink-500"
        : "bg-[#c5629a]"
      : isFeatured 
        ? "bg-yellow-500" 
        : "bg-gray-600";

  const isDisabled = disabled || isOwned;

  return (
    <div
      onClick={() => !isDisabled && onSelect(item, type)}
      className={`
        group relative transition-all duration-200
        ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:translate-y-[-2px]"}
      `}
    >
      {/* Owned overlay */}
      {isOwned && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60">
          <div className="bg-green-600 p-[2px]">
            <div className="bg-green-900 px-4 py-2 flex items-center gap-2">
              <i className="hn hn-check-circle text-green-300 text-xl"></i>
              <span className="text-green-200 font-bold minecraftFont">Вже придбано</span>
            </div>
          </div>
        </div>
      )}

      {/* Username warning overlay */}
      {showNicknameWarning && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60">
          <BorderBox borderColor="bg-yellow-600" innerBg="bg-yellow-900/80">
            <div className="px-4 py-3 flex items-center gap-2 whitespace-nowrap">
              <i className="hn hn-alert-triangle text-yellow-300 text-lg flex-shrink-0"></i>
              <span className="text-yellow-200 font-bold minecraftFont text-sm">
                {!nickname ? "Введіть нікнейм" : "Коректний нікнейм"}
              </span>
            </div>
          </BorderBox>
        </div>
      )}

      {/* Outer Border */}
      <div className={`${borderColor} p-[3px] transition-colors h-full ${isLarge ? 'grid grid-rows-subgrid' : ''}`} style={isLarge ? { display: 'grid', gridTemplateRows: 'subgrid' } : {}}>
        <div className="bg-gray-800 p-[2px] h-full">
          <div className="bg-[#1a1a2e] h-full flex flex-col">
            {/* Image Section - Hidden for large support items */}
            {!isLarge && (
              <div className="relative bg-[#0a0a12]" style={{ height: '224px' }}>
              {type === 'support' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-900/50 to-purple-900/50 z-10">
                  <div className="text-7xl animate-pulse">
                    <i className="hn hn-heart-solid text-pink-400"></i>
                  </div>
                </div>
              )}
              
              {isFeatured && !isOwned && type !== 'support' && (
                <div className="absolute bottom-3 right-3 z-10">
                  <Badge bgColor="bg-yellow-600">
                    <i className="hn hn-star-solid"></i>
                    <span className="text-white font-bold minecraftFont">ХІТ</span>
                  </Badge>
                </div>
              )}
              
              {isPartiallyOwned && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge bgColor="bg-orange-600">
                    <i className="hn hn-alert-circle"></i>
                    <span className="text-white font-bold minecraftFont">Частково</span>
                  </Badge>
                </div>
              )}
              
              {type !== 'support' && (
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
              )}
              
              <div className="absolute bottom-3 left-3 z-20">
                <Badge bgColor={type === 'support' ? "bg-pink-600" : "bg-gray-800"}>
                  <i className={`hn ${TYPE_ICONS[type]?.icon}`}></i>
                  <span>{TYPE_ICONS[type]?.label}</span>
                </Badge>
              </div>
            </div>
            )}

            {/* Content Section */}
            <div className={`p-4 flex flex-col ${isLarge ? 'flex-1 justify-between' : ''}`}>
              <h3 className={`font-bold mb-2 minecraftFont ${
                isLarge ? 'text-2xl' : 'text-lg'
              } ${
                isOwned ? "text-green-400" : type === 'support' ? "text-pink-400" : isFeatured ? "text-yellow-400" : "text-white"
              }`}>
                {item.name}
              </h3>

              {item.description && (
                <p className={`text-gray-400 mb-3 ${isLarge ? 'text-sm line-clamp-4' : 'text-sm line-clamp-2'}`}>
                  {item.description}
                </p>
              )}

              {type === "bundle" && item.items && item.items.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
                  {item.items.slice(0, 4).map((bundleItem, idx) => {
                    const parts = bundleItem.split(":");
                    const itemType = parts[0];
                    const itemId = parts[1];
                    const itemName = getItemNameFromReference(bundleItem, shopData);
                    const itemIsOwned = isItemOwned(itemId, itemType, ownedItems);
                    
                    return (
                      <div key={idx} className={`${itemIsOwned ? 'bg-green-600' : 'bg-gray-700'} p-[1px]`}>
                        <div className="bg-gray-800/50 px-2 py-0.5">
                          <span className={`text-xs flex items-center gap-1 leading-none p-1 ${
                            itemIsOwned ? 'text-green-300' : 'text-gray-300'
                          }`}>
                            <i className={`hn ${itemType === "cape" ? "hn-users-crown-solid" : "hn-star-solid"}`}></i>
                            {itemName}
                            {itemIsOwned && <i className="hn hn-check text-green-400"></i>}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {item.items.length > 4 && (
                    <div className="bg-gray-700 p-[1px]">
                      <div className="bg-gray-800/50 px-2 py-0.5">
                        <span className="text-xs text-gray-400 flex items-center leading-none">
                          +{item.items.length - 4}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Support Benefits */}
              {type === 'support' && item.benefits && (
                <div className="mb-3">
                  <div className="text-xs text-gray-400 mb-1 minecraftFont">Що ви отримаєте:</div>
                  <div className="grid grid-cols-2 gap-1">
                    {item.benefits.slice(0, 4).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-1 text-xs text-gray-300">
                        <i className="hn hn-check text-pink-400 mt-0.5 flex-shrink-0"></i>
                        <span className="line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-700 h-[2px] mb-3" />

              {/* Price Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {hasSavings && item.originalPrice && type !== 'support' && (
                    <span className="text-gray-500 line-through text-sm">
                      {item.originalPrice}₴
                    </span>
                  )}
                  <span className={`text-xl font-bold minecraftFont ${
                    isOwned ? "text-green-400" :
                    type === 'support' ? "text-pink-400" :
                    item.price === 0 ? "text-green-400" : "text-yellow-400"
                  }`}>
                    {isOwned ? "✓" : type === 'support' ? "Підтримати" : item.price === 0 ? "Безкоштовно" : `${item.price}₴`}
                  </span>
                </div>

                {!isOwned && (
                  <div className={`${isSelected ? type === 'support' ? "bg-pink-500" : "bg-[#9e4d7d]" : "bg-gray-600"} p-[2px] transition-colors`}>
                    <div className={`${isSelected ? type === 'support' ? "bg-pink-600" : "bg-[#c5629a]" : "bg-gray-800 group-hover:bg-gray-700"} w-5 h-5 flex items-center justify-center`}>
                      <span className={`text-xs ${isSelected ? "text-white" : "text-transparent"}`}>
                        <i className="hn hn-check text-xs"></i>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};