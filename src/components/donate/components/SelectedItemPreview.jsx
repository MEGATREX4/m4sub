// src/components/donate/components/SelectedItemPreview.jsx
import { ImageCarousel } from './ImageCarousel';
import { BorderBox } from './BorderBox';
import { Badge } from './Badge';
import { TYPE_ICONS } from '../constants';
import { getItemNameFromReference } from '../utils/helpers';

export const SelectedItemPreview = ({ item, type, onClear, shopData }) => {
  if (!item) return null;

  const hasSavings = item.savings && item.savings > 0;

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
                <i className={`hn ${TYPE_ICONS[type]?.icon} text-3xl`}></i>
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