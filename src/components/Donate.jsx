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
    handleNicknameChange,
    setNicknameError,
  } = useNickname();

  // Selection state
  const [selectedCategory, setSelectedCategory] = useState("capes");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

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
    if (!shopData) return [];
    switch (selectedCategory) {
      case "capes": return shopData.capes || [];
      case "icons": return shopData.icons || [];
      case "bundles": return shopData.bundles || [];
      default: return [];
    }
  }, [shopData, selectedCategory]);

  // Handle item selection
  const handleItemSelect = useCallback((item, type) => {
    if (selectedItem?.id === item.id && selectedType === type) {
      setSelectedItem(null);
      setSelectedType(null);
    } else {
      setSelectedItem(item);
      setSelectedType(type);
    }
    clearPurchaseStatus();
  }, [selectedItem, selectedType, clearPurchaseStatus]);

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
                          ownedItems={ownedItems}
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