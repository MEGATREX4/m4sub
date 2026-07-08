import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useShopData } from "./donate/hooks/useShopData";
import { useNickname } from "./donate/hooks/useNickname";
import { usePurchase } from "./donate/hooks/usePurchase";
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
import { SUPPORT_ITEM } from "./donate/constants";
import { isItemOwned, isBundleFullyOwned } from "./donate/utils/helpers";
import { RedeemModal } from "./donate/components/RedeemModal";

export default function Donate() {
  const { shopData, loading, error, refetch } = useShopData();
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

  const [selectedCategory, setSelectedCategory] = useState("cosmetics");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [supportAmount, setSupportAmount] = useState(SUPPORT_ITEM.price);

  // Redeem state
  const [showRedeemModal, setShowRedeemModal] = useState(false);

  const {
    purchasing,
    purchaseStatus,
    canPurchase,
    handlePurchase,
    clearPurchaseStatus,
  } = usePurchase(nickname, nicknameError, selectedItem, selectedType);

  const currentItems = useMemo(() => {
    if (!shopData) return [SUPPORT_ITEM];

    let items = [];
    switch (selectedCategory) {
      case "cosmetics":
        items = shopData.cosmetics || shopData.capes || [];
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

    return [...items, SUPPORT_ITEM];
  }, [shopData, selectedCategory]);

  const handleItemSelect = useCallback((item, type) => {
    if (type !== 'support' && ownedItems && ownedItems.length > 0) {
      const isAlreadyOwned = type === 'bundle'
        ? isBundleFullyOwned(item, ownedItems)
        : isItemOwned(item.id, type, ownedItems);
      if (isAlreadyOwned) return;
    }
    if (type === 'support') {
      if (selectedItem?.id === item.id && selectedType === type) {
        setSelectedItem(null);
        setSelectedType(null);
      } else {
        setSelectedItem({ ...item, price: supportAmount });
        setSelectedType(type);
      }
    } else {
      if (selectedItem?.id === item.id && selectedType === type) {
        setSelectedItem(null);
        setSelectedType(null);
      } else {
        setSelectedItem(item);
        setSelectedType(type);
      }
    }
    clearPurchaseStatus();
  }, [selectedItem, selectedType, supportAmount, clearPurchaseStatus, ownedItems]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
    setSelectedType(null);
    clearPurchaseStatus();
  }, [clearPurchaseStatus]);

  useEffect(() => {
    if (!selectedItem || !selectedType || selectedType === 'support') return;
    if (!ownedItems || ownedItems.length === 0) return;
    const isSelectedItemOwned = selectedType === 'bundle'
      ? isBundleFullyOwned(selectedItem, ownedItems)
      : isItemOwned(selectedItem.id, selectedType, ownedItems);
    if (isSelectedItemOwned) {
      setSelectedItem(null);
      setSelectedType(null);
    }
  }, [ownedItems, selectedItem, selectedType]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <UkraineBanner />
      <div className="bg-[#c5629a] p-[2px]">
        <div className="bg-gray-700 p-[2px]">
          <div className="bg-[#1a1a2e]">
            <div className="bg-[#130217] p-8 text-center relative">
              <h2 className="text-4xl font-bold text-[#c5629a] minecraftFont mb-3 flex items-center justify-center gap-3">
                <i className="hn hn-shopping-cart"></i>
                Магазин Косметики
              </h2>
              <p className="text-gray-400 text-lg">
                Підтримай сервер та отримай ексклюзивна косметика над головою, значки та набори!
              </p>
              
              <button 
                onClick={() => setShowRedeemModal(true)}
                className="absolute top-4 right-4 bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 minecraftFont text-sm transition-colors flex items-center gap-2"
              >
                <i className="hn hn-gift"></i>
                Ввести код
              </button>
            </div>

            <div className="bg-gray-700 h-[3px]" />

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} onRetry={refetch} />}
            
            {!loading && !error && shopData && (
              <>
                <NicknameInput
                  nickname={nickname}
                  nicknameError={nicknameError}
                  nicknameValid={nicknameValid}
                  isChecking={isChecking}
                  playerExists={playerExists}
                  onChange={handleNicknameChange}
                />
                <div className="bg-gray-700 h-[2px]" />
                <div className="flex">
                  <CategoryTab
                    label="Косметика"
                    isActive={selectedCategory === "cosmetics"}
                    onClick={() => handleCategoryChange("cosmetics")}
                    count={shopData?.cosmetics?.length || shopData?.capes?.length || 0}
                  />
                  <div className="bg-gray-700 w-[2px]" />
                  <CategoryTab
                    label="Значки"
                    isActive={selectedCategory === "icons"}
                    onClick={() => handleCategoryChange("icons")}
                    count={shopData?.icons?.length || 0}
                  />
                  <div className="bg-gray-700 w-[2px]" />
                  <CategoryTab
                    label="Набори"
                    isActive={selectedCategory === "bundles"}
                    onClick={() => handleCategoryChange("bundles")}
                    count={shopData?.bundles?.length || 0}
                  />
                </div>
                <div className="bg-gray-700 h-[3px]" />
                <div className="p-6 bg-[#12121f]">
                  <div className="grid gap-4" style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gridTemplateRows: 'auto auto 1fr auto'
                  }}>
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
                          onSupportAmountChange={(val) => setSupportAmount(val)}
                          nickname={nickname}
                        />
                      );
                    })}
                  </div>
                </div>
                
                <PurchaseStatusDisplay purchaseStatus={purchaseStatus} />
                <PurchaseButton
                  canPurchase={canPurchase}
                  purchasing={purchasing}
                  selectedItem={selectedItem}
                  nickname={nickname}
                  nicknameValid={nicknameValid}
                  onClick={() => handlePurchase(setNicknameError)}
                  isSupport={selectedType === 'support'}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <RedeemModal 
        isOpen={showRedeemModal}
        onClose={() => setShowRedeemModal(false)}
        nickname={nickname}
        nicknameValid={nicknameValid}
      />

      <HowItWorks />
    </section>
  );
}
