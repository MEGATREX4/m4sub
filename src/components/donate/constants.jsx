// src/components/donate/constants.js
const getFunctionsBaseUrl = () => {
  const configuredUrl = process.env.REACT_APP_NETLIFY_FUNCTIONS_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8888/.netlify/functions";
  }

  return "/.netlify/functions";
};

export const API_BASE_URL = getFunctionsBaseUrl();
export const SHOP_API_URL = `${API_BASE_URL}/shop`;
export const CHECK_OWNERSHIP_URL = `${API_BASE_URL}/check-ownership`;
export const REDEEM_API_URL = `${API_BASE_URL}/redeem`;
export const PURCHASE_STATS_API_URL = `${API_BASE_URL}/purchase-stats`;
export const SERVER_HEALTH_API_URL = `${API_BASE_URL}/server-health`;
export const MONOBANK_JAR_URL = "https://send.monobank.ua/jar/85Ui7vsyCD";
export const IMAGES_BASE_URL = "";

export const TYPE_ICONS = {
  cosmetic: { icon: "hn-users-crown-solid", label: "Косметика" },
  icon: { icon: "hn-star-solid", label: "Значок" },
  bundle: { icon: "hn-users-solid", label: "Набір" },
  support: { icon: "hn-heart-solid", label: "Підтримка" }
};

export const NICKNAME_DEBOUNCE_MS = 500;

// Server Support item configuration
export const SUPPORT_ITEM = {
  id: "server_support",
  type: "support",
  name: "Підтримка Сервера",
  description: "Підтримайте розвиток сервера! Ви отримаєте роль SUPPORTER, яка відображається біля вашого ніку в чаті. Рекомендовано, якщо вам не потрібні косметичні предмети з магазину.",
  price: 50, // Minimum suggested amount
  minPrice: 10,
  maxPrice: 10000,
  featured: false,
  isCustomAmount: true,
  benefits: [
    "Роль SUPPORTER в чаті",
    "Особливий значок біля ніку",
    "Подяка від команди сервера",
    "Підтримка розвитку проєкту"
  ],
  thumbnails: ["/images/roles/supporter_badge.png"]
};