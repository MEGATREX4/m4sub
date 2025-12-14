// src/components/donate/Donate.jsx
import { useState, useMemo, useCallback } from "react";

// Hooks
import { useShopData } from "./donate/hooks/useShopData";
import { useNickname } from "./donate/hooks/useNickname";
import { usePurchase } from "./donate/hooks/usePurchase";

// Components
import { LoadingSpinner } from "./donate/components/LoadingSpinner";
import { ErrorMessage } from "./donate/components/ErrorMessage";
import { UkraineBanner } from "./donate/components/UkraineBanner";
import { NicknameInput } from "./donate/components/NicknameInput";
import { CategoryTab } from "./donate/components/CategoryTab";
import { ItemCard } from "./donate/components/ItemCard";
import { SelectedItemPreview } from "./donate/components/SelectedItemPreview";
import { PurchaseStatusDisplay } from "./donate/components/PurchaseStatusDisplay";
import { PurchaseButton } from "./donate/components/PurchaseButton";
import { HowItWorks } from "./donate/components/HowItWorks";

// Constants
import { SUPPORT_ITEM } from "./donate/constants";

export default function Donate() {
  // Shop data
  const { shopData, loading, error, refetch } = useShopData();

  // Nickname handling with ownership check
  const {
    nickname,
    nicknameError,
    nicknameValid,
    isChecking,
    ownedItems,
    playerExists,
    hasSupporter,
    handleNicknameChange,
    setNicknameError,
  } = useNickname();

  // Selection state
  const [selectedCategory, setSelectedCategory] = useState("capes");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [supportAmount, setSupportAmount] = useState(SUPPORT_ITEM.price);

  // Purchase handling
  const {
    purchasing,
    purchaseStatus,
    canPurchase,
    handlePurchase,
    clearPurchaseStatus,
  } = usePurchase(nickname, nicknameError, selectedItem, selectedType);

  // Current items based on category
  const currentItems = useMemo(() => {
    if (!shopData) return [SUPPORT_ITEM]; // Always include support item
    
    let items = [];
    switch (selectedCategory) {
      case "capes":
        items = shopData.capes || [];
        break;
      case "icons":
        items = shopData.icons || [];
        break;
      case "bundles":
        items = shopData.bundles || [];
        break;
      default:
        items = [];
    }
    
    // Always add support item to the end of each category
    return [...items, SUPPORT_ITEM];
  }, [shopData, selectedCategory]);

  // Handle item selection
  const handleItemSelect = useCallback((item, type) => {
    if (type === 'support') {
      // For support, set the item with current support amount
      if (selectedItem?.id === item.id && selectedType === type) {
        setSelectedItem(null);
        setSelectedType(null);
      } else {
        setSelectedItem({ ...item, price: supportAmount });
        setSelectedType(type);
      }
    } else {
      // Regular items
      if (selectedItem?.id === item.id && selectedType === type) {
        setSelectedItem(null);
        setSelectedType(null);
      } else {
        setSelectedItem(item);
        setSelectedType(type);
      }
    }
    clearPurchaseStatus();
  }, [selectedItem, selectedType, supportAmount, clearPurchaseStatus]);

  // Handle support selection
  const handleSupportSelect = useCallback((item, type) => {
    if (selectedType === 'support' && selectedItem?.id === item.id) {
      // Deselect
      setSelectedItem(null);
      setSelectedType(null);
    } else {
      // Select support with current amount
      setSelectedItem({ ...item, price: supportAmount });
      setSelectedType('support');
    }
    clearPurchaseStatus();
  }, [selectedType, selectedItem, supportAmount, clearPurchaseStatus]);

  // Handle support amount change
  const handleSupportAmountChange = useCallback((amount) => {
    setSupportAmount(amount);
    // Update selected item price if support is selected
    if (selectedType === 'support' && selectedItem) {
      setSelectedItem(prev => ({ ...prev, price: amount }));
    }
  }, [selectedType, selectedItem]);

  // Handle category change
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
    setSelectedType(null);
    clearPurchaseStatus();
  }, [clearPurchaseStatus]);

  // Handle purchase click
  const onPurchaseClick = useCallback(() => {
    handlePurchase(setNicknameError);
  }, [handlePurchase, setNicknameError]);

  // Check if support is selected
  const isSupportSelected = selectedType === 'support';

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <UkraineBanner />

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
            {error && <ErrorMessage message={error} onRetry={refetch} />}

            {!loading && !error && shopData && (
              <>
                {/* Nickname Input */}
                <NicknameInput
                  nickname={nickname}
                  nicknameError={nicknameError}
                  nicknameValid={nicknameValid}
                  isChecking={isChecking}
                  playerExists={playerExists}
                  onChange={handleNicknameChange}
                />

                <div className="bg-gray-700 h-[2px]" />

                {/* Cosmetics Section Header */}
                <div className="bg-[#130217] p-4 text-center">
                  <h3 className="text-xl font-bold text-gray-300 minecraftFont flex items-center justify-center gap-2">
                    <i className="hn hn-sparkles"></i>
                    Магазин
                    <i className="hn hn-sparkles"></i>
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Плащі, значки, набори та підтримка для розвитку сервера
                  </p>
                </div>

                {/* Category Tabs */}
                <div className="flex">
                  <CategoryTab
                    label="Плащі"
                    icon="hn-users-crown-solid"
                    isActive={selectedCategory === "capes"}
                    onClick={() => handleCategoryChange("capes")}
                    count={shopData?.capes?.length || 0}
                  />
                  <div className="bg-gray-700 w-[2px]" />
                  <CategoryTab
                    label="Значки"
                    icon="hn-star-solid"
                    isActive={selectedCategory === "icons"}
                    onClick={() => handleCategoryChange("icons")}
                    count={shopData?.icons?.length || 0}
                  />
                  <div className="bg-gray-700 w-[2px]" />
                  <CategoryTab
                    label="Набори"
                    icon="hn-users-solid"
                    isActive={selectedCategory === "bundles"}
                    onClick={() => handleCategoryChange("bundles")}
                    count={shopData?.bundles?.length || 0}
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
                      {currentItems.map((item) => {
                        const itemType = item.type === 'support' ? 'support' : selectedCategory.slice(0, -1);
                        return (
                          <ItemCard
                            key={item.id}
                            item={item}
                            type={itemType}
                            isSelected={selectedItem?.id === item.id && selectedType === itemType}
                            onSelect={handleItemSelect}
                            disabled={purchasing}
                            shopData={shopData}
                            ownedItems={ownedItems}
                            supportAmount={supportAmount}
                            onSupportAmountChange={handleSupportAmountChange}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Selected Item Preview */}
                {selectedItem && selectedType !== 'support' && (
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

                {/* Support Selected Preview */}
                {isSupportSelected && selectedItem && (
                  <>
                    <div className="bg-gray-700 h-[3px]" />
                    <div className="bg-pink-900/30 p-[3px]">
                      <div className="bg-gray-800 p-[2px]">
                        <div className="bg-[#1a0f1f] p-6">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <i className="hn hn-heart-solid text-5xl text-pink-400"></i>
                              <div>
                                <h4 className="text-xl font-bold text-white minecraftFont">
                                  {SUPPORT_ITEM.name}
                                </h4>
                                <p className="text-gray-400 text-sm">
                                  Ви отримаєте роль SUPPORTER
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-3xl font-bold text-pink-400 minecraftFont">
                                {selectedItem.price}₴
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedItem(null);
                                  setSelectedType(null);
                                }}
                                className="text-sm text-gray-500 hover:text-red-400 transition-colors px-4 py-2 bg-gray-800 hover:bg-gray-700 flex items-center gap-1"
                              >
                                <i className="hn hn-x"></i>
                                Скасувати
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <PurchaseStatusDisplay purchaseStatus={purchaseStatus} />

                <div className="bg-gray-700 h-[3px]" />

                {/* Purchase Button */}
                <PurchaseButton
                  canPurchase={canPurchase}
                  purchasing={purchasing}
                  selectedItem={selectedItem}
                  nickname={nickname}
                  nicknameValid={nicknameValid}
                  onClick={onPurchaseClick}
                  isSupport={isSupportSelected}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <HowItWorks />
    </section>
  );
}