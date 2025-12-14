// src/components/donate/constants.js
export const API_BASE_URL = "/.netlify/functions";
export const SHOP_API_URL = "/.netlify/functions/shop";
export const CHECK_OWNERSHIP_URL = "/.netlify/functions/check-ownership";
export const MONOBANK_JAR_URL = "https://send.monobank.ua/jar/85Ui7vsyCD";
export const IMAGES_BASE_URL = "";

export const TYPE_ICONS = {
  cape: { icon: "hn-users-crown-solid", label: "Плащ" },
  icon: { icon: "hn-star-solid", label: "Значок" },
  bundle: { icon: "hn-users-solid", label: "Набір" }
};

export const NICKNAME_DEBOUNCE_MS = 500;