const MINECRAFT_SERVER_URL = (process.env.MINECRAFT_SERVER_URL || '').replace(/\/$/, '');

// Better backup proxies
const BACKUP_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  if (!MINECRAFT_SERVER_URL) {
    console.error("MINECRAFT_SERVER_URL not configured");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server configuration error" }),
    };
  }

  const shopUrl = `${MINECRAFT_SERVER_URL}/api/shop`;
  console.log("Fetching shop from:", shopUrl);

  // Try primary server first
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(shopUrl, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      console.log("Primary server success");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      };
    }
    
    console.warn(`Primary server failed with status ${response.status}`);
  } catch (error) {
    console.warn("Primary server error:", error.message);
  }

  // Try backup proxies
  console.log("Trying backup proxies...");
  for (let i = 0; i < BACKUP_PROXIES.length; i++) {
    try {
      const proxyUrl = BACKUP_PROXIES[i](shopUrl);
      console.log(`Trying proxy ${i + 1}:`, proxyUrl);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(proxyUrl, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        console.log(`Proxy ${i + 1} success`);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data),
        };
      }

      console.warn(`Proxy ${i + 1} failed with status ${response.status}`);
    } catch (error) {
      console.warn(`Proxy ${i + 1} error:`, error.message);
    }
  }

  // All attempts failed
  console.error("All shop data sources failed");
  return {
    statusCode: 502,
    headers,
    body: JSON.stringify({ 
      error: "Cannot connect to game server. Please try again later.",
      details: "All connection attempts failed"
    }),
  };
};