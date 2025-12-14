// src/components/donate/components/ItemCard.jsx
import { ImageCarousel } from './ImageCarousel';
import { Badge } from './Badge';
import { TYPE_ICONS } from '../constants';
import { getItemNameFromReference, isItemOwned, isBundleFullyOwned, isBundlePartiallyOwned } from '../utils/helpers';

export const ItemCard = ({ 
  item, 
  type, 
  isSelected, 
  onSelect, 
  disabled, 
  shopData,
  ownedItems = []
}) => {
  const isFeatured = item.featured;
  const hasSavings = item.savings && item.savings > 0;
  
  // Check ownership
  const isOwned = type === 'bundle' 
    ? isBundleFullyOwned(item, ownedItems)
    : isItemOwned(item.id, type, ownedItems);
  
  const isPartiallyOwned = type === 'bundle' && isBundlePartiallyOwned(item, ownedItems);

  const borderColor = isOwned
    ? "bg-green-500"
    : isSelected 
      ? "bg-[#c5629a]" 
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

      {/* Outer Border */}
      <div className={`${borderColor} p-[3px] transition-colors`}>
        <div className="bg-gray-800 p-[2px]">
          <div className="bg-[#1a1a2e]">
            {/* Image Section */}
            <div className="relative aspect-[4/3]">
              {isFeatured && !isOwned && (
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
              
              <div className="absolute bottom-3 left-3 z-20">
                <Badge bgColor="bg-gray-800">
                  <i className={`hn ${TYPE_ICONS[type]?.icon}`}></i>
                  <span>{TYPE_ICONS[type]?.label}</span>
                </Badge>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <h3 className={`text-lg font-bold mb-2 minecraftFont ${
                isOwned ? "text-green-400" : isFeatured ? "text-yellow-400" : "text-white"
              }`}>
                {item.name}
              </h3>

              {item.description && (
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
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
                    isOwned ? "text-green-400" :
                    item.price === 0 ? "text-green-400" : "text-yellow-400"
                  }`}>
                    {isOwned ? "✓" : item.price === 0 ? "Безкоштовно" : `${item.price}₴`}
                  </span>
                </div>

                {!isOwned && (
                  <div className={`${isSelected ? "bg-[#9e4d7d]" : "bg-gray-600"} p-[2px] transition-colors`}>
                    <div className={`${isSelected ? "bg-[#c5629a]" : "bg-gray-800 group-hover:bg-gray-700"} w-5 h-5 flex items-center justify-center`}>
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