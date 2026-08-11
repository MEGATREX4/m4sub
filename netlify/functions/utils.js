const normalizeServerUrl = (url = '') => String(url || '').trim().replace(/\/$/, '');

const fetchWithTimeout = async (url, options = {}, timeoutMs = 8000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const signal = options.signal || controller.signal;

  const defaultHeaders = {
    Accept: "application/json",
    "User-Agent": "Mozilla/5.0 (Netlify Function; +https://www.m4sub.click)",
  };

  const mergedHeaders = {
    ...defaultHeaders,
    ...(options.headers || {}),
  };

  try {
    return await fetch(url, { ...options, signal, headers: mergedHeaders });
  } finally {
    clearTimeout(timer);
  }
};

const fetchWithFallback = async (url, options = {}, timeoutMs = 8000) => {
  return await fetchWithTimeout(url, options, timeoutMs);
};

module.exports = {
  normalizeServerUrl,
  fetchWithTimeout,
  fetchWithFallback,
};
