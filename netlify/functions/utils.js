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
  return await fetchWithTimeout(url, options, timeoutMs);
};

module.exports = {
  normalizeServerUrl,
  fetchWithTimeout,
  fetchWithFallback,
};
