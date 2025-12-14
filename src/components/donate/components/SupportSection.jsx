// src/components/donate/components/SupportSection.jsx
import { useState, useCallback } from 'react';
import { BorderBox } from './BorderBox';
import { Badge } from './Badge';
import { SUPPORT_ITEM } from '../constants';

export const SupportSection = ({ 
  isSelected, 
  onSelect, 
  disabled,
  customAmount,
  onAmountChange,
  hasSupporter = false
}) => {
  const [inputValue, setInputValue] = useState(customAmount?.toString() || SUPPORT_ITEM.price.toString());
  const [error, setError] = useState("");

  const handleAmountChange = useCallback((e) => {
    const value = e.target.value;
    setInputValue(value);
    
    const numValue = parseInt(value, 10);
    
    if (isNaN(numValue) || value === "") {
      setError("Введіть суму");
      onAmountChange(null);
      return;
    }
    
    if (numValue < SUPPORT_ITEM.minPrice) {
      setError(`Мінімальна сума: ${SUPPORT_ITEM.minPrice}₴`);
      onAmountChange(null);
      return;
    }
    
    if (numValue > SUPPORT_ITEM.maxPrice) {
      setError(`Максимальна сума: ${SUPPORT_ITEM.maxPrice}₴`);
      onAmountChange(null);
      return;
    }
    
    setError("");
    onAmountChange(numValue);
  }, [onAmountChange]);

  const handleSelect = useCallback(() => {
    if (disabled) return;
    
    const amount = parseInt(inputValue, 10);
    if (!isNaN(amount) && amount >= SUPPORT_ITEM.minPrice && amount <= SUPPORT_ITEM.maxPrice) {
      onSelect({ ...SUPPORT_ITEM, price: amount }, 'support');
    } else {
      onSelect({ ...SUPPORT_ITEM, price: SUPPORT_ITEM.price }, 'support');
    }
  }, [disabled, inputValue, onSelect]);

  const quickAmounts = [50, 100, 200, 500];

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="bg-pink-600 p-[2px] mb-4">
        <div className="bg-gray-800 p-[2px]">
          <div className="bg-[#1a0f1f] p-4 flex items-center justify-center gap-3">
            <i className="hn hn-heart-solid text-2xl text-pink-400"></i>
            <h3 className="text-xl font-bold text-pink-300 minecraftFont">
              Підтримка Сервера
            </h3>
            <i className="hn hn-heart-solid text-2xl text-pink-400"></i>
          </div>
        </div>
      </div>

      {/* Support Card */}
      <div
        onClick={handleSelect}
        className={`
          transition-all duration-200
          ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:translate-y-[-2px]"}
        `}
      >
        <div className={`${isSelected ? "bg-pink-500" : "bg-pink-600/50"} p-[3px] transition-colors`}>
          <div className="bg-gray-800 p-[2px]">
            <div className="bg-[#1a1a2e]">
              <div className="flex flex-col lg:flex-row">
                
                {/* Left: Icon/Image Section */}
                <div className="lg:w-64 bg-gradient-to-br from-pink-900/50 to-purple-900/50 p-8 flex flex-col items-center justify-center">
                  <div className="text-8xl mb-4 animate-pulse">
                    <i className="hn hn-heart-solid text-pink-400"></i>
                  </div>
                  <Badge bgColor="bg-pink-600">
                    <i className="hn hn-star-solid"></i>
                    <span className="text-white font-bold minecraftFont">SUPPORTER</span>
                  </Badge>
                </div>

                {/* Right: Content Section */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white minecraftFont mb-2">
                        {SUPPORT_ITEM.name}
                      </h4>
                      <p className="text-gray-400 max-w-lg">
                        {SUPPORT_ITEM.description}
                      </p>
                    </div>
                    
                    {/* Selection indicator */}
                    {(
                      <div className={`${isSelected ? "bg-pink-500" : "bg-gray-600"} p-[2px] transition-colors ml-4`}>
                        <div className={`${isSelected ? "bg-pink-600" : "bg-gray-800"} w-6 h-6 flex items-center justify-center`}>
                          <span className={`${isSelected ? "text-white" : "text-transparent"}`}>
                            <i className="hn hn-check"></i>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-2 minecraftFont">Що ви отримаєте:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SUPPORT_ITEM.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-300">
                          <i className="hn hn-check text-pink-400"></i>
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Important Notice */}
                  <div className="bg-yellow-900/30 border border-yellow-600/50 p-3 mb-6">
                    <div className="flex items-start gap-2">
                      <i className="hn hn-alert-triangle text-yellow-500 mt-0.5"></i>
                      <div>
                        <p className="text-yellow-300 text-sm font-bold minecraftFont">Зверніть увагу!</p>
                        <p className="text-yellow-200/80 text-xs mt-1">
                          Цей варіант підтримки <strong>не включає</strong> косметичні предмети (плащі, значки). 
                          Якщо вам потрібні косметичні предмети — оберіть їх з каталогу нижче.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 h-[2px] mb-4" />

                  {/* Amount Selection */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="text-sm text-gray-400 mb-2 minecraftFont">Сума підтримки:</div>
                      
                      {/* Quick Amount Buttons */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {quickAmounts.map((amount) => (
                          <button
                            key={amount}
                            onClick={(e) => {
                              e.stopPropagation();
                              setInputValue(amount.toString());
                              setError("");
                              onAmountChange(amount);
                            }}
                            className={`
                              px-3 py-1 text-sm minecraftFont transition-all
                              ${parseInt(inputValue, 10) === amount 
                                ? "bg-pink-500 text-white" 
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"}
                            `}
                          >
                            {amount}₴
                          </button>
                        ))}
                      </div>

                      {/* Custom Amount Input */}
                      <div className="flex items-center gap-2">
                        <div className={`${error ? "bg-red-500" : "bg-gray-600"} p-[2px] transition-colors`}>
                          <div className="bg-[#130217] flex items-center">
                            <input
                              type="number"
                              value={inputValue}
                              onChange={handleAmountChange}
                              onClick={(e) => e.stopPropagation()}
                              min={SUPPORT_ITEM.minPrice}
                              max={SUPPORT_ITEM.maxPrice}
                              placeholder="Введіть суму"
                              className="w-24 px-3 py-2 bg-transparent text-white focus:outline-none minecraftFont text-center"
                            />
                            <span className="text-yellow-400 pr-3 minecraftFont">₴</span>
                          </div>
                        </div>
                        <span className="text-gray-500 text-xs">
                          ({SUPPORT_ITEM.minPrice}₴ - {SUPPORT_ITEM.maxPrice}₴)
                        </span>
                      </div>
                      
                      {error && (
                        <p className="text-red-400 text-xs mt-1">{error}</p>
                      )}
                    </div>

                    {/* Final Price Display */}
                    <div className="text-right">
                      <div className="text-sm text-gray-500 minecraftFont">До сплати:</div>
                      <div className="text-3xl font-bold text-pink-400 minecraftFont">
                        {parseInt(inputValue, 10) || SUPPORT_ITEM.price}₴
                      </div>
                    </div>
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