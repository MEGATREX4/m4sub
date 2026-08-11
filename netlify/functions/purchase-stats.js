const MINECRAFT_SERVER_URL = (process.env.MINECRAFT_SERVER_URL || '').replace(/\/$/, '');
const MINECRAFT_WEBHOOK_SECRET = process.env.MINECRAFT_WEBHOOK_SECRET;

// Backup proxies for stats
const BACKUP_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
];

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  if (!MINECRAFT_SERVER_URL) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  const params = event.queryStringParameters || {};
  const days = parseInt(params.days) || 30;
  const groupBy = params.groupBy || 'day';

  const statsUrl = `${MINECRAFT_SERVER_URL}/api/stats/purchases?days=${days}&groupBy=${groupBy}`;
  console.log("Fetching stats from:", statsUrl);

  // Try primary server
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(statsUrl, {
      signal: controller.signal,
      headers: {
        "X-Auth-Token": MINECRAFT_WEBHOOK_SECRET || "",
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      console.log("Primary stats server success");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      };
    }

    console.warn(`Primary stats server failed with status ${response.status}`);
  } catch (error) {
    console.warn("Primary stats server error:", error.message);
  }

  // Try backup proxies
  for (let i = 0; i < BACKUP_PROXIES.length; i++) {
    try {
      const proxyUrl = BACKUP_PROXIES[i](statsUrl);
      console.log(`Trying stats proxy ${i + 1}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(proxyUrl, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        console.log(`Stats proxy ${i + 1} success`);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data),
        };
      }
    } catch (error) {
      console.warn(`Stats proxy ${i + 1} error:`, error.message);
    }
  }

  // All failed - return empty stats instead of error
  console.error("All stats sources failed, returning empty data");
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ 
      stats: [],
      totalAmount: 0,
      totalPurchases: 0
    }),
  };
};