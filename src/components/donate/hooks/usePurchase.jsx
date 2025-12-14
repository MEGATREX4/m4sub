// src/components/donate/hooks/usePurchase.js
import { useState, useCallback, useMemo } from 'react';
import { API_BASE_URL, MONOBANK_JAR_URL, SUPPORT_ITEM } from '../constants';
import { validateNickname } from '../utils/helpers';

export const usePurchase = (nickname, nicknameError, selectedItem, selectedType) => {
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  const handlePurchase = useCallback(async (setNicknameError) => {
    const nickError = validateNickname(nickname);
    if (nickError) {
      setNicknameError(nickError);
      return;
    }

    if (!selectedItem) {
      setPurchaseStatus({ type: "error", message: "Виберіть товар" });
      return;
    }

    // Validate support item price
    if (selectedType === 'support') {
      if (selectedItem.price < SUPPORT_ITEM.minPrice || selectedItem.price > SUPPORT_ITEM.maxPrice) {
        setPurchaseStatus({ 
          type: "error", 
          message: `Сума підтримки має бути від ${SUPPORT_ITEM.minPrice}₴ до ${SUPPORT_ITEM.maxPrice}₴` 
        });
        return;
      }
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
        message: selectedType === 'support' 
          ? `Дякуємо за підтримку! ID: ${purchaseId}`
          : `Покупка створена! ID: ${purchaseId}`,
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
  }, [nickname, selectedItem, selectedType]);

  const canPurchase = useMemo(() => {
    const hasItem = selectedItem !== null;
    const hasNickname = nickname.trim().length >= 3;
    const noNicknameError = nicknameError === "";
    const notPurchasing = !purchasing;
    
    // Additional validation for support items
    if (selectedItem && selectedItem.type === 'support') {
      const validPrice = selectedItem.price >= SUPPORT_ITEM.minPrice && 
                         selectedItem.price <= SUPPORT_ITEM.maxPrice;
      return hasItem && hasNickname && noNicknameError && notPurchasing && validPrice;
    }
    
    return hasItem && hasNickname && noNicknameError && notPurchasing;
  }, [selectedItem, nickname, nicknameError, purchasing]);

  const clearPurchaseStatus = useCallback(() => {
    setPurchaseStatus(null);
  }, []);

  return {
    purchasing,
    purchaseStatus,
    canPurchase,
    handlePurchase,
    clearPurchaseStatus,
  };
};