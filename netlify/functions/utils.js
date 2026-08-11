const BACKUP_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url) => `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(url)}`,
  (url) => `https://cors-anywhere.herokuapp.com/${url}`,
];

const normalizeServerUrl = (url = '') => String(url || '').trim().replace(/\/$/, '');

const fetchWithTimeout = async (url, options = {}, timeoutMs = 8000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const signal = options.signal || controller.signal;

  try {
    return await fetch(url, { ...options, signal });
  } finally {
    clearTimeout(timer);
  }
};

const fetchWithFallback = async (url, options = {}, timeoutMs = 8000) => {
  let response = await fetchWithTimeout(url, options, timeoutMs).catch((error) => {
    console.warn("Primary request failed:", error?.message || error);
    return null;
  });

  if (response && response.ok) {
    return response;
  }

  const fallbackOptions = { ...options };
  delete fallbackOptions.signal;

  for (const proxyBuilder of BACKUP_PROXIES) {
    const proxyUrl = proxyBuilder(url);
    try {
      response = await fetchWithTimeout(proxyUrl, fallbackOptions, timeoutMs);
      if (response && response.ok) {
        return response;
      }
      console.warn(`Fallback proxy failed (${proxyUrl}) with status ${response?.status}`);
    } catch (error) {
      console.warn(`Fallback proxy error (${proxyUrl}):`, error?.message || error);
    }
  }

  return response;
};

module.exports = {
  normalizeServerUrl,
  fetchWithTimeout,
  fetchWithFallback,
};
