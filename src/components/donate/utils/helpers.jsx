// src/components/donate/utils/helpers.js

/**
 * Get item name from bundle reference like "cape:axo_king"
 */
export const getItemNameFromReference = (itemRef, shopData) => {
  if (!shopData || !itemRef) return itemRef;
  
  const [refType, refId] = itemRef.split(':');
  if (!refType || !refId) return itemRef;
  
  const dataKey = refType === 'bundle' ? 'bundles' : refType + 's';
  const items = shopData[dataKey] || [];
  const foundItem = items.find(item => item.id === refId);
  
  return foundItem ? foundItem.name : refId;
};

/**
 * Validate nickname format
 */
export const validateNickname = (nick) => {
  if (!nick || nick.trim().length === 0) return "Введіть нікнейм";
  if (nick.length < 3 || nick.length > 16) return "Нікнейм має бути від 3 до 16 символів";
  if (!/^[a-zA-Z0-9_]+$/.test(nick)) return "Нікнейм може містити лише латинські літери, цифри та _ (без пробілів)";
  return "";
};

/**
 * Generate purchase ID
 */
export const generatePurchaseId = () => {
  return 'P' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
};

/**
 * Check if item is owned by player
 */
export const isItemOwned = (itemId, itemType, ownedItems) => {
  if (!ownedItems || !Array.isArray(ownedItems)) return false;
  return ownedItems.some(owned => owned.id === itemId && owned.type === itemType);
};

/**
 * Check if player has supporter role
 */
export const hasSupporter = (ownedItems) => {
  if (!ownedItems || !Array.isArray(ownedItems)) return false;
  return ownedItems.some(owned => owned.type === 'role' && owned.id === 'supporter');
};

/**
 * Check if bundle is fully owned
 */
export const isBundleFullyOwned = (bundle, ownedItems) => {
  if (!bundle.items || !ownedItems) return false;
  
  return bundle.items.every(itemRef => {
    const [type, id] = itemRef.split(':');
    return isItemOwned(id, type, ownedItems);
  });
};

/**
 * Check if bundle is partially owned
 */
export const isBundlePartiallyOwned = (bundle, ownedItems) => {
  if (!bundle.items || !ownedItems) return false;
  
  const ownedCount = bundle.items.filter(itemRef => {
    const [type, id] = itemRef.split(':');
    return isItemOwned(id, type, ownedItems);
  }).length;
  
  return ownedCount > 0 && ownedCount < bundle.items.length;
};